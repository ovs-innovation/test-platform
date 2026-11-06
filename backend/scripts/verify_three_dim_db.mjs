import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function verify() {
  const ch = await pool.query("SELECT id, name, subject_id FROM chapters WHERE id = 98 OR LOWER(name) LIKE '%three%dimen%'");
  console.log('Chapter:', ch.rows);

  const counts = await pool.query(`
    SELECT chapter, chapter_id, count(*) as count, question_type
    FROM question_bank
    WHERE subject_id = 7 AND (chapter_id = 98 OR LOWER(chapter) LIKE '%three%dimen%')
    GROUP BY chapter, chapter_id, question_type
  `);
  console.log('Question bank counts:', counts.rows);

  const total = await pool.query(`
    SELECT count(*) as total FROM question_bank WHERE subject_id = 7 AND chapter_id = 98
  `);
  console.log('Total 3D Geometry questions in DB:', total.rows[0].total);

  await pool.end();
}

verify().catch(console.error);

