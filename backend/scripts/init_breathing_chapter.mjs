import { pool } from '../src/config/db.js';

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

async function initChapter() {
  const chapterName = 'Breathing and Exchange of Gases';
  console.log(`--- Initializing Local DB Chapter: "${chapterName}" ---`);

  let localRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 13 AND (name ILIKE '%breathing%' OR name ILIKE '%exchange of gases%')"
  );
  let localId;
  if (localRes.rows.length === 0) {
    const insertRes = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES (13, $1, 0) RETURNING id, name",
      [chapterName]
    );
    localId = insertRes.rows[0].id;
    console.log(`Created Local Chapter: ID ${localId} - "${insertRes.rows[0].name}"`);
  } else {
    localId = localRes.rows[0].id;
    console.log(`Local Chapter already exists: ID ${localId} - "${localRes.rows[0].name}"`);
  }

  console.log(`\n--- Initializing Live DB Chapter: "${chapterName}" ---`);
  const token = await getToken();

  const chRes = await fetch(`${LIVE_API}/admin/subjects/2/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const liveChapters = chData.data?.chapters || chData.chapters || [];
  let liveCh = liveChapters.find(c => /breathing\s*and\s*exchange\s*of\s*gases/i.test(c.name) || /breathing/i.test(c.name));

  let liveId;
  if (!liveCh) {
    const postRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: 2,
        name: chapterName,
        position: 0
      })
    });
    const postData = await postRes.json();
    liveId = postData.data?.chapter?.id || postData.chapter?.id || postData.id;
    console.log(`Created Live Chapter: ID ${liveId}`);
  } else {
    liveId = liveCh.id;
    console.log(`Live Chapter already exists: ID ${liveId} - "${liveCh.name}"`);
  }

  console.log(`\nLocal Chapter ID: ${localId}, Live Chapter ID: ${liveId}`);
  await pool.end();
}

initChapter().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
