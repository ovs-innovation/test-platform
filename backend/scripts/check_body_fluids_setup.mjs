import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  console.log('=== CHECKING NEON DB ===');
  const neonCh = await pool.query("SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%Body Fluids%'");
  console.log('Neon chapters for Body Fluids:', neonCh.rows);

  const neonQ = await pool.query(`
    SELECT count(*) as total, count(*) filter (where category = 'PYQ') as pyq_total
    FROM question_bank
    WHERE subject = 'Zoology' AND (chapter_id = 160 OR chapter ILIKE '%Body Fluids%')
  `);
  console.log('Neon existing questions:', neonQ.rows[0]);

  console.log('\n=== CHECKING LIVE SERVER ===');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/2/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const chData = await chRes.json();
  const liveBF = (chData.chapters || []).filter(c => c.name.toLowerCase().includes('body fluid'));
  console.log('Live chapters for Body Fluids:', liveBF);

  await pool.end();
}

check().catch(console.error);

