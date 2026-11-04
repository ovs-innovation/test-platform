import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Trignometric Ratio and Identities';

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function run() {
  console.log(`--- Setting up "${CHAPTER_NAME}" Chapter ---`);

  // 1. Local Neon DB: Subject ID = 21 (Mathematics)
  let localChap = await query(
    "SELECT id, name FROM chapters WHERE subject_id = 21 AND LOWER(name) = LOWER($1)",
    [CHAPTER_NAME]
  );
  let localChapterId;
  if (localChap.rows.length === 0) {
    const insertRes = await query(
      "INSERT INTO chapters (name, subject_id) VALUES ($1, 21) RETURNING id, name",
      [CHAPTER_NAME]
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created Local Chapter: ${insertRes.rows[0].name} (ID: ${localChapterId})`);
  } else {
    localChapterId = localChap.rows[0].id;
    console.log(`Existing Local Chapter: ${localChap.rows[0].name} (ID: ${localChapterId})`);
  }

  // 2. Live Production: Subject ID = 7 (Mathematics)
  const token = await getLiveToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const existingLive = (listData.chapters || []).find(
    c => c.name.toLowerCase() === CHAPTER_NAME.toLowerCase()
  );
  let liveChapterId;
  if (existingLive) {
    liveChapterId = existingLive.id;
    console.log(`Existing Live Chapter: ${existingLive.name} (ID: ${liveChapterId})`);
  } else {
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject_id: 7, name: CHAPTER_NAME })
    });
    const createData = await createRes.json();
    console.log('Create chapter response:', createData);
    liveChapterId = createData.chapter?.id || createData.id || createData.data?.id;
    console.log(`Created Live Chapter: ${CHAPTER_NAME} (ID: ${liveChapterId})`);
  }

  console.log(`\nLocal Chapter ID: ${localChapterId}`);
  console.log(`Live Chapter ID: ${liveChapterId}`);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
