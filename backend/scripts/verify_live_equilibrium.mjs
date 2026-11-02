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

  const eqQuestions = list.filter(q =>
    q.chapter_id === 146 ||
    q.chapter_name === 'Equilibrium' ||
    q.chapter === 'Equilibrium' ||
    (q.chapter && /equilibrium/i.test(q.chapter))
  );

  console.log('Live Equilibrium Questions Count:', eqQuestions.length);
  const mcqs = eqQuestions.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice' || !q.question_type || q.question_type === 'single_mcq');
  const ars = eqQuestions.filter(q => q.question_type === 'assertion_reason');
  console.log('Equilibrium MCQs count:', mcqs.length, 'Equilibrium ARs count:', ars.length);

  if (eqQuestions.length > 0) {
    const ids = eqQuestions.map(q => Number(q.id)).filter(n => !isNaN(n)).sort((a,b) => a - b);
    console.log('Equilibrium Live IDs Range:', Math.min(...ids), 'to', Math.max(...ids));
    console.log('Sample Q1:', eqQuestions[0]?.id, eqQuestions[0]?.question_text?.slice(0, 70));
    console.log('Sample Q234:', eqQuestions[eqQuestions.length - 1]?.id, eqQuestions[eqQuestions.length - 1]?.question_text?.slice(0, 70));
  }
}

verify().catch(console.error);
