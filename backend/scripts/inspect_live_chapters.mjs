const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(LIVE_API + '/admin/subjects', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');

  const chapsRes = await fetch(LIVE_API + '/admin/subjects/' + physicsSub.id + '/chapters', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  console.log('Live Physics Chapters count:', chaps.length);
  chaps.forEach(c => console.log('  id:', c.id, 'name:', c.name));

  const pyqRes = await fetch(LIVE_API + '/question-bank?category=PYQ', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const pyqData = await pyqRes.json();
  const pyqQuestions = pyqData.questions || [];
  console.log('\nTotal questions returned with category=PYQ:', pyqQuestions.length);

  // Group by subject
  const subCounts = {};
  pyqQuestions.forEach(q => {
    subCounts[q.subject] = (subCounts[q.subject] || 0) + 1;
  });
  console.log('PYQ by subject:', subCounts);

  const physicsPYQ = pyqQuestions.filter(q => (q.subject || '').toLowerCase() === 'physics');
  console.log('Total Physics PYQ:', physicsPYQ.length);

  // Group Physics PYQ by chapter & chapter_id
  const chapCounts = {};
  physicsPYQ.forEach(q => {
    const key = `[id:${q.chapter_id}] ${q.chapter}`;
    chapCounts[key] = (chapCounts[key] || 0) + 1;
  });
  console.log('\nPhysics PYQ grouped by [chapter_id] chapter:');
  console.log(chapCounts);
}

main().catch(console.error);
