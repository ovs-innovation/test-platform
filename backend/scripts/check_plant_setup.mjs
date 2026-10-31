import { pool } from '../src/config/db.js';
import axios from 'axios';

async function checkStatus() {
  console.log('=== Checking Local DB (Neon) ===');
  const localCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 15 AND name ILIKE '%plant%kingdom%'");
  console.log('Local Chapter:', localCh.rows);
  const localQb = await pool.query("SELECT count(*) FROM question_bank WHERE chapter ILIKE '%plant%kingdom%' OR (chapter_id IS NOT NULL AND chapter_id = ANY($1))", [localCh.rows.map(r => r.id)]);
  console.log('Local Questions in question_bank:', localQb.rows[0].count);

  console.log('\n=== Checking Live Production (edvedum.com) ===');
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  // Check chapters of subject 10 (Botany on live)
  const cRes = await axios.get('https://edvedum.com/api/admin/subjects/10/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChaps = cRes.data?.chapters || cRes.data?.data || [];
  const plantChLive = liveChaps.filter(c => /plant\s*kingdom/i.test(c.name));
  console.log('Live Chapters under Subject 10 (Botany):', plantChLive);

  await pool.end();
}

checkStatus().catch(async (e) => {
  console.error(e);
  await pool.end();
});
