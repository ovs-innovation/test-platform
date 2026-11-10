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

async function checkCurrent() {
  const client = await pool.connect();
  try {
    const localRes = await client.query(
      "SELECT id, chapter_id, chapter, category, count(*) as cnt FROM question_bank WHERE chapter ILIKE '%rotational%' GROUP BY id, chapter_id, chapter, category LIMIT 10"
    );
    const localTotal = await client.query(
      "SELECT count(*) as total, chapter_id, chapter FROM question_bank WHERE chapter ILIKE '%rotational%' GROUP BY chapter_id, chapter"
    );
    console.log('Local DB Rotational questions:', localTotal.rows);

    const chRes = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%rotational%'"
    );
    console.log('Local DB Rotational chapters:', chRes.rows);

    // Live API
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const data = await loginRes.json();
    const token = data.token || data.accessToken || data.data?.token;

    const liveChRes = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveChData = await liveChRes.json();
    const liveChapters = Array.isArray(liveChData) ? liveChData : (liveChData.chapters || liveChData.data || []);
    const rotLiveCh = liveChapters.filter(c => (c.name || '').toLowerCase().includes('rotational'));
    console.log('Live DB Rotational chapters:', rotLiveCh);

    // Fetch live questions
    const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const list = qData.questions || qData.data || [];
    const rotLive = list.filter(q => (q.chapter || '').toLowerCase().includes('rotational') || rotLiveCh.some(c => c.id === Number(q.chapter_id)));
    console.log('Live DB Rotational questions found in limit 1000:', rotLive.length);
  } finally {
    client.release();
    await pool.end();
  }
}

checkCurrent().catch(console.error);

