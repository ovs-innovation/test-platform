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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getToken() {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(`${LIVE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
      });
      if (res.ok) {
        const data = await res.json();
        return data.token || data.accessToken || data.data?.token;
      }
      console.warn(`[Live Login] Attempt ${attempt} failed with status ${res.status}. Retrying in 2s...`);
    } catch (err) {
      console.warn(`[Live Login] Attempt ${attempt} error: ${err.message}. Retrying in 2s...`);
    }
    await sleep(2000);
  }
  throw new Error('Failed to login to live API after 5 attempts');
}

async function run() {
  console.log('--- 1. Checking Existing Local PYQ Physics Chapters ---');
  const client = await pool.connect();
  const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
  const localSubId = subRes.rows[0].id;

  const pyqChaps = await client.query(
    "SELECT DISTINCT chapter, chapter_id FROM question_bank WHERE category = 'PYQ' AND subject = 'Physics' ORDER BY chapter ASC"
  );
  console.log('Existing PYQ Physics chapters:');
  console.table(pyqChaps.rows);

  // Check if 'Heat and Thermodynamics' exists in local chapters table
  let localChapId = null;
  const existingLocalCh = await client.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = 'heat and thermodynamics'",
    [localSubId]
  );
  if (existingLocalCh.rows.length > 0) {
    localChapId = existingLocalCh.rows[0].id;
    console.log(`Found existing local chapter 'Heat and Thermodynamics', ID: ${localChapId}`);
  } else {
    const insRes = await client.query(
      "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ('Heat and Thermodynamics', $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1), NOW()) RETURNING id",
      [localSubId]
    );
    localChapId = insRes.rows[0].id;
    console.log(`Created new local chapter 'Heat and Thermodynamics', ID: ${localChapId}`);
  }

  // --- 2. Live Platform Setup ---
  console.log('\n--- 2. Setting up Live Chapter ---');
  const token = await getToken();
  const liveSubId = 5;

  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await liveChRes.json();
  const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  let liveChap = chList.find(c => (c.name || '').trim().toLowerCase() === 'heat and thermodynamics');

  let liveChapId = null;
  if (liveChap) {
    liveChapId = liveChap.id;
    console.log(`Found existing Live chapter 'Heat and Thermodynamics', ID: ${liveChapId}`);
  } else {
    console.log(`Creating Live chapter 'Heat and Thermodynamics'...`);
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ subject_id: liveSubId, name: 'Heat and Thermodynamics' })
    });
    const createdData = await createRes.json();
    liveChapId = createdData.chapter?.id || createdData.id;
    console.log(`Created Live chapter 'Heat and Thermodynamics', ID: ${liveChapId}`);
  }

  console.log('\n=== CHAPTER SETUP SUMMARY ===');
  console.log(`Chapter Name: 'Heat and Thermodynamics'`);
  console.log(`Local DB: subject_id = ${localSubId}, chapter_id = ${localChapId}`);
  console.log(`Live API: subject_id = ${liveSubId}, chapter_id = ${liveChapId}`);

  client.release();
  await pool.end();
}

run().catch(console.error);
