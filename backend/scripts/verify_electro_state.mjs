import fetch from 'node-fetch';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function verify() {
  // 1. Live API
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const res = await fetch('https://edvedum.com/api/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&limit=300', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Live API Electrostatics questions: ${questions.length}`);
  
  // Find Q4 and Q13
  const q4 = questions.find(q => q.question_text?.includes('Three charges') || q.id === 65014);
  const q13 = questions.find(q => q.question_text?.includes('Two spherical conductors $A$ and $B$') || q.id === 65025);
  console.log('\n--- LIVE API Q4 ---');
  console.log('ID:', q4?.id);
  console.log('Text:', q4?.question_text);
  console.log('Image:', q4?.image_url);
  console.log('Options:', q4?.options);

  console.log('\n--- LIVE API Q13 ---');
  console.log('ID:', q13?.id);
  console.log('Text:', q13?.question_text);
  console.log('Image:', q13?.image_url);
  console.log('Options:', q13?.options);

  // 2. Neon DB
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const dbRes = await client.query(`
      SELECT id, question_text, options, image_url 
      FROM question_bank 
      WHERE chapter ILIKE 'Electrostatics' AND exam_type = 'JEE'
      ORDER BY id ASC LIMIT 15
    `);
    console.log(`\n--- NEON DB First 15 rows count: ${dbRes.rows.length} ---`);
    console.log('Neon Q4 (index 3):', {
      id: dbRes.rows[3]?.id,
      text: dbRes.rows[3]?.question_text?.substring(0, 60),
      image: dbRes.rows[3]?.image_url,
      options: typeof dbRes.rows[3]?.options === 'string' ? JSON.parse(dbRes.rows[3]?.options) : dbRes.rows[3]?.options
    });
    console.log('Neon Q13 (index 12):', {
      id: dbRes.rows[12]?.id,
      text: dbRes.rows[12]?.question_text?.substring(0, 60),
      image: dbRes.rows[12]?.image_url,
      options: typeof dbRes.rows[12]?.options === 'string' ? JSON.parse(dbRes.rows[12]?.options) : dbRes.rows[12]?.options
    });
  } finally {
    client.release();
    pool.end();
  }
}
verify().catch(console.error);
