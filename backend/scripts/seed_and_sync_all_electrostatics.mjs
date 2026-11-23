import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

import { ELECTROSTATICS_JEE_QUESTIONS } from './electrostatics_jee_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const NEON_SUBJECT_ID = 11; // Physics
const NEON_CHAPTER_ID = 198; // Electrostatics
const CHAPTER_NAME = 'Electrostatics';

async function seedAllElectrostatics() {
  console.log(`Loaded ${ELECTROSTATICS_JEE_QUESTIONS.length} Electrostatics questions.`);
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    // 1. Ensure chapter 198 name is 'Electrostatics' under subject_id 11
    await client.query("UPDATE chapters SET name = 'Electrostatics' WHERE id = 198");
    console.log('Verified chapter 198 name is "Electrostatics".');

    // 2. Delete any existing JEE questions for chapter Electrostatics
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter = 'Electrostatics' OR chapter_id = 198)"
    );
    console.log(`Deleted ${delRes.rowCount} existing JEE Electrostatics questions.`);

    // 3. Insert all 300 questions in a transaction
    await client.query('BEGIN');

    let inserted = 0;
    for (const q of ELECTROSTATICS_JEE_QUESTIONS) {
      const isNumeric = q.question_type === 'numerical';
      const qType = isNumeric ? 'numerical' : 'mcq';

      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const correctIndex = isNumeric ? 0 : (q.correct_index !== null ? Number(q.correct_index) : 0);
      const correctIndices = isNumeric ? [] : [correctIndex];
      const numericAnswer = isNumeric ? Number(q.numeric_answer) : null;

      const queryText = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, marks, solution,
          subject_id, chapter_id, difficulty, image_url, solution_image_url,
          chapter, topic, subject, status, exam_type
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17, $18, $19, $20
        ) RETURNING id
      `;

      const values = [
        'Physics',
        qType,
        q.question_text,
        JSON.stringify(formattedOptions),
        correctIndex,
        JSON.stringify(correctIndices),
        numericAnswer,
        0,
        4,
        q.solution || '',
        NEON_SUBJECT_ID,
        NEON_CHAPTER_ID,
        q.difficulty || 'medium',
        q.image_url || '',
        q.solution_image_url || '',
        CHAPTER_NAME,
        CHAPTER_NAME,
        'Physics',
        'active',
        'JEE'
      ];

      await client.query(queryText, values);
      inserted++;
    }

    await client.query('COMMIT');
    console.log(`\nSuccessfully inserted all ${inserted} questions into question_bank!`);

    // Verify counts in DB
    const countRes = await client.query(
      "SELECT count(*) as total, count(CASE WHEN image_url != '' THEN 1 END) as with_diag, count(CASE WHEN solution_image_url != '' THEN 1 END) as with_sol_diag, count(CASE WHEN question_type = 'numerical' THEN 1 END) as numerical_count FROM question_bank WHERE exam_type = 'JEE' AND chapter = 'Electrostatics'"
    );
    console.log('Neon DB Verification Stats:', countRes.rows[0]);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transaction failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }

  // Clear live cache
  console.log('\nAuthenticating with live API to clear cache...');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
    });
    const { token } = await loginRes.json();

    const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&refresh=true&limit=1000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const verifyData = await verifyRes.json();
    console.log(`Live API verified question count for Electrostatics: ${verifyData?.questions?.length || 0}`);
  } catch (e) {
    console.log('Cache refresh API call finished with:', e.message);
  }
}

seedAllElectrostatics().catch(console.error);
