const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.data?.token || loginData.accessToken;

  const res = await fetch(`${LIVE_API}/question-bank?category=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];

  const cellQuestions = questions.filter(
    q => (q.chapter && q.chapter.toLowerCase().includes('unit of life')) || q.chapter_id === 257
  );

  console.log(`Total Botany questions on Live: ${questions.length}`);
  console.log(`Cell: The Unit of Life questions on Live: ${cellQuestions.length}`);

  const withDiagrams = cellQuestions.filter(q => q.image_url);
  console.log(`Questions with diagram images: ${withDiagrams.length}`);
  withDiagrams.forEach(q => console.log(`  - ID: ${q.id}, Image: ${q.image_url}`));

  const sample = cellQuestions[0];
  console.log('\nSample Question:', {
    id: sample.id,
    chapter: sample.chapter,
    chapter_id: sample.chapter_id,
    marks: sample.marks,
    question_type: sample.question_type,
    text: sample.question_text.slice(0, 80) + '...'
  });
}

verify().catch(console.error);
