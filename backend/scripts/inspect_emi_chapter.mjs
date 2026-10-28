import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('=== Checking Neon DB for Electromagnetic Induction ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  try {
    const s = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Physics'");
    const subId = s.rows[0].id;
    console.log('Physics Subject ID in Neon:', subId);

    const ch = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND name ILIKE '%electromagnetic%'", [subId]);
    console.log('Chapters matching electromagnetic in Neon:', ch.rows);

    for (const c of ch.rows) {
      const qCount = await client.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1", [c.id]);
      console.log(`Neon Chapter [${c.id}] "${c.name}": ${qCount.rows[0].count} questions`);
    }
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Checking Live edvedum.com for Electromagnetic Induction ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  console.log('Physics Subject ID in Live:', physicsSub?.id);

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  const emiChaps = chaps.filter(c => c.name.toLowerCase().includes('electromagnetic') || c.name.toLowerCase().includes('induction'));
  console.log('Chapters matching electromagnetic/induction in Live:', emiChaps);

  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  for (const c of emiChaps) {
    const count = existingQuestions.filter(q => q.chapter_id === c.id || (q.chapter && q.chapter.toLowerCase() === c.name.toLowerCase())).length;
    console.log(`Live Chapter [${c.id}] "${c.name}": ${count} questions`);
  }
}

main().catch(console.error);
