import { pool } from '../config/db.js';

const SUBJECTS = [
  { name: 'Physics', slug: 'physics', icon: '⚛️' },
  { name: 'Chemistry', slug: 'chemistry', icon: '🧪' },
  { name: 'Mathematics', slug: 'mathematics', icon: '📐' },
  { name: 'Biology', slug: 'biology', icon: '🧬' },
  { name: 'General Aptitude', slug: 'aptitude', icon: '🧠' },
];

const CHAPTERS = {
  physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism'],
  chemistry: ['Organic', 'Inorganic', 'Physical Chemistry'],
  mathematics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry'],
  biology: ['Botany', 'Zoology', 'Human Physiology'],
  aptitude: ['Logical Reasoning', 'Data Interpretation', 'Verbal Ability'],
};

const coverFor = (examType) => {
  const t = examType.toLowerCase();
  if (t.includes('jee')) return '/test-series/jee.svg';
  if (/neet\s*pg|pg\s*neet|neet-pg|postgraduate/.test(t)) return '/test-series/neet-pg.svg';
  if (t.includes('neet')) return '/test-series/neet.svg';
  return '/test-series/general.svg';
};

const SERIES = [
  {
    title: 'JEE Main Full Test Series 2026',
    slug: 'jee-main-2026',
    description: '10 full-length JEE Main mock tests with NTA-style CBT interface, detailed solutions and analytics.',
    price: 999,
    validity_days: 365,
    exam_type: 'JEE Main',
    is_featured: true,
    test_count: 10,
    image_url: '/test-series/jee.svg',
  },
  {
    title: 'NEET UG Mock Test Pack',
    slug: 'neet-ug-mock',
    description: '8 NEET pattern full mocks with Biology-heavy sections and rank prediction.',
    price: 799,
    validity_days: 180,
    exam_type: 'NEET',
    is_featured: true,
    test_count: 8,
    image_url: '/test-series/neet.svg',
  },
  {
    title: 'NEET PG Mock Test Pack',
    slug: 'neet-pg-mock',
    description: '8 full-length NEET PG pattern mocks with clinical focus and detailed solutions.',
    price: 699,
    validity_days: 180,
    exam_type: 'NEET PG',
    is_featured: false,
    test_count: 8,
    image_url: '/test-series/neet-pg.svg',
  },
  {
    title: 'Free Diagnostic Mock',
    slug: 'free-diagnostic',
    description: 'One free full-length diagnostic test to assess your preparation level.',
    price: 0,
    validity_days: 30,
    exam_type: 'General',
    is_featured: true,
    test_count: 1,
    image_url: '/edvedum/students-group.png',
  },
];

export const seedPlatform = async (client) => {
  const subCount = await client.query('SELECT COUNT(*)::int AS c FROM subjects');
  if (subCount.rows[0].c === 0) {
    for (const s of SUBJECTS) {
      await client.query(
        'INSERT INTO subjects (name, slug, icon) VALUES ($1, $2, $3)',
        [s.name, s.slug, s.icon]
      );
    }
    const subs = await client.query('SELECT id, slug FROM subjects');
    for (const row of subs.rows) {
      const chapters = CHAPTERS[row.slug] || [];
      for (let i = 0; i < chapters.length; i++) {
        await client.query(
          'INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, $3)',
          [row.id, chapters[i], i + 1]
        );
      }
    }
    console.log('[seed] Subjects & chapters seeded.');
  }

  const seriesCount = await client.query('SELECT COUNT(*)::int AS c FROM test_series');
  if (seriesCount.rows[0].c === 0) {
    for (const s of SERIES) {
      await client.query(
        `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, is_featured, test_count, image_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [s.title, s.slug, s.description, s.price, s.validity_days, s.exam_type, s.is_featured, s.test_count, s.image_url || coverFor(s.exam_type)]
      );
    }
    console.log('[seed] Test series seeded.');
  }

  await client.query(`
    UPDATE test_series SET
      title = 'NEET PG Mock Test Pack',
      slug = 'neet-pg-mock',
      description = '8 full-length NEET PG pattern mocks with clinical focus and detailed solutions.',
      exam_type = 'NEET PG',
      image_url = '/test-series/neet-pg.svg',
      test_count = GREATEST(test_count, 8)
    WHERE slug = 'ssc-cgl-tier1' OR exam_type ILIKE '%ssc%' OR exam_type ILIKE '%cgl%'
  `);

  await client.query(`
    UPDATE test_series SET image_url = CASE
      WHEN exam_type ILIKE '%jee%' THEN '/test-series/jee.svg'
      WHEN exam_type ILIKE '%neet%pg%' OR exam_type ILIKE '%pg%neet%' OR title ILIKE '%neet pg%' THEN '/test-series/neet-pg.svg'
      WHEN exam_type ILIKE '%neet%' THEN '/test-series/neet.svg'
      ELSE '/test-series/general.svg'
    END
    WHERE COALESCE(image_url, '') = '' OR image_url LIKE '%ssc%'
  `);

  await client.query(`
    UPDATE test_series SET image_url = '/edvedum/students-group.png'
    WHERE slug = 'free-diagnostic' OR (price = 0 AND exam_type = 'General')
  `);

  await client.query(`
    INSERT INTO settings (key, value) VALUES
      ('site_name', 'EDVEDUM ACADEMY'),
      ('support_email', 'support@edvedum.com')
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `);

  // Link first published assessment to free diagnostic series if exists
  const freeSeries = await client.query(`SELECT id FROM test_series WHERE slug = 'free-diagnostic'`);
  const assessment = await client.query(
    `SELECT id FROM assessments WHERE is_published = true ORDER BY id LIMIT 1`
  );
  if (freeSeries.rowCount && assessment.rowCount) {
    await client.query(
      `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
       VALUES ($1, $2, 1, 'Diagnostic Mock 1')
       ON CONFLICT DO NOTHING`,
      [freeSeries.rows[0].id, assessment.rows[0].id]
    );
  }
};
