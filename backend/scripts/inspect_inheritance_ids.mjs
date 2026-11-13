import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  // 1. Live Server
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const liveHeaders = { Authorization: `Bearer ${token}` };

  const liveChapsRes = await axios.get(`${LIVE_API}/admin/subjects/10/chapters`, { headers: liveHeaders });
  const liveChaps = liveChapsRes.data.chapters || liveChapsRes.data || [];
  const botanyLive = liveChaps.filter(c => /inheritance/i.test(c.name));
  console.log('Live Server Botany Inheritance chapters:', botanyLive);
  if (botanyLive.length === 0) {
    console.log('All Live Botany chapters:', liveChaps.map(c => ({ id: c.id, name: c.name })));
  }

  // 2. Neon DB
  const neonRes = await query(`
    SELECT c.id, c.name, c.subject_id, s.name as subject_name
    FROM chapters c
    LEFT JOIN subjects s ON c.subject_id = s.id
    WHERE c.name ILIKE '%inheritance%';
  `);
  console.log('Neon DB Inheritance chapters:', neonRes.rows);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

