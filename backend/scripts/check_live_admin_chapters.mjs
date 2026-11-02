import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function main() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const res = await fetch('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('Live Admin Subjects:', data);

  const subjects = data.subjects || data.data || [];
  for (const s of subjects) {
    const cRes = await fetch(`https://edvedum.com/api/admin/subjects/${s.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cData = await cRes.json();
    const chaps = cData.chapters || cData.data || [];
    console.log(`Subject ${s.id} (${s.name}): found ${chaps.length} chapters.`);
    for (const c of chaps) {
      if (/biological|classification|living/i.test(c.name)) {
        console.log(`  -> Chapter ID: ${c.id}, Name: ${c.name}`);
      }
    }
  }
}

main().catch(console.error);

