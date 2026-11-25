import fetch from 'node-fetch';
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
  console.log('--- Search Neon DB for "spherical conductor" ---');
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT id, chapter_id, chapter, exam_type, question_text, created_at 
      FROM question_bank 
      WHERE question_text ILIKE '%Two spherical conductor%' OR question_text ILIKE '%paint A to B%'
    `);
    console.log('Found in Neon question_bank:', res.rows);

    const res2 = await client.query(`
      SELECT id, chapter_id, question_text 
      FROM questions 
      WHERE question_text ILIKE '%Two spherical conductor%' OR question_text ILIKE '%paint A to B%'
    `);
    console.log('Found in Neon questions table:', res2.rows);
  } finally {
    client.release();
  }

  console.log('--- Search Live API ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Search by keyword
  const searchRes = await fetch('https://edvedum.com/api/question-bank?search=spherical+conductor&limit=100', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const searchData = await searchRes.json();
  console.log('Search "spherical conductor" live count:', searchData.questions ? searchData.questions.length : searchData);
  if (searchData.questions && searchData.questions.length > 0) {
    searchData.questions.slice(0, 5).forEach(q => {
      console.log(`[ID ${q.id}] ch: ${q.chapter} (id:${q.chapter_id}), exam: ${q.exam_type}, text: ${q.question_text.slice(0, 80)}`);
    });
  }

  // Also check subject 5 chapters
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  console.log('Live Subject 5 (Physics) chapters:', chData);
}

main().catch(console.error);
