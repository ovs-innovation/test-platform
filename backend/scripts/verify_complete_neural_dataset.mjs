import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 13;
const LOCAL_CHAPTER_ID = 174;
const LIVE_SUBJECT_ID = 2;
const LIVE_CHAPTER_ID = 4;
const CHAPTER_NAME = 'Neural Control and Coordination';

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
  console.log('====================================================');
  console.log('📊 VERIFYING COMPLETE NEURAL CONTROL & COORDINATION');
  console.log('====================================================\n');

  // 1. Local Database Verification
  console.log('--- 1. LOCAL NEON DATABASE ---');
  const localRes = await query(
    `SELECT id, question_text, question_type, options, correct_index, image_url 
     FROM question_bank 
     WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)`,
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const localQuestions = localRes.rows;
  const localMCQs = localQuestions.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const localARs = localQuestions.filter(q => q.question_type === 'assertion_reason');
  const localDiagrams = localQuestions.filter(q => !!q.image_url);

  console.log(`Local Total Questions: ${localQuestions.length}`);
  console.log(`  - MCQs: ${localMCQs.length} (Target: 139)`);
  console.log(`  - Assertion-Reason: ${localARs.length} (Target: 18)`);
  console.log(`  - Questions with Diagram: ${localDiagrams.length}`);

  // 2. Live Production API Verification
  console.log('\n--- 2. LIVE PRODUCTION API ---');
  const token = await getLiveToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.questions || liveData.data || [];
  const liveNeural = allLive.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('neural'))
  );
  const liveMCQs = liveNeural.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = liveNeural.filter(q => q.question_type === 'assertion_reason');
  const liveDiagrams = liveNeural.filter(q => !!q.image_url);

  console.log(`Live Total Questions: ${liveNeural.length}`);
  console.log(`  - MCQs: ${liveMCQs.length} (Target: 139)`);
  console.log(`  - Assertion-Reason: ${liveARs.length} (Target: 18)`);
  console.log(`  - Questions with Diagram: ${liveDiagrams.length}`);

  console.log('\n--- 3. STATUS CHECKS ---');
  const localOk = localMCQs.length === 139 && localARs.length === 18 && localQuestions.length === 157;
  const liveOk = liveMCQs.length === 139 && liveARs.length === 18 && liveNeural.length === 157;

  console.log(`Local Neon DB Check: ${localOk ? '✅ PASSED (139 MCQs + 18 ARs = 157 Total)' : '❌ FAILED'}`);
  console.log(`Live API Check:     ${liveOk ? '✅ PASSED (139 MCQs + 18 ARs = 157 Total)' : '❌ FAILED'}`);

  if (localOk && liveOk) {
    console.log('\n🎉 ALL CHECKS PASSED PERFECTLY!');
  } else {
    console.log('\n⚠️ Counts do not match expected totals!');
    process.exit(1);
  }
}

verify().catch(console.error);

