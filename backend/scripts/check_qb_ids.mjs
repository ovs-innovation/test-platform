import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const r = await pool.query(`
  SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as c 
  FROM question_bank
`);
console.log('Question bank stats:', r.rows);

const r2 = await pool.query(`
  SELECT id, subject, category, chapter_id, topic, question_text 
  FROM question_bank
  WHERE id BETWEEN 7150 AND 7480
  ORDER BY id
  LIMIT 20
`);
console.log('Questions between 7150 and 7480:', r2.rows);

await pool.end();

