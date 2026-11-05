import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_SUBJECT_ID = 21;
const LOCAL_CHAPTER_ID = 183;
const LIVE_CHAPTER_ID = 288;
const CHAPTER_NAME = 'Hyperbola';

async function main() {
  console.log('=== VERIFYING FINAL COUNTS ===');

  // 1. Local Neon DB
  const localRes = await query(
    'SELECT COUNT(*) as count FROM question_bank WHERE subject_id = $1 AND chapter_id = $2',
    [LOCAL_SUBJECT_ID, LOCAL_CHAPTER_ID]
  );
  const localCount = Number(localRes.rows[0].count);
  console.log(`Local Neon DB (${CHAPTER_NAME}, chapter_id: ${LOCAL_CHAPTER_ID}): ${localCount}`);

  // 2. Live Production API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.data?.token || loginData.accessToken;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = (liveData.questions || liveData.data || []).filter(
    q => q.chapter_id === LIVE_CHAPTER_ID
  );
  const liveCount = liveQuestions.length;
  console.log(`Live Production API (${CHAPTER_NAME}, chapter_id: ${LIVE_CHAPTER_ID}): ${liveCount}`);

  console.log('\n==============================================');
  if (localCount === 101 && liveCount === 101) {
    console.log('🎉 PERFECT MATCH: Exactly 101 questions in BOTH Local DB and Live Production API!');
    process.exit(0);
  } else {
    console.error(`Mismatch! Local: ${localCount}, Live: ${liveCount}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
