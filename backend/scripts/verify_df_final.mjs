import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const qbRes = await pool.query("SELECT count(id) FROM question_bank WHERE chapter = 'The d- and f-Block Elements'");
  console.log('Neon DB verified question count in The d- and f-Block Elements:', qbRes.rows[0].count);

  const sample = await pool.query("SELECT id, question_type, question_text, correct_index, marks, difficulty FROM question_bank WHERE chapter = 'The d- and f-Block Elements' LIMIT 3");
  console.log('Sample questions in Neon DB:', sample.rows);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=1500`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await liveRes.json();
  const liveDF = (data.questions || []).filter(q => (q.chapter || '').toLowerCase().includes('d- and f'));
  console.log('Live edvedum.com verified question count in The d- and f-Block Elements:', liveDF.length);

  await pool.end();
}

verify().catch(console.error);
