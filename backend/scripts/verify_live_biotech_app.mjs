const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Zoology&chapter_id=207&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Live fetch response status:', res.status);
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Live Server returned ${questions.length} questions for Biotechnology and its Applications.`);
  
  if (questions.length > 0) {
    console.log('Sample question 1:', {
      id: questions[0].id,
      chapter: questions[0].chapter,
      question_text: questions[0].question_text.slice(0, 80),
      options: questions[0].options,
      correct_index: questions[0].correct_index
    });
  }
}

main().catch(console.error);

