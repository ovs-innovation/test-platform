const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function verifyLive() {
  const token = await getToken();
  console.log('Fetching questions from Live API...');
  const res = await fetch(`${LIVE_API}/question-bank`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQs = data.questions || data.data?.questions || data.data || [];
  console.log(`Fetched ${allQs.length} total questions from Live API.`);

  const morph = allQs.filter(q => 
    q.chapter_id === 237 || 
    (q.id >= 15894 && q.id <= 16021) ||
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
  console.log(`Total: ${morph.length} (Expected: 128)`);
  console.log(`- MCQs: ${mcq} (Expected: 105)`);
  console.log(`- AR: ${ar} (Expected: 23)`);
  console.log(`- With Diagrams: ${withDiagram} (Expected: 10)`);
  console.log(`- Live ID Range: ${minId} - ${maxId}`);
}

verifyLive().catch(console.error);
