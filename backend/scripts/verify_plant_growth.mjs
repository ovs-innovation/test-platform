import { query } from '../src/config/db.js';

async function main() {
  const res = await query(`
    SELECT question_type, count(*), min(marks) as min_marks, max(marks) as max_marks
    FROM question_bank
    WHERE category = 'Botany' AND chapter = 'Plant Growth and Development'
    GROUP BY question_type
  `);
  console.log('Local DB Verification:', res.rows);

  const sampleQ = await query(`
    SELECT id, question_text, question_type, options, correct_index, solution, image_url
    FROM question_bank
    WHERE category = 'Botany' AND chapter = 'Plant Growth and Development' AND image_url IS NOT NULL
  `);
  console.log('Sample diagram question:', sampleQ.rows);
}

main().catch(console.error).finally(() => process.exit(0));

