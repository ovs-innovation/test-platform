const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  console.log('Login status:', loginRes.status);
  const loginData = await loginRes.json();
  const token = loginData.token;

  const res1 = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('JEE Physics status:', res1.status);
  const data1 = await res1.json();
  console.log('JEE Physics questions count:', data1.questions?.length || 0);

  const res2 = await fetch(`${LIVE_API}/question-bank/categories?exam_type=JEE&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('JEE Categories status:', res2.status);
  const data2 = await res2.json();
  console.log('JEE Categories:', data2.categories);
}

main().catch(console.error);
