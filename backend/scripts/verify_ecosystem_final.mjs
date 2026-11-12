import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  console.log('--- Checking Neon DB ---');
  const neonRes = await pool.query("SELECT count(*) as total, count(*) filter (where image_url != '') as with_images FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Ecosystem' OR chapter_id = 208)");
  console.log('Neon DB Ecosystem Count:', neonRes.rows[0]);

  console.log('\n--- Checking Live Server ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const allBotany = Array.isArray(liveData) ? liveData : (liveData.questions || []);
  const liveEco = allBotany.filter(q => q.chapter === 'Ecosystem' || q.chapter_id === 218);
  console.log('Live Server Botany PYQ total:', allBotany.length);
  console.log('Live Server Ecosystem Count:', liveEco.length);
  const liveImages = liveEco.filter(q => q.image_url && q.image_url.length > 0);
  console.log('Live Server Ecosystem with diagrams:', liveImages.length);

  await pool.end();
}

verify().catch(console.error);
