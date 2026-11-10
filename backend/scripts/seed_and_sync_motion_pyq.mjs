import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_MOTION_PYQ_QUESTIONS } from './motion_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function formatOption(opt) {
  if (typeof opt !== 'string') return opt;
  let trimmed = opt.trim();
  if (trimmed.includes('$') || trimmed.includes('\\(')) return trimmed;
  if (
    trimmed.includes('\\text') ||
    trimmed.includes('\\frac') ||
    trimmed.includes('\\times') ||
    trimmed.includes('\\alpha') ||
    trimmed.includes('\\beta') ||
    trimmed.includes('\\gamma') ||
    trimmed.includes('\\delta') ||
    trimmed.includes('\\pm') ||
    trimmed.includes('\\Omega') ||
    trimmed.includes('\\mu') ||
    trimmed.includes('\\varepsilon') ||
    trimmed.includes('\\sqrt') ||
    trimmed.includes('\\left') ||
    trimmed.includes('^') ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return `$${trimmed}$`;
  }
  return trimmed;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

const cleanStr = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

async function main() {
  console.log(`Starting Motion in straight line PYQ seeding (${ALL_MOTION_PYQ_QUESTIONS.length} questions)...`);

  // 1. Local Database Seeding
  console.log('\n--- Seeding into Local Neon Database ---');
  const client = await pool.connect();
  const localSubjectId = 11;
  const localChapterId = 134;

  try {
    let localInserted = 0;
    let localUpdated = 0;

    for (const q of ALL_MOTION_PYQ_QUESTIONS) {
      const questionText = q.question.trim();
      const optionsArray = q.options.map((optText, oIdx) => ({
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(optText)
      }));

      const existing = await client.query(
        "SELECT id FROM question_bank WHERE category = 'PYQ' AND subject = 'Physics' AND question_text = $1",
        [questionText]
      );

      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE question_bank SET
            question_text = $1, options = $2, correct_index = $3,
            correct_indices = $4, solution = $5, image_url = $6,
            category = 'PYQ', subject = 'Physics',
            chapter = 'Motion in straight line', topic = 'Motion in straight line',
            subject_id = $7, chapter_id = $8,
            difficulty = 'medium', marks = 4, status = 'available'
          WHERE id = $9`,
          [
            questionText,
            JSON.stringify(optionsArray),
            q.correct_option,
            JSON.stringify([q.correct_option]),
            q.solution,
            q.image_url || null,
            localSubjectId,
            localChapterId,
            existing.rows[0].id
          ]
        );
        localUpdated++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            question_type, question_text, options, correct_index, correct_indices,
            marks, difficulty, category, status, solution, image_url,
            subject_id, subject, chapter_id, chapter, topic, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())`,
          [
            'mcq',
            questionText,
            JSON.stringify(optionsArray),
            q.correct_option,
            JSON.stringify([q.correct_option]),
            4,
            'medium',
            'PYQ',
            'available',
            q.solution,
            q.image_url || null,
            localSubjectId,
            'Physics',
            localChapterId,
            'Motion in straight line',
            'Motion in straight line'
          ]
        );
        localInserted++;
      }
    }
    console.log(`Local DB Complete: ${localInserted} inserted, ${localUpdated} updated.`);
  } finally {
    client.release();
  }

  // 2. Sync to Live edvedum.com API
  console.log('\n--- Syncing to Live edvedum.com API ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain token from live API');

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  console.log(`Found ${liveQuestions.length} existing Physics PYQ questions on Live.`);

  const liveMap = new Map();
  for (const q of liveQuestions) {
    const key = cleanStr(q.question_text);
    if (key) liveMap.set(key, q);
  }

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_MOTION_PYQ_QUESTIONS) {
    const questionText = q.question.trim();
    const optionsArray = q.options.map((optText, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(optText)
    }));

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Motion in straight line',
      topic: 'Motion in straight line',
      subject_id: 5,   // Live Physics ID
      chapter_id: 187, // Live Motion in straight line ID
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: q.correct_option,
      correct_indices: [q.correct_option],
      solution: q.solution,
      image_url: q.image_url || null,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(questionText);
    const existing = liveMap.get(key);

    if (existing) {
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) {
        liveUpdated++;
      } else {
        console.error(`[Q${q.qNum}] Failed to update Live question ${existing.id}:`, await putRes.text());
      }
    } else {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`[Q${q.qNum}] Inserted Live ID: ${newId}`);
        liveInserted++;
      } else {
        console.error(`[Q${q.qNum}] Failed to insert Live question:`, await postRes.text());
      }
    }
    await sleep(100);
  }

  console.log(`\nLive API Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // 3. Final Verification on Local DB and Live
  console.log('\n--- Final Verification ---');
  const localCountRes = await pool.query(
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Motion in straight line' OR chapter_id = 134)"
  );
  console.log(`Local DB count: ${localCountRes.rows[0].count} / 66`);

  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  const motionQuestions = verifyQuestions.filter(q =>
    (q.chapter || '').toLowerCase() === 'motion in straight line' ||
    Number(q.chapter_id) === 187
  );
  console.log(`Live API count: ${motionQuestions.length} / 66`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_motion_pyq:', err);
  process.exit(1);
});

