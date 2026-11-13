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
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  // Fetch question 29524
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=1`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  // Try to update 29524
  const updateRes = await fetch(`${LIVE_API}/question-bank/29524`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      subject: 'Botany',
      subject_id: 10,
      category: 'PYQ',
      chapter: 'Biological Classification'
    })
  });
  const updateData = await updateRes.json();
  console.log('Update response status:', updateRes.status);
  console.log('Update response body:', updateData);
}

main().catch(console.error);

