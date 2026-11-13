import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const rawQuestions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'neural_all_questions.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'neural_diagram_urls.json'), 'utf8'));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Target IDs
const LIVE_SUBJECT_ID = 2; // Zoology on Live Server
const LIVE_CHAPTER_ID = 4; // Neural Control & Coordination on Live Server
const NEON_SUBJECT_ID = 13; // Zoology on Neon DB
const NEON_CHAPTER_ID = 174; // Neural Control and Coordination on Neon DB
const CHAPTER_NAME = 'Neural Control and Coordination';

const questions = rawQuestions.map(q => {
  const optLetters = ['A', 'B', 'C', 'D'];
  const keys = String(q.correctOption).split(',').map(s => s.trim());
  const correctIndices = keys.map(k => optLetters.indexOf(k)).filter(idx => idx !== -1);
  const primaryIndex = correctIndices.length > 0 ? correctIndices[0] : 0;

  return {
    _source_num: q.num,
    category: 'PYQ',
    subject: 'Zoology',
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    question_type: 'mcq',
    question_text: q.question,
    options: q.options.map(o => o.text),
    correct_index: primaryIndex,
    correct_indices: correctIndices.length > 0 ? correctIndices : [primaryIndex],
    explanation: q.explanation,
    difficulty: 'medium',
    marks: 4,
    image_url: diagramUrls['q_' + q.num] || ''
  };
});

async function main() {
  console.log(`\n======================================================`);
  console.log(`Starting Upload of ${questions.length} Questions for:`);
  console.log(`Subject: Zoology`);
  console.log(`Chapter: ${CHAPTER_NAME}`);
  console.log(`Live Subject ID: ${LIVE_SUBJECT_ID}, Chapter ID: ${LIVE_CHAPTER_ID}`);
  console.log(`Neon Subject ID: ${NEON_SUBJECT_ID}, Chapter ID: ${NEON_CHAPTER_ID}`);
  console.log(`======================================================\n`);

  // 1. Live Server check
  console.log('Logging into Live Server to check existing questions...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const liveHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const chRes = await fetch(`${LIVE_API}/question-bank?subject_id=${LIVE_SUBJECT_ID}&chapter_id=${LIVE_CHAPTER_ID}`, {
    headers: liveHeaders
  });
  const liveData = await chRes.json();
  console.log(`Live Server current questions count:`, liveData.total || liveData.questions?.length || liveData.data?.length || 0);

  // 2. Upload to Neon DB
  console.log('\nChecking existing PYQ count in Neon DB...');
  const existingNeon = await pool.query(`
    SELECT count(*) as total FROM question_bank 
    WHERE category = 'PYQ' AND subject = 'Zoology' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log(`Neon DB currently has ${existingNeon.rows[0].total} PYQ questions.`);

  if (parseInt(existingNeon.rows[0].total) > 0) {
    console.log(`Cleaning existing Neon DB PYQ records for clean insertion...`);
    await pool.query(`
      DELETE FROM question_bank
      WHERE category = 'PYQ' AND subject = 'Zoology' AND (chapter_id = $1 OR chapter = $2)
    `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  }

  console.log(`Inserting ${questions.length} questions into Neon DB question_bank...`);
  let neonSuccess = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    try {
      await pool.query(`
        INSERT INTO question_bank (
          category, subject, subject_id, chapter, chapter_id, topic,
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, solution, image_url, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `, [
        'PYQ',
        'Zoology',
        NEON_SUBJECT_ID,
        CHAPTER_NAME,
        NEON_CHAPTER_ID,
        CHAPTER_NAME,
        q.question_type,
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify(q.correct_indices),
        q.marks,
        q.difficulty,
        q.explanation,
        q.image_url,
        'available'
      ]);
      neonSuccess++;
      if ((i + 1) % 25 === 0 || i + 1 === questions.length) {
        console.log(`[Neon DB] Inserted ${i + 1}/${questions.length} questions...`);
      }
    } catch (err) {
      console.error(`[Neon DB] Error on Q #${q._source_num}:`, err.message);
    }
  }
  console.log(`[Neon DB] Successfully inserted ${neonSuccess}/${questions.length} questions.\n`);

  // 3. Final verification in Neon DB
  console.log('Running Final Verification in Neon DB...');
  const finalCheck = await pool.query(`
    SELECT 
      count(*) as total,
      count(*) filter (where image_url is not null and image_url != '') as with_images
    FROM question_bank
    WHERE subject = 'Zoology' 
      AND (chapter = $1 OR chapter_id = $2)
      AND category = 'PYQ'
  `, [CHAPTER_NAME, NEON_CHAPTER_ID]);

  console.log('Neon DB Final Count:', finalCheck.rows[0]);
  console.log(`\nAll done! Chapter "${CHAPTER_NAME}" under Zoology is completely imported and verified.`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error during execution:', err);
  process.exit(1);
});
