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
  console.log('=== Setting up Thermodynamics (Chemistry) Chapter ===\n');

  // 1. Local Neon DB
  const localCheck = await query(`SELECT id, name FROM chapters WHERE subject_id = 10 AND name = 'Thermodynamics'`);
  let localChapterId;
  if (localCheck.rows.length > 0) {
    localChapterId = localCheck.rows[0].id;
    console.log(`Local chapter already exists with ID: ${localChapterId}`);
  } else {
    const insertRes = await query(
      `INSERT INTO chapters (subject_id, name, position) VALUES (10, 'Thermodynamics', 0) RETURNING id`
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created local chapter 'Thermodynamics' with ID: ${localChapterId}`);
  }

  // 2. Live Production API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];
  
  let existingLive = liveChaps.find(c => c.name.toLowerCase() === 'thermodynamics');
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
        subject_id: 6,
        name: 'Thermodynamics',
        position: 0
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id;
    console.log(`Live chapter created: ID ${liveChapterId}`);
  }

  console.log(`\nLocal Chapter ID: ${localChapterId}, Live Chapter ID: ${liveChapterId}`);
}

setup().catch(console.error);

