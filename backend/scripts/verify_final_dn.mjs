import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('=== VERIFYING FINAL DUAL NATURE OF MATTER STATUS ===');

  // 1. Neon DB
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  let localQuestions = [];
  try {
    const res = await client.query(
      "SELECT id, question_text, correct_index, image_url, options FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 203 OR LOWER(chapter) IN ('dual nature of matter', 'dual nature of radiation and matter')) ORDER BY id ASC"
    );
    localQuestions = res.rows;
    console.log(`\nLocal Neon DB: ${localQuestions.length} Dual Nature questions found.`);
    const diagrams = localQuestions.filter(q => q.image_url);
    console.log(`Local Neon DB: ${diagrams.length} diagram questions found.`);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Live Platform
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.questions || [];
  const dnLive = allLive.filter(
    q => Number(q.chapter_id) === 30 || Number(q.chapter_id) === 196 || /dual\s*nature/i.test(q.chapter || '')
  );

  console.log(`\nLive Platform: ${dnLive.length} Dual Nature questions found.`);
  const liveDiagrams = dnLive.filter(q => q.image_url && q.image_url.trim().length > 0);
  console.log(`Live Platform: ${liveDiagrams.length} diagram questions found.`);

  // Also check all physics pyq chapters on Live Platform
  const chapterCounts = {};
  allLive.forEach(q => {
    chapterCounts[q.chapter] = (chapterCounts[q.chapter] || 0) + 1;
  });
  console.log('\nLive Physics PYQ chapter counts (raw):', chapterCounts);
}

main().catch(console.error);

