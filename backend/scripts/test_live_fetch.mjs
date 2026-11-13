const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('Logging in...');
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  const token = data.token;
  console.log('Logged in successfully!');

  console.log('Fetching questions with category=PYQ and subject=Physics...');
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  console.log('Response status:', qRes.status);
  const qData = await qRes.json();
  const questions = qData.questions || [];
  console.log(`Total questions: ${questions.length}`);

  const sample = questions.filter(q => q.question_text && q.question_text.includes('thin tube'));
  console.log('Sample question matching "thin tube":', sample.map(q => ({
    id: q.id,
    chapter_id: q.chapter_id,
    chapter: q.chapter,
    category: q.category,
    subject: q.subject
  })));

  const chCounts = {};
  for (const q of questions) {
    chCounts[q.chapter] = (chCounts[q.chapter] || 0) + 1;
  }
  console.log('Chapters in returned PYQ questions:', chCounts);
}

main().catch(console.error);

