import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DUAL_NATURE_PYQ_QUESTIONS } from './dn_pyq_questions_data.mjs';

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
  console.log(`  SEED & SYNC: DUAL NATURE OF MATTER (123 QUESTIONS)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DATABASE SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = 11; // Physics
  let localChapterId = null;

  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length > 0) {
      localSubjectId = subRes.rows[0].id;
    }

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) IN ('dual nature of matter', 'dual nature of radiation and matter')",
      [localSubjectId]
    );

    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
      console.log(`Found existing Local chapter ID: ${localChapterId}`);
    } else {
      console.log('Creating new chapter in Local Neon DB: Dual Nature of Matter');
      const createRes = await client.query(
        "INSERT INTO chapters (subject_id, name, created_at) VALUES ($1, 'Dual Nature of Matter', NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = createRes.rows[0].id;
      console.log(`Created new Local chapter ID: ${localChapterId}`);
    }

    // Clean up any existing local Dual Nature questions to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) IN ('dual nature of matter', 'dual nature of radiation and matter'))",
      [localChapterId]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous Dual Nature questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of DUAL_NATURE_PYQ_QUESTIONS) {
      const questionText = (q.question_text || q.question).trim();
      const optionsArray = q.options.map((opt, oIdx) => ({
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(opt),
        image_url: ''
      }));

      const correctIndex = (q.correct_option || 'A').toUpperCase().charCodeAt(0) - 65;

      await client.query(`
        INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, category, status, solution, image_url, subject_id,
          subject, chapter_id, chapter, topic, created_at
        ) VALUES (
          'mcq', $1, $2, $3, $4,
          4, $5, 'PYQ', 'available', $6, $7, $8,
          'Physics', $9, 'Dual Nature of Matter', 'Dual Nature of Matter', NOW()
        )
      `, [
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify([correctIndex]),
        q.difficulty || 'medium',
        q.explanation || null,
        q.image_url || null,
        localSubjectId,
        localChapterId
      ]);

      localInserted++;
    }
    console.log(`Successfully inserted ${localInserted} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'dual nature of matter')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / 123 questions.`);
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Platform (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 5; // Physics
  let liveChapterId = 196; // Dual Nature of Radiation and Matter on Live API

  // Verify Live Chapter
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.find(c => /dual\s*nature/i.test(c.name));
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    } else {
      console.log('Creating chapter on Live API: Dual Nature of Radiation and Matter');
      const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveSubjectId, name: 'Dual Nature of Radiation and Matter' })
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
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=2500`, {
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
      /dual\s*nature/i.test(q.chapter || '') ||
      /dual\s*nature/i.test(q.chapter_name || '')
    ) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for Dual Nature on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of DUAL_NATURE_PYQ_QUESTIONS) {
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

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      subject_id: liveSubjectId,
      chapter: 'Dual Nature of Radiation and Matter',
      chapter_id: liveChapterId,
      topic: 'Dual Nature of Radiation and Matter',
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      marks: 4,
      difficulty: q.difficulty || 'medium',
      solution: q.explanation || '',
      image_url: q.image_url || '',
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
      if (!putRes.ok) {
        console.warn(`[Live Update] Q failed with status ${putRes.status}`);
      } else {
        liveUpdated++;
      }
    } else {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!postRes.ok) {
        console.warn(`[Live Insert] Q failed with status ${postRes.status}`);
      } else {
        liveInserted++;
      }
    }
  }

  console.log(`Live sync complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // Verify Live
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (verifyRes.ok) {
    const vData = await verifyRes.json();
    const allQ = vData.questions || vData.data || [];
    const dnQ = allQ.filter(
      q => Number(q.chapter_id) === Number(liveChapterId) || /dual\s*nature/i.test(q.chapter || '')
    );
    console.log(`Live verified total: ${dnQ.length} Dual Nature questions.`);
  }

  console.log(`\n========================================================`);
  console.log(`  DUAL NATURE OF MATTER SEED & SYNC COMPLETED!`);
  console.log(`========================================================\n`);
  await pool.end();
}

main().catch(console.error);
