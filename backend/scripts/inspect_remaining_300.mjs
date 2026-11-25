import fetch from 'node-fetch';

const LIVE_API = 'https://edvedum.com/api';

async function test() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];

  const known12 = [
    'Gravitation', 'Basic Maths', 'Vector', 'Capacitance', 'Motion in two dimension',
    'Units and dimensions', 'Mechanical Properties of Solids', 'Kinetic Theory of Gases',
    'Motion in one Dimension', 'Laws of Motion', 'Center of Mass and Collision', 'Fluid Mechanics'
  ];

  const remaining = questions.filter(q => !known12.includes(q.chapter));
  console.log(`Remaining questions count: ${remaining.length}`);
  if (remaining.length > 0) {
    console.log('Sample remaining question:', {
      id: remaining[0].id,
      chapter: remaining[0].chapter,
      chapter_name: remaining[0].chapter_name,
      topic: remaining[0].topic,
      chapter_id: remaining[0].chapter_id,
      text: remaining[0].question_text.substring(0, 70)
    });

    const otherChapters = {};
    for (const q of remaining) {
      otherChapters[q.chapter] = (otherChapters[q.chapter] || 0) + 1;
    }
    console.log('Other chapter values:', otherChapters);
  }
}

test().catch(console.error);
