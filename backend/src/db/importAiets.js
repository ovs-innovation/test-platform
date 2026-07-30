import { pool, query, withTransaction } from '../config/db.js';
import { env } from '../config/env.js';

export const ONE_YEAR_39_SCHEDULE = [
  { sequence: 1, type: 'UNIT_TEST', name: 'Unit Test 1', date: '2026-10-04', phase: 'CONCEPT_BUILDING' },
  { sequence: 2, type: 'UNIT_TEST', name: 'Unit Test 2', date: '2026-10-11', phase: 'CONCEPT_BUILDING' },
  { sequence: 3, type: 'AIETS', name: 'AIETS 1', date: '2026-10-18', phase: 'CONCEPT_BUILDING' },
  { sequence: 4, type: 'UNIT_TEST', name: 'Unit Test 3', date: '2026-10-25', phase: 'CONCEPT_BUILDING' },
  { sequence: 5, type: 'UNIT_TEST', name: 'Unit Test 4', date: '2026-11-01', phase: 'CONCEPT_BUILDING' },
  { sequence: 6, type: 'AIETS', name: 'AIETS 2', date: '2026-11-08', phase: 'CONCEPT_BUILDING' },
  { sequence: 7, type: 'UNIT_TEST', name: 'Unit Test 5', date: '2026-11-15', phase: 'CONCEPT_BUILDING' },
  { sequence: 8, type: 'PART_TEST', name: 'Part Test 1', date: '2026-11-22', phase: 'CONCEPT_BUILDING' },
  { sequence: 9, type: 'AIETS', name: 'AIETS 3', date: '2026-11-29', phase: 'CONCEPT_BUILDING' },
  { sequence: 10, type: 'UNIT_TEST', name: 'Unit Test 6', date: '2026-12-06', phase: 'CONCEPT_BUILDING' },
  { sequence: 11, type: 'UNIT_TEST', name: 'Unit Test 7', date: '2026-12-13', phase: 'CONCEPT_BUILDING' },
  { sequence: 12, type: 'AIETS', name: 'AIETS 4', date: '2026-12-20', phase: 'CONCEPT_BUILDING' },
  { sequence: 13, type: 'PART_TEST', name: 'Part Test 2', date: '2026-12-27', phase: 'CONCEPT_BUILDING' },
  { sequence: 14, type: 'UNIT_TEST', name: 'Unit Test 8', date: '2027-01-03', phase: 'PROGRESS_TRACKING' },
  { sequence: 15, type: 'AIETS', name: 'AIETS 5', date: '2027-01-10', phase: 'PROGRESS_TRACKING' },
  { sequence: 16, type: 'UNIT_TEST', name: 'Unit Test 9', date: '2027-01-17', phase: 'PROGRESS_TRACKING' },
  { sequence: 17, type: 'AIETS', name: 'AIETS 6', date: '2027-01-24', phase: 'PROGRESS_TRACKING' },
  { sequence: 18, type: 'PART_TEST', name: 'Part Test 3', date: '2027-01-31', phase: 'PROGRESS_TRACKING' },
  { sequence: 19, type: 'UNIT_TEST', name: 'Unit Test 10', date: '2027-02-07', phase: 'PROGRESS_TRACKING' },
  { sequence: 20, type: 'AIETS', name: 'AIETS 7', date: '2027-02-14', phase: 'PROGRESS_TRACKING' },
  { sequence: 21, type: 'UNIT_TEST', name: 'Unit Test 11', date: '2027-02-21', phase: 'PROGRESS_TRACKING' },
  { sequence: 22, type: 'CUMULATIVE_TEST', name: 'Cumulative Test 1', date: '2027-02-28', phase: 'PROGRESS_TRACKING' },
  { sequence: 23, type: 'UNIT_TEST', name: 'Unit Test 12', date: '2027-03-07', phase: 'REVISION_CUMULATIVE' },
  { sequence: 24, type: 'AIETS', name: 'AIETS 8', date: '2027-03-14', phase: 'REVISION_CUMULATIVE' },
  { sequence: 25, type: 'PART_TEST', name: 'Part Test 4', date: '2027-03-21', phase: 'REVISION_CUMULATIVE' },
  { sequence: 26, type: 'CUMULATIVE_TEST', name: 'Cumulative Test 2', date: '2027-03-28', phase: 'REVISION_CUMULATIVE' },
  { sequence: 27, type: 'AIETS', name: 'AIETS 9', date: '2027-04-01', phase: 'INTENSIVE_TESTING' },
  { sequence: 28, type: 'AIETS', name: 'AIETS 10', date: '2027-04-04', phase: 'INTENSIVE_TESTING' },
  { sequence: 29, type: 'AIETS', name: 'AIETS 11', date: '2027-04-07', phase: 'INTENSIVE_TESTING' },
  { sequence: 30, type: 'AIETS', name: 'AIETS 12', date: '2027-04-10', phase: 'INTENSIVE_TESTING' },
  { sequence: 31, type: 'AIETS', name: 'AIETS 13', date: '2027-04-13', phase: 'INTENSIVE_TESTING' },
  { sequence: 32, type: 'AIETS', name: 'AIETS 14', date: '2027-04-16', phase: 'INTENSIVE_TESTING' },
  { sequence: 33, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 1', date: '2027-04-18', phase: 'INTENSIVE_TESTING' },
  { sequence: 34, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 2', date: '2027-04-20', phase: 'INTENSIVE_TESTING' },
  { sequence: 35, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 3', date: '2027-04-22', phase: 'INTENSIVE_TESTING' },
  { sequence: 36, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 4', date: '2027-04-24', phase: 'INTENSIVE_TESTING' },
  { sequence: 37, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 5', date: '2027-04-26', phase: 'INTENSIVE_TESTING' },
  { sequence: 38, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 6', date: '2027-04-28', phase: 'INTENSIVE_TESTING' },
  { sequence: 39, type: 'FULL_SYLLABUS_MOCK', name: 'Full-Syllabus Mock Test 7', date: '2027-04-30', phase: 'INTENSIVE_TESTING' }
];

export const importAietsRecords = async (clientOrPool = pool) => {
  // Ensure schema columns exist
  await clientOrPool.query(`
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS code VARCHAR(50);
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS target_year VARCHAR(20) DEFAULT '2027';
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS target_class VARCHAR(50) DEFAULT 'Class XII & Droppers';
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS program_type VARCHAR(50) DEFAULT 'One Year';
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS planned_tests INTEGER DEFAULT 0;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS start_date DATE;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS end_date DATE;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS duration_months INTEGER DEFAULT 12;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS languages JSONB DEFAULT '["English"]'::jsonb;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS individual_available BOOLEAN DEFAULT TRUE;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS b2b_available BOOLEAN DEFAULT TRUE;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]'::jsonb;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS learning_outcomes JSONB DEFAULT '[]'::jsonb;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS included_resources JSONB DEFAULT '[]'::jsonb;
    ALTER TABLE test_series ADD COLUMN IF NOT EXISTS feature_flags JSONB DEFAULT '{"air_rank": true, "analytics": true, "ebooks": true}'::jsonb;

    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS sequence_number INTEGER DEFAULT 0;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS test_type VARCHAR(50) DEFAULT 'AIETS';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS preparation_phase VARCHAR(50) DEFAULT 'CONCEPT_BUILDING';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS syllabus_text TEXT DEFAULT '';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS question_paper_url TEXT DEFAULT '';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS answer_key_url TEXT DEFAULT '';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS solution_pdf_url TEXT DEFAULT '';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS video_solution_url TEXT DEFAULT '';
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS recommended_ebook_id INTEGER;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS result_published_at TIMESTAMPTZ;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS solution_published_at TIMESTAMPTZ;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS rank_enabled BOOLEAN DEFAULT TRUE;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS ranking_scope_config JSONB DEFAULT '["AIR","STATE","CITY","INSTITUTION","BATCH"]'::jsonb;
    ALTER TABLE assessments ADD COLUMN IF NOT EXISTS missed_test_allowed BOOLEAN DEFAULT FALSE;
  `);

  const initialSeriesRes = await clientOrPool.query('SELECT COUNT(*)::int AS c FROM test_series');
  const initialCount = initialSeriesRes.rows[0].c;

  let createdSeries = 0;
  let updatedSeries = 0;
  let createdAssessments = 0;
  let linkedAssessments = 0;

  // 1. One-Year AIETS Series
  const prodA = {
    title: 'NEET-UG 2027 Comprehensive Test Series',
    code: 'AIETS-NEET-2027-1Y',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    description: 'Prepare for NEET-UG 2027 through 39 structured CBT assessments, national-level benchmarking, performance analytics, detailed solutions and progressive syllabus coverage.',
    price: 1999.00,
    validity_days: 365,
    exam_type: 'NEET',
    target_year: '2027',
    target_class: 'Class XII & Droppers',
    program_type: 'One Year',
    planned_tests: 39,
    test_count: 39,
    start_date: '2026-10-01',
    end_date: '2027-04-30',
    duration_months: 7,
    languages: JSON.stringify(['English']),
    individual_available: true,
    b2b_available: true,
    is_featured: true,
    is_active: true,
    image_url: '/test-series/neet.svg',
    highlights: JSON.stringify(['AIETS', 'AIR Ranking', 'Performance Analytics']),
    learning_outcomes: JSON.stringify([
      'Master NTA time allocation and section navigation',
      'Identify chapter-wise knowledge gaps and weak areas'
    ]),
    included_resources: JSON.stringify([
      'Step-by-step solution PDFs for all 39 tests',
      'NCERT digital formula handbook'
    ]),
    feature_flags: JSON.stringify({ air_rank: true, analytics: true, ebooks: true })
  };

  const resA = await clientOrPool.query(
    `INSERT INTO test_series (
      title, code, slug, description, price, validity_days, exam_type, target_year, target_class, program_type,
      planned_tests, test_count, start_date, end_date, duration_months, languages, individual_available, b2b_available,
      is_featured, is_active, image_url, highlights, learning_outcomes, included_resources, feature_flags, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,NOW())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      code = EXCLUDED.code,
      description = EXCLUDED.description,
      price = EXCLUDED.price,
      planned_tests = EXCLUDED.planned_tests,
      test_count = EXCLUDED.test_count,
      is_featured = EXCLUDED.is_featured,
      is_active = EXCLUDED.is_active,
      highlights = EXCLUDED.highlights,
      updated_at = NOW()
    RETURNING id, (xmax = 0) AS inserted`,
    [
      prodA.title, prodA.code, prodA.slug, prodA.description, prodA.price, prodA.validity_days, prodA.exam_type,
      prodA.target_year, prodA.target_class, prodA.program_type, prodA.planned_tests, prodA.test_count, prodA.start_date,
      prodA.end_date, prodA.duration_months, prodA.languages, prodA.individual_available, prodA.b2b_available,
      prodA.is_featured, prodA.is_active, prodA.image_url, prodA.highlights, prodA.learning_outcomes, prodA.included_resources, prodA.feature_flags
    ]
  );

  const seriesAId = resA.rows[0].id;
  if (resA.rows[0].inserted) createdSeries++; else updatedSeries++;

  // 2. Two-Year AIETS Series
  const prodB = {
    title: 'AIETS Two-Year Online CBT Program',
    code: 'AIETS-NEET-2028-2Y',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description: 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed solutions and progressive NEET preparation.',
    price: 3999.00,
    validity_days: 730,
    exam_type: 'NEET',
    target_year: '2028',
    target_class: 'Classes XI & XII',
    program_type: 'Two Year',
    planned_tests: 60,
    test_count: 60,
    start_date: '2026-06-01',
    end_date: '2028-05-31',
    duration_months: 24,
    languages: JSON.stringify(['English', 'Hindi', 'Bilingual']),
    individual_available: true,
    b2b_available: true,
    is_featured: false,
    is_active: true,
    image_url: '/test-series/neet.svg',
    highlights: JSON.stringify(['AIETS', 'Two-Year Program', 'Performance Analytics']),
    learning_outcomes: JSON.stringify([
      'Build strong Class 11 and 12 NCERT conceptual foundations',
      'Track continuous academic growth across 24 months'
    ]),
    included_resources: JSON.stringify([
      'Comprehensive eBook library for Class 11 & 12',
      'Institutional batch reports'
    ]),
    feature_flags: JSON.stringify({ air_rank: true, analytics: true, ebooks: true })
  };

  const resB = await clientOrPool.query(
    `INSERT INTO test_series (
      title, code, slug, description, price, validity_days, exam_type, target_year, target_class, program_type,
      planned_tests, test_count, start_date, end_date, duration_months, languages, individual_available, b2b_available,
      is_featured, is_active, image_url, highlights, learning_outcomes, included_resources, feature_flags, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,NOW())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      code = EXCLUDED.code,
      description = EXCLUDED.description,
      price = EXCLUDED.price,
      planned_tests = EXCLUDED.planned_tests,
      test_count = EXCLUDED.test_count,
      is_featured = EXCLUDED.is_featured,
      is_active = EXCLUDED.is_active,
      highlights = EXCLUDED.highlights,
      updated_at = NOW()
    RETURNING id, (xmax = 0) AS inserted`,
    [
      prodB.title, prodB.code, prodB.slug, prodB.description, prodB.price, prodB.validity_days, prodB.exam_type,
      prodB.target_year, prodB.target_class, prodB.program_type, prodB.planned_tests, prodB.test_count, prodB.start_date,
      prodB.end_date, prodB.duration_months, prodB.languages, prodB.individual_available, prodB.b2b_available,
      prodB.is_featured, prodB.is_active, prodB.image_url, prodB.highlights, prodB.learning_outcomes, prodB.included_resources, prodB.feature_flags
    ]
  );

  if (resB.rows[0].inserted) createdSeries++; else updatedSeries++;

  // 3. Create & Link the 39 One-Year Assessments (Draft mode)
  for (const item of ONE_YEAR_39_SCHEDULE) {
    const title = `AIETS 2027: ${item.name}`;
    const startTime = new Date(`${item.date}T09:00:00+05:30`).toISOString();
    const endTime = new Date(`${item.date}T12:00:00+05:30`).toISOString();

    const assessRes = await clientOrPool.query(
      `INSERT INTO assessments (
        title, description, instructions, duration_minutes, passing_marks, max_violations,
        result_visible, is_published, sequence_number, test_type, preparation_phase, start_time, end_time
      ) VALUES ($1,$2,$3,180,180,3,true,false,$4,$5,$6,$7,$8)
      ON CONFLICT (id) DO NOTHING
      RETURNING id`,
      [
        title,
        `${item.phase.replace('_', ' ')} Phase - NTA Pattern ${item.type.replace('_', ' ')}`,
        'Authentic NTA-pattern CBT test. Ensure stable connection.',
        item.sequence,
        item.type,
        item.phase,
        startTime,
        endTime
      ]
    );

    let assessmentId;
    if (assessRes.rowCount) {
      assessmentId = assessRes.rows[0].id;
      createdAssessments++;
    } else {
      const findRes = await clientOrPool.query("SELECT id FROM assessments WHERE title = $1 LIMIT 1", [title]);
      if (findRes.rowCount) assessmentId = findRes.rows[0].id;
    }

    if (assessmentId) {
      const linkRes = await clientOrPool.query(
        `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (test_series_id, assessment_id) DO UPDATE SET position = EXCLUDED.position, label = EXCLUDED.label
         RETURNING assessment_id`,
        [seriesAId, assessmentId, item.sequence, item.name]
      );
      if (linkRes.rowCount) linkedAssessments++;
    }
  }

  const finalSeriesRes = await clientOrPool.query('SELECT COUNT(*)::int AS c FROM test_series');
  const finalCount = finalSeriesRes.rows[0].c;

  const publicAiets = await clientOrPool.query(
    "SELECT id, title, slug, price, planned_tests, is_featured, is_active FROM test_series WHERE slug IN ('neet-ug-2027-aiets-comprehensive-test-series', 'aiets-neet-ug-2028-two-year-online-cbt-program')"
  );

  return {
    dbTarget: env.pg.host || 'Neon PostgreSQL',
    initialCount,
    createdSeries,
    updatedSeries,
    createdAssessments,
    linkedAssessments,
    finalCount,
    publicAiets: publicAiets.rows,
  };
};

const runStandalone = async () => {
  try {
    const stats = await importAietsRecords(pool);
    console.log('\n========================================');
    console.log(' AIETS DATABASE IMPORT SUMMARY');
    console.log('========================================');
    console.log(` Database Target        : ${stats.dbTarget}`);
    console.log(` Existing Series Count  : ${stats.initialCount}`);
    console.log(` Created Series         : ${stats.createdSeries}`);
    console.log(` Updated Series         : ${stats.updatedSeries}`);
    console.log(` Created Assessments    : ${stats.createdAssessments}`);
    console.log(` Linked Assessments     : ${stats.linkedAssessments}`);
    console.log(` Final Series Count     : ${stats.finalCount}`);
    console.log('========================================');
    console.log(' Public AIETS Records   :');
    stats.publicAiets.forEach((s) => {
      console.log(`  - [ID: ${s.id}] ${s.title} (Price: ₹${s.price}, Planned: ${s.planned_tests}, Featured: ${s.is_featured})`);
    });
    console.log('========================================\n');
    process.exit(0);
  } catch (err) {
    console.error('[import-aiets] Failed:', err.message);
    process.exit(1);
  }
};

if (process.argv[1]?.includes('importAiets.js')) {
  runStandalone();
}
