import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION_IN_PLANE_QUESTIONS } from './plane_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

function formatOption(opt) {
  if (typeof opt !== 'string') return opt;
  let trimmed = opt.trim();
  if (trimmed.includes('$') || trimmed.includes('\\(')) return trimmed;
  return trimmed;
}

async function run() {
  const duplicateQNums = [58, 64, 68];
  const localSubjectId = 11;
  const localChapterId = 135;

  for (const qNum of duplicateQNums) {
    const q = MOTION_IN_PLANE_QUESTIONS.find(item => item.qNum === qNum);
    const questionText = q.question.trim();
    const optionsArray = q.options.map((optText, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: formatOption(optText)
    }));

    await pool.query(
      `INSERT INTO question_bank (
        question_type, question_text, options, correct_index, correct_indices,
        marks, difficulty, category, status, solution, image_url,
        subject_id, subject, chapter_id, chapter, topic, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())`,
      [
        'mcq',
        questionText,
        JSON.stringify(optionsArray),
        q.correct_option,
        JSON.stringify([q.correct_option]),
        4,
        'medium',
        'PYQ',
        'available',
        q.solution,
        q.image_url || null,
        localSubjectId,
        'Physics',
        localChapterId,
        'motion in a plane',
        'Motion in a Plane'
      ]
    );
    console.log(`Inserted duplicate Q${qNum} into Local DB.`);
  }

  const count = await pool.query(
    "SELECT count(*) FROM question_bank WHERE chapter_id = 135 AND category = 'PYQ'"
  );
  console.log(`Updated Local DB count in chapter 135: ${count.rows[0].count} / 75`);

  await pool.end();
}

run().catch(console.error);

