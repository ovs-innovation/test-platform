import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const client = await pool.connect();
  const res = await client.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%Electromagnetic Induction%' OR name ILIKE '%Induction%'");
  console.log('Neon chapters:', res.rows);
  const qbRes = await client.query("SELECT count(*), exam_type, chapter, chapter_id FROM question_bank WHERE chapter ILIKE '%Electromagnetic Induction%' GROUP BY exam_type, chapter, chapter_id");
  console.log('Neon question_bank existing:', qbRes.rows);
  client.release();
  await pool.end();

  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const chapRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveChaps = await chapRes.json();
  const list = liveChaps.chapters || liveChaps || [];
  console.log('Live API chapters matching induction:', list.filter(c => (c.name || '').toLowerCase().includes('induction')));
}
run().catch(console.error);
