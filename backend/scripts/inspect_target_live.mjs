const LIVE_API = 'https://edvedum.com/api';

async function checkLiveQuestions() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const json = await res.json();
  const questions = json.questions || json.data?.questions || [];

  const target = questions.filter(q => q.id >= 14041 && q.id <= 14170);
  console.log(`Found ${target.length} target questions.`);
  
  const sampleNonBasic = target.filter(q => q.chapter !== 'Some Basic Concepts of Chemistry');
  console.log('Sample non-basic target questions on live:', sampleNonBasic.slice(0, 5).map(q => ({
    id: q.id,
    chapter: q.chapter,
    topic: q.topic,
    text: q.question_text?.substring(0, 50)
  })));

  process.exit(0);
}

checkLiveQuestions().catch(console.error);

