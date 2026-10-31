import axios from 'axios';

async function checkLiveBio() {
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  // Fetch all questions
  const res = await axios.get('https://edvedum.com/api/question-bank?limit=10000', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const all = res.data?.data?.questions || res.data?.questions || [];
  console.log(`Total questions in live bank: ${all.length}`);

  const bio = all.filter(q => 
    q.chapter_id === 225 || 
    (q.id >= 14778 && q.id <= 15037) ||
    /biological\s*classification/i.test(q.chapter || '') ||
    /biological\s*classification/i.test(q.chapter_name || '')
  );

  const ar = bio.filter(q => q.question_type === 'assertion_reason');
  const mcq = bio.filter(q => q.question_type !== 'assertion_reason');

  console.log(`\n=== Live Biological Classification Questions ===`);
  console.log(`Total: ${bio.length}`);
  console.log(`MCQ: ${mcq.length}`);
  console.log(`AR: ${ar.length}`);
  const ids = bio.map(q => q.id);
  console.log(`ID range: ${Math.min(...ids)} - ${Math.max(...ids)}`);

  // Let's check sample question 1, 47, and AR 1
  console.log(`\nSample Q1:`, bio[0]?.question_text?.slice(0, 80));
  const q47 = bio.find(q => q.image_url && q.image_url.includes('bio_q47'));
  console.log(`Sample Q47 with diagram:`, q47?.question_text?.slice(0, 80), 'Image:', q47?.image_url);
  console.log(`Sample AR1:`, ar[0]?.question_text?.slice(0, 80));
}

checkLiveBio().catch(console.error);
