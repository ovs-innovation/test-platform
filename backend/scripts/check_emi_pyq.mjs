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

  const emiPYQ = qList.filter(q => (q.chapter || '').toLowerCase().includes('electromagnetic induction') && q.category === 'PYQ');
  console.log('EMI questions with category="PYQ":', emiPYQ.length);
  for (const q of emiPYQ.slice(0, 5)) {
    console.log(`id: ${q.id}, cat: "${q.category}", subj: "${q.subject}", subj_id: ${q.subject_id}, chId: ${q.chapter_id}, ch: "${q.chapter}", ch_name: "${q.chapter_name}"`);
  }
}
main().catch(console.error);

