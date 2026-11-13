import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const rawQuestions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_all_questions.json'), 'utf8'));
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const LIVE_SUBJECT_ID = 2;
const LIVE_CHAPTER_ID = 212;
const NEON_SUBJECT_ID = 13;
const NEON_CHAPTER_ID = 214;
const CHAPTER_NAME = 'Evolution';

async function main() {
  const q189 = rawQuestions.find(q => q.num === 189);
  console.log('Found Q189:', q189);

  // 1. Upload to Live Server
  console.log('Logging into Live Server...');
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

  const payload = {
    category: 'PYQ',
    subject: 'Zoology',
    subject_id: LIVE_SUBJECT_ID,
    chapter: CHAPTER_NAME,
    chapter_id: LIVE_CHAPTER_ID,
    topic: CHAPTER_NAME,
    question_type: 'mcq',
    question_text: q189.question,
    options: q189.options.map(o => o.text),
    correct_index: 2, // 'C'
    correct_indices: [2, 3], // 'C', 'D'
    explanation: q189.explanation,
    difficulty: 'medium',
    marks: 4,
    image_url: ''
  };

  console.log('Uploading Q189 to Live Server...');
  const res = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: liveHeaders,
    body: JSON.stringify(payload)
  });
  console.log('Live Server status:', res.status, await res.text());

  // 2. Upload to Neon DB
  console.log('Inserting Q189 into Neon DB...');
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
    'mcq',
    q189.question,
    JSON.stringify(q189.options.map(o => o.text)),
    2,
    JSON.stringify([2, 3]),
    4,
    'medium',
    q189.explanation,
    '',
    'available'
  ]);
  console.log('Neon DB inserted Q189 successfully!');

  // Check final count
  const finalCheck = await pool.query(`
    SELECT 
      count(*) as total,
      count(*) filter (where image_url is not null and image_url != '') as with_images
    FROM question_bank
    WHERE subject = 'Zoology' 
      AND (chapter = $1 OR chapter_id = $2)
      AND category = 'PYQ'
  `, [CHAPTER_NAME, NEON_CHAPTER_ID]);
  console.log('Neon DB final check:', finalCheck.rows[0]);

  // Update upload_evolution_pyq.mjs for future reproducibility
  const mainScriptPath = path.resolve(__dirname, 'upload_evolution_pyq.mjs');
  let mainScriptContent = fs.readFileSync(mainScriptPath, 'utf8');
  mainScriptContent = mainScriptContent.replace("question_type: keys.length > 1 ? 'multiple_choice' : 'mcq',", "question_type: 'mcq',");
  fs.writeFileSync(mainScriptPath, mainScriptContent);
  console.log('Updated upload_evolution_pyq.mjs with question_type: mcq');

  await pool.end();
}

main().catch(console.error);
