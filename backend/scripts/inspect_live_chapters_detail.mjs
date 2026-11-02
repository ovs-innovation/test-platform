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
  const { token } = await loginRes.json();

  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { questions = [] } = await qbRes.json();

  const halo = questions.filter(q => (q.chapter || '').toLowerCase().includes('halo') || q.chapter_id === 34);
  const pblock = questions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block') || q.chapter_id === 107);

  console.log(`Live Haloalkanes total: ${halo.length}`);
  if (halo.length > 0) {
    console.log('Sample Haloalkanes on live:');
    halo.slice(0, 3).forEach(q => console.log(`  ID ${q.id}: ${q.question_text.slice(0, 50)}...`));
  }

  console.log(`Live p-Block total: ${pblock.length}`);
  if (pblock.length > 0) {
    console.log('Sample p-Block on live:');
    pblock.slice(0, 3).forEach(q => console.log(`  ID ${q.id}: ${q.question_text.slice(0, 50)}...`));
  }
}

main().catch(console.error);
