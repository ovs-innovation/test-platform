import { pool } from '../src/config/db.js';

const run = async () => {
  try {
    const before = await pool.query('SELECT COUNT(*)::int AS c FROM users');
    const { rowCount } = await pool.query('DELETE FROM users');
    // eslint-disable-next-line no-console
    console.log(`[clear-users] Deleted ${rowCount} user(s) (had ${before.rows[0].c}).`);
    // eslint-disable-next-line no-console
    console.log('[clear-users] Related attempts, scores, enrollments, and profiles were removed via CASCADE.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[clear-users] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
