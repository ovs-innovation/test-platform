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
  const sub = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%chem%'");
  console.log('Local Chemistry subjects:', sub.rows);

  const ch = await client.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%block%' OR LOWER(name) LIKE '%d%f%'");
  console.log('Local Block chapters:', ch.rows);

  const qCategories = await client.query("SELECT category, COUNT(*) FROM question_bank WHERE LOWER(chapter) LIKE '%d%f%block%' OR chapter_id IN (SELECT id FROM chapters WHERE LOWER(name) LIKE '%d%f%block%') GROUP BY category");
  console.log('Local d and f block questions by category:', qCategories.rows);

  client.release();
  await pool.end();

  // Check Live
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
    console.log('Live d and f block chapters:');
    chList.forEach(c => {
      if (/block|d.*f/i.test(c.name)) {
        console.log(`  ID ${c.id}: ${c.name}`);
      }
    });

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const questions = qData.questions || qData.data || [];
    const qDF = questions.filter(q => /d.*f.*block/i.test(q.chapter || '') || /d.*f.*block/i.test(q.chapter_name || ''));
    console.log('Live existing PYQ count for d and f block:', qDF.length);
  } catch (err) {
    console.log('Live check error:', err.message);
  }
}

main().catch(console.error);

