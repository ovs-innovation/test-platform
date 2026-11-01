import { query } from '../src/config/db.js';
import { QUADRATIC_QUESTIONS } from './quadratic_questions_data.mjs';

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

function cleanStr(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log(`Checking ${QUADRATIC_QUESTIONS.length} Quadratic Questions for duplicates...\n`);

  // 1. Neon DB
  const localRes = await query("SELECT id, chapter, question_text FROM question_bank WHERE category = 'Mathematics'");
  const localList = localRes.rows;
  console.log(`Local Neon DB Mathematics questions count: ${localList.length}`);

  let localMatches = 0;
  for (const q of QUADRATIC_QUESTIONS) {
    const qClean = cleanStr(q.question_text.slice(0, 30));
    const match = localList.find(lq => cleanStr(lq.question_text || '').includes(qClean));
    if (match) {
      console.log(`Q${q.question_number} matched Local ID [${match.id}] ("${match.chapter}"): ${match.question_text.slice(0, 60)}...`);
      localMatches++;
    }
  }
  console.log(`Local Neon DB matches: ${localMatches}`);

  // 2. Live Production
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  console.log(`Live Production Mathematics questions count: ${liveList.length}`);

  let liveMatches = 0;
  for (const q of QUADRATIC_QUESTIONS) {
    const qClean = cleanStr(q.question_text.slice(0, 30));
    const match = liveList.find(lq => cleanStr(lq.question_text || '').includes(qClean));
    if (match) {
      console.log(`Q${q.question_number} matched Live ID [${match.id}] ("${match.chapter}"): ${match.question_text.slice(0, 60)}...`);
      liveMatches++;
    }
  }
  console.log(`Live Production matches: ${liveMatches}`);
}

run().catch(console.error);
