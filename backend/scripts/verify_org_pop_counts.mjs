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

async function verify() {
  const neon = await pool.query(`
    SELECT count(*) as total, count(*) filter (where image_url != '') as with_images
    FROM question_bank
    WHERE (chapter_id = 154 OR chapter = 'Organisms and Populations') AND category = 'PYQ'
  `);
  console.log('Neon DB Count:', neon.rows[0]);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Organisms%20and%20Populations&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qRes.json();
  const list = Array.isArray(data) ? data : (data.questions || []);
  const withImages = list.filter(q => q.image_url && q.image_url.length > 0);
  console.log(`Live Server Count: total=${list.length}, with_images=${withImages.length}`);

  await pool.end();
}

verify().catch(console.error);

