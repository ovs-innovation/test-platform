import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_SUBJECT_ID = 13;
const LOCAL_CHAPTER_ID = 173;
const LIVE_SUBJECT_ID = 2;
const LIVE_CHAPTER_ID = 264;
const CHAPTER_NAME = 'Biomolecules';
const CATEGORY_NAME = 'Zoology';

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function verify() {
  console.log('\n==================================================');
  console.log('🔍 FINAL VERIFICATION FOR ZOOLOGY > BIOMOLECULES');
  console.log('==================================================\n');

  // 1. Local Neon DB
  const localTotalRes = await query(
    "SELECT count(*) as total FROM question_bank WHERE category = $1 AND (chapter = $2 OR chapter_id = $3)",
    [CATEGORY_NAME, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const localBreakdown = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE category = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [CATEGORY_NAME, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );

  console.log('LOCAL NEON DB:');
  console.log(`- Total Questions: ${localTotalRes.rows[0].total}`);
  console.log('- Breakdown by Type:', localBreakdown.rows);

  // 2. Live Production API
  const token = await getLiveToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allZoo = liveData.questions || liveData.data || [];
  const biomoleculesLive = allZoo.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('biomolecule'))
  );

  const liveMCQs = biomoleculesLive.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = biomoleculesLive.filter(q => q.question_type === 'assertion_reason');

  console.log('\nLIVE PRODUCTION API:');
  console.log(`- Total Questions: ${biomoleculesLive.length}`);
  console.log(`- MCQs: ${liveMCQs.length}`);
  console.log(`- Assertion-Reason: ${liveARs.length}`);
  console.log('\n==================================================\n');
}

verify().catch(console.error);
