import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_BASIC_CHEM_QUESTIONS } from './basic_chem_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedBasicChemToNeon() {
  console.log('=== SEEDING SOME BASIC CONCEPTS OF CHEMISTRY (JEE) TO NEON DATABASE ===');
  const client = await pool.connect();
  try {
    // 1. Verify subject_id and chapter_id
    const subRes = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry' LIMIT 1");
    const subjectId = subRes.rows[0]?.id || 10;

    const chRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND (name ILIKE '%Some Basic Concepts of Chemistry%' OR name ILIKE '%Basic Concept%') LIMIT 1",
      [subjectId]
    );
    let chapterId = chRes.rows[0]?.id || 127;
    const chapterName = chRes.rows[0]?.name || 'Some Basic Concepts of Chemistry';
    console.log(`Resolved Neon Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: ${chapterName}`);

    // 2. Remove any previous questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%Some Basic Concepts of Chemistry%' OR chapter ILIKE '%Basic Concept%' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous JEE Basic Concepts of Chemistry questions from question_bank.`);

    // 3. Insert all 221 verified questions
    console.log(`Inserting ${ALL_BASIC_CHEM_QUESTIONS.length} questions into question_bank...`);
    let inserted = 0;

    for (const q of ALL_BASIC_CHEM_QUESTIONS) {
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
        q.question,
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
      if (inserted % 50 === 0 || inserted === ALL_BASIC_CHEM_QUESTIONS.length) {
        console.log(`Inserted ${inserted}/${ALL_BASIC_CHEM_QUESTIONS.length} questions.`);
      }
    }

    // 4. Verify insertion in Neon
    const countRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%Some Basic Concepts of Chemistry%' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Neon database verification count: ${countRes.rows[0].count} questions.`);
    console.log('Neon database seeding completed successfully!');
  } finally {
    client.release();
    await pool.end();
  }
}

seedBasicChemToNeon().catch(err => {
  console.error('Error during Neon seeding:', err);
  process.exit(1);
});
