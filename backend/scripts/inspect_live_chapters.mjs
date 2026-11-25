const LIVE_API = 'https://edvedum.com/api';

async function run() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const chRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chapters = Array.isArray(chData) ? chData : (chData.data || chData.chapters || []);
  
  const rayChs = chapters.filter(c => c.name && (c.name.toLowerCase().includes('ray') || c.name.toLowerCase().includes('optics')));
  console.log('Ray / Optics Chapters on Live API:');
  console.table(rayChs.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));

  for (const ch of rayChs) {
    const qRes = await fetch(`${LIVE_API}/question-bank?chapter=${encodeURIComponent(ch.name)}&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    console.log(`Live Chapter '${ch.name}' (id: ${ch.id}): total questions = ${qData.total}`);
    
    // Check by exam type
    const qJee = await fetch(`${LIVE_API}/question-bank?chapter=${encodeURIComponent(ch.name)}&exam_type=JEE&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qJeeData = await qJee.json();
    const qNeet = await fetch(`${LIVE_API}/question-bank?chapter=${encodeURIComponent(ch.name)}&exam_type=NEET&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qNeetData = await qNeet.json();
    console.log(`  -> JEE: ${qJeeData.total}, NEET: ${qNeetData.total}`);
  }
}

run().catch(console.error);
