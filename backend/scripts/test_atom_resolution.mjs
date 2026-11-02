import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function testResolution() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token || tokenData?.accessToken;

  const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];

  function getQuestionChapter(q) {
    if (
      (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
      (Number(q.chapter_id) === 127 && Number(q.id) >= 5504 && Number(q.id) <= 5640) ||
      Number(q.chapter_id) === 95
    ) {
      return 'Some Basic Concepts of Chemistry';
    }

    if (
      (Number(q.id) >= 14171 && Number(q.id) <= 14326) ||
      (Number(q.chapter_id) === 77 && Number(q.id) >= 5641 && Number(q.id) <= 5796) ||
      Number(q.chapter_id) === 96 ||
      /^\s*structure of atom(s)?\s*$/i.test(q.chapter_name || '') ||
      /^\s*structure of atom(s)?\s*$/i.test(q.chapter || '')
    ) {
      return 'Structure of Atom';
    }

    return q.chapter_name || q.chapter || 'Other';
  }

  function isAR(q) {
    const t = (q.question_type || '').toLowerCase();
    return t === 'assertion_reason' || t === 'assertion_reasoning' || t === 'ar';
  }

  const basicQuestions = questions.filter(q => getQuestionChapter(q) === 'Some Basic Concepts of Chemistry');
  const atomQuestions = questions.filter(q => getQuestionChapter(q) === 'Structure of Atom');

  console.log('=== Some Basic Concepts of Chemistry ===');
  console.log('Total:', basicQuestions.length);
  console.log('MCQs:', basicQuestions.filter(q => !isAR(q)).length);
  console.log('ARs:', basicQuestions.filter(isAR).length);

  console.log('\n=== Structure of Atom ===');
  console.log('Total:', atomQuestions.length);
  console.log('MCQs:', atomQuestions.filter(q => !isAR(q)).length);
  console.log('ARs:', atomQuestions.filter(isAR).length);
}

testResolution().catch(console.error);

