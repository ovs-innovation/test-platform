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

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];
  
  const atomQs = questions.filter(q =>
    (Number(q.subject_id) === 6 || q.subject === 'Chemistry') &&
    (Number(q.chapter_id) === 96 || Number(q.chapter_id) === 16 || /structure of atom/i.test(q.chapter || ''))
  );

  console.log(`Live Chemistry Structure of Atom questions count: ${atomQs.length} / 90`);
  atomQs.slice(0, 3).forEach(q => {
    console.log(`  ID ${q.id}: "${q.question_text.slice(0, 60)}..." (Chapter ID: ${q.chapter_id}, Image: ${q.image_url || 'none'})`);
  });
}

main().catch(console.error);
