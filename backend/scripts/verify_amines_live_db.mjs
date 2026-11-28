import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT exam_type, count(*) FROM question_bank WHERE chapter_id = 118 GROUP BY exam_type');
    console.log('Chapter 118 breakdown:', res.rows);

    const totalJeeChem = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND (category = 'Chemistry' OR subject_id = 10)");
    console.log('Total JEE Chemistry questions:', totalJeeChem.rows[0].count);

    const sample = await client.query("SELECT id, question_text, options, correct_index, numeric_answer, image_url, solution_image_url FROM question_bank WHERE chapter_id = 118 AND exam_type = 'JEE' ORDER BY id ASC LIMIT 2");
    console.log('Sample Amines questions:', JSON.stringify(sample.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);
