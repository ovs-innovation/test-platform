import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  const client = await pool.connect();
  const subRes = await client.query('SELECT id, name FROM subjects');
  console.log('Local subjects:', subRes.rows);

  const chRes = await client.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%wave%'");
  console.log('All local wave chapters:', chRes.rows);

  const qRes = await client.query(`
    SELECT chapter_id, chapter, exam_type, count(*) 
    FROM question_bank 
    WHERE chapter ILIKE '%wave%optics%' OR chapter ILIKE '%waves%' OR chapter_id IN (34, 64, 138, 200, 201)
    GROUP BY chapter_id, chapter, exam_type
  `);
  console.log('Local question counts in question_bank:', qRes.rows);
  client.release();
  await pool.end();

  const token = await getToken();
  const liveQRes = await fetch(`${LIVE_API}/question-bank?subjectId=5&chapterId=31&limit=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQData = await liveQRes.json();
  console.log('Live API chapter 31 Qs total:', liveQData.total || (liveQData.questions ? liveQData.questions.length : 'none'));
  if (liveQData.questions && liveQData.questions.length > 0) {
    console.log('Sample live question:', liveQData.questions[0].question_text?.substring(0, 100));
  }
}

main().catch(console.error);
