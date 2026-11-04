import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  const tokenRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await tokenRes.json();
  const token = data.token || data.data?.token || data.accessToken;
  
  const liveRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allChapters = liveData.chapters || liveData.data || liveData || [];
  const zoologyChapters = Array.isArray(allChapters) ? allChapters.filter(c => c.subject_id === 2 || c.subject_id === 13 || (c.subject_name || '').toLowerCase().includes('zoology')) : [];
  console.log('Live Zoology Chapters:');
  console.log(zoologyChapters.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));

  const localRes = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 13 ORDER BY id");
  console.log('\nLocal Zoology Chapters:');
  console.log(localRes.rows);
}

check().catch(console.error);

