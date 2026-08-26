import { query, withTransaction } from '../config/db.js';

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

export const seedOneYearSchedule = async () => {
  try {
    await withTransaction(async (client) => {
      const seriesRes = await client.query("SELECT id FROM test_series WHERE slug = 'neet-ug-2027-comprehensive-test-series' LIMIT 1");
      if (!seriesRes.rowCount) return;
      const seriesId = seriesRes.rows[0].id;

      for (const item of ONE_YEAR_39_SCHEDULE) {
        // Create or update assessment
        const title = `AIETS 2027: ${item.name}`;
        const startTime = new Date(`${item.date}T09:00:00+05:30`).toISOString();
        const endTime = new Date(`${item.date}T12:00:00+05:30`).toISOString();

        const assessRes = await client.query(
          `INSERT INTO assessments (
            title, description, instructions, duration_minutes, passing_marks, max_violations,
            result_visible, is_published, sequence_number, test_type, preparation_phase, start_time, end_time
          ) VALUES ($1,$2,$3,180,180,3,true,false,$4,$5,$6,$7,$8)
          ON CONFLICT (id) DO NOTHING
          RETURNING id`,
          [
            title,
            `${item.phase.replace('_', ' ')} Phase - NEET / JEE Pattern ${item.type.replace('_', ' ')}`,
            'Authentic NEET / JEE-pattern CBT test. Ensure stable connection.',
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
        } else {
          const findRes = await client.query("SELECT id FROM assessments WHERE title = $1 LIMIT 1", [title]);
          if (findRes.rowCount) assessmentId = findRes.rows[0].id;
        }

        if (assessmentId) {
          await client.query(
            `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (test_series_id, assessment_id) DO UPDATE SET position = EXCLUDED.position, label = EXCLUDED.label`,
            [seriesId, assessmentId, item.sequence, item.name]
          );
        }
      }
    });

    console.log('[seed] 39-Test One-Year Schedule seeded cleanly.');
  } catch (err) {
    console.error('[seed] Error seeding schedule:', err.message);
  }
};
