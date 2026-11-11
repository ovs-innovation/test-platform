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
  console.log('--- Checking Local Neon DB Chapters for Periodic ---');
  const resNeon = await pool.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE subject_id = 10 AND (name ILIKE '%period%' OR name ILIKE '%classif%')
    ORDER BY id;
  `);
  console.log('Neon Chapters (subject_id 10):', resNeon.rows);

  const resNeonQB = await pool.query(`
    SELECT count(*)::int as count
    FROM question_bank
    WHERE category = 'PYQ' AND (chapter ILIKE '%period%' OR chapter ILIKE '%classif%');
  `);
  console.log('Neon existing PYQ count:', resNeonQB.rows[0].count);

  console.log('\n--- Checking Live edvedum.com Chapters for Periodic ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();

    const chRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveChapters = await chRes.json();
    const chList = Array.isArray(liveChapters) ? liveChapters : (liveChapters.chapters || liveChapters.data || []);
    const periodChaps = chList.filter(c => /period|classif/i.test(c.name || ''));
    console.log('Live Periodic Chapters (subject_id 6):', periodChaps);

    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const qList = (qData.questions || qData.data || []).filter(q =>
      Number(q.subject_id) === 6 && (
        /period|classif/i.test(q.chapter || '') ||
        /period|classif/i.test(q.chapter_name || '')
      )
    );
    console.log('Live Existing Periodic PYQs count:', qList.length);
  } catch (err) {
    console.error('Live check error:', err.message);
  }

  await pool.end();
}

main().catch(console.error);
