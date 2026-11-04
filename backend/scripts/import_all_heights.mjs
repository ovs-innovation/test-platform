import { query } from '../src/config/db.js';
import { heightsBatch1 } from './data/heights_batch1.mjs';
import { heightsBatch2 } from './data/heights_batch2.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 21;  // Mathematics
const LOCAL_CHAPTER_ID = 178; // Heights and Distances

const LIVE_SUBJECT_ID = 7;    // Mathematics
const LIVE_CHAPTER_ID = 252;  // Heights and Distances

const CHAPTER_NAME = 'Heights and Distances';
const CATEGORY_NAME = 'Mathematics';

const ALL_QUESTIONS = [
  ...heightsBatch1,
  ...heightsBatch2
].map(q => ({
  question_number: q.question_number,
  question_text: q.question_text,
  options: q.options || [],
  correct_index: q.correct_index,
  solution: q.solution || '',
  image_url: null,
  category: CATEGORY_NAME,
  subject: CATEGORY_NAME,
  chapter: CHAPTER_NAME,
  topic: CHAPTER_NAME,
  question_type: q.question_type || 'mcq',
  marks: q.marks || 4,
  difficulty: (q.difficulty || 'medium').toLowerCase(),
  status: 'available'
}));

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
    opt0 = typeof first === 'string' ? normalizeText(first) : (first?.text ? normalizeText(first.text) : '');
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
  console.log(`🚀 IMPORTING ALL QUESTIONS FOR "${CATEGORY_NAME} > ${CHAPTER_NAME}"`);
  console.log(`Total Questions to Import: ${ALL_QUESTIONS.length}`);
  console.log(`==================================================\n`);

  if (ALL_QUESTIONS.length !== 45) {
    throw new Error(`Expected exactly 45 questions, but have ${ALL_QUESTIONS.length}`);
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
      opts = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
    } catch {
      opts = [];
    }
    return {
      ...row,
      options: opts
    };
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
  console.log(`Local Neon DB: Inserted ${localInserted}, Skipped ${localSkipped}.`);

  // Verify local count
  const finalLocalRes = await query(
    "SELECT COUNT(*) FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3)",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const localCount = parseInt(finalLocalRes.rows[0].count);
  console.log(`Verified Local Neon DB total for "${CHAPTER_NAME}": ${localCount}`);

  // --- Step 2: LIVE PRODUCTION API IMPORT ---
  console.log('\n--- Step 2: Importing to Live Production API ---');
  const token = await getLiveToken();
  if (!token) {
    console.error('Failed to obtain Live API token! Skipping Live import.');
    process.exit(1);
  }
  console.log('Successfully authenticated with Live API.');

  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const existingLiveData = await existingLiveRes.json();
  const allLiveMathQuestions = existingLiveData.questions || existingLiveData.data || [];
  const existingLiveHeights = allLiveMathQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('height'))
  );
  console.log(`Found ${existingLiveHeights.length} existing "${CHAPTER_NAME}" questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveFailed = 0;

  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const q = ALL_QUESTIONS[i];
    const key = getDedupKey(q);
    const exists = existingLiveHeights.some(row => getDedupKey(row) === key);

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
        console.error(`Failed to insert question ${i + 1} on Live: ${res.status} ${errText}`);
        liveFailed++;
      }
    } catch (err) {
      console.error(`Network error on question ${i + 1}: ${err.message}`);
      liveFailed++;
    }
  }

  console.log(`\nLive Production: Inserted ${liveInserted}, Skipped ${liveSkipped}, Failed ${liveFailed}.`);

  // --- Step 3: FINAL LIVE VERIFICATION ---
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('height'))
  );
  console.log(`Verified Live Production total for "${CHAPTER_NAME}": ${finalLive.length}`);

  console.log('\n==================================================');
  console.log(`🎉 SUCCESS SUMMARY FOR "${CHAPTER_NAME}":`);
  console.log(`Local Neon DB Count: ${localCount} / 45`);
  console.log(`Live Production Count: ${finalLive.length} / 45`);
  console.log('==================================================\n');

  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error during import:', err);
  process.exit(1);
});

