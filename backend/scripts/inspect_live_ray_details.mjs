const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Ray%20Optics&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const qs = data.questions || [];
  console.log(`Total questions for Ray Optics on live API: ${qs.length}`);
  
  const byExam = {};
  const byChapterId = {};
  for (const q of qs) {
    byExam[q.exam_type] = (byExam[q.exam_type] || 0) + 1;
    byChapterId[q.chapter_id] = (byChapterId[q.chapter_id] || 0) + 1;
  }
  console.log('By exam_type:', byExam);
  console.log('By chapter_id:', byChapterId);
}

main().catch(console.error);
