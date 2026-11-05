import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function setup() {
  console.log('=== Checking Local Neon DB for chapter Indefinite Integration ===');
  const localRes = await query(
    'SELECT id, name, subject_id FROM chapters WHERE subject_id = 21 AND LOWER(name) = $1',
    ['indefinite integration']
  );
  let localChapterId = null;
  if (localRes.rows.length > 0) {
    console.log('Found in Local DB:', localRes.rows);
    localChapterId = localRes.rows[0].id;
  } else {
    console.log('Not found in Local DB, creating...');
    const insRes = await query(
      'INSERT INTO chapters (name, subject_id, position) VALUES ($1, 21, 0) RETURNING id',
      ['Indefinite Integration']
    );
    localChapterId = insRes.rows[0].id;
    console.log('Created in Local DB with ID:', localChapterId);
  }

  console.log('\n=== Checking Live Production API for chapter Indefinite Integration ===');
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
  const foundLive = chapters.find(c => c.name.toLowerCase() === 'indefinite integration');
  let liveChapterId = null;
  if (foundLive) {
    console.log('Found on Live API:', foundLive);
    liveChapterId = foundLive.id;
  } else {
    console.log('Not found on Live API, creating...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Indefinite Integration', subject_id: 7 })
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

