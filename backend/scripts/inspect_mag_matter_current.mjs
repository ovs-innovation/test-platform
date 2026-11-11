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
  const client = await pool.connect();
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    console.log('Local Physics Subject:', subRes.rows);

    const chapRes = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%magnetism%'"
    );
    console.log('Local Magnetism Chapters:', chapRes.rows);

    const qCount = await client.query(
      "SELECT count(*) as count, chapter_id, chapter, category FROM question_bank WHERE chapter ILIKE '%magnetism%' GROUP BY chapter_id, chapter, category"
    );
    console.log('Local Questions:', qCount.rows);

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
    const magLiveCh = liveChapters.filter(c => (c.name || '').toLowerCase().includes('magnetism'));
    console.log('Live DB Magnetism chapters:', magLiveCh);

    const liveQRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=5&limit=1000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveQData = await liveQRes.json();
    const list = liveQData.questions || liveQData.data || [];
    const magLive = list.filter(q => (q.chapter || '').toLowerCase().includes('magnetism'));
    console.log('Live DB Magnetism questions in PYQ limit 1000:', magLive.length);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
