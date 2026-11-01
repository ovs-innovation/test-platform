import { pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function checkFinal() {
  console.log('=== Final Verification: Chemical Bonding and Molecular Structure ===');

  // 1. Local DB Check
  const localRes = await pool.query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE chapter_id = 60 GROUP BY question_type"
  );
  console.log('\n[Local DB - Neon]');
  console.table(localRes.rows);

  const localTotal = await pool.query(
    "SELECT count(*) as total, count(image_url) as with_images FROM question_bank WHERE chapter_id = 60"
  );
  console.log('Local Total Questions:', localTotal.rows[0].total, '| With Diagrams:', localTotal.rows[0].with_images);

  // 2. Live API Check
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const qRes = await fetch(`${LIVE_API}/question-bank?limit=15000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const allLive = qData.questions || qData.data || qData;
  const bondingLive = Array.isArray(allLive) 
    ? allLive.filter(q => q.subject_id === 6 && (q.chapter_id === 38 || q.chapter === 'Chemical Bonding and Molecular Structure')) 
    : [];

  const arLive = bondingLive.filter(q => q.question_type === 'assertion_reason' || (q.assertion_text && q.reason_text));
  const mcqLive = bondingLive.filter(q => q.question_type !== 'assertion_reason' && !(q.assertion_text && q.reason_text));
  const withImages = bondingLive.filter(q => q.image_url && q.image_url.trim() !== '');

  console.log('\n[Live API - edvedum.com]');
  console.log('Live Total Questions:', bondingLive.length);
  console.log('Live MCQs:', mcqLive.length);
  console.log('Live ARs:', arLive.length);
  console.log('Live With Diagrams:', withImages.length);

  await pool.end();
}

checkFinal().catch(console.error);
