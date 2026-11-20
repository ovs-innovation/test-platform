import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function verifyLiveGravitationDetailed() {
  console.log('=== DETAILED VERIFICATION OF GRAVITATION ON LIVE SERVER ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qbRes.json();
  const allQuestions = data.questions || [];

  const gravQuestions = allQuestions.filter(q => (q.chapter || '').toLowerCase() === 'gravitation');
  console.log(`1. Total Gravitation questions on live: ${gravQuestions.length}`);

  let dummyOptionsCount = 0;
  let diagramsCount = 0;
  let numericalCount = 0;
  let mcqCount = 0;

  for (const q of gravQuestions) {
    if (q.image_url && q.image_url.includes('cloudinary.com')) {
      diagramsCount++;
    }
    if (q.question_type === 'numerical' || q.numeric_answer !== null) {
      numericalCount++;
    } else {
      mcqCount++;
      if (q.options) {
        for (const opt of q.options) {
          if (/^Option\s*\([A-D]\)$/i.test(opt.text?.trim())) {
            dummyOptionsCount++;
          }
        }
      }
    }
  }

  console.log(`2. Total MCQ questions: ${mcqCount}`);
  console.log(`3. Total Numerical questions: ${numericalCount}`);
  console.log(`4. Total Cloudinary diagrams attached: ${diagramsCount}`);
  console.log(`5. Total dummy options: ${dummyOptionsCount}`);

  // Sample 2 diagrams and 2 numericals
  const sampleDiagrams = gravQuestions.filter(q => q.image_url).slice(0, 2);
  console.log('\n--- Sample Diagram Questions ---');
  sampleDiagrams.forEach(q => {
    console.log(`[ID: ${q.id}] Stem: "${q.question_text?.slice(0, 60)}..."`);
    console.log(`Image URL: ${q.image_url}`);
  });

  const sampleNumericals = gravQuestions.filter(q => q.question_type === 'numerical').slice(0, 2);
  console.log('\n--- Sample Numerical Questions ---');
  sampleNumericals.forEach(q => {
    console.log(`[ID: ${q.id}] Stem: "${q.question_text?.slice(0, 60)}..."`);
    console.log(`Numeric Answer: ${q.numeric_answer}`);
  });

  console.log('\n========================================================');
  if (gravQuestions.length === 228 && dummyOptionsCount === 0 && diagramsCount === 24 && numericalCount === 16) {
    console.log('>>> ALL VERIFICATION CHECKS PASSED PERFECTLY! <<<');
  } else {
    console.log('>>> VERIFICATION WARNING: Check metrics above <<<');
  }
}

verifyLiveGravitationDetailed().catch(console.error);
