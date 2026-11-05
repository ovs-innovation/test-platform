import { query } from '../src/config/db.js';
import { ellipseBatch1 } from './data/ellipse_batch1.mjs';
import { ellipseBatch2 } from './data/ellipse_batch2.mjs';
import { ellipseBatch3 } from './data/ellipse_batch3.mjs';
import { ellipseBatch4 } from './data/ellipse_batch4.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 21;  // Mathematics
const LOCAL_CHAPTER_ID = 187; // Ellipse

const LIVE_SUBJECT_ID = 7;    // Mathematics
const LIVE_CHAPTER_ID = 171;  // Ellipse

const CHAPTER_NAME = 'Ellipse';
const CATEGORY_NAME = 'Mathematics';

const rawQuestions = [
  ...ellipseBatch1,
  ...ellipseBatch2,
  ...ellipseBatch3,
  ...ellipseBatch4
];

const optionKeyToIndex = { A: 0, B: 1, C: 2, D: 3 };

const ALL_QUESTIONS = rawQuestions.map(q => {
  const isInteger = (q.type === 'integer' || q.type === 'numeric' || q.type === 'numerical' || q.question_type === 'integer' || q.question_type === 'numerical' || (!q.options || q.options.length === 0));
  const questionType = isInteger ? 'integer' : 'mcq';
  const correctIndex = isInteger ? null : (q.correct_index !== undefined && q.correct_index !== null ? q.correct_index : optionKeyToIndex[q.correct_option]);
  const numericAnswer = isInteger ? (q.numeric_answer !== undefined && q.numeric_answer !== null ? String(q.numeric_answer) : String(q.correct_value || '')) : null;

  return {
    question_number: q.question_number,
    question_text: q.question_text,
    options: isInteger ? [] : q.options,
    correct_index: correctIndex,
    numeric_answer: numericAnswer,
    solution: q.solution_text || q.solution || '',
    image_url: null,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: q.topic || CHAPTER_NAME,
    question_type: questionType,
    marks: 4,
    difficulty: (q.difficulty || 'medium').toLowerCase(),
    status: 'available'
  };
});

function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .trim();
}

function getDedupKey(q) {
  const qText = normalizeText(q.question_text);
  let opt0 = '';
  if (Array.isArray(q.options) && q.options.length > 0) {
    const first = q.options[0];
    opt0 = typeof first === 'string' ? normalizeText(first) : (first?.option_text ? normalizeText(first.option_text) : (first?.text ? normalizeText(first.text) : ''));
  }
  return `${qText}:::${opt0}`;
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
  console.log(`IMPORTING ALL QUESTIONS FOR "${CATEGORY_NAME} > ${CHAPTER_NAME}"`);
  console.log(`Total Questions to Import: ${ALL_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  if (ALL_QUESTIONS.length !== 134) {
    throw new Error(`Expected exactly 134 questions, but have ${ALL_QUESTIONS.length}`);
  }

  // --- Step 1: LOCAL NEON DATABASE IMPORT ---
  console.log('--- Step 1: Importing to Local Neon Database ---');
  const existingLocalRes = await query(
    "SELECT id, question_text, options, question_type FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const existingLocalQuestions = existingLocalRes.rows.map(row => {
    let opts = [];
    try {
      opts = typeof row.options === 'string' ? JSON.parse(row.options) : (row.options || []);
    } catch {
      opts = [];
    }
    return { ...row, options: opts };
  });

  const existingLocalMap = new Map();
  existingLocalQuestions.forEach(row => {
    existingLocalMap.set(getDedupKey(row), row.id);
  });
  console.log(`Found ${existingLocalQuestions.length} existing "${CHAPTER_NAME}" questions in Local DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of ALL_QUESTIONS) {
    const key = getDedupKey(q);
    if (existingLocalMap.has(key)) {
      localSkipped++;
      continue;
    }

    await query(
      `INSERT INTO question_bank 
      (question_text, options, correct_index, numeric_answer, solution, image_url, category, subject, chapter, topic, question_type, marks, difficulty, status, subject_id, chapter_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.numeric_answer,
        q.solution,
        q.image_url,
        q.category,
        q.subject,
        q.chapter,
        q.topic,
        q.question_type,
        q.marks,
        q.difficulty,
        q.status,
        LOCAL_SUBJECT_ID,
        LOCAL_CHAPTER_ID
      ]
    );
    localInserted++;
  }

  console.log(`Local DB Import Finished: ${localInserted} inserted, ${localSkipped} skipped.`);
  const verifyLocal = await query(
    "SELECT COUNT(*) as count FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  console.log(`Total questions in Local DB for "${CHAPTER_NAME}": ${verifyLocal.rows[0].count}`);

  // --- Step 2: LIVE PRODUCTION API IMPORT ---
  console.log('\n--- Step 2: Importing to Live Production API ---');
  const token = await getLiveToken();
  if (!token) throw new Error('Failed to obtain token from Live API');

  // Fetch existing questions on Live API for this chapter
  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveMathQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveEllipse = allLiveMathQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );
  console.log(`Found ${existingLiveEllipse.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const key = getDedupKey(q);
    const exists = existingLiveEllipse.some(row => getDedupKey(row) === key);

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
      numeric_answer: q.numeric_answer,
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
        if ((i + 1) % 25 === 0 || i === ALL_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${ALL_QUESTIONS.length} processed (${liveInserted} inserted)`);
        }
      } else {
        const errText = await res.text();
        console.error(`Failed to insert question ${i + 1} (Q#${q.question_number}) on Live: ${res.status} ${errText}`);
        liveFailed++;
      }
    } catch (err) {
      console.error(`Network error on question ${i + 1}: ${err.message}`);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // Final Live API verification
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase() === CHAPTER_NAME.toLowerCase())
  );

  console.log(`\n==================================================`);
  console.log(`FINAL SYNC SUMMARY FOR "${CHAPTER_NAME}":`);
  console.log(`Local Neon DB Count: ${verifyLocal.rows[0].count} / 134`);
  console.log(`Live Production Count: ${finalLive.length} (expected 136 = 134 + 2 previous)`);
  console.log(`==================================================\n`);

  if (Number(verifyLocal.rows[0].count) === 134 && finalLive.length >= 134) {
    console.log('ALL 134 QUESTIONS SUCCESSFULLY IMPORTED AND VERIFIED ON BOTH ENVIRONMENTS!');
  } else {
    console.error(`Count check warning! Local: ${verifyLocal.rows[0].count}, Live: ${finalLive.length}`);
  }
}

run().catch(err => {
  console.error('Fatal import error:', err);
  process.exit(1);
});

