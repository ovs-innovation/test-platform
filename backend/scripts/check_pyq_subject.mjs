const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const res = await fetch(LIVE_API + '/question-bank?category=PYQ&subject=Physics', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const questions = (data.questions || []);
  console.log('Total questions returned with category=PYQ&subject=Physics:', questions.length);

  const match = questions.filter(q => (q.question_text || '').includes('infinitesimally thin tube'));
  console.log('Matches for "infinitesimally thin tube":', match.length);
  match.forEach(m => {
    console.log(`id: ${m.id}, category: "${m.category}", subject: "${m.subject}", chapter_id: ${m.chapter_id}, chapter: "${m.chapter}"`);
  });
}
main().catch(console.error);

