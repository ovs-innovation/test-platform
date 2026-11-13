import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function check() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  for (const cid of [82, 102]) {
    const res = await fetch(`https://edvedum.com/api/question-bank?category=PYQ&chapter_id=${cid}&limit=100`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    const list = (data.questions || []).filter(q => q.chapter_id === cid);
    console.log(`Live questions for chapter ${cid}: ${list.length}`);
  }
}

check().catch(console.error);

