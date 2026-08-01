import { pool, query } from '../config/db.js';

const verify = async () => {
  try {
    console.log('[verify] Checking database tables and columns...');
    
    const tstCheck = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'test_series_tests'
    `);
    console.log('[verify] test_series_tests columns:', tstCheck.rows.map(r => r.column_name));

    const testsCheck = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'tests'
    `);
    console.log('[verify] tests table has columns:', testsCheck.rows.map(r => r.column_name));

    const seriesCheck = await query(`
      SELECT ts.id, ts.title,
             COUNT(DISTINCT tst.test_id)::int AS linked_tests,
             COUNT(DISTINCT tst.test_id)::int AS planned_tests
      FROM test_series ts
      LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
      GROUP BY ts.id LIMIT 5
    `);
    console.log('[verify] Sample test_series with dynamic joins:', seriesCheck.rows);

    console.log('[verify] Verification successfully completed!');
  } catch (err) {
    console.error('[verify] Failed:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

verify();
