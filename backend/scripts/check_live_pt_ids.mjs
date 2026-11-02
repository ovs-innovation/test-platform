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

  const q94 = list.filter(q => Number(q.chapter_id) === 94);
  console.log('Total questions with chapter_id 94:', q94.length);
  const byChapter = {};
  q94.forEach(q => { byChapter[q.chapter] = (byChapter[q.chapter] || 0) + 1; });
  console.log('byChapter in chapter_id 94:', byChapter);

  // Check questions where chapter is Periodic Table
  const ptOnly = list.filter(q => /periodic/i.test(q.chapter || '') || /periodic/i.test(q.chapter_name || ''));
  console.log('Total questions with chapter matching /periodic/i:', ptOnly.length);

  // Check the newly created IDs from 14591 to 14777
  const newBatch = list.filter(q => Number(q.id) >= 14591 && Number(q.id) <= 14777);
  console.log('New batch count (14591 to 14777):', newBatch.length);
  if (newBatch.length > 0) {
    console.log('Sample of new batch (14591):', {
      id: newBatch[0].id,
      chapter: newBatch[0].chapter,
      chapter_id: newBatch[0].chapter_id,
      chapter_name: newBatch[0].chapter_name,
      text: newBatch[0].question_text?.slice(0, 60)
    });
  }
}

check().catch(console.error);
