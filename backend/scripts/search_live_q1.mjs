const LIVE_API = 'https://edvedum.com/api';

async function searchLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  // Search by question text "Vapours of the liquid with higher boiling point" (Q1)
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const qs = data.questions || [];
  
  const q1 = qs.find(q => q.question_text?.includes('Vapours of the liquid with higher boiling point'));
  console.log('Found Q1 on live:', q1 ? {
    id: q1.id,
    category: q1.category,
    subject: q1.subject,
    chapter: q1.chapter,
    chapter_id: q1.chapter_id,
    exam_type: q1.exam_type
  } : 'NOT FOUND');

  const gocList = qs.filter(q => q.chapter_id === 249 || /basics?\s*of\s*organic/i.test(q.chapter || ''));
  console.log('Total GOC in PYQ on live:', gocList.length);
  const byExamType = {};
  gocList.forEach(q => {
    byExamType[q.exam_type] = (byExamType[q.exam_type] || 0) + 1;
  });
  console.log('GOC by exam_type in PYQ on live:', byExamType);
}

searchLive().catch(console.error);
