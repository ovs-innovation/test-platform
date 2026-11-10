import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function check() {
  const localRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND (LOWER(name) LIKE '%work%' OR LOWER(name) LIKE '%energy%' OR LOWER(name) LIKE '%power%') ORDER BY id"
  );
  console.log('Local Physics Chapters matching work/energy/power:', localRes.rows);

  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveRes.ok) {
    const data = await liveRes.json();
    const chs = (data.chapters || data).filter(c =>
      (c.name || '').toLowerCase().includes('work') ||
      (c.name || '').toLowerCase().includes('energy') ||
      (c.name || '').toLowerCase().includes('power')
    );
    console.log('Live Physics chapters matching work/energy/power:', chs);
  }

  // Also check existing PYQ questions in both
  const localPYQ = await pool.query(
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (LOWER(chapter) LIKE '%work%' OR chapter_id IN (SELECT id FROM chapters WHERE subject_id = 11 AND LOWER(name) LIKE '%work%'))"
  );
  console.log('Local DB existing PYQ in Work chapter:', localPYQ.rows[0].count);

  const livePYQRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const livePYQData = await livePYQRes.json();
  const livePYQList = (livePYQData.questions || []).filter(q =>
    (q.chapter || '').toLowerCase().includes('work')
  );
  console.log('Live API existing PYQ in Work chapter:', livePYQList.length);

  await pool.end();
}

check().catch(console.error);

