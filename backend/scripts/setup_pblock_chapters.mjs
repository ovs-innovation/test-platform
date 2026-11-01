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
  const CHAPTER_NAME = 'The p-Block Elements (Gr. 13 & 14)';
  console.log(`=== Setting up Chapter: "${CHAPTER_NAME}" ===\n`);

  // 1. Local Neon DB
  const chemSubId = 10; // Chemistry
  const localCheck = await query(
    `SELECT id, name FROM chapters WHERE subject_id = $1 AND name = $2`,
    [chemSubId, CHAPTER_NAME]
  );

  let localChapterId;
  if (localCheck.rows.length > 0) {
    localChapterId = localCheck.rows[0].id;
    console.log(`Local chapter already exists: [${localChapterId}] ${localCheck.rows[0].name}`);
  } else {
    const insertRes = await query(
      `INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, 0) RETURNING id`,
      [chemSubId, CHAPTER_NAME]
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created local chapter '${CHAPTER_NAME}' with ID: ${localChapterId}`);
  }

  // 2. Live Production API
  const token = await getToken();
  const listRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await listRes.json();
  const liveChaps = listData.chapters || [];

  let existingLive = liveChaps.find(c => c.name.toLowerCase() === CHAPTER_NAME.toLowerCase());
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
        name: CHAPTER_NAME,
        position: 0
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id;
    console.log(`Live chapter created: [${liveChapterId}] ${createData.chapter?.name}`);
  }

  console.log(`\nLocal Subject ID: ${chemSubId}, Local Chapter ID: ${localChapterId}`);
  console.log(`Live Subject ID: 6, Live Chapter ID: ${liveChapterId}`);
  process.exit(0);
}

setup().catch(err => {
  console.error(err);
  process.exit(1);
});

