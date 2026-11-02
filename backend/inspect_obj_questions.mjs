const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken;
  console.log('Login status:', loginRes.status, 'Token exists:', !!token);
  const qbRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await qbRes.json();
  const questions = data.questions || data || [];
  console.log('Status:', qbRes.status, 'Total questions returned:', questions.length);

  const objQs = questions.filter(q => q.options && q.options.some(opt => typeof opt === 'string' && opt.includes('[object Object]')));
  console.log(`Found ${objQs.length} questions with [object Object]:\n`);

  for (let i = 0; i < objQs.length; i++) {
    const q = objQs[i];
    console.log(`--- [#${i+1}] ID ${q.id} [${q.chapter}] ---`);
    console.log('Text:', q.question_text?.replace(/\n/g, ' '));
    console.log('Correct index:', q.correct_index);
    console.log('Solution:', q.solution?.slice(0, 150));
    console.log('Image:', q.image_url);
  }
}
main();
