const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const authRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await authRes.json();

  const chRes = await fetch(`${LIVE_API}/test-admin/chapters?subject_id=2`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const list = chData.data || chData.chapters || (Array.isArray(chData) ? chData : []);
  console.log('Live Server Zoology Chapters count:', list.length);
  const found = list.filter(c => c.name.toLowerCase().includes('biotech'));
  console.log('Biotech chapters on Live Server:', found);
}

main().catch(console.error);
