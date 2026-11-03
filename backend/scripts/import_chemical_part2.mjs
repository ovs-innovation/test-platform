import { query } from '../src/config/db.js';
import { chemicalBatch6MCQ } from './data/chemical_batch6_mcqs.mjs';
import { chemicalBatchAR } from './data/chemical_batch_ar.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 13;  // Zoology
const LOCAL_CHAPTER_ID = 175; // Chemical Coordination and Integration

const LIVE_SUBJECT_ID = 2;    // Zoology
const LIVE_CHAPTER_ID = 271;  // Chemical Coordination and Integration

const CHAPTER_NAME = 'Chemical Coordination and Integration';
const CATEGORY_NAME = 'Zoology';

const ALL_MCQS = chemicalBatch6MCQ.map(q => ({
  question_text: q.question_text,
  options: q.options,
  correct_index: q.correct_index,
  solution: q.explanation || '',
  image_url: q.diagram_url || null,
  category: CATEGORY_NAME,
  subject: CATEGORY_NAME,
  chapter: CHAPTER_NAME,
  topic: CHAPTER_NAME,
  question_type: 'mcq',
  marks: q.marks || 4,
  difficulty: (q.difficulty || 'medium').toLowerCase(),
  status: 'available'
}));

const ALL_ARS = chemicalBatchAR.map(q => ({
  assertion_text: q.assertion_text,
  reason_text: q.reason_text,
  question_text: q.question_text,
  options: q.options,
  correct_index: q.correct_index,
  solution: q.explanation || '',
  image_url: null,
  category: CATEGORY_NAME,
  subject: CATEGORY_NAME,
  chapter: CHAPTER_NAME,
  topic: CHAPTER_NAME,
  question_type: 'assertion_reason',
  marks: q.marks || 4,
  difficulty: 'medium',
  status: 'available'
}));

const ALL_QUESTIONS = [
  ...ALL_MCQS,
  ...ALL_ARS
];

function normalizeText(text) {
  if (typeof text !== 'string') return '';
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
    opt0 = typeof q.options[0] === 'string' ? q.options[0] : (q.options[0]?.text || '');
  }
  return `${qText}:::${normalizeText(opt0)}`;
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
  console.log(`🚀 IMPORTING CHEMICAL COORDINATION PART 2:`);
  console.log(`MCQs (Q190 to Q218): ${ALL_MCQS.length}`);
  console.log(`Assertion-Reason (Q1 to Q25): ${ALL_ARS.length}`);
  console.log(`Total New Questions: ${ALL_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  // --- Step 1: LOCAL NEON DATABASE IMPORT ---
  console.log('--- Step 1: Importing to Local Neon Database ---');
  const existingLocalRes = await query(
    "SELECT id, question_text, options, question_type FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const existingLocalQuestions = existingLocalRes.rows.map(row => {
    let opts = [];
    try {
      opts = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
    } catch {
      opts = [];
    }
    return { ...row, options: opts };
  });
  console.log(`Found ${existingLocalQuestions.length} existing questions in Local Neon DB for "${CHAPTER_NAME}".`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const key = getDedupKey(q);
    const exists = existingLocalQuestions.some(row => getDedupKey(row) === key);

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

  const localTypeBreakdown = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  console.log('Local DB Breakdown:', localTypeBreakdown.rows);

  // --- Step 2: LIVE PRODUCTION IMPORT ---
  console.log('\n--- Step 2: Importing to Live Production API ---');
  let token;
  try {
    token = await getLiveToken();
  } catch (err) {
    console.error('Failed to get live token:', err.message);
    process.exit(1);
  }

  if (!token) {
    console.error('No token received from Live API!');
    process.exit(1);
  }
  console.log('Successfully authenticated with Live API.');

  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveZoologyQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveChem = allLiveZoologyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('chemical'))
  );
  console.log(`Found ${existingLiveChem.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const key = getDedupKey(q);
    const exists = existingLiveChem.some(row => getDedupKey(row) === key);

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

    if (q.question_type === 'assertion_reason') {
      payload.assertion_text = q.assertion_text;
      payload.reason_text = q.reason_text;
    }

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
        console.error(`Failed to insert question ${i + 1} (${q.question_type}) on Live: ${res.status} ${errText}`);
        liveFailed++;
      }
    } catch (err) {
      console.error(`Network error on question ${i + 1}: ${err.message}`);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // --- Step 3: FINAL LIVE VERIFICATION ---
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('chemical'))
  );

  const liveMCQs = finalLive.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = finalLive.filter(q => q.question_type === 'assertion_reason');

  console.log('\n==================================================');
  console.log(`🎉 FINAL VERIFICATION FOR ZOOLOGY > CHEMICAL COORDINATION AND INTEGRATION:`);
  console.log(`Total on Live: ${finalLive.length}`);
  console.log(`MCQs on Live: ${liveMCQs.length}`);
  console.log(`AR on Live: ${liveARs.length}`);
  console.log(`==================================================\n`);

  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

