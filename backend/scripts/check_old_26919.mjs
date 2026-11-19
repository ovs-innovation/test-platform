import { query } from '../src/config/db.js';

async function main() {
  const r = await query('SELECT id, chapter, exam_type, category FROM question_bank WHERE id = 26919;');
  console.log('ID 26919 in question_bank:', r.rows);
  const r2 = await query('SELECT id, question_text FROM questions WHERE id = 26919;');
  console.log('ID 26919 in questions table:', r2.rows);
  process.exit(0);
}

main().catch(console.error);
