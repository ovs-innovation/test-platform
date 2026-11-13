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

  const res = await fetch('https://edvedum.com/api/question-bank?category=PYQ&chapter_id=101&limit=100', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const list = (data.questions || []).filter(q => q.chapter_id === 101 || q.chapter?.toLowerCase().includes('alcohol'));
  console.log(`Found ${list.length} alcohol questions:`);
  for (let i = 0; i < list.length; i++) {
    const q = list[i];
    console.log(`[${i+1}] ID: ${q.id}, Category: ${q.category}, Text: ${q.question_text.slice(0, 70)}...`);
  }
}

check().catch(console.error);

