import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function registerChapter() {
  console.log('Authenticating with live edvedum.com...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  console.log(`Physics Subject ID: ${physicsSub.id}`);

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let magMatter = chaps.find(c => c.name.toLowerCase() === 'magnetism and matter');

  if (!magMatter) {
    console.log("Registering 'Magnetism and Matter' on live edvedum.com...");
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: physicsSub.id,
        name: 'Magnetism and Matter',
        position: 16
      })
    });

    if (createRes.ok) {
      const data = await createRes.json();
      magMatter = data.chapter;
      console.log('Created chapter successfully:', magMatter);
    } else {
      console.error('Failed to create chapter:', createRes.status, await createRes.text());
    }
  } else {
    console.log('Chapter already exists:', magMatter);
  }
}

registerChapter().catch(console.error);
