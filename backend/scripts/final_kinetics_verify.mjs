import fs from 'fs';
import path from 'path';
import { pool } from '../src/config/db.js';

async function finalVerify() {
  console.log('=== FINAL COMPREHENSIVE VERIFICATION FOR CHEMICAL KINETICS ===\n');

  // 1. Local Database
  const localRes = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = 21"
  );
  const localTypes = await pool.query(
    "SELECT question_type, count(*)::int as count FROM question_bank WHERE chapter_id = 21 GROUP BY question_type"
  );
  console.log('1. Local Database (Chapter ID: 21, Subject ID: 10):');
  console.log('   Total Questions:', localRes.rows[0].total);
  console.log('   Questions with Diagrams:', localRes.rows[0].with_diagram);
  console.log('   Question Types:', localTypes.rows);

  // 2. Live Platform (edvedum.com)
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveKinetics = (liveData.questions || []).filter(
    q => q.chapter_id === 14 || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  const liveDiagrams = liveKinetics.filter(q => q.image_url);
  const liveTypes = {};
  liveKinetics.forEach(q => {
    liveTypes[q.question_type || 'mcq'] = (liveTypes[q.question_type || 'mcq'] || 0) + 1;
  });

  console.log('\n2. Live edvedum.com Platform (Chapter ID: 14, Subject ID: 6):');
  console.log('   Total Questions:', liveKinetics.length);
  console.log('   Questions with Diagrams:', liveDiagrams.length);
  console.log('   Question Types:', liveTypes);

  // 3. Check sample new diagram URLs on Cloudinary
  const testDiagrams = [
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274429/edvedum_chemistry/kinetics/kinetics_q101_logk_vs_inv_t.png',
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274431/edvedum_chemistry/kinetics/kinetics_q98_rate_table.png',
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793274432/edvedum_chemistry/kinetics/kinetics_q105_halflife_pressure_table.png'
  ];

  console.log('\n3. Testing Newly Uploaded Diagram Reachability:');
  for (const url of testDiagrams) {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`   ${path.basename(url)} -> HTTP ${res.status} ${res.statusText}`);
  }

  await pool.end();
}

finalVerify().catch(console.error);
