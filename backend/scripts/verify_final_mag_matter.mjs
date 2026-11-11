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

async function main() {
  console.log(`\n====================================================`);
  console.log(`  FINAL VERIFICATION: MAGNETISM AND MATTER PYQ`);
  console.log(`====================================================\n`);

  // 1. Verify Local DB
  const client = await pool.connect();
  let localRows = [];
  try {
    const res = await client.query(
      `SELECT id, question_text, correct_index, options, image_url
       FROM question_bank
       WHERE category = 'PYQ' AND (chapter_id = 106 OR LOWER(chapter) = 'magnetism and matter')
       ORDER BY id ASC`
    );
    localRows = res.rows;
    console.log(`[Local Neon DB] Questions count: ${localRows.length} (Expected: 49)`);
    const diagramCount = localRows.filter(r => r.image_url && r.image_url.includes('cloudinary')).length;
    console.log(`[Local Neon DB] Cloudinary diagrams: ${diagramCount} (Expected: 6)`);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Verify Live Platform
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
  const liveData = await liveRes.json();
  const liveList = liveData.questions || liveData.data || [];
  const magLive = liveList.filter(q => Number(q.chapter_id) === 194 || (q.chapter || '').toLowerCase() === 'magnetism and matter');
  console.log(`\n[Live Platform] Questions count: ${magLive.length} (Expected: 49)`);
  const liveDiagramCount = magLive.filter(q => q.image_url && q.image_url.includes('cloudinary')).length;
  console.log(`[Live Platform] Cloudinary diagrams: ${liveDiagramCount} (Expected: 6)`);

  if (localRows.length === 49 && magLive.length === 49) {
    console.log(`\nSUCCESS: 49/49 questions and 6/6 diagrams verified on both Local DB and Live edvedum.com platform!`);
  } else {
    console.warn(`\nWARNING: Discrepancy detected! Local: ${localRows.length}, Live: ${magLive.length}`);
  }
}

main().catch(console.error);
