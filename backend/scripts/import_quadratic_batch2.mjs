import { query } from '../src/config/db.js';
import { QUADRATIC_QUESTIONS_BATCH2 } from './quadratic_questions_batch2_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 21; // Mathematics
const LOCAL_CHAPTER_ID = 164; // Quadratic Equations

const LIVE_SUBJECT_ID = 7; // Mathematics
const LIVE_CHAPTER_ID = 241; // Quadratic Equations

const CHAPTER_NAME = 'Quadratic Equations';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

function normalizeMath(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log(`=== Starting Batch 2 Import of ${QUADRATIC_QUESTIONS_BATCH2.length} Quadratic Equations Questions (Q51-Q100) ===\n`);

  // -------------------------------------------------------------
  // 1. LOCAL NEON DB IMPORT
  // -------------------------------------------------------------
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  
  const existingLocalRes = await query(
    "SELECT id, question_text, chapter FROM question_bank WHERE category = 'Mathematics' AND chapter = $1",
    [CHAPTER_NAME]
  );
  const localList = existingLocalRes.rows;
  console.log(`Found ${localList.length} existing "${CHAPTER_NAME}" questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of QUADRATIC_QUESTIONS_BATCH2) {
    const qNorm = normalizeMath(q.question_text);
    const match = localList.find(lq => normalizeMath(lq.question_text) === qNorm);

    if (match) {
      console.log(`Local DB: Q${q.question_number} already exists (ID: ${match.id}), skipping.`);
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
        'Mathematics',
        'Mathematics',
        CHAPTER_NAME,
        LOCAL_CHAPTER_ID,
        LOCAL_SUBJECT_ID,
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        q.solution,
        null,
        q.topic || 'Nature of Roots, Transformations, Progression Relations & Inequalities',
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

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  console.log(`Found ${liveList.length} total existing Mathematics questions on Live Production.`);

  let liveInserted = 0;
  let liveSkipped = 0;

  for (let i = 0; i < QUADRATIC_QUESTIONS_BATCH2.length; i++) {
    const q = QUADRATIC_QUESTIONS_BATCH2[i];
    const qNorm = normalizeMath(q.question_text);

    // Exact math match for deduplication
    const isDup = liveList.some(lq => {
      const lNorm = normalizeMath(lq.question_text || '');
      return lNorm === qNorm;
    });

    if (isDup) {
      console.log(`Live DB: Q${q.question_number} already exists, skipping.`);
      liveSkipped++;
      continue;
    }

    const postPayload = {
      category: 'Mathematics',
      subject: 'Mathematics',
      chapter: CHAPTER_NAME,
      chapter_name: CHAPTER_NAME,
      chapter_id: LIVE_CHAPTER_ID,
      subject_id: LIVE_SUBJECT_ID,
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: q.options || [],
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: null,
      topic: q.topic || 'Nature of Roots, Transformations, Progression Relations & Inequalities',
      difficulty: q.difficulty || 'medium',
      marks: q.marks || 4,
      status: 'available'
    };

    const postRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(postPayload)
    });

    if (postRes.ok) {
      liveInserted++;
      if ((i + 1) % 10 === 0 || i === QUADRATIC_QUESTIONS_BATCH2.length - 1) {
        console.log(`[${i + 1}/${QUADRATIC_QUESTIONS_BATCH2.length}] Progress: inserted live question Q${q.question_number}`);
      }
    } else {
      console.error(`Failed to insert live Q${q.question_number}:`, await postRes.text());
    }
  }

  console.log(`\nLive Sync completed: ${liveInserted} inserted, ${liveSkipped} skipped.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

