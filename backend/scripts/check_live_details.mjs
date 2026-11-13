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

  // Magnetism and matter questions:
  const magList = qList.filter(q => (q.chapter || '').toLowerCase().includes('magnetism and matter'));
  console.log('Total questions with chapter "Magnetism and Matter":', magList.length);
  const magByCat = {};
  magList.forEach(q => {
    const k = `${q.category} | chId: ${q.chapter_id}`;
    magByCat[k] = (magByCat[k] || 0) + 1;
  });
  console.log('Mag and Matter groups:', magByCat);

  // EMI questions:
  const emiList = qList.filter(q => (q.chapter || '').toLowerCase().includes('electromagnetic induction'));
  console.log('\nTotal questions with chapter "Electromagnetic Induction":', emiList.length);
  const emiByCat = {};
  emiList.forEach(q => {
    const k = `${q.category} | chId: ${q.chapter_id} | subj: ${q.subject}`;
    emiByCat[k] = (emiByCat[k] || 0) + 1;
  });
  console.log('EMI groups:', emiByCat);

  // Electrostatics questions:
  const elecList = qList.filter(q => (q.chapter || '').toLowerCase().includes('electrostat'));
  console.log('\nTotal questions with chapter containing "electrostat":', elecList.length);
  const elecByCat = {};
  elecList.forEach(q => {
    const k = `${q.category} | chId: ${q.chapter_id} | ch: "${q.chapter}"`;
    elecByCat[k] = (elecByCat[k] || 0) + 1;
  });
  console.log('Electrostatics groups:', elecByCat);
}
main().catch(console.error);

