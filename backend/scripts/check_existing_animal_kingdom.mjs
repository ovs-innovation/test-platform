import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonRes = await pool.query(`
    SELECT count(*) as total, count(*) filter (where category = 'PYQ') as pyq_total
    FROM question_bank
    WHERE subject = 'Zoology' AND (chapter_id = 132 OR chapter ILIKE '%Animal Kingdom%')
  `);
  console.log('Neon existing questions:', neonRes.rows[0]);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const qRes = await fetch('https://edvedum.com/api/question-bank?subjectId=2&chapterId=2&category=PYQ&limit=10', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const qData = await qRes.json();
  console.log('Live pagination count:', qData.pagination?.total || qData.questions?.length);

  await pool.end();
}

check().catch(console.error);

