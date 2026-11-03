import { query } from '../src/config/db.js';
import { neuralBatchMissing1 } from './data/neural_control_batch_missing1.mjs';
import { neuralBatchMissing2 } from './data/neural_control_batch_missing2.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 13;  // Zoology
const LOCAL_CHAPTER_ID = 174; // Neural Control and Coordination

const LIVE_SUBJECT_ID = 2;    // Zoology
const LIVE_CHAPTER_ID = 4;    // Neural Control & Coordination

const CHAPTER_NAME = 'Neural Control and Coordination';
const CATEGORY_NAME = 'Zoology';

const MISSING_QUESTIONS = [
  ...neuralBatchMissing1,
  ...neuralBatchMissing2
].map(q => ({
  question_text: q.question_text,
  options: q.options || [q.option_1, q.option_2, q.option_3, q.option_4],
  correct_index: q.correct_index,
  solution: q.explanation || q.solution || '',
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
  console.log(`🚀 IMPORTING MISSING 45 QUESTIONS (Q46-Q90)`);
  console.log(`Subject: ${CATEGORY_NAME}`);
  console.log(`Chapter: ${CHAPTER_NAME}`);
  console.log(`Questions to Import: ${MISSING_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  // --- STEP 1: LOCAL NEON DATABASE ---
  console.log('--- Step 1: Importing to Local Neon Database ---');
  const existingLocalRes = await query(
    "SELECT id, question_text, question_type FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const existingLocalQuestions = existingLocalRes.rows;
  console.log(`Existing in Local DB: ${existingLocalQuestions.length}`);

  let localInserted = 0;
  let localSkipped = 0;

  for (let i = 0; i < MISSING_QUESTIONS.length; i++) {
    const q = MISSING_QUESTIONS[i];
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

  console.log(`Local DB: Inserted ${localInserted}, Skipped ${localSkipped}`);

  const localCounts = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  console.log('Local DB Summary:');
  localCounts.rows.forEach(r => console.log(`  - ${r.question_type}: ${r.count}`));
  const localTotal = localCounts.rows.reduce((acc, r) => acc + parseInt(r.count, 10), 0);
  console.log(`  - TOTAL: ${localTotal}`);

  // --- STEP 2: LIVE PRODUCTION API ---
  console.log('\n--- Step 2: Importing to Live Production API ---');
  let token;
  try {
    token = await getLiveToken();
  } catch (err) {
    console.error('Failed to authenticate with Live API:', err.message);
    return;
  }

  if (!token) {
    console.error('No token received from Live API!');
    return;
  }
  console.log('Successfully authenticated with Live API.');

  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveZoologyQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveNeural = allLiveZoologyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('neural'))
  );
  console.log(`Existing in Live API: ${existingLiveNeural.length}`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < MISSING_QUESTIONS.length; i++) {
    const q = MISSING_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLiveNeural.some(row => normalizeText(row.question_text) === qNorm);

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
        if ((i + 1) % 10 === 0 || i === MISSING_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${MISSING_QUESTIONS.length} processed (${liveInserted} inserted)`);
        }
      } else {
        const errText = await res.text();
        console.error(`Failed to insert question ${i + 1} on Live: ${res.status} ${errText}`);
        liveFailed++;
      }
    } catch (err) {
      console.error(`Network error on question ${i + 1}: ${err.message}`);
      liveFailed++;
    }
  }

  console.log(`\nLive API: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}`);

  // --- STEP 3: FINAL VERIFICATION ---
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('neural'))
  );

  const liveMCQs = finalLive.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = finalLive.filter(q => q.question_type === 'assertion_reason');

  console.log('\n==================================================');
  console.log(`🎯 FINAL VERIFICATION REPORT:`);
  console.log(`LOCAL NEON DB:`);
  console.log(`  - Total: ${localTotal}`);
  console.log(`LIVE PRODUCTION API:`);
  console.log(`  - MCQs: ${liveMCQs.length}`);
  console.log(`  - ARs: ${liveARs.length}`);
  console.log(`  - Total: ${finalLive.length}`);
  console.log(`==================================================\n`);
}

run().catch(console.error);
