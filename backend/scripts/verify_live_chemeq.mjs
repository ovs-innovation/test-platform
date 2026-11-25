import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log('Total live JEE Chemistry questions:', questions.length);

  const chemeqQuestions = questions.filter(q => 
    (q.chapter || '').toLowerCase().includes('chemical equilibrium') ||
    q.chapter_id === 11
  );
  console.log('Total live JEE Chemical Equilibrium questions:', chemeqQuestions.length);

  const mcqs = chemeqQuestions.filter(q => q.question_type === 'mcq');
  const nums = chemeqQuestions.filter(q => q.question_type === 'numerical');
  const withImages = chemeqQuestions.filter(q => q.image_url);

  console.log(`MCQs: ${mcqs.length}, Numericals: ${nums.length}, Diagrams: ${withImages.length}`);

  let dummyOptions = 0;
  for (const q of mcqs) {
    if (Array.isArray(q.options)) {
      for (const opt of q.options) {
        const txt = typeof opt === 'string' ? opt : opt.text;
        if (/^Option\s*\([A-D]\)$/i.test((txt || '').trim())) {
          dummyOptions++;
        }
      }
    }
  }
  console.log('Dummy options count:', dummyOptions);
}

main().catch(console.error);
