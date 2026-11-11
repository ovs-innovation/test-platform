import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_CURRENT_ELECTRICITY_QUESTIONS } from './current_electricity_pyq_questions_data.mjs';

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

const cleanStr = (s) => (s || '')
  .toLowerCase()
  .replace(/https?:\/\/[^\s\)]+/g, '')
  .replace(/\[.*?\]/g, '')
  .replace(/\(.*?\)/g, '')
  .replace(/[^a-z0-9]/g, '')
  .slice(0, 50);

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
  console.log(`========================================================`);
  console.log(`  SEED & SYNC: CURRENT ELECTRICITY (173 QUESTIONS)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DATABASE SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = 11;
  let localChapterId = 69;

  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length > 0) localSubjectId = subRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = 'current electricity'",
      [localSubjectId]
    );
    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
    } else {
      const insRes = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ('Current Electricity', $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1), NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = insRes.rows[0].id;
    }
    console.log(`Local Physics Subject ID: ${localSubjectId}, Chapter ID: ${localChapterId}`);

    // Clean up old PYQ questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE subject_id = $1 AND chapter_id = $2 AND category = 'PYQ'",
      [localSubjectId, localChapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous local PYQ questions for chapter ${localChapterId}.`);

    let localInserted = 0;
    for (const q of ALL_CURRENT_ELECTRICITY_QUESTIONS) {
      const questionText = (q.question_text || q.question).trim();
      const optionsArray = q.options.map((opt, oIdx) => {
        if (typeof opt === 'object' && opt !== null) {
          return {
            key: opt.key || String.fromCharCode(65 + oIdx),
            text: formatOption(opt.text || ''),
            image_url: opt.image_url || ''
          };
        }
        return {
          key: String.fromCharCode(65 + oIdx),
          text: formatOption(opt),
          image_url: ''
        };
      });

      const correctIndex = (q.correct_option || 'A').toUpperCase().charCodeAt(0) - 65;
      const diagramUrl = q.image_url || null;

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
          correctIndex,
          JSON.stringify([correctIndex]),
          4,
          q.difficulty || 'medium',
          'PYQ',
          'available',
          q.solution,
          diagramUrl,
          localSubjectId,
          'Physics',
          localChapterId,
          'Current Electricity',
          'Current Electricity'
        ]
      );
      localInserted++;
    }
    console.log(`Successfully inserted ${localInserted} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'current electricity')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / 173 questions.`);
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Platform (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 5;
  let liveChapterId = 24;

  // Verify Live Chapter
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.find(c => (c.name || '').trim().toLowerCase() === 'current electricity');
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    } else {
      console.log('Creating chapter on Live API: Current Electricity');
      const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveSubjectId, name: 'Current Electricity' })
      });
      const createdData = await createChRes.json();
      liveChapterId = createdData.chapter?.id || createdData.id || createdData.data?.id;
      console.log(`Created new Live chapter ID: ${liveChapterId}`);
    }
  }

  // Fetch existing Live questions for this chapter
  console.log('Fetching existing Live questions...');
  let liveQuestions = [];
  try {
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=2000`, {
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
      (q.chapter || '').toLowerCase() === 'current electricity'
    ) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for Current Electricity on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_CURRENT_ELECTRICITY_QUESTIONS) {
    const questionText = (q.question_text || q.question).trim();
    const optionsArray = q.options.map((opt, oIdx) => {
      if (typeof opt === 'object' && opt !== null) {
        return {
          key: opt.key || String.fromCharCode(65 + oIdx),
          text: formatOption(opt.text || ''),
          image_url: opt.image_url || ''
        };
      }
      return {
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(opt),
        image_url: ''
      };
    });

    const correctIndex = (q.correct_option || 'A').toUpperCase().charCodeAt(0) - 65;
    const diagramUrl = q.image_url || null;

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Current Electricity',
      topic: 'Current Electricity',
      subject_id: liveSubjectId,
      chapter_id: liveChapterId,
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      solution: q.solution,
      image_url: diagramUrl,
      difficulty: q.difficulty || 'medium',
      marks: 4,
      negative_marks: 1,
      status: 'available'
    };

    const key = cleanStr(questionText);
    const existing = liveMap.get(key);

    let saved = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (existing) {
          const updateRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload)
          });
          if (updateRes.ok) {
            liveUpdated++;
            saved = true;
            break;
          }
        } else {
          const insertRes = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload)
          });
          if (insertRes.ok) {
            liveInserted++;
            saved = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`[Sync Q${q.question_number}] Attempt ${attempt} error: ${err.message}`);
      }
      await sleep(100);
    }

    if (!saved) {
      console.error(`Failed to save Q${q.question_number} to Live API!`);
    }

    if ((liveInserted + liveUpdated) % 20 === 0 || (liveInserted + liveUpdated) === ALL_CURRENT_ELECTRICITY_QUESTIONS.length) {
      console.log(`Live sync progress: ${liveInserted + liveUpdated} / ${ALL_CURRENT_ELECTRICITY_QUESTIONS.length}`);
    }
  }

  console.log(`\nLive Sync Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  await pool.end();
}

main().catch(console.error);

