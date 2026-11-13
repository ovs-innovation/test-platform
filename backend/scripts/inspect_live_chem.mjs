const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const subList = Array.isArray(subData) ? subData : (subData.subjects || subData.data || []);
  const chemSub = subList.find(s => s.name?.toLowerCase() === 'chemistry');
  console.log('Live Chemistry Subject:', chemSub);

  const chRes = await fetch(`${LIVE_API}/admin/subjects/${chemSub.id}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chList = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  console.log('\nLive Chemistry Chapters matching basic/concept/mole:');
  for (const c of chList) {
    if (/basic|concept|mole/i.test(c.name)) {
      console.log(`  MATCH: ID ${c.id}: "${c.name}"`);
    }
  }
}

checkLive().catch(console.error);

