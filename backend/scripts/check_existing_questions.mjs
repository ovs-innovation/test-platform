import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonRes = await pool.query("SELECT id, chapter_id, chapter, question_text FROM questions WHERE chapter_id = 213 OR (subject_id = 13 AND chapter ILIKE '%human reproduction%')");
  console.log('Neon DB existing questions for Human Reproduction:', neonRes.rows);
  await pool.end();
}

check().catch(console.error);
