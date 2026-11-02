import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function verifyAll() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const qRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const list = qData?.questions || qData?.data?.questions || [];

  const chapterCounts = {};
  for (const q of list) {
    const ch = q.chapter_name || q.chapter || 'Unknown';
    chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
  }

  console.log('--- Live Chemistry Questions Per Chapter ---');
  console.table(Object.entries(chapterCounts).map(([name, count]) => ({ Chapter: name, Count: count })));
}

verifyAll().catch(console.error);

