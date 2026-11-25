import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verifyLive() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT chapter, exam_type, count(*), 
             count(CASE WHEN question_type = 'numerical' THEN 1 END) as numeric_cnt
      FROM question_bank 
      WHERE exam_type = 'JEE' 
      GROUP BY chapter, exam_type
      ORDER BY count(*) DESC
    `);
    console.log('Neon DB JEE Chapters:', res.rows);

    // Check if there are any duplicate capacitance questions in Electrostatics
    const dupRes = await client.query(`
      SELECT count(*) FROM question_bank 
      WHERE exam_type = 'JEE' AND chapter ILIKE '%electrostatic%'
    `);
    console.log('JEE questions under Electrostatics:', dupRes.rows[0].count);

  } finally {
    client.release();
    await pool.end();
  }

  // Live API test
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const apiRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Capacitance&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await apiRes.json();
  const qList = data.questions || [];
  console.log('Live API question count for Capacitance:', qList.length);
  const numericInApi = qList.filter(q => q.question_type === 'numerical' || q.question_type === 'integer');
  console.log('Numeric questions in API:', numericInApi.length);

  // If API count is 133, let's see why it's not 176:
  // Check what filter the live API applies!
  // In QuestionBank.jsx:
  // How does QuestionBank query questions?
  // Let's check!
}

verifyLive().catch(console.error);
