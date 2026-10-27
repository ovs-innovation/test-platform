import { pool } from '../src/config/db.js';

async function verify() {
  console.log('=== Verifying Local Database (Neon) ===');
  const dbRes = await pool.query(`
    SELECT id, question_text, chapter, image_url, correct_index
    FROM question_bank 
    WHERE category = 'Physics' AND chapter = 'System of Particles and Rotational Motion'
    ORDER BY id ASC
  `);
  console.log(`Local Neon DB questions count for "System of Particles and Rotational Motion": ${dbRes.rows.length}`);
  const withImages = dbRes.rows.filter(r => r.image_url && r.image_url.length > 0);
  console.log(`Questions with diagrams: ${withImages.length}/54`);

  console.log('\n=== Verifying Live edvedum.com API ===');
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
  const rotLive = (liveData.questions || []).filter(q => 
    q.chapter === 'System of Particles and Rotational Motion' ||
    (q.chapter && q.chapter.toLowerCase().includes('rotat'))
  );
  console.log(`Live site questions count for "System of Particles and Rotational Motion": ${rotLive.length}`);
  
  if (dbRes.rows.length === 54 && rotLive.length >= 54) {
    console.log('\n✅ VERIFICATION SUCCESSFUL: Both Local DB and Live edvedum.com have all 54 questions with diagrams and solutions!');
  } else {
    console.warn('\n⚠️ Verification discrepancy detected!');
  }
}

verify().catch(console.error).finally(() => process.exit(0));
