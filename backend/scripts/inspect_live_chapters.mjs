import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function checkLive() {
  const token = await getToken();
  console.log('Logged in to Live API.');
  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await chRes.json();
  const chapters = Array.isArray(data) ? data : (data.chapters || data.data || []);
  console.log('Live Physics Chapters:');
  chapters.forEach(c => console.log(`- [${c.id}] ${c.name}`));
}

checkLive().catch(console.error);

