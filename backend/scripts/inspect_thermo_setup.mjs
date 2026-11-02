import { query } from '../src/config/db.js';

async function check() {
  const chs = await query("SELECT * FROM chapters WHERE name ILIKE '%thermo%'");
  console.log('Chapters matching thermo in DB:');
  console.table(chs.rows);

  const qb = await query("SELECT category, subject, chapter, question_type, COUNT(id) as cnt FROM question_bank WHERE chapter ILIKE '%thermo%' GROUP BY category, subject, chapter, question_type");
  console.log('Question bank counts:');
  console.table(qb.rows);
}

check().catch(console.error);
