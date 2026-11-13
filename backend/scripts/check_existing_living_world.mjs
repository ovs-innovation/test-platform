import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const dbQs = await query("SELECT id, question_text, category, subject, chapter FROM question_bank WHERE chapter ILIKE '%living world%'");
  console.log('Neon DB Living World questions:', dbQs.rows.length);

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const liveQsRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=The%20Living%20World`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQsData = await liveQsRes.json();
  console.log('Live Server Living World PYQ questions:', liveQsData.questions?.length);
}

main().finally(() => process.exit(0));

