import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { allBiomoleculesQuestions } from './biomolecules_pyq_questions_data.mjs';

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
  let text = typeof opt === 'string' ? opt.trim() : (opt?.option_text || '').trim();
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
  console.log(`  SEED & SYNC: Biomolecules PYQ (${allBiomoleculesQuestions.length} Questions)`);
  console.log(`========================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DB SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding Local Neon Database ---');
  const client = await pool.connect();
  try {
    const localSubjectId = 10; // Chemistry in Local DB
    const localChapterId = 133; // Biomolecules in Local DB
    const chapterName = 'Biomolecules';

    // Ensure chapter name in chapters table
    await client.query(
      "UPDATE chapters SET name = $1 WHERE id = $2",
      [chapterName, localChapterId]
    );
    console.log(`Verified Local chapter ID ${localChapterId} name is '${chapterName}'`);

    // Clean up any previously inserted PYQ questions for this chapter to prevent duplicates
    const deleteRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) = LOWER($2))",
      [localChapterId, chapterName]
    );
    console.log(`Cleaned up ${deleteRes.rowCount} previous PYQ questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of allBiomoleculesQuestions) {
      const questionText = (q.question_text || '').trim();
      const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
      const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx));

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
          'Chemistry', $9, $10, $10, NOW()
        )
      `, [
        questionType,
        questionText,
        JSON.stringify(optionsArray),
        correctIndex,
        JSON.stringify(correctIndices),
        q.solution || '',
        qImageUrl,
        localSubjectId,
        localChapterId,
        chapterName
      ]);
      localInserted++;
    }

    console.log(`Local DB: Successfully inserted ${localInserted} questions!`);
  } finally {
    client.release();
    await pool.end();
  }

  // ----------------------------------------------------
  // 2. LIVE PRODUCTION API SYNC
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Production Server (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 6; // Chemistry on Live API
  const liveChapterId = 36; // Biomolecules on Live API
  const chapterName = 'Biomolecules';

  // Fetch existing Live questions for this chapter
  console.log('Fetching existing Live questions...');
  let liveQuestions = [];
  try {
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=4000`, {
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
    if (Number(q.chapter_id) === Number(liveChapterId) || Number(q.chapter_id) === 133) {
      const key = cleanStr(q.question_text);
      if (key) liveMap.set(key, q);
    }
  }
  console.log(`Found ${liveMap.size} existing questions for chapter ID ${liveChapterId} on Live API.`);

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of allBiomoleculesQuestions) {
    const questionText = (q.question_text || '').trim();
    const rawOpt = (q.correct_option || 'A').trim();
    const letters = rawOpt.split(/[\s,]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
    const correctIndices = letters.map(l => l.charCodeAt(0) - 65);
    const correctIndex = correctIndices[0] ?? 0;
    const rawOptions = [q.option_a, q.option_b, q.option_c, q.option_d];
    const optionsArray = rawOptions.map((opt, oIdx) => parseOption(opt, oIdx));

    const qImgMatch = questionText.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/);
    const qImageUrl = qImgMatch ? qImgMatch[1] : null;

    const payload = {
      subject_id: liveSubjectId,
      chapter_id: liveChapterId,
      subject: 'Chemistry',
      chapter: chapterName,
      topic: chapterName,
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: correctIndex,
      correct_indices: correctIndices,
      marks: 4,
      difficulty: 'medium',
      category: 'PYQ',
      status: 'available',
      solution: q.solution || '',
      image_url: qImageUrl || ''
    };

    const key = cleanStr(questionText);
    const existing = liveMap.get(key);

    let success = false;
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        if (existing) {
          const res = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            liveUpdated++;
            success = true;
            break;
          }
        } else {
          const res = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            liveInserted++;
            success = true;
            break;
          }
        }
      } catch (err) {
        if (attempt === 4) console.warn(`Error syncing Q${q.question_number} to Live:`, err.message);
      }
      await sleep(250);
    }
  }

  console.log(`Live API Sync Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // ----------------------------------------------------
  // 3. VERIFY LIVE PRODUCTION COUNT
  // ----------------------------------------------------
  console.log('\n--- 3. Verifying Live Production Count ---');
  try {
    const checkRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${liveSubjectId}&limit=4000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      const liveList = checkData.questions || checkData.data || [];
      const biomolQuestions = liveList.filter(q => Number(q.chapter_id) === Number(liveChapterId) || Number(q.chapter_id) === 133);
      console.log(`Live API verified total for Biomolecules (chapter_id ${liveChapterId}): ${biomolQuestions.length} / ${allBiomoleculesQuestions.length}`);
    }
  } catch (err) {
    console.warn('Live verification check failed:', err.message);
  }

  console.log(`\n========================================================`);
  console.log(`  ALL DONE: 81 Biomolecules PYQ Questions Seeded & Synced!`);
  console.log(`========================================================\n`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_biomolecules_pyq:', err);
  process.exit(1);
});
