import dotenv from 'dotenv';
dotenv.config();

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];

  const chemQs = questions.filter(q => Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry');
  console.log(`Total live Chemistry PYQs: ${chemQs.length}`);

  const chemeqQs = chemQs.filter(q =>
    Number(q.chapter_id) === 11 ||
    Number(q.chapter_id) === 139 ||
    /chemical\s*equilibrium/i.test(q.chapter || '') ||
    /chemical\s*equilibrium/i.test(q.chapter_name || '')
  );

  console.log(`Live Chemistry Chemical Equilibrium questions count: ${chemeqQs.length} / 45`);
  chemeqQs.slice(0, 3).forEach(q => {
    console.log(`  ID ${q.id}: "${q.question_text.slice(0, 60)}..." (Chapter ID: ${q.chapter_id})`);
  });

  const redoxQs = chemQs.filter(q => Number(q.chapter_id) === 185 || Number(q.chapter_id) === 40 || /redox/i.test(q.chapter || ''));
  console.log(`Live Chemistry Redox Reactions questions count: ${redoxQs.length} / 36`);

  const atomQs = chemQs.filter(q => Number(q.chapter_id) === 96 || Number(q.chapter_id) === 16 || /structure of atom/i.test(q.chapter || ''));
  console.log(`Live Chemistry Structure of Atom questions count: ${atomQs.length} / 90`);

  const moleQs = chemQs.filter(q => Number(q.chapter_id) === 95 || /some basic concepts/i.test(q.chapter || ''));
  console.log(`Live Chemistry Some Basic Concepts questions count: ${moleQs.length} / 84`);
}

main().catch(console.error);

