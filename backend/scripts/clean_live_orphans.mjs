import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function removeOrphans() {
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  for (const id of [28741, 28840]) {
    try {
      const delRes = await fetch(`https://edvedum.com/api/question-bank/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Delete ${id} status: ${delRes.status}`);
    } catch (err) {
      console.error(`Error deleting ${id}:`, err.message);
    }
  }
}

removeOrphans().catch(console.error);

