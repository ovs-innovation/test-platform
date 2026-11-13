/**
 * Client-Side Persistent Cache using IndexedDB with Memory Fallback.
 * Ensures massive payloads like PYQ Question Bank (2000+ questions per subject)
 * are stored persistently on the user's browser, eliminating redundant network/DB hits
 * and reducing page loading time to 0-10ms (Instant Load).
 */

const DB_NAME = 'edvedum_qb_cache_v1';
const STORE_NAME = 'qb_cache';
const MEMORY_CACHE = new Map();

function openDb() {
  if (typeof window === 'undefined' || !window.indexedDB) return null;
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch (_) {
      resolve(null);
    }
  });
}

export const persistentCache = {
  /**
   * Synchronously checks in-memory cache for 0ms instant render.
   */
  getSync(key) {
    const item = MEMORY_CACHE.get(key);
    if (!item) return null;
    const now = Date.now();
    if (item.expiresAt && item.expiresAt <= now) {
      MEMORY_CACHE.delete(key);
      return null;
    }
    return item.data;
  },

  /**
   * Asynchronously retrieves from memory or IndexedDB.
   */
  async get(key) {
    // 1. Try memory first (0ms)
    const memData = persistentCache.getSync(key);
    if (memData !== null) return memData;

    // 2. Try IndexedDB (<10ms)
    try {
      const db = await openDb();
      if (!db) return null;

      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);

        req.onsuccess = () => {
          const item = req.result;
          if (!item) {
            resolve(null);
            return;
          }

          const now = Date.now();
          if (item.expiresAt && item.expiresAt <= now) {
            persistentCache.delete(key);
            resolve(null);
            return;
          }

          // Hydrate memory cache for subsequent sync lookups
          MEMORY_CACHE.set(key, item);
          resolve(item.data);
        };

        req.onerror = () => resolve(null);
      });
    } catch (_) {
      return null;
    }
  },

  /**
   * Stores value into memory and persists to IndexedDB.
   * Default TTL: 24 Hours (86,400,000 ms)
   */
  async set(key, data, ttlMs = 86400000) {
    const now = Date.now();
    const item = {
      data,
      timestamp: now,
      expiresAt: now + ttlMs,
    };

    // Store in memory
    MEMORY_CACHE.set(key, item);

    // Persist to IndexedDB
    try {
      const db = await openDb();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(item, key);
    } catch (_) {}
  },

  /**
   * Deletes a key or all keys matching a prefix.
   */
  async delete(keyOrPrefix) {
    if (!keyOrPrefix) return;

    // Delete from memory
    for (const k of MEMORY_CACHE.keys()) {
      if (k === keyOrPrefix || k.startsWith(keyOrPrefix) || (keyOrPrefix === 'qb' && (k.startsWith('qb_') || k.includes('qb')))) {
        MEMORY_CACHE.delete(k);
      }
    }

    // Delete from IndexedDB
    try {
      const db = await openDb();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = req.result || [];
        keys.forEach((k) => {
          if (k === keyOrPrefix || k.startsWith(keyOrPrefix) || (keyOrPrefix === 'qb' && (k.startsWith('qb_') || k.includes('qb')))) {
            store.delete(k);
          }
        });
      };
    } catch (_) {}
  },

  /**
   * Clears the entire persistent cache.
   */
  async clear() {
    MEMORY_CACHE.clear();
    try {
      const db = await openDb();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
    } catch (_) {}
  }
};
