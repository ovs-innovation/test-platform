import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function checkLiveQuestions() {
  const token = await getToken();
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qRes.json();
  const list = data.questions || data.data || [];
  console.log(`Total Live PYQ Physics questions: ${list.length}`);

  const byChapter = {};
  for (const q of list) {
    const ch = q.chapter_id + ' - ' + (q.chapter || 'unknown');
    byChapter[ch] = (byChapter[ch] || 0) + 1;
  }
  console.log('Live PYQ Physics Questions by Chapter:', byChapter);
}

checkLiveQuestions().catch(console.error);

