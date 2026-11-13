import fetch from 'node-fetch';

async function main() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const subsRes = await fetch('https://edvedum.com/api/admin/subjects', { headers });
  const data = await subsRes.json();
  const subs = data.subjects || [];

  const zoology = subs.find(s => s.name.toLowerCase().includes('zool'));
  console.log('Zoology subject:', zoology);

  if (zoology) {
    const chRes = await fetch(`https://edvedum.com/api/admin/subjects/${zoology.id}/chapters`, { headers });
    const chaptersData = await chRes.json();
    const chList = chaptersData.chapters || chaptersData;
    console.log(`Live chapters for Zoology (count: ${chList.length}):`);
    for (const c of chList) {
      console.log(`  id=${c.id}: "${c.name}"`);
    }
  }
}

main().catch(console.error);
