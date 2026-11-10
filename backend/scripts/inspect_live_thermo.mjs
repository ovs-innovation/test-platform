import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  const res = await fetch(`${LIVE_API}/question-bank?chapter_id=309&limit=200`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const listData = await res.json();
  const items = listData.questions || listData.data || listData;
  console.log(`Live items count: ${items.length}`);
  if (items.length > 0) {
    console.log('Sample item:', {
      id: items[0].id,
      qText: items[0].question_text?.substring(0, 80),
      image_url: items[0].image_url
    });
  }
}

check().catch(console.error);
