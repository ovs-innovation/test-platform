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

  // Try different endpoints for chapters
  const endpoints = [
    '/admin/chapters',
    '/chapters',
    '/api/chapters'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`https://edvedum.com${ep.startsWith('/api') ? ep : '/api' + ep}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(`Endpoint ${ep}: status=${res.status}, isArray=${Array.isArray(data)}, keys=${Object.keys(data)}`);
      const list = data.chapters || data.data || (Array.isArray(data) ? data : []);
      if (list.length > 0) {
        console.log(`Sample item from ${ep}:`, list[0]);
        const bio = list.filter(c => /biological|classification|botany/i.test(c.name || ''));
        console.log(`Matching bio from ${ep}:`, bio);
      }
    } catch (e) {
      console.log(`Endpoint ${ep} error:`, e.message);
    }
  }
}

main().catch(console.error);

