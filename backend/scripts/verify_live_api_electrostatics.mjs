import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Electrostatics';

async function verifyLive() {
  console.log('Authenticating with edvedum.com live API...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();
  console.log('Authentication successful.');

  console.log('\nFetching JEE Electrostatics questions from live API...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=20`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Retrieved ${questions.length} questions from live API (total in bank: ${data.total || data.count || questions.length})`);

  console.log('\n=== LIVE QUESTIONS INSPECTION ===');
  [1, 2, 4, 7, 13, 14, 16].forEach(targetIdx => {
    const q = questions[targetIdx - 1];
    if (q) {
      console.log(`\n--- Live Question #${targetIdx} (ID: ${q.id}) ---`);
      console.log(`Statement: ${q.question_text.substring(0, 100)}...`);
      console.log(`Options:`, q.options?.map(o => `${o.key}: ${o.text}`));
      console.log(`Diagram: ${q.image_url || 'NONE'}`);
      console.log(`Type: ${q.question_type}, Marks: ${q.marks}`);
    }
  });

  // Check total count on live API without limit
  const countRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const countData = await countRes.json();
  const allLive = countData.questions || [];
  console.log(`\nTotal verified JEE Electrostatics questions live: ${allLive.length}`);
  const liveDiags = allLive.filter(q => q.image_url);
  console.log(`Total live questions with diagram: ${liveDiags.length}`);
}

verifyLive().catch(console.error);
