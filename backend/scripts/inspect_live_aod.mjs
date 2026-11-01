import fs from 'fs';

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

async function checkLive() {
  const token = await getToken();

  // 1. Get chapters
  const chapRes = await fetch(`${LIVE_API}/admin/subjects/7/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const mathChaps = chapData.chapters || [];
  console.log('Live Math chapters count:', mathChaps.length);
  const aodChap = mathChaps.find(c => c.name.toLowerCase().includes('derivative'));
  console.log('AOD chapter match:', aodChap);

  // 2. Search questions in Application of Derivatives
  const qRes = await fetch(`${LIVE_API}/admin/question-bank?page=1&limit=100&subject=Mathematics&chapter=Application%20of%20Derivatives`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  console.log(`Live questions in 'Application of Derivatives': total=${qData.total || qData.questions?.length}`);
  if (qData.questions) {
    console.log('Sample questions:', qData.questions.slice(0, 5).map(q => ({ id: q.id, text: q.question_text?.slice(0, 60), chapter: q.chapter, chapter_id: q.chapter_id })));
  }
}

checkLive().catch(console.error);
