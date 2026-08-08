import { query, pool } from '../src/config/db.js';

const PAID_SERIES = [
  // JEE Main (3 Paid)
  {
    title: 'AIETS JEE Main Full-Length Mock Test Pack',
    slug: 'aiets-jee-main-mock-pack',
    description: '8 full-length NTA CBT mock tests for JEE Main with Physics, Chemistry and Mathematics, All India Rank and detailed solutions.',
    price: 999.00,
    validity_days: 180,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    image_url: '/test-series/jee.svg',
  },
  {
    title: 'AIETS JEE Main 2027 Comprehensive Test Series',
    slug: 'aiets-jee-main-2027-comprehensive',
    description: '30 structured CBT assessments for JEE Main 2027 aspirants. Physics, Chemistry and Mathematics chapter, unit, part and full-syllabus tests with All India Rank & analytics.',
    price: 1999.00,
    validity_days: 365,
    exam_type: 'JEE Main',
    is_featured: true,
    test_count: 30,
    planned_tests: 30,
    image_url: '/test-series/jee.svg',
  },
  {
    title: 'AIETS JEE Main Complete Online CBT Program',
    slug: 'aiets-jee-main-2028-two-year',
    description: '24-month comprehensive online CBT program for Classes XI & XII with 60 structured assessments, ranking, subject analytics & detailed solutions for JEE Main.',
    price: 3999.00,
    validity_days: 730,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 60,
    planned_tests: 60,
    image_url: '/test-series/jee.svg',
  },

  // NEET UG (3 Paid)
  {
    title: 'AIETS NEET-UG Full-Length Mock Test Pack',
    slug: 'neet-ug-mock',
    description: '8 NEET pattern full-length CBT mocks with NCERT-focused Physics, Chemistry & Biology questions, All India Rank & step-by-step solutions.',
    price: 999.00,
    validity_days: 180,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    image_url: '/test-series/neet.svg',
  },
  {
    title: 'AIETS NEET-UG 2027 Comprehensive Test Series',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    description: '39 structured CBT assessments for NEET-UG 2027 with NCERT focus, unit, part, cumulative & full-syllabus tests, All India Rank & analytics.',
    price: 1999.00,
    validity_days: 365,
    exam_type: 'NEET',
    is_featured: true,
    test_count: 39,
    planned_tests: 39,
    image_url: '/test-series/neet.svg',
  },
  {
    title: 'AIETS NEET-UG Two-Year Online CBT Program',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description: 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed NCERT solutions and progressive NEET preparation.',
    price: 3999.00,
    validity_days: 730,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 60,
    planned_tests: 60,
    image_url: '/test-series/neet.svg',
  },

  // NEET PG (3 Paid)
  {
    title: 'AIETS NEET-PG Full-Length Mock Test Pack',
    slug: 'neet-pg-mock',
    description: '8 full-length NEET PG pattern CBT mocks covering all 19 medical subjects with clinical scenarios, image-based questions, All India Rank & explanations.',
    price: 999.00,
    validity_days: 180,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    image_url: '/test-series/neet-pg.svg',
  },
  {
    title: 'AIETS NEET-PG 2027 Comprehensive Test Series',
    slug: 'aiets-neet-pg-2027-comprehensive',
    description: '25 comprehensive CBT assessments for NEET PG 2027 covering 19 medical subjects, clinical vignettes, PYQ patterns, grand tests, All India Rank & explanations.',
    price: 1999.00,
    validity_days: 365,
    exam_type: 'NEET PG',
    is_featured: true,
    test_count: 25,
    planned_tests: 25,
    image_url: '/test-series/neet-pg.svg',
  },
  {
    title: 'AIETS NEET-PG Complete Online CBT Program',
    slug: 'aiets-neet-pg-complete-program',
    description: 'Complete online CBT preparation program for NEET PG with 50 subject-wise and grand tests, clinical image questions, All India Rank & detailed performance analytics.',
    price: 3999.00,
    validity_days: 730,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 50,
    planned_tests: 50,
    image_url: '/test-series/neet-pg.svg',
  },
];

const FREE_SERIES = [
  {
    title: 'JEE Main Full-Length Diagnostic Mock',
    slug: 'jee-main-diagnostic-free',
    description: 'Full-length JEE Main diagnostic mock covering Physics, Chemistry and Mathematics with NTA CBT pattern, All India Rank and instant score analysis.',
    price: 0.00,
    validity_days: 365,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    image_url: '/test-series/jee.svg',
    defaultAssId: 22,
  },
  {
    title: 'NEET UG Full-Length Diagnostic Mock',
    slug: 'neet-ug-diagnostic-free',
    description: 'Full-length NEET UG diagnostic mock covering Physics, Chemistry and Biology with NCERT pattern, All India Rank and step solutions.',
    price: 0.00,
    validity_days: 365,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    image_url: '/test-series/neet.svg',
    defaultAssId: 12,
  },
  {
    title: 'NEET PG Full-Length Diagnostic Mock',
    slug: 'neet-pg-clinical-free',
    description: 'Full-length NEET PG diagnostic mock featuring clinical scenarios, 19 medical subjects, image-based questions and All India Rank predictor.',
    price: 0.00,
    validity_days: 365,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    image_url: '/test-series/neet-pg.svg',
    defaultAssId: 13,
  },
];

const run = async () => {
  try {
    const activeSlugs = [...PAID_SERIES, ...FREE_SERIES].map((s) => s.slug);

    // 1. Archive outdated series
    await query(
      `UPDATE test_series SET is_active = false WHERE slug NOT IN (${activeSlugs.map((_, i) => `$${i + 1}`).join(',')})`,
      activeSlugs
    );
    console.log('[sync] Archived outdated series not in target 12.');

    // 2. Upsert Paid Series
    for (const s of PAID_SERIES) {
      const existing = await query('SELECT id FROM test_series WHERE slug = $1', [s.slug]);
      if (existing.rowCount > 0) {
        await query(
          `UPDATE test_series SET
             title = $1,
             description = $2,
             price = $3,
             validity_days = $4,
             exam_type = $5,
             is_featured = $6,
             test_count = $7,
             planned_tests = $8,
             image_url = $9,
             is_active = true
           WHERE slug = $10`,
          [s.title, s.description, s.price, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, s.slug]
        );
        console.log(`[sync] Updated paid series: ${s.title}`);
      } else {
        await query(
          `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, is_featured, test_count, planned_tests, image_url, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)`,
          [s.title, s.slug, s.description, s.price, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url]
        );
        console.log(`[sync] Inserted paid series: ${s.title}`);
      }
    }

    // 3. Upsert Free Series & link assessments
    for (const s of FREE_SERIES) {
      let tsId;
      const existing = await query('SELECT id FROM test_series WHERE slug = $1', [s.slug]);
      if (existing.rowCount > 0) {
        tsId = existing.rows[0].id;
        await query(
          `UPDATE test_series SET
             title = $1,
             description = $2,
             price = $3,
             validity_days = $4,
             exam_type = $5,
             is_featured = $6,
             test_count = $7,
             planned_tests = $8,
             image_url = $9,
             is_active = true
           WHERE id = $10`,
          [s.title, s.description, s.price, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, tsId]
        );
        console.log(`[sync] Updated free series: ${s.title}`);
      } else {
        const ins = await query(
          `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, is_featured, test_count, planned_tests, image_url, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
           RETURNING id`,
          [s.title, s.slug, s.description, s.price, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url]
        );
        tsId = ins.rows[0].id;
        console.log(`[sync] Inserted free series: ${s.title}`);
      }

      // Link default assessment if not linked
      const assRes = await query(
        `SELECT a.id FROM assessments a WHERE a.id = $1 AND a.is_published = true`,
        [s.defaultAssId]
      );
      if (assRes.rowCount > 0) {
        await query(
          `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
           VALUES ($1, $2, 1, 'Diagnostic Mock 1')
           ON CONFLICT DO NOTHING`,
          [tsId, s.defaultAssId]
        );
      }
    }

    console.log('[sync] Catalogue sync complete!');
  } catch (err) {
    console.error('[sync] Sync failed:', err);
  } finally {
    await pool.end();
  }
};

run();
