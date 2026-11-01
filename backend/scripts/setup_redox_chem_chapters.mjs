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
  console.log('=== Setting up Redox Reactions (Chemistry) Chapter ===\n');

  // 1. Local Neon DB
  // Check subject ID for Chemistry
  const subRes = await query(`SELECT id, name FROM subjects WHERE name ILIKE '%chem%'`);
  console.log('Local Chemistry subjects:', subRes.rows);
  const chemSubId = subRes.rows[0]?.id || 10;

  const localCheck = await query(`SELECT id, name FROM chapters WHERE subject_id = $1 AND name ILIKE '%redox%'`, [chemSubId]);
  let localChapterId;
  if (localCheck.rows.length > 0) {
    localChapterId = localCheck.rows[0].id;
    console.log(`Local chapter already exists: [${localChapterId}] ${localCheck.rows[0].name}`);
  } else {
    const insertRes = await query(
      `INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Redox Reactions', 0) RETURNING id`,
      [chemSubId]
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created local chapter 'Redox Reactions' with ID: ${localChapterId}`);
  }

  // 2. Live Production API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];
  
  let existingLive = liveChaps.find(c => c.name.toLowerCase().includes('redox'));
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
        name: 'Redox Reactions',
        position: 0
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id;
    console.log(`Live chapter created: ID ${liveChapterId}`);
  }

  console.log(`\nLocal Subject ID: ${chemSubId}, Local Chapter ID: ${localChapterId}`);
  console.log(`Live Subject ID: 6, Live Chapter ID: ${liveChapterId}`);
}

setup().catch(console.error);

