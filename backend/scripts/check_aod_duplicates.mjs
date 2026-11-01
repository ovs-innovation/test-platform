import fs from 'fs';
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

function normalizeMath(str) {
  return (str || '')
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

async function checkDuplicates() {
  // Load all 100 questions
  const b1 = JSON.parse(fs.readFileSync('backend/scripts/batch1_qs.json', 'utf8'));
  const b2 = JSON.parse(fs.readFileSync('backend/scripts/batch2_qs.json', 'utf8'));
  const b3 = JSON.parse(fs.readFileSync('backend/scripts/batch3_qs.json', 'utf8'));
  const b4 = JSON.parse(fs.readFileSync('backend/scripts/batch4_qs.json', 'utf8'));
  const b5 = JSON.parse(fs.readFileSync('backend/scripts/batch5_qs.json', 'utf8'));
  const allQs = [...b1, ...b2, ...b3, ...b4, ...b5];

  console.log(`Checking duplicates for ${allQs.length} questions...`);

  // 1. Internal duplicates
  const seen = new Map();
  const internalDupes = [];
  for (const q of allQs) {
    const norm = normalizeMath(q.question);
    if (seen.has(norm)) {
      internalDupes.push({ qNum: q.num, originalNum: seen.get(norm) });
    } else {
      seen.set(norm, q.num);
    }
  }
  console.log(`Internal duplicates in PDF (${internalDupes.length}):`, internalDupes);

  // 2. Duplicates against Local Neon DB
  const localRes = await query(`SELECT id, question_text FROM question_bank WHERE subject_id = 21`);
  const localDupes = [];
  for (const q of allQs) {
    const normQ = normalizeMath(q.question);
    for (const row of localRes.rows) {
      const normRow = normalizeMath(row.question_text);
      if (normQ === normRow || (normQ.length > 30 && normRow.includes(normQ.slice(0, 40)))) {
        localDupes.push({ qNum: q.num, localId: row.id, text: row.question_text.slice(0, 50) });
        break;
      }
    }
  }
  console.log(`Duplicates against Local DB (${localDupes.length}):`, localDupes);

  // 3. Duplicates against Live Production
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQs = liveData.data?.questions || liveData.questions || [];
  const liveDupes = [];
  for (const q of allQs) {
    const normQ = normalizeMath(q.question);
    for (const lq of liveQs) {
      const normLq = normalizeMath(lq.question_text);
      if (normQ === normLq || (normQ.length > 30 && normLq.includes(normQ.slice(0, 40)))) {
        liveDupes.push({ qNum: q.num, liveId: lq.id, text: lq.question_text.slice(0, 50) });
        break;
      }
    }
  }
  console.log(`Duplicates against Live DB (${liveDupes.length}):`, liveDupes);
}

checkDuplicates().catch(console.error);

