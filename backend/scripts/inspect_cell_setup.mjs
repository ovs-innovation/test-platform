import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('--- Checking Neon DB ---');
  try {
    const ch = await query("SELECT c.id, c.name, c.subject_id, s.name as subject_name FROM chapters c JOIN subjects s ON c.subject_id = s.id WHERE c.name ILIKE '%cell%'");
    console.log('Neon DB Cell chapters:', ch.rows);

    const bot = await query("SELECT id, name FROM subjects WHERE name ILIKE '%botany%'");
    console.log('Neon DB Botany:', bot.rows);
  } catch (err) {
    console.error('Neon DB err:', err.message);
  }

  console.log('--- Checking Live Server ---');
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
    const liveChs = chLiveData.chapters || chLiveData.data || chLiveData || [];
    const cellLive = Array.isArray(liveChs) ? liveChs.filter(c => c.name?.toLowerCase().includes('cell')) : [];
    console.log('Live server Botany Cell chapters:', cellLive);

    const liveQsRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Cell%20-%20The%20Unit%20of%20Life&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveQsData = await liveQsRes.json();
    console.log('Existing Live Server Cell PYQ questions:', liveQsData.total || liveQsData.questions?.length);
  } catch (err) {
    console.error('Live server err:', err.message);
  }
}

main().finally(() => process.exit(0));

