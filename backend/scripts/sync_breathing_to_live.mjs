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
  console.log('=== Syncing Breathing and Exchange of Gases (134 Qs) to Live API ===');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained auth token.');

  const localRes = await pool.query(
    "SELECT * FROM question_bank WHERE chapter_id = 159 ORDER BY id ASC"
  );
  console.log(`Found ${localRes.rows.length} local rows in Breathing and Exchange of Gases.`);

  let created = 0;
  const liveIds = [];

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Zoology',
      subject: 'Zoology',
      chapter: 'Breathing and Exchange of Gases',
      chapter_name: 'Breathing and Exchange of Gases',
      chapter_id: 231,
      subject_id: 2,
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
      if (created % 20 === 0 || created === localRes.rows.length) {
        console.log(`[Sync] Created ${created}/${localRes.rows.length} on Live (Latest Live ID: ${newId})`);
      }
    } else {
      const errText = await postRes.text();
      console.error(`Failed to create question ${q.id}: ${errText}`);
    }
  }

  console.log(`\nSuccessfully synced all ${created} questions to Live API.`);
  if (liveIds.length > 0) {
    const minLiveId = Math.min(...liveIds);
    const maxLiveId = Math.max(...liveIds);
    console.log(`Live IDs Range: ${minLiveId} to ${maxLiveId}`);
  }

  await pool.end();
  process.exit(0);
}

syncToLive().catch(async (err) => {
  console.error(err);
  await pool.end();
  process.exit(1);
});
