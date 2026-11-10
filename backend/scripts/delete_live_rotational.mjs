import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function deleteLiveQuestions() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;

  console.log('Fetching live questions for Rotational Motion...');
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await res.json();
  const list = qData.questions || qData.data || [];

  const rotQuestions = list.filter(q => 
    Number(q.chapter_id) === 62 || 
    (q.chapter || '').toLowerCase() === 'rotational motion'
  );

  console.log(`Found ${rotQuestions.length} questions in Rotational Motion on Live API.`);

  let deletedCount = 0;
  for (const q of rotQuestions) {
    try {
      const delRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (delRes.ok) {
        deletedCount++;
        if (deletedCount % 20 === 0 || deletedCount === rotQuestions.length) {
          console.log(`Deleted ${deletedCount} / ${rotQuestions.length} (Latest ID: ${q.id})`);
        }
      } else {
        console.error(`Failed to delete question ID ${q.id}:`, await delRes.text());
      }
    } catch (err) {
      console.error(`Error deleting ID ${q.id}:`, err.message);
    }
    await sleep(40);
  }

  console.log(`Finished deleting from Live Platform. Total deleted: ${deletedCount}`);
}

deleteLiveQuestions().catch(console.error);

