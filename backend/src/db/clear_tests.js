import { pool, withTransaction } from '../config/db.js';

const clearTests = async () => {
  try {
    await withTransaction(async (client) => {
      console.log('[clear_tests] Deleting test assignments and test overrides...');
      await client.query('DELETE FROM missed_test_overrides WHERE test_id IN (SELECT id FROM tests)');
      await client.query('DELETE FROM test_attempts WHERE test_id IN (SELECT id FROM tests)');
      await client.query('DELETE FROM test_assignments WHERE test_id IN (SELECT id FROM tests)');
      
      console.log('[clear_tests] Deleting all tests from tests table...');
      const res = await client.query('DELETE FROM tests');
      console.log(`[clear_tests] Successfully deleted ${res.rowCount} tests.`);
    });
  } catch (err) {
    console.error('[clear_tests] Error clearing tests:', err);
  } finally {
    await pool.end();
  }
};

clearTests();
