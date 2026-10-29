import fetch from 'node-fetch';
import { query, pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== VERIFYING ELECTROCHEMISTRY QUESTION BANK DATA ===\n');

  // 1. Local Database Verification
  const localCount = await query(`
    SELECT COUNT(*) as total
    FROM question_bank
    WHERE chapter = 'Electrochemistry'
  `);
  console.log(`[Local DB] Total questions in chapter 'Electrochemistry': ${localCount.rows[0].total}`);

  const localSamples = await query(`
    SELECT id, question_text, chapter, difficulty, image_url
    FROM question_bank
    WHERE chapter = 'Electrochemistry'
    ORDER BY id ASC
    LIMIT 3
  `);
  console.log('[Local DB] First 3 questions sample:');
  localSamples.rows.forEach(r => {
    console.log(`  ID ${r.id} | Chapter: "${r.chapter}" | Diff: ${r.difficulty} | Img: "${r.image_url}"`);
    console.log(`  Text: "${r.question_text.slice(0, 60)}..."`);
  });

  const diagramQuestions = await query(`
    SELECT id, question_text, image_url
    FROM question_bank
    WHERE chapter = 'Electrochemistry' AND image_url != ''
    ORDER BY id ASC
  `);
  console.log(`\n[Local DB] Questions with diagrams: ${diagramQuestions.rows.length}`);
  diagramQuestions.rows.forEach(r => {
    console.log(`  ID ${r.id}: ${r.image_url}`);
  });

  // 2. Live Platform Verification
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    if (loginRes.ok) {
      const token = (await loginRes.json()).token;
      const liveQBRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&chapter=Electrochemistry&_t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (liveQBRes.ok) {
        const liveData = await liveQBRes.json();
        const liveQuestions = (liveData.questions || []).filter(q => (q.chapter || '').toLowerCase() === 'electrochemistry');
        console.log(`\n[Live edvedum.com] Total questions in chapter 'Electrochemistry': ${liveQuestions.length}`);
      }
    }
  } catch (err) {
    console.log('Live check err:', err.message);
  }

  await pool.end();
  console.log('\n=== VERIFICATION COMPLETE ===');
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
