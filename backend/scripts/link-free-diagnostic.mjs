import { pool } from '../src/config/db.js';

const run = async () => {
  const r = await pool.query(`
    INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
    SELECT ts.id, a.id, 1, 'Diagnostic Mock 1'
    FROM test_series ts
    CROSS JOIN assessments a
    WHERE ts.slug = 'free-diagnostic' AND a.is_published = true
    ORDER BY a.id
    LIMIT 1
    ON CONFLICT DO NOTHING
    RETURNING *
  `);
  console.log('[link] Free diagnostic tests linked:', r.rowCount);
  await pool.end();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
