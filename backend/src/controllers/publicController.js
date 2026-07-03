import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPublicStats = asyncHandler(async (_req, res) => {
  const [series, students, attempts] = await Promise.all([
    query('SELECT COUNT(*)::int AS c FROM test_series WHERE is_active = true'),
    query("SELECT COUNT(*)::int AS c FROM users WHERE role = 'candidate'"),
    query("SELECT COUNT(*)::int AS c FROM attempts WHERE status IN ('submitted', 'auto_submitted')"),
  ]);
  res.json({
    stats: {
      test_series: series.rows[0].c,
      students: students.rows[0].c,
      tests_taken: attempts.rows[0].c,
    },
  });
});

export const listPublicTestSeries = asyncHandler(async (req, res) => {
  const { featured } = req.query;
  let sql = `
    SELECT id, title, slug, description, price, validity_days, exam_type, test_count, is_featured, image_url
    FROM test_series WHERE is_active = true`;
  if (featured === 'true') sql += ' AND is_featured = true';
  sql += ' ORDER BY is_featured DESC, price ASC, id ASC';
  const result = await query(sql);
  res.json({ test_series: result.rows });
});

export const getPublicTestSeries = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const result = await query(
    `SELECT ts.*,
            COALESCE(json_agg(json_build_object(
              'id', a.id, 'title', a.title, 'duration_minutes', a.duration_minutes,
              'label', tsa.label, 'position', tsa.position
            ) ORDER BY tsa.position) FILTER (WHERE a.id IS NOT NULL), '[]') AS tests
     FROM test_series ts
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     LEFT JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
     WHERE ts.slug = $1 AND ts.is_active = true
     GROUP BY ts.id`,
    [slug]
  );
  if (result.rowCount === 0) {
    return res.status(404).json({ message: 'Test series not found' });
  }
  res.json({ test_series: result.rows[0] });
});

export const listSubjects = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT s.*, COUNT(c.id)::int AS chapter_count
     FROM subjects s
     LEFT JOIN chapters c ON c.subject_id = s.id
     WHERE s.active = true
     GROUP BY s.id ORDER BY s.name`
  );
  res.json({ subjects: result.rows });
});
