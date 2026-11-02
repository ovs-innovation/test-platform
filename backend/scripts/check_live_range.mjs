const LIVE_API = 'https://edvedum.com/api';

async function checkRange() {
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

  const inTargetRange = questions.filter(q => q.id >= 14041 && q.id <= 14170);
  console.log(`Questions in range 14041-14170 found on live: ${inTargetRange.length}`);
  
  const chBreakdown = {};
  for (const q of inTargetRange) {
    chBreakdown[q.chapter] = (chBreakdown[q.chapter] || 0) + 1;
  }
  console.log('Target range chapters on live:', chBreakdown);

  const outsideRangeWithBasic = questions.filter(q => (q.chapter || '').includes('Basic') && (q.id < 14041 || q.id > 14170));
  console.log(`Outside range with Basic: ${outsideRangeWithBasic.length}`, outsideRangeWithBasic.map(q => ({ id: q.id, chapter: q.chapter, text: q.question_text?.substring(0, 40) })));
  
  process.exit(0);
}

checkRange().catch(console.error);

