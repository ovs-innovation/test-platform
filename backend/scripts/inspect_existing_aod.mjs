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
  
  const aodQs = questions.filter(q => (q.chapter || '').toLowerCase().includes('derivative'));
  console.log(`Found ${aodQs.length} existing live AOD questions:`);
  for (const q of aodQs) {
    console.log(`ID: ${q.id} | chapter_id: ${q.chapter_id} | chapter: "${q.chapter}" | text: ${q.question_text?.slice(0, 80)}...`);
  }

  // Also check chapters endpoint for subject 7
  const chapRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  console.log('Math chapters list from subject 7:');
  console.log(chapData.chapters?.map(c => ({ id: c.id, name: c.name })));
}

run().catch(console.error);

