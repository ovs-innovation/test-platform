import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ionicPyqQuestions } from './ionic_pyq_questions_data.mjs';

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
  console.log(`  SEED & SYNC: IONIC EQUILIBRIUM (89 QUESTIONS)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DATABASE SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding into Local Neon Database ---');
  const client = await pool.connect();
  let localSubjectId = 10; // Chemistry
  let localChapterId = 205; // Ionic Equilibrium in Neon DB

  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'chemistry'");
    if (subRes.rows.length > 0) {
      localSubjectId = subRes.rows[0].id;
    }

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) LIKE '%ionic equilibrium%'",
      [localSubjectId]
    );

    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
      console.log(`Found existing Local chapter ID: ${localChapterId}`);
    } else {
      console.log('Creating new chapter in Local Neon DB: Ionic Equilibrium');
      const createRes = await client.query(
        "INSERT INTO chapters (subject_id, name, created_at) VALUES ($1, 'Ionic Equilibrium', NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = createRes.rows[0].id;
      console.log(`Created new Local chapter ID: ${localChapterId}`);
    }

    // Clean up any existing local Ionic Equilibrium PYQ questions to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) LIKE '%ionic equilibrium%')",
      [localChapterId]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous Ionic Equilibrium questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of ionicPyqQuestions) {
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
          'Chemistry', $9, 'Ionic Equilibrium', 'Ionic Equilibrium', NOW()
        )
      `, [
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify([correctIndex]),
        'medium',
        q.explanation || null,
        null,
        localSubjectId,
        localChapterId
      ]);
      localInserted++;
    }
    console.log(`Successfully seeded ${localInserted} / ${ionicPyqQuestions.length} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) LIKE '%ionic equilibrium%')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / ${ionicPyqQuestions.length} questions.`);
  } catch (err) {
    console.error('Error seeding Local Neon DB:', err);
    throw err;
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE PRODUCTION SYNC (edvedum.com)
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Production Server (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 6; // Chemistry
  let liveChapterId = 13; // Ionic Equilibrium on Live API

  // Verify Live Chapter
  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const matched = chList.find(c => c.id === 13) || chList.find(c => /ionic equilibrium/i.test(c.name));
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    } else {
      console.log('Creating chapter on Live API: Ionic Equilibrium');
      const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject_id: liveSubjectId, name: 'Ionic Equilibrium' })
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
      Number(q.chapter_id) === 13 ||
      /ionic\s*equilibrium/i.test(q.chapter || '') ||
      /ionic\s*equilibrium/i.test(q.chapter_name || '')
    ) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for Ionic Equilibrium on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ionicPyqQuestions) {
    const questionText = (q.question_text || '').trim();
    const correctLetter = q.correct_option.toUpperCase();
    const correctIndex = correctLetter.charCodeAt(0) - 65;

    const optionsArray = q.options.map((opt, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(opt),
      image_url: ''
    }));

    const payload = {
      subject_id: liveSubjectId,
      subject: 'Chemistry',
      chapter_id: liveChapterId,
      chapter: 'Ionic Equilibrium',
      topic: 'Ionic Equilibrium',
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      marks: 4,
      difficulty: 'medium',
      category: 'PYQ',
      status: 'available',
      solution: q.explanation || null,
      image_url: null
    };

    const key = cleanStr(questionText);
    const existing = liveMap.get(key);

    if (existing) {
      // Update existing live question
      const updateRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (updateRes.ok) {
        liveUpdated++;
      } else {
        const errText = await updateRes.text();
        console.error(`Failed to update live Q${q.question_number} (ID ${existing.id}):`, errText);
      }
    } else {
      // Insert new live question
      const insertRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (insertRes.ok) {
        liveInserted++;
      } else {
        const errText = await insertRes.text();
        console.error(`Failed to insert live Q${q.question_number}:`, errText);
      }
    }

    if ((liveInserted + liveUpdated) % 10 === 0 || (liveInserted + liveUpdated) === ionicPyqQuestions.length) {
      console.log(`Live sync progress: ${liveInserted + liveUpdated} / ${ionicPyqQuestions.length} (Inserted: ${liveInserted}, Updated: ${liveUpdated})`);
    }

    await sleep(60);
  }

  console.log(`\n========================================================`);
  console.log(`  COMPLETED IONIC EQUILIBRIUM SEED & SYNC`);
  console.log(`  Local Neon DB: ${ionicPyqQuestions.length} questions seeded.`);
  console.log(`  Live Platform: ${liveInserted} inserted, ${liveUpdated} updated.`);
  console.log(`========================================================\n`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_ionic_pyq:', err);
  process.exit(1);
});

