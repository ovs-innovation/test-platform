const LIVE_API = 'https://edvedum.com/api';

const CHAPTER_MAP = {
  37: 'Solutions',
  36: 'Biomolecules',
  15: 'Electrochemistry',
  14: 'Chemical Kinetics',
  34: 'Haloalkanes and Haloarenes'
};

async function fix26() {
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

  const outside = questions.filter(q => (q.chapter || '').includes('Basic') && (q.id < 14041 || q.id > 14170));
  console.log(`Found ${outside.length} outside questions to fix on Live.`);

  for (const q of outside) {
    const targetChap = CHAPTER_MAP[q.chapter_id] || 'Solutions';
    const payload = {
      ...q,
      chapter: targetChap,
      chapter_name: targetChap
    };
    // Ensure marks and difficulty exist
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
      console.log(`✅ Fixed Live Q${q.id} -> ${targetChap}`);
    } else {
      console.error(`❌ Failed Q${q.id}: ${putRes.status} ${await putRes.text()}`);
    }
  }

  process.exit(0);
}

fix26().catch(console.error);

