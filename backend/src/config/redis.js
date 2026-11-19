import Redis from 'ioredis';
import { env } from './env.js';

let redisClient = null;
let isRedisConnected = false;
const inMemoryFallbackCache = new Map();

try {
  redisClient = new Redis(env.redisUrl, {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    connectTimeout: 2000,
    retryStrategy(times) {
      if (times > 3) {
        return null; // Stop retrying after 3 attempts, switch gracefully to fallback
      }
      return Math.min(times * 500, 2000);
    },
  });

  redisClient.on('connect', () => {
    isRedisConnected = true;
    // eslint-disable-next-line no-console
    console.log('[Redis] Connected to Redis Cache server successfully.');
  });

  redisClient.on('error', (err) => {
    isRedisConnected = false;
    // eslint-disable-next-line no-console
    console.warn('[Redis Notice] Redis connection unavailable. Using in-memory fallback cache:', err.message || err);
  });
} catch (err) {
  isRedisConnected = false;
  // eslint-disable-next-line no-console
  console.warn('[Redis Notice] Failed to initialize Redis client. Operating in fallback mode:', err.message);
}

/**
 * Gets a cached value by key. Returns parsed object or null.
 */
export async function getCache(key) {
  if (isRedisConnected && redisClient) {
    try {
      const data = await redisClient.get(key);
      if (data) return JSON.parse(data);
    } catch (_) {
      isRedisConnected = false;
    }
  }

  // Fallback to in-memory map
  const item = inMemoryFallbackCache.get(key);
  if (item) {
    if (item.expiresAt > Date.now()) {
      return item.value;
    }
    inMemoryFallbackCache.delete(key);
  }
  return null;
}

/**
 * Sets a cached value with a TTL in seconds (default 60s).
 */
export async function setCache(key, value, ttlSeconds = 60) {
  if (isRedisConnected && redisClient) {
    try {
      const jsonStr = JSON.stringify(value);
      await redisClient.setex(key, ttlSeconds, jsonStr);
      return;
    } catch (_) {
      isRedisConnected = false;
    }
  }

  // Fallback to in-memory map with bounded memory safety (max 5000 keys)
  const MAX_IN_MEMORY_KEYS = 5000;
  if (inMemoryFallbackCache.size >= MAX_IN_MEMORY_KEYS) {
    const now = Date.now();
    for (const [k, v] of inMemoryFallbackCache.entries()) {
      if (v.expiresAt <= now) {
        inMemoryFallbackCache.delete(k);
      }
    }
    if (inMemoryFallbackCache.size >= MAX_IN_MEMORY_KEYS) {
      const oldestKey = inMemoryFallbackCache.keys().next().value;
      if (oldestKey) inMemoryFallbackCache.delete(oldestKey);
    }
  }

  inMemoryFallbackCache.set(key, {
    value,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
}

/**
 * Sets a field in a Redis hash with an overall TTL.
 */
export async function hsetCache(hashKey, field, value, ttlSeconds = 14400) {
  const jsonStr = typeof value === 'string' ? value : JSON.stringify(value);
  const fieldStr = String(field);

  if (isRedisConnected && redisClient) {
    try {
      await redisClient.hset(hashKey, fieldStr, jsonStr);
      if (ttlSeconds) await redisClient.expire(hashKey, ttlSeconds);
      return;
    } catch (_) {
      isRedisConnected = false;
    }
  }

  // Fallback to in-memory map
  let hash = inMemoryFallbackCache.get(hashKey)?.value;
  if (!hash || typeof hash !== 'object') {
    hash = {};
  }
  hash[fieldStr] = value;
  inMemoryFallbackCache.set(hashKey, {
    value: hash,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
}

/**
 * Gets all fields and values from a Redis hash.
 */
export async function hgetallCache(hashKey) {
  if (isRedisConnected && redisClient) {
    try {
      const raw = await redisClient.hgetall(hashKey);
      if (raw && Object.keys(raw).length > 0) {
        const parsed = {};
        for (const [k, v] of Object.entries(raw)) {
          try {
            parsed[k] = JSON.parse(v);
          } catch (_) {
            parsed[k] = v;
          }
        }
        return parsed;
      }
    } catch (_) {
      isRedisConnected = false;
    }
  }

  const item = inMemoryFallbackCache.get(hashKey);
  if (item && item.expiresAt > Date.now()) {
    return item.value || {};
  }
  return {};
}

/**
 * Deletes a field from a Redis hash.
 */
export async function hdelCache(hashKey, field) {
  const fieldStr = String(field);
  if (isRedisConnected && redisClient) {
    try {
      await redisClient.hdel(hashKey, fieldStr);
      return;
    } catch (_) {
      isRedisConnected = false;
    }
  }

  const item = inMemoryFallbackCache.get(hashKey);
  if (item && item.value) {
    delete item.value[fieldStr];
  }
}

/**
 * Deletes a cached key or invalidates keys by prefix/pattern.
 */
export async function delCache(keyOrPattern) {
  if (isRedisConnected && redisClient) {
    try {
      if (keyOrPattern.includes('*')) {
        const keys = await redisClient.keys(keyOrPattern);
        if (keys.length > 0) {
          await redisClient.del(...keys);
        }
      } else {
        await redisClient.del(keyOrPattern);
      }
    } catch (_) {
      isRedisConnected = false;
    }
  }

  // Fallback to in-memory map
  if (keyOrPattern.includes('*')) {
    const prefix = keyOrPattern.replace('*', '');
    for (const k of inMemoryFallbackCache.keys()) {
      if (k.startsWith(prefix)) inMemoryFallbackCache.delete(k);
    }
  } else {
    inMemoryFallbackCache.delete(keyOrPattern);
  }
}

/**
 * Cache-Aside Pattern helper: Returns cached data if available;
 * otherwise executes fetcherFn, caches result, and returns it.
 */
export async function rememberCache(key, ttlSeconds, fetcherFn) {
  const cached = await getCache(key);
  if (cached !== null) {
    return cached;
  }

  const result = await fetcherFn();
  if (result !== undefined && result !== null) {
    await setCache(key, result, ttlSeconds);
  }
  return result;
}

export { redisClient, isRedisConnected };
