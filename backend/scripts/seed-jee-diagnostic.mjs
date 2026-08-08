import { query, pool } from '../src/config/db.js';

const run = async () => {
  try {
    const existing = await query('SELECT id FROM test_series WHERE slug = $1', ['jee-main-diagnostic-free']);
    if (existing.rowCount === 0) {
      const ins = await query(
        `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, is_featured, test_count, image_url, is_active)
         VALUES ($1, $2, $3, 0.00, 365, $4, true, 1, $5, true)
         RETURNING id`,
        [
          'JEE Main Full-Length Diagnostic Mock',
          'jee-main-diagnostic-free',
          'Full length JEE Main diagnostic mock test with Physics, Chemistry and Mathematics.',
          'JEE Main',
          '/test-series/jee.svg',
        ]
      );
      const tsId = ins.rows[0].id;
      await query(
        `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
         VALUES ($1, 22, 1, $2)
         ON CONFLICT DO NOTHING`,
        [tsId, 'JEE Diagnostic Mock 1']
      );
      console.log('CREATED JEE DIAGNOSTIC SERIES ID:', tsId);
    } else {
      console.log('JEE DIAGNOSTIC SERIES ALREADY EXISTS');
    }
  } catch (e) {
    console.error('SEED ERROR:', e);
  } finally {
    await pool.end();
  }
};

run();
