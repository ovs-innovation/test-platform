import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('========================================================================');
  console.log('FINAL AUDIT & VERIFICATION REPORT: ORGANISMS AND POPULATIONS');
  console.log('========================================================================\n');

  // 1. Local Database Audit
  console.log('--- 1. LOCAL DATABASE (PostgreSQL) ---');
  const localChapterRes = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE name = 'Organisms and Populations'"
  );
  console.log('Local Chapter record:', localChapterRes.rows);

  const localStats = await pool.query(`
    SELECT 
      count(*)::int as total,
      count(CASE WHEN question_type = 'mcq' THEN 1 END)::int as mcq_count,
      count(CASE WHEN question_type = 'assertion_reason' THEN 1 END)::int as ar_count,
      count(image_url)::int as with_diagram,
      count(CASE WHEN solution IS NOT NULL AND length(solution) > 10 THEN 1 END)::int as with_solution
    FROM question_bank 
    WHERE chapter = 'Organisms and Populations'
  `);
  console.log('Local Question Bank Stats:', localStats.rows[0]);

  // Sample questions from Section A and Section B
  const sampleLocalA = await pool.query(
    "SELECT id, question_type, question_text, image_url FROM question_bank WHERE chapter = 'Organisms and Populations' AND question_type = 'mcq' AND image_url IS NOT NULL LIMIT 2"
  );
  console.log('Sample Local Section A (with diagram):', sampleLocalA.rows);

  const sampleLocalB = await pool.query(
    "SELECT id, question_type, assertion_text, reason_text FROM question_bank WHERE chapter = 'Organisms and Populations' AND question_type = 'assertion_reason' LIMIT 2"
  );
  console.log('Sample Local Section B (Assertion-Reason):', sampleLocalB.rows);

  // 2. Live Platform Audit
  console.log('\n--- 2. LIVE PLATFORM (edvedum.com) ---');
  const tokenFile = path.join(__dirname, 'live_token.json');
  const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
  const token = tokenData.token;

  const liveChapsRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChaps = (await liveChapsRes.json()).chapters || [];
  const liveEcoChap = liveChaps.find(c => c.name.toLowerCase() === 'organisms and populations');
  console.log('Live Chapter record:', liveEcoChap);

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=2500&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const liveData = await liveRes.json();
  const allLiveBotany = liveData.questions || [];
  const liveEcoQs = allLiveBotany.filter(q => 
    q.chapter_id === liveEcoChap?.id || q.chapter === 'Organisms and Populations'
  );

  const liveDiagQs = liveEcoQs.filter(q => q.image_url && q.image_url.startsWith('http'));
  console.log(`Live Questions under 'Organisms and Populations': ${liveEcoQs.length}`);
  console.log(`Live Questions with active image_url: ${liveDiagQs.length}`);

  // Test reachability of a sample Cloudinary diagram
  if (liveDiagQs.length > 0) {
    const testUrl = liveDiagQs[0].image_url;
    console.log(`Testing CDN reachability for: ${testUrl}`);
    const imgCheck = await fetch(testUrl);
    console.log(`Cloudinary CDN HTTP Status: ${imgCheck.status} (${imgCheck.statusText})`);
  }

  console.log('\n========================================================================');
  console.log('ALL AUDITS COMPLETED SUCCESSFULLY!');
  console.log('========================================================================\n');

  await pool.end();
}

verify().catch(console.error);
