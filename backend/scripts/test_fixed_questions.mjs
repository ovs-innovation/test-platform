import { pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  console.log('=== Checking Local DB ===');
  const localRes = await pool.query(
    "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = 160 AND image_url IS NOT NULL ORDER BY id ASC"
  );
  console.log(`Local DB has ${localRes.rows.length} questions with image_url:`);
  for (const r of localRes.rows) {
    console.log(`- ID ${r.id}:`);
    console.log(`  Text: "${r.question_text.slice(0, 80)}..."`);
    console.log(`  image_url: ${r.image_url}`);
  }

  console.log('\n=== Checking Live API ===');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const questions = liveData.data?.questions || liveData.questions || [];
  const fluidsLive = questions.filter(q =>
    (Number(q.chapter_id) === 233 || (Number(q.id) >= 15549 && Number(q.id) <= 15693)) &&
    q.image_url
  );
  console.log(`Live API has ${fluidsLive.length} questions with image_url:`);
  for (const q of fluidsLive) {
    console.log(`- ID ${q.id}:`);
    console.log(`  Text: "${(q.question_text || '').slice(0, 80)}..."`);
    console.log(`  image_url: ${q.image_url}`);
  }

  await pool.end();
}

check().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
