import { query } from '../src/config/db.js';
import { REDOX_MCQ_BATCH1 } from './redox_chem_mcq_batch1.mjs';
import { REDOX_MCQ_BATCH2 } from './redox_chem_mcq_batch2.mjs';
import { REDOX_MCQ_BATCH3 } from './redox_chem_mcq_batch3.mjs';
import { REDOX_MCQ_BATCH4 } from './redox_chem_mcq_batch4.mjs';
import { REDOX_AR_BATCH } from './redox_chem_ar_batch.mjs';

const LIVE_API = 'https://edvedum.com/api';
const LIVE_CREDS = {
  email: 'admin@edvedum.com',
  password: 'Admin@12345'
};

const ALL_QUESTIONS = [
  ...REDOX_MCQ_BATCH1,
  ...REDOX_MCQ_BATCH2,
  ...REDOX_MCQ_BATCH3,
  ...REDOX_MCQ_BATCH4,
  ...REDOX_AR_BATCH
];

function normalizeText(str) {
  return (str || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

async function verify() {
  console.log('=== Verifying Redox Reactions Import ===');
  console.log(`Total questions in dataset: ${ALL_QUESTIONS.length}`);

  // 1. Local Neon DB Check
  console.log('\n--- 1. Local Neon DB Status ---');
  try {
    const localRes = await query(`
      SELECT 
        question_type,
        marks,
        COUNT(*) as count
      FROM question_bank
      WHERE chapter_id = 128 OR chapter ILIKE 'Redox Reactions'
      GROUP BY question_type, marks
      ORDER BY question_type
    `);
    console.table(localRes.rows);

    const totalLocal = await query(`
      SELECT COUNT(*) as total FROM question_bank
      WHERE chapter_id = 128 OR chapter ILIKE 'Redox Reactions'
    `);
    console.log(`Total Redox Reactions questions in Local DB: ${totalLocal.rows[0].total}`);
  } catch (err) {
    console.error('Local DB check error:', err.message);
  }

  // 2. Live Production Check
  console.log('\n--- 2. Live Production Status ---');
  try {
    const authRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(LIVE_CREDS)
    });
    const authData = await authRes.json();
    const token = authData.data?.token || authData.token;
    if (!token) throw new Error('Could not authenticate with Live API');

    const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=4000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveData = await liveRes.json();
    const allLive = liveData.data?.questions || liveData.questions || [];

    // Filter by chapter_id == 185 or chapter == 'Redox Reactions'
    const redoxLive = allLive.filter(q => 
      Number(q.chapter_id) === 185 || 
      (q.chapter && q.chapter.toLowerCase() === 'redox reactions')
    );

    console.log(`Total Redox Reactions questions on Live Production: ${redoxLive.length}`);

    const typeCounts = {};
    const marksCounts = {};
    for (const q of redoxLive) {
      typeCounts[q.question_type] = (typeCounts[q.question_type] || 0) + 1;
      marksCounts[q.marks] = (marksCounts[q.marks] || 0) + 1;
    }
    console.log('Live question types breakdown:', typeCounts);
    console.log('Live marks breakdown:', marksCounts);

    // Check which of ALL_QUESTIONS was already present or matched
    console.log('\nChecking deduplication match across all 119 questions:');
    for (let i = 0; i < ALL_QUESTIONS.length; i++) {
      const q = ALL_QUESTIONS[i];
      const normQ = normalizeText(q.question_text);
      const matches = allLive.filter(lq => normalizeText(lq.question_text) === normQ);
      if (matches.length > 1 || (matches.length === 1 && Number(matches[0].chapter_id) !== 185)) {
        console.log(`Notice for Q${i + 1} (${q.question_type}): matched in chapter_id: ${matches.map(m => m.chapter_id + ' - ' + m.chapter).join(', ')}`);
      }
    }

  } catch (err) {
    console.error('Live check error:', err.message);
  }
}

verify();
