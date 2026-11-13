import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  // Check Neon DB
  try {
    const ch = await query("SELECT c.id, c.name, c.subject_id, s.name as subject_name FROM chapters c JOIN subjects s ON c.subject_id = s.id WHERE c.name ILIKE '%living world%'");
    console.log('Neon DB Living World chapters:', ch.rows);

    const bot = await query("SELECT id, name FROM subjects WHERE name ILIKE '%botany%'");
    console.log('Neon DB Botany:', bot.rows);
  } catch (err) {
    console.error('Neon DB err:', err.message);
  }

  // Check Live Server
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();
    const chLiveRes = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chLiveData = await chLiveRes.json();
    const liveChs = chLiveData.chapters || chLiveData || [];
    const lwLive = liveChs.find(c => c.name?.toLowerCase().includes('living'));
    console.log('Live server Botany chapters count:', liveChs.length);
    console.log('Live server Living World chapter:', lwLive);
  } catch (err) {
    console.error('Live server err:', err.message);
  }
}

main().finally(() => process.exit(0));

