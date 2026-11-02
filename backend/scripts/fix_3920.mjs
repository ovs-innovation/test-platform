import { pool } from '../src/config/db.js';

async function run() {
  await pool.query("UPDATE question_bank SET chapter = 'Solutions' WHERE id = 3920");
  const res = await pool.query("SELECT id, chapter_id, chapter FROM question_bank WHERE id = 3920");
  console.log('Updated 3920:', res.rows[0]);
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

