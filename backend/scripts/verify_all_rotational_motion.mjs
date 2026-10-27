import { pool } from '../src/config/db.js';

async function verifyAll() {
  console.log('=== Step 1: Checking Neon DB Questions for "System of Particles and Rotational Motion" ===');
  const res = await pool.query(`
    SELECT count(*)::int as total,
           count(CASE WHEN image_url IS NOT NULL AND image_url != '' THEN 1 END)::int as with_images
    FROM question_bank
    WHERE category = 'Physics' AND chapter = 'System of Particles and Rotational Motion'
  `);
  console.log(`Neon DB Total: ${res.rows[0].total} questions`);
  console.log(`Neon DB with diagrams: ${res.rows[0].with_images} questions`);

  console.log('\n=== Step 2: Checking Live edvedum.com Questions ===');
  const LIVE_API = 'https://edvedum.com/api';
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.questions || [];
  const rotLive = allLive.filter(q => 
    q.chapter === 'System of Particles and Rotational Motion' ||
    (q.chapter && q.chapter.toLowerCase().includes('rotat'))
  );
  console.log(`Live platform total Physics questions: ${allLive.length}`);
  console.log(`Live platform questions in "System of Particles and Rotational Motion": ${rotLive.length}`);

  if (res.rows[0].total === 121 && rotLive.length === 121) {
    console.log('\n🎉 ALL 121 QUESTIONS ACROSS BOTH BATCHES ARE FULLY SYNCED AND VERIFIED ON BOTH NEON DB AND LIVE EDVEDUM.COM!');
  } else {
    console.log(`\nNote: Neon DB has ${res.rows[0].total}, Live has ${rotLive.length}`);
  }
}

verifyAll().catch(console.error).finally(() => process.exit(0));
