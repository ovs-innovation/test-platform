import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Dual Nature of Radiation and Matter';

async function check() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  console.log('Fetching Dual Nature questions from Live API with refresh=true...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Total questions returned for Dual Nature: ${questions.length}`);

  let mcqCount = 0;
  let numCount = 0;
  let diagCount = 0;
  let dummyCount = 0;

  for (const q of questions) {
    if (q.question_type === 'numerical') {
      numCount++;
    } else {
      mcqCount++;
      const opts = q.options || [];
      for (const opt of opts) {
        const text = typeof opt === 'string' ? opt : opt.text;
        if (!text || /^(?:\([A-D]\)|Option [A-D])$/i.test(text.trim())) {
          dummyCount++;
        }
      }
    }
    if (q.image_url) diagCount++;
  }

  console.log(`=== LIVE VERIFICATION SUMMARY ===`);
  console.log(`Total Questions: ${questions.length}`);
  console.log(`MCQs: ${mcqCount}`);
  console.log(`Numericals: ${numCount}`);
  console.log(`Diagrams: ${diagCount}`);
  console.log(`Dummy Options: ${dummyCount}`);

  if (questions.length > 0) {
    console.log('\n--- First Question (Q1) ---');
    console.log('ID:', questions[0].id);
    console.log('Text:', questions[0].question_text);
    console.log('Options:', questions[0].options);

    console.log('\n--- Sample Diagram Question (Q13) ---');
    const q13 = questions.find(q => q.question_text?.includes('Paragraph: Wave property'));
    console.log('ID:', q13?.id);
    console.log('Text:', q13?.question_text?.substring(0, 100));
    console.log('Image URL:', q13?.image_url);

    console.log('\n--- Sample Numerical Question (Q64) ---');
    const q64 = questions.find(q => q.question_type === 'numerical');
    console.log('ID:', q64?.id);
    console.log('Text:', q64?.question_text?.substring(0, 100));
    console.log('Numeric Answer:', q64?.numeric_answer);
    console.log('Options:', q64?.options);

    console.log('\n--- Last Question (Q217) ---');
    const last = questions[questions.length - 1];
    console.log('ID:', last.id);
    console.log('Text:', last.question_text);
    console.log('Options:', last.options);
  }
}

check().catch(console.error);
