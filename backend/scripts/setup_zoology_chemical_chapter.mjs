import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Chemical Coordination and Integration';

async function main() {
  console.log('--- 1. Setting up Local DB Zoology Chapter ---');
  let localRes = await query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 13 AND (LOWER(name) = LOWER($1) OR name ILIKE '%chemical coordination%')",
    [CHAPTER_NAME]
  );

  let localChapterId;
  if (localRes.rows.length > 0) {
    localChapterId = localRes.rows[0].id;
    console.log(`Found existing local chapter: ${localRes.rows[0].name} (ID: ${localChapterId})`);
  } else {
    const insertRes = await query(
      "INSERT INTO chapters (subject_id, name, position) VALUES (13, $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = 13)) RETURNING id, name",
      [CHAPTER_NAME]
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created new local chapter: ${insertRes.rows[0].name} (ID: ${localChapterId})`);
  }

  console.log('\n--- 2. Setting up Live Production Zoology Chapter ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/2/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const liveChapters = chData.chapters || chData.data || [];
  let liveChapter = liveChapters.find(c => c.name.toLowerCase().includes('chemical coordination'));

  let liveChapterId;
  if (liveChapter) {
    liveChapterId = liveChapter.id;
    console.log(`Found existing Live chapter: ${liveChapter.name} (ID: ${liveChapterId})`);
  } else {
    console.log(`Creating "${CHAPTER_NAME}" on Live...`);
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: 2,
        name: CHAPTER_NAME
      })
    });
    const createdData = await createRes.json();
    liveChapterId = createdData.chapter?.id || createdData.id || createdData.data?.id;
    console.log(`Created Live chapter ID: ${liveChapterId}`, createdData);
  }

  console.log(`\n==============================================`);
  console.log(`FINAL IDs FOR "Chemical Coordination and Integration":`);
  console.log(`Local Neon DB (Subject 13): Chapter ID = ${localChapterId}`);
  console.log(`Live Production API (Subject 2): Chapter ID = ${liveChapterId}`);
  console.log(`==============================================\n`);
}

main().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});

