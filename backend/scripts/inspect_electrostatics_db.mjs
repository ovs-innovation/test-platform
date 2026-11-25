import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const res = await pool.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE subject_id = 11 AND (name ILIKE '%electro%' OR name ILIKE '%capacit%') 
    ORDER BY id
  `);
  console.log('Chapters found:', res.rows);

  const qCount = await pool.query(`
    SELECT chapter, COUNT(*) as cnt 
    FROM questions 
    WHERE exam_type = 'JEE' AND (chapter ILIKE '%electro%' OR chapter ILIKE '%capacit%')
    GROUP BY chapter
  `);
  console.log('Question counts by chapter:', qCount.rows);

  await pool.end();
}

main().catch(console.error);
