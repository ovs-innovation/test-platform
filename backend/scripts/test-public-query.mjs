import { query, pool } from '../src/config/db.js';

const run = async () => {
  try {
    const sql = `
      SELECT ts.*,
             COALESCE(ts.planned_tests, ts.test_count, 0)::int AS planned_test_count,
             COUNT(DISTINCT tsa.assessment_id)::int AS linked_tests,
             COALESCE(
               (
                 SELECT JSON_AGG(
                   JSON_BUILD_OBJECT(
                     'id', a.id,
                     'title', a.title,
                     'duration_minutes', COALESCE(a.duration_minutes, 180),
                     'total_marks', COALESCE((SELECT SUM(q.marks)::int FROM questions q WHERE q.assessment_id = a.id), 0),
                     'is_published', COALESCE(a.is_published, false),
                     'available_from', a.available_from,
                     'available_until', a.available_until,
                     'question_count', COALESCE((SELECT COUNT(*)::int FROM questions q WHERE q.assessment_id = a.id), 0)
                   ) ORDER BY tsa2.position ASC
                 )
                 FROM test_series_assessments tsa2
                 JOIN assessments a ON a.id = tsa2.assessment_id
                 WHERE tsa2.test_series_id = ts.id AND a.is_published = true
               ),
               '[]'::json
             ) AS tests
      FROM test_series ts
      LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
      WHERE ts.is_active = true
      GROUP BY ts.id
      ORDER BY ts.is_featured DESC, ts.created_at DESC, ts.id ASC
    `;
    const result = await query(sql);
    const free = result.rows.filter(r => Number(r.price) === 0);
    console.log('FREE SERIES WITH TESTS:', JSON.stringify(free, null, 2));
  } catch (err) {
    console.error('QUERY ERR:', err);
  } finally {
    await pool.end();
  }
};

run();
