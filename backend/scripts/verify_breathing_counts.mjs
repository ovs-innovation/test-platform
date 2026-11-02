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

async function verify() {
  console.log('--- LOCAL DB (Neon) ---');
  const localRes = await pool.query(`
    SELECT question_type, COUNT(*) as count, MIN(id) as min_id, MAX(id) as max_id
    FROM question_bank
    WHERE chapter_id = 159
    GROUP BY question_type
  `);
  console.log('Local Chapter 159 Counts:', localRes.rows);

  console.log('\n--- LIVE API (edvedum.com) ---');
  const token = await getToken();
  const qRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const qData = await qRes.json();
  const all = qData.questions || [];
  const breathing = all.filter(q => Number(q.id) >= 15415 && Number(q.id) <= 15548);
  console.log('Live Breathing Questions Count:', breathing.length);

  const mcqs = breathing.filter(q => q.question_type !== 'assertion_reason' && q.type !== 'assertion_reason');
  const ars = breathing.filter(q => q.question_type === 'assertion_reason' || q.type === 'assertion_reason');
  console.log('- Live MCQs:', mcqs.length);
  console.log('- Live ARs:', ars.length);
  if (ars.length > 0) {
    console.log('First AR on Live:', ars[0].id, ars[0].question_text?.substring(0, 60));
    console.log('Last AR on Live:', ars[ars.length - 1].id, ars[ars.length - 1].question_text?.substring(0, 60));
  }

  await pool.end();
}

verify().catch(console.error);

