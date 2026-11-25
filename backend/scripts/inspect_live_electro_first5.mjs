import fetch from 'node-fetch';

async function check() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const res = await fetch('https://edvedum.com/api/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&limit=5', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  for (const q of (data.questions || [])) {
    console.log(`\n=== ID: ${q.id} (ch: ${q.chapter}, chId: ${q.chapter_id}) ===`);
    console.log('Question:', q.question_text);
    console.log('Options:', JSON.stringify(q.options, null, 2));
    console.log('Diagram:', q.diagram_url || q.question_diagram);
    console.log('Solution:', q.solution?.substring(0, 80));
  }
}
check().catch(console.error);
