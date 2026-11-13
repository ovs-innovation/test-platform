import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const rawQuestions = JSON.parse(fs.readFileSync('./backend/scripts/molecular_all_questions.json', 'utf8'));
const q255 = rawQuestions.find(q => q.num === 255);

async function fixQ255() {
  console.log('Fixing Q255...');
  const payload = {
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 10,
    chapter: 'Molecular Basis of Inheritance',
    chapter_id: 217,
    topic: 'Molecular Basis of Inheritance',
    question_type: 'mcq',
    question_text: q255.question,
    options: q255.options.map(o => o.text),
    correct_index: 2,
    correct_indices: [2, 3],
    explanation: q255.explanation,
    difficulty: 'medium',
    marks: 4,
    image_url: ''
  };

  // 1. Live server
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const liveRes = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  console.log('Live server Q255 status:', liveRes.status);

  // 2. Neon DB
  await pool.query(`
    INSERT INTO question_bank (
      category, subject, subject_id, chapter, chapter_id, topic,
      question_type, question_text, options, correct_index, correct_indices,
      marks, difficulty, solution, image_url, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
  `, [
    'PYQ',
    'Botany',
    15,
    'Molecular Basis of Inheritance',
    209,
    'Molecular Basis of Inheritance',
    'mcq',
    payload.question_text,
    JSON.stringify(payload.options),
    payload.correct_index,
    JSON.stringify(payload.correct_indices),
    payload.marks,
    payload.difficulty,
    payload.explanation,
    '',
    'available'
  ]);
  console.log('Neon DB inserted Q255 successfully.');

  // Final count in Neon DB
  const finalNeon = await pool.query(`
    SELECT count(*) as total, count(*) filter (where image_url != '') as with_images
    FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = 209 OR chapter = 'Molecular Basis of Inheritance')
  `);
  console.log('Neon DB Final Count for Molecular Basis of Inheritance:', finalNeon.rows[0]);

  await pool.end();
}

fixQ255().catch(console.error);

