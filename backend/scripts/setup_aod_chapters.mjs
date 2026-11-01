import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function setup() {
  console.log('=== Setting up Application of Derivatives chapters ===\n');

  // 1. Local Neon DB
  const localCheck = await query(`SELECT id, name FROM chapters WHERE subject_id = 21 AND name = 'Application of Derivatives'`);
  let localChapterId;
  if (localCheck.rows.length > 0) {
    localChapterId = localCheck.rows[0].id;
    console.log(`Local chapter already exists with ID: ${localChapterId}`);
  } else {
    const insertRes = await query(
      `INSERT INTO chapters (subject_id, name, position) VALUES (21, 'Application of Derivatives', 0) RETURNING id`
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created local chapter 'Application of Derivatives' with ID: ${localChapterId}`);
  }

  // 2. Live Production API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];
  
  let existingLive = liveChaps.find(c => c.name.toLowerCase() === 'application of derivatives');
  let liveChapterId;

  if (existingLive) {
    liveChapterId = existingLive.id;
    console.log(`Live chapter already exists: [${existingLive.id}] ${existingLive.name}`);
  } else {
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: 7,
        name: 'Application of Derivatives',
        position: liveChaps.length
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id || createData.id || createData.data?.id;
    console.log(`Created live chapter 'Application of Derivatives' with ID: ${liveChapterId}`);
  }

  console.log('\nFinal Chapter IDs:');
  console.log(`  Local Neon DB: ${localChapterId}`);
  console.log(`  Live Production: ${liveChapterId}`);
}

setup().catch(console.error);

