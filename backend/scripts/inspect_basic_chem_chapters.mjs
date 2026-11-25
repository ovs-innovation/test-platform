import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const LIVE_API = 'https://edvedum.com/api';

async function check() {
  console.log('--- 1. NEON DATABASE ---');
  const client = await pool.connect();
  let neonChapter = null;
  let chemSubId = null;
  try {
    const subs = await client.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry'");
    console.log('Neon Chemistry subject:', subs.rows);
    chemSubId = subs.rows[0]?.id;
    const chapters = await client.query("SELECT id, subject_id, name FROM chapters WHERE subject_id = $1 AND name ILIKE '%some basic concepts of chemistry%'", [chemSubId]);
    console.log('Neon Basic Concepts chapters:', chapters.rows);

    if (chapters.rows.length > 0) {
      neonChapter = chapters.rows[0];
    } else {
      console.log('Creating chapter "Some Basic Concepts of Chemistry" in Neon...');
      const insRes = await client.query(
        "INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id, subject_id, name",
        [chemSubId, 'Some Basic Concepts of Chemistry']
      );
      neonChapter = insRes.rows[0];
      console.log('Created Neon chapter:', neonChapter);
    }
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- 2. LIVE VPS ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const liveSubs = subData.subjects || subData || [];
  const liveChem = liveSubs.find(s => s.name?.toLowerCase() === 'chemistry');
  console.log('Live Chemistry subject:', liveChem);

  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveChem.id}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChData = await liveChRes.json();
  const liveChapters = liveChData.chapters || liveChData || [];
  console.log('All Live Chemistry chapters count:', liveChapters.length);
  const matched = liveChapters.filter(c => c.name?.toLowerCase().includes('basic') || c.name?.toLowerCase().includes('mole') || c.name?.toLowerCase().includes('concept'));
  console.log('All Live candidate chapters:', matched.map(m => ({ id: m.id, name: m.name })));

  let liveMatch = liveChapters.find(c => c.name?.toLowerCase().trim() === 'some basic concepts of chemistry');
  if (!liveMatch) {
    liveMatch = liveChapters.find(c => c.name?.toLowerCase().includes('basic concept'));
  }
  console.log('Best Live Basic Concepts chapter match:', liveMatch);

  if (!liveMatch) {
    console.log('Creating chapter "Some Basic Concepts of Chemistry" on Live VPS...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: liveChem.id,
        name: 'Some Basic Concepts of Chemistry'
      })
    });
    const createData = await createRes.json();
    console.log('Created live chapter:', createData);
    liveMatch = createData.chapter || createData;
  }

  console.log('\n--- SUMMARY ---');
  console.log('Neon Subject ID:', chemSubId, 'Chapter ID:', neonChapter.id, 'Chapter Name:', neonChapter.name);
  console.log('Live Subject ID:', liveChem.id, 'Chapter ID:', liveMatch.id, 'Chapter Name:', liveMatch.name);
}

check().catch(console.error);
