import { query } from '../src/config/db.js';
import { batch6Questions } from './data/cell_batch6.mjs';
import { batch7Questions } from './data/cell_batch7.mjs';
import { batch8Questions } from './data/cell_batch8.mjs';
import { cellBatchAR } from './data/cell_batch_ar.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 15;  // Botany
const LOCAL_CHAPTER_ID = 170; // Cell: The Unit of Life

const LIVE_SUBJECT_ID = 10;   // Botany
const LIVE_CHAPTER_ID = 257;  // Cell: The Unit of Life

const CHAPTER_NAME = 'Cell: The Unit of Life';
const CATEGORY_NAME = 'Botany';

const OPTION_MAP = { A: 0, B: 1, C: 2, D: 3 };

const MCQ_RAW = [
  ...batch6Questions,
  ...batch7Questions,
  ...batch8Questions
];

const MCQ_FORMATTED = MCQ_RAW.map(q => {
  const options = [q.option_a, q.option_b, q.option_c, q.option_d];
  const correct_index = OPTION_MAP[q.correct_option.toUpperCase()] ?? 0;

  return {
    question_text: q.question_text,
    options,
    correct_index,
    solution: q.explanation || '',
    image_url: q.image_url || null,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    question_type: 'mcq',
    marks: q.marks || 4,
    difficulty: q.difficulty || 'medium',
    status: 'available'
  };
});

const AR_FORMATTED = cellBatchAR.map(q => {
  return {
    question_text: q.question_text,
    options: q.options,
    correct_index: q.correct_option,
    solution: q.solution || '',
    image_url: null,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    question_type: 'assertion_reason',
    marks: q.marks || 4,
    difficulty: 'medium',
    status: 'available'
  };
});

const ALL_NEW_QUESTIONS = [
  ...MCQ_FORMATTED,
  ...AR_FORMATTED
];

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
  console.log(`🚀 IMPORTING TURN 2 QUESTIONS FOR "${CHAPTER_NAME}"`);
  console.log(`MCQs: ${MCQ_FORMATTED.length} (Batch 6: ${batch6Questions.length}, Batch 7: ${batch7Questions.length}, Batch 8: ${batch8Questions.length})`);
  console.log(`Assertion-Reason: ${AR_FORMATTED.length} questions`);
  console.log(`Total to Process: ${ALL_NEW_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  // --- 1. LOCAL NEON DB IMPORT ---
  console.log('--- Step 1: Importing to Local Neon Database ---');

  const existingLocalRes = await query(
    "SELECT id, question_text, question_type FROM question_bank WHERE category = $1 AND (chapter = $2 OR chapter_id = $3)",
    [CATEGORY_NAME, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const existingLocalQuestions = existingLocalRes.rows;
  console.log(`Found ${existingLocalQuestions.length} existing questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < ALL_NEW_QUESTIONS.length; i++) {
    const q = ALL_NEW_QUESTIONS[i];
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

  // Count local AR vs MCQ
  const localTypeCountRes = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE category = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [CATEGORY_NAME, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  console.log('Local DB Breakdown:', localTypeCountRes.rows);

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

  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveBotanyQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveCell = allLiveBotanyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('unit of life'))
  );
  console.log(`Found ${existingLiveCell.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_NEW_QUESTIONS.length; i++) {
    const q = ALL_NEW_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLiveCell.some(row => normalizeText(row.question_text) === qNorm);

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
        if ((i + 1) % 10 === 0 || i === ALL_NEW_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${ALL_NEW_QUESTIONS.length} processed (${liveInserted} inserted)`);
        }
      } else {
        const errText = await res.text();
        console.error(`Failed to insert question ${i + 1} (${q.question_type}) on Live: ${res.status} ${errText}`);
        liveFailed++;
      }
    } catch (err) {
      console.error(`Network error on question ${i + 1}: ${err.message}`);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // Verify Live
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const cellLiveQuestions = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('unit of life'))
  );

  const mcqLive = cellLiveQuestions.filter(q => q.question_type === 'mcq' || !q.question_type);
  const arLive = cellLiveQuestions.filter(q => q.question_type === 'assertion_reason');

  console.log(`\n🎉 Verification on Live:`);
  console.log(`Total "${CHAPTER_NAME}" questions on Live: ${cellLiveQuestions.length}`);
  console.log(`MCQs: ${mcqLive.length}`);
  console.log(`Assertion-Reason: ${arLive.length}`);
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

