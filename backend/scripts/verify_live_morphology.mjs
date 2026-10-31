import axios from 'axios';

async function verifyLive() {
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  let allQuestions = [];
  let page = 1;
  while (true) {
    const res = await axios.get(`https://edvedum.com/api/question-bank?category=Botany&page=${page}&limit=500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qs = res.data?.data?.questions || res.data?.questions || [];
    if (qs.length === 0) break;
    allQuestions.push(...qs);
    if (qs.length < 500) break;
    page++;
  }

  const morph = allQuestions.filter(q => 
    q.chapter_id === 237 || 
    /morphology\s*of\s*flowering\s*plants?/i.test(q.chapter || q.chapter_name || '')
  );

  let mcq = 0;
  let ar = 0;
  let withDiagram = 0;
  let minId = Infinity;
  let maxId = -Infinity;

  for (const q of morph) {
    const isAr = q.question_type === 'assertion_reason' || q.type === 'assertion_reason';
    if (isAr) ar++;
    else mcq++;
    if (q.image_url) withDiagram++;
    if (q.id < minId) minId = q.id;
    if (q.id > maxId) maxId = q.id;
  }

  console.log(`\n=== Live Morphology of Flowering Plants Verification ===`);
  console.log(`Total: ${morph.length}`);
  console.log(`- MCQs: ${mcq}`);
  console.log(`- AR: ${ar}`);
  console.log(`- With Diagrams: ${withDiagram}`);
  console.log(`- Live ID Range: ${minId} - ${maxId}`);
}

verifyLive().catch(console.error);
