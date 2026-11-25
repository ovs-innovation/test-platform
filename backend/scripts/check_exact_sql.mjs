import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  
  // Check Neon
  const res1 = await pool.query(`SELECT count(1)::int as cnt FROM question_bank WHERE LOWER(category) = 'chemistry' AND UPPER(COALESCE(exam_type, 'NEET')) = 'JEE'`);
  console.log('Neon total with category=chemistry & exam_type=JEE:', res1.rows[0].cnt);

  const res2 = await pool.query(`SELECT count(1)::int as cnt, category, chapter FROM question_bank WHERE (chapter_id = 167 OR LOWER(chapter) = 'basics of organic chemistry') AND exam_type = 'JEE' GROUP BY category, chapter`);
  console.log('Neon GOC breakdown:', res2.rows);

  await pool.end();

  // Check Live
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQs = liveData.questions || [];
  console.log('Live API returned with category=Chemistry&exam_type=JEE:', liveQs.length);

  const liveGoc = liveQs.filter(q => Number(q.chapter_id) === 249 || /basics?\s*of\s*organic|some basic principles/i.test(q.chapter || ''));
  console.log('Live GOC in category=Chemistry:', liveGoc.length);

  // Check with category=PYQ
  const pyqRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const pyqData = await pyqRes.json();
  const pyqQs = pyqData.questions || [];
  const pyqGoc = pyqQs.filter(q => Number(q.chapter_id) === 249 || /basics?\s*of\s*organic|some basic principles/i.test(q.chapter || ''));
  console.log('Live GOC in category=PYQ:', pyqGoc.length);
  if (pyqGoc.length > 0) {
    console.log('Sample PYQ GOC question:', {
      id: pyqGoc[0].id,
      category: pyqGoc[0].category,
      subject: pyqGoc[0].subject,
      chapter: pyqGoc[0].chapter,
      exam_type: pyqGoc[0].exam_type
    });
  }
}

main().catch(console.error);
