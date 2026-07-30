import dns from 'node:dns';
import pg from 'pg';
import { env } from './env.js';

// Set process-level DNS resolution order for Neon dualstack / CNAME hostnames
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const { Pool } = pg;

const isLocalDb =
  (env.databaseUrl && (env.databaseUrl.includes('localhost') || env.databaseUrl.includes('127.0.0.1'))) ||
  (!env.databaseUrl && (env.pg.host === 'localhost' || env.pg.host === '127.0.0.1'));

const poolConfig = env.databaseUrl
  ? {
      connectionString: env.databaseUrl,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
    }
  : {
      host: env.pg.host,
      port: env.pg.port,
      user: env.pg.user,
      password: env.pg.password,
      database: env.pg.database,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      ssl: isLocalDb ? false : { rejectUnauthorized: false },
    };

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[db] Unexpected error on idle PostgreSQL pool client', err?.message || err);
});

/**
 * Run a parameterized query with safe retry for transient DB connection drops.
 */
export const query = async (text, params, retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      const isTransient =
        err &&
        (err.code === 'ENOTFOUND' ||
          err.code === 'ETIMEDOUT' ||
          err.code === 'ECONNRESET' ||
          err.code === '57P01' ||
          (err.message && (err.message.includes('getaddrinfo') || err.message.includes('connection terminated'))));

      if (isTransient && attempt < retries) {
        // eslint-disable-next-line no-console
        console.warn(`[db] Retrying transient query failure (attempt ${attempt + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
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
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
