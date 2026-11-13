import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function checkBoth() {
  console.log('--- Checking Live Server ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subRes = await fetch(`${LIVE_API}/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveSubjects = await subRes.json();
  const liveBotany = (Array.isArray(liveSubjects) ? liveSubjects : liveSubjects.subjects || []).find(s => s.name.toLowerCase().includes('botany'));
  console.log('Live Botany Subject:', liveBotany);

  const chapRes = await fetch(`${LIVE_API}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChapters = await chapRes.json();
  const allChaps = Array.isArray(liveChapters) ? liveChapters : liveChapters.chapters || [];
  const liveEco = allChaps.filter(c => c.name.toLowerCase().includes('ecosystem'));
  console.log('Live Ecosystem Chapters:', liveEco);

  console.log('\n--- Checking Neon DB ---');
  const neonSub = await pool.query("SELECT * FROM subjects WHERE name ILIKE '%botany%'");
  console.log('Neon Botany Subject:', neonSub.rows);

  const neonChap = await pool.query("SELECT * FROM chapters WHERE name ILIKE '%ecosystem%'");
  console.log('Neon Ecosystem Chapter:', neonChap.rows);

  await pool.end();
}

checkBoth().catch(console.error);

