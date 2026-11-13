import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  console.log('Live Subjects:', subs.map(s => ({ id: s.id, name: s.name })));

  const botanySub = subs.find(s => s.name.toLowerCase().includes('botany'));
  if (botanySub) {
    const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${botanySub.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chaps = (await chapsRes.json()).chapters || [];
    console.log(`Botany (ID ${botanySub.id}) Chapters:`, chaps.map(c => ({ id: c.id, name: c.name })));
  }
}

main().catch(console.error);

