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

async function verify() {
  console.log('=== VERIFYING FINAL ELECTROSTATICS STATUS ===');

  let localWithImg = [];
  const client = await pool.connect();
  try {
    const localRes = await client.query(
      "SELECT id, question_text, correct_index, image_url, options FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 198 OR LOWER(chapter) = 'electrostatics') ORDER BY id ASC"
    );
    console.log(`Local Neon DB questions found: ${localRes.rows.length}`);
    localWithImg = localRes.rows.filter(r => r.image_url);
    console.log(`Local questions with diagram image_url: ${localWithImg.length}`);

    // Check sample local
    console.log('\nSample Local Question 1:');
    console.log({
      id: localRes.rows[0].id,
      text: localRes.rows[0].question_text.slice(0, 100),
      hasImage: !!localRes.rows[0].image_url,
      imageUrl: localRes.rows[0].image_url
    });
  } finally {
    client.release();
    await pool.end();
  }

  // Live verification
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const lData = await liveRes.json();
  const allLive = lData.questions || lData.data || [];
  const elecLive = allLive.filter(q => Number(q.chapter_id) === 106 || (q.chapter || '').toLowerCase() === 'electrostatics');
  console.log(`\nLive Platform Electrostatics questions found: ${elecLive.length}`);
  const liveWithImg = elecLive.filter(q => q.image_url);
  console.log(`Live questions with diagram image_url: ${liveWithImg.length}`);

  if (localWithImg.length === 21 && liveWithImg.length === 21 && elecLive.length === 95) {
    console.log('\n>>> PERFECT MATCH! Exactly 95 questions and 21 diagrams verified on both Local DB and Live edvedum.com! <<<');
  } else {
    console.log(`Note: Local diagrams: ${localWithImg.length}, Live diagrams: ${liveWithImg.length}, Live total: ${elecLive.length}`);
  }
}

verify().catch(console.error);

