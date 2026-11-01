import { query } from '../src/config/db.js';
import { PBLOCK_MCQ_BATCH1 } from './pblock_chem_mcq_batch1.mjs';
import { PBLOCK_MCQ_BATCH2 } from './pblock_chem_mcq_batch2.mjs';
import { PBLOCK_MCQ_BATCH3 } from './pblock_chem_mcq_batch3.mjs';
import { PBLOCK_MCQ_BATCH4 } from './pblock_chem_mcq_batch4.mjs';
import { PBLOCK_AR_BATCH } from './pblock_chem_ar_batch.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 10;  // Chemistry
const LOCAL_CHAPTER_ID = 166; // The p-Block Elements (Gr. 13 & 14)

const LIVE_SUBJECT_ID = 6;    // Chemistry
const LIVE_CHAPTER_ID = 247;  // The p-Block Elements (Gr. 13 & 14)

const CHAPTER_NAME = 'The p-Block Elements (Gr. 13 & 14)';
const CATEGORY_NAME = 'Chemistry';

const ALL_QUESTIONS = [
  ...PBLOCK_MCQ_BATCH1,
  ...PBLOCK_MCQ_BATCH2,
  ...PBLOCK_MCQ_BATCH3,
  ...PBLOCK_MCQ_BATCH4,
  ...PBLOCK_AR_BATCH
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
  console.log(`=== Starting Import of ${ALL_QUESTIONS.length} Questions for "${CHAPTER_NAME}" ===\n`);

  // -------------------------------------------------------------
  // 1. LOCAL NEON DB IMPORT
  // -------------------------------------------------------------
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  
  const existingLocalRes = await query(
    `SELECT id, question_text FROM question_bank WHERE chapter_id = $1 OR chapter = $2`,
    [LOCAL_CHAPTER_ID, CHAPTER_NAME]
  );
  const existingLocal = existingLocalRes.rows;
  console.log(`Found ${existingLocal.length} existing "${CHAPTER_NAME}" questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of ALL_QUESTIONS) {
    const qNorm = normalizeText(q.question_text);
    const exists = existingLocal.some(row => normalizeText(row.question_text) === qNorm);

    if (exists) {
      localSkipped++;
      continue;
    }

    await query(
      `INSERT INTO question_bank (
        category,
        subject,
        chapter,
        chapter_id,
        subject_id,
        question_text,
        options,
        correct_index,
        solution,
        image_url,
        topic,
        difficulty,
        marks,
        question_type,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
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
        q.topic || CHAPTER_NAME,
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

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=${CATEGORY_NAME}&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.data?.questions || liveData.questions || [];
  
  // Filter deduplication specifically for this chapter
  const chapterLive = allLive.filter(lq => 
    Number(lq.chapter_id) === LIVE_CHAPTER_ID ||
    (lq.chapter && lq.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );
  console.log(`Found ${chapterLive.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveErrors = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);

    // Check if already in this chapter
    const isDup = chapterLive.some(lq => normalizeText(lq.question_text || '') === qNorm);

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
      topic: CHAPTER_NAME,
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url || null,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
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
        console.error(`Live POST failed for Q${i + 1}: ${postRes.status} ${errText}`);
        liveErrors++;
      } else {
        liveInserted++;
      }
    } catch (err) {
      console.error(`Network error for Q${i + 1}:`, err.message);
      liveErrors++;
    }

    if ((i + 1) % 20 === 0 || i === ALL_QUESTIONS.length - 1) {
      console.log(`Live sync progress: ${i + 1}/${ALL_QUESTIONS.length} processed (${liveInserted} inserted)...`);
    }

    // Small delay to be gentle with production API
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`\nLive Production completed: ${liveInserted} inserted, ${liveSkipped} skipped, ${liveErrors} errors.`);
  console.log('\n=== All Operations Finished ===');
}

run().then(() => process.exit(0)).catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

