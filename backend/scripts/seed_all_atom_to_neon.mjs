import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_ATOM_QUESTIONS } from './atom_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seedAtomToNeon() {
  console.log('=== SEEDING STRUCTURE OF ATOM (JEE) TO NEON DATABASE ===');
  const client = await pool.connect();
  try {
    const subjectId = 10; // Chemistry
    const chapterId = 77; // Structure of Atom
    const chapterName = 'Structure of Atom';
    console.log(`Neon Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Chapter: "${chapterName}"`);

    // Delete any previous JEE questions for Structure of Atom
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%Structure of Atom%' OR chapter ILIKE '%Atomic Structure%' OR chapter_id = $1)",
      [chapterId]
    );
    console.log(`Deleted ${delRes.rowCount} previous JEE Structure of Atom questions from Neon question_bank.`);

    console.log(`Inserting ${ALL_ATOM_QUESTIONS.length} questions into question_bank...`);
    let inserted = 0;

    for (const q of ALL_ATOM_QUESTIONS) {
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
        q.solution || null,
        'JEE',
        'active'
      ]);

      inserted++;
    }

    console.log(`Successfully seeded ${inserted} questions to Neon database.`);

    const checkRes = await client.query(`
      SELECT chapter, count(*) as count 
      FROM question_bank 
      WHERE (subject ILIKE '%chem%' OR category ILIKE '%chem%') AND exam_type = 'JEE'
      GROUP BY chapter
      ORDER BY chapter
    `);
    console.log('Updated Neon Chemistry JEE breakdown:');
    console.table(checkRes.rows);
    const total = checkRes.rows.reduce((sum, r) => sum + parseInt(r.count, 10), 0);
    console.log(`Total Neon Chemistry JEE questions: ${total}`);

  } catch (err) {
    console.error('Neon seeding error:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seedAtomToNeon().catch(err => {
  console.error(err);
  process.exit(1);
});
