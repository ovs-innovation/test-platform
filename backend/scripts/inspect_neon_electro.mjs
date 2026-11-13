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
  const res = await pool.query(`
    SELECT id, question_text, chapter_id, subject_id, exam_type, created_at
    FROM questions
    WHERE chapter_id = 126
    ORDER BY id;
  `);
  console.log(`Neon chapter 126 total questions: ${res.rows.length}`);
  res.rows.forEach(r => console.log(`  [ID ${r.id}] [exam_type: ${r.exam_type}]: ${r.question_text.slice(0, 60)}...`));
  await pool.end();
}

main().catch(console.error);

