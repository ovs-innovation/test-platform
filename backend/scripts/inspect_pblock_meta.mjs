import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function checkMeta() {
  console.log('=== CHECKING NEON DB ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const subRes = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry'");
  console.log('Neon Chemistry subjects:', subRes.rows);
  const chemSubId = subRes.rows[0]?.id;

  if (chemSubId) {
    const chRes = await pool.query("SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY name", [chemSubId]);
    console.log('Neon Chemistry chapters:', chRes.rows.map(r => `${r.id}: ${r.name}`));

    const qbRes = await pool.query("SELECT count(*), chapter FROM question_bank WHERE exam_type = 'JEE' AND (category ILIKE 'Chemistry' OR subject_id = $1) GROUP BY chapter ORDER BY count(*) DESC", [chemSubId]);
    console.log('Neon JEE Chemistry questions by chapter:', qbRes.rows);
  }
  await pool.end();

  console.log('\n=== CHECKING LIVE VPS (edvedum.com) ===');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const liveSubsRes = await fetch('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveSubs = await liveSubsRes.json();
  const chem = (liveSubs.subjects || liveSubs || []).find(s => s.name?.toLowerCase() === 'chemistry');
  console.log('Live Chemistry subject:', chem);

  if (chem?.id) {
    const liveChRes = await fetch(`https://edvedum.com/api/admin/subjects/${chem.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveChData = await liveChRes.json();
    const liveChList = liveChData.chapters || liveChData || [];
    console.log('Live Chemistry chapters:', liveChList.map(c => `${c.id}: ${c.name}`));
  }
}

checkMeta().catch(console.error);
