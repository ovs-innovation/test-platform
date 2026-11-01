import { query } from '../src/config/db.js';
import { COMPLEX_NUMBERS_QUESTIONS } from './complex_numbers_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

function cleanStr(s) {
  if (s == null) return '';
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log(`=== Starting Import of ${COMPLEX_NUMBERS_QUESTIONS.length} Complex Number Questions ===\n`);

  // 1. NEON / LOCAL DB IMPORT
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  let localInserted = 0;
  let localSkipped = 0;

  for (const q of COMPLEX_NUMBERS_QUESTIONS) {
    const existing = await query(
      "SELECT id FROM question_bank WHERE category = 'Mathematics' AND question_text ILIKE $1",
      [`%${q.question_text.slice(0, 35)}%`]
    );

    if (existing.rows.length > 0) {
      localSkipped++;
    } else {
      await query(
        `INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
          subject_id, chapter_id, difficulty, image_url, chapter, topic, subject, status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
        [
          'Mathematics',
          'single_choice',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([]),
          null,
          0,
          null,
          null,
          q.marks || 4,
          q.solution || '',
          21, // Neon subject_id
          111, // Neon chapter_id
          q.difficulty || 'medium',
          null,
          'Complex Number',
          q.topic || 'Complex Numbers',
          'Mathematics',
          'available'
        ]
      );
      localInserted++;
    }
  }
  console.log(`Local DB: ${localInserted} inserted, ${localSkipped} skipped (already present).\n`);

  // 2. LIVE PRODUCTION SYNC
  console.log('--- 2. Syncing to Live Production (https://edvedum.com) ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained Live auth token.');

  // Fetch existing live Mathematics questions to avoid duplicates
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  console.log(`Current live Mathematics questions: ${liveList.length}`);

  let liveInserted = 0;
  let liveSkipped = 0;

  for (let i = 0; i < COMPLEX_NUMBERS_QUESTIONS.length; i++) {
    const q = COMPLEX_NUMBERS_QUESTIONS[i];
    const qClean = cleanStr(q.question_text.slice(0, 40));

    const isDup = liveList.some((lq) => cleanStr(lq.question_text || '').includes(qClean));
    if (isDup) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Mathematics',
      subject: 'Mathematics',
      chapter: 'Complex Number',
      chapter_name: 'Complex Number',
      chapter_id: 80, // Live chapter_id for Complex Numbers
      subject_id: 7,  // Live subject_id for Mathematics
      question_type: 'single_choice',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: null,
      topic: q.topic || 'Complex Numbers',
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
      body: JSON.stringify(payload)
    });

    if (postRes.ok) {
      liveInserted++;
      if (liveInserted % 5 === 0 || liveInserted === COMPLEX_NUMBERS_QUESTIONS.length) {
        console.log(`[Live Progress] ${liveInserted}/${COMPLEX_NUMBERS_QUESTIONS.length} processed.`);
      }
    } else {
      const err = await postRes.text();
      console.error(`Failed to insert Q${i + 1} on Live: ${postRes.status} ${err}`);
    }

    await new Promise((r) => setTimeout(r, 60)); // polite throttling
  }

  console.log(`\nLive Production: ${liveInserted} inserted, ${liveSkipped} skipped.`);

  // 3. VERIFICATION
  console.log('\n--- 3. Verifying Final Live Counts ---');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const allMath = verifyData.data?.questions || verifyData.questions || [];
  const cnQuestions = allMath.filter(q => /complex/i.test(q.chapter_name || q.chapter || ''));
  console.log(`Total Mathematics questions on Live: ${allMath.length}`);
  console.log(`Total Complex Number questions on Live: ${cnQuestions.length}`);

  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
