import { pool } from '../src/config/db.js';

async function verifyLocal() {
  console.log('=== Local Chemistry Chapter Counts ===');
  const res = await pool.query(`
    SELECT chapter, question_type, COUNT(*) as cnt 
    FROM question_bank 
    WHERE category = 'Chemistry' OR subject_id = 10
    GROUP BY chapter, question_type
    ORDER BY chapter, question_type
  `);
  
  const map = {};
  for (const r of res.rows) {
    if (!map[r.chapter]) map[r.chapter] = { mcq: 0, ar: 0, total: 0 };
    if (r.question_type === 'assertion_reason') {
      map[r.chapter].ar += parseInt(r.cnt, 10);
    } else {
      map[r.chapter].mcq += parseInt(r.cnt, 10);
    }
    map[r.chapter].total += parseInt(r.cnt, 10);
  }

  for (const [ch, counts] of Object.entries(map)) {
    console.log(`- ${ch}: Total=${counts.total} (MCQ=${counts.mcq}, AR=${counts.ar})`);
  }
}

verifyLocal().catch(console.error).finally(() => pool.end());

