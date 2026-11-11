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
  console.log(`Total live PYQ Chemistry questions: ${questions.length}`);

  const chapterCounts = {};
  for (const q of questions) {
    const raw = (q.chapter || q.chapter_name || '').trim();
    const chId = Number(q.chapter_id);

    let resolved = 'Other';
    if (
      (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
      chId === 127 ||
      chId === 95 ||
      chId === 223 ||
      /some basic concepts? of chemistry/i.test(raw) ||
      /mole concept/i.test(raw)
    ) {
      resolved = 'Some Basic Concepts of Chemistry';
    } else if (
      (Number(q.id) >= 14171 && Number(q.id) <= 14326) ||
      chId === 77 ||
      chId === 96 ||
      chId === 16 ||
      /structure of atoms?/i.test(raw) ||
      /atomic structure/i.test(raw)
    ) {
      resolved = 'Structure of Atom';
    } else {
      resolved = raw || 'Unknown';
    }

    chapterCounts[resolved] = (chapterCounts[resolved] || 0) + 1;
  }

  console.log('\nResolved Chapters for Live Chemistry PYQs:');
  console.table(chapterCounts);
}

main().catch(console.error);
