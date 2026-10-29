import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function inspect() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('--- NEON DB ---');
  const chemSubj = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE 'Chemistry'");
  console.log('Chem subject:', chemSubj.rows);

  const chapters = await pool.query("SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY name", [chemSubj.rows[0]?.id]);
  console.log('Chemistry chapters count:', chapters.rows.length);
  const dfChap = chapters.rows.filter(c => c.name.toLowerCase().includes('block') || c.name.toLowerCase().includes('d-') || c.name.toLowerCase().includes('d and f'));
  console.log('d/f chapters:', dfChap);

  const qbCounts = await pool.query("SELECT chapter, count(*) as cnt FROM question_bank WHERE category ILIKE 'Chemistry' GROUP BY chapter ORDER BY cnt DESC");
  console.log('Chemistry question_bank chapter counts:', qbCounts.rows);

  console.log('\n--- LIVE API ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();
    const liveChaptersRes = await fetch(`${LIVE_API}/admin/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const liveChapters = (await liveChaptersRes.json()).chapters || [];
    const liveDfChaps = liveChapters.filter(c => c.name.toLowerCase().includes('block') || c.name.toLowerCase().includes('d-') || c.name.toLowerCase().includes('d and f'));
    console.log('Live d/f chapters:', liveDfChaps);

    const liveQbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=1500`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const liveQb = (await liveQbRes.json()).questions || [];
    const liveInDF = liveQb.filter(q => (q.chapter || '').toLowerCase().includes('block') || (q.chapter || '').toLowerCase().includes('d and f') || (q.chapter || '').toLowerCase().includes('d-'));
    console.log(`Live questions in d/f block or related: ${liveInDF.length}`);
    console.log(liveInDF.map(q => ({ id: q.id, chapter: q.chapter, text: q.question_text.slice(0, 60) })));
  } catch (err) {
    console.error('Error fetching live:', err.message);
  }

  await pool.end();
}

inspect().catch(console.error);
