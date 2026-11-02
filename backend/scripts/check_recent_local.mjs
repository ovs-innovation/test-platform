import { pool } from '../src/config/db.js';

async function check() {
  const res = await pool.query("SELECT id, question_type, topic, question_text FROM question_bank WHERE id >= 4863 ORDER BY id");
  console.log('Inserted rows >= 4863:', res.rows.length);
  res.rows.forEach(r => console.log(`ID ${r.id}: [${r.question_type}] [${r.topic}] ${r.question_text.slice(0, 50)}...`));
  await pool.end();
}

check().catch(console.error);
