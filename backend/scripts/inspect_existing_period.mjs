import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('--- Checking Local DB existing PYQ for Periodic Table ---');
  const res = await pool.query(
    "SELECT count(*)::int as count, chapter_id, chapter FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 155 OR chapter ILIKE '%periodic%') GROUP BY chapter_id, chapter"
  );
  console.log('Local DB counts:', res.rows);

  console.log('\n--- Checking Live API existing PYQ for Periodic Table ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (qRes.ok) {
    const qData = await qRes.json();
    const list = qData.questions || qData.data || [];
    const matched = list.filter(q => 
      [10, 83, 68, 155].includes(Number(q.chapter_id)) ||
      /periodic|periodicity|classification/i.test(q.chapter || '') ||
      /periodic|periodicity|classification/i.test(q.chapter_name || '')
    );
    console.log(`Live matched questions: ${matched.length}`);
    if (matched.length > 0) {
      console.log('Sample matched chapter_id/names:', matched.slice(0, 5).map(q => ({
        id: q.id,
        chapter_id: q.chapter_id,
        chapter: q.chapter,
        chapter_name: q.chapter_name,
        text: q.question_text?.slice(0, 50)
      })));
    }
  }

  await pool.end();
}

main().catch(console.error);
