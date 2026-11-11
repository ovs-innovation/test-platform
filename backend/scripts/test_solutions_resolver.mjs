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

  function getQuestionChapter(q) {
    const raw = (q.chapter_name || q.chapter || q.topic || '').trim();
    if (Number(q.chapter_id) === 13 || Number(q.chapter_id) === 205 || /ionic\s*equilibrium/i.test(raw)) return 'Ionic Equilibrium';
    if (Number(q.chapter_id) === 11 || Number(q.chapter_id) === 139 || Number(q.chapter_id) === 204 || /chemical\s*equilibrium/i.test(raw)) return 'Chemical Equilibrium';
    if (Number(q.chapter_id) === 37 || Number(q.chapter_id) === 150 || /^\s*solutions?\s*$/i.test(raw)) return 'Solutions';
    return raw;
  }

  const ionicCount = questions.filter(q => (Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry') && getQuestionChapter(q) === 'Ionic Equilibrium').length;
  const chemeqCount = questions.filter(q => (Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry') && getQuestionChapter(q) === 'Chemical Equilibrium').length;
  const solutionsCount = questions.filter(q => (Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry') && getQuestionChapter(q) === 'Solutions').length;

  console.log('Resolver Results:');
  console.log(`Ionic Equilibrium: ${ionicCount} / 89`);
  console.log(`Chemical Equilibrium: ${chemeqCount} / 45`);
  console.log(`Solutions: ${solutionsCount} / 70`);
}

main().catch(console.error);
