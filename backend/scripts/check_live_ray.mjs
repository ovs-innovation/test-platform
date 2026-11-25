const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  console.log('Login successful');

  const names = ['Ray Optics', 'Ray & Wave Optics', 'Ray Optics and Optical Instruments'];
  for (const name of names) {
    const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(name)}&refresh=true&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    console.log(`Chapter '${name}': total = ${data.total}, count = ${data.questions?.length}`);
    if (data.questions && data.questions.length > 0) {
      console.log('Sample question chapter_id:', data.questions[0].chapter_id, 'chapter:', data.questions[0].chapter, 'exam_type:', data.questions[0].exam_type);
    }
    const resJee = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(name)}&exam_type=JEE&refresh=true&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dataJee = await resJee.json();
    console.log(`  -> JEE: total = ${dataJee.total}`);
    const resNeet = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(name)}&exam_type=NEET&refresh=true&limit=5`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dataNeet = await resNeet.json();
    console.log(`  -> NEET: total = ${dataNeet.total}`);
  }
}

main().catch(console.error);
