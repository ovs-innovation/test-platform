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

  if (!loginRes.ok) {
    throw new Error(`Login failed (${loginRes.status}): ${await loginRes.text()}`);
  }

  const { token } = await loginRes.json();

  // Fetch all Chemistry questions on live
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Live Chemistry Total Questions: ${questions.length}`);

  const haloQuestions = questions.filter(q => (q.chapter || '').toLowerCase().includes('halo'));
  const pblockQuestions = questions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));

  console.log(`Live Haloalkanes questions count: ${haloQuestions.length}`);
  console.log(`Live p-Block questions count: ${pblockQuestions.length}`);

  console.log('\n--- Sample Live Haloalkanes Questions ---');
  haloQuestions.slice(0, 3).forEach((q, idx) => {
    console.log(`[${idx + 1}] ID: ${q.id}, Chapter: "${q.chapter}", Text: "${q.question_text?.substring(0, 80)}...", Image: ${q.image_url || 'none'}`);
  });

  console.log('\n--- Sample Live p-Block Questions ---');
  pblockQuestions.slice(0, 3).forEach((q, idx) => {
    console.log(`[${idx + 1}] ID: ${q.id}, Chapter: "${q.chapter}", Text: "${q.question_text?.substring(0, 80)}...", Image: ${q.image_url || 'none'}`);
  });

  // Check chapters list under Chemistry subject (id: 6)
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapsData = await chapsRes.json();
  const chaps = chapsData.chapters || [];
  console.log('\n--- Live Chemistry Chapters ---');
  chaps.filter(c => c.name.toLowerCase().includes('halo') || c.name.toLowerCase().includes('p-block') || c.name.toLowerCase().includes('block'))
    .forEach(c => console.log(`Chapter ID: ${c.id}, Name: "${c.name}"`));
}

main().catch(console.error);
