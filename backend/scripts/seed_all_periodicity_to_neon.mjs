import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_PERIODICITY_QUESTIONS } from './periodicity_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedPeriodicityToNeon() {
  console.log('=== SEEDING PERIODICITY (JEE) TO NEON DATABASE ===');
  const client = await pool.connect();
  try {
    const subjectId = 10; // Chemistry
    const chapterId = 155; // Periodic Table and Periodicity
    const chapterName = 'Classification of Elements and Periodicity in Properties';
    console.log(`Neon Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Chapter: "${chapterName}"`);

    // Delete any previous JEE questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%classification of elements%' OR chapter ILIKE '%periodicity%' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous JEE periodicity questions from Neon question_bank.`);

    console.log(`Inserting ${ALL_PERIODICITY_QUESTIONS.length} questions into question_bank...`);
    let inserted = 0;

    for (const q of ALL_PERIODICITY_QUESTIONS) {
      const isNum = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);

      let optionsPayload;
      let correctIndexPayload;
      let correctIndicesPayload;
      let numericAnswerPayload;

      if (isNum) {
        optionsPayload = [];
        correctIndexPayload = null;
        correctIndicesPayload = [];
        numericAnswerPayload = Number(q.numeric_answer);
      } else {
        optionsPayload = (q.options || []).map((t, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx] || String(idx),
          text: String(t).trim()
        }));
        correctIndexPayload = q.correct_option !== undefined && q.correct_option !== null ? Number(q.correct_option) : 0;
        correctIndicesPayload = [correctIndexPayload];
        numericAnswerPayload = null;
      }

      await client.query(`
        INSERT INTO question_bank (
          category,
          subject,
          subject_id,
          chapter,
          chapter_id,
          topic,
          question_type,
          question_text,
          options,
          correct_index,
          correct_indices,
          numeric_answer,
          numerical_tolerance,
          marks,
          difficulty,
          image_url,
          solution_image_url,
          solution,
          exam_type,
          status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
        )
      `, [
        'Chemistry',
        'Chemistry',
        subjectId,
        chapterName,
        chapterId,
        chapterName,
        isNum ? 'numerical' : 'mcq',
        q.question_text || q.question,
        JSON.stringify(optionsPayload),
        correctIndexPayload,
        JSON.stringify(correctIndicesPayload),
        numericAnswerPayload,
        0,
        q.marks || 4,
        q.difficulty || 'medium',
        q.image_url || null,
        q.solution_image_url || null,
        q.solution || '',
        'JEE',
        'active'
      ]);

      inserted++;
    }

    console.log(`Successfully inserted ${inserted} questions into Neon.`);

    // Verification
    const countRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND subject_id = $1 AND chapter_id = $2",
      [subjectId, chapterId]
    );
    console.log(`Neon verification count for JEE Chapter ${chapterId}: ${countRes.rows[0].count}`);

  } finally {
    client.release();
    await pool.end();
  }
}

seedPeriodicityToNeon().catch(err => {
  console.error('Error seeding to Neon:', err);
  process.exit(1);
});
