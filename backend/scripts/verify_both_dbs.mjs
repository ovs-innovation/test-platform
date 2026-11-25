import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  const r = await pool.query(`
    SELECT id, question_text, image_url 
    FROM question_bank 
    WHERE category = 'Physics' AND exam_type = 'JEE' 
      AND (
        question_text ILIKE '%two non-mixing liquids%'
        OR question_text ILIKE '%capillary tube (A) is dipped%'
        OR question_text ILIKE '%water tank as shown in the figure%'
        OR question_text ILIKE '%light cylindrical vessel is kept%'
      )
  `);
  console.log('Neon DB Verification for Q6, Q7, Q78, Q81:');
  for (const row of r.rows) {
    console.log(`ID: ${row.id} | Text: ${row.question_text?.slice(0, 45)}... | Img: ${row.image_url}`);
  }

  console.log('\n--- Live VPS Verification ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const qbRes = await fetch('https://edvedum.com/api/question-bank?exam_type=JEE&category=Physics&refresh=true', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const liveFluids = (qbData.questions || []).filter(q => {
    const t = q.question_text || '';
    return t.includes('two non-mixing liquids') ||
           t.includes('capillary tube (A) is dipped') ||
           t.includes('water tank as shown in the figure') ||
           t.includes('light cylindrical vessel is kept');
  });
  for (const q of liveFluids) {
    console.log(`Live ID: ${q.id} | Text: ${q.question_text?.slice(0, 45)}... | Img: ${q.image_url}`);
  }
}

verify().then(() => pool.end()).catch(console.error);
