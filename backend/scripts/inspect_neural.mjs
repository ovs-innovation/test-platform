import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonQ = await pool.query(`
    SELECT count(*) as total, count(*) filter (where category = 'PYQ') as pyq_total
    FROM question_bank
    WHERE subject = 'Zoology' AND (chapter ILIKE '%Neural%' OR chapter_id = 174)
  `);
  console.log('Neon existing questions for Neural:', neonQ.rows[0]);

  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const liveQRes = await fetch(LIVE_API + '/question-bank?subject_id=2&chapter_id=4', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveQ = await liveQRes.json();
  console.log('Live Server existing questions count:', liveQ.total || liveQ.questions?.length || liveQ.data?.length || 0);

  await pool.end();
}

check().catch(console.error);

