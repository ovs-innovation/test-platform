import axios from 'axios';
import fs from 'fs';
import { pool } from '../src/config/db.js';

async function check() {
  console.log('=== LOCAL DB (Neon) ===');
  const subjectsLocal = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE '%zoo%' OR name ILIKE '%bio%'");
  console.log('Local subjects:', subjectsLocal.rows);

  const chaptersLocal = await pool.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%structural%' OR name ILIKE '%animal%'");
  console.log('Local chapters:', chaptersLocal.rows);

  console.log('\n=== LIVE DB ===');
  const tokenData = JSON.parse(fs.readFileSync('backend/scripts/live_token.json'));
  const subRes = await axios.get('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: 'Bearer ' + tokenData.token }
  });
  const liveSubjects = subRes.data.data?.subjects || subRes.data.subjects || [];
  console.log('Live subjects:', liveSubjects.map(s => ({ id: s.id, name: s.name })));

  const zooSubject = liveSubjects.find(s => /zoology/i.test(s.name));
  console.log('Live Zoology subject:', zooSubject);
  if (zooSubject) {
    const chRes = await axios.get(`https://edvedum.com/api/admin/subjects/${zooSubject.id}/chapters`, {
      headers: { Authorization: 'Bearer ' + tokenData.token }
    });
    const chs = chRes.data.data?.chapters || chRes.data.chapters || [];
    console.log('Live Zoology chapters:', chs);
  }

  await pool.end();
}

check().catch(console.error);
