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
  if (item && item.expiresAt > Date.now()) {
    return item.value;
  }
  return null;
}

/**
 * Sets a cached value with a TTL in seconds (default 60s).
 */
export async function setCache(key, value, ttlSeconds = 60) {
  const jsonStr = JSON.stringify(value);

  if (isRedisConnected && redisClient) {
    try {
      await redisClient.setex(key, ttlSeconds, jsonStr);
      return;
    } catch (_) {
      isRedisConnected = false;
    }
  }

  // Fallback to in-memory map
  inMemoryFallbackCache.set(key, {
    value,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
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
