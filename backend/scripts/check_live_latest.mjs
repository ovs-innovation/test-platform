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

  // Let's fetch latest 10 questions inserted into question-bank
  const res = await fetch('https://edvedum.com/api/question-bank?category=PYQ&chapter_id=101&limit=100', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const list = data.questions || [];
  const alcoholList = list.filter(q => q.chapter_id === 101 || q.chapter?.toLowerCase().includes('alcohol'));
  console.log(`Live questions filtered for chapter 101 / Alcohols: ${alcoholList.length}`);
  if (alcoholList.length > 0) {
    console.log(`First item: [${alcoholList[0].chapter}] Q1: ${alcoholList[0].question_text.slice(0, 60)}...`);
    console.log(`Last item: [${alcoholList[alcoholList.length - 1].chapter}] Q78: ${alcoholList[alcoholList.length - 1].question_text.slice(0, 60)}...`);
  }
}

check().catch(console.error);
