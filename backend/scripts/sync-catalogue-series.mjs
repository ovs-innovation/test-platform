import { pool, withTransaction } from '../src/config/db.js';

const PAID_SERIES = [
  // 1. NEET PG 2027 Comprehensive
  {
    title: 'AIETS NEET-PG 2027 Comprehensive Test Series',
    slug: 'aiets-neet-pg-2027-comprehensive',
    description: '25 comprehensive CBT assessments for NEET PG 2027 covering 19 medical subjects, clinical vignettes, PYQ patterns, grand tests, All India Rank & explanations.',
    price: 1999.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'NEET PG',
    is_featured: true,
    test_count: 25,
    planned_tests: 25,
    display_order: 1,
    image_url: '/edvedum/banners/banner-neet-pg.png',
  },
  // 2. JEE Main 2027 Comprehensive
  {
    title: 'AIETS JEE Main 2027 Comprehensive Test Series',
    slug: 'aiets-jee-main-2027-comprehensive',
    description: '30 structured CBT assessments for JEE Main 2027 aspirants. Physics, Chemistry and Mathematics chapter, unit, part and full-syllabus tests with All India Rank & analytics.',
    price: 1999.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'JEE Main',
    is_featured: true,
    test_count: 30,
    planned_tests: 30,
    display_order: 2,
    image_url: '/edvedum/banners/banner-jee-full.png',
  },
  // 3. NEET UG 2027 Comprehensive
  {
    title: 'AIETS NEET-UG 2027 Comprehensive Test Series',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    description: '39 structured CBT assessments for NEET-UG 2027 with NCERT focus, unit, part, cumulative & full-syllabus tests, All India Rank & analytics.',
    price: 1999.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'NEET',
    is_featured: true,
    test_count: 39,
    planned_tests: 39,
    display_order: 3,
    image_url: '/edvedum/banners/banner-neet-mock.png',
  },
  // 4. NEET PG Complete Online CBT Program
  {
    title: 'AIETS NEET-PG Complete Online CBT Program',
    slug: 'aiets-neet-pg-complete-program',
    description: 'Complete online CBT preparation program for NEET PG with 50 subject-wise and grand tests, clinical image questions, All India Rank & detailed performance analytics.',
    price: 3999.00,
    is_free: false,
    validity_days: 730,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 50,
    planned_tests: 50,
    display_order: 4,
    image_url: '/edvedum/banners/banner-neetpg-female.png',
  },
  // 5. JEE Main Complete Online CBT Program
  {
    title: 'AIETS JEE Main Complete Online CBT Program',
    slug: 'aiets-jee-main-2028-two-year',
    description: '24-month comprehensive online CBT program for Classes XI & XII with 60 structured assessments, ranking, subject analytics & detailed solutions for JEE Main.',
    price: 3999.00,
    is_free: false,
    validity_days: 730,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 60,
    planned_tests: 60,
    display_order: 5,
    image_url: '/edvedum/banners/banner-jee-female.png',
  },
  // 6. JEE Main Full-Length Mock Test Pack
  {
    title: 'AIETS JEE Main Full-Length Mock Test Pack',
    slug: 'aiets-jee-main-mock-pack',
    description: '8 full-length NTA CBT mock tests for JEE Main with Physics, Chemistry and Mathematics, All India Rank and detailed solutions.',
    price: 999.00,
    is_free: false,
    validity_days: 180,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    display_order: 6,
    image_url: '/edvedum/banners/banner-jee-male2.png',
  },
  // 7. NEET UG Two-Year Online CBT Program
  {
    title: 'AIETS NEET-UG Two-Year Online CBT Program',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description: 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed NCERT solutions and progressive NEET preparation.',
    price: 3999.00,
    is_free: false,
    validity_days: 730,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 60,
    planned_tests: 60,
    display_order: 7,
    image_url: '/edvedum/banners/banner-neet-male.png',
  },
  // 8. NEET UG Full-Length Mock Test Pack
  {
    title: 'AIETS NEET-UG Full-Length Mock Test Pack',
    slug: 'neet-ug-mock',
    description: '8 NEET pattern full-length CBT mocks with NCERT-focused Physics, Chemistry & Biology questions, All India Rank & step-by-step solutions.',
    price: 999.00,
    is_free: false,
    validity_days: 180,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    display_order: 8,
    image_url: '/edvedum/banners/banner-neet-bio.png',
  },
  // 9. NEET PG Full-Length Mock Test Pack
  {
    title: 'AIETS NEET-PG Full-Length Mock Test Pack',
    slug: 'neet-pg-mock',
    description: '8 full-length NEET PG pattern CBT mocks covering all 19 medical subjects with clinical scenarios, image-based questions, All India Rank & explanations.',
    price: 999.00,
    is_free: false,
    validity_days: 180,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 8,
    planned_tests: 8,
    display_order: 9,
    image_url: '/edvedum/banners/banner-neet-pg.png',
  },
];

const FREE_SERIES = [
  {
    title: 'JEE Main Full-Length Diagnostic Mock',
    slug: 'jee-main-diagnostic-free',
    description: 'Full-length JEE Main diagnostic mock covering Physics, Chemistry and Mathematics with NTA CBT pattern, All India Rank and instant score analysis.',
    price: 0.00,
    is_free: true,
    validity_days: 365,
    exam_type: 'JEE Main',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    display_order: 10,
    image_url: '/edvedum/banners/banner-free-mock.png',
    defaultAssId: 22,
  },
  {
    title: 'NEET UG Biology & Chemistry Diagnostic Mock',
    slug: 'neet-ug-diagnostic-free',
    description: 'Full-length NEET UG diagnostic mock covering Physics, Chemistry and Biology with NCERT pattern, All India Rank and step solutions.',
    price: 0.00,
    is_free: true,
    validity_days: 365,
    exam_type: 'NEET',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    display_order: 11,
    image_url: '/edvedum/banners/banner-neet-bio.png',
    defaultAssId: 12,
  },
  {
    title: 'NEET PG Clinical & High-Yield Diagnostic Mock',
    slug: 'neet-pg-clinical-free',
    description: 'Full-length NEET PG diagnostic mock featuring clinical scenarios, 19 medical subjects, image-based questions and All India Rank predictor.',
    price: 0.00,
    is_free: true,
    validity_days: 365,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    display_order: 12,
    image_url: '/edvedum/banners/banner-neetpg-female.png',
    defaultAssId: 13,
  },
];

export const runCatalogueSync = async () => {
  return withTransaction(async (client) => {
    // Audit log existing state prior to migration
    const snapshot = await client.query(`
      SELECT 
        ts.id,
        ts.slug,
        ts.title,
        ts.exam_type AS category,
        ts.price,
        (SELECT COUNT(*) FROM user_test_series_enrollments e WHERE e.test_series_id = ts.id) AS enrollment_count,
        (SELECT COUNT(*) FROM test_series_assessments tsa WHERE tsa.test_series_id = ts.id) AS linked_test_count
      FROM test_series ts
      ORDER BY ts.id
    `);
    console.log('[sync] Pre-migration Database Snapshot:');
    console.table(snapshot.rows);

    // 1. Rename existing legacy production titles/slugs to preserve existing record IDs & relations
    await client.query(`
      UPDATE test_series
      SET title = 'AIETS JEE Main Full-Length Mock Test Pack', slug = 'aiets-jee-main-mock-pack'
      WHERE title ILIKE 'JEE Main Full Test Series%' OR slug ILIKE 'jee-main-full-test-series%';

      UPDATE test_series
      SET title = 'AIETS NEET-UG Two-Year Online CBT Program', slug = 'aiets-neet-ug-2028-two-year-online-cbt-program'
      WHERE title ILIKE 'AIETS Two-Year Online CBT Program%' OR slug = 'aiets-two-year-online-cbt-program';

      UPDATE test_series
      SET title = 'AIETS NEET-UG 2027 Comprehensive Test Series', slug = 'neet-ug-2027-aiets-comprehensive-test-series'
      WHERE title ILIKE 'NEET-UG 2027 Comprehensive%' OR (slug ILIKE 'neet-ug-2027-comprehensive%' AND slug != 'neet-ug-2027-aiets-comprehensive-test-series');

      UPDATE test_series
      SET title = 'AIETS NEET-UG Full-Length Mock Test Pack', slug = 'neet-ug-mock'
      WHERE title ILIKE 'NEET UG Mock Test Pack%' OR slug ILIKE 'neet-ug-mock-test-pack%';

      UPDATE test_series
      SET title = 'AIETS NEET-PG Full-Length Mock Test Pack', slug = 'neet-pg-mock'
      WHERE title ILIKE 'NEET PG Mock Test Pack%' OR slug ILIKE 'neet-pg-mock-test-pack%';
    `);

    const activeSlugs = [...PAID_SERIES, ...FREE_SERIES].map((s) => s.slug);

    // 2. Safe Deactivation of outdated/duplicate series (does NOT delete data or break enrollments)
    await client.query(
      `UPDATE test_series SET is_active = false WHERE slug NOT IN (${activeSlugs.map((_, i) => `$${i + 1}`).join(',')})`,
      activeSlugs
    );

    // 3. Upsert Paid Series
    for (const s of PAID_SERIES) {
      const existing = await client.query('SELECT id FROM test_series WHERE slug = $1', [s.slug]);
      if (existing.rowCount > 0) {
        await client.query(
          `UPDATE test_series SET
             title = $1,
             description = $2,
             price = $3,
             is_free = $4,
             validity_days = $5,
             exam_type = $6,
             is_featured = $7,
             test_count = $8,
             planned_tests = $9,
             image_url = $10,
             display_order = $11,
             is_active = true
           WHERE slug = $12`,
          [s.title, s.description, s.price, s.is_free, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, s.display_order, s.slug]
        );
      } else {
        await client.query(
          `INSERT INTO test_series (title, slug, description, price, is_free, validity_days, exam_type, is_featured, test_count, planned_tests, image_url, display_order, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)`,
          [s.title, s.slug, s.description, s.price, s.is_free, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, s.display_order]
        );
      }
    }

    // 4. Upsert Free Diagnostic Series & link default assessments
    for (const s of FREE_SERIES) {
      let tsId;
      const existing = await client.query('SELECT id FROM test_series WHERE slug = $1', [s.slug]);
      if (existing.rowCount > 0) {
        tsId = existing.rows[0].id;
        await client.query(
          `UPDATE test_series SET
             title = $1,
             description = $2,
             price = $3,
             is_free = $4,
             validity_days = $5,
             exam_type = $6,
             is_featured = $7,
             test_count = $8,
             planned_tests = $9,
             image_url = $10,
             display_order = $11,
             is_active = true
           WHERE id = $12`,
          [s.title, s.description, s.price, s.is_free, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, s.display_order, tsId]
        );
      } else {
        const ins = await client.query(
          `INSERT INTO test_series (title, slug, description, price, is_free, validity_days, exam_type, is_featured, test_count, planned_tests, image_url, display_order, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
           RETURNING id`,
          [s.title, s.slug, s.description, s.price, s.is_free, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.planned_tests, s.image_url, s.display_order]
        );
        tsId = ins.rows[0].id;
      }

      // Link default assessment if published and not already linked
      const assRes = await client.query(
        `SELECT a.id FROM assessments a WHERE a.id = $1 AND a.is_published = true`,
        [s.defaultAssId]
      );
      if (assRes.rowCount > 0) {
        await client.query(
          `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
           VALUES ($1, $2, 1, 'Diagnostic Mock 1')
           ON CONFLICT DO NOTHING`,
          [tsId, s.defaultAssId]
        );
      }
    }

    console.log('[sync] Catalogue transaction successfully executed.');
  });
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runCatalogueSync()
    .then(() => pool.end())
    .catch((err) => {
      console.error('[sync] Catalogue sync failed:', err);
      process.exit(1);
    });
}
