import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_all_questions.json', 'utf8'));

// Target IDs
const LIVE_SUBJECT_ID = 10;
const LIVE_CHAPTER_ID = 216;
const NEON_SUBJECT_ID = 15;
const NEON_CHAPTER_ID = 130;
const CHAPTER_NAME = 'Principles of Inheritance and Variation';

async function main() {
  console.log(`\n======================================================`);
  console.log(`Starting Upload of ${questions.length} Questions for:`);
  console.log(`Chapter: ${CHAPTER_NAME}`);
  console.log(`Live Subject ID: ${LIVE_SUBJECT_ID}, Chapter ID: ${LIVE_CHAPTER_ID}`);
  console.log(`Neon Subject ID: ${NEON_SUBJECT_ID}, Chapter ID: ${NEON_CHAPTER_ID}`);
  console.log(`======================================================\n`);

  // 1. Live Server Check
  console.log('Logging into Live Server to check existing count...');
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

  const checkLiveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Principles%20of%20Inheritance%20and%20Variation&skip_cache=true`, {
    headers: liveHeaders
  });
  const checkLiveData = await checkLiveRes.json();
  const existingLiveCount = checkLiveData.questions?.length || 0;
  console.log(`Live Server currently has ${existingLiveCount} questions for ${CHAPTER_NAME}.`);

  if (existingLiveCount < questions.length) {
    console.log(`Uploading missing questions to Live Server...`);
    const liveTexts = new Set((checkLiveData.questions || []).map(q => q.question_text.trim()));
    let uploadedCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (liveTexts.has(q.question_text.trim())) continue;

      const payload = {
        category: 'PYQ',
        subject: 'Botany',
        subject_id: LIVE_SUBJECT_ID,
        chapter: CHAPTER_NAME,
        chapter_id: LIVE_CHAPTER_ID,
        topic: CHAPTER_NAME,
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: [q.correct_index],
        explanation: q.explanation || '',
        difficulty: q.difficulty || 'medium',
        marks: q.marks || 4,
        image_url: q.image_url || ''
      };

      try {
        const res = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: liveHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          uploadedCount++;
          if (uploadedCount % 25 === 0 || uploadedCount === questions.length) {
            console.log(`[Live Server] Uploaded ${uploadedCount} missing questions...`);
          }
        }
      } catch (err) {
        console.error(`[Live Server] Error on Q #${q._source_num}:`, err.message);
      }
    }
    console.log(`[Live Server] Finished uploading ${uploadedCount} missing questions.\n`);
  } else {
    console.log(`[Live Server] All ${questions.length} questions already present on Live Server!\n`);
  }

  // 2. Upload to Neon DB
  console.log(`Checking existing count in Neon DB...`);
  const existingNeon = await query(`
    SELECT count(*) as total FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log(`Neon DB currently has ${existingNeon.rows[0].total} questions.`);

  if (parseInt(existingNeon.rows[0].total) < questions.length) {
    if (parseInt(existingNeon.rows[0].total) > 0) {
      console.log(`Cleaning partial Neon DB records for clean re-insertion...`);
      await query(`
        DELETE FROM question_bank
        WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
      `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
    }

    console.log(`Inserting ${questions.length} questions into Neon DB question_bank...`);
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
          CHAPTER_NAME,
          q.question_type || 'mcq',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          q.marks || 4,
          q.difficulty || 'medium',
          q.explanation || '',
          q.image_url || '',
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
  } else {
    console.log(`[Neon DB] All ${questions.length} questions already present in Neon DB!\n`);
  }

  // 3. Final verification
  console.log(`Running Final Verification...`);
  const finalNeon = await query(`
    SELECT count(*) as total, count(*) filter (where image_url != '') as with_images
    FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log('Neon DB Final Count:', finalNeon.rows[0]);

  // Check Live Server final count
  const finalLiveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Principles%20of%20Inheritance%20and%20Variation&skip_cache=true`, {
    headers: liveHeaders
  });
  const finalLiveData = await finalLiveRes.json();
  console.log('Live Server Final Count:', finalLiveData.questions?.length || 0);

  console.log(`======================================================`);
  console.log(`Principles of Inheritance and Variation Upload Process Complete!`);
  console.log(`======================================================\n`);

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});

