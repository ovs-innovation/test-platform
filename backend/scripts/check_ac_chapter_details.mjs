import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  console.log('--- NEON DB CHECK ---');
  const client = await pool.connect();
  try {
    const chapters = await client.query(`
      SELECT id, subject_id, name 
      FROM chapters 
      WHERE name ILIKE '%Alternating%' OR name ILIKE '%Current%'
      ORDER BY id
    `);
    console.log('Neon chapters:', chapters.rows);

    const qb = await client.query(`
      SELECT exam_type, chapter, chapter_id, count(*) 
      FROM question_bank 
      WHERE chapter ILIKE '%Alternating%'
      GROUP BY exam_type, chapter, chapter_id
    `);
    console.log('Neon question_bank existing:', qb.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- LIVE API CHECK ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const allCh = chData?.chapters || chData || [];
  const acCh = allCh.filter(c => /alternating/i.test(c.name));
  console.log('Live API AC chapters:', acCh);
}

check().catch(console.error);
