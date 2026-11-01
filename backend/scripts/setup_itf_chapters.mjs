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

async function setupChapters() {
  // 1. Local Neon DB
  const localCheck = await query(`SELECT id, name FROM chapters WHERE subject_id = 21 AND name = 'Inverse Trignometry'`);
  let localChapterId;
  if (localCheck.rows.length > 0) {
    localChapterId = localCheck.rows[0].id;
    console.log(`Local chapter already exists with ID: ${localChapterId}`);
  } else {
    const insertRes = await query(
      `INSERT INTO chapters (subject_id, name, position) VALUES (21, 'Inverse Trignometry', 0) RETURNING id`
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created local chapter 'Inverse Trignometry' with ID: ${localChapterId}`);
  }

  // 2. Live Production API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];
  const existingLive = liveChaps.find(c => c.name.toLowerCase() === 'inverse trignometry' || c.name.toLowerCase() === 'inverse trigonometric functions');
  
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
        name: 'Inverse Trignometry',
        position: 0
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id;
    console.log(`Created Live chapter 'Inverse Trignometry' with ID: ${liveChapterId}`);
  }

  console.log(`Summary: Local chapter ID = ${localChapterId}, Live chapter ID = ${liveChapterId}`);
}

setupChapters().catch(console.error);

