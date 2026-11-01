import { query } from '../src/config/db.js';

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

async function verify() {
  console.log('=== Verifying Application of Derivatives Questions ===\n');

  // 1. Local Neon DB
  const localRes = await query(
    `SELECT count(*)::int as count FROM question_bank WHERE chapter = 'Application of Derivatives'`
  );
  console.log(`Local Neon DB "Application of Derivatives" count: ${localRes.rows[0].count}`);

  const localSamples = await query(
    `SELECT id, question_text, correct_index, marks FROM question_bank WHERE chapter = 'Application of Derivatives' ORDER BY id ASC LIMIT 3`
  );
  console.log('\nLocal Neon DB Sample Questions (First 3):', localSamples.rows);

  // 2. Live Production API
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.data?.questions || liveData.questions || [];

  const liveAod = liveQuestions.filter(
    q => (q.chapter || '').toLowerCase() === 'application of derivatives'
  );
  console.log(`\nLive Production "Application of Derivatives" count: ${liveAod.length}`);

  console.log('\nLive Production Sample Questions (First 3):', liveAod.slice(0, 3).map(q => ({
    id: q.id,
    chapter: q.chapter,
    text: q.question_text?.slice(0, 70)
  })));

  console.log('\nLive Production Sample Questions (Last 3):', liveAod.slice(-3).map(q => ({
    id: q.id,
    chapter: q.chapter,
    text: q.question_text?.slice(0, 70)
  })));
}

verify().catch(console.error);

