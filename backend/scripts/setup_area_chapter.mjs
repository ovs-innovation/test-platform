import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function setup() {
  console.log('=== Checking Local Neon DB for chapter Area under curves ===');
  const localRes = await query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = 21 AND LOWER(name) LIKE '%area%'"
  );
  console.log('Local DB chapters matching area:', localRes.rows);

  let localChapterId = null;
  const exactLocal = localRes.rows.find(c => c.name.toLowerCase() === 'area under curves' || c.name.toLowerCase() === 'area under the curves');
  if (exactLocal) {
    localChapterId = exactLocal.id;
    console.log('Found exact local chapter:', exactLocal);
  } else {
    console.log('Creating local chapter "Area under curves"...');
    const ins = await query(
      "INSERT INTO chapters (name, subject_id, position) VALUES ($1, 21, 0) RETURNING id, name",
      ['Area under curves']
    );
    localChapterId = ins.rows[0].id;
    console.log('Created local chapter:', ins.rows[0]);
  }

  console.log('\n=== Checking Live Production API for chapter Area under curves ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.data?.token || loginData.accessToken;

  const chapRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const chapters = chapData.chapters || chapData.data || [];
  const liveMatches = chapters.filter(c => c.name.toLowerCase().includes('area'));
  console.log('Live API chapters matching area:', liveMatches);

  let liveChapterId = null;
  const exactLive = chapters.find(c => c.name.toLowerCase() === 'area under curves' || c.name.toLowerCase() === 'area under the curves');
  if (exactLive) {
    liveChapterId = exactLive.id;
    console.log('Found exact live chapter:', exactLive);
  } else {
    console.log('Creating live chapter "Area under curves"...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Area under curves', subject_id: 7 })
    });
    const createdData = await createRes.json();
    console.log('Created on Live API:', createdData);
    liveChapterId = createdData.id || createdData.data?.id;
  }

  console.log('\n==================================================');
  console.log(`Local Chapter ID: ${localChapterId}`);
  console.log(`Live Chapter ID: ${liveChapterId}`);
  console.log('==================================================\n');

  process.exit(0);
}

setup().catch(err => {
  console.error(err);
  process.exit(1);
});

