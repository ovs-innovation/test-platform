const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const res = await fetch(LIVE_API + '/question-bank?category=PYQ&subject=Physics&skip_cache=true', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const qList = (data.questions || []);

  const mag = qList.filter(q => (q.chapter || '').toLowerCase().includes('magnetism and matter'));
  console.log('PYQ Physics questions with chapter "Magnetism and Matter":', mag.length);

  const elec = qList.filter(q => (q.chapter || '').toLowerCase().includes('electrostat'));
  console.log('PYQ Physics questions with chapter "Electrostatics":', elec.length);

  const emi = qList.filter(q => (q.chapter || '').toLowerCase().includes('electromagnetic induction'));
  console.log('PYQ Physics questions with chapter "Electromagnetic Induction":', emi.length);

  console.log('\nSample mag in PYQ Physics:');
  mag.slice(0, 2).forEach(q => console.log(q.id, q.chapter_id, q.chapter, q.subject, q.category));

  console.log('\nSample elec in PYQ Physics:');
  elec.slice(0, 2).forEach(q => console.log(q.id, q.chapter_id, q.chapter, q.subject, q.category));

  console.log('\nSample emi in PYQ Physics:');
  emi.slice(0, 2).forEach(q => console.log(q.id, q.chapter_id, q.chapter, q.subject, q.category));
}
main().catch(console.error);

