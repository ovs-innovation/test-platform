async function checkLive() {
  try {
    const loginRes = await fetch('https://edvedum.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    console.log('Login status:', loginRes.status);
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.data?.token || loginData.accessToken;
    console.log('Token obtained:', !!token);

    if (token) {
      const qRes = await fetch('https://edvedum.com/api/question-bank?category=Mathematics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Question bank status:', qRes.status);
      const qData = await qRes.json();
      const qs = qData.questions || qData.data || [];
      console.log('Total live math questions:', qs.length);
      
      const probQs = qs.filter(q => (q.chapter_id === 301) || (q.chapter && q.chapter.toLowerCase().includes('prob')));
      console.log('Total live Probability questions:', probQs.length);
      if (probQs.length > 0) {
        console.log('Sample live prob question:', probQs[0].id, probQs[0].question_text.slice(0, 100));
      }
    }
  } catch (e) {
    console.error('Error checking live:', e.message);
  }
}
checkLive();

