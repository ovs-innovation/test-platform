import { query } from '../config/db.js';

async function run() {
  console.log('Syncing free tests to test_series...');

  // 1. NEET FREE TEST 2027 (Test 127)
  const existing127 = await query('SELECT id FROM test_series WHERE slug = $1', ['neet-free-test-2027']);
  let s127Id;
  if (existing127.rows.length === 0) {
    const res = await query(`
      INSERT INTO test_series (
        title, slug, description, price, validity_days, exam_type, test_count,
        planned_tests, is_active, is_featured, is_free, display_order,
        target_class, target_year, program_type, created_at, updated_at
      ) VALUES (
        'NEET FREE TEST 2027', 'neet-free-test-2027',
        'Full-length authentic NEET CBT format diagnostic mock test with live countdown timer, question palette, and instant All India Rank.',
        0.00, 365, 'NEET', 1, 1, true, true, true, 0,
        'Class 12', '2027', 'One Year', '2026-09-28 00:25:20.386+00', NOW()
      ) RETURNING id
    `);
    s127Id = res.rows[0].id;
    console.log('Created test_series for 127 with id:', s127Id);
  } else {
    s127Id = existing127.rows[0].id;
    console.log('Existing series for 127 id:', s127Id);
  }

  await query(`
    INSERT INTO test_series_tests (series_id, test_id)
    VALUES ($1, 127)
    ON CONFLICT DO NOTHING
  `, [s127Id]);
  console.log('Linked test 127 to series', s127Id);

  // 2. NEET FREE Mock Test (Test 126)
  const existing126 = await query('SELECT id FROM test_series WHERE slug = $1', ['neet-free-mock-test']);
  let s126Id;
  if (existing126.rows.length === 0) {
    const res = await query(`
      INSERT INTO test_series (
        title, slug, description, price, validity_days, exam_type, test_count,
        planned_tests, is_active, is_featured, is_free, display_order,
        target_class, target_year, program_type, created_at, updated_at
      ) VALUES (
        'NEET FREE Mock Test', 'neet-free-mock-test',
        'Full syllabus NEET UG diagnostic mock examination with authentic question palette and detailed solutions.',
        0.00, 365, 'NEET', 1, 1, true, false, true, 0,
        'Class 12', '2026', 'One Year', '2026-09-21 00:24:12.843+00', NOW()
      ) RETURNING id
    `);
    s126Id = res.rows[0].id;
    console.log('Created test_series for 126 with id:', s126Id);
  } else {
    s126Id = existing126.rows[0].id;
    console.log('Existing series for 126 id:', s126Id);
  }

  await query(`
    INSERT INTO test_series_tests (series_id, test_id)
    VALUES ($1, 126)
    ON CONFLICT DO NOTHING
  `, [s126Id]);
  console.log('Linked test 126 to series', s126Id);

  const check = await query(`
    SELECT ts.id, ts.title, ts.slug, ts.price, ts.created_at, COUNT(tst.test_id) as linked_tests
    FROM test_series ts
    LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
    WHERE ts.price = 0
    GROUP BY ts.id
    ORDER BY ts.created_at DESC
  `);
  console.log('Current free test series in DB:', check.rows);

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
