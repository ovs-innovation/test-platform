import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('=== FIXING GOC CATEGORY & CHAPTER ON NEON & LIVE ===');

  // 1. NEON DB UPDATE
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const updateRes = await client.query(`
      UPDATE question_bank 
      SET category = 'Chemistry', subject = 'Chemistry'
      WHERE (chapter_id = 167 OR LOWER(chapter) = 'basics of organic chemistry') 
        AND exam_type = 'JEE'
    `);
    console.log(`Updated ${updateRes.rowCount} questions in Neon DB to category = 'Chemistry'.`);

    const checkRes = await client.query(`
      SELECT count(1)::int as cnt, category, chapter 
      FROM question_bank 
      WHERE (chapter_id = 167 OR LOWER(chapter) = 'basics of organic chemistry') AND exam_type = 'JEE'
      GROUP BY category, chapter
    `);
    console.log('Neon DB Verification:', checkRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // 2. LIVE PRODUCTION UPDATE
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  // Fetch all questions with chapter_id 249 or category PYQ on live
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQs = data.questions || data.data || [];
  const targetQs = allQs.filter(q => Number(q.chapter_id) === 249 || /basics?\s*of\s*organic/i.test(q.chapter || ''));
  console.log(`Found ${targetQs.length} questions on live server that need category = 'Chemistry'.`);

  let updatedCount = 0;
  const BATCH_SIZE = 15;
  for (let i = 0; i < targetQs.length; i += BATCH_SIZE) {
    const batch = targetQs.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      try {
        const putRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            category: 'Chemistry',
            subject: 'Chemistry',
            chapter: 'Basics of Organic Chemistry',
            topic: 'Basics of Organic Chemistry'
          })
        });
        if (putRes.ok) updatedCount++;
      } catch (err) {
        console.error(`Failed to update live Q${q.id}:`, err.message);
      }
    }));
    console.log(`Live update progress: ${Math.min(i + BATCH_SIZE, targetQs.length)} / ${targetQs.length} (updated: ${updatedCount})`);
  }

  console.log(`Successfully updated ${updatedCount} / ${targetQs.length} questions on live server!`);

  // Verify by fetching with category=Chemistry&exam_type=JEE
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const vData = await verifyRes.json();
  const vQs = vData.questions || [];
  const gocInChem = vQs.filter(q => Number(q.chapter_id) === 249 || /basics?\s*of\s*organic/i.test(q.chapter || ''));
  console.log(`=== VERIFICATION ===`);
  console.log(`Live questions now visible in category=Chemistry & exam_type=JEE: ${gocInChem.length}`);
}

main().catch(console.error);
