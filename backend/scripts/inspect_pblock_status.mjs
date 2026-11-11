import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('--- Inspecting Local Neon DB ---');
  const client = await pool.connect();
  try {
    const chapters = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND (name ILIKE '%p-block%' OR name ILIKE '%p block%')"
    );
    console.log('Local Chemistry p-block chapters:', chapters.rows);

    const qCount = await client.query(
      "SELECT chapter_id, chapter, category, count(1)::int FROM question_bank WHERE subject_id = 10 AND (chapter ILIKE '%p-block%' OR chapter ILIKE '%p block%' OR chapter_id IN (23, 107)) GROUP BY chapter_id, chapter, category"
    );
    console.log('Local p-block questions in question_bank:', qCount.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n--- Inspecting Live API (edvedum.com) ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const authData = await loginRes.json();
    const token = authData.token || authData.accessToken || authData.data?.token;

    const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (chRes.ok) {
      const chList = await chRes.json();
      const list = Array.isArray(chList) ? chList : (chList.chapters || chList.data || []);
      const matched = list.filter(c => /p[- ]?block/i.test(c.name) || c.id === 107 || c.id === 23);
      console.log('Live Chemistry p-block chapters:', matched);
    }

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (qRes.ok) {
      const qData = await qRes.json();
      const list = qData.questions || qData.data || [];
      const pblock = list.filter(q => Number(q.chapter_id) === 107 || Number(q.chapter_id) === 23 || /p[- ]?block/i.test(q.chapter || '') || /p[- ]?block/i.test(q.chapter_name || ''));
      console.log(`Live p-block questions count: ${pblock.length}`);
      if (pblock.length > 0) {
        console.log('Sample live p-block question:', { id: pblock[0].id, chapter_id: pblock[0].chapter_id, chapter: pblock[0].chapter, text: pblock[0].question_text?.slice(0, 40) });
      }
    }
  } catch (err) {
    console.error('Error querying Live API:', err);
  }
}

main();

