import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

const poolConfig = env.databaseUrl
  ? { connectionString: env.databaseUrl }
  : {
      host: env.pg.host,
      port: env.pg.port,
      user: env.pg.user,
      password: env.pg.password,
      database: env.pg.database,
    };

// Enable SSL for hosted databases (Neon, RDS, etc.) that require it.
const isLocalDb =
  env.databaseUrl.includes('localhost') ||
  env.databaseUrl.includes('127.0.0.1') ||
  (!env.databaseUrl && (env.pg.host === 'localhost' || env.pg.host === '127.0.0.1'));

if (!isLocalDb) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[db] Unexpected error on idle PostgreSQL client', err);
});

/**
 * Run a parameterized query. Always use $1, $2 placeholders to avoid SQL injection.
 */
export const query = (text, params) => pool.query(text, params);

/**
 * Run a set of statements inside a single transaction.
 * The callback receives a dedicated client.
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
