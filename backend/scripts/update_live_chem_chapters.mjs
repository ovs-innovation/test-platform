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

async function updateLive() {
  const token = await getToken();
  console.log('Got token. Fetching local questions...');
  const localRes = await query(
    `SELECT * FROM question_bank WHERE chapter = 'Some Basic Concepts of Chemistry' ORDER BY id ASC`
  );
  console.log(`Found ${localRes.rows.length} local rows.`);

  // Update live IDs 14041 to 14067
  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const liveId = 14041 + i;
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Chemistry',
      chapter: 'Some Basic Concepts of Chemistry',
      chapter_name: 'Some Basic Concepts of Chemistry',
      chapter_id: 127,
      subject_id: 10,
      question_type: q.question_type,
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      topic: q.topic,
      difficulty: q.difficulty || 'medium',
      marks: q.marks || (isAR ? 4 : 1),
      status: 'available'
    };

    if (isAR) {
      payload.assertion_text = q.assertion_text;
      payload.reason_text = q.reason_text;
    }

    const putRes = await fetch(`${LIVE_API}/question-bank/${liveId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (putRes.ok) {
      console.log(`✅ Updated Live ID ${liveId}: ${q.question_type} - "${q.question_text.substring(0, 40)}..."`);
    } else {
      console.error(`❌ Failed to update Live ID ${liveId}: ${putRes.status} ${await putRes.text()}`);
    }
  }

  process.exit(0);
}

updateLive().catch(err => {
  console.error(err);
  process.exit(1);
});
