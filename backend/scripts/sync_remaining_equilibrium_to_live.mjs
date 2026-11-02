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

async function syncRemainingToLive() {
  console.log('=== Syncing Remaining Equilibrium Questions (MCQs + AR) to Live ===');
  const token = await getToken();
  console.log('Obtained auth token.');

  // Select questions with id >= 6031
  const localRes = await pool.query(
    "SELECT * FROM question_bank WHERE chapter_id = 73 AND id >= 6031 ORDER BY id ASC"
  );
  console.log(`Found ${localRes.rows.length} new local rows in Equilibrium.`);

  let created = 0;
  const liveIds = [];

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Chemistry',
      chapter: 'Equilibrium',
      chapter_name: 'Equilibrium',
      chapter_id: 146,
      subject_id: 6,
      question_type: isAR ? 'assertion_reason' : 'single_choice',
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url || null,
      topic: q.topic,
      difficulty: q.difficulty || 'medium',
      marks: q.marks || (isAR ? 4 : 4),
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
      const newId = respData.id || respData.data?.id;
      liveIds.push(newId);
      created++;
      console.log(`[Sync ${created}/${localRes.rows.length}] Created Live ID ${newId} (${q.question_type})`);
    } else {
      const errText = await postRes.text();
      console.error(`Failed to create question ${q.id}: ${errText}`);
    }
  }

  console.log(`Successfully synced ${created} questions to Live API.`);
  if (liveIds.length > 0) {
    console.log(`Live IDs Range: ${Math.min(...liveIds)} to ${Math.max(...liveIds)}`);
  }

  process.exit(0);
}

syncRemainingToLive().catch(err => {
  console.error(err);
  process.exit(1);
});

