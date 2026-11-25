import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function inspectLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Test 1: Fetch without chapter filter to see what chapters are returned
  const res1 = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&limit=10&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data1 = await res1.json();
  console.log('Total questions in JEE Physics (unfiltered):', data1.total || data1.questions?.length);
  if (data1.questions && data1.questions.length > 0) {
    console.log('Sample question fields:', {
      id: data1.questions[0].id,
      category: data1.questions[0].category,
      subject: data1.questions[0].subject,
      chapter: data1.questions[0].chapter,
      chapter_id: data1.questions[0].chapter_id,
      exam_type: data1.questions[0].exam_type
    });
  }

  // Test 2: Fetch with chapter_id=198
  const res2 = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter_id=198&exam_type=JEE&limit=10&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data2 = await res2.json();
  console.log('Questions with chapter_id=198:', data2.total || data2.questions?.length);

  // Test 3: Fetch chapters list
  const res3 = await fetch(`${LIVE_API}/chapters?subject=Physics&exam_type=JEE`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data3 = await res3.json();
  const electroCh = (data3.chapters || data3 || []).filter(c => /electro/i.test(c.name));
  console.log('Electro chapters from API:', electroCh);
}

inspectLive().catch(console.error);
