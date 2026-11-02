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
  console.log('=== Syncing Structure of Atom Questions to Live ===');
  const token = await getToken();
  console.log('Obtained auth token.');

  const localRes = await pool.query(
    "SELECT * FROM question_bank WHERE chapter_id = 77 ORDER BY id ASC"
  );
  console.log(`Found ${localRes.rows.length} local rows in Structure of Atom.`);

  let created = 0;
  const liveIds = [];

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Chemistry',
      chapter: 'Structure of Atom',
      chapter_name: 'Structure of Atom',
      chapter_id: 96,
      subject_id: 6,
      question_type: q.question_type,
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      image_url: q.image_url || null,
      topic: q.topic,
      difficulty: q.difficulty || 'medium',
      marks: q.marks || (isAR ? 4 : 1),
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
      if (created % 10 === 0 || created === localRes.rows.length) {
        console.log(`[Sync] Created ${created}/${localRes.rows.length} on Live (Latest Live ID: ${newId})`);
      }
    } else {
      console.error(`❌ Failed to create Q${q.id}: ${postRes.status} ${await postRes.text()}`);
    }

    // 80ms delay to be gentle with live API
    await new Promise(r => setTimeout(r, 80));
  }

  console.log(`Successfully synced ${created} questions to Live.`);
  console.log(`Live IDs range: Min ${Math.min(...liveIds)}, Max ${Math.max(...liveIds)}`);

  process.exit(0);
}

syncToLive().catch(err => {
  console.error(err);
  process.exit(1);
});

