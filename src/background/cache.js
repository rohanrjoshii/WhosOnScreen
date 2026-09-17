/**
 * WhosOnScreen – Two-Tier Cache (L1 In-Memory + L2 chrome.storage.local)
 *
 * Provides sub-millisecond instant responses for repeated lookups:
 *  - L1: Fast JS Map in memory (0ms access)
 *  - L2: Persistent chrome.storage.local across restarts
 *  - Used for: cast lists, actor profiles, face signatures, search queries
 *
 * Entries expire after 7 days by default.
 */

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const KEY_PREFIX = 'wos_cache_';

export class Cache {
  constructor() {
    this._mem = new Map();
  }

  /**
   * Get a cached value. Checks L1 memory first, then L2 storage.
   * @param {string} key
   * @returns {Promise<any|null>}
   */
  async get(key) {
    const now = Date.now();

    // 1. Check L1 memory cache (instant 0ms)
    if (this._mem.has(key)) {
      const memEntry = this._mem.get(key);
      if (now <= memEntry.expiresAt) {
        return memEntry.value;
      }
      this._mem.delete(key);
    }

    // 2. Fall back to L2 storage
    const storageKey = KEY_PREFIX + key;
    try {
      const result = await chrome.storage.local.get(storageKey);
      const entry = result[storageKey];

      if (!entry) return null;
      if (now > entry.expiresAt) {
        // Expired in storage
        chrome.storage.local.remove(storageKey);
        return null;
      }

      // Populate L1 cache for subsequent instant access
      this._mem.set(key, entry);
      return entry.value;
    } catch (_) {
      return null;
    }
  }

  /**
   * Store a value with optional TTL.
   * Immediately updates L1 memory and asynchronously commits to L2 storage.
   * @param {string} key
   * @param {any} value - Must be JSON-serializable.
   * @param {number} [ttlMs] - Time to live in ms. Defaults to 7 days.
   */
  async set(key, value, ttlMs = DEFAULT_TTL_MS) {
    const expiresAt = Date.now() + ttlMs;
    const entry = { value, expiresAt };

    // 1. Write to L1 immediately
    this._mem.set(key, entry);

    // 2. Commit to L2 storage
    const storageKey = KEY_PREFIX + key;
    try {
      await chrome.storage.local.set({ [storageKey]: entry });
    } catch (err) {
      console.warn('[wos:cache] write error:', err);
    }
  }

  /**
   * Remove a specific cached entry.
   * @param {string} key
   */
  async remove(key) {
    this._mem.delete(key);
    await chrome.storage.local.remove(KEY_PREFIX + key);
  }

  /**
   * Clear all WhosOnScreen cache entries.
   */
  async clear() {
    this._mem.clear();
    const all = await chrome.storage.local.get(null);
    const keys = Object.keys(all).filter((k) => k.startsWith(KEY_PREFIX));
    if (keys.length > 0) {
      await chrome.storage.local.remove(keys);
    }
  }
}
