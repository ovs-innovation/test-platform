import { pool } from '../src/config/db.js';

async function verifyLocal() {
  const total = await pool.query("SELECT count(*) FROM question_bank WHERE chapter_id = 156");
  const mcq = await pool.query("SELECT count(*) FROM question_bank WHERE chapter_id = 156 AND question_type != 'assertion_reason'");
  const ar = await pool.query("SELECT count(*) FROM question_bank WHERE chapter_id = 156 AND question_type = 'assertion_reason'");
  const minMax = await pool.query("SELECT min(id), max(id) FROM question_bank WHERE chapter_id = 156");

  console.log(`Local DB (Neon) - Biological Classification:`);
  console.log(`Total: ${total.rows[0].count}`);
  console.log(`MCQ: ${mcq.rows[0].count}`);
  console.log(`AR: ${ar.rows[0].count}`);
  console.log(`ID range: ${minMax.rows[0].min} - ${minMax.rows[0].max}`);
  await pool.end();
}

verifyLocal().catch(console.error);
