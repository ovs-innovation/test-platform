const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const chRes = await fetch(`${LIVE_API}/chapters?subject_id=6`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (chRes.ok) {
    const chData = await chRes.json();
    const chapters = chData.chapters || chData.data || [];
    const biomol = chapters.filter(c => /biomolecule/i.test(c.name));
    console.log('Biomolecules chapters under Chemistry (subject_id 6) on Live:');
    console.log(biomol);
  }

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&chapter_id=36&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (qRes.ok) {
    const qData = await qRes.json();
    const qs = qData.questions || qData.data || [];
    console.log(`Current Live PYQ questions for chapter_id 36: ${qs.length}`);
  }
}

checkLive().catch(console.error);

