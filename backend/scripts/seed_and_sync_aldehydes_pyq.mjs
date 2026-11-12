import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { allAldehydesQuestions } from './aldehydes_pyq_questions_data.mjs';

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
  console.log(`  SEED & SYNC: Aldehydes, Ketones and Carboxylic Acids PYQ (${allAldehydesQuestions.length} Questions)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. NEON DB SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding Neon Database ---');
  const client = await pool.connect();
  let localChapterId;
  const chapterName = 'Aldehydes, Ketones and Carboxylic Acids';
  const localSubjectId = 10; // Chemistry in DB

  try {
    // Find or create chapter in Neon DB
    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (LOWER(name) LIKE '%aldehyde%' OR LOWER(name) LIKE '%carboxylic%')",
      [localSubjectId]
    );

    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
      console.log(`Found existing chapter in Neon DB: ID ${localChapterId} (${chapRes.rows[0].name})`);
      await client.query("UPDATE chapters SET name = $1 WHERE id = $2", [chapterName, localChapterId]);
      console.log(`Updated chapter ID ${localChapterId} name to '${chapterName}'`);
    } else {
      const insertChapRes = await client.query(
        "INSERT INTO chapters (subject_id, name, created_at) VALUES ($1, $2, NOW()) RETURNING id",
        [localSubjectId, chapterName]
      );
      localChapterId = insertChapRes.rows[0].id;
      console.log(`Created new chapter in Neon DB: ID ${localChapterId} (${chapterName})`);
    }

    // Clean up any previously inserted PYQ questions for this chapter
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = LOWER($2) OR LOWER(chapter) LIKE '%aldehyde%')",
      [localChapterId, chapterName]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous PYQ questions from Neon DB.`);

    let dbInserted = 0;
    for (const q of allAldehydesQuestions) {
      const questionText = (q.question_text || '').trim();
      const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
      const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx, q));

      const rawOpt = (q.correct_option || 'A').trim().toUpperCase();
      const correctIndex = rawOpt.charCodeAt(0) - 65;
      const correctIndices = [correctIndex];
      const questionType = 'single_choice';

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
    let liveChapterId = 33; // Aldehydes Ketones and Carboxylic Acids on Live API
    const liveChapterName = 'Aldehydes, Ketones and Carboxylic Acids';

    // Verify Live Chapter
    const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (liveChRes.ok) {
      const chData = await liveChRes.json();
      const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
      const matched = chList.find(c =>
        (c.name || '').trim().toLowerCase() === liveChapterName.toLowerCase() ||
        (c.name || '').trim().toLowerCase().includes('aldehyde') ||
        (c.name || '').trim().toLowerCase() === 'aldehydes ketones and carboxylic acids'
      );
      if (matched) {
        liveChapterId = matched.id;
        console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
      }
    }

    let liveInserted = 0;
    let liveSkipped = 0;

    for (const q of allAldehydesQuestions) {
      const questionText = (q.question_text || '').trim();
      const rawOpt = (q.correct_option || 'A').trim().toUpperCase();
      const correctIndex = rawOpt.charCodeAt(0) - 65;
      const correctIndices = [correctIndex];
      const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
      const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx, q));
      const questionType = 'single_choice';

      const payload = {
        category: 'PYQ',
        subject: 'Chemistry',
        subject_id: liveSubjectId,
        chapter: liveChapterName,
        chapter_id: liveChapterId,
        topic: liveChapterName,
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
          if (liveInserted % 20 === 0 || liveInserted === allAldehydesQuestions.length) {
            console.log(`[Live Sync] Inserted ${liveInserted}/${allAldehydesQuestions.length} questions...`);
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

  console.log('\nAll done! Aldehydes, Ketones and Carboxylic Acids PYQ questions successfully seeded and synced.');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
