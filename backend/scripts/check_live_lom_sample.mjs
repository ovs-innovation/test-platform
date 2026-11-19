const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  const lom = questions.filter(q => q.chapter === 'Laws of Motion');

  for (const idx of [13, 14, 22, 23]) {
    const q = lom[idx];
    console.log(`=== LOM Question #${idx+1} (ID: ${q?.id}) ===`);
    console.log('Text:', q?.question_text);
    console.log('Options:', q?.options);
    console.log('Image:', q?.image_url);
  }
}

main().catch(console.error);
