import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 15 AND name ILIKE '%Biodiversity%'");
  console.log('Neon chapters for Biodiversity:', neonCh.rows);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const chRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const chData = await chRes.json();
  const liveBio = (chData.chapters || []).filter(c => c.name.toLowerCase().includes('biodiversity'));
  console.log('Live chapters for Biodiversity:', liveBio);

  await pool.end();
}

check().catch(console.error);

