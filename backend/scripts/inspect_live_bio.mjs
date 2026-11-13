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

  const subjectsRes = await fetch(`${LIVE_API}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subjectsData = await subjectsRes.json();
  console.log('Live subjectsData keys:', Object.keys(subjectsData));
  const subjectsList = Array.isArray(subjectsData) ? subjectsData : (subjectsData.subjects || subjectsData.data || []);
  console.log('Live subjects:', subjectsList);

  const chaptersRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chaptersData = await chaptersRes.json();
  const chaptersList = Array.isArray(chaptersData) ? chaptersData : (chaptersData.chapters || chaptersData.data || []);
  const bioChapters = chaptersList.filter(c => (c.name || '').toLowerCase().includes('biomolecule'));
  console.log('Live Biomolecules chapters:', bioChapters);
}

main().catch(console.error);

