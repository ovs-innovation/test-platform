import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('--- Verifying counts ---');
  // 1. Neon DB count
  try {
    const res = await query(
      `SELECT COUNT(*) FROM question_bank WHERE category = 'PYQ' AND subject = 'Botany' AND chapter = 'Anatomy of Flowering Plants'`
    );
    console.log('Neon DB Botany Anatomy PYQ count:', res.rows[0].count);
  } catch (e) {
    console.error('Neon DB err:', e.message);
  }

  // 2. Live Server count
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();

    const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Anatomy%20of%20Flowering%20Plants&limit=1`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveData = await liveRes.json();
    console.log('Live server pagination total / questions length:', liveData.total || liveData.pagination?.total || liveData.questions?.length);
    if (!liveData.total) {
      // Fetch full list without limit
      const fullRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Anatomy%20of%20Flowering%20Plants`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fullData = await fullRes.json();
      console.log('Live server full list length:', fullData.questions?.length);
    }
  } catch (e) {
    console.error('Live server err:', e.message);
  }
}

main().finally(() => process.exit(0));

