/**
 * WhosOnScreen – Cast Embedding Index
 *
 * Pre-computes and caches face embeddings for each cast member's TMDB headshot.
 * When a title is identified, we download each actor's profile photo, run
 * detection → alignment → embedding, and store the 512-d vectors.
 *
 * Cached per title in extension-origin IndexedDB with a 14-day TTL.
 * In-memory Map provides instant access after first load.
 */

import { detectFaces, initDetector } from './face-detector.js';
import { alignFace } from './face-aligner.js';
import { computeEmbedding, initEmbedder } from './face-embedder.js';

// In-memory index: Map<actorId, { embedding: Float32Array, name: string }>
const castIndex = new Map();

// Currently indexed title key
let currentTitleKey = null;

// TTL for persistent cache: 14 days
const CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000;
let indexingPromise = null;

/**
 * Build embeddings for a title's cast.
 * Downloads each actor's headshot, detects face, aligns, embeds, and caches.
 *
 * @param {string} titleKey - Unique title identifier (e.g., "the-night-manager")
 * @param {Array<{ id: number, name: string, profileUrl: string }>} castList - Cast members
 * @param {function} onProgress - Optional callback: (indexed, total) => void
 * @returns {Promise<{ indexed: number, total: number, fromCache: boolean }>}
 */
export function indexCast(titleKey, castList, onProgress = null) {
  if (!titleKey || !castList || castList.length === 0) {
    return Promise.resolve({ indexed: 0, total: 0, fromCache: false });
  }

  // Only one title may build at a time. Recognition therefore sees either the
  // previous complete index or no index, never a partially rebuilt gallery.
  if (indexingPromise) {
    return indexingPromise.then(() => indexCast(titleKey, castList, onProgress));
  }

  indexingPromise = buildCastIndex(titleKey, castList, onProgress).finally(() => {
    indexingPromise = null;
  });
  return indexingPromise;
}

async function buildCastIndex(titleKey, castList, onProgress = null) {
  if (!titleKey || !castList || castList.length === 0) {
    return { indexed: 0, total: 0, fromCache: false };
  }

  // Already indexed for this title?
  if (currentTitleKey === titleKey && castIndex.size > 0) {
    console.log(`[wos:cast-index] In-memory index hit for "${titleKey}" (${castIndex.size} actors)`);
    return { indexed: castIndex.size, total: castList.length, fromCache: true };
  }

  // Try to load from persistent cache
  const cached = await loadFromStorage(titleKey);
  if (cached && cached.size > 0) {
    castIndex.clear();
    for (const [id, data] of cached.entries()) {
      castIndex.set(id, data);
    }
    currentTitleKey = titleKey;
    console.log(`[wos:cast-index] Loaded ${castIndex.size} cast embeddings from persistent cache for "${titleKey}"`);
    return { indexed: castIndex.size, total: castList.length, fromCache: true };
  }

  console.log(`[wos:cast-index] Building fresh embeddings for "${titleKey}" (${castList.length} cast members)...`);

  // Fresh indexing — ensure ONNX models are loaded
  await Promise.all([initDetector(), initEmbedder()]);

  castIndex.clear();
  currentTitleKey = null;

  let indexed = 0;
  const total = castList.length;

  // Index each cast member (limit to top 24 for speed & coverage)
  const toIndex = castList.filter(p => p.profileUrl).slice(0, 24);

  // Process in parallel batches of 4
  const batchSize = 4;
  for (let i = 0; i < toIndex.length; i += batchSize) {
    const batch = toIndex.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(person => indexSingleActor(person))
    );

    for (let j = 0; j < results.length; j++) {
      if (results[j].status === 'fulfilled' && results[j].value) {
        indexed++;
        if (onProgress) onProgress(indexed, total);
      }
    }
  }

  // Persist to storage
  await saveToStorage(titleKey);
  currentTitleKey = titleKey;
  console.log(`[wos:cast-index] Indexing complete for "${titleKey}": ${indexed}/${toIndex.length} actors indexed`);

  return { indexed, total, fromCache: false };
}

/**
 * Index a single actor's headshot.
 */
async function indexSingleActor(person) {
  if (!person.profileUrl || castIndex.has(person.id)) return null;

  try {
    // Download the headshot
    const img = await loadImage(person.profileUrl);
    if (!img) {
      console.warn(`[wos:cast-index] Headshot download failed for ${person.name}`);
      return null;
    }

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Detect faces in the headshot
    const faces = await detectFaces(canvas, img.width, img.height);

    if (faces.length === 0) {
      // A non-face crop is not a valid identity reference. Leave this actor
      // out rather than poisoning the cast index with scenery or logos.
      console.warn(`[wos:cast-index] No face found in headshot for ${person.name}; skipping`);
      return null;
    }

    // Use the largest / most confident face
    const bestFace = faces.sort((a, b) =>
      (b.bbox[2] * b.bbox[3] * b.score) - (a.bbox[2] * a.bbox[3] * a.score)
    )[0];

    // Align using landmarks (or bbox fallback) directly from the source headshot canvas
    const aligned = alignFace(canvas, bestFace.landmarks, bestFace.bbox);

    // Compute embedding
    const embedding = await computeEmbedding(aligned);

    castIndex.set(person.id, { embedding, name: person.name, character: person.character || '' });
    console.log(`[wos:cast-index] ✓ Indexed ${person.name}${person.character ? ` (as ${person.character})` : ''} (face score: ${bestFace.score.toFixed(2)})`);
    return person.id;
  } catch (err) {
    console.warn(`[wos:cast-index] ✗ Failed to index ${person.name}:`, err.message);
    return null;
  }
}

/**
 * Match a face embedding against the current cast index.
 *
 * @param {Float32Array} queryEmbedding - 512-d embedding of the detected face
 * @param {number} threshold - Minimum cosine similarity to consider a match (default: 0.40)
 * @returns {{ matches: Array<{ actorId: number, name: string, similarity: number, confidence: string }>, topCandidates: Array<{ actorId: number, name: string, similarity: number }> }}
 */
export function matchAgainstCast(queryEmbedding, threshold = 0.40) {
  if (!queryEmbedding || castIndex.size === 0) {
    console.log(`[wos:cast-match] Cannot match: query=${!!queryEmbedding}, castIndex.size=${castIndex.size}`);
    return { matches: [], topCandidates: [] };
  }

  const allScores = [];

  for (const [actorId, data] of castIndex.entries()) {
    if (!data.embedding || data.embedding.length !== queryEmbedding.length) continue;
    let dot = 0;
    for (let i = 0; i < queryEmbedding.length; i++) {
      dot += queryEmbedding[i] * data.embedding[i];
    }

    allScores.push({
      actorId,
      name: data.name,
      character: data.character || '',
      similarity: dot,
    });
  }

  // Sort by similarity descending
  allScores.sort((a, b) => b.similarity - a.similarity);

  const topCandidates = allScores.slice(0, 5);
  const logCandidates = topCandidates.map(c => `${c.name}: ${c.similarity.toFixed(3)}`).join(', ');
  console.log(`[wos:cast-match] Top 5 cast matches: [${logCandidates}] (threshold: ${threshold})`);

  const matches = [];
  const best = topCandidates[0];
  const second = topCandidates[1];
  const hasClearMargin = !second || best.similarity - second.similarity >= 0.035;
  if (best && best.similarity >= threshold && hasClearMargin) {
    const confidence = best.similarity >= 0.48 ? 'high' : 'likely';
    matches.push({ ...best, confidence });
  }

  return { matches, topCandidates };
}

/**
 * Activate a previously persisted title index when recognition switches tabs.
 */
export async function activateIndex(titleKey) {
  if (!titleKey) return castIndex.size > 0;

  if (indexingPromise) {
    try { await indexingPromise; } catch (_) {}
  }
  if (currentTitleKey === titleKey && castIndex.size > 0) return true;

  const cached = await loadFromStorage(titleKey);
  if (!cached || cached.size === 0) return false;
  castIndex.clear();
  for (const [id, data] of cached.entries()) castIndex.set(id, data);
  currentTitleKey = titleKey;
  return true;
}

export function getIndexSize() {
  return castIndex.size;
}

/**
 * Get the current title key.
 */
export function getCurrentTitleKey() {
  return currentTitleKey;
}

/**
 * Clear the index.
 */
export function clearIndex() {
  castIndex.clear();
  currentTitleKey = null;
}

export async function clearPersistentCastCache() {
  try {
    const db = await openCastDb();
    try {
      await new Promise((resolve, reject) => {
        const request = db.transaction(CAST_STORE, 'readwrite').objectStore(CAST_STORE).clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error || new Error('Could not clear cast cache'));
      });
    } finally {
      db.close();
    }
  } catch (err) {
    console.warn('[wos:cast-index] Failed to clear persistent cache:', err.message);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), 8000);
    img.crossOrigin = 'anonymous';
    img.onload = () => finish(img);
    img.onerror = () => finish(null);
    img.src = url;
  });
}

// ─── Persistent Cache ────────────────────────────────────────────────────────

// Offscreen documents only expose chrome.runtime, not chrome.storage. IndexedDB
// is available in the extension origin and keeps embeddings across restarts.
const CAST_DB_NAME = 'wos-offscreen';
const CAST_DB_VERSION = 1;
const CAST_STORE = 'cast-index';

function openCastDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in globalThis)) {
      reject(new Error('IndexedDB is unavailable'));
      return;
    }
    const request = indexedDB.open(CAST_DB_NAME, CAST_DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(CAST_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open cast cache'));
  });
}

async function readIndexedValue(key) {
  const db = await openCastDb();
  try {
    return await new Promise((resolve, reject) => {
      const request = db.transaction(CAST_STORE, 'readonly').objectStore(CAST_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Could not read cast cache'));
    });
  } finally {
    db.close();
  }
}

async function writeIndexedValue(key, value) {
  const db = await openCastDb();
  try {
    await new Promise((resolve, reject) => {
      const request = db.transaction(CAST_STORE, 'readwrite').objectStore(CAST_STORE).put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error || new Error('Could not write cast cache'));
    });
  } finally {
    db.close();
  }
}

async function deleteIndexedValue(key) {
  const db = await openCastDb();
  try {
    await new Promise((resolve, reject) => {
      const request = db.transaction(CAST_STORE, 'readwrite').objectStore(CAST_STORE).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error || new Error('Could not delete cast cache'));
    });
  } finally {
    db.close();
  }
}

async function saveToStorage(titleKey) {
  try {
    const entries = {};
    for (const [id, data] of castIndex.entries()) {
      entries[id] = {
        embedding: Array.from(data.embedding),
        name: data.name,
        character: data.character || '',
      };
    }
    await writeIndexedValue(titleKey, {
      entries,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.warn('[wos:cast-index] Failed to persist cache:', err.message);
  }
}

async function loadFromStorage(titleKey) {
  try {
    const cached = await readIndexedValue(titleKey);
    if (!cached || !cached.entries) return null;

    if (Date.now() - cached.timestamp > CACHE_TTL_MS) {
      await deleteIndexedValue(titleKey);
      return null;
    }

    const index = new Map();
    for (const [id, data] of Object.entries(cached.entries)) {
      index.set(Number(id), {
        embedding: new Float32Array(data.embedding),
        name: data.name,
        character: data.character || '',
      });
    }
    return index;
  } catch (err) {
    console.warn('[wos:cast-index] Failed to load cache:', err.message);
    return null;
  }
}
