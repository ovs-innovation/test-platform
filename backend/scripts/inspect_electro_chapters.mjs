import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('--- Checking Local Neon DB Chapters for Electrochemistry ---');
  const resNeon = await pool.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE name ILIKE '%electrochem%' OR name ILIKE '%electro%'
    ORDER BY id;
  `);
  console.log('Neon Chapters:', resNeon.rows);

  const resSubject = await pool.query(`
    SELECT id, name FROM subjects WHERE name ILIKE '%chem%';
  `);
  console.log('Neon Chemistry Subjects:', resSubject.rows);

  const neonElectro = await pool.query("SELECT * FROM chapters WHERE subject_id = 10 AND name ILIKE '%electro%'");
  console.log('Neon DB Electrochemistry chapters (subject_id 10):');
  console.table(neonElectro.rows);

  const resNeonExisting = await pool.query(`
    SELECT id, question_text, chapter_id, subject_id
    FROM questions
    WHERE chapter_id = 126
  `);
  console.log(`Neon chapter 126 questions: ${resNeonExisting.rows.length}`);
  resNeonExisting.rows.forEach(q => console.log(`  [Neon ID ${q.id}]: ${q.question_text.slice(0, 70)}...`));

  console.log('\n--- Checking Live edvedum.com Chapters for Electrochemistry ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const chData = await chRes.json();
    const liveChapters = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    const liveElectro = liveChapters.filter(c => /electro/i.test(c.name || c.chapter_name || ''));
    console.log('Live Platform Electrochemistry chapters (subject_id 6):');
    console.table(liveElectro);

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const qList = (qData.questions || qData.data || []).filter(q =>
      Number(q.subject_id) === 6 && (
        Number(q.chapter_id) === 15 ||
        /electrochem/i.test(q.chapter || '') ||
        /electrochem/i.test(q.chapter_name || '')
      )
    );
    console.log('Live Existing Electrochemistry PYQs count:', qList.length);
    qList.forEach(q => console.log(`  [Live ID ${q.id}] (ch: ${q.chapter_id}, ${q.chapter}): ${q.question_text.slice(0, 60)}...`));
  } catch (err) {
    console.error('Live check error:', err.message);
  }

  await pool.end();
}

main().catch(console.error);
