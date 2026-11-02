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

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const liveQuestions = data.questions || [];

  const haloLive = liveQuestions.filter(q => (q.chapter || '').toLowerCase().includes('haloalkanes'));
  console.log(`Live questions with chapter 'Haloalkanes and Haloarenes': ${haloLive.length}`);
  console.log('\nFirst 10 Live Haloalkanes questions:');
  haloLive.slice(0, 10).forEach((q, i) => {
    const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]');
    console.log(`[${i + 1}] ID ${q.id}: "${q.question_text.substring(0, 70)}"`);
    console.log(`    Option 1: "${opts[0] ? String(opts[0]).substring(0, 40) : 'none'}"`);
  });

  const pblockLive = liveQuestions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));
  console.log(`\nLive questions with chapter p-Block: ${pblockLive.length}`);
  pblockLive.forEach((q, i) => {
    const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]');
    console.log(`[${i + 1}] ID ${q.id} (ch: ${q.chapter}): "${q.question_text.substring(0, 70)}"`);
    console.log(`    Option 1: "${opts[0] ? String(opts[0]).substring(0, 40) : 'none'}"`);
  });
}

main().catch(console.error);
