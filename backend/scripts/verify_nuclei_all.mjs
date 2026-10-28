import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== VERIFYING NUCLEI QUESTIONS IN NEON DB ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  try {
    const ch = await client.query("SELECT id, name FROM chapters WHERE name ILIKE 'Nuclei'");
    const chapId = ch.rows[0].id;

    const countRes = await client.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1", [chapId]);
    console.log(`Total questions in chapter 'Nuclei' (Neon DB): ${countRes.rows[0].count}`);

    const catRes = await client.query(
      "SELECT category, COUNT(*) FROM question_bank WHERE chapter_id = $1 GROUP BY category",
      [chapId]
    );
    console.log('Category distribution in Neon DB:', catRes.rows);

    const sample = await client.query(
      "SELECT id, question_text, marks, difficulty FROM question_bank WHERE chapter_id = $1 LIMIT 3",
      [chapId]
    );
    console.log('Sample questions from Neon DB:');
    sample.rows.forEach(r => console.log(`  [ID ${r.id}] ${r.question_text.slice(0, 60)}...`));
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== VERIFYING NUCLEI QUESTIONS ON LIVE EDVEDUM.COM ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const allPhysQuestions = qData.questions || [];

  const nucleiQuestions = allPhysQuestions.filter(q =>
    (q.chapter && q.chapter.toLowerCase() === 'nuclei') ||
    (q.chapter_id === 201)
  );

  console.log(`Total Physics questions on edvedum.com: ${allPhysQuestions.length}`);
  console.log(`Total 'Nuclei' questions on edvedum.com: ${nucleiQuestions.length}`);
  if (nucleiQuestions.length > 0) {
    console.log('Sample question on edvedum.com:');
    console.log(`  [ID ${nucleiQuestions[0].id}] ${nucleiQuestions[0].question_text.slice(0, 70)}...`);
    console.log(`  Category: ${nucleiQuestions[0].category}, Chapter: ${nucleiQuestions[0].chapter}`);
  }
}

verify().catch(console.error);
