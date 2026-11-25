import fs from 'fs';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('=== VERIFYING LIVE EDVEDUM QUESTIONS ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // 1. Check JEE questions
  const jeeRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Alternating+Current&exam_type=JEE&refresh=true&limit=250`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const jeeData = await jeeRes.json();
  const jeeQuestions = jeeData?.questions || [];

  console.log(`\nJEE Questions fetched: ${jeeQuestions.length} (Expected 177)`);

  let mcqCount = 0;
  let numCount = 0;
  let diagCount = 0;
  let dummyCount = 0;

  jeeQuestions.forEach((q, idx) => {
    if (q.question_type === 'numerical') {
      numCount++;
    } else {
      mcqCount++;
      if (q.options?.length !== 4) {
        console.warn(`Q ID ${q.id} index ${idx} has ${q.options?.length} options instead of 4!`);
      }
      for (const opt of (q.options || [])) {
        const text = typeof opt === 'string' ? opt : opt.text;
        if (/^(\([A-D]\)|Option\s+[A-D])$/i.test((text || '').trim())) {
          dummyCount++;
        }
      }
    }
    if (q.image_url) {
      diagCount++;
    }
  });

  console.log('--- JEE LIVE INTEGRITY REPORT ---');
  console.log(`Total questions: ${jeeQuestions.length}`);
  console.log(`MCQs: ${mcqCount} (Expected 126)`);
  console.log(`Numericals: ${numCount} (Expected 51)`);
  console.log(`Diagrams: ${diagCount} (Expected 34)`);
  console.log(`Dummy options: ${dummyCount} (Strictly 0)`);

  // 2. Check NEET questions preservation
  const neetRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Alternating+Current&exam_type=NEET&refresh=true&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const neetData = await neetRes.json();
  console.log(`NEET questions total in live response: ${neetData?.total || neetData?.questions?.length || 'preserved in DB'}`);

  // 3. Sample check 5 questions with diagrams
  const diagQs = jeeQuestions.filter(q => q.image_url).slice(0, 5);
  console.log('\nSample diagram questions on live:');
  diagQs.forEach(q => {
    console.log(`ID: ${q.id} | Diagram URL: ${q.image_url}`);
  });

  if (jeeQuestions.length === 177 && dummyCount === 0 && diagCount === 34) {
    console.log('\n>>> LIVE VERIFICATION PASSED PERFECTLY! <<<');
  } else {
    console.error('\n>>> LIVE VERIFICATION FAILED EXPECTATIONS! <<<');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
