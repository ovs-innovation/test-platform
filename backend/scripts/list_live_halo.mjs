import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function run() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const qbRes = await fetch(LIVE_API + '/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await qbRes.json();
  const halo = data.questions.filter(q => (q.chapter || '').toLowerCase().includes('haloalkanes'));
  console.log(`Total live Haloalkanes questions: ${halo.length}`);
  halo.forEach((q, i) => {
    const imgMatch = q.image_url ? q.image_url.match(/q\d+/) : null;
    const qNum = imgMatch ? imgMatch[0] : '';
    console.log(`[${i+1}] ID ${q.id} ${qNum}: img=${q.image_url ? 'YES' : 'NO '} | ${q.question_text.replace(/\n/g, ' ').substring(0, 70)}`);
  });
}
run().catch(console.error);
