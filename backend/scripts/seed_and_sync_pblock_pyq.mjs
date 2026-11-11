import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pblockAllQuestions } from './pblock_pyq_questions_data.mjs';

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
  if (trimmed.startsWith('![') || trimmed.includes('http')) return trimmed;
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

function parseOption(opt, oIdx) {
  let text = typeof opt === 'string' ? opt.trim() : '';
  let imageUrl = '';
  const imgMatch = text.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
  if (imgMatch) {
    imageUrl = imgMatch[1];
  }
  return {
    key: String.fromCharCode(65 + oIdx),
    text: formatOption(text),
    image_url: imageUrl || ''
  };
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
  throw new Error('Failed to login to Live API after 5 attempts');
}

async function main() {
  console.log(`========================================================`);
  console.log(`  SEED & SYNC: The p-Block Elements PYQ (${pblockAllQuestions.length} Questions)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DB SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding Local Neon Database ---');
  const client = await pool.connect();
  try {
    const localSubjectId = 10; // Chemistry in Local DB
    const localChapterId = 23; // The p-Block Elements in Local DB

    // Ensure chapter name
    await client.query(
      "UPDATE chapters SET name = 'The p-Block Elements' WHERE id = $1",
      [localChapterId]
    );
    console.log(`Verified Local chapter ID ${localChapterId} name is 'The p-Block Elements'`);

    // Clean up any previously inserted PYQ questions for this chapter to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'the p-block elements')",
      [localChapterId]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous The p-Block Elements PYQ questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of pblockAllQuestions) {
      const questionText = (q.question_text || '').trim();
      const optionsArray = q.options.map((opt, oIdx) => parseOption(opt, oIdx));

      const rawOpt = (q.correct_option || 'A').trim();
      const letters = rawOpt.split(/[\s,]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
      const correctIndices = letters.map(l => l.charCodeAt(0) - 65);
      const correctIndex = correctIndices[0] ?? 0;
      const questionType = 'mcq';

      // Check if question text has an image
      const qImgMatch = questionText.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
      const qImageUrl = qImgMatch ? qImgMatch[1] : null;

      await client.query(`
        INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, category, status, solution, image_url, subject_id,
          subject, chapter_id, chapter, topic, created_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          4, 'medium', 'PYQ', 'available', $6, $7, $8,
          'Chemistry', $9, 'The p-Block Elements', 'The p-Block Elements', NOW()
        )
      `, [
        questionType,
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify(correctIndices),
        q.solution_text || null,
        qImageUrl,
        localSubjectId,
        localChapterId
      ]);
      localInserted++;
    }
    console.log(`Successfully seeded ${localInserted} / ${pblockAllQuestions.length} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(1)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = 'the p-block elements')",
      [localChapterId]
    );
    console.log(`Local DB verified total: ${countRes.rows[0].count} / ${pblockAllQuestions.length} questions.`);
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
  const liveSubjectId = 6; // Chemistry on Live API
  let liveChapterId = 107; // p-Block Elements on Live API

  // Fetch existing Live questions for this chapter
  console.log('Fetching existing Live questions...');
  let liveQuestions = [];
  try {
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=3500`, {
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
    if (Number(q.chapter_id) === Number(liveChapterId) || Number(q.chapter_id) === 23) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for chapter ID ${liveChapterId} on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of pblockAllQuestions) {
    const questionText = (q.question_text || '').trim();
    const rawOpt = (q.correct_option || 'A').trim();
    const letters = rawOpt.split(/[\s,]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
    const correctIndices = letters.map(l => l.charCodeAt(0) - 65);
    const correctIndex = correctIndices[0] ?? 0;
    const questionType = 'mcq';

    const optionsArray = q.options.map((opt, oIdx) => parseOption(opt, oIdx));

    const qImgMatch = questionText.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
    const qImageUrl = qImgMatch ? qImgMatch[1] : null;

    const payload = {
      subject_id: liveSubjectId,
      subject: 'Chemistry',
      chapter_id: liveChapterId,
      chapter: 'The p-Block Elements',
      topic: 'The p-Block Elements',
      question_type: questionType,
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: correctIndices,
      marks: 4,
      difficulty: 'medium',
      category: 'PYQ',
      status: 'available',
      solution: q.solution_text || null,
      image_url: qImageUrl
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

    if ((liveInserted + liveUpdated) % 25 === 0 || (liveInserted + liveUpdated) === pblockAllQuestions.length) {
      console.log(`Live sync progress: ${liveInserted + liveUpdated} / ${pblockAllQuestions.length} (Inserted: ${liveInserted}, Updated: ${liveUpdated})`);
    }

    await sleep(60);
  }

  console.log(`\n========================================================`);
  console.log(`  COMPLETED THE P-BLOCK ELEMENTS SEED & SYNC`);
  console.log(`  Local Neon DB: ${pblockAllQuestions.length} questions seeded.`);
  console.log(`  Live Platform: ${liveInserted} inserted, ${liveUpdated} updated.`);
  console.log(`========================================================\n`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_pblock_pyq:', err);
  process.exit(1);
});

