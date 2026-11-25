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
  const chRes = await pool.query('SELECT id, name, subject_id FROM chapters WHERE id = 198');
  console.log('Chapter 198 in Neon DB:', chRes.rows);

  const qRes = await pool.query(`
    SELECT qb.id, qb.chapter, qb.chapter_id, c.name as chapter_name, s.name as subject_name, qb.category, qb.exam_type
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    WHERE qb.exam_type = 'JEE' AND (qb.chapter = 'Electrostatics' OR qb.chapter_id = 198)
    LIMIT 3
  `);
  console.log('Question sample joined with chapters and subjects:', qRes.rows);
  await pool.end();
}

check().catch(console.error);
