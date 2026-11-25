import { query } from '../src/config/db.js';

async function main() {
  const res = await query(`
    SELECT t.id, t.test_name, t.syllabus,
      (SELECT ts.target_class 
       FROM test_series_tests tst 
       JOIN test_series ts ON ts.id = tst.series_id 
       WHERE tst.test_id = t.id LIMIT 1) as ts_class,
      (SELECT b.class_level 
       FROM test_assignments ta 
       JOIN batches b ON b.id = ta.assigned_to_id 
       WHERE ta.test_id = t.id AND ta.assigned_to_type = 'batch' LIMIT 1) as batch_class
    FROM tests t
    WHERE COALESCE(t.is_deleted, false) = false
    ORDER BY t.id DESC
  `);
  console.log(`Found ${res.rowCount} tests:`);
  for (const row of res.rows.slice(0, 25)) {
    console.log(`ID: ${row.id} | Name: ${row.test_name} | TS Class: ${row.ts_class} | Batch Class: ${row.batch_class}`);
  }
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
