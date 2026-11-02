import { pool } from '../src/config/db.js';

async function main() {
  const chaps = await pool.query("SELECT * FROM chapters WHERE subject_id IN (10, 15) OR name ILIKE '%botany%'");
  console.log('Chapters in DB for subject 10 or 15:', chaps.rows);
}

main().catch(console.error).finally(() => pool.end());

