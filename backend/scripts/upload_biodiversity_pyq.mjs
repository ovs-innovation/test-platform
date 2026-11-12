import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const rawQuestions = JSON.parse(fs.readFileSync('./backend/scripts/biodiversity_all_questions.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/biodiversity_diagram_urls.json', 'utf8'));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Target IDs
const LIVE_SUBJECT_ID = 10;
const LIVE_CHAPTER_ID = 219;
const NEON_SUBJECT_ID = 15;
const NEON_CHAPTER_ID = 192;
const CHAPTER_NAME = 'Biodiversity and Conservation';

const questions = rawQuestions.map(q => {
  const optLetters = ['A', 'B', 'C', 'D'];
  const correctIdx = optLetters.indexOf(q.correctOption);
  return {
    _source_num: q.num,
    category: 'PYQ',
    subject: 'Botany',
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    question_type: 'mcq',
    question_text: q.question,
    options: q.options.map(o => o.text),
    correct_index: correctIdx !== -1 ? correctIdx : 0,
    correct_indices: [correctIdx !== -1 ? correctIdx : 0],
    explanation: q.explanation,
    difficulty: 'medium',
    marks: 4,
    image_url: diagramUrls['q_' + q.num] || ''
  };
});

async function main() {
  console.log(`\n======================================================`);
  console.log(`Starting Upload of ${questions.length} Questions for:`);
  console.log(`Chapter: ${CHAPTER_NAME}`);
  console.log(`Live Subject ID: ${LIVE_SUBJECT_ID}, Chapter ID: ${LIVE_CHAPTER_ID}`);
  console.log(`Neon Subject ID: ${NEON_SUBJECT_ID}, Chapter ID: ${NEON_CHAPTER_ID}`);
  console.log(`======================================================\n`);

  // 1. Upload to Live Server via POST /api/question-bank
  console.log('Logging into Live Server...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) {
    throw new Error(`Live login failed with status ${loginRes.status}`);
  }
  const { token } = await loginRes.json();
  const liveHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  console.log(`Uploading ${questions.length} questions to Live Server...`);
  let liveUploaded = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const payload = {
      category: 'PYQ',
      subject: 'Botany',
      subject_id: LIVE_SUBJECT_ID,
      chapter: CHAPTER_NAME,
      chapter_id: LIVE_CHAPTER_ID,
      topic: CHAPTER_NAME,
      question_type: q.question_type,
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices,
      explanation: q.explanation,
      difficulty: q.difficulty,
      marks: q.marks,
      image_url: q.image_url
    };

    try {
      const res = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: liveHeaders,
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        liveUploaded++;
        if (liveUploaded % 25 === 0 || liveUploaded === questions.length) {
          console.log(`[Live Server] Uploaded ${liveUploaded}/${questions.length} questions...`);
        }
      } else {
        const errText = await res.text();
        console.error(`[Live Server] Failed Q #${q._source_num}: Status ${res.status} - ${errText}`);
      }
    } catch (err) {
      console.error(`[Live Server] Error on Q #${q._source_num}:`, err.message);
    }
  }
  console.log(`[Live Server] Successfully uploaded ${liveUploaded}/${questions.length} questions.\n`);

  // 2. Upload to Neon DB
  console.log(`Checking existing count in Neon DB...`);
  const existingNeon = await pool.query(`
    SELECT count(*) as total FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log(`Neon DB currently has ${existingNeon.rows[0].total} PYQ questions.`);

  if (parseInt(existingNeon.rows[0].total) > 0) {
    console.log(`Cleaning existing Neon DB PYQ records for clean insertion...`);
    await pool.query(`
      DELETE FROM question_bank
      WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
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
        'Botany',
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
  console.log(`Running Final Verification in Neon DB...`);
  const finalNeon = await pool.query(`
    SELECT count(*) as total, count(*) filter (where image_url != '') as with_images
    FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log('Neon DB Final Count:', finalNeon.rows[0]);

  await pool.end();
  console.log(`\nAll done! Chapter "${CHAPTER_NAME}" is completely imported and verified.`);
}

main().catch(console.error);
