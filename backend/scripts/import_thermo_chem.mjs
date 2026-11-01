import { query } from '../src/config/db.js';
import { THERMO_MCQ_BATCH1 } from './thermo_chem_mcq_batch1.mjs';
import { THERMO_MCQ_BATCH2 } from './thermo_chem_mcq_batch2.mjs';
import { THERMO_MCQ_BATCH3 } from './thermo_chem_mcq_batch3.mjs';
import { THERMO_MCQ_BATCH4 } from './thermo_chem_mcq_batch4.mjs';
import { THERMO_AR_BATCH } from './thermo_chem_ar_batch.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 10; // Chemistry
const LOCAL_CHAPTER_ID = 22; // Thermodynamics

const LIVE_SUBJECT_ID = 6;   // Chemistry
const LIVE_CHAPTER_ID = 246; // Thermodynamics

const CHAPTER_NAME = 'Thermodynamics';
const CATEGORY_NAME = 'Chemistry';

const ALL_QUESTIONS = [
  ...THERMO_MCQ_BATCH1,
  ...THERMO_MCQ_BATCH2,
  ...THERMO_MCQ_BATCH3,
  ...THERMO_MCQ_BATCH4,
  ...THERMO_AR_BATCH
];

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

function normalizeText(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log(`=== Starting Import of ${ALL_QUESTIONS.length} Thermodynamics (Chemistry) Questions ===\n`);

  // -------------------------------------------------------------
  // 1. LOCAL NEON DB IMPORT
  // -------------------------------------------------------------
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  
  const existingLocalRes = await query(
    "SELECT id, question_text, chapter FROM question_bank WHERE category = $1 AND chapter = $2",
    [CATEGORY_NAME, CHAPTER_NAME]
  );
  const localList = existingLocalRes.rows;
  console.log(`Found ${localList.length} existing "${CHAPTER_NAME}" questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of ALL_QUESTIONS) {
    const qNorm = normalizeText(q.question_text);
    const match = localList.find(lq => normalizeText(lq.question_text) === qNorm);

    if (match) {
      localSkipped++;
      continue;
    }

    await query(
      `INSERT INTO question_bank (
        category, subject, chapter, chapter_id, subject_id,
        question_text, options, correct_index, solution, image_url,
        topic, difficulty, marks, question_type, status
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15
      )`,
      [
        CATEGORY_NAME,
        CATEGORY_NAME,
        CHAPTER_NAME,
        LOCAL_CHAPTER_ID,
        LOCAL_SUBJECT_ID,
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        q.solution,
        q.image_url || null,
        q.topic || 'Thermodynamics',
        q.difficulty || 'medium',
        q.marks || 4,
        q.question_type || 'single_choice',
        'available'
      ]
    );
    localInserted++;
  }
  console.log(`Local DB completed: ${localInserted} inserted, ${localSkipped} skipped (already present).\n`);

  // -------------------------------------------------------------
  // 2. LIVE PRODUCTION IMPORT
  // -------------------------------------------------------------
  console.log('--- 2. Syncing to Live Production (https://edvedum.com) ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained Live auth token.');

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=${CATEGORY_NAME}&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  console.log(`Found ${liveList.length} total existing ${CATEGORY_NAME} questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveErrors = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);

    // Exact text match for deduplication
    const isDup = liveList.some(lq => {
      const lNorm = normalizeText(lq.question_text || '');
      return lNorm === qNorm;
    });

    if (isDup) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: CATEGORY_NAME,
      subject: CATEGORY_NAME,
      subject_id: LIVE_SUBJECT_ID,
      chapter: CHAPTER_NAME,
      chapter_id: LIVE_CHAPTER_ID,
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url || null,
      topic: q.topic || 'Thermodynamics',
      difficulty: q.difficulty || 'medium',
      marks: q.marks || 4,
      question_type: q.question_type || 'single_choice',
      status: 'available'
    };

    try {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!postRes.ok) {
        const errText = await postRes.text();
        console.error(`[Error] Q#${q.question_number || i + 1}: ${postRes.status} - ${errText}`);
        liveErrors++;
      } else {
        liveInserted++;
        if (liveInserted % 20 === 0 || liveInserted === ALL_QUESTIONS.length) {
          console.log(`Live sync progress: ${liveInserted} questions inserted...`);
        }
      }
    } catch (err) {
      console.error(`[Exception] Q#${q.question_number || i + 1}: ${err.message}`);
      liveErrors++;
    }
  }

  console.log(`\nLive Production completed: ${liveInserted} inserted, ${liveSkipped} skipped, ${liveErrors} errors.`);
  console.log('\n=== All Operations Finished ===');
}

run().catch(console.error);

