import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function verifyLive() {
  console.log('Logging in to live API...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  console.log('Fetching Electrostatics questions from live API with refresh=true...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];

  console.log('=== LIVE API VERIFICATION RESULTS ===');
  console.log(`Total Electrostatics Questions: ${questions.length}`);
  console.log(`Questions with Question Diagram: ${questions.filter(q => q.image_url).length}`);
  console.log(`Questions with Solution Diagram: ${questions.filter(q => q.solution_image_url).length}`);
  console.log(`Numerical Questions: ${questions.filter(q => q.question_type === 'numerical').length}`);
  console.log(`MCQ Questions: ${questions.filter(q => q.question_type !== 'numerical').length}`);

  if (questions.length > 0) {
    console.log('\n--- Sample Question 1 ---');
    console.log(questions[0].question_text);
    console.log('Options:', questions[0].options);
    console.log('Correct Index:', questions[0].correct_index);

    const withDiag = questions.find(q => q.image_url);
    if (withDiag) {
      console.log('\n--- Sample Question with Diagram ---');
      console.log('Question Text:', withDiag.question_text.substring(0, 100));
      console.log('Diagram URL:', withDiag.image_url);
      console.log('Solution Diagram URL:', withDiag.solution_image_url);
    }

    const numericalSample = questions.find(q => q.question_type === 'numerical');
    if (numericalSample) {
      console.log('\n--- Sample Numerical Question ---');
      console.log('Question Text:', numericalSample.question_text.substring(0, 100));
      console.log('Numeric Answer:', numericalSample.numeric_answer);
    }
  }
}

verifyLive().catch(console.error);
