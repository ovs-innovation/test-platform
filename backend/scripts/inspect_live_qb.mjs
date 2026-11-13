import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function checkLivePYQ() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const questions = qData.questions || [];
  console.log(`Total PYQ Physics questions: ${questions.length}`);

  // Find the sample question
  const sampleQ = questions.filter(q => q.question_text && q.question_text.includes('infinitesimally thin tube'));
  console.log('\nSample question in live PYQ Physics:');
  console.log(sampleQ.map(q => ({
    id: q.id,
    chapter_id: q.chapter_id,
    chapter: q.chapter,
    category: q.category,
    subject: q.subject
  })));

  // Group by chapter_id and chapter
  const group = {};
  for (const q of questions) {
    const key = `${q.chapter_id} | ${q.chapter}`;
    group[key] = (group[key] || 0) + 1;
  }
  console.log('\nGrouped by chapter_id | chapter:');
  console.log(group);
}

checkLivePYQ().catch(console.error);
