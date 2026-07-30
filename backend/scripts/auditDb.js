import { query } from '../src/config/db.js';

async function audit() {
  try {
    const ts = await query(`
      SELECT id, title, code, slug, planned_tests, test_count
      FROM test_series
      WHERE slug IN ('neet-ug-2027-aiets-comprehensive-test-series', 'aiets-neet-ug-2028-two-year-online-cbt-program')
    `);
    console.log('=== AIETS TEST SERIES RECORDS ===');
    console.log(ts.rows);

    for (const s of ts.rows) {
      const linked = await query('SELECT COUNT(*)::int AS cnt FROM test_series_assessments WHERE test_series_id = $1', [s.id]);
      const draft = await query(`
        SELECT COUNT(*)::int AS cnt
        FROM test_series_assessments tsa
        JOIN assessments a ON a.id = tsa.assessment_id
        WHERE tsa.test_series_id = $1 AND a.is_published = false
      `, [s.id]);
      const scheduled = await query(`
        SELECT COUNT(*)::int AS cnt
        FROM test_series_assessments tsa
        JOIN assessments a ON a.id = tsa.assessment_id
        WHERE tsa.test_series_id = $1 AND a.start_time IS NOT NULL
      `, [s.id]);
      const published = await query(`
        SELECT COUNT(*)::int AS cnt
        FROM test_series_assessments tsa
        JOIN assessments a ON a.id = tsa.assessment_id
        WHERE tsa.test_series_id = $1 AND a.is_published = true
      `, [s.id]);

      const now = new Date().toISOString();
      const live = await query(`
        SELECT COUNT(*)::int AS cnt
        FROM test_series_assessments tsa
        JOIN assessments a ON a.id = tsa.assessment_id
        WHERE tsa.test_series_id = $1 AND a.is_published = true AND a.start_time <= $2 AND a.end_time >= $2
      `, [s.id, now]);

      console.log(`\n----------------------------------------`);
      console.log(` Package: ${s.title}`);
      console.log(` Code: ${s.code || s.slug} | ID: ${s.id}`);
      console.log(` Planned Tests        : ${s.planned_tests || s.test_count}`);
      console.log(` Total Linked         : ${linked.rows[0].cnt}`);
      console.log(` Draft Assessments    : ${draft.rows[0].cnt}`);
      console.log(` Scheduled Assessments: ${scheduled.rows[0].cnt}`);
      console.log(` Published Assessments: ${published.rows[0].cnt}`);
      console.log(` Live Assessments     : ${live.rows[0].cnt}`);
      console.log(`----------------------------------------`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Audit failed:', err.message);
    process.exit(1);
  }
}

audit();
