import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function initLiveChapter() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  // Check chapters of subject 10 (Botany)
  const cRes = await fetch('https://edvedum.com/api/admin/subjects/10/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const cData = await cRes.json();
  const chaps = cData.chapters || cData.data || [];
  const existing = chaps.find(c => /biological\s*classification/i.test(c.name));
  if (existing) {
    console.log('Chapter already exists under Botany (Subject 10) on Live:', existing);
    return existing.id;
  }

  // Create chapter under subject 10
  const postRes = await fetch('https://edvedum.com/api/admin/chapters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      subject_id: 10,
      name: 'Biological Classification',
      position: 0
    })
  });
  const postData = await postRes.json();
  console.log('Create chapter response on Live:', postData);
  return postData.chapter?.id || postData.data?.id || postData.id;
}

initLiveChapter().catch(console.error);
