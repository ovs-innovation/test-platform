import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allPyq = data.questions || [];
  console.log('Total PYQ Physics on live:', allPyq.length);
  const grav = allPyq.filter(q =>
    (q.chapter || '').toLowerCase().includes('gravitat') ||
    Number(q.chapter_id) === 190
  );
  console.log('Total Gravitation PYQ on live:', grav.length);
  if (grav.length > 0) {
    console.log('Sample grav question:', grav[0].id, grav[0].question_text.substring(0, 50));
  }
}

main().catch(console.error);
