import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_OSCILLATIONS_PYQ_QUESTIONS } from './oscillations_pyq_questions_data.mjs';

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
  if (trimmed.startsWith('![') || trimmed.startsWith('http')) return trimmed;
  if (trimmed.includes('$') || trimmed.includes('\\(')) return trimmed;

  if (
    trimmed.includes('\\') ||
    trimmed.includes('^') ||
    trimmed.includes('_') ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return `$${trimmed}$`;
  }
  return trimmed;
}

const cleanStr = (s) => (s || '').toLowerCase().replace(/\[.*?\]/g, '').replace(/[^a-z0-9]/g, '');

async function getToken() {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(`${LIVE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
      });
      if (res.ok) {
        const data = await res.json();
        return data.token || data.accessToken || data.data?.token;
      }
      console.warn(`[Live Login] Attempt ${attempt} failed with status ${res.status}. Retrying in 2s...`);
    } catch (err) {
      console.warn(`[Live Login] Attempt ${attempt} error: ${err.message}. Retrying in 2s...`);
    }
    await sleep(2000);
  }
  throw new Error('Failed to login to live API after 5 attempts');
}

async function main() {
  console.log(`====================================================`);
  console.log(`    SEED & SYNC: OSCILLATIONS (85 QUESTIONS)       `);
  console.log(`====================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DATABASE SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = 11;
  let localChapterId = 152;

  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length > 0) localSubjectId = subRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = 'oscillations'",
      [localSubjectId]
    );
    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
    } else {
      const insRes = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ('Oscillations', $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1), NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = insRes.rows[0].id;
    }
    console.log(`Local Physics Subject ID: ${localSubjectId}, Chapter ID: ${localChapterId}`);

    // Clean up old questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'oscillations')",
      [localChapterId]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous PYQ questions for Oscillations.`);

    let localInserted = 0;
    for (const q of ALL_OSCILLATIONS_PYQ_QUESTIONS) {
      const questionText = q.question.trim();
      const optionsArray = q.options.map((opt, oIdx) => {
        if (typeof opt === 'string' && opt.startsWith('http')) {
          return {
            key: String.fromCharCode(65 + oIdx),
            text: '',
            image_url: opt
          };
        }
        return {
          key: String.fromCharCode(65 + oIdx),
          text: formatOption(opt),
          image_url: ''
        };
      });

      await client.query(
        `INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, category, status, solution, image_url, subject_id,
          subject, chapter_id, chapter, topic, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())`,
        [
          'mcq',
          questionText,
          JSON.stringify(optionsArray),
          q.correctIndex,
          JSON.stringify([q.correctIndex]),
          4,
          'medium',
          'PYQ',
          'available',
          q.solution,
          q.image_url || null,
          localSubjectId,
          'Physics',
          localChapterId,
          'Oscillations',
          'Oscillations'
        ]
      );
      localInserted++;
    }
    console.log(`Successfully inserted ${localInserted} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'oscillations')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / 85 questions.`);
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Platform (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 5;
  let liveChapterId = 22;

  // Verify Live Chapter
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.find(c => (c.name || '').trim().toLowerCase() === 'oscillations');
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    } else {
      console.log('Creating chapter on Live API: Oscillations');
      const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveSubjectId, name: 'Oscillations' })
      });
      const createdData = await createChRes.json();
      liveChapterId = createdData.chapter?.id || createdData.id;
      console.log(`Created new Live chapter ID: ${liveChapterId}`);
    }
  }

  // Fetch existing Live questions for this chapter
  console.log('Fetching existing Live questions...');
  let liveQuestions = [];
  try {
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (qRes.ok) {
      const qData = await qRes.json();
      liveQuestions = qData.questions || qData.data || [];
    }
  } catch (err) {
    console.warn('Could not fetch filtered live questions, will try general search:', err.message);
  }

  const liveMap = new Map();
  for (const q of liveQuestions) {
    if (
      Number(q.chapter_id) === Number(liveChapterId) ||
      (q.chapter || '').toLowerCase() === 'oscillations'
    ) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for Oscillations on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_OSCILLATIONS_PYQ_QUESTIONS) {
    const questionText = q.question.trim();
    const optionsArray = q.options.map((opt, oIdx) => {
      if (typeof opt === 'string' && opt.startsWith('http')) {
        return {
          key: String.fromCharCode(65 + oIdx),
          text: '',
          image_url: opt
        };
      }
      return {
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(opt),
        image_url: ''
      };
    });

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Oscillations',
      topic: 'Oscillations',
      subject_id: liveSubjectId,
      chapter_id: liveChapterId,
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: q.correctIndex,
      correct_indices: [q.correctIndex],
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
        liveMap.delete(key);
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
    await sleep(40);
  }

  console.log(`\nLive Sync Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // ----------------------------------------------------
  // 3. FINAL VERIFICATION ON BOTH ENVIRONMENTS
  // ----------------------------------------------------
  console.log('\n--- 3. Verifying Final Counts ---');
  const verifyClient = await pool.connect();
  let localCount = 0;
  try {
    const finalCountRes = await verifyClient.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Oscillations' OR chapter_id = $1)",
      [localChapterId]
    );
    localCount = finalCountRes.rows[0].count;
  } finally {
    verifyClient.release();
  }

  const finalLiveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalLiveData = await finalLiveRes.json();
  const allFinalLive = finalLiveData.questions || finalLiveData.data || [];
  const liveCount = allFinalLive.filter(
    (q) =>
      (q.chapter || '').toLowerCase() === 'oscillations' ||
      Number(q.chapter_id) === Number(liveChapterId)
  ).length;

  console.log(`Local DB Total: ${localCount} / 85`);
  console.log(`Live API Total: ${liveCount} / 85`);

  if (localCount === 85 && liveCount === 85) {
    console.log('\n SUCCESS: All 85 Oscillations questions successfully seeded and verified across both environments!');
  } else {
    console.warn(`\n  WARNING: Counts did not match 85. Local: ${localCount}, Live: ${liveCount}`);
  }

  await pool.end();
}

main().catch(console.error);

