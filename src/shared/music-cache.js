/**
 * WhosOnScreen – Two-Tier Music Cache (L1 Memory + L2 chrome.storage.local)
 *
 * Provides instant 0ms responses for repeated seeks and scene reviews:
 *  - L1: In-memory Map (0ms access during tab lifetime)
 *  - L2: Persistent chrome.storage.local (persists across reloads & sessions)
 *  - 15-second timestamp bucketing: seeking ±10s within the same song hits cache immediately
 *  - Normalizes song titles and artists to maximize match accuracy
 */

const KEY_PREFIX = 'wos_mc_';
const BUCKET_SIZE_SEC = 15; // 15-second intervals for timestamp caching
const CACHE_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

function musicScope() {
  try {
    return location.origin || 'extension';
  } catch (_) {
    return 'extension';
  }
}

/**
 * Normalizes title by removing noisy bracketed tags like (Official Video), [HD], etc.
 * @param {string} title
 * @returns {string}
 */
export function normalizeTitle(title) {
  if (!title) return '';
  return title
    .replace(/[\(\[](?:official\s*(?:video|audio|music\s*video|lyric\s*video|hd|4k)?|audio|lyrics?|visualizer|video|hd|4k)[\)\]]/gi, '')
    .replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi, '')
    .replace(/\s*\|\s*.*$/g, '') // remove trailing channel/uploader suffixes
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes artist name
 * @param {string} artist
 * @returns {string}
 */
export function normalizeArtist(artist) {
  if (!artist) return '';
  return artist
    .replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi, '')
    .replace(/\s*-\s*Topic$/i, '') // remove YouTube's auto-generated " - Topic"
    .replace(/\s+/g, ' ')
    .trim();
}

class MusicCacheManager {
  constructor() {
    this._mem = new Map();
    this._persisted = new Map();
    try {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== 'local') return;
        const removed = Object.entries(changes).some(
          ([key, change]) => key.startsWith(KEY_PREFIX) && change.newValue === undefined
        );
        if (removed) this.clearMemory();
      });
    } catch (_) {}
  }

  _makeTimeKey(titleKey, currentTime) {
    const bucket = Math.floor((currentTime || 0) / BUCKET_SIZE_SEC);
    const cleanTitle = (titleKey || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${musicScope()}|${cleanTitle}:t${bucket}`;
  }

  /**
   * Look up cached song for this title at the given playback timestamp.
   * Checks L1 memory first, then L2 storage.
   * @param {string} titleKey
   * @param {number} currentTime
   * @returns {Promise<any|null>}
   */
  async getSongAtTime(titleKey, currentTime) {
    if (typeof currentTime !== 'number' || isNaN(currentTime)) return null;

    const key = this._makeTimeKey(titleKey, currentTime);
    const now = Date.now();

    // 1. L1 Memory check (instant 0ms)
    if (this._mem.has(key)) {
      const entry = this._mem.get(key);
      if (now <= entry.expiresAt) {
        return entry.song;
      }
      this._mem.delete(key);
    }

    // 2. L2 Storage check
    const storageKey = KEY_PREFIX + key;
    try {
      const result = await chrome.storage.local.get(storageKey);
      const entry = result[storageKey];
      if (!entry) return null;

      if (now > entry.expiresAt) {
        chrome.storage.local.remove(storageKey);
        return null;
      }

      // Warm L1
      this._mem.set(key, entry);
      this._persisted.set(key, entry);
      return entry.song;
    } catch (_) {
      return null;
    }
  }

  /**
   * Cache an identified song for this title and timestamp.
   * Also spans adjacent buckets if duration allows, so scrubbing ahead/behind hits cache.
   * @param {string} titleKey
   * @param {number} currentTime
   * @param {object} song
   * @param {number} [ttlMs]
   */
  async cacheSongAtTime(titleKey, currentTime, song, ttlMs = CACHE_TTL_MS) {
    if (!song || !song.title) return;

    const now = Date.now();
    const normalizedSong = {
      ...song,
      title: normalizeTitle(song.title) || song.title,
      artist: normalizeArtist(song.artist) || song.artist,
    };
    const entry = { song: normalizedSong, expiresAt: now + ttlMs };

    // Cache only the current 15-second bucket. Expanding this to neighboring
    // buckets made a 45-second window look like one continuous song after a
    // scene change.
    const baseBucket = Math.max(0, Math.floor((currentTime || 0) / BUCKET_SIZE_SEC));
    const cleanTitle = `${musicScope()}|${(titleKey || 'general').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const bucketsToCache = [baseBucket];

    const storagePayload = {};
    let needsWrite = false;
    for (const b of bucketsToCache) {
      const key = `${cleanTitle}:t${b}`;
      const previous = this._persisted.get(key) || this._mem.get(key);
      this._mem.set(key, entry);

      // The metadata poller runs every few seconds. Avoid rewriting identical
      // entries on every poll; only persist when this bucket is new or changed.
      if (
        !previous ||
        previous.expiresAt <= now ||
        !isSameSong(previous.song, normalizedSong)
      ) {
        storagePayload[KEY_PREFIX + key] = entry;
        needsWrite = true;
      }
    }

    if (!needsWrite) return;

    try {
      await chrome.storage.local.set(storagePayload);
      for (const key of Object.keys(storagePayload)) {
        this._persisted.set(key.slice(KEY_PREFIX.length), entry);
      }
    } catch (err) {
      console.warn('[wos:music-cache] Storage set error:', err);
    }
  }

  /**
   * Clear in-memory cache
   */
  clearMemory() {
    this._mem.clear();
    this._persisted.clear();
  }
}

function isSameSong(a, b) {
  return (
    a?.title === b?.title &&
    a?.artist === b?.artist &&
    (a?.album || null) === (b?.album || null) &&
    (a?.source || null) === (b?.source || null)
  );
}

export const musicCache = new MusicCacheManager();
