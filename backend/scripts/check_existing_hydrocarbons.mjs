import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  const localRes = await query("SELECT question_type, count(*) FROM question_bank WHERE chapter_id = 168 OR chapter ILIKE 'Hydrocarbons' GROUP BY question_type");
  console.log('Local questions in Hydrocarbons:', localRes.rows);

  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?chapter_id=164&limit=5`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  console.log('Live questions in Hydrocarbons (total):', liveData.total || liveData.pagination?.total || (liveData.questions ? liveData.questions.length : 0));
}

check().catch(console.error).finally(() => process.exit(0));

