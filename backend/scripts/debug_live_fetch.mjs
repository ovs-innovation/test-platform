const LIVE_API = 'https://edvedum.com/api';

async function testFetch() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  // In QuestionBank.jsx:
  // How does it fetch questions for JEE Chemistry?
  // Let's check QuestionBank.jsx line that fetches questions!
}
