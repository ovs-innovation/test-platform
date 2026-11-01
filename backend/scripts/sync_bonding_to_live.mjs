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
  console.log('=== Syncing Chemical Bonding and Molecular Structure (168 Qs) to Live API ===');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain auth token from Live API');
  console.log('Obtained auth token.');

  const localRes = await pool.query(
    "SELECT * FROM question_bank WHERE chapter_id = 60 ORDER BY id ASC"
  );
  console.log(`Found ${localRes.rows.length} local rows in Chemical Bonding (chapter_id 60).`);

  let created = 0;
  const liveIds = [];

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const isAR = q.question_type === 'assertion_reason';

    const payload = {
      category: 'Chemistry',
      subject: 'Chemistry',
      chapter: 'Chemical Bonding and Molecular Structure',
      chapter_name: 'Chemical Bonding and Molecular Structure',
      chapter_id: 38,
      subject_id: 6,
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
        console.log(`[Live Sync Progress] ${created}/${localRes.rows.length} created on Live API.`);
      }
    } else {
      const errText = await postRes.text();
      console.error(`Failed to create question ${i + 1}: ${postRes.status} ${errText}`);
    }
  }

  console.log(`\n🎉 Live Sync Complete! ${created}/${localRes.rows.length} questions successfully created on Live API.`);

  // Verify live count
  const verifyRes = await fetch(`${LIVE_API}/question-bank?limit=15000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (verifyRes.ok) {
    const vData = await verifyRes.json();
    const allLive = vData.data || vData.questions || vData;
    const list = Array.isArray(allLive) ? allLive.filter(q => q.subject_id === 6 && (q.chapter_id === 38 || q.chapter === 'Chemical Bonding and Molecular Structure')) : [];
    const arLive = list.filter(q => q.question_type === 'assertion_reason' || (q.assertion_text && q.reason_text));
    const mcqLive = list.length - arLive.length;
    console.log(`\n--- Verified Live API Counts for Chemical Bonding and Molecular Structure (chapter_id 38) ---`);
    console.log(`Total on Live: ${list.length}`);
    console.log(`MCQs on Live:  ${mcqLive}`);
    console.log(`ARs on Live:   ${arLive.length}`);
  }

  await pool.end();
}

syncToLive().catch((err) => {
  console.error('Live sync failed:', err);
  process.exit(1);
});
