import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_jee_final_191.json'), 'utf8'));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log(`Loaded ${questionsData.length} clean Wave Optics questions for Neon DB.`);
  const client = await pool.connect();

  try {
    console.log('\n=== STEP 1: BEGIN TRANSACTION ===');
    await client.query('BEGIN');

    console.log('Checking existing questions before deletion...');
    const preCheck = await client.query(`
      SELECT exam_type, count(*) 
      FROM question_bank 
      WHERE (chapter ILIKE 'Wave Optics' OR chapter_id = 201)
      GROUP BY exam_type
    `);
    console.log('Existing questions in Wave Optics:', preCheck.rows);

    console.log('Deleting existing JEE Wave Optics questions (strictly preserving NEET questions)...');
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE (chapter ILIKE 'Wave Optics' OR chapter_id = 201) AND exam_type = 'JEE'
    `);
    console.log(`Deleted ${delRes.rowCount} old JEE rows.`);

    console.log('\n=== STEP 2: SEQUENTIAL INSERTION OF 191 PRISTINE QUESTIONS ===');
    const insertSql = `
      INSERT INTO question_bank (
        category,
        question_type,
        question_text,
        options,
        correct_index,
        correct_indices,
        marks,
        starter_code,
        test_cases,
        language,
        created_at,
        subject_id,
        chapter_id,
        difficulty,
        solution,
        image_url,
        numeric_answer,
        numerical_tolerance,
        assertion_text,
        reason_text,
        subject,
        topic,
        solution_image_url,
        chapter,
        status,
        exam_type
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        NOW(), $11, $12, $13, $14, $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24, $25
      ) RETURNING id;
    `;

    let insertedCount = 0;
    for (let i = 0; i < questionsData.length; i++) {
      const q = questionsData[i];
      const isNumeric = q.question_type === 'numerical';

      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const values = [
        'Physics',                                                                    // $1 category
        isNumeric ? 'numerical' : 'mcq',                                              // $2 question_type
        q.question_text,                                                              // $3 question_text
        JSON.stringify(formattedOptions),                                             // $4 options
        isNumeric ? null : (q.correct_index !== null ? Number(q.correct_index) : 0),  // $5 correct_index
        JSON.stringify(isNumeric ? [] : [q.correct_index !== null ? Number(q.correct_index) : 0]), // $6 correct_indices
        4,                                                                            // $7 marks
        '',                                                                           // $8 starter_code
        JSON.stringify([]),                                                           // $9 test_cases
        'javascript',                                                                 // $10 language
        11,                                                                           // $11 subject_id (Physics)
        201,                                                                          // $12 chapter_id (Wave Optics in Neon)
        q.difficulty || 'medium',                                                     // $13 difficulty
        q.solution || null,                                                           // $14 solution
        q.image_url || '',                                                            // $15 image_url
        isNumeric ? Number(q.numeric_answer) : null,                                  // $16 numeric_answer
        0,                                                                            // $17 numerical_tolerance
        null,                                                                         // $18 assertion_text
        null,                                                                         // $19 reason_text
        'Physics',                                                                    // $20 subject
        'Wave Optics',                                                                // $21 topic
        '',                                                                           // $22 solution_image_url
        'Wave Optics',                                                                // $23 chapter
        'active',                                                                     // $24 status
        'JEE'                                                                         // $25 exam_type
      ];

      await client.query(insertSql, values);
      insertedCount++;
      if (insertedCount % 25 === 0 || insertedCount === questionsData.length) {
        console.log(`Inserted ${insertedCount} / ${questionsData.length} questions into Neon DB...`);
      }
    }

    console.log('\n=== STEP 3: COMMIT TRANSACTION ===');
    await client.query('COMMIT');
    console.log(`SUCCESS! Inserted ${insertedCount} questions into Neon DB.`);

    // Verify final counts
    const verifyRes = await client.query(`
      SELECT exam_type, count(*) 
      FROM question_bank 
      WHERE (chapter ILIKE 'Wave Optics' OR chapter_id = 201)
      GROUP BY exam_type
    `);
    console.log('\nFinal question counts in Neon DB:', verifyRes.rows);

  } catch (err) {
    console.error('Rolling back transaction due to error:', err);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
