import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const FALLBACK_SERIES = [
  {
    id: 20,
    title: 'NEET-UG 2027 Comprehensive Test Series',
    code: 'AIETS-NEET-2027-1Y',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    description: 'Prepare for NEET-UG 2027 through 39 structured CBT assessments, national-level benchmarking, performance analytics, detailed solutions and progressive syllabus coverage.',
    price: '1999.00',
    validity_days: 365,
    exam_type: 'NEET',
    planned_tests: 39,
    planned_test_count: 39,
    linked_tests: 39,
    test_count: 39,
    is_featured: true,
    is_active: true,
    image_url: '/test-series/neet.svg',
  },
  {
    id: 21,
    title: 'AIETS Two-Year Online CBT Program',
    code: 'AIETS-NEET-2028-2Y',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description: 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed solutions and progressive NEET preparation.',
    price: '3999.00',
    validity_days: 730,
    exam_type: 'NEET',
    planned_tests: 60,
    planned_test_count: 60,
    linked_tests: 0,
    test_count: 60,
    is_featured: false,
    is_active: true,
    image_url: '/test-series/neet.svg',
  },
  {
    id: 1,
    title: 'JEE Main Full Test Series 2026',
    slug: 'jee-main-2026',
    description: '10 full-length JEE Main mock tests with NTA-style CBT interface, detailed solutions and analytics.',
    price: '999.00',
    validity_days: 365,
    exam_type: 'JEE Main',
    planned_tests: 10,
    planned_test_count: 10,
    linked_tests: 3,
    test_count: 10,
    is_featured: true,
    is_active: true,
    image_url: '/test-series/jee.svg',
  },
  {
    id: 2,
    title: 'NEET UG Mock Test Pack',
    slug: 'neet-ug-mock',
    description: '8 NEET pattern full mocks with Biology-heavy sections and rank prediction.',
    price: '799.00',
    validity_days: 180,
    exam_type: 'NEET',
    planned_tests: 8,
    planned_test_count: 8,
    linked_tests: 1,
    test_count: 8,
    is_featured: true,
    is_active: true,
    image_url: '/test-series/neet.svg',
  },
  {
    id: 3,
    title: 'NEET PG Mock Test Pack',
    slug: 'neet-pg-mock',
    description: '8 full-length NEET PG pattern mocks with clinical focus and detailed solutions.',
    price: '699.00',
    validity_days: 180,
    exam_type: 'NEET PG',
    planned_tests: 8,
    planned_test_count: 8,
    linked_tests: 1,
    test_count: 8,
    is_featured: false,
    is_active: true,
    image_url: '/test-series/neet-pg.svg',
  },
];

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
  try {
    let sql = `
      SELECT ts.*,
             COALESCE(ts.planned_tests, ts.test_count, 0)::int AS planned_test_count,
             COUNT(DISTINCT tsa.assessment_id)::int AS linked_tests
      FROM test_series ts
      LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
      WHERE ts.is_active = true`;
    if (featured === 'true') sql += ' AND ts.is_featured = true';
    sql += ' GROUP BY ts.id ORDER BY ts.is_featured DESC, ts.created_at DESC, ts.id ASC';
    const result = await query(sql);
    if (result.rows && result.rows.length > 0) {
      return res.json({ test_series: result.rows });
    }
  } catch (err) {
    console.warn('[publicController] DB query warning:', err.message);
  }

  let list = FALLBACK_SERIES;
  if (featured === 'true') list = list.filter((s) => s.is_featured);
  res.json({ test_series: list });
});

export const getPublicTestSeries = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await query(
      `SELECT ts.*,
              COALESCE(ts.planned_tests, ts.test_count, 0)::int AS planned_test_count,
              COALESCE(json_agg(json_build_object(
                'id', COALESCE(a.id, tsa.assessment_id),
                'title', COALESCE(a.title, tsa.label, 'Assessment'),
                'label', COALESCE(tsa.label, a.title),
                'position', tsa.position,
                'duration_minutes', COALESCE(a.duration_minutes, 180),
                'total_marks', COALESCE(a.total_marks, 720),
                'category', CASE 
                              WHEN tsa.label LIKE 'AIETS%' THEN 'AIETS Mock'
                              WHEN tsa.label LIKE 'Unit%' THEN 'Unit Test'
                              WHEN tsa.label LIKE 'Part%' THEN 'Part Test'
                              WHEN tsa.label LIKE 'Cumulative%' THEN 'Cumulative Test'
                              ELSE 'Full-Syllabus Mock'
                            END,
                'scheduled_at', a.scheduled_at,
                'is_published', COALESCE(a.is_published, false),
                'status', COALESCE(a.status, 'DRAFT')
              ) ORDER BY tsa.position ASC) FILTER (WHERE tsa.assessment_id IS NOT NULL), '[]') AS tests
       FROM test_series ts
       LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
       LEFT JOIN assessments a ON a.id = tsa.assessment_id
       WHERE (ts.slug = $1 OR ts.id::text = $1) AND ts.is_active = true
       GROUP BY ts.id`,
      [slug]
    );
    if (result.rowCount > 0) {
      return res.json({ test_series: result.rows[0] });
    }
  } catch (err) {
    console.warn('[publicController] DB query warning for slug:', slug, err.message);
  }

  const fallback = FALLBACK_SERIES.find((s) => s.slug === slug || s.id.toString() === slug);
  if (!fallback) {
    return res.status(404).json({ message: 'Test series not found' });
  }
  res.json({ test_series: { ...fallback, tests: [] } });
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
