import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('--- NEON DB CHAPTER 198 & 202 ---');
    const res = await client.query(`
      SELECT * 
      FROM chapters 
      WHERE id IN (198, 202)
      ORDER BY id
    `);
    console.table(res.rows);

    console.log('--- NEON DB QUESTION BANK SEARCH ---');
    const qbRes2 = await client.query(`
      SELECT chapter_id, chapter, exam_type, count(*) 
      FROM question_bank 
      WHERE chapter_id IN (198, 202) OR chapter ILIKE '%ray%'
      GROUP BY chapter_id, chapter, exam_type
      ORDER BY chapter_id, exam_type
    `);
    console.table(qbRes2.rows);

    console.log('--- NEON DB QUESTION BANK SEARCH ---');
    const qbRes = await client.query(`
      SELECT chapter_id, chapter, exam_type, count(*) 
      FROM question_bank 
      WHERE chapter ILIKE '%ray%' OR chapter ILIKE '%optics%'
      GROUP BY chapter_id, chapter, exam_type
      ORDER BY chapter_id, exam_type
    `);
    console.table(qbRes.rows);

    console.log('--- LIVE API AUTH & CHECK ---');
    const authRes = await fetch('https://edvedum.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: process.env.ADMIN_PASSWORD || 'Admin@12345' })
    });
    const authData = await authRes.json();
    const token = authData.token || authData.accessToken;
    console.log('Live Auth Success:', !!token);

    if (token) {
      const liveChRes = await fetch('https://edvedum.com/api/chapters?limit=200', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const liveChData = await liveChRes.json();
      const chList = (liveChData.chapters || liveChData || []).filter(c => 
        (c.name && (c.name.toLowerCase().includes('ray') || c.name.toLowerCase().includes('optics')))
      );
      console.log('Live API matching chapters:');
      console.table(chList.map(c => ({ id: c.id, name: c.name, subject_id: c.subject_id, class_level: c.class_level })));

      for (const ch of chList) {
        const liveQRes = await fetch(`https://edvedum.com/api/question-bank?chapter_id=${ch.id}&limit=10`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const liveQData = await liveQRes.json();
        const total = liveQData.total || (liveQData.questions ? liveQData.questions.length : 0);
        console.log(`Live API Chapter ${ch.id} (${ch.name}): total=${total}`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
