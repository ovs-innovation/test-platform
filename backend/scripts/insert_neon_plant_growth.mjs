import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const questions = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_all_questions.json', 'utf8'));

const NEON_SUBJECT_ID = 15;
const NEON_CHAPTER_ID = 169;
const CHAPTER_NAME = 'Plant Growth and Development';

async function main() {
  console.log(`Checking existing count in Neon DB...`);
  const existingNeon = await query(`
    SELECT count(*) as total FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log(`Neon DB currently has ${existingNeon.rows[0].total} questions.`);

  if (parseInt(existingNeon.rows[0].total) > 0) {
    console.log(`Cleaning partial Neon DB records for clean insertion...`);
    await query(`
      DELETE FROM question_bank
      WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
    `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  }

  console.log(`Inserting ${questions.length} questions into Neon DB...`);
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

  const finalCheck = await query(`
    SELECT count(*) as total, count(*) filter (where image_url != '') as with_images
    FROM question_bank
    WHERE category = 'PYQ' AND (chapter_id = $1 OR chapter = $2)
  `, [NEON_CHAPTER_ID, CHAPTER_NAME]);
  console.log('Neon DB Final Count:', finalCheck.rows[0]);

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

