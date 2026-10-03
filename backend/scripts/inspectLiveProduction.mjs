async function inspectLive() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@assess.io', password: 'Admin@12345' }),
  });

  const loginData = await loginRes.json();
  if (!loginRes.ok) {
    console.error('Login failed:', loginData);
    return;
  }

  const token = loginData.token || loginData.accessToken;
  console.log('Login successful. Token acquired.');

  // Fetch assessment 27
  const assessRes = await fetch('https://edvedum.com/api/assessments/27', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const assessData = await assessRes.json();
  console.log('Assessment 27 status:', assessRes.status);
  console.log('Assessment 27 general info:', {
    id: assessData.assessment?.id,
    title: assessData.assessment?.title,
    questionsCount: assessData.assessment?.questions?.length,
    question_paper_url: assessData.assessment?.question_paper_url,
  });

  // Fetch assessment 27 questions if separate endpoint
  const qList = assessData.assessment?.questions || [];
  console.log(`Questions loaded: ${qList.length}`);

  if (qList.length > 0) {
    console.log('First 5 questions on live:');
    qList.slice(0, 5).forEach((q, idx) => {
      console.log(`[${idx + 1}] ID: ${q.id}, Pos: ${q.position}, Type: ${q.question_type}, Sub: ${q.subject}, Topic: ${q.topic}`);
      console.log(`     Text: "${q.question_text?.slice(0, 60)}..."`);
      console.log(`     Images: ${q.image_url || q.media?.length || 'none'}`);
    });

    console.log('\nQuestions 80-90 on live:');
    qList.slice(79, 90).forEach((q, idx) => {
      console.log(`[${idx + 80}] ID: ${q.id}, Pos: ${q.position}, Type: ${q.question_type}, Sub: ${q.subject}, Topic: ${q.topic}`);
      console.log(`     Text: "${q.question_text?.slice(0, 60)}..."`);
    });

    console.log('\nQuestions 90-105 on live:');
    qList.slice(89, 105).forEach((q, idx) => {
      console.log(`[${idx + 90}] ID: ${q.id}, Pos: ${q.position}, Type: ${q.question_type}, Sub: ${q.subject}, Topic: ${q.topic}`);
      console.log(`     Text: "${q.question_text?.slice(0, 60)}..."`);
    });
  }

  // Also check if there are candidate attempts for assessment 27
  const attemptsRes = await fetch('https://edvedum.com/api/assessments/27/attempts', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (attemptsRes.ok) {
    const attemptsData = await attemptsRes.json();
    console.log('\nAttempts on Assessment 27:', attemptsData);
  }
}

inspectLive().catch(console.error);
