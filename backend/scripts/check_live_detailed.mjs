const LIVE_API = 'https://edvedum.com/api';

async function checkLiveDetailed() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=4000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (qRes.ok) {
    const qData = await qRes.json();
    const qs = qData.questions || qData.data || [];
    const ch36 = qs.filter(q => Number(q.chapter_id) === 36 || Number(q.chapter_id) === 133);
    console.log(`Questions with chapter_id 36 or 133: ${ch36.length}`);
    if (ch36.length > 0) {
      console.log('Sample question:');
      console.log(ch36[0].id, ch36[0].question_text.slice(0, 80));
    }
  }
}

checkLiveDetailed().catch(console.error);

