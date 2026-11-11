import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const qRows = await client.query("SELECT id, category, chapter_id, chapter, question_text, created_at FROM question_bank WHERE chapter_id = 60 OR LOWER(chapter) LIKE '%bond%' LIMIT 10");
  console.log('Local sample questions:', qRows.rows);
  const totalPYQ = await client.query("SELECT COUNT(*) FROM question_bank WHERE (chapter_id = 60 OR LOWER(chapter) LIKE '%bond%') AND category = 'PYQ'");
  console.log('Local PYQ count:', totalPYQ.rows[0].count);
  const totalAll = await client.query("SELECT category, COUNT(*) FROM question_bank WHERE chapter_id = 60 OR LOWER(chapter) LIKE '%bond%' GROUP BY category");
  console.log('Local by category:', totalAll.rows);
  client.release();
  await pool.end();

  // Check Live chapters
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const chRes = await fetch(`${LIVE_API}/chapters?subject_id=6`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const chapters = chData.chapters || chData.data || chData || [];
    console.log(`Live subject 6 has ${chapters.length} chapters.`);
    chapters.forEach(c => {
      if (/bond|chem/i.test(c.name)) {
        console.log(`Live Ch: ID ${c.id}: ${c.name}`);
      }
    });

    // Check QuestionBank on live
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=100`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || qData.data || [];
    console.log(`Fetched sample live PYQ questions: ${questions.length}`);
    const bondingQuestions = questions.filter(q => /bond/i.test(q.chapter || '') || /bond/i.test(q.chapter_name || ''));
    console.log(`Sample live bonding questions count: ${bondingQuestions.length}`);
    if (bondingQuestions.length > 0) {
      console.log('Sample live bonding question chapter_id:', bondingQuestions[0].chapter_id, bondingQuestions[0].chapter);
    }
  } catch (e) {
    console.log('Live check error:', e.message);
  }
}

main();
