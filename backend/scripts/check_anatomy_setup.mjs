import { pool } from '../src/config/db.js';

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

async function checkSubject() {
  console.log('=== Local DB Subjects ===');
  const localRes = await pool.query("SELECT id, name FROM subjects ORDER BY id ASC");
  console.log(localRes.rows);

  console.log('\n=== Local DB Chapters matching Anatomy ===');
  const localCh = await pool.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%anatomy%'");
  console.log(localCh.rows);

  console.log('\n=== Live API Subjects ===');
  const token = await getToken();
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subData = await subRes.json();
  const subjects = subData.data?.subjects || subData.subjects || [];
  console.log(subjects);

  const botany = subjects.find(s => /botany/i.test(s.name));
  console.log('Botany in Live API:', botany);

  if (botany) {
    const chRes = await fetch(`${LIVE_API}/admin/subjects/${botany.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chData = await chRes.json();
    const liveChapters = chData.data?.chapters || chData.chapters || [];
    const anatCh = liveChapters.filter(c => /anatomy/i.test(c.name));
    console.log('Anatomy chapters in Live API:', anatCh);
  }

  await pool.end();
}

checkSubject().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});

