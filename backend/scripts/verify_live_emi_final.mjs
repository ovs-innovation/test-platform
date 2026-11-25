import fetch from 'node-fetch';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Electromagnetic Induction';

async function main() {
  console.log('=== VERIFYING LIVE API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // 1. Check JEE
  const jeeRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=250`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const jeeData = await jeeRes.json();
  const jeeQuestions = jeeData?.questions || [];
  console.log(`Live JEE questions count: ${jeeQuestions.length}`);

  let dummyCount = 0;
  let mcqCount = 0;
  let numCount = 0;
  let diagramCount = 0;

  for (const q of jeeQuestions) {
    if (q.image_url) diagramCount++;
    if (q.question_type === 'numerical') {
      numCount++;
    } else {
      mcqCount++;
      for (const opt of (q.options || [])) {
        const text = (typeof opt === 'string' ? opt : (opt.text || '')).trim().toLowerCase();
        if (['(a)', '(b)', '(c)', '(d)', 'option a', 'option b', 'option c', 'option d'].includes(text)) {
          dummyCount++;
        }
      }
    }
  }

  console.log(`Live JEE stats:`);
  console.log(`- Total: ${jeeQuestions.length}`);
  console.log(`- MCQs: ${mcqCount}`);
  console.log(`- Numericals: ${numCount}`);
  console.log(`- With Diagrams: ${diagramCount}`);
  console.log(`- Dummy Options: ${dummyCount}`);

  // Sample check
  const sampleMCQ = jeeQuestions.find(q => q.question_type !== 'numerical' && q.image_url);
  console.log('\nSample Live MCQ with diagram:');
  console.log(`Q ID: ${sampleMCQ?.id}`);
  console.log(`Text: ${sampleMCQ?.question_text?.substring(0, 80)}...`);
  console.log(`Options:`, sampleMCQ?.options);
  console.log(`Diagram:`, sampleMCQ?.image_url);

  const sampleNum = jeeQuestions.find(q => q.question_type === 'numerical');
  console.log('\nSample Live Numerical:');
  console.log(`Q ID: ${sampleNum?.id}`);
  console.log(`Text: ${sampleNum?.question_text?.substring(0, 80)}...`);
  console.log(`Numeric Answer:`, sampleNum?.numeric_answer);
  console.log(`Options:`, sampleNum?.options);

  // 2. Check NEET
  const neetRes = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=NEET&refresh=true&limit=250`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const neetData = await neetRes.json();
  const neetQuestions = neetData?.questions || [];
  console.log(`\nLive NEET questions count preserved: ${neetQuestions.length}`);

  // 3. Check Neon DB
  console.log('\n=== VERIFYING NEON DB ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  const neonRes = await client.query(`
    SELECT count(*), exam_type, chapter, chapter_id 
    FROM question_bank 
    WHERE chapter_id = 144 OR chapter ILIKE '%Electromagnetic Induction%'
    GROUP BY exam_type, chapter, chapter_id
    ORDER BY exam_type
  `);
  console.log('Neon DB counts:', neonRes.rows);
  client.release();
  await pool.end();
}

main().catch(console.error);
