import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function verify() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@edvedum.com',
      password: 'Admin@12345'
    })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token || tokenData?.accessToken;

  const qRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const list = qData?.questions || qData?.data?.questions || [];
  console.log('Total Live Chemistry Questions Count:', list.length);

  const atomQuestions = list.filter(q =>
    q.chapter_id === 96 ||
    q.chapter_name === 'Structure of Atom' ||
    q.chapter === 'Structure of Atom' ||
    (q.chapter && /structure of atom/i.test(q.chapter))
  );

  console.log('Live Structure of Atom Questions Count:', atomQuestions.length);
  const mcqs = atomQuestions.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice' || !q.question_type || q.question_type === 'single_mcq');
  const ars = atomQuestions.filter(q => q.question_type === 'assertion_reason');
  console.log('Atom MCQs count:', mcqs.length, 'Atom ARs count:', ars.length);

  if (atomQuestions.length > 0) {
    const ids = atomQuestions.map(q => Number(q.id)).filter(n => !isNaN(n)).sort((a,b) => a - b);
    console.log('Atom Live IDs Range:', Math.min(...ids), 'to', Math.max(...ids));
    console.log('Sample AR question:', ars[0]?.id, ars[0]?.question_type, 'Marks:', ars[0]?.marks);
    console.log('Sample AR assertion:', ars[0]?.assertion_text?.slice(0, 50));
    console.log('Sample AR reason:', ars[0]?.reason_text?.slice(0, 50));
  }
}

verify().catch(console.error);
