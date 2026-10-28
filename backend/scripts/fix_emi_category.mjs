import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const LIVE_API = 'https://edvedum.com/api';

async function fix() {
  console.log('=== Step 1: Fixing category in Neon DB ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  
  const pre = await pool.query("SELECT count(id) FROM question_bank WHERE chapter_id = 144 AND category = 'NEET'");
  console.log('Count before update in Neon DB (category = NEET):', pre.rows[0].count);

  const up = await pool.query("UPDATE question_bank SET category = 'Physics', topic = 'Electromagnetic Induction' WHERE chapter_id = 144");
  console.log('Updated rows in Neon DB:', up.rowCount);

  const post = await pool.query("SELECT category, count(id) FROM question_bank WHERE chapter_id = 144 GROUP BY category");
  console.log('Categories now in Neon DB:', post.rows);

  await pool.end();

  console.log('\n=== Step 2: Checking and Fixing category on live edvedum.com ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const qBankRes = await fetch(`${LIVE_API}/question-bank`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qBankData = await qBankRes.json();
  const allLive = qBankData.questions || [];

  const emiLive = allLive.filter(q => q.chapter_id === 195);
  console.log(`Found ${emiLive.length} questions on edvedum.com with chapter_id 195`);

  let updatedCount = 0;
  for (const q of emiLive) {
    if (q.category !== 'Physics' || q.category === 'NEET') {
      const updateRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: 'Physics',
          topic: 'Electromagnetic Induction'
        })
      });
      if (updateRes.ok) {
        updatedCount++;
      } else {
        console.error(`Failed to update live question ${q.id}:`, await updateRes.text());
      }
    }
  }
  console.log(`Updated ${updatedCount} live questions to category: 'Physics'`);
}

fix().catch(console.error);
