const LIVE_API = 'https://edvedum.com/api';

async function verifyLive() {
  console.log('=== VERIFYING LIVE PRODUCTION QUESTIONS ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter_id=13&refresh=true&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qbRes.json();
  const questions = data.questions || [];

  console.log(`Live Question Bank returned: ${questions.length} questions`);

  if (questions.length !== 159) {
    console.error(`Mismatch: expected 159, got ${questions.length}`);
    process.exit(1);
  }

  let dummyCount = 0;
  let mcqCount = 0;
  let numCount = 0;
  let withDiagrams = 0;

  for (const q of questions) {
    if (q.question_type === 'numerical' || q.numeric_answer !== null) {
      numCount++;
    } else {
      mcqCount++;
      const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]');
      for (const opt of opts) {
        const text = typeof opt === 'string' ? opt : opt.text;
        if (!text || text.includes('Dummy') || text.startsWith('Option (')) {
          dummyCount++;
          console.error(`Dummy option in Q#${q.id}: ${text}`);
        }
      }
    }
    if (q.image_url || q.solution_image_url) {
      withDiagrams++;
    }
  }

  console.log(`Summary on Live:`);
  console.log(`- Total Questions: ${questions.length}`);
  console.log(`- MCQ Questions: ${mcqCount}`);
  console.log(`- Numerical Questions: ${numCount}`);
  console.log(`- Questions with Diagrams: ${withDiagrams}`);
  console.log(`- Dummy Options Found: ${dummyCount}`);

  if (dummyCount === 0 && questions.length === 159) {
    console.log('✅ LIVE PRODUCTION VERIFICATION PASSED 100% PERFECTLY!');
  } else {
    console.error('❌ LIVE PRODUCTION VERIFICATION FAILED');
    process.exit(1);
  }
}

verifyLive().catch(console.error);
