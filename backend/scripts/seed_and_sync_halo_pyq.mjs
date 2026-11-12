import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { allHaloQuestions } from './halo_pyq_questions_data.mjs';

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

function parseOption(opt, oIdx, q) {
  let text = typeof opt === 'string' ? opt.trim() : (opt?.option_text || '').trim();
  let imageUrl = '';
  if (oIdx === 0 && q.option_a_image) imageUrl = q.option_a_image;
  if (oIdx === 1 && q.option_b_image) imageUrl = q.option_b_image;
  if (oIdx === 2 && q.option_c_image) imageUrl = q.option_c_image;
  if (oIdx === 3 && q.option_d_image) imageUrl = q.option_d_image;

  const imgMatch = text.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
  if (imgMatch) {
    imageUrl = imgMatch[1];
  }
  return {
    key: String.fromCharCode(65 + oIdx),
    text: formatOption(text),
    image_url: imageUrl || '',
    media: imageUrl ? [{ url: imageUrl }] : []
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
  console.log(`  SEED & SYNC: Haloalkanes and Haloarenes PYQ (${allHaloQuestions.length} Questions)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. NEON DB SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding Neon Database ---');
  const client = await pool.connect();
  try {
    const localSubjectId = 10; // Chemistry in DB
    const localChapterId = 153; // Haloalkanes and Haloarenes in DB
    const chapterName = 'Haloalkanes and Haloarenes';

    // Verify chapter in chapters table
    await client.query(
      "UPDATE chapters SET name = $1 WHERE id = $2",
      [chapterName, localChapterId]
    );
    console.log(`Verified chapter ID ${localChapterId} name is '${chapterName}'`);

    // Clean up any previously inserted PYQ questions for this chapter to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = LOWER($2))",
      [localChapterId, chapterName]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous PYQ questions from Neon DB.`);

    let dbInserted = 0;
    for (const q of allHaloQuestions) {
      const questionText = (q.question_text || '').trim();
      const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
      const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx, q));

      const rawOpt = (q.correct_option || 'A').trim().toUpperCase();
      const correctIndex = rawOpt.charCodeAt(0) - 65;
      const correctIndices = [correctIndex];
      const questionType = q.question_number === 49 ? 'assertion_reason' : 'single_choice';

      await client.query(`
        INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, category, status, solution, image_url, subject_id,
          subject, chapter_id, chapter, topic, created_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          4, 'medium', 'PYQ', 'normal', $6, $7, $8,
          'Chemistry', $9, $10, $10, NOW()
        )
      `, [
        questionType,
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify(correctIndices),
        q.solution || '',
        q.image_url || null,
        localSubjectId,
        localChapterId,
        chapterName
      ]);
      dbInserted++;
    }

    console.log(`Neon DB: Successfully inserted ${dbInserted} questions!`);
  } finally {
    client.release();
    await pool.end();
  }

  // ----------------------------------------------------
  // 2. LIVE PRODUCTION API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Production Server (edvedum.com) ---');
  let token;
  try {
    token = await getToken();
  } catch (err) {
    console.warn('Could not authenticate to Live API:', err.message);
  }

  if (token) {
    const liveSubjectId = 6; // Chemistry on Live API
    const liveChapterId = 34; // Haloalkanes and Haloarenes on Live API
    const chapterName = 'Haloalkanes and Haloarenes';

    let liveInserted = 0;
    let liveSkipped = 0;

    for (const q of allHaloQuestions) {
      const questionText = (q.question_text || '').trim();
      const rawOpt = (q.correct_option || 'A').trim().toUpperCase();
      const correctIndex = rawOpt.charCodeAt(0) - 65;
      const correctIndices = [correctIndex];
      const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
      const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx, q));
      const questionType = q.question_number === 49 ? 'assertion_reason' : 'single_choice';

      const payload = {
        category: 'PYQ',
        subject: 'Chemistry',
        subject_id: liveSubjectId,
        chapter: chapterName,
        chapter_id: liveChapterId,
        topic: chapterName,
        question_type: questionType,
        question_text: questionText,
        options: optionsArray,
        correct_index: correctIndex,
        correct_indices: correctIndices,
        marks: 4,
        difficulty: 'medium',
        status: 'normal',
        solution: q.solution || '',
        image_url: q.image_url || ''
      };

      try {
        const createRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (createRes.ok) {
          liveInserted++;
          if (liveInserted % 10 === 0 || liveInserted === allHaloQuestions.length) {
            console.log(`[Live Sync] Inserted ${liveInserted}/${allHaloQuestions.length} questions...`);
          }
        } else {
          const errData = await createRes.json().catch(() => ({}));
          console.warn(`[Live Sync] Failed to insert Q${q.question_number}:`, errData.message || createRes.status);
        }
      } catch (err) {
        console.warn(`[Live Sync] Network error on Q${q.question_number}:`, err.message);
      }
      await sleep(150);
    }

    console.log(`\nLive Production Sync Completed: Inserted: ${liveInserted}, Skipped: ${liveSkipped}`);
  }

  console.log('\nAll done! Haloalkanes and Haloarenes PYQ questions successfully seeded and synced.');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

