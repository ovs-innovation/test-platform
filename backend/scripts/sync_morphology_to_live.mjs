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

async function syncToLive() {
  console.log('=== Syncing Morphology of Flowering Plants (128 Qs) to Live API ===');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained auth token.');

  const localRes = await pool.query(
    "SELECT * FROM question_bank WHERE chapter_id = 162 ORDER BY id ASC"
  );
  console.log(`Found ${localRes.rows.length} local rows in Morphology of Flowering Plants (chapter_id 162).`);

  let created = 0;
  const liveIds = [];

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Botany',
      subject: 'Botany',
      chapter: 'Morphology of Flowering Plants',
      chapter_name: 'Morphology of Flowering Plants',
      chapter_id: 237,
      subject_id: 10,
      question_type: isAR ? 'assertion_reason' : 'single_choice',
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url || null,
      topic: q.topic,
      difficulty: q.difficulty || 'medium',
      marks: q.marks || 4,
      status: 'available'
    };

    if (isAR) {
      payload.assertion_text = q.assertion_text;
      payload.reason_text = q.reason_text;
    }

    const postRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (postRes.ok) {
      const respData = await postRes.json();
      const newId = respData.id || respData.data?.id || respData.question?.id;
      if (newId) liveIds.push(newId);
      created++;
      if (created % 25 === 0 || created === localRes.rows.length) {
        console.log(`[Sync] Created ${created}/${localRes.rows.length} on Live (Latest Live ID: ${newId})`);
      }
    } else {
      const errText = await postRes.text();
      console.error(`[Sync Error] Failed Q #${i + 1} (Local ID ${q.id}): ${postRes.status} ${errText}`);
    }
  }

  console.log(`\n=== Live Sync Finished: ${created}/${localRes.rows.length} created ===`);
  if (liveIds.length > 0) {
    console.log(`Live IDs range: ${Math.min(...liveIds)} - ${Math.max(...liveIds)}`);
  }

  await pool.end();
}

syncToLive().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
