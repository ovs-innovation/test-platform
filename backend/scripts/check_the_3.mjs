import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION_IN_PLANE_QUESTIONS } from './plane_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  for (const q of MOTION_IN_PLANE_QUESTIONS) {
    const res = await pool.query(
      "SELECT id, category, chapter, chapter_id FROM question_bank WHERE question_text = $1",
      [q.question.trim()]
    );
    if (res.rows.length > 0) {
      for (const row of res.rows) {
        if (row.category !== 'PYQ' || row.chapter_id !== 135) {
          console.log(`Q${q.qNum} (ID: ${row.id}): category=${row.category}, chapter=${row.chapter}, chapter_id=${row.chapter_id}`);
        }
      }
    }
  }
  await pool.end();
}

run().catch(console.error);

