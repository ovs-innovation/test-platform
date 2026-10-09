import dns from 'node:dns';
import pg from 'pg';
import { env } from './env.js';

// Set process-level DNS resolution order for Neon dualstack / CNAME hostnames
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const { Pool } = pg;

const isLocalDb =
  (env.databaseUrl && (
    env.databaseUrl.includes('localhost') ||
    env.databaseUrl.includes('127.0.0.1') ||
    env.databaseUrl.includes('@postgres') ||
    env.databaseUrl.includes('postgres:5432') ||
    env.databaseUrl.includes('sslmode=disable')
  )) ||
  (!env.databaseUrl && (
    env.pg.host === 'localhost' ||
    env.pg.host === '127.0.0.1' ||
    env.pg.host === 'postgres'
  ));

const maxPool = parseInt(process.env.DB_POOL_MAX || (env.isProd ? '20' : '10'), 10);
const minPool = parseInt(process.env.DB_POOL_MIN || '2', 10);
const idleTimeoutMillis = parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10);
const connectionTimeoutMillis = parseInt(process.env.DB_CONN_TIMEOUT_MS || '10000', 10);

const poolConfig = env.databaseUrl
  ? {
      connectionString: env.databaseUrl,
      max: maxPool,
      min: minPool,
      idleTimeoutMillis,
      connectionTimeoutMillis,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
    }
  : {
      host: env.pg.host,
      port: env.pg.port,
      user: env.pg.user,
      password: env.pg.password,
      database: env.pg.database,
      max: maxPool,
      min: minPool,
      idleTimeoutMillis,
      connectionTimeoutMillis,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
    };

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[db] Unexpected error on idle PostgreSQL pool client', err?.message || err);
});

/**
 * Recursively strip null bytes (\0 / \u0000) from query parameters.
 * PostgreSQL rejects \0 in UTF-8 strings with "invalid byte sequence for encoding "UTF8": 0x00".
 */
export function sanitizeDbParam(val) {
  if (typeof val === 'string') {
    return val.replace(/\0/g, '');
  }
  if (Array.isArray(val)) {
    return val.map(sanitizeDbParam);
  }
  if (val !== null && typeof val === 'object' && !(val instanceof Date) && !Buffer.isBuffer(val)) {
    const cleaned = {};
    for (const [k, v] of Object.entries(val)) {
      cleaned[k] = sanitizeDbParam(v);
    }
    return cleaned;
  }
  return val;
}

/**
 * Run a parameterized query with safe retry for transient DB connection drops.
 */
export const query = async (text, params, retries = 3) => {
  const safeText = typeof text === 'string' ? text.replace(/\0/g, '') : text;
  const safeParams = Array.isArray(params) ? params.map(sanitizeDbParam) : params;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await pool.query(safeText, safeParams);
    } catch (err) {
      const isTransient =
        err &&
        (err.code === 'ENOTFOUND' ||
          err.code === 'ETIMEDOUT' ||
          err.code === 'ECONNRESET' ||
          err.code === '57P01' ||
          err.code === '08006' ||
          err.code === '08003' ||
          err.code === '08001' ||
          (err.message &&
            (err.message.includes('getaddrinfo') ||
             err.message.includes('connection terminated') ||
             err.message.includes('Connection terminated unexpectedly') ||
             err.message.includes('SSL') ||
             err.message.includes('Client has encountered a connection error'))));

      if (isTransient && attempt < retries) {
        // eslint-disable-next-line no-console
        console.warn(`[db] Retrying transient query failure (attempt ${attempt + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
};

/**
 * Run a set of statements inside a single transaction.
 */
export const withTransaction = async (callback) => {
  const client = await pool.connect();
  const origQuery = client.query.bind(client);
  client.query = (qText, qParams, ...rest) => {
    const safeText = typeof qText === 'string' ? qText.replace(/\0/g, '') : qText;
    const safeParams = Array.isArray(qParams) ? qParams.map(sanitizeDbParam) : qParams;
    return origQuery(safeText, safeParams, ...rest);
  };
  try {
    await origQuery('BEGIN');
    const result = await callback(client);
    await origQuery('COMMIT');
    return result;
  } catch (err) {
    await origQuery('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
};
