import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('Connecting to Live API:', LIVE_API);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed (${loginRes.status}): ${await loginRes.text()}`);
  }

  const { token } = await loginRes.json();
  console.log('Login successful on live!');

  // Fetch subjects
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subsData = await subsRes.json();
  const subjects = subsData.subjects || [];
  console.log('Live Subjects:', subjects.map(s => ({ id: s.id, name: s.name })));

  const chem = subjects.find(s => s.name.toLowerCase().includes('chem'));
  if (!chem) {
    console.error('Chemistry subject not found on live!');
    return;
  }
  console.log(`Live Chemistry Subject: ID ${chem.id}`);

  // Fetch chapters for Chemistry
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${chem.id}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapsData = await chapsRes.json();
  const chapters = chapsData.chapters || [];
  console.log('Live Chemistry Chapters:');
  console.table(chapters.map(c => ({ id: c.id, name: c.name, position: c.position })));

  // Fetch questions count for Chemistry
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbData = await qbRes.json();
  const questions = qbData.questions || [];
  console.log(`Total live questions in Chemistry: ${questions.length}`);

  // Check how many are in Haloalkanes and P Block on live
  const haloLive = questions.filter(q => (q.chapter || '').toLowerCase().includes('halo'));
  const pblockLive = questions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));
  console.log(`Live Haloalkanes questions: ${haloLive.length}`);
  console.log(`Live p-Block questions: ${pblockLive.length}`);
}

main().catch(console.error);
