import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const res = await pool.query(`
    SELECT id, category, exam_type, chapter, subject, chapter_id, question_type, numeric_answer 
    FROM question_bank 
    WHERE chapter = 'Electrostatics' 
    ORDER BY id ASC 
    LIMIT 5
  `);
  console.log('Sample inserted rows:', res.rows);
  await pool.end();
}

check().catch(console.error);
