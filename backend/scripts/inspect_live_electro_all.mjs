import fetch from 'node-fetch';

async function main() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // 1. Get Subject 5 (Physics) chapters
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  console.log('Live Physics Chapters (subject 5):');
  const chaptersList = chData.chapters || chData.data || (Array.isArray(chData) ? chData : []);
  console.table(chaptersList.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));

  // Find any chapter with Electro
  const electroCh = chaptersList.filter(c => /electro/i.test(c.name || ''));
  console.log('Electro chapters under Physics:', electroCh);

  // 2. Query question-bank for each electro chapter
  for (const ech of electroCh) {
    const qRes = await fetch(`https://edvedum.com/api/question-bank?chapter_id=${ech.id}&limit=100`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const qs = qData.questions || [];
    console.log(`Chapter ${ech.id} (${ech.name}): found ${qs.length} questions.`);
    if (qs.length > 0) {
      console.log(`Sample Q from ${ech.name}:`, {
        id: qs[0].id,
        exam_type: qs[0].exam_type,
        text: qs[0].question_text.slice(0, 100),
        options: qs[0].options
      });
    }
  }

  // 3. Query question-bank with chapter name search
  const qByNameRes = await fetch(`https://edvedum.com/api/question-bank?search=Electrostatics&limit=20`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qByName = await qByNameRes.json();
  console.log('Search "Electrostatics" live count:', (qByName.questions || []).length);
  if ((qByName.questions || []).length > 0) {
    console.log('Sample search results:');
    (qByName.questions || []).slice(0, 5).forEach(q => {
      console.log(`ID: ${q.id}, Chapter: ${q.chapter} (chId: ${q.chapter_id}), Exam: ${q.exam_type}, Text: ${q.question_text.slice(0, 70)}`);
    });
  }
}

main().catch(console.error);
