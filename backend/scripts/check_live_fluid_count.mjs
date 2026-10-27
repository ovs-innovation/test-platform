const LIVE_API = 'https://edvedum.com/api';
const loginRes = await fetch(`${LIVE_API}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
});
const token = (await loginRes.json()).token;

const liveRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
  headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
});
const liveData = await liveRes.json();
const questions = liveData.questions || [];
const fluidQs = questions.filter(q => q.chapter_id === 28 || q.chapter?.toLowerCase().includes('fluid'));
console.log('Existing fluid questions on live edvedum:', fluidQs.length);
