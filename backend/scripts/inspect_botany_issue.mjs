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
  const res = await client.query(
    "SELECT id, subject, subject_id, category, chapter FROM question_bank WHERE LOWER(chapter) LIKE '%biological%classification%' LIMIT 10"
  );
  console.log("Sample rows in Neon DB:", res.rows);

  const groupRes = await client.query(
    "SELECT category, subject, subject_id, count(*) FROM question_bank WHERE LOWER(chapter) LIKE '%biological%classification%' GROUP BY category, subject, subject_id"
  );
  console.log("Neon DB groups:", groupRes.rows);

  const allSubjects = await client.query(
    "SELECT category, subject, count(*) FROM question_bank WHERE category = 'PYQ' GROUP BY category, subject"
  );
  console.log("All PYQ subjects in Neon DB:", allSubjects.rows);
  client.release();
  await pool.end();

  // Check on Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  // Fetch with category=PYQ and subject=Botany
  const liveBotany = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveBotanyData = await liveBotany.json();
  console.log("Live API with category=PYQ&subject=Botany total:", liveBotanyData.total, "count:", (liveBotanyData.questions || liveBotanyData.data || []).length);

  // Fetch with category=PYQ without subject
  const liveAll = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveAllData = await liveAll.json();
  console.log("Live API with category=PYQ total:", liveAllData.total);

  // Check some questions from liveAllData to see their subject
  const sampleLive = (liveAllData.questions || liveAllData.data || []);
  console.log("Live API sample subjects:", sampleLive.map(q => ({ id: q.id, subject: q.subject, category: q.category, chapter: q.chapter })));
}

main().catch(console.error);

