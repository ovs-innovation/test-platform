import { query } from '../src/config/db.js';
import { batch1Questions } from './data/cell_cycle_batch1.mjs';
import { batch2Questions } from './data/cell_cycle_batch2.mjs';
import { batch3Questions } from './data/cell_cycle_batch3.mjs';
import { batch4Questions } from './data/cell_cycle_batch4.mjs';
import { batch5Questions } from './data/cell_cycle_batch5.mjs';
import { batch6Questions } from './data/cell_cycle_batch6.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 15;  // Botany
const LOCAL_CHAPTER_ID = 171; // Cell Cycle and Cell Division

const LIVE_SUBJECT_ID = 10;   // Botany
const LIVE_CHAPTER_ID = 259;  // Cell Cycle and Cell Division

const CHAPTER_NAME = 'Cell Cycle and Cell Division';
const CATEGORY_NAME = 'Botany';

const OPTION_MAP = { A: 0, B: 1, C: 2, D: 3 };

const RAW_QUESTIONS = [
  ...batch1Questions,
  ...batch2Questions,
  ...batch3Questions,
  ...batch4Questions,
  ...batch5Questions,
  ...batch6Questions
];

const ALL_QUESTIONS = RAW_QUESTIONS.map(q => {
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
  console.log(`🚀 IMPORTING ALL ${ALL_QUESTIONS.length} QUESTIONS FOR "${CHAPTER_NAME}"`);
  console.log(`Batch 1: ${batch1Questions.length} | Batch 2: ${batch2Questions.length} | Batch 3: ${batch3Questions.length}`);
  console.log(`Batch 4: ${batch4Questions.length} | Batch 5: ${batch5Questions.length} | Batch 6: ${batch6Questions.length}`);
  console.log(`==================================================\n`);

  // --- 1. LOCAL NEON DB IMPORT ---
  console.log('--- Step 1: Importing to Local Neon Database ---');

  const existingLocalRes = await query(
    "SELECT id, question_text, question_type FROM question_bank WHERE category = $1 AND (chapter = $2 OR chapter_id = $3)",
    [CATEGORY_NAME, CHAPTER_NAME, LOCAL_CHAPTER_ID]
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

  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveBotanyQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveCellCycle = allLiveBotanyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('cell cycle'))
  );
  console.log(`Found ${existingLiveCellCycle.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const qNorm = normalizeText(q.question_text);
    const exists = existingLiveCellCycle.some(row => normalizeText(row.question_text) === qNorm);

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
        if ((i + 1) % 25 === 0 || i === ALL_QUESTIONS.length - 1) {
          console.log(`Live Progress: ${i + 1}/${ALL_QUESTIONS.length} processed (${liveInserted} inserted)`);
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

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // --- 3. FINAL VERIFICATION ---
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('cell cycle'))
  );

  const imagesLive = finalLive.filter(q => q.image_url && q.image_url.trim() !== '');

  console.log(`\n🎉 Verification on Live Production:`);
  console.log(`Total "${CHAPTER_NAME}" questions on Live: ${finalLive.length}`);
  console.log(`Questions with diagram images: ${imagesLive.length}`);
  imagesLive.forEach(q => {
    console.log(`  - ID: ${q.id}, Image: ${q.image_url}`);
  });
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

