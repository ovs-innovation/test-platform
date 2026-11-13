import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  console.log('Checking Neon DB for existing questions in chapter 216 / "Biotechnology and its Applications"...');
  const neonRes = await pool.query(`
    SELECT count(*) as total FROM question_bank
    WHERE subject = 'Zoology' AND (chapter_id = 216 OR chapter ILIKE '%Biotechnology and its Applications%')
  `);
  console.log('Neon DB existing count:', neonRes.rows[0].total);

  console.log('Checking Live Server for existing questions in chapter 207...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Zoology&chapter_id=207`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveRes.ok) {
    const liveData = await liveRes.json();
    const qs = liveData.questions || liveData.data || (Array.isArray(liveData) ? liveData : []);
    console.log('Live Server existing questions in chapter 207:', qs.length);
  } else {
    console.log('Live Server check status:', liveRes.status);
  }

  await pool.end();
}

main().catch(console.error);
