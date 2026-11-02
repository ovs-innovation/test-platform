import { query } from '../src/config/db.js';

async function check() {
  const localRes = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 15 OR LOWER(name) LIKE '%cell%'");
  console.log('Local Chapters matching cell / Botany:');
  console.table(localRes.rows);

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const liveChRes = await fetch('https://edvedum.com/api/admin/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveChData = await liveChRes.json();
  const liveList = (liveChData.chapters || liveChData.data || []).filter(c => c.subject_id === 10 || (c.name && c.name.toLowerCase().includes('cell')));
  console.log('Live Chapters matching cell / Botany:');
  console.table(liveList.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id })));

  // Also check existing questions in both
  const localQRes = await query("SELECT count(*) FROM question_bank WHERE LOWER(chapter) LIKE '%cell cycle%' OR chapter_id IN (SELECT id FROM chapters WHERE LOWER(name) LIKE '%cell cycle%')");
  console.log('Local questions count for cell cycle:', localQRes.rows[0].count);

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});

