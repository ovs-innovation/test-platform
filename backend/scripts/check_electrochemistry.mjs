import { query, pool } from '../src/config/db.js';

async function main() {
  const ch = await query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%electrochem%'");
  console.log('Electrochemistry chapter:', ch.rows);

  const count = await query("SELECT count(*) as count FROM question_bank WHERE chapter ILIKE '%electrochem%' OR chapter_id = 126");
  console.log('Existing questions in Electrochemistry in question_bank:', count.rows[0].count);

  if (parseInt(count.rows[0].count) > 0) {
    const samples = await query("SELECT id, question_text, chapter, topic FROM question_bank WHERE chapter ILIKE '%electrochem%' OR chapter_id = 126 LIMIT 5");
    console.log('Sample questions:', samples.rows);
  }

  await pool.end();
  process.exit(0);
}

main().catch(console.error);
