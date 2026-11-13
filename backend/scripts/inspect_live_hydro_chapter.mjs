import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const res = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const subjects = data.subjects || data.data || [];
  const chem = subjects.find(s => s.name?.toLowerCase() === 'chemistry' || s.id === 6);
  console.log('Chemistry subject:', chem?.id, chem?.name);

  // If chapters are nested or fetched separately
  const chapRes = await fetch(`${LIVE_API}/admin/chapters?subject_id=${chem?.id || 6}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Status /admin/chapters:', chapRes.status);
  if (chapRes.ok) {
    const chData = await chapRes.json();
    const chaps = chData.chapters || chData.data || [];
    console.log('Total chapters for Chemistry:', chaps.length);
    const hydro = chaps.find(c => /hydrocarbon/i.test(c.name));
    console.log('Hydrocarbons chapter on Live:', hydro);
  }
}

main().catch(console.error);
