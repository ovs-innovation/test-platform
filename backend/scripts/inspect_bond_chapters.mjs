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
  console.log('--- Checking Local DB Chapters for Chemistry (subject_id = 10) ---');
  const res = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND (name ILIKE '%bond%' OR name ILIKE '%structure%')"
  );
  console.log('Local chapters:', res.rows);

  const pyqCounts = await pool.query(
    "SELECT chapter_id, chapter, count(*)::int FROM question_bank WHERE category = 'PYQ' AND (chapter ILIKE '%bond%' OR chapter_id IN (44, 60)) GROUP BY chapter_id, chapter"
  );
  console.log('Local DB PYQ counts:', pyqCounts.rows);

  console.log('\n--- Checking Live API Chapters for Chemistry (subject_id = 6) ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chRes.ok) {
    const chData = await chRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.filter(c => /bond/i.test(c.name));
    console.log('Live matched chapters:', matched);
  }

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (qRes.ok) {
    const qData = await qRes.json();
    const list = qData.questions || qData.data || [];
    const matchedQ = list.filter(q => 
      [12, 38].includes(Number(q.chapter_id)) ||
      /bond/i.test(q.chapter || '') ||
      /bond/i.test(q.chapter_name || '')
    );
    console.log(`Live matched PYQ questions: ${matchedQ.length}`);
  }

  await pool.end();
}

main().catch(console.error);

