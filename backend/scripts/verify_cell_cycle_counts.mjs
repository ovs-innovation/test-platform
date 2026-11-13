import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('--- Verifying Counts ---');
  
  // 1. Neon DB count
  const neonRes = await query(`
    SELECT count(*) as total, 
           count(*) filter (where image_url != '') as with_images
    FROM question_bank 
    WHERE category = 'PYQ' AND (chapter_id = 171 OR chapter = 'Cell Cycle and Cell Division')
  `);
  console.log('Neon DB Cell Cycle questions:', neonRes.rows[0]);

  // Total Botany questions in Neon DB
  const neonBotanyTotal = await query(`
    SELECT count(*) as total_botany_pyq
    FROM question_bank 
    WHERE category = 'PYQ' AND (subject_id = 15 OR subject = 'Botany')
  `);
  console.log('Neon DB Total Botany PYQ questions:', neonBotanyTotal.rows[0]);

  // 2. Live Server check
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  
  // Let's check live questions in chapter 259
  const liveChaps = await fetch(`${LIVE_API}/admin/subjects/10/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await liveChaps.json();
  const cellCycleChap = chData.chapters?.find(c => c.id === 259);
  console.log('Live Server Cell Cycle chapter info:', cellCycleChap);

  const neonChapInfo = await query(`
    SELECT id, name, subject_id FROM chapters WHERE id = 171
  `);
  console.log('Neon DB chapter info:', neonChapInfo.rows[0]);
}

verify().catch(console.error);

