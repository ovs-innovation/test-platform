import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { allMoleQuestions } from './mole_pyq_questions_data.mjs';

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
  .slice(0, 80);

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
  console.log(`  SEED & SYNC: SOME BASIC CONCEPTS OF CHEMISTRY (84 Qs)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DATABASE SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = 10; // Chemistry
  let localChapterId = 127; // Some Basic Concepts of Chemistry

  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'chemistry'");
    if (subRes.rows.length > 0) {
      localSubjectId = subRes.rows[0].id;
    }

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) LIKE '%some basic concept%'",
      [localSubjectId]
    );

    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
      console.log(`Found existing Local chapter ID: ${localChapterId}`);
    } else {
      console.log('Creating new chapter in Local Neon DB: Some Basic Concepts of Chemistry');
      const createRes = await client.query(
        "INSERT INTO chapters (subject_id, name, created_at) VALUES ($1, 'Some Basic Concepts of Chemistry', NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = createRes.rows[0].id;
      console.log(`Created new Local chapter ID: ${localChapterId}`);
    }

    // Clean up any existing local mole PYQ questions to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) LIKE '%some basic concept%')",
      [localChapterId]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous Some Basic Concepts of Chemistry questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of allMoleQuestions) {
      const questionText = (q.question_text || '').trim();
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
          'Chemistry', $9, 'Some Basic Concepts of Chemistry', 'Some Basic Concepts of Chemistry', NOW()
        )
      `, [
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify([correctIndex]),
        'medium',
        q.solution_text || null,
        null,
        localSubjectId,
        localChapterId
      ]);

      localInserted++;
    }
    console.log(`Successfully inserted ${localInserted} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) LIKE '%some basic concept%')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / 84 questions.`);
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Platform (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 6; // Chemistry
  let liveChapterId = 95; // Some Basic Concepts of Chemistry on Live API

  // Verify Live Chapter
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.find(c => /some basic concept/i.test(c.name));
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    } else {
      console.log('Creating chapter on Live API: Some Basic Concepts of Chemistry');
      const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveSubjectId, name: 'Some Basic Concepts of Chemistry' })
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
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=3000`, {
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
      Number(q.chapter_id) === 95 ||
      Number(q.chapter_id) === 223 ||
      /some basic concept/i.test(q.chapter || '') ||
      /some basic concept/i.test(q.chapter_name || '')
    ) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for Some Basic Concepts of Chemistry on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of allMoleQuestions) {
    const questionText = (q.question_text || '').trim();
    const optionsArray = q.options.map((opt, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(opt),
      image_url: ''
    }));

    const correctIndex = (q.correct_option || 'A').toUpperCase().charCodeAt(0) - 65;
    const cleanKey = cleanStr(questionText);
    const existing = liveMap.get(cleanKey);

    const payload = {
      subject_id: liveSubjectId,
      subject: 'Chemistry',
      chapter_id: liveChapterId,
      chapter: 'Some Basic Concepts of Chemistry',
      topic: 'Some Basic Concepts of Chemistry',
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      marks: 4,
      difficulty: 'medium',
      category: 'PYQ',
      status: 'available',
      solution: q.solution_text || null,
      image_url: null
    };

    if (existing) {
      // Update
      const upRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (upRes.ok) {
        liveUpdated++;
      } else {
        console.warn(`Failed to update Q${q.question_number} (ID ${existing.id}): ${upRes.statusText}`);
      }
    } else {
      // Create
      const inRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (inRes.ok) {
        liveInserted++;
      } else {
        console.warn(`Failed to insert Q${q.question_number}: ${inRes.statusText}`);
      }
    }
    await sleep(40);
  }

  console.log(`\nLive Sync Complete:`);
  console.log(`  Inserted: ${liveInserted}`);
  console.log(`  Updated:  ${liveUpdated}`);
  console.log(`  Total processed: ${allMoleQuestions.length}`);
}

main()
  .then(() => {
    console.log('\nAll operations completed successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal error during seed/sync:', err);
    process.exit(1);
  });
