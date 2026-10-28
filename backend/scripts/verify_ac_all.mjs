import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== Verifying Neon PostgreSQL ===');
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const qbRes = await client.query(`
      SELECT 
        qb.category, 
        c.name as chapter_name, 
        qb.chapter, 
        qb.topic, 
        COUNT(qb.id) as total_questions,
        COUNT(CASE WHEN qb.image_url IS NOT NULL THEN 1 END) as with_diagrams
      FROM question_bank qb
      JOIN chapters c ON qb.chapter_id = c.id
      WHERE c.name ILIKE '%alternating%' OR qb.chapter ILIKE '%alternating%'
      GROUP BY qb.category, c.name, qb.chapter, qb.topic
    `);
    console.table(qbRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Verifying Live edvedum.com API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const qbLiveRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qbLiveData = await qbLiveRes.json();
  const liveAcQuestions = (qbLiveData.questions || []).filter(q =>
    (q.chapter && q.chapter.toLowerCase() === 'alternating current') ||
    (q.chapter_name && q.chapter_name.toLowerCase() === 'alternating current') ||
    q.chapter_id === 197
  );

  console.log(`Live edvedum.com Alternating Current Questions Count: ${liveAcQuestions.length}`);
  const withDiagrams = liveAcQuestions.filter(q => q.image_url).length;
  console.log(`Live Questions with Diagrams: ${withDiagrams}`);

  // Sample check first 3 questions
  console.log('\nSample Question 1:', {
    text: liveAcQuestions[0]?.question_text?.slice(0, 70),
    options: liveAcQuestions[0]?.options,
    image_url: liveAcQuestions[0]?.image_url
  });
}

verify().catch(console.error);
