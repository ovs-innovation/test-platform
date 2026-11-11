import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const localPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function check() {
  const localClient = await localPool.connect();
  try {
    const res = await localClient.query(`
      SELECT id, name, subject_id FROM chapters
      WHERE name ILIKE '%optic%' OR name ILIKE '%wave%'
      ORDER BY id
    `);
    console.log('Local DB chapters:');
    console.table(res.rows);
  } finally {
    localClient.release();
    await localPool.end();
  }

  // Check Live platform chapters
  const liveBase = 'https://edvedum.com/api';
  console.log('Logging into Live API...');
  const loginRes = await fetch(`${liveBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  console.log('Fetching live chapters for subject 5 (Physics)...');
  const res = await fetch(`${liveBase}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.ok) {
    const data = await res.json();
    const chs = (data.chapters || data || []).filter(c => 
      /optic|wave/i.test(c.name)
    );
    console.log('Live chapters:');
    console.table(chs.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));
  }
}

check().catch(console.error);
