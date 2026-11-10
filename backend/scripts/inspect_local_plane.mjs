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
  let found = 0;
  let notFound = [];
  let updatedOther = [];

  for (const q of MOTION_IN_PLANE_QUESTIONS) {
    const res = await pool.query(
      'SELECT id, category, subject, chapter, chapter_id, question_text FROM question_bank WHERE question_text = $1',
      [q.question.trim()]
    );
    if (res.rows.length === 0) {
      notFound.push(q.qNum);
    } else {
      found += res.rows.length;
      for (const row of res.rows) {
        if (row.chapter_id !== 135) {
          updatedOther.push({ qNum: q.qNum, ...row });
        }
      }
    }
  }

  console.log(`Found: ${found}, Not found: ${notFound.join(', ')}`);
  console.log('Updated in other chapters/ids:', updatedOther);

  const count = await pool.query(
    "SELECT count(*) FROM question_bank WHERE chapter_id = 135"
  );
  console.log('Total in chapter_id 135:', count.rows[0].count);

  await pool.end();
}

run().catch(console.error);

