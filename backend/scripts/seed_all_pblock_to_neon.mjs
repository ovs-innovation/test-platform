import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_PBLOCK_JEE_PYQ_QUESTIONS } from './pblock_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seedPBlockToNeon() {
  console.log('=== SEEDING P-BLOCK (GR. 13 & 14) TO NEON DATABASE ===');
  const client = await pool.connect();
  try {
    // 1. Verify subject_id and chapter_id
    const subRes = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry' LIMIT 1");
    const subjectId = subRes.rows[0]?.id || 10;

    let chRes = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND (name ILIKE '%p-block%13%' OR name ILIKE '%p-Block Elements (Gr. 13 & 14)%') LIMIT 1", [subjectId]);
    let chapterId = chRes.rows[0]?.id || 166;
    const chapterName = 'The p-Block Elements (Gr. 13 & 14)';
    console.log(`Resolved Neon Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: ${chapterName}`);

    // 2. Remove any previous questions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%p-block%' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous JEE p-block questions from question_bank.`);

    // 3. Insert all 96 verified questions
    console.log(`Inserting ${ALL_PBLOCK_JEE_PYQ_QUESTIONS.length} questions into question_bank...`);
    let inserted = 0;

    for (const q of ALL_PBLOCK_JEE_PYQ_QUESTIONS) {
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
          solution,
          exam_type,
          status
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
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
        q.solution || '',
        'JEE',
        'available'
      ]);

      inserted++;
    }

    console.log(`Successfully inserted ${inserted} / ${ALL_PBLOCK_JEE_PYQ_QUESTIONS.length} questions into Neon.`);

    // 4. Verification
    const countRes = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND category = 'Chemistry'");
    console.log(`Verified total JEE Chemistry questions in Neon: ${countRes.rows[0].count}`);

    const chCountRes = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND chapter_id = $1", [chapterId]);
    console.log(`Verified p-Block Elements (Gr. 13 & 14) questions in Neon: ${chCountRes.rows[0].count}`);

  } finally {
    client.release();
    await pool.end();
  }
}

seedPBlockToNeon().catch(console.error);
