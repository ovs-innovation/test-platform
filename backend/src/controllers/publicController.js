import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { rememberCache } from '../config/redis.js';
import { ApiError } from '../utils/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FALLBACK_SERIES = [
  // JEE Main
  {
    id: 23,
    title: 'AIETS JEE Main Class 12 One-Year CBT Program',
    slug: 'aiets-jee-main-mock-pack',
    description: 'One-year AIETS CBT program designed for Class 12 JEE aspirants with structured assessments, performance analytics and exam-focused practice.',
    price: '999.00',
    validity_days: 365,
    exam_type: 'JEE Main',
    planned_tests: null,
    planned_test_count: null,
    linked_tests: null,
    test_count: 0,
    tags: ['Physics, Chem & Maths', 'Class 12', 'JEE CBT Interface'],
    is_featured: false,
    is_active: true,
    display_order: 6,
    image_url: '/edvedum/jee-student-ai.png',
  },
  {
    id: 24,
    title: 'AIETS JEE Main 2027 Comprehensive Test Series',
    slug: 'aiets-jee-main-2027-comprehensive',
    description: '30 structured CBT assessments for JEE Main 2027 aspirants. Physics, Chemistry and Mathematics chapter, unit, part and full-syllabus tests with All India Rank & analytics.',
    price: '1999.00',
    validity_days: 365,
    exam_type: 'JEE Main',
    planned_tests: 30,
    planned_test_count: 30,
    linked_tests: 30,
    test_count: 30,
    is_featured: true,
    is_active: true,
    display_order: 2,
    image_url: '/edvedum/jee-student-ai.png',
  },
  {
    id: 25,
    title: 'AIETS JEE Main Complete Online CBT Program',
    slug: 'aiets-jee-main-2028-two-year',
    description: '24-month comprehensive online CBT program for Classes XI & XII with 60 structured assessments, ranking, subject analytics & detailed solutions for JEE Main.',
    price: '3999.00',
    validity_days: 730,
    exam_type: 'JEE Main',
    planned_tests: 60,
    planned_test_count: 60,
    linked_tests: 60,
    test_count: 60,
    is_featured: false,
    is_active: true,
    display_order: 5,
    image_url: '/edvedum/jee-student-ai.png',
  },
  // NEET UG
  {
    id: 2,
    title: 'AIETS NEET-UG Class 12 One-Year CBT Program',
    slug: 'neet-ug-mock',
    description: 'One-year AIETS CBT program designed for Class 12 NEET-UG aspirants with structured assessments, NCERT-focused practice and detailed performance analytics.',
    price: '999.00',
    validity_days: 365,
    exam_type: 'NEET',
    planned_tests: null,
    planned_test_count: null,
    linked_tests: null,
    test_count: 0,
    tags: ['Physics, Chem & Bio', 'Class 12', 'NCERT Focused'],
    is_featured: false,
    is_active: true,
    display_order: 8,
    image_url: '/edvedum/neet-student-ai.png',
  },
  {
    id: 20,
    title: 'AIETS NEET-UG 2027 Comprehensive Test Series',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    description: '39 structured CBT assessments for NEET-UG 2027 with NCERT focus, unit, part, cumulative & full-syllabus tests, All India Rank & analytics.',
    price: '1999.00',
    validity_days: 365,
    exam_type: 'NEET',
    planned_tests: 39,
    planned_test_count: 39,
    linked_tests: 39,
    test_count: 39,
    is_featured: true,
    is_active: true,
    display_order: 3,
    image_url: '/edvedum/neet-student-ai.png',
  },
  {
    id: 21,
    title: 'AIETS NEET-UG Two-Year Online CBT Program',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description: 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed NCERT solutions and progressive NEET preparation.',
    price: '3999.00',
    validity_days: 730,
    exam_type: 'NEET',
    planned_tests: 60,
    planned_test_count: 60,
    linked_tests: 60,
    test_count: 60,
    is_featured: false,
    is_active: true,
    display_order: 7,
    image_url: '/edvedum/neet-student-ai.png',
  },
  // NEET PG
  {
    id: 3,
    title: 'AIETS NEET-PG One-Year CBT Test Series',
    slug: 'neet-pg-mock',
    description: 'One-year AIETS CBT test series for NEET-PG aspirants covering all 19 medical subjects with clinical vignettes, structured assessments, grand mocks and performance analytics.',
    price: '999.00',
    validity_days: 365,
    exam_type: 'NEET PG',
    planned_tests: null,
    planned_test_count: null,
    linked_tests: null,
    test_count: 0,
    tags: ['19 Medical Subjects', 'Clinical Vignettes', 'Grand Mocks'],
    is_featured: false,
    is_active: true,
    display_order: 9,
    image_url: '/edvedum/neetpg-student-ai.png',
  },
  {
    id: 26,
    title: 'AIETS NEET-PG 2027 Comprehensive Test Series',
    slug: 'aiets-neet-pg-2027-comprehensive',
    description: '25 comprehensive CBT assessments for NEET PG 2027 covering 19 medical subjects, clinical vignettes, PYQ patterns, grand tests, All India Rank & explanations.',
    price: '1999.00',
    validity_days: 365,
    exam_type: 'NEET PG',
    planned_tests: 25,
    planned_test_count: 25,
    linked_tests: 25,
    test_count: 25,
    is_featured: true,
    is_active: true,
    display_order: 1,
    image_url: '/edvedum/neetpg-student-ai.png',
  },
  {
    id: 27,
    title: 'AIETS NEET-PG Complete Online CBT Program',
    slug: 'aiets-neet-pg-complete-program',
    description: 'Complete online CBT preparation program for NEET PG with 50 subject-wise and grand tests, clinical image questions, All India Rank & detailed performance analytics.',
    price: '3999.00',
    validity_days: 730,
    exam_type: 'NEET PG',
    planned_tests: 50,
    planned_test_count: 50,
    linked_tests: 50,
    test_count: 50,
    is_featured: false,
    is_active: true,
    display_order: 4,
    image_url: '/edvedum/neetpg-student-ai.png',
  },
  // Free Diagnostic
  {
    id: 22,
    title: 'JEE Main Full-Length Diagnostic Mock',
    slug: 'jee-main-diagnostic-free',
    description: 'Full-length JEE Main diagnostic mock covering Physics, Chemistry and Mathematics with JEE CBT pattern, All India Rank and instant score analysis.',
    price: '0.00',
    is_free: true,
    validity_days: 365,
    exam_type: 'JEE Main',
    planned_tests: 1,
    planned_test_count: 1,
    linked_tests: 1,
    test_count: 1,
    is_featured: false,
    is_active: true,
    display_order: 10,
    image_url: '/edvedum/banners/banner-free-mock.png',
  },
  {
    id: 7,
    title: 'NEET UG Biology & Chemistry Diagnostic Mock',
    slug: 'neet-ug-diagnostic-free',
    description: 'Full-length NEET UG diagnostic mock covering Physics, Chemistry and Biology with NCERT pattern, All India Rank and step solutions.',
    price: '0.00',
    is_free: true,
    validity_days: 365,
    exam_type: 'NEET',
    planned_tests: 1,
    planned_test_count: 1,
    linked_tests: 1,
    test_count: 1,
    is_featured: false,
    is_active: true,
    display_order: 11,
    image_url: '/edvedum/banners/banner-neet-bio.png',
  },
  {
    id: 8,
    title: 'NEET PG Clinical & High-Yield Diagnostic Mock',
    slug: 'neet-pg-clinical-free',
    description: 'Full-length NEET PG diagnostic mock featuring clinical scenarios, 19 medical subjects, image-based questions and All India Rank predictor.',
    price: '0.00',
    is_free: true,
    validity_days: 365,
    exam_type: 'NEET PG',
    planned_tests: 1,
    planned_test_count: 1,
    linked_tests: 1,
    test_count: 1,
    is_featured: false,
    is_active: true,
    display_order: 12,
    image_url: '/edvedum/banners/banner-neetpg-female.png',
  },
];

export const getPublicStats = asyncHandler(async (_req, res) => {
  const stats = await rememberCache('cache:public_stats', 60, async () => {
    const [series, students, attempts] = await Promise.all([
      query('SELECT COUNT(*)::int AS c FROM test_series WHERE is_active = true'),
      query("SELECT COUNT(*)::int AS c FROM users WHERE role = 'candidate'"),
      query("SELECT COUNT(*)::int AS c FROM attempts WHERE status IN ('submitted', 'auto_submitted')"),
    ]);
    return {
      test_series: series.rows[0].c,
      students: students.rows[0].c,
      tests_taken: attempts.rows[0].c,
    };
  });
  res.json({ stats });
});

export const listPublicTestSeries = asyncHandler(async (req, res) => {
  const { featured } = req.query;
  const cacheKey = `cache:public_test_series:${featured || 'all'}`;

  const payload = await rememberCache(cacheKey, 60, async () => {
    try {
      let sql = `
        SELECT ts.*,
               COALESCE(
                 NULLIF(ts.planned_tests, 0),
                 NULLIF(ts.test_count, 0),
                 (SELECT COUNT(*)::int FROM test_series_tests WHERE series_id = ts.id),
                 (SELECT COUNT(*)::int FROM test_series_assessments WHERE test_series_id = ts.id),
                 0
               )::int AS planned_test_count,
               GREATEST(
                 (SELECT COUNT(*)::int FROM test_series_tests WHERE series_id = ts.id),
                 (SELECT COUNT(*)::int FROM test_series_assessments WHERE test_series_id = ts.id)
               )::int AS linked_tests,
               COALESCE(
                 (
                   SELECT JSON_AGG(
                     JSON_BUILD_OBJECT(
                       'id', t.id,
                       'title', COALESCE(t.title, t.test_name),
                       'duration_minutes', COALESCE(t.duration_minutes, 180),
                       'is_published', COALESCE(t.is_published, false)
                     )
                   )
                   FROM test_series_tests tst2
                   JOIN tests t ON t.id = tst2.test_id AND COALESCE(t.is_deleted, false) = false
                   WHERE tst2.series_id = ts.id
                 ),
                 (
                   SELECT JSON_AGG(
                     JSON_BUILD_OBJECT(
                       'id', a.id,
                       'title', a.title,
                       'duration_minutes', COALESCE(a.duration_minutes, 180),
                       'is_published', COALESCE(a.is_published, false)
                     ) ORDER BY tsa2.position ASC
                   )
                   FROM test_series_assessments tsa2
                   JOIN assessments a ON a.id = tsa2.assessment_id
                   WHERE tsa2.test_series_id = ts.id AND a.is_published = true
                 ),
                 '[]'::json
               ) AS tests
        FROM test_series ts
        WHERE ts.is_active = true`;
      if (featured === 'true') sql += ' AND ts.is_featured = true';
      sql += ' ORDER BY ts.display_order ASC, ts.is_featured DESC, ts.created_at DESC, ts.id ASC';
      const result = await query(sql);
      if (result.rows && result.rows.length > 0) {
        return { test_series: result.rows };
      }
    } catch (err) {
      console.warn('[publicController] DB query warning:', err.message);
    }

    let list = FALLBACK_SERIES;
    if (featured === 'true') list = list.filter((s) => s.is_featured);
    return { test_series: list };
  });

  res.json(payload);
});

export const getPublicTestSeries = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await query(
      `SELECT ts.*,
              COALESCE(
                NULLIF(ts.planned_tests, 0),
                NULLIF(ts.test_count, 0),
                (SELECT COUNT(*)::int FROM test_series_tests WHERE series_id = ts.id),
                (SELECT COUNT(*)::int FROM test_series_assessments WHERE test_series_id = ts.id),
                0
              )::int AS planned_test_count,
              COALESCE(
                (
                  SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'id', t.id,
                      'title', COALESCE(t.title, t.test_name, 'Test'),
                      'label', COALESCE(t.title, t.test_name, 'Test'),
                      'duration_minutes', COALESCE(t.duration_minutes, 180),
                      'total_marks', COALESCE(t.max_marks, 720),
                      'question_count', 0,
                      'category', 'CBT Test',
                      'is_published', COALESCE(t.is_published, false)
                    )
                  )
                  FROM test_series_tests tst
                  JOIN tests t ON t.id = tst.test_id AND COALESCE(t.is_deleted, false) = false
                  WHERE tst.series_id = ts.id
                ),
                (
                  SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'id', a.id,
                      'title', COALESCE(a.title, tsa.label, 'Assessment'),
                      'label', COALESCE(tsa.label, a.title),
                      'position', tsa.position,
                      'duration_minutes', COALESCE(a.duration_minutes, 180),
                      'total_marks', COALESCE((SELECT SUM(q.marks)::int FROM questions q WHERE q.assessment_id = a.id), 0),
                      'question_count', COALESCE((SELECT COUNT(*)::int FROM questions q WHERE q.assessment_id = a.id), 0),
                      'category', CASE 
                                    WHEN tsa.label LIKE 'AIETS%' THEN 'AIETS Mock'
                                    WHEN tsa.label LIKE 'Unit%' THEN 'Unit Test'
                                    WHEN tsa.label LIKE 'Part%' THEN 'Part Test'
                                    WHEN tsa.label LIKE 'Cumulative%' THEN 'Cumulative Test'
                                    ELSE 'Full-Syllabus Mock'
                                  END,
                      'is_published', COALESCE(a.is_published, false)
                    ) ORDER BY tsa.position ASC
                  )
                  FROM test_series_assessments tsa
                  JOIN assessments a ON a.id = tsa.assessment_id
                  WHERE tsa.test_series_id = ts.id
                ),
                '[]'::json
              ) AS tests
       FROM test_series ts
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

/**
 * GET /api/public/test-series/:slug/brochure
 * Direct reliable download of test series brochure.
 * Handles local /uploads files, external URLs, and Cloudinary signed authentication fallback.
 */
export const downloadPublicBrochure = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const result = await query(
    'SELECT title, brochure_url, brochure_name FROM test_series WHERE slug = $1 OR id::text = $1',
    [slug]
  );

  if (!result.rowCount || !result.rows[0].brochure_url) {
    throw ApiError.notFound('Brochure not found for this test series');
  }

  const { title, brochure_url, brochure_name } = result.rows[0];
  const downloadName = brochure_name || `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Brochure.pdf`;

  // Case 1: Local /uploads file
  if (brochure_url.startsWith('/uploads/') || brochure_url.startsWith('uploads/')) {
    const relativePath = brochure_url.replace(/^\/?uploads\//, '');
    const fullPath = path.resolve(__dirname, '../../uploads', relativePath);
    if (fs.existsSync(fullPath)) {
      return res.download(fullPath, downloadName);
    }
  }

  // Case 2: Cloudinary URL
  if (brochure_url.includes('cloudinary.com')) {
    try {
      const { v2: cloudinary } = await import('cloudinary');
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (cloudName && apiKey && apiSecret) {
        cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
        const match = brochure_url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.pdf|\.[a-zA-Z0-9]+)?$/);
        const publicId = match ? match[1] : null;

        if (publicId) {
          const isRaw = brochure_url.includes('/raw/upload/');
          const privateUrl = cloudinary.utils.private_download_url(publicId, 'pdf', {
            resource_type: isRaw ? 'raw' : 'image',
            type: 'upload',
          });
          const upstream = await fetch(privateUrl);
          if (upstream.ok) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
            const arrayBuffer = await upstream.arrayBuffer();
            return res.send(Buffer.from(arrayBuffer));
          }
        }
      }
    } catch (cErr) {
      console.warn('[downloadPublicBrochure] Cloudinary fallback notice:', cErr.message);
    }
  }

  // Case 3: Remote external URL redirect
  if (brochure_url.startsWith('http://') || brochure_url.startsWith('https://')) {
    return res.redirect(brochure_url);
  }

  // Fallback send relative path
  res.redirect(brochure_url);
});
