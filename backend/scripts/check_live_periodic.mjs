import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function check() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const list = data?.questions || data?.data?.questions || [];

  const periodic = list.filter(q =>
    [10, 35, 68, 83, 94].includes(Number(q.chapter_id)) ||
    /periodic|classification of elements/i.test(q.chapter || '') ||
    /periodic|classification of elements/i.test(q.chapter_name || '')
  );

  console.log(`Live existing Periodic questions count: ${periodic.length}`);
  if (periodic.length > 0) {
    console.log('Sample:', periodic[0]);
  }
}

check().catch(console.error);

