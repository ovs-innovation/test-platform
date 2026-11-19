import { pool } from '../src/config/db.js';

async function main() {
  const chs = await pool.query(`
    SELECT c.id, c.name, s.name as subject_name
    FROM chapters c
    JOIN subjects s ON c.subject_id = s.id
    WHERE LOWER(s.name) = 'physics'
    ORDER BY c.name
  `);
  console.log('Existing Physics chapters in DB:');
  console.table(chs.rows);

  const qbChs = await pool.query(`
    SELECT chapter, COUNT(*)::int as count
    FROM question_bank
    WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'
    GROUP BY chapter
    ORDER BY chapter
  `);
  console.log('\nJEE Physics chapters in question_bank:');
  console.table(qbChs.rows);

  await pool.end();
}

main().catch(console.error);
