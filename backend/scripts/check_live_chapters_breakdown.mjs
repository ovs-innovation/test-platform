const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Total live JEE Physics questions: ${questions.length}`);

  const chCounts = {};
  for (const q of questions) {
    chCounts[q.chapter] = (chCounts[q.chapter] || 0) + 1;
  }
  console.log('Chapters in live JEE Physics:', chCounts);

  const sampleLom = questions.filter(q => q.chapter === 'Laws of Motion');
  console.log(`Live Laws of Motion count: ${sampleLom.length}`);
  if (sampleLom.length > 0) {
    console.log('First 3 LOM on live:', sampleLom.slice(0, 3).map(q => ({
      id: q.id,
      text: q.question_text?.slice(0, 80),
      options: q.options,
      image_url: q.image_url
    })));
  }
}

main().catch(console.error);
