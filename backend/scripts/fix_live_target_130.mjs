const LIVE_API = 'https://edvedum.com/api';

async function fixTarget130() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  const questions = json.questions || json.data?.questions || [];

  const target = questions.filter(q => q.id >= 14041 && q.id <= 14170);
  console.log(`Found ${target.length} target questions to set to chapter_id 95 and Some Basic Concepts of Chemistry.`);

  let updated = 0;
  for (const q of target) {
    const payload = {
      ...q,
      category: 'Chemistry',
      chapter: 'Some Basic Concepts of Chemistry',
      chapter_name: 'Some Basic Concepts of Chemistry',
      chapter_id: 95,
      subject_id: 6
    };
    payload.difficulty = payload.difficulty || 'medium';
    payload.marks = payload.marks || (payload.question_type === 'assertion_reason' ? 4 : 1);
    payload.status = payload.status || 'available';

    const putRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (putRes.ok) {
      updated++;
    } else {
      console.error(`❌ Failed Q${q.id}: ${putRes.status} ${await putRes.text()}`);
    }

    // Small delay to prevent rate limit
    await new Promise(r => setTimeout(r, 60));
  }

  console.log(`Successfully updated ${updated}/${target.length} questions on Live.`);
  process.exit(0);
}

fixTarget130().catch(console.error);

