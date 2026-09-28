/**
 * WhosOnScreen – Offscreen Processor
 *
 * Runs inside the offscreen document (has DOM access but no chrome.* APIs
 * beyond chrome.runtime messaging).
 *
 * Responsibilities:
 *  1. Receive a tab capture stream ID
 *  2. Open the stream via getUserMedia
 *  3. Draw the video to a canvas → extract a frame as data URL
 *  4. Run ONNX-based face detection + alignment + embedding
 *  5. Match detected face embeddings against indexed cast
 *  6. Send results back to the service worker
 */

import { MSG } from '../shared/messages.js';
import { initDetector, detectFaces } from './face-detector.js';
import { alignFace } from './face-aligner.js';
import { initEmbedder, computeEmbedding } from './face-embedder.js';
import { indexCast, matchAgainstCast, getIndexSize, getCurrentTitleKey, activateIndex, clearIndex, clearPersistentCastCache } from './cast-index.js';

const video = document.getElementById('capture-video');
const canvas = document.getElementById('capture-canvas');
const ctx = canvas.getContext('2d');

let activeStream = null;
let modelsReady = false;
let modelsLoading = null;
let modelsError = null;
const recognitionRequests = new Map();

// ─── Lazy model initialization ───────────────────────────────────────────────

async function ensureModelsReady() {
  if (modelsReady) return;
  if (modelsError) throw modelsError;
  if (modelsLoading) return modelsLoading;

  modelsLoading = (async () => {
    const t0 = performance.now();
    try {
      // Initialize the shared WASM runtime before creating the two sessions.
      // This avoids two concurrent first-use initializations in ORT Web.
      await initDetector();
      await initEmbedder();
      modelsReady = true;
      console.log(`[wos:offscreen] ONNX models loaded in ${Math.round(performance.now() - t0)}ms`);
    } catch (err) {
      modelsError = err;
      console.error('[wos:offscreen] Failed to load ONNX models:', err);
      throw err;
    } finally {
      modelsLoading = null;
    }
  })();

  return modelsLoading;
}

// ─── Message handler ─────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MSG.START_CAPTURE) {
    handleCapture(message.streamId);
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.STOP_CAPTURE) {
    stopStream();
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.INDEX_CAST) {
    handleIndexCast(message.titleKey, message.castList, message.tabId).then(result => {
      sendResponse({ ok: true, ...result });
    }).catch(err => {
      console.error('[wos:offscreen] Index cast error:', err);
      sendResponse({ ok: false, error: err.message });
    });
    return true;
  }

  if (message.type === MSG.RECOGNIZE_FACES) {
    const requestId = message.requestId;
    if (requestId && recognitionRequests.has(requestId)) {
      recognitionRequests.get(requestId).then(
        (result) => sendResponse(result),
        (err) => sendResponse({ ok: false, error: err.message, matches: [] })
      );
      return true;
    }

    const request = handleRecognize(message.frameData, message.width, message.height, message.titleKey)
      .then((result) => ({ ok: true, ...result }))
      .catch((err) => {
        console.error('[wos:offscreen] Recognize error:', err);
        return { ok: false, error: err.message, matches: [] };
      });
    if (requestId) {
      recognitionRequests.set(requestId, request);
      request.finally(() => {
        // Keep a small window for a duplicate broadcast, then release memory.
        setTimeout(() => recognitionRequests.delete(requestId), 1000);
      });
    }
    request.then(sendResponse);
    return true;
  }

  if (message.type === MSG.CLEAR_CAST_CACHE) {
    clearIndex();
    clearPersistentCastCache()
      .then(() => sendResponse({ ok: true }))
      .catch((err) => sendResponse({ ok: false, error: err.message }));
    return true;
  }

  if (message.type === MSG.RECORD_AND_IDENTIFY_SONG) {
    handleRecordAndIdentifyAudio(message.streamId, message.apiToken).then(result => {
      sendResponse(result);
    }).catch(err => {
      console.error('[wos:offscreen] Song recognition error:', err);
      sendResponse({ ok: false, error: err.message });
    });
    return true;
  }
});

// ─── Cast Indexing ───────────────────────────────────────────────────────────

async function handleIndexCast(titleKey, castList, tabId = null) {
  await ensureModelsReady();

  const t0 = performance.now();
  const result = await indexCast(titleKey, castList, (indexed, total) => {
    // Progress updates (could send messages back, but kept simple)
    console.log(`[wos:offscreen] Indexing cast: ${indexed}/${total}`);
  });

  const elapsed = Math.round(performance.now() - t0);
  console.log(
    `[wos:offscreen] Cast index ${result.fromCache ? 'loaded from cache' : 'built'}: ` +
    `${result.indexed}/${result.total} actors in ${elapsed}ms`
  );

  // Notify service worker that cast indexing is completed
  chrome.runtime.sendMessage({
    type: MSG.INDEX_CAST_DONE,
    tabId,
    titleKey,
    indexed: result.indexed,
    total: result.total,
  }).catch(() => {});

  return result;
}

// ─── Face Recognition ────────────────────────────────────────────────────────

async function handleRecognize(frameDataArray, width, height, titleKey = '') {
  if (!modelsReady) {
    await ensureModelsReady();
  }

  if (titleKey && !(await activateIndex(titleKey)) && getCurrentTitleKey() !== titleKey) {
    return {
      matches: [],
      faceCount: 0,
      indexedCastCount: 0,
      error: 'Cast index changed while scanning',
    };
  }
  const activeTitleKey = getCurrentTitleKey();
  if (activeTitleKey && titleKey !== activeTitleKey) {
    return {
      matches: [],
      faceCount: 0,
      indexedCastCount: 0,
      error: 'Cast index changed while scanning',
    };
  }

  const indexedCount = getIndexSize();
  if (indexedCount === 0) {
    console.log('[wos:offscreen] Recognition requested but cast index is empty.');
    return { matches: [], faceCount: 0, indexedCastCount: 0, error: 'No cast indexed' };
  }

  const t0 = performance.now();

  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 16 || height < 16) {
    throw new Error('Invalid frame dimensions');
  }
  if (width * height > 640 * 480) {
    throw new Error('Frame is larger than the supported limit');
  }

  // Runtime messaging is JSON-based in MV3, so frames arrive as a compressed
  // JPEG data URL. Keep a typed-array fallback for same-process callers.
  const frameCanvas = typeof frameDataArray === 'string'
    ? await decodeJpegFrame(frameDataArray, width, height)
    : frameCanvasFromPixels(frameDataArray, width, height);

  // Step 1: Detect faces
  const faces = await detectFaces(frameCanvas, width, height);
  const tDetect = performance.now();

  if (faces.length === 0) {
    return {
      matches: [],
      faceCount: 0,
      indexedCastCount: indexedCount,
      timing: { detect: Math.round(tDetect - t0), total: Math.round(tDetect - t0) },
    };
  }

  // Step 2: For each face, align and embed, then match
  // Limit to top 4 faces by size × confidence
  const topFaces = faces
    .sort((a, b) => (b.bbox[2] * b.bbox[3] * b.score) - (a.bbox[2] * a.bbox[3] * a.score))
    .slice(0, 4);

  const matches = [];
  const allCandidatesPerFace = [];
  const usedActors = new Set();

  for (let fIdx = 0; fIdx < topFaces.length; fIdx++) {
    const face = topFaces[fIdx];
    try {
      // Align face directly from full frame canvas using detected landmarks (or bbox fallback)
      const aligned = alignFace(frameCanvas, face.landmarks, face.bbox);

      // Compute embedding
      const embedding = await computeEmbedding(aligned);

      // Match against cast index (threshold 0.40)
      const { matches: faceMatches, topCandidates } = matchAgainstCast(embedding, 0.40);
      allCandidatesPerFace.push({ faceIndex: fIdx, topCandidates });

      // Take the best match that hasn't been claimed
      for (const match of faceMatches) {
        if (!usedActors.has(match.actorId)) {
          usedActors.add(match.actorId);
          matches.push({
            actorId: match.actorId,
            name: match.name,
            character: match.character || '',
            similarity: match.similarity,
            confidence: match.confidence || (match.similarity >= 0.48 ? 'high' : 'likely'),
            faceBox: face.bbox,
            faceScore: face.score,
          });
          break;
        }
      }
    } catch (err) {
      console.warn('[wos:offscreen] Face processing error:', err.message);
    }
  }

  const tTotal = performance.now();

  return {
    matches,
    faceCount: topFaces.length,
    allCandidates: allCandidatesPerFace,
    indexedCastCount: indexedCount,
    timing: {
      detect: Math.round(tDetect - t0),
      total: Math.round(tTotal - t0),
    },
  };
}

// ─── Capture pipeline (existing) ─────────────────────────────────────────────

async function handleCapture(streamId) {
  try {
    // 1. Acquire the tab's media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId,
        },
      },
      audio: false,
    });

    activeStream = stream;

    // 2. Pipe stream into <video>
    video.srcObject = stream;
    await video.play();

    // 3. Wait a beat for the video to render a real frame
    //    (first frame can sometimes be blank)
    await waitForFrame(video, 3);

    // 4. Downscale and draw to canvas (max 720p for fast processing & low memory)
    const maxWidth = 720;
    let targetWidth = video.videoWidth || 1280;
    let targetHeight = video.videoHeight || 720;
    if (targetWidth > maxWidth) {
      const scale = maxWidth / targetWidth;
      targetWidth = Math.round(targetWidth * scale);
      targetHeight = Math.round(targetHeight * scale);
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

    const frameDataUrl = canvas.toDataURL('image/jpeg', 0.82);

    // 5. Check if the frame is actually non-black
    const isBlack = checkIfBlack(ctx, canvas.width, canvas.height);

    // 6. Stop the stream (we only need one frame for now)
    stopStream();

    // 7. Send the frame back to the service worker
    if (isBlack) {
      chrome.runtime.sendMessage({
        type: MSG.CAPTURE_ERROR,
        error: 'Captured frame appears black — this may be a DRM-protected stream. Try disabling hardware acceleration in Chrome settings.',
      });
    } else {
      chrome.runtime.sendMessage({
        type: MSG.FRAME_CAPTURED,
        frameDataUrl,
        width: canvas.width,
        height: canvas.height,
      });
    }
  } catch (err) {
    console.error('[wos:offscreen] capture error:', err);
    stopStream();
    chrome.runtime.sendMessage({
      type: MSG.CAPTURE_ERROR,
      error: err.message || 'Failed to capture the tab stream.',
    });
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function decodeJpegFrame(dataUrl, width, height) {
  if (!/^data:image\/jpeg;base64,/i.test(dataUrl) || dataUrl.length > 2_000_000) {
    throw new Error('Invalid frame payload');
  }

  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not decode captured frame'));
    img.src = dataUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

function frameCanvasFromPixels(frameData, width, height) {
  const pixelData = frameData instanceof ArrayBuffer
    ? new Uint8ClampedArray(frameData)
    : ArrayBuffer.isView(frameData)
      ? new Uint8ClampedArray(frameData.buffer, frameData.byteOffset, frameData.byteLength)
      : new Uint8ClampedArray(frameData);
  const expectedBytes = width * height * 4;
  if (pixelData.byteLength < expectedBytes) {
    throw new Error(`Frame buffer is too small: expected ${expectedBytes} bytes, got ${pixelData.byteLength}`);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').putImageData(
    new ImageData(pixelData.subarray(0, expectedBytes), width, height),
    0,
    0
  );
  return canvas;
}

function waitForFrame(videoEl, frameCount = 3) {
  return new Promise((resolve) => {
    let count = 0;
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve();
    };
    const timeoutId = setTimeout(finish, 2000);
    function tick() {
      count++;
      if (count >= frameCount && videoEl.videoWidth > 0) {
        finish();
      } else if (!settled) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  });
}

function checkIfBlack(context, width, height) {
  const sampleCount = 100;
  const cols = 10;
  const rows = 10;
  let darkPixels = 0;
  const threshold = 10;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = Math.floor((c + 0.5) * (width / cols));
      const y = Math.floor((r + 0.5) * (height / rows));
      const pixel = context.getImageData(x, y, 1, 1).data;
      if (pixel[0] < threshold && pixel[1] < threshold && pixel[2] < threshold) {
        darkPixels++;
      }
    }
  }

  return darkPixels / sampleCount > 0.9;
}

// ─── Tab Audio Recording & Recognition ────────────────────────────────────────

async function handleRecordAndIdentifyAudio(streamId, apiToken = '') {
  let stream = null;
  let audioCtx = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId,
        },
      },
      video: false,
    });

    // Record a short audio sample for fingerprinting
    const chunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

    const recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    let stopTimer = null;
    let maxTimer = null;
    const audioBlob = await new Promise((resolve, reject) => {
      recorder.onstop = () => {
        if (stopTimer) clearTimeout(stopTimer);
        if (maxTimer) clearTimeout(maxTimer);
        if (chunks.length === 0) {
          reject(new Error('No audio data was recorded.'));
          return;
        }
        resolve(new Blob(chunks, { type: mimeType }));
      };
      recorder.onerror = (e) => {
        if (stopTimer) clearTimeout(stopTimer);
        if (maxTimer) clearTimeout(maxTimer);
        reject(new Error(e.error?.message || 'Audio recording error'));
      };

      recorder.start();
      // Record for ~5 seconds for better fingerprint accuracy
      stopTimer = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, 5000);
      maxTimer = setTimeout(() => {
        if (recorder.state === 'recording') {
          try { recorder.stop(); } catch (_) {}
        }
      }, 7000);
    });

    // Cleanup stream
    try {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    } catch (_) {}

    // Decode the audio blob to PCM for fingerprinting
    audioCtx = new (globalThis.AudioContext || globalThis.webkitAudioContext)({
      sampleRate: 44100,
    });

    const arrayBuffer = await audioBlob.arrayBuffer();
    let audioBuffer;
    try {
      audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    } catch (decodeErr) {
      console.warn('[wos:offscreen] Audio decode failed, trying alternative...', decodeErr);
      // Fallback: some formats may not decode; return gracefully
      return {
        ok: true,
        song: null,
        message: 'Could not decode audio. Try during a louder musical section.',
      };
    }

    const duration = Math.round(audioBuffer.duration);
    if (duration < 2) {
      return {
        ok: true,
        song: null,
        message: 'Audio sample too short. Try again during a clearer musical section.',
      };
    }

    // Generate a simplified audio fingerprint using chroma features
    const fingerprint = generateSimpleFingerprint(audioBuffer);

    // Close audio context
    try {
      if (audioCtx && audioCtx.state !== 'closed') audioCtx.close();
    } catch (_) {}

    // Query AcoustID with the fingerprint (free API, no user key needed)
    // Using the WhosOnScreen registered application key
    const acoustidKey = apiToken || 'GZnGZMfs5s';
    const params = new URLSearchParams({
      client: acoustidKey,
      duration: String(duration),
      fingerprint: fingerprint,
      meta: 'recordings+releasegroups+compress',
      format: 'json',
    });

    const controller = new AbortController();
    const fetchTimer = setTimeout(() => controller.abort(), 10_000);
    let res;
    try {
      res = await fetch(`https://api.acoustid.org/v2/lookup?${params.toString()}`, {
        method: 'GET',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(fetchTimer);
    }

    if (!res.ok) {
      throw new Error(`AcoustID service returned HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log('[wos:offscreen] AcoustID recognition result:', data);

    if (data.status === 'ok' && data.results && data.results.length > 0) {
      // Find the best result with recordings
      const bestResult = data.results.find(r => r.recordings && r.recordings.length > 0);
      if (bestResult && bestResult.recordings.length > 0) {
        const recording = bestResult.recordings[0];
        const artists = recording.artists ? recording.artists.map(a => a.name).join(', ') : 'Unknown Artist';
        const releaseGroup = recording.releasegroups?.[0];

        return {
          ok: true,
          song: {
            title: recording.title || 'Unknown',
            artist: artists,
            album: releaseGroup?.title || null,
            artworkUrl: releaseGroup?.id
              ? `https://coverartarchive.org/release-group/${releaseGroup.id}/front-250`
              : null,
            releaseDate: releaseGroup?.firstreleasedate || null,
            source: 'acoustid',
            songLink: recording.id
              ? `https://musicbrainz.org/recording/${recording.id}`
              : null,
          },
        };
      }
    }

    // Check for error response
    if (data.status === 'error') {
      const msg = data.error?.message || 'Recognition service error';
      return { ok: false, error: msg };
    }

    return {
      ok: true,
      song: null,
      message: 'Could not match audio. Try again during a clearer musical part of the scene.',
    };
  } catch (err) {
    console.error('[wos:offscreen] handleRecordAndIdentifyAudio error:', err);
    try {
      if (audioCtx && audioCtx.state !== 'closed') audioCtx.close();
      if (stream) stream.getTracks().forEach((t) => t.stop());
    } catch (_) {}

    return {
      ok: false,
      error: err.message || 'Failed to capture or identify audio.',
    };
  }
}

/**
 * Generate a simplified audio fingerprint using chroma-based features.
 * This produces a compact fingerprint string that can be sent to AcoustID.
 * Uses spectral analysis via FFT to create a chroma-like representation.
 */
function generateSimpleFingerprint(audioBuffer) {
  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0);
  const fftSize = 4096;
  const hopSize = fftSize / 2;
  const numFrames = Math.floor((channelData.length - fftSize) / hopSize);
  const numBins = 12; // 12 chroma bins

  const fingerprint = [];

  for (let frame = 0; frame < numFrames && frame < 256; frame++) {
    const offset = frame * hopSize;
    const segment = channelData.slice(offset, offset + fftSize);

    // Apply Hanning window
    const windowed = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      windowed[i] = segment[i] * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / fftSize));
    }

    // Simple DFT magnitude for key frequency bins
    const magnitudes = new Float32Array(numBins);
    for (let bin = 0; bin < numBins; bin++) {
      const freq = 130.81 * Math.pow(2, bin / 12); // C3 to B3
      const k = Math.round(freq * fftSize / sampleRate);
      if (k < fftSize / 2) {
        let re = 0, im = 0;
        for (let n = 0; n < fftSize; n++) {
          const angle = 2 * Math.PI * k * n / fftSize;
          re += windowed[n] * Math.cos(angle);
          im -= windowed[n] * Math.sin(angle);
        }
        magnitudes[bin] = Math.sqrt(re * re + im * im);
      }
    }

    // Quantize magnitudes to 2 bits each, pack into an integer
    const maxMag = Math.max(...magnitudes) || 1;
    let bits = 0;
    for (let bin = 0; bin < numBins; bin++) {
      const normalized = magnitudes[bin] / maxMag;
      const quantized = Math.min(3, Math.floor(normalized * 4));
      bits |= (quantized << (bin * 2));
    }
    fingerprint.push(bits);
  }

  // Encode as base64-like string
  return fingerprint.map(v => v.toString(36)).join('');
}

function stopStream() {
  if (activeStream) {
    activeStream.getTracks().forEach((track) => track.stop());
    activeStream = null;
  }
  video.srcObject = null;
}
