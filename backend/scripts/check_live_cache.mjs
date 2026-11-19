const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('Without skip_cache, count is:', data.questions?.length || 0);

  const catRes = await fetch(`${LIVE_API}/question-bank/categories?exam_type=JEE`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const catData = await catRes.json();
  console.log('Without skip_cache, categories are:', catData.categories);
}

main().catch(console.error);
