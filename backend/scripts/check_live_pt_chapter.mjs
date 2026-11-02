import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function checkLiveChapter() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  // Let's check chapter 94 and 10 on live
  const res = await fetch('https://edvedum.com/api/admin/subjects/6/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const chapters = data.chapters || data.data || [];
  const pt = chapters.filter(c => /periodic|classification/i.test(c.name));
  console.log('Live Periodic chapters:', pt);

  // Try updating Chapter 94 or 10 to 'Periodic Table'
  const updateRes = await fetch('https://edvedum.com/api/admin/chapters/94', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name: 'Periodic Table' })
  });
  console.log('Update chapter 94 status:', updateRes.status);
  const updateData = await updateRes.json().catch(() => ({}));
  console.log('Update result:', updateData);
}

checkLiveChapter().catch(console.error);

