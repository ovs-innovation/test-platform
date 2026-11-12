import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const liveQsRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Anatomy%20of%20Flowering%20Plants`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQsData = await liveQsRes.json();
  console.log('Live server count:', liveQsData.questions?.length);

  try {
    const neonCount = await query(
      `SELECT COUNT(*) FROM question_bank WHERE category = 'PYQ' AND subject = 'Botany' AND chapter = 'Anatomy of Flowering Plants'`
    );
    console.log('Neon DB count:', neonCount.rows[0].count);
  } catch (e) {
    console.error('Neon count err:', e.message);
  }
}

main().finally(() => process.exit(0));
