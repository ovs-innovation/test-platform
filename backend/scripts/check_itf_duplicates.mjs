import { query } from '../src/config/db.js';
import { ITF_QUESTIONS_PART1 } from './itf_questions_part1_data.mjs';
import { ITF_QUESTIONS_PART2 } from './itf_questions_part2_data.mjs';

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

function normalize(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const allQuestions = [...ITF_QUESTIONS_PART1, ...ITF_QUESTIONS_PART2];

  // 1. Check internal duplicates in PDF
  console.log('--- 1. Checking internal duplicates in the PDF ---');
  const seenInternal = new Map();
  for (const q of allQuestions) {
    const key = normalize(q.question_text).slice(0, 40);
    if (seenInternal.has(key)) {
      console.log(`Internal duplicate found: Q${q.question_number} is similar to Q${seenInternal.get(key)}`);
    } else {
      seenInternal.set(key, q.question_number);
    }
  }

  // 2. Check duplicates against Local Neon DB
  console.log('\n--- 2. Checking duplicates against Local Neon DB ---');
  const localRes = await query("SELECT id, chapter, question_text FROM question_bank WHERE category = 'Mathematics'");
  const localQuestions = localRes.rows;
  console.log(`Total Mathematics questions in Local Neon DB: ${localQuestions.length}`);

  let localDupes = 0;
  for (const q of allQuestions) {
    const norm = normalize(q.question_text).slice(0, 35);
    const match = localQuestions.find(lq => normalize(lq.question_text).includes(norm));
    if (match) {
      console.log(`Q${q.question_number} matches Local Neon ID [${match.id}] ("${match.chapter}"): ${match.question_text.slice(0, 60)}...`);
      localDupes++;
    }
  }
  console.log(`Total matches in Local Neon DB: ${localDupes}`);

  // 3. Check duplicates against Live Production
  console.log('\n--- 3. Checking duplicates against Live Production ---');
  try {
    const token = await getToken();
    const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveData = await liveRes.json();
    const liveQuestions = liveData.data?.questions || liveData.questions || [];
    console.log(`Total Mathematics questions on Live Production: ${liveQuestions.length}`);

    let liveDupes = 0;
    for (const q of allQuestions) {
      const norm = normalize(q.question_text).slice(0, 35);
      const match = liveQuestions.find(lq => normalize(lq.question_text).includes(norm));
      if (match) {
        console.log(`Q${q.question_number} matches Live ID [${match.id}] ("${match.chapter}"): ${match.question_text.slice(0, 60)}...`);
        liveDupes++;
      }
    }
    console.log(`Total matches on Live Production: ${liveDupes}`);
  } catch (err) {
    console.log('Live check error:', err.message);
  }
}

run().catch(console.error);

