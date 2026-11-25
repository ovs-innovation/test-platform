import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function test() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Fetch JEE Physics questions with refresh=true
  console.log('Fetching JEE Physics from live API...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Total questions returned for JEE Physics: ${questions.length}`);

  // Count by chapter
  const chapCounts = {};
  for (const q of questions) {
    const ch = q.chapter || 'NO_CHAPTER';
    chapCounts[ch] = (chapCounts[ch] || 0) + 1;
  }
  console.log('Live API question counts by chapter:', chapCounts);

  // Check if our Electrostatics questions are there
  const electroQ = questions.filter(q => /electro/i.test(q.chapter || '') || q.chapter_id === 198);
  console.log(`Found ${electroQ.length} questions matching electrostatics or chapter_id 198.`);
  if (electroQ.length > 0) {
    console.log('Sample electro question:', {
      id: electroQ[0].id,
      chapter: electroQ[0].chapter,
      chapter_id: electroQ[0].chapter_id,
      text: electroQ[0].question_text.substring(0, 80)
    });
  }
}

test().catch(console.error);
