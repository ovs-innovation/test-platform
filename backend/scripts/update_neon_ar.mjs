import { pool } from '../src/config/db.js';

async function main() {
  console.log('--- Updating question_type = "assertion_reason" in Neon DB ---');
  const res = await pool.query(`
    UPDATE question_bank
    SET question_type = 'assertion_reason'
    WHERE question_type != 'assertion_reason'
      AND (
        (question_text ILIKE '%assertion%' AND question_text ILIKE '%reason%')
        OR (options::text ILIKE '%both%assertion%reason%')
        OR (options::text ILIKE '%assertion is true%reason is false%')
        OR (assertion_text IS NOT NULL AND reason_text IS NOT NULL)
      )
    RETURNING id, chapter, category;
  `);

  console.log(`Updated ${res.rowCount} questions to question_type = 'assertion_reason' in Neon DB!`);

  const summary = await pool.query(`
    SELECT question_type, count(id) FROM question_bank GROUP BY question_type;
  `);
  console.log('Current distribution in Neon DB:');
  console.table(summary.rows);

  await pool.end();
}

main().catch(console.error);

