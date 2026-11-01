import { query } from '../src/config/db.js';
import { ITF_QUESTIONS_PART1 } from './itf_questions_part1_data.mjs';
import { ITF_QUESTIONS_PART2 } from './itf_questions_part2_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

const LOCAL_SUBJECT_ID = 21; // Mathematics
const LOCAL_CHAPTER_ID = 163; // Inverse Trignometry

const LIVE_SUBJECT_ID = 7; // Mathematics
const LIVE_CHAPTER_ID = 239; // Inverse Trignometry

const CHAPTER_NAME = 'Inverse Trignometry';

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
  const allQuestions = [...ITF_QUESTIONS_PART1, ...ITF_QUESTIONS_PART2];
  console.log(`=== Starting Import of ${allQuestions.length} Inverse Trigonometry Questions ===\n`);

  // -------------------------------------------------------------
  // 1. LOCAL NEON DB IMPORT
  // -------------------------------------------------------------
  console.log('--- 1. Importing to Local Neon DB (question_bank) ---');
  
  // Fetch existing math questions in memory for fast deduplication
  const existingLocalRes = await query(
    "SELECT id, question_text, chapter FROM question_bank WHERE category = 'Mathematics'"
  );
  const localList = existingLocalRes.rows;
  console.log(`Found ${localList.length} existing Mathematics questions in Local Neon DB.`);

  let localInserted = 0;
  let localSkipped = 0;

  for (const q of allQuestions) {
    const qClean = cleanStr(q.question_text.slice(0, 35));
    const match = localList.find(lq => cleanStr(lq.question_text || '').includes(qClean));

    if (match) {
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
        q.topic || 'Inverse Trigonometry',
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

  // Fetch all existing live Mathematics questions
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveList = liveData.data?.questions || liveData.questions || [];
  console.log(`Found ${liveList.length} existing Mathematics questions on Live Production.`);

  let liveInserted = 0;
  let liveUpdated = 0;
  let liveSkipped = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const qClean = cleanStr(q.question_text.slice(0, 35));

    // Exclude contaminated 8144 from false matching
    const match = liveList.find(lq => {
      if (lq.id === 8144) return false;
      return cleanStr(lq.question_text || '').includes(qClean);
    });

    if (match) {
      // If it already belongs to Inverse Trignometry, skip
      if (match.chapter === CHAPTER_NAME && match.chapter_id === LIVE_CHAPTER_ID) {
        liveSkipped++;
        continue;
      }

      // Otherwise update chapter and chapter_id to Inverse Trignometry
      const updatePayload = {
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
        topic: q.topic || 'Inverse Trigonometry',
        difficulty: q.difficulty || 'medium',
        marks: q.marks || 4,
        status: 'available'
      };

      const putRes = await fetch(`${LIVE_API}/question-bank/${match.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      if (putRes.ok) {
        liveUpdated++;
        console.log(`[${i + 1}/${allQuestions.length}] Updated existing live question #${match.id} -> ${CHAPTER_NAME}`);
      } else {
        console.error(`Failed to update live #${match.id}:`, await putRes.text());
      }
      continue;
    }

    // Insert new question
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
      topic: q.topic || 'Inverse Trigonometry',
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
      if ((i + 1) % 15 === 0 || i === allQuestions.length - 1) {
        console.log(`[${i + 1}/${allQuestions.length}] Progress: inserted live question`);
      }
    } else {
      console.error(`Failed to insert live Q${q.question_number}:`, await postRes.text());
    }
  }

  console.log(`\nLive Sync completed: ${liveInserted} inserted, ${liveUpdated} updated, ${liveSkipped} skipped.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

