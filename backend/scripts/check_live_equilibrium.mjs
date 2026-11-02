import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function checkLive() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const res = await fetch('https://edvedum.com/api/admin/subjects/6/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const chapters = data.chapters || data.data || [];
  console.log('Total live chapters for subject 6:', chapters.length);
  const eq = chapters.filter(c => /equilibrium/i.test(c.name));
  console.log('Equilibrium matches:', eq);
  console.log('All chemistry chapters:');
  console.table(chapters.map(c => ({ id: c.id, name: c.name })));
}

checkLive().catch(console.error);
