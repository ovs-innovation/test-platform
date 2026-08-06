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

  // ID-less, Idempotent Sample Institution Seeding
  const instRes = await client.query(
    `INSERT INTO institutions (name, institution_type, city, state, contact_person, contact_email, contact_mobile, address)
     SELECT 'EDVEDUM Partner Academy', 'School', 'New Delhi', 'Delhi', 'Dr. Ramesh Sharma', 'admin@partneracademy.edu.in', '9876543210', 'Block B, Connaught Place, New Delhi'
     WHERE NOT EXISTS (SELECT 1 FROM institutions WHERE contact_email = 'admin@partneracademy.edu.in' OR name = 'EDVEDUM Partner Academy')
     RETURNING id`
  );

  let instId;
  if (instRes.rowCount > 0) {
    instId = instRes.rows[0].id;
  } else {
    const existingInst = await client.query(`SELECT id FROM institutions WHERE contact_email = 'admin@partneracademy.edu.in' OR name = 'EDVEDUM Partner Academy' LIMIT 1`);
    if (existingInst.rowCount > 0) instId = existingInst.rows[0].id;
  }

  if (instId) {
    const { hashPassword } = await import('../utils/password.js');
    const instAdminHash = await hashPassword('password123');
    await client.query(
      `INSERT INTO institution_admins (institution_id, name, email, password_hash, role)
       VALUES ($1, 'Institution Admin', 'instadmin@edvedum.ac.in', $2, 'institution_admin')
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [instId, instAdminHash]
    );

    const pkgRes = await client.query(
      `INSERT INTO test_packages (package_name, description, price)
       SELECT 'NEET-UG 2027 AIETS One-Year Complete Package', 'Full access to 24 AIETS unit tests, part tests and cumulative grand mocks for NEET-UG 2027.', 49999.00
       WHERE NOT EXISTS (SELECT 1 FROM test_packages WHERE package_name = 'NEET-UG 2027 AIETS One-Year Complete Package')
       RETURNING id`
    );

    let pkgId;
    if (pkgRes.rowCount > 0) {
      pkgId = pkgRes.rows[0].id;
    } else {
      const existingPkg = await client.query(`SELECT id FROM test_packages WHERE package_name = 'NEET-UG 2027 AIETS One-Year Complete Package' LIMIT 1`);
      if (existingPkg.rowCount > 0) pkgId = existingPkg.rows[0].id;
    }

    if (pkgId) {
      await client.query(
        `INSERT INTO institution_packages (institution_id, package_id, is_active)
         SELECT $1, $2, TRUE
         WHERE NOT EXISTS (
           SELECT 1 FROM institution_packages WHERE institution_id = $1 AND package_id = $2
         )`,
        [instId, pkgId]
      );

      await client.query(
        `INSERT INTO package_tests (package_id, test_id)
         SELECT $1, t.id FROM tests t
         WHERE NOT EXISTS (
           SELECT 1 FROM package_tests WHERE package_id = $1 AND test_id = t.id
         )`,
        [pkgId]
      );
    }

    await client.query(
      `INSERT INTO institution_invoices (institution_id, invoice_number, package_name, price_per_student, license_quantity, subtotal, gst_amount, total_amount, payment_status, pdf_url)
       VALUES ($1, 'INV-EDV-2026-0091', 'NEET-UG 2027 AIETS Institutional Gold License Pack (50 Seats)', 999.98, 50, 49999.00, 8999.82, 58998.82, 'Paid', '/invoices/INV-EDV-2026-0091.pdf')
       ON CONFLICT (invoice_number) DO NOTHING`,
      [instId]
    );

    await client.query(
      `INSERT INTO institution_notifications (institution_id, title, message, type)
       SELECT $1, 'Welcome to Edvedum Institution Management Portal', 'Your AIETS Institutional Gold Package with 50 student licenses is active. You can now enroll students and create batches.', 'system'
       WHERE NOT EXISTS (
         SELECT 1 FROM institution_notifications WHERE institution_id = $1 AND title = 'Welcome to Edvedum Institution Management Portal'
       )`,
      [instId]
    );
  }

  const { importAietsRecords } = await import('./importAiets.js');
  await importAietsRecords(client);
};
