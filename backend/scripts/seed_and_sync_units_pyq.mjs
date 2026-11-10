import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_UNITS_PYQ_QUESTIONS } from './units_pyq_questions_data.mjs';

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
  console.log(`Starting Units & Measurement PYQ seeding (${ALL_UNITS_PYQ_QUESTIONS.length} questions)...`);

  // 1. Local Database Seeding
  console.log('\n--- Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = null;
  let localChapterId = null;

  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length === 0) throw new Error('Physics subject not found in local DB');
    localSubjectId = subRes.rows[0].id;

    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) LIKE '%unit%measurement%' OR LOWER(name) LIKE '%unit and measurement%' OR LOWER(name) LIKE '%units and measurement%')",
      [localSubjectId]
    );

    if (chapRes.rows.length === 0) {
      const createChap = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $2), NOW()) RETURNING id, name",
        ['Units and Measurement', localSubjectId]
      );
      localChapterId = createChap.rows[0].id;
      console.log(`Created local chapter 'Units and Measurement' (ID: ${localChapterId})`);
    } else {
      localChapterId = chapRes.rows[0].id;
      console.log(`Using existing local chapter '${chapRes.rows[0].name}' (ID: ${localChapterId})`);
    }

    let localInserted = 0;
    let localUpdated = 0;

    for (const q of ALL_UNITS_PYQ_QUESTIONS) {
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
            correct_indices = $4, solution = $5, category = 'PYQ',
            subject = 'Physics', chapter = 'Units and Measurement',
            topic = 'Units and Measurement', chapter_id = $6,
            difficulty = $7, marks = 4, status = 'available'
          WHERE id = $8`,
          [
            questionText,
            JSON.stringify(optionsArray),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            q.solution,
            localChapterId,
            q.difficulty || 'medium',
            existing.rows[0].id
          ]
        );
        localUpdated++;
      } else {
        await client.query(
          `INSERT INTO question_bank (
            question_type, question_text, options, correct_index, correct_indices,
            marks, difficulty, category, status, solution, subject_id, subject,
            chapter_id, chapter, topic, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())`,
          [
            'mcq',
            questionText,
            JSON.stringify(optionsArray),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            4,
            q.difficulty || 'medium',
            'PYQ',
            'available',
            q.solution,
            localSubjectId,
            'Physics',
            localChapterId,
            'Units and Measurement',
            'Units and Measurement'
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

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  console.log(`Found ${liveQuestions.length} existing PYQ questions on Live.`);

  const liveMap = new Map();
  for (const q of liveQuestions) {
    const key = cleanStr(q.question_text);
    if (key) liveMap.set(key, q);
  }

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_UNITS_PYQ_QUESTIONS) {
    const questionText = q.question.trim();
    const optionsArray = q.options.map((optText, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(optText)
    }));

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Units and Measurement',
      topic: 'Units and Measurement',
      subject_id: 5,   // Live Physics ID
      chapter_id: 74,  // Live Unit and Measurement ID
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: q.correctIndex,
      correct_indices: [q.correctIndex],
      solution: q.solution,
      difficulty: q.difficulty || 'medium',
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
        console.error(`[Q${q.qNum}] Failed to update ${existing.id}:`, await putRes.text());
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
        console.error(`[Q${q.qNum}] Failed to insert:`, await postRes.text());
      }
    }
    await sleep(100);
  }

  console.log(`\nLive API Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // 3. Final Verification on Live
  console.log('\n--- Verifying on Live edvedum.com ---');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  console.log(`Total Physics PYQ questions on Live: ${verifyQuestions.length}`);

  const unitsQuestions = verifyQuestions.filter(q =>
    (q.chapter || '').toLowerCase().includes('unit') ||
    (q.chapter_name || '').toLowerCase().includes('unit') ||
    Number(q.chapter_id) === 74
  );
  console.log(`Units and Measurement PYQ questions on Live: ${unitsQuestions.length} / 82`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_units_pyq:', err);
  process.exit(1);
});

