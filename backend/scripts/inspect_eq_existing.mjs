import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3000`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];

  const chemQs = questions.filter(q => Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry');

  const eqLive = chemQs.filter(q =>
    Number(q.chapter_id) === 11 ||
    Number(q.chapter_id) === 146 ||
    Number(q.chapter_id) === 13 ||
    /equilib/i.test(q.chapter || '') ||
    /equilib/i.test(q.chapter_name || '')
  );

  console.log(`Live existing Equilibrium questions: ${eqLive.length}`);
  const liveChCounts = {};
  for (const q of eqLive) {
    const key = `${q.chapter_id}: ${q.chapter || q.chapter_name}`;
    liveChCounts[key] = (liveChCounts[key] || 0) + 1;
  }
  console.table(liveChCounts);

  if (process.env.DATABASE_URL) {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
    const neonRes = await pool.query(
      "SELECT chapter_id, chapter, count(*)::int FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 73 OR chapter ILIKE '%equilib%') GROUP BY chapter_id, chapter"
    );
    console.log('Neon existing Equilibrium questions:');
    console.table(neonRes.rows);
    await pool.end();
  }
}

check().catch(console.error);

