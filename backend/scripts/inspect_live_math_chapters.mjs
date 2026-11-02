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

async function run() {
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.data?.questions || data.questions || [];
  console.log(`Total live Mathematics questions: ${questions.length}`);

  const chapters = new Map();
  for (const q of questions) {
    const ch = q.chapter || q.chapter_name || 'Unknown';
    const chId = q.chapter_id;
    const key = `${chId} - ${ch}`;
    chapters.set(key, (chapters.get(key) || 0) + 1);
  }

  console.log('Live Mathematics Chapters in Question Bank:');
  for (const [ch, count] of chapters.entries()) {
    console.log(`  ${ch}: ${count} questions`);
  }
}

run().catch(console.error);

