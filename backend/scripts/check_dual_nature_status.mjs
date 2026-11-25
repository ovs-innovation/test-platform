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
  console.log('--- Checking Neon DB for Dual Nature ---');
  const client = await pool.connect();
  try {
    const chRes = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%dual%'");
    console.log('Neon chapters matching "dual":', chRes.rows);

    const qRes = await client.query(`
      SELECT exam_type, count(*), chapter, chapter_id
      FROM question_bank
      WHERE chapter ILIKE '%dual%'
      GROUP BY exam_type, chapter, chapter_id
    `);
    console.log('Neon question_bank counts:', qRes.rows);
  } finally {
    client.release();
  }

  console.log('\n--- Checking Live API for Dual Nature ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const chRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const liveChapters = chData.chapters || chData.data || (Array.isArray(chData) ? chData : []);
  const dualChapters = liveChapters.filter(c => /dual/i.test(c.name || ''));
  console.log('Live Subject 5 (Physics) chapters matching "dual":', dualChapters);

  for (const c of dualChapters) {
    const res = await fetch(`https://edvedum.com/api/question-bank?category=Physics&chapter_id=${c.id}&exam_type=JEE&refresh=true&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(`Live questions for chapter ${c.id} (${c.name}): count = ${(data.questions || []).length}`);
  }

  // Also search by text
  const res2 = await fetch(`https://edvedum.com/api/question-bank?category=Physics&chapter=Dual%20Nature%20of%20Radiation%20and%20Matter&exam_type=JEE&refresh=true&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data2 = await res2.json();
  console.log(`Live questions with chapter="Dual Nature of Radiation and Matter": count = ${(data2.questions || []).length}`);
}

main().catch(console.error);
