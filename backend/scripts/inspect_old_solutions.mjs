import dotenv from 'dotenv';
dotenv.config();

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(LIVE_API + '/question-bank?category=PYQ&limit=3000', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];
  const solQs = questions.filter(q => Number(q.chapter_id) === 37 || Number(q.chapter_id) === 150 || /^\s*solutions?\s*$/i.test(q.chapter || ''));
  console.log('Total Solutions Qs:', solQs.length);

  const q27911 = questions.find(q => q.id === 27911);
  console.log('Q 27911 fields:', {
    id: q27911?.id,
    chapter_id: q27911?.chapter_id,
    chapter: q27911?.chapter,
    chapter_name: q27911?.chapter_name,
    topic: q27911?.topic
  });

  const exactSolutions = questions.filter(q => Number(q.chapter_id) === 37);
  console.log('Exact chapter_id === 37 count:', exactSolutions.length);
  exactSolutions.slice(0, 3).forEach(q => console.log('Exact 37:', q.id, q.question_text.slice(0, 60)));
}
main().catch(console.error);
