import { query } from '../config/db.js';

async function fixFreeMocks() {
  console.log('[fixFreeMocks] Updating free test series status and parameters in PostgreSQL...');
  
  await query(`
    UPDATE test_series
    SET title = 'NEET UG Biology & Chemistry Diagnostic Mock',
        slug = 'neet-ug-diagnostic-free',
        description = '1 full-length NEET UG diagnostic mock covering High-Yield Biology and Chemistry topics.',
        image_url = '/test-series/neet.svg',
        price = 0.00,
        exam_type = 'NEET',
        is_active = true
    WHERE id = 7
  `);

  await query(`
    UPDATE test_series
    SET title = 'NEET PG Clinical & High-Yield Diagnostic Mock',
        slug = 'neet-pg-clinical-free',
        description = '1 full-length NEET PG diagnostic mock featuring Clinical scenarios, MD/MS image-based questions, and rank predictor.',
        image_url = '/test-series/neet-pg.svg',
        price = 0.00,
        exam_type = 'NEET PG',
        is_active = true
    WHERE id = 8
  `);

  const res = await query(`SELECT id, title, slug, price, exam_type, is_active, description FROM test_series WHERE price = 0.00 ORDER BY id ASC`);
  console.log('[fixFreeMocks] Free Test Series in Database:', res.rows);
  process.exit(0);
}

fixFreeMocks().catch((err) => {
  console.error('[fixFreeMocks] Error:', err);
  process.exit(1);
});
