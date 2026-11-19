import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT 
        id, question_type, question_text, correct_index, numeric_answer, image_url, solution, category, exam_type, status, chapter_id
      FROM question_bank
      WHERE exam_type = 'JEE' AND chapter_id = 136 AND category = 'Physics'
      ORDER BY id ASC
    `);

    console.log(`Fetched ${res.rows.length} questions from DB for chapter 136.`);

    let mcqs = 0;
    let numericals = 0;
    let withDiagrams = 0;

    for (const row of res.rows) {
      if (row.question_type === 'mcq') {
        mcqs++;
        if (row.correct_index === null || row.correct_index === undefined) {
          console.error(`ID ${row.id}: Missing correct_index for MCQ!`);
        }
      } else if (row.question_type === 'numerical') {
        numericals++;
        if (row.numeric_answer === null || row.numeric_answer === undefined) {
          console.error(`ID ${row.id}: Missing numeric_answer!`);
        }
      }
      if (row.image_url) {
        withDiagrams++;
      }
      if (!row.question_text || row.question_text.length < 5) {
        console.error(`ID ${row.id}: Question text too short!`);
      }
      if (!row.solution || row.solution.length < 5) {
        console.error(`ID ${row.id}: Solution too short!`);
      }
    }

    console.log(`=== DB VERIFICATION RESULTS ===`);
    console.log(`Total: ${res.rows.length} (Expected: 113)`);
    console.log(`MCQs: ${mcqs} (Expected: 74)`);
    console.log(`Numericals: ${numericals} (Expected: 39)`);
    console.log(`Diagrams with Cloudinary URL: ${withDiagrams} (Expected: 19)`);

    // Also check all categories in JEE
    const jeeCats = await client.query(`
      SELECT category, count(*) FROM question_bank WHERE exam_type = 'JEE' GROUP BY category
    `);
    console.log(`JEE Categories Summary:`, jeeCats.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
