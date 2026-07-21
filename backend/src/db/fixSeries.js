import { query } from '../config/db.js';

async function fix() {
  console.log('[fixSeries] Starting test series database cleanup...');
  await query(`UPDATE test_series SET title = 'NEET UG All India Super Mock', slug = 'neet-ug-super-mock', price = 999.00, exam_type = 'NEET' WHERE id = 5`);
  await query(`UPDATE test_series SET title = 'JEE Main Physics Practice Pack', slug = 'jee-main-physics-pack', price = 0.00, exam_type = 'JEE Main' WHERE id = 6`);
  await query(`UPDATE test_series SET title = 'NEET Chemistry Speed Test Series', slug = 'neet-chemistry-speed-test', price = 0.00, exam_type = 'NEET' WHERE id = 7`);
  await query(`UPDATE test_series SET title = 'NEET Biology High-Yield Mock', slug = 'neet-biology-high-yield', price = 0.00, exam_type = 'NEET' WHERE id = 8`);
  await query(`UPDATE test_series SET title = 'Class 12 Science Entrance Prep', slug = 'class-12-science-prep', price = 499.00, exam_type = 'Foundation' WHERE id = 9`);
  await query(`UPDATE test_series SET title = 'General Aptitude & Logical Reasoning', slug = 'general-aptitude-reasoning', price = 299.00, exam_type = 'Foundation' WHERE id = 10`);
  await query(`UPDATE test_series SET price = 1299.00 WHERE id = 1`);
  await query(`UPDATE test_series SET price = 999.00 WHERE id = 2`);
  await query(`UPDATE test_series SET price = 1499.00 WHERE id = 3`);

  const res = await query('SELECT id, title, slug, price, exam_type FROM test_series ORDER BY id ASC');
  console.log('[fixSeries] Updated Test Series Table:', res.rows);
  process.exit(0);
}

fix().catch((err) => {
  console.error('[fixSeries] Error:', err);
  process.exit(1);
});
