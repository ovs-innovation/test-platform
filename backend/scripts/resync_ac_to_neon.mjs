import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const questionsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ac_jee_final_177.json'), 'utf8'));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log(`Loaded ${questionsData.length} clean Alternating Current questions.`);
  const client = await pool.connect();

  try {
    console.log('\n=== STEP 1: INSPECT EXISTING NEON DB ROWS ===');
    const existing = await client.query(`
      SELECT count(*), exam_type, chapter, chapter_id 
      FROM question_bank 
      WHERE chapter_id = 145 OR chapter ILIKE '%Alternating Current%'
      GROUP BY exam_type, chapter, chapter_id
    `);
    console.log('Existing Neon DB rows:', existing.rows);

    console.log('\n=== STEP 2: DELETE ONLY JEE ALTERNATING CURRENT ROWS ===');
    await client.query('BEGIN');

    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE (chapter_id = 145 OR chapter ILIKE '%Alternating Current%') AND exam_type = 'JEE'
    `);
    console.log(`Deleted ${delRes.rowCount} old JEE rows (preserved NEET rows).`);

    console.log('\n=== STEP 3: SEQUENTIAL INSERTION OF 177 PRISTINE QUESTIONS ===');
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

    const keyMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    let insertedCount = 0;
    for (const q of questionsData) {
      const isNumeric = q.question_type === 'numerical';
      const formattedOptions = (q.options || []).map((optText, optIdx) => ({
        key: ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx),
        text: String(optText).trim(),
        image_url: ''
      }));

      const cIdx = isNumeric ? null : (keyMap[q.correct_answer] !== undefined ? keyMap[q.correct_answer] : 0);

      const values = [
        'Physics',
        isNumeric ? 'numerical' : 'mcq',
        q.question,
        JSON.stringify(formattedOptions),
        cIdx,
        JSON.stringify(isNumeric ? [] : [cIdx]),
        4,
        null,
        '[]',
        'plaintext',
        11, // Neon subject_id for Physics
        145, // Neon chapter_id for Alternating Current
        'medium',
        q.explanation || null,
        q.diagram_url || null,
        isNumeric ? Number(q.numeric_answer) : null,
        0,
        null,
        null,
        'Physics',
        'Alternating Current',
        null,
        'Alternating Current',
        'active',
        'JEE'
      ];

      await client.query(insertSql, values);
      insertedCount++;
    }

    await client.query('COMMIT');
    console.log(`Successfully inserted ${insertedCount} questions into Neon DB!`);

    console.log('\n=== STEP 4: VERIFY POST-INSERT COUNTS ===');
    const postRes = await client.query(`
      SELECT count(*), exam_type, chapter, chapter_id 
      FROM question_bank 
      WHERE chapter_id = 145 OR chapter ILIKE '%Alternating Current%'
      GROUP BY exam_type, chapter, chapter_id
    `);
    console.log('Post-insert Neon DB counts:', postRes.rows);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error during Neon sync, rolled back:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Neon sync failed:', err);
  process.exit(1);
});
