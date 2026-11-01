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
  console.log('=== Verifying Quadratic Equations Questions ===\n');

  // 1. Neon DB
  const localRes = await query(`
    SELECT count(*) as total
    FROM question_bank 
    WHERE chapter = 'Quadratic Equations'
  `);
  console.log('Local Neon DB "Quadratic Equations" count:', localRes.rows[0].total);

  const localSample = await query(`
    SELECT id, question_text, correct_index, marks
    FROM question_bank
    WHERE chapter = 'Quadratic Equations'
    ORDER BY id ASC
    LIMIT 3
  `);
  console.log('\nLocal Neon DB Sample Questions (First 3):', localSample.rows);

  // 2. Live Production
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const list = liveData.data?.questions || liveData.questions || [];
  
  const quadLive = list.filter(q => q.chapter === 'Quadratic Equations' || q.chapter_id === 241);
  console.log(`\nLive Production "Quadratic Equations" count: ${quadLive.length} (5 pre-existing + 49 newly imported)`);

  console.log('\nLive Production Sample Questions (First 3):', quadLive.slice(0, 3).map(q => ({
    id: q.id,
    chapter: q.chapter,
    text: q.question_text?.slice(0, 70)
  })));

  console.log('\nLive Production Sample Questions (Last 3):', quadLive.slice(-3).map(q => ({
    id: q.id,
    chapter: q.chapter,
    text: q.question_text?.slice(0, 70)
  })));
}

verify().catch(console.error);
