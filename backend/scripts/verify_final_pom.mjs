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

const OFFICIAL_KEY = [
  'A', 'B', 'D', 'A', 'D', 'C', 'A', 'A', 'B', 'D',
  'C', 'A', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'C',
  'C', 'B', 'C', 'D', 'B', 'C', 'C', 'A', 'A', 'C',
  'C', 'D', 'A', 'C', 'C', 'C', 'C', 'B', 'B', 'B',
  'D', 'D', 'D', 'B', 'A', 'A', 'B', 'C', 'D', 'A',
  'B', 'A', 'A', 'B', 'C', 'D', 'A', 'A', 'B', 'C',
  'A', 'D', 'D', 'B', 'B', 'A', 'B', 'A'
];

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
  console.log('=== FINAL VERIFICATION: PROPERTIES OF MATTER ===\n');

  // 1. Verify Local DB
  const client = await pool.connect();
  let localQuestions = [];
  try {
    const res = await client.query(
      "SELECT id, question_text, correct_index, options, image_url FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Properties of Matter' OR chapter_id = 194) ORDER BY id ASC"
    );
    localQuestions = res.rows;
  } finally {
    client.release();
  }

  console.log(`Local DB questions count: ${localQuestions.length} / 68`);
  if (localQuestions.length !== 68) {
    throw new Error(`Expected 68 questions in local DB, got ${localQuestions.length}`);
  }

  let localKeyMatches = 0;
  let yearPrefixCount = 0;
  localQuestions.forEach((q, idx) => {
    const letter = String.fromCharCode(65 + q.correct_index);
    if (letter === OFFICIAL_KEY[idx]) localKeyMatches++;
    if (/^\s*\[(NEET|RE-NEET|AIPMT).*?\]/i.test(q.question_text)) yearPrefixCount++;
  });
  console.log(`Local DB Official Key match: ${localKeyMatches} / 68`);
  console.log(`Local DB Year Prefix count: ${yearPrefixCount} (must be 0)`);

  // 2. Verify Live API
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allLive = liveData.questions || liveData.data || [];
  const livePOM = allLive.filter(
    (q) => (q.chapter || '').toLowerCase() === 'properties of matter' || Number(q.chapter_id) === 307
  ).sort((a, b) => a.id - b.id);

  console.log(`\nLive API questions count: ${livePOM.length} / 68`);
  if (livePOM.length !== 68) {
    throw new Error(`Expected 68 questions on Live API, got ${livePOM.length}`);
  }

  let liveKeyMatches = 0;
  let liveYearPrefixCount = 0;
  livePOM.forEach((q, idx) => {
    const letter = String.fromCharCode(65 + q.correct_index);
    if (letter === OFFICIAL_KEY[idx]) liveKeyMatches++;
    if (/^\s*\[(NEET|RE-NEET|AIPMT).*?\]/i.test(q.question_text)) liveYearPrefixCount++;
  });
  console.log(`Live API Official Key match: ${liveKeyMatches} / 68`);
  console.log(`Live API Year Prefix count: ${liveYearPrefixCount} (must be 0)`);

  if (localKeyMatches === 68 && liveKeyMatches === 68 && yearPrefixCount === 0 && liveYearPrefixCount === 0) {
    console.log('\n VERIFICATION COMPLETE: ALL 68 QUESTIONS 100% ACCURATE AND PERFECT ON BOTH ENVIRONMENTS!');
  } else {
    throw new Error('Verification failed!');
  }

  await pool.end();
}

verify().catch(console.error);

