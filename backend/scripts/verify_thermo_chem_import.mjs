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
  console.log('=== VERIFYING THERMODYNAMICS (CHEMISTRY) QUESTIONS ===\n');

  // 1. Local DB verification
  console.log('--- 1. Local Neon DB ---');
  const localRes = await query(`
    SELECT question_type, COUNT(*) as count, AVG(marks) as avg_marks
    FROM question_bank
    WHERE category = 'Chemistry' AND chapter = 'Thermodynamics'
    GROUP BY question_type
  `);
  console.log('Local DB breakdown:');
  console.table(localRes.rows);

  const localImages = await query(`
    SELECT id, question_text, image_url
    FROM question_bank
    WHERE category = 'Chemistry' AND chapter = 'Thermodynamics' AND image_url IS NOT NULL
  `);
  console.log(`Local DB questions with diagrams: ${localImages.rows.length}`);
  localImages.rows.forEach(r => console.log(`  [${r.id}] ${r.image_url}`));

  // 2. Live API verification
  console.log('\n--- 2. Live Production API ---');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&chapter=Thermodynamics&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const questions = liveData.data?.questions || liveData.questions || [];
  
  console.log(`Total Live Thermodynamics questions: ${questions.length}`);
  
  const typeCounts = {};
  let totalMarks = 0;
  let diagramsCount = 0;

  for (const q of questions) {
    typeCounts[q.question_type] = (typeCounts[q.question_type] || 0) + 1;
    totalMarks += Number(q.marks || 0);
    if (q.image_url) diagramsCount++;
  }

  console.log('Live Breakdown by type:', typeCounts);
  console.log(`Average marks: ${(totalMarks / (questions.length || 1)).toFixed(2)}`);
  console.log(`Questions with diagrams on Live: ${diagramsCount}`);
}

verify().catch(console.error);

