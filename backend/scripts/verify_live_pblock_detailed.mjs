import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function verifyDetailed() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&refresh=true&limit=200`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qbRes.json();
  const questions = data.questions || [];
  console.log(`Fetched ${questions.length} questions from live question bank.`);

  // Sample Q1, Q6 (diagram), Q46 (numerical), Q69 (numerical)
  const q1 = questions.find(q => q.question_text?.includes('For making good quality mirrors'));
  const q6 = questions.find(q => q.question_text?.includes('structure of diborane'));
  const q46 = questions.find(q => q.question_text?.includes("Mohr's salt"));
  const q69 = questions.find(q => q.question_text?.includes('formula of Borax is'));

  console.log('\n--- Sample Q1 (MCQ) ---');
  console.log('Text:', q1?.question_text);
  console.log('Options:', q1?.options);
  console.log('Correct index:', q1?.correct_index);

  console.log('\n--- Sample Q6 (Diagram) ---');
  console.log('Text:', q6?.question_text);
  console.log('Image URL:', q6?.image_url);
  console.log('Options:', q6?.options);

  console.log('\n--- Sample Q46 (Numerical) ---');
  console.log('Text:', q46?.question_text);
  console.log('Question type:', q46?.question_type);
  console.log('Numeric answer:', q46?.numeric_answer);
  console.log('Options:', q46?.options);

  console.log('\n--- Sample Q69 (Numerical) ---');
  console.log('Text:', q69?.question_text);
  console.log('Question type:', q69?.question_type);
  console.log('Numeric answer:', q69?.numeric_answer);
  console.log('Options:', q69?.options);
}

verifyDetailed().catch(console.error);
