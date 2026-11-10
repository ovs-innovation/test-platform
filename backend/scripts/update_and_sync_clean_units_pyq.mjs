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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const cleanStr = (s) => (s || '').toLowerCase().replace(/\[.*?\]/g, '').replace(/[^a-z0-9]/g, '');

async function run() {
  console.log(`Starting update to remove [YEAR] prefix and format LaTeX options for all 82 questions...`);

  // 1. Update Local Neon DB
  console.log('\n--- Updating Local Neon Database ---');
  const client = await pool.connect();
  let localUpdated = 0;

  try {
    const existingLocal = await client.query(
      "SELECT id, question_text FROM question_bank WHERE category = 'PYQ' AND subject = 'Physics' ORDER BY id ASC"
    );
    console.log(`Found ${existingLocal.rows.length} Physics PYQ questions in local DB.`);

    if (existingLocal.rows.length === ALL_UNITS_PYQ_QUESTIONS.length) {
      for (let i = 0; i < ALL_UNITS_PYQ_QUESTIONS.length; i++) {
        const q = ALL_UNITS_PYQ_QUESTIONS[i];
        const row = existingLocal.rows[i];
        const cleanQuestionText = q.question.trim();
        const formattedOptions = q.options.map((opt, oIdx) => ({
          key: String.fromCharCode(65 + oIdx),
          text: formatOption(opt)
        }));

        await client.query(
          `UPDATE question_bank SET
            question_text = $1,
            options = $2,
            correct_index = $3,
            correct_indices = $4,
            solution = $5,
            difficulty = $6,
            chapter = 'Units and Measurement',
            topic = 'Units and Measurement',
            status = 'available'
          WHERE id = $7`,
          [
            cleanQuestionText,
            JSON.stringify(formattedOptions),
            q.correctIndex,
            JSON.stringify([q.correctIndex]),
            q.solution,
            q.difficulty || 'medium',
            row.id
          ]
        );
        localUpdated++;
      }
    } else {
      // Match by stripped question text
      for (const q of ALL_UNITS_PYQ_QUESTIONS) {
        const qKey = cleanStr(q.question);
        const match = existingLocal.rows.find(r => cleanStr(r.question_text).includes(qKey) || qKey.includes(cleanStr(r.question_text)));
        if (match) {
          const cleanQuestionText = q.question.trim();
          const formattedOptions = q.options.map((opt, oIdx) => ({
            key: String.fromCharCode(65 + oIdx),
            text: formatOption(opt)
          }));
          await client.query(
            `UPDATE question_bank SET
              question_text = $1,
              options = $2,
              correct_index = $3,
              correct_indices = $4,
              solution = $5,
              chapter = 'Units and Measurement',
              topic = 'Units and Measurement'
            WHERE id = $6`,
            [
              cleanQuestionText,
              JSON.stringify(formattedOptions),
              q.correctIndex,
              JSON.stringify([q.correctIndex]),
              q.solution,
              match.id
            ]
          );
          localUpdated++;
        }
      }
    }
    console.log(`Local DB: Successfully updated ${localUpdated} questions.`);
  } finally {
    client.release();
  }

  // 2. Update Live edvedum.com
  console.log('\n--- Updating Live edvedum.com API ---');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = (liveData.questions || []).sort((a, b) => a.id - b.id);
  console.log(`Found ${liveQuestions.length} Physics PYQ questions on Live.`);

  let liveUpdated = 0;
  for (let i = 0; i < ALL_UNITS_PYQ_QUESTIONS.length; i++) {
    const q = ALL_UNITS_PYQ_QUESTIONS[i];
    let target = null;

    if (liveQuestions.length === ALL_UNITS_PYQ_QUESTIONS.length) {
      target = liveQuestions[i];
    } else {
      const qKey = cleanStr(q.question);
      target = liveQuestions.find(lq => cleanStr(lq.question_text).includes(qKey) || qKey.includes(cleanStr(lq.question_text)));
    }

    if (!target) {
      console.warn(`[Q${q.qNum}] Could not find matching live question!`);
      continue;
    }

    const cleanQuestionText = q.question.trim();
    const formattedOptions = q.options.map((opt, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(opt)
    }));

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Units and Measurement',
      topic: 'Units and Measurement',
      subject_id: 5,
      chapter_id: 74,
      question_type: 'mcq',
      question_text: cleanQuestionText,
      options: formattedOptions,
      correct_index: q.correctIndex,
      correct_indices: [q.correctIndex],
      solution: q.solution,
      difficulty: q.difficulty || 'medium',
      marks: 4,
      status: 'available'
    };

    const putRes = await fetch(`${LIVE_API}/question-bank/${target.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (putRes.ok) {
      liveUpdated++;
      if (q.qNum <= 5 || q.qNum % 20 === 0 || q.qNum === 82) {
        console.log(`[Q${q.qNum}] Updated Live ID ${target.id} -> clean text: "${cleanQuestionText.slice(0, 45)}..."`);
      }
    } else {
      console.error(`[Q${q.qNum}] Failed to update Live ID ${target.id}:`, await putRes.text());
    }
    await sleep(80);
  }

  console.log(`\nLive API Complete: ${liveUpdated}/${ALL_UNITS_PYQ_QUESTIONS.length} questions updated!`);

  // 3. Verification on Live
  console.log('\n--- Verifying Live sample ---');
  const checkRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const checkData = await checkRes.json();
  const q1 = (checkData.questions || [])[0];
  console.log('Sample Q1 on Live:');
  console.log('ID:', q1?.id);
  console.log('question_text:', q1?.question_text);
  console.log('options:', q1?.options);

  await pool.end();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

