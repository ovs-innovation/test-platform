import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function main() {
  const token = await getLiveToken();
  const liveSubjectsRes = await fetch(`${LIVE_API}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveSubjects = await liveSubjectsRes.json();
  console.log('Live subjects raw:', JSON.stringify(liveSubjects).slice(0, 300));

  // Also check all chapters on Live
  const liveChapsRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChaps = await liveChapsRes.json();
  console.log('Live chaps raw:', JSON.stringify(liveChaps).slice(0, 300));

  // Check questions
  const liveQBRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQB = await liveQBRes.json();
  const allQuestions = liveQB.questions || liveQB.data || [];
  const existingParabola = allQuestions.filter(q => q.chapter?.toLowerCase().includes('parabola'));
  console.log('Live existing Parabola questions count:', existingParabola.length);
}

main().catch(console.error);
