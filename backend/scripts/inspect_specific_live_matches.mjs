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
  const list = data.data?.questions || data.questions || [];

  const targetIds = [8138, 8143, 8144, 8148, 8149];
  for (const id of targetIds) {
    const q = list.find(item => item.id === id);
    if (q) {
      console.log(`\n=== Live ID [${id}] ===`);
      console.log(`Chapter: ${q.chapter} (ID: ${q.chapter_id})`);
      console.log(`Question Text: ${q.question_text}`);
    }
  }
}

run().catch(console.error);
