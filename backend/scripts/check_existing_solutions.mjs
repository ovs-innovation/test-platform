import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const neonCount = await pool.query("SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 150 OR LOWER(chapter) = 'solutions')");
  console.log('Neon DB Solutions PYQ count:', neonCount.rows[0].count);
  await pool.end();

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];
  const solQs = questions.filter(q => Number(q.chapter_id) === 37 || /^\s*solutions?\s*$/i.test(q.chapter || ''));
  console.log('Live Platform Solutions PYQ count:', solQs.length);
}

main().catch(console.error);

