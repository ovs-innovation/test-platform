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

async function verifyCounts() {
  console.log('=== Verifying Local Neon DB ===');
  const localRes = await pool.query(`
    SELECT question_type, count(*) as count
    FROM question_bank
    WHERE chapter_id = 160
    GROUP BY question_type
  `);
  console.log('Local Counts by type:', localRes.rows);

  const localTotal = await pool.query(`
    SELECT min(id) as min_id, max(id) as max_id, count(*) as total
    FROM question_bank
    WHERE chapter_id = 160
  `);
  console.log('Local Total & Range:', localTotal.rows[0]);

  console.log('\n=== Verifying Live API ===');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology&limit=200`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const questions = liveData.data?.questions || liveData.questions || [];
  const fluidsLive = questions.filter(q =>
    Number(q.chapter_id) === 233 ||
    (Number(q.id) >= 15549 && Number(q.id) <= 15693) ||
    /body\s*fluids?/i.test(q.chapter_name || q.chapter || '')
  );
  console.log(`Live fetched questions matching Body Fluids: ${fluidsLive.length}`);

  const mcqs = fluidsLive.filter(q => q.question_type !== 'assertion_reason');
  const ars = fluidsLive.filter(q => q.question_type === 'assertion_reason');
  console.log(`Live breakdown: ${mcqs.length} MCQs, ${ars.length} AR questions.`);

  await pool.end();
}

verifyCounts().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
