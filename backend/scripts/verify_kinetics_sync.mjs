import fs from 'fs';
import { pool } from '../src/config/db.js';

async function verify() {
  console.log('=== VERIFYING CHEMICAL KINETICS IMPORT & SYNC ===\n');

  // 1. Local Database Check
  const localRes = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = 21"
  );
  console.log('1. Local Database (chapter_id = 21):', localRes.rows[0]);

  const sampleLocal = await pool.query(
    "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = 21 AND image_url IS NOT NULL LIMIT 3"
  );
  console.log('Local Sample Diagram Questions:');
  sampleLocal.rows.forEach(r => console.log(`  - [ID ${r.id}] ${r.question_text.slice(0, 40)}... -> ${r.image_url}`));

  // 2. Live Platform Check
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveKinetics = (liveData.questions || []).filter(
    q => q.chapter_id === 14 || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  const liveDiagrams = liveKinetics.filter(q => q.image_url);
  console.log(`\n2. Live edvedum.com (chapter_id = 14): total = ${liveKinetics.length}, with_diagram = ${liveDiagrams.length}`);

  console.log('Live Sample Diagram Questions:');
  liveDiagrams.slice(0, 3).forEach(r => console.log(`  - [ID ${r.id}] ${r.question_text.slice(0, 40)}... -> ${r.image_url}`));

  // 3. Test HTTP 200 on sample Cloudinary URLs
  if (liveDiagrams.length > 0) {
    const testUrl = liveDiagrams[0].image_url;
    console.log(`\n3. Testing Cloudinary URL reachability: ${testUrl}`);
    const imgRes = await fetch(testUrl, { method: 'HEAD' });
    console.log(`  HTTP status: ${imgRes.status} ${imgRes.statusText}`);
  }

  await pool.end();
}

verify().catch(console.error);
