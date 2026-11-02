import { pool } from '../src/config/db.js';

async function main() {
  const res = await pool.query(`
    SELECT question_type, COUNT(*) as count, MIN(id) as min_id, MAX(id) as max_id
    FROM question_bank
    WHERE chapter_id = 158
    GROUP BY question_type
  `);
  console.log('Local DB Chapter 158 counts:', res.rows);
  await pool.end();
}

main().catch(console.error);

