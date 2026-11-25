import pg from 'pg';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config({ path: 'backend/.env' });

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const qRes = await client.query('SELECT id, chapter_id, chapter, category, exam_type, question_text FROM question_bank WHERE id = 60578');
    console.log('Neon row 60578:', qRes.rows);

    const findText = await client.query("SELECT id, chapter_id, chapter, category, exam_type, question_text FROM question_bank WHERE question_text ILIKE '%paint A to B%' LIMIT 5");
    console.log('Find by paint text:', findText.rows);

    const chRes = await client.query("SELECT DISTINCT chapter_id, chapter, exam_type, COUNT(*) FROM question_bank WHERE chapter ILIKE '%Electro%' GROUP BY chapter_id, chapter, exam_type");
    console.log('Electro chapters:', chRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Also query live API without filters or with different filters
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const searchRes = await fetch('https://edvedum.com/api/question-bank?search=paint+A+to+B', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const searchData = await searchRes.json();
  console.log('Live API search "paint A to B":', searchData.questions?.map(q => ({ id: q.id, chapter: q.chapter, chapter_id: q.chapter_id })));

  const q60578Res = await fetch('https://edvedum.com/api/question-bank?search=W+is+the+work+done', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const q60578Data = await q60578Res.json();
  console.log('Live API search "W is the work done":', q60578Data.questions?.map(q => ({ id: q.id, chapter: q.chapter, chapter_id: q.chapter_id })));
}

main().catch(console.error);
