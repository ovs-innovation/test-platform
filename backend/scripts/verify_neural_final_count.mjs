import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_SUBJECT_ID = 13;
const LOCAL_CHAPTER_ID = 174;
const LIVE_CHAPTER_ID = 4;
const CHAPTER_NAME = 'Neural Control and Coordination';

async function main() {
  console.log('=== VERIFYING FINAL COUNTS ===');

  // 1. Local DB
  const localRes = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  console.log('\n[Local Neon DB Breakdown]:', localRes.rows);

  // 2. Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allZoology = liveData.questions || liveData.data || [];
  const liveNeural = allZoology.filter(
    q => q.chapter_id === LIVE_CHAPTER_ID || (q.chapter && q.chapter.toLowerCase().includes('neural'))
  );

  const liveMCQs = liveNeural.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = liveNeural.filter(q => q.question_type === 'assertion_reason');

  console.log('\n[Live Production API Breakdown]:');
  console.log(`Total Neural Questions: ${liveNeural.length}`);
  console.log(`MCQs on Live: ${liveMCQs.length}`);
  console.log(`AR on Live: ${liveARs.length}`);

  // Diagrams verification
  const withDiagrams = liveNeural.filter(q => q.image_url && q.image_url.includes('cloudinary'));
  console.log(`Questions with Cloudinary Diagrams on Live: ${withDiagrams.length}`);
}

main().catch(console.error);

