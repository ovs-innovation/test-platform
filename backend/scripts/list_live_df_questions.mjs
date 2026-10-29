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
  const res = await fetch(LIVE_API + '/question-bank?category=Chemistry&limit=1500', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const dfLive = (data.questions || []).filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('d- and f') || 
           ch.includes('d and f') || 
           ch.includes('lanthanoid') || 
           ch.includes('properties of d') || 
           ch.includes('compounds of chromium') || 
           ch.includes('compounds of mercury') || 
           ch.includes('potassium dichromate') || 
           ch.includes('group 12') || 
           (q.id >= 5595 && q.id <= 5635);
  });

  console.log('Live d/f block questions count:', dfLive.length);
  for (const q of dfLive) {
    console.log(`[LIVE ID ${q.id}] [${q.chapter}] "${q.question_text.slice(0, 75)}"`);
  }
}
run().catch(console.error);
