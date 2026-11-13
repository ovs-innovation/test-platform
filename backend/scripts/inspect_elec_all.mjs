const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const res = await fetch(LIVE_API + '/question-bank', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const qList = (data.questions || []);

  const tubeList = qList.filter(q => (q.question_text || '').toLowerCase().includes('infinitesimally thin tube'));
  console.log('Total tube questions:', tubeList.length);
  tubeList.forEach(q => {
    console.log(`id: ${q.id}, category: "${q.category}", subject: "${q.subject}", chapter_id: ${q.chapter_id}, chapter: "${q.chapter}"`);
  });

  // What about questions where chapter is Electrostatics?
  const elecList = qList.filter(q => (q.chapter || '').toLowerCase() === 'electrostatics' || q.chapter_id === 106);
  console.log('Total questions with chapter Electrostatics or chapter_id 106:', elecList.length);
  const byCat = {};
  elecList.forEach(q => byCat[q.category] = (byCat[q.category] || 0) + 1);
  console.log('By category:', byCat);
}
main().catch(console.error);

