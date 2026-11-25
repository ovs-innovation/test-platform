import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  const chRes = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%thermal%' OR name ILIKE '%matter%'"
  );
  console.log('Chapters in Neon:', chRes.rows);

  const qbRes = await pool.query(
    "SELECT chapter, chapter_id, exam_type, count(id) as count FROM question_bank WHERE (category ILIKE '%phys%' OR subject ILIKE '%phys%') AND (chapter ILIKE '%thermal%' OR chapter ILIKE '%matter%') GROUP BY chapter, chapter_id, exam_type"
  );
  console.log('QB in Neon:', qbRes.rows);

  await pool.end();
}

run().catch(console.error);
