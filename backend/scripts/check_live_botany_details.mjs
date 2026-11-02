import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function checkLiveBotany() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const qRes = await fetch('https://edvedum.com/api/question-bank?category=Botany&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const qList = qData.questions || qData.data?.questions || [];
  
  const chMap = {};
  for (const q of qList) {
    const key = `${q.chapter_id} | ${q.chapter} | ${q.subject_id}`;
    chMap[key] = (chMap[key] || 0) + 1;
  }
  console.log('Live Botany (chapter_id | chapter | subject_id):');
  for (const [k, count] of Object.entries(chMap)) {
    console.log(`  ${k}: ${count}`);
  }
}

checkLiveBotany().catch(console.error);

