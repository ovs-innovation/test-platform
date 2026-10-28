import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const LIVE_API = 'https://edvedum.com/api';

async function check() {
  console.log('=== Neon DB Stats ===');
  const res = await pool.query(`
    SELECT chapter, count(*) as count
    FROM question_bank
    WHERE category = 'Physics'
      AND chapter IN ('Electromagnetic Waves', 'Wave Optics', 'Dual Nature of Radiation and Matter', 'Ray Optics and Optical Instruments')
    GROUP BY chapter
    ORDER BY chapter ASC
  `);
  console.log('Neon DB by chapter:', res.rows);

  const totalRes = await pool.query("SELECT count(*) as total FROM question_bank WHERE category = 'Physics'");
  console.log('Total Physics questions in DB:', totalRes.rows[0].total);

  console.log('\n=== Live Website API Stats (https://edvedum.com) ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];

  const counts = {};
  liveQuestions.forEach(q => {
    if (['Electromagnetic Waves', 'Wave Optics', 'Dual Nature of Radiation and Matter', 'Ray Optics and Optical Instruments'].includes(q.chapter)) {
      counts[q.chapter] = (counts[q.chapter] || 0) + 1;
    }
  });
  console.log('Live edvedum.com counts by chapter:', counts);
  console.log('Total Physics questions on live edvedum.com:', liveQuestions.length);

  await pool.end();
}

check().catch(console.error);
