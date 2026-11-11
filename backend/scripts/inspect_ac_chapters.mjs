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
      WHERE name ILIKE '%alternat%' OR name ILIKE '%current%' OR name ILIKE '%induct%'
      ORDER BY id
    `);
    console.log('Local DB chapters:');
    console.table(res.rows);

    const subjRes = await localClient.query(`SELECT id, name FROM subjects ORDER BY id`);
    console.log('Local DB subjects:');
    console.table(subjRes.rows);
  } finally {
    localClient.release();
    await localPool.end();
  }

  // Check Live platform chapters
  const liveToken = process.env.LIVE_API_TOKEN;
  const liveBase = 'https://edvedum.com/api';
  console.log('Fetching live chapters...');
  try {
    const res = await fetch(`${liveBase}/admin/chapters`, {
      headers: {
        'Authorization': `Bearer ${liveToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      const chs = (data.chapters || data || []).filter(c => 
        /alternat|current|induct/i.test(c.name)
      );
      console.log('Live chapters:');
      console.table(chs.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));
    } else {
      console.log('Failed to fetch live chapters:', res.status, await res.text());
    }
  } catch (err) {
    console.error('Error fetching live chapters:', err.message);
  }
}

check().catch(console.error);
