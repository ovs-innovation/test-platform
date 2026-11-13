const LIVE_API = 'https://edvedum.com/api';

async function checkLivePyq() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  // Let's search questions with chapter_id 36 on live
  const qRes = await fetch(`${LIVE_API}/question-bank?chapter_id=36&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qs = qData.questions || qData.data || [];
  console.log(`Live questions for chapter_id 36: ${qs.length}`);
  const pyqCount = qs.filter(q => q.category === 'PYQ').length;
  const nonPyqCount = qs.filter(q => q.category !== 'PYQ').length;
  console.log(`PYQ count: ${pyqCount}, non-PYQ count: ${nonPyqCount}`);
  for (const q of qs) {
    if (q.category !== 'PYQ') {
      console.log('Found question whose category changed from PYQ:', q.id, q.category, q.subject, q.question_text.slice(0, 50));
    }
  }
}

checkLivePyq().catch(console.error);

