import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function checkLive() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const chRes = await fetch(`${LIVE_API}/admin/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chapters = (await chRes.json()).chapters || [];
  const solCh = chapters.filter(c => (c.name || '').toLowerCase().includes('solut'));
  console.log('Live chapters matching Solutions:', solCh);

  const qRes = await fetch(`${LIVE_API}/admin/question-bank?limit=100&chapter=Solutions`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const qData = await qRes.json();
  console.log('Live questions in Solutions count:', qData.questions?.length || qData.total || 0);

  process.exit(0);
}

checkLive().catch(e => {
  console.error(e);
  process.exit(1);
});
