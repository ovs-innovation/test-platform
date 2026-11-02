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
  console.log('=== Checking Local Neon DB ===');
  const localCh = await query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%Hydrocarbon%'");
  console.log('Local Hydrocarbons chapters:', localCh.rows);

  const localSub = await query("SELECT id, name FROM subjects WHERE name ILIKE '%Chem%'");
  console.log('Local Chemistry Subject:', localSub.rows);

  console.log('\n=== Checking Live Production (edvedum.com) ===');
  const token = await getToken();
  console.log('Got live token:', !!token);

  const metaRes = await fetch(`${LIVE_API}/question-bank/meta`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const meta = await metaRes.json();
  const chemSub = (meta.subjects || []).find(s => s.name.toLowerCase().includes('chem'));
  console.log('Live Chemistry Subject:', chemSub);

  const liveChaps = (meta.chapters || []).filter(c => c.name.toLowerCase().includes('hydrocarbon'));
  console.log('Live Hydrocarbons chapters:', liveChaps);

  // Check if questions already exist for Hydrocarbons in local and live
  if (localCh.rows.length > 0) {
    const localQ = await query(
      "SELECT question_type, count(*) FROM question_bank WHERE chapter_id = $1 OR chapter ILIKE '%Hydrocarbon%' GROUP BY question_type",
      [localCh.rows[0].id]
    );
    console.log('Local question counts for Hydrocarbons:', localQ.rows);
  }

  if (liveChaps.length > 0) {
    const liveQRes = await fetch(`${LIVE_API}/question-bank?chapter_id=${liveChaps[0].id}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveQ = await liveQRes.json();
    console.log('Live question total for Hydrocarbons:', liveQ.total || liveQ.data?.total || liveQ.length);
  }
}

check().catch(console.error).finally(() => process.exit(0));
