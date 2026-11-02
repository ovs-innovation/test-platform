import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';
import { PLANT_GROWTH_MCQ_BATCH1 } from './plant_growth_mcq_batch1.mjs';
import { PLANT_GROWTH_MCQ_BATCH2 } from './plant_growth_mcq_batch2.mjs';
import { PLANT_GROWTH_MCQ_BATCH3 } from './plant_growth_mcq_batch3.mjs';
import { PLANT_GROWTH_AR_BATCH } from './plant_growth_ar_batch.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 15;  // Botany
const LOCAL_CHAPTER_ID = 169; // Plant Growth and Development

const LIVE_SUBJECT_ID = 10;   // Botany
const LIVE_CHAPTER_ID = 255;  // Plant Growth and Development

const CHAPTER_NAME = 'Plant Growth and Development';
const CATEGORY_NAME = 'Botany';

const RAW_QUESTIONS = [
  ...PLANT_GROWTH_MCQ_BATCH1,
  ...PLANT_GROWTH_MCQ_BATCH2,
  ...PLANT_GROWTH_MCQ_BATCH3,
  ...PLANT_GROWTH_AR_BATCH
];

const ALL_QUESTIONS = RAW_QUESTIONS.map(q => {
  const options = (q.options || []).map(o => (typeof o === 'string' ? o : o.text));
  const correct_index = typeof q.correct_index === 'number'
    ? q.correct_index
    : (parseInt(q.correct_answer, 10) - 1);

  return {
    question_text: q.question_text,
    options,
    correct_index,
    solution: q.solution || q.explanation || '',
    image_url: q.image_url || null,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: q.topic || CHAPTER_NAME,
    question_type: q.question_type || 'mcq',
    marks: q.marks || 4,
    difficulty: q.difficulty || 'medium',
    status: 'available'
  };
});

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .trim();
}

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function run() {
  console.log(`\n==================================================`);
  console.log(`🚀 IMPORTING ALL 58 QUESTIONS FOR "${CHAPTER_NAME}"`);
  console.log(`MCQs: 44 | Assertion-Reason: 14 | Total: ${ALL_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  // --- 1. LOCAL NEON DB IMPORT ---
  console.log('--- Step 1: Importing to Local Neon Database ---');

  const existingLocalRes = await query(
    "SELECT id, question_text, question_type FROM question_bank WHERE category = $1 AND chapter = $2",
    [CATEGORY_NAME, CHAPTER_NAME]
  );
  const existingLocalQuestions = existingLocalRes.rows;
  console.log(`Found ${existingLocalQuestions.length} existing questions in Local Neon DB for "${CHAPTER_NAME}".`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLocalQuestions.some(row => normalizeText(row.question_text) === qNorm);

    if (exists) {
      localSkipped++;
      continue;
    }

    await query(
      `INSERT INTO question_bank (
        category, subject, chapter, topic, question_text, question_type,
        options, correct_index, solution, marks, difficulty, image_url, status,
        subject_id, chapter_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
      [
        q.category,
        q.subject,
        q.chapter,
        q.topic,
        q.question_text,
        q.question_type,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.marks,
        q.difficulty,
        q.image_url,
        q.status,
        LOCAL_SUBJECT_ID,
        LOCAL_CHAPTER_ID
      ]
    );
    localInserted++;
  }

  console.log(`Local Neon DB: Inserted ${localInserted}, Skipped ${localSkipped}. Total now: ${existingLocalQuestions.length + localInserted}`);

  // --- 2. LIVE PRODUCTION IMPORT ---
  console.log('\n--- Step 2: Importing to Live Production API ---');
  let token;
  try {
    token = await getLiveToken();
  } catch (err) {
    console.error('Failed to get live token:', err.message);
    return;
  }

  if (!token) {
    console.error('No token received from Live API!');
    return;
  }
  console.log('Successfully authenticated with Live API.');

  // Fetch existing questions on live to avoid duplication
  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveBotanyQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLivePGD = allLiveBotanyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('plant growth'))
  );
  console.log(`Found ${existingLivePGD.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLivePGD.some(row => normalizeText(row.question_text) === qNorm);

    if (exists) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: q.category,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      marks: q.marks,
      difficulty: q.difficulty,
      image_url: q.image_url,
      status: q.status,
      subject_id: LIVE_SUBJECT_ID,
      chapter_id: LIVE_CHAPTER_ID
    };

    try {
      const res = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        liveInserted++;
        if ((i + 1) % 15 === 0 || i === ALL_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${ALL_QUESTIONS.length} processed (${liveInserted} inserted)`);
        }
      } else {
        const errText = await res.text();
        console.error(`Live insert failed for Q#${i + 1}: ${res.status} - ${errText}`);
        liveFailed++;
      }
    } catch (e) {
      console.error(`Live insert network error for Q#${i + 1}:`, e.message);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // --- 3. FINAL VERIFICATION ---
  console.log('\n--- Step 3: Verification of Final Counts ---');
  const verifyLocal = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE category = 'Botany' AND chapter = $1 GROUP BY question_type",
    [CHAPTER_NAME]
  );
  console.log('Local Neon DB Breakdown:');
  verifyLocal.rows.forEach(r => console.log(`  - ${r.question_type}: ${r.count}`));

  const verifyLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyLiveData = await verifyLiveRes.json();
  const verifyLiveList = (verifyLiveData.questions || verifyLiveData.data || []).filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('plant growth'))
  );
  const liveMcqs = verifyLiveList.filter(q => q.question_type === 'mcq').length;
  const liveAr = verifyLiveList.filter(q => q.question_type === 'assertion_reason').length;
  console.log(`Live Production Breakdown: Total: ${verifyLiveList.length} (MCQs: ${liveMcqs}, Assertion-Reason: ${liveAr})`);

  console.log('\n🎉 ALL DONE! Plant Growth and Development chapter is fully populated on both Local and Live.');
}

run().catch(console.error).finally(() => process.exit(0));

