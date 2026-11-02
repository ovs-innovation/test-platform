import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function setupChapters() {
  // 1. Local DB
  console.log('--- Checking Local DB ---');
  let localRes = await query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 15 AND (LOWER(name) = 'photosynthesis in higher plants' OR LOWER(name) LIKE '%photosynthesis%')"
  );

  let localChapterId;
  if (localRes.rows.length > 0) {
    localChapterId = localRes.rows[0].id;
    console.log(`Found existing local chapter: ${localRes.rows[0].name} (ID: ${localChapterId})`);
  } else {
    const insertRes = await query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1)) RETURNING id, name",
      [15, 'Photosynthesis in Higher Plants']
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
    c => c.name.toLowerCase() === 'photosynthesis in higher plants' || c.name.toLowerCase().includes('photosynthesis')
  );

  let liveChapterId;
  if (liveChapter) {
    liveChapterId = liveChapter.id;
    console.log(`Found existing Live chapter: ${liveChapter.name} (ID: ${liveChapterId})`);
  } else {
    console.log('Creating "Photosynthesis in Higher Plants" on Live...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: 10,
        name: 'Photosynthesis in Higher Plants'
      })
    });
    const createdData = await createRes.json();
    liveChapterId = createdData.chapter?.id || createdData.id || createdData.data?.id;
    console.log(`Created Live chapter ID: ${liveChapterId}`, createdData);
  }

  console.log(`\nFinal Local Chapter ID: ${localChapterId}`);
  console.log(`Final Live Chapter ID: ${liveChapterId}`);
}

setupChapters().catch(console.error);

