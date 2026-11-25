import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('Authenticating with live API...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const data = await loginRes.json();
  const token = data.token || data.accessToken || data.data?.token;
  console.log('Token acquired:', !!token);

  // Get Physics chapters
  const chRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chs = Array.isArray(chData) ? chData : (chData.chapters || chData.data || []);
  const matching = chs.filter(c => (c.name || '').toLowerCase().includes('capacit'));
  console.log('Matching chapters under Physics (subject 5):', matching);
  console.log('Total Physics chapters:', chs.length);

  // Also check existing questions for Capacitance / Capacitor in JEE
  const qBankRes = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&chapter=Capacitor&limit=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbData = await qBankRes.json();
  console.log('Existing questions with chapter=Capacitor:', qbData.totalCount || qbData.questions?.length || 0);

  const qBankRes2 = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&chapter=Capacitance&limit=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbData2 = await qBankRes2.json();
  console.log('Existing questions with chapter=Capacitance:', qbData2.totalCount || qbData2.questions?.length || 0);
}

main().catch(console.error);
