import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function verify() {
  console.log('=== VERIFYING CENTER OF MASS PYQS ON LOCAL DB & LIVE ===');

  // 1. Local Neon DB
  const localRes = await pool.query(
    "SELECT id, question_text, correct_index, image_url, category, subject, chapter FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Center of Mass and Collision' OR chapter_id = 193) ORDER BY id ASC"
  );
  console.log(`Local DB questions count: ${localRes.rows.length}`);
  if (localRes.rows.length !== 57) {
    console.error('Mismatch in local DB count!');
  } else {
    console.log(' Local DB count matches 57/57.');
  }

  // Check year tags
  const withYearTags = localRes.rows.filter(r => /^\[.*?\]/.test(r.question_text.trim()));
  console.log(`Local questions with bracketed year tags: ${withYearTags.length} (Expected: 0)`);

  // Check diagrams
  const localDiagrams = localRes.rows.filter(r => r.image_url);
  console.log(`Local questions with diagram URLs: ${localDiagrams.length} (Expected: 5)`);

  // 2. Live API
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const comLive = (liveData.questions || []).filter(q =>
    (q.chapter || '').toLowerCase().includes('center of mass') ||
    Number(q.chapter_id) === 303
  );

  console.log(`\nLive API questions count: ${comLive.length}`);
  if (comLive.length !== 57) {
    console.error('Mismatch in Live API count!');
  } else {
    console.log(' Live API count matches 57/57.');
  }

  const liveWithYearTags = comLive.filter(r => /^\[.*?\]/.test((r.question_text || '').trim()));
  console.log(`Live questions with bracketed year tags: ${liveWithYearTags.length} (Expected: 0)`);

  const liveDiagrams = comLive.filter(r => r.image_url);
  console.log(`Live questions with diagram URLs: ${liveDiagrams.length} (Expected: 5)`);

  console.log('\n--- Sample Live Questions Check ---');
  console.log('Q1 Live Text:', comLive[0]?.question_text?.substring(0, 70) + '...');
  console.log('Q1 Live Image:', comLive[0]?.image_url);
  console.log('Q1 Live Correct Index:', comLive[0]?.correct_index, '(Expected: 3 -> D)');

  console.log('Q2 Live Text:', comLive[1]?.question_text?.substring(0, 70) + '...');
  console.log('Q2 Live Image:', comLive[1]?.image_url);
  console.log('Q2 Live Option D Image:', comLive[1]?.options?.[3]?.image_url);
  console.log('Q2 Live Correct Index:', comLive[1]?.correct_index, '(Expected: 3 -> D)');

  await pool.end();
}

verify().catch(console.error);
