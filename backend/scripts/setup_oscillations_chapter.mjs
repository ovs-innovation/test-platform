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
      console.warn(`Login attempt ${attempt} returned status: ${res.status}`);
    } catch (e) {
      console.warn(`Login attempt ${attempt} failed: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('Could not login to Live API after 5 attempts');
}

async function run() {
  console.log('--- Setting up "Oscillations" Chapter ---');
  
  // 1. Local Neon DB
  const client = await pool.connect();
  let localChapterId;
  let localSubjectId = 11;
  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
    if (subRes.rows.length > 0) localSubjectId = subRes.rows[0].id;
    console.log(`Local Physics subject ID: ${localSubjectId}`);

    let chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = 'oscillations'",
      [localSubjectId]
    );

    if (chapRes.rows.length === 0) {
      const insRes = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ('Oscillations', $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1), NOW()) RETURNING id, name",
        [localSubjectId]
      );
      localChapterId = insRes.rows[0].id;
      console.log(`Created Local chapter 'Oscillations' with ID: ${localChapterId}`);
    } else {
      localChapterId = chapRes.rows[0].id;
      console.log(`Existing Local chapter found with ID: ${localChapterId} (${chapRes.rows[0].name})`);
    }
  } finally {
    client.release();
  }

  // 2. Live API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapters = await listRes.json();
  const list = Array.isArray(chapters) ? chapters : (chapters.data || chapters.chapters || []);
  
  let liveChapter = list.find(c => (c.name || '').trim().toLowerCase() === 'oscillations');
  let liveChapterId;

  if (!liveChapter) {
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject_id: 5, name: 'Oscillations' })
    });
    if (!createRes.ok) throw new Error(`Failed to create live chapter: ${createRes.status} ${await createRes.text()}`);
    const created = await createRes.json();
    liveChapterId = created.chapter?.id || created.id || created.data?.id;
    console.log(`Created Live chapter 'Oscillations' with ID: ${liveChapterId}`);
  } else {
    liveChapterId = liveChapter.id;
    console.log(`Existing Live chapter found with ID: ${liveChapterId} (${liveChapter.name})`);
  }

  console.log(`\nResult: Local Chapter ID = ${localChapterId}, Live Chapter ID = ${liveChapterId}`);
  await pool.end();
}

run().catch(console.error);
