import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_WEP_PYQ_QUESTIONS } from './wep_pyq_questions_data.mjs';

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
  console.log(`Starting Work, Energy and Power PYQ seeding (${ALL_WEP_PYQ_QUESTIONS.length} questions)...`);

  // 1. Local Database Seeding
  console.log('\n--- Seeding into Local Neon Database ---');
  const client = await pool.connect();
  const localSubjectId = 11;
  const localChapterId = 26; // 'Work, Energy and Power'

  try {
    // Ensure chapter name is standard in chapters table
    await client.query(
      "UPDATE chapters SET name = 'Work, Energy and Power' WHERE id = $1",
      [localChapterId]
    );

    // Clean up any previous test PYQ insertions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'work, energy and power')",
      [localChapterId]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous PYQ questions in chapter 26.`);

    let localInserted = 0;

    for (const q of ALL_WEP_PYQ_QUESTIONS) {
      const questionText = q.question.trim();
      const optionsArray = q.options.map((optText, oIdx) => ({
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(optText)
      }));

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
          'Work, Energy and Power',
          'Work, Energy and Power'
        ]
      );
      localInserted++;
    }
    console.log(`Local DB Complete: ${localInserted} inserted.`);
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
    if (Number(q.chapter_id) === 119 || (q.chapter || '').toLowerCase().includes('work, energy and power')) {
      const key = cleanStr(q.question_text);
      if (key && !liveMap.has(key)) liveMap.set(key, q);
    }
  }

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_WEP_PYQ_QUESTIONS) {
    const questionText = q.question.trim();
    const optionsArray = q.options.map((optText, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(optText)
    }));

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Work, Energy and Power',
      topic: 'Work, Energy and Power',
      subject_id: 5,    // Live Physics ID
      chapter_id: 119,  // Live Work, Energy and Power ID
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
        liveMap.delete(key); // prevent duplicate overwrite
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
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Work, Energy and Power' OR chapter_id = 26)"
  );
  console.log(`Local DB count: ${localCountRes.rows[0].count} / 69`);

  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  const wepQuestions = verifyQuestions.filter(q =>
    (q.chapter || '').toLowerCase().includes('work') ||
    Number(q.chapter_id) === 119
  );
  console.log(`Live API count: ${wepQuestions.length} / 69`);

  const diagramQuestions = wepQuestions.filter(q => q.image_url);
  console.log(`Live diagram questions count: ${diagramQuestions.length} / 5`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_wep_pyq:', err);
  process.exit(1);
});

