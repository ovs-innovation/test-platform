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
    SELECT exam_type, category, count(*) 
    FROM question_bank 
    WHERE chapter = 'Electrostatics' OR chapter_id = 198 
    GROUP BY exam_type, category
  `);
  console.log('Question bank counts for Electrostatics:', res.rows);
  await pool.end();
}

check().catch(console.error);
