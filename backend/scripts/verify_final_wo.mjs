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
  console.log(`====================================================`);
  console.log(`  FINAL VERIFICATION: WAVE OPTICS (58 QUESTIONS)    `);
  console.log(`====================================================\n`);

  // 1. LOCAL NEON DB VERIFICATION
  console.log('--- 1. Verifying Local Neon Database ---');
  const client = await pool.connect();
  let localErrors = 0;
  try {
    const res = await client.query(`
      SELECT id, question_text, options, correct_index, image_url, category, status
      FROM question_bank
      WHERE (chapter_id = 201 OR LOWER(chapter) = 'wave optics') AND category = 'PYQ'
      ORDER BY id
    `);

    console.log(`Local DB Total Questions: ${res.rows.length}`);
    if (res.rows.length !== 58) {
      console.error(`❌ Expected 58 local questions, found ${res.rows.length}`);
      localErrors++;
    }

    let localDiagrams = 0;
    for (const row of res.rows) {
      if (row.image_url) {
        localDiagrams++;
      }
    }
    console.log(`Local DB Diagram Questions: ${localDiagrams}`);
    if (localDiagrams !== 1) {
      console.error(`❌ Expected 1 diagram, found ${localDiagrams}`);
      localErrors++;
    }

    if (localErrors === 0) {
      console.log('✅ Local Neon DB passed verification: 58/58 questions, 1/1 diagram!');
    }
  } finally {
    client.release();
    await pool.end();
  }

  // 2. LIVE PLATFORM VERIFICATION
  console.log('\n--- 2. Verifying Live Platform (edvedum.com) ---');
  let liveErrors = 0;
  try {
    const token = await getToken();
    const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=2000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch from live API: ${res.status}`);
    }

    const data = await res.json();
    const allQuestions = data.questions || data.data || [];

    const woLive = allQuestions.filter(q =>
      Number(q.chapter_id) === 31 || (q.chapter || '').toLowerCase() === 'wave optics'
    );

    console.log(`Live API Total Questions for Wave Optics: ${woLive.length}`);
    if (woLive.length !== 58) {
      console.error(`❌ Expected 58 questions on Live API, found ${woLive.length}`);
      liveErrors++;
    }

    let liveDiagrams = 0;
    for (const q of woLive) {
      if (q.image_url && q.image_url.includes('cloudinary.com')) {
        liveDiagrams++;
      }
    }
    console.log(`Live API Diagram Questions with Cloudinary URLs: ${liveDiagrams}`);
    if (liveDiagrams !== 1) {
      console.error(`❌ Expected 1 diagram on Live API, found ${liveDiagrams}`);
      liveErrors++;
    }

    if (liveErrors === 0) {
      console.log('✅ Live Platform passed verification: 58/58 questions, 1/1 diagram!');
    }
  } catch (err) {
    console.error('Error verifying Live API:', err.message);
    liveErrors++;
  }

  if (localErrors === 0 && liveErrors === 0) {
    console.log('\n🎉 ALL VERIFICATIONS PASSED PERFECTLY!');
  } else {
    console.error(`\n❌ Total errors: local=${localErrors}, live=${liveErrors}`);
    process.exit(1);
  }
}

verify().catch(console.error);
