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
  
  const withImages = haloLive.filter(q => !!q.image_url);
  console.log(`Live Haloalkanes with image_url: ${withImages.length}`);
  console.log('\nSample live Haloalkanes image URLs:');
  withImages.slice(0, 10).forEach(q => {
    console.log(`ID ${q.id}: ${q.image_url}`);
  });
}

main().catch(console.error);
