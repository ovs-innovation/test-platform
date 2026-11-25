import fs from 'fs';

const LIVE_API = 'https://edvedum.com/api';

async function finalLiveVerification() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter_id=246&refresh=true&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qb = await res.json();
  const questions = qb.questions || [];

  console.log(`Fetched ${questions.length} questions from Live production API.`);

  let diagrams = 0;
  let mcqCount = 0;
  let numCount = 0;
  let dummyCount = 0;

  for (const q of questions) {
    if (q.image_url) diagrams++;
    if (q.question_type === 'numerical') {
      numCount++;
    } else {
      mcqCount++;
      for (const opt of q.options || []) {
        const text = typeof opt === 'string' ? opt : opt.text;
        if (!text || text.includes('dummy') || text.startsWith('Option (')) {
          dummyCount++;
        }
      }
    }
  }

  console.log(`Live Verification Summary:`);
  console.log(`- Total Questions: ${questions.length}`);
  console.log(`- MCQs: ${mcqCount}`);
  console.log(`- Numericals: ${numCount}`);
  console.log(`- Diagrams: ${diagrams}`);
  console.log(`- Dummy Option Issues: ${dummyCount}`);

  if (questions.length === 245 && dummyCount === 0) {
    console.log('✅ ALL LIVE PRODUCTION CHECKS PASSED PERFECTLY!');
  } else {
    console.error('❌ Check failed.');
    process.exit(1);
  }
}

finalLiveVerification().catch(console.error);
