import axios from 'axios';

async function checkLiveBio() {
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  const res = await axios.get('https://edvedum.com/api/question-bank?chapter_id=225&limit=500', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qs = res.data?.data?.questions || res.data?.questions || [];
  console.log(`Live questions for chapter_id=225: ${qs.length}`);
  const ar = qs.filter(q => q.question_type === 'assertion_reason');
  const mcq = qs.filter(q => q.question_type !== 'assertion_reason');
  console.log(`MCQ count: ${mcq.length}`);
  console.log(`AR count: ${ar.length}`);
  if (qs.length > 0) {
    const ids = qs.map(q => q.id);
    console.log(`Live IDs: min=${Math.min(...ids)}, max=${Math.max(...ids)}`);
  }
}

checkLiveBio().catch(console.error);
