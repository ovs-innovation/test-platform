import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function checkLive() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  // Fetch subjects
  const subRes = await fetch('https://edvedum.com/api/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  console.log('Live Subjects:', (subData.subjects || subData.data || []).map(s => ({ id: s.id, name: s.name })));

  // Fetch chapters
  const chapRes = await fetch('https://edvedum.com/api/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapData = await chapRes.json();
  const chaps = chapData.chapters || chapData.data || [];
  const bioChaps = chaps.filter(c => /botany|bio/i.test(c.subject_name || '') || /biological|classification|living/i.test(c.name || ''));
  console.log('Live Botany/Bio Chapters:', bioChaps.map(c => ({ id: c.id, subject_id: c.subject_id, name: c.name })));

  // Fetch question bank count for Botany
  const qRes = await fetch('https://edvedum.com/api/question-bank?category=Botany&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qList = qData.questions || qData.data?.questions || [];
  console.log(`Live Botany Total Questions: ${qList.length}`);
  const byCh = {};
  qList.forEach(q => { byCh[q.chapter] = (byCh[q.chapter] || 0) + 1; });
  console.log('Live Botany questions by chapter:', byCh);
}

checkLive().catch(console.error);

