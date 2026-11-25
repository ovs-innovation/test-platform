async function check() {
  const res = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await res.json();
  const qRes = await fetch('https://edvedum.com/api/question-bank?category=Physics&chapter=Electrostatics&exam_type=JEE&limit=10', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await qRes.json();
  console.log('Total questions returned:', data.total);
  data.questions.forEach((q, idx) => {
    console.log(`${idx + 1}) ID: ${q.id} | text: ${q.question_text.substring(0, 100)}`);
  });
}
check().catch(console.error);
