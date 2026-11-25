async function run() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&chapter=' + encodeURIComponent('Periodic Table') + '&refresh=true&limit=5', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const qs = data.questions || [];
  console.log('Sample Periodic Table questions:');
  qs.forEach(q => {
    console.log({
      id: q.id,
      chapter: q.chapter,
      chapter_name: q.chapter_name,
      chapter_id: q.chapter_id,
      topic: q.topic,
      subject_id: q.subject_id,
      exam_type: q.exam_type
    });
  });
}
run().catch(console.error);
