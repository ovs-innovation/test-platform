import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_THERMO_QUESTIONS } from './thermo_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedThermoToNeon() {
  console.log('=== SEEDING THERMODYNAMICS (JEE) TO NEON DATABASE ===');
  const client = await pool.connect();
  try {
    const subjectId = 10; // Chemistry
    const chapterId = 22; // Thermodynamics
    const chapterName = 'Thermodynamics';
    console.log(`Neon Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Chapter: "${chapterName}"`);

    // Delete any previous JEE questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE 'Thermodynamics' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous JEE Thermodynamics questions from Neon question_bank.`);

    console.log(`Inserting ${ALL_THERMO_QUESTIONS.length} questions into question_bank...`);
    let inserted = 0;

    for (const q of ALL_THERMO_QUESTIONS) {
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
        q.solution || null,
        'JEE',
        'active'
      ]);
      inserted++;
    }

    console.log(`Successfully inserted ${inserted} questions into Neon question_bank.`);

    // Verify row count in Neon
    const countRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND chapter_id = $1",
      [chapterId]
    );
    console.log(`Verified Neon count for Thermodynamics (JEE): ${countRes.rows[0].count}`);

    if (Number(countRes.rows[0].count) === ALL_THERMO_QUESTIONS.length) {
      console.log('🎉 NEON DATABASE SEEDING VERIFIED: Exactly 245 questions in question_bank! 🎉');
    } else {
      console.error(`Count mismatch: expected ${ALL_THERMO_QUESTIONS.length}, got ${countRes.rows[0].count}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Error seeding to Neon:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedThermoToNeon();
