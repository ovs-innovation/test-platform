import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), 'utf8'));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log(`Loaded ${questionsData.length} clean Electrostatics questions.`);
  const client = await pool.connect();

  try {
    console.log('\n=== STEP 1: BEGIN TRANSACTION ===');
    await client.query('BEGIN');

    console.log('Deleting existing bad JEE Electrostatics questions from question_bank...');
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE chapter ILIKE 'Electrostatics' AND exam_type = 'JEE'
    `);
    console.log(`Deleted ${delRes.rowCount} old rows.`);

    console.log('\n=== STEP 2: SEQUENTIAL INSERTION OF 300 PRISTINE QUESTIONS ===');
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
        198,                                                                          // $12 chapter_id (Electrostatics)
        q.difficulty || 'medium',                                                     // $13 difficulty
        q.solution || null,                                                           // $14 solution
        q.image_url || '',                                                            // $15 image_url
        isNumeric ? Number(q.numeric_answer) : null,                                  // $16 numeric_answer
        0,                                                                            // $17 numerical_tolerance
        null,                                                                         // $18 assertion_text
        null,                                                                         // $19 reason_text
        'Physics',                                                                    // $20 subject
        'Electrostatics',                                                             // $21 topic
        '',                                                                           // $22 solution_image_url
        'Electrostatics',                                                             // $23 chapter
        'active',                                                                     // $24 status
        'JEE'                                                                         // $25 exam_type
      ];

      await client.query(insertSql, values);
      insertedCount++;
      if (insertedCount % 50 === 0 || insertedCount === questionsData.length) {
        console.log(`Inserted ${insertedCount} / ${questionsData.length} questions sequentially.`);
      }
    }

    console.log('\n=== STEP 3: COMMIT TRANSACTION ===');
    await client.query('COMMIT');
    console.log('Transaction committed successfully!');

    // Verification
    console.log('\n=== STEP 4: VERIFYING INSERTED DATA IN NEON DB ===');
    const verifyRes = await client.query(`
      SELECT id, question_text, options, question_type, correct_index, numeric_answer, image_url 
      FROM question_bank 
      WHERE chapter ILIKE 'Electrostatics' AND exam_type = 'JEE'
      ORDER BY id ASC
    `);

    console.log(`Total rows in DB: ${verifyRes.rows.length}`);
    console.log('\nFirst 5 verified questions in DB:');
    verifyRes.rows.slice(0, 5).forEach((r, idx) => {
      console.log(`\n[DB Q#${idx + 1}] ID: ${r.id}, Type: ${r.question_type}, Diag: ${r.image_url || 'NONE'}`);
      console.log(`Statement: ${r.question_text}`);
      console.log(`Options:`, r.options);
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error occurred, transaction rolled back:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
