import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync('./backend/scripts/cell_cycle_all_questions.json', 'utf8'));

// Target IDs
const LIVE_SUBJECT_ID = 10;
const LIVE_CHAPTER_ID = 259;
const NEON_SUBJECT_ID = 15;
const NEON_CHAPTER_ID = 171;
const CHAPTER_NAME = 'Cell Cycle and Cell Division';

async function main() {
  console.log(`\n======================================================`);
  console.log(`Starting Upload of ${questions.length} Questions for:`);
  console.log(`Chapter: ${CHAPTER_NAME}`);
  console.log(`Live Subject ID: ${LIVE_SUBJECT_ID}, Chapter ID: ${LIVE_CHAPTER_ID}`);
  console.log(`Neon Subject ID: ${NEON_SUBJECT_ID}, Chapter ID: ${NEON_CHAPTER_ID}`);
  console.log(`======================================================\n`);

  // 1. Live Server Authentication
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
  console.log('Successfully logged into Live Server.\n');

  // 2. Check existing questions on Live Server to avoid duplicate uploads
  const existingLiveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=${encodeURIComponent(CHAPTER_NAME)}&limit=500`, {
    headers: liveHeaders
  });
  const existingLiveData = await existingLiveRes.json();
  const existingLiveCount = existingLiveData.questions?.length || 0;
  console.log(`Existing questions on Live Server for ${CHAPTER_NAME}: ${existingLiveCount}`);

  // 3. Check existing questions on Neon DB
  const existingNeonRes = await query(`
    SELECT count(*) FROM question_bank 
    WHERE category = 'PYQ' AND (subject_id = $1 OR subject = 'Botany') AND (chapter_id = $2 OR chapter = $3)
  `, [NEON_SUBJECT_ID, NEON_CHAPTER_ID, CHAPTER_NAME]);
  const existingNeonCount = parseInt(existingNeonRes.rows[0].count, 10);
  console.log(`Existing questions on Neon DB for ${CHAPTER_NAME}: ${existingNeonCount}\n`);

  // If already full, report and exit or sync
  if (existingLiveCount >= questions.length && existingNeonCount >= questions.length) {
    console.log(`Both Live Server (${existingLiveCount}) and Neon DB (${existingNeonCount}) already have all questions!`);
    return;
  }

  // Upload to Live Server
  if (existingLiveCount < questions.length) {
    console.log(`Uploading ${questions.length} questions to Live Server...`);
    let liveSuccess = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const payload = {
        category: 'PYQ',
        subject: 'Botany',
        subject_id: LIVE_SUBJECT_ID,
        chapter: CHAPTER_NAME,
        chapter_id: LIVE_CHAPTER_ID,
        question_type: 'mcq',
        question_text: q.text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: q.correct_indices,
        marks: q.marks,
        difficulty: q.difficulty,
        solution: q.solution,
        image_url: q.image_url || '',
        status: 'normal',
        topic: q.topic
      };

      try {
        const res = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: liveHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          liveSuccess++;
          if (liveSuccess % 20 === 0 || liveSuccess === questions.length) {
            console.log(`Live Server Progress: ${liveSuccess}/${questions.length} uploaded.`);
          }
        } else {
          const errText = await res.text();
          console.error(`Live upload failed for Q${q.q_num}:`, res.status, errText.slice(0, 100));
        }
      } catch (err) {
        console.error(`Error uploading Q${q.q_num} to Live:`, err.message);
      }
    }
    console.log(`Live Server Upload Finished: ${liveSuccess}/${questions.length} uploaded.\n`);
  }

  // Upload to Neon DB
  if (existingNeonCount < questions.length) {
    console.log(`Uploading ${questions.length} questions to Neon DB...`);
    let neonSuccess = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      try {
        await query(`
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
          q.topic,
          'mcq',
          q.text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify(q.correct_indices),
          q.marks,
          q.difficulty,
          q.solution,
          q.image_url || '',
          'normal'
        ]);
        neonSuccess++;
        if (neonSuccess % 20 === 0 || neonSuccess === questions.length) {
          console.log(`Neon DB Progress: ${neonSuccess}/${questions.length} inserted.`);
        }
      } catch (err) {
        console.error(`Neon DB insert error for Q${q.q_num}:`, err.message);
      }
    }
    console.log(`Neon DB Upload Finished: ${neonSuccess}/${questions.length} inserted.\n`);
  }

  // 4. Verification
  console.log('=== Final Verification ===');
  const verifyLiveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=${encodeURIComponent(CHAPTER_NAME)}&limit=500`, {
    headers: liveHeaders
  });
  const verifyLiveData = await verifyLiveRes.json();
  console.log(`Verified Live Server Total for ${CHAPTER_NAME}: ${verifyLiveData.questions?.length}`);

  const verifyNeonRes = await query(`
    SELECT count(*) FROM question_bank 
    WHERE category = 'PYQ' AND (subject_id = $1 OR subject = 'Botany') AND (chapter_id = $2 OR chapter = $3)
  `, [NEON_SUBJECT_ID, NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log(`Verified Neon DB Total for ${CHAPTER_NAME}: ${verifyNeonRes.rows[0].count}`);
}

main().catch(console.error);
