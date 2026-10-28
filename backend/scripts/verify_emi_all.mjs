import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verifyAll() {
  console.log('=== Step 1: Verifying Neon DB ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  let neonQuestions = [];

  try {
    const ch = await client.query("SELECT id, name FROM chapters WHERE name ILIKE 'Electromagnetic Induction'");
    console.log('Neon Chapter:', ch.rows[0]);
    const chapterId = ch.rows[0].id;

    const qRes = await client.query(
      "SELECT id, question_text, image_url, correct_index FROM question_bank WHERE chapter_id = $1 ORDER BY id ASC",
      [chapterId]
    );
    neonQuestions = qRes.rows;
    console.log(`Total questions in Neon DB for 'Electromagnetic Induction': ${neonQuestions.length}`);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Step 2: Verifying Live edvedum.com ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === 'electromagnetic induction');
  console.log('Live Chapter:', { id: liveChap.id, name: liveChap.name, subject_id: liveChap.subject_id });

  const qBankRes = await fetch(`${LIVE_API}/question-bank`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qBankData = await qBankRes.json();
  const allLiveQuestions = qBankData.questions || [];

  const liveInChapter = allLiveQuestions.filter(q => q.chapter_id === liveChap.id);
  console.log(`Total questions on live edvedum.com for 'Electromagnetic Induction' (chapter_id: ${liveChap.id}): ${liveInChapter.length}`);

  console.log('\n=== Step 3: Checking Diagrams on Disk ===');
  const backendUploads = 'backend/uploads/emi';
  const frontendUploads = 'frontend/public/uploads/emi';

  const backendFiles = fs.readdirSync(backendUploads);
  const frontendFiles = fs.readdirSync(frontendUploads);

  console.log(`Backend diagrams count: ${backendFiles.length}`);
  console.log(`Frontend diagrams count: ${frontendFiles.length}`);

  let missingImages = 0;
  let questionsWithDiagrams = 0;
  for (const q of neonQuestions) {
    if (q.image_url) {
      questionsWithDiagrams++;
      const filename = path.basename(q.image_url);
      const bExists = fs.existsSync(path.join(backendUploads, filename));
      const fExists = fs.existsSync(path.join(frontendUploads, filename));
      if (!bExists || !fExists) {
        console.error(`Missing diagram: ${filename} (backend: ${bExists}, frontend: ${fExists})`);
        missingImages++;
      }
    }
  }

  console.log(`Questions with diagrams: ${questionsWithDiagrams}`);
  if (missingImages === 0) {
    console.log('All question images exist and are properly linked in both backend and frontend!');
  }

  console.log('\n===========================================');
  console.log(`FINAL VERIFICATION RESULT:`);
  console.log(`Neon DB Questions: ${neonQuestions.length} / 74`);
  console.log(`Live edvedum.com Questions: ${liveInChapter.length} / 74`);
  console.log(`Status: ${neonQuestions.length === 74 && liveInChapter.length === 74 ? 'SUCCESS: 100% MATCH' : 'MISMATCH DETECTED'}`);
  console.log('===========================================');
}

verifyAll().catch(console.error);
