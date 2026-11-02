import { pool } from '../src/config/db.js';

async function checkTypes() {
  const res = await pool.query("SELECT DISTINCT question_type FROM question_bank");
  console.log('Distinct question types in question_bank:', res.rows.map(r => r.question_type));
  await pool.end();
}

checkTypes().catch(console.error);

