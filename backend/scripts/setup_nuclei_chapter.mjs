import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function setupChapter() {
  console.log('=== Step 1: Checking "Nuclei" in Neon DB ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  let neonChapterId = null;
  try {
    const s = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics'");
    const subId = s.rows[0].id;
    console.log('Physics Subject ID in Neon:', subId);

    const ch = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND name ILIKE 'Nuclei'", [subId]);
    if (ch.rows.length === 0) {
      const ins = await client.query("INSERT INTO chapters (subject_id, name) VALUES ($1, 'Nuclei') RETURNING id, name", [subId]);
      neonChapterId = ins.rows[0].id;
      console.log(`Created new chapter in Neon DB: "${ins.rows[0].name}" with ID: ${neonChapterId}`);
    } else {
      neonChapterId = ch.rows[0].id;
      console.log(`Chapter already exists in Neon DB: "${ch.rows[0].name}" with ID: ${neonChapterId}`);
    }
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Step 2: Checking "Nuclei" in Live edvedum.com ===');
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
  console.log('Physics Subject ID in Live:', physicsSub.id);

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === 'nuclei');

  if (!liveChap) {
    console.log("Registering 'Nuclei' on live edvedum.com...");
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: physicsSub.id,
        name: 'Nuclei',
        position: 22
      })
    });

    if (createRes.ok) {
      const data = await createRes.json();
      liveChap = data.chapter;
      console.log('Created chapter successfully on live:', liveChap);
    } else {
      console.error('Failed to create chapter:', createRes.status, await createRes.text());
    }
  } else {
    console.log('Chapter already exists on live:', liveChap);
  }

  console.log(`\nReady! Neon Chapter ID: ${neonChapterId}, Live Chapter ID: ${liveChap?.id}`);
}

setupChapter().catch(console.error);
