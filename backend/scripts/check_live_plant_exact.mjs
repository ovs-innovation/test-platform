import axios from 'axios';

async function checkLivePlant() {
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  // Fetch questions
  const res = await axios.get('https://edvedum.com/api/question-bank?limit=10000', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const all = res.data?.data?.questions || res.data?.questions || [];
  console.log(`Total questions in live bank: ${all.length}`);

  const plant = all.filter(q => 
    q.chapter_id === 227 || 
    (q.id >= 15038 && q.id <= 15212) ||
    /plant\s*kingdom/i.test(q.chapter || '') ||
    /plant\s*kingdom/i.test(q.chapter_name || '')
  );

  const ar = plant.filter(q => q.question_type === 'assertion_reason');
  const mcq = plant.filter(q => q.question_type !== 'assertion_reason');

  console.log(`\n=== Live Plant Kingdom Questions ===`);
  console.log(`Total: ${plant.length}`);
  console.log(`MCQ: ${mcq.length}`);
  console.log(`AR: ${ar.length}`);
  const ids = plant.map(q => q.id);
  console.log(`ID range: ${Math.min(...ids)} - ${Math.max(...ids)}`);

  console.log(`\nSample Q1:`, plant[0]?.question_text?.slice(0, 80));
  const q9 = plant.find(q => q.image_url && q.image_url.includes('plant_q9'));
  console.log(`Sample Q9 with diagram:`, q9?.question_text?.slice(0, 80), 'Image:', q9?.image_url);
  console.log(`Sample AR1:`, ar[0]?.question_text?.slice(0, 80));
}

checkLivePlant().catch(console.error);
