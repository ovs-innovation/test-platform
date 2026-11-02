import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function setupChapters() {
  // 1. Local DB
  console.log('--- Checking Local DB ---');
  let localRes = await query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 15 AND (LOWER(name) = 'cell cycle and cell division' OR LOWER(name) = 'cell cycle & cell division')"
  );

  let localChapterId;
  if (localRes.rows.length > 0) {
    localChapterId = localRes.rows[0].id;
    console.log(`Found existing local chapter: ${localRes.rows[0].name} (ID: ${localChapterId})`);
  } else {
    // Check if chapter 79 ('Cell Biology & Cell Division') has questions or if we should insert a dedicated 'Cell Cycle and Cell Division'
    const insertRes = await query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1)) RETURNING id, name",
      [15, 'Cell Cycle and Cell Division']
    );
    localChapterId = insertRes.rows[0].id;
    console.log(`Created new local chapter: ${insertRes.rows[0].name} (ID: ${localChapterId})`);
  }

  // 2. Live API
  console.log('\n--- Checking Live API ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const liveChapters = chData.chapters || chData.data || [];
  let liveChapter = liveChapters.find(
    c => c.name.toLowerCase() === 'cell cycle and cell division' || c.name.toLowerCase() === 'cell cycle & cell division'
  );

  let liveChapterId;
  if (liveChapter) {
    liveChapterId = liveChapter.id;
    console.log(`Found existing Live chapter: ${liveChapter.name} (ID: ${liveChapterId})`);
  } else {
    console.log('Creating "Cell Cycle and Cell Division" on Live...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: 10,
        name: 'Cell Cycle and Cell Division'
      })
    });
    const createdData = await createRes.json();
    liveChapterId = createdData.chapter?.id || createdData.id || createdData.data?.id;
    console.log(`Created Live chapter ID: ${liveChapterId}`, createdData);
  }

  console.log(`\nLocal Chapter ID: ${localChapterId}`);
  console.log(`Live Chapter ID: ${liveChapterId}`);
}

setupChapters().catch(console.error);

