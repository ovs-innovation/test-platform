import fetch from 'node-fetch';

async function checkAll() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Fetch all questions matching Electrostatics across all exams
  const res = await fetch('https://edvedum.com/api/question-bank?refresh=true&limit=10000', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQuestions = data.questions || [];
  console.log('Total questions in question-bank returned:', allQuestions.length);

  const electroQuestions = allQuestions.filter(q => q.chapter === 'Electrostatics' || /electrostatics/i.test(q.chapter || ''));
  console.log('Total Electrostatics questions:', electroQuestions.length);

  const byExam = {};
  for (const q of electroQuestions) {
    const key = `${q.exam_type} | id_range: [min ${Math.min(...electroQuestions.filter(x => x.exam_type === q.exam_type).map(x => x.id))}, max ${Math.max(...electroQuestions.filter(x => x.exam_type === q.exam_type).map(x => x.id))}]`;
    byExam[key] = (byExam[key] || 0) + 1;
  }
  console.log('Electro questions summary:', byExam);

  // Check if any question has "(A)" as an option text
  const dummyOptionQ = allQuestions.filter(q => 
    q.chapter === 'Electrostatics' && 
    Array.isArray(q.options) && 
    q.options.some(o => (typeof o === 'string' ? o.trim() === '(A)' : o.text && o.text.trim() === '(A)'))
  );
  console.log('Electro questions with dummy options (A):', dummyOptionQ.length);
  if (dummyOptionQ.length > 0) {
    console.log('Sample dummy option Q:', dummyOptionQ.slice(0, 3).map(q => ({ id: q.id, exam: q.exam_type, text: q.question_text.slice(0, 50) })));
  }
}

checkAll().catch(console.error);
