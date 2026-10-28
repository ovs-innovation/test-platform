import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('=== Verifying Chapter Atoms in Neon DB ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();

  try {
    const qRes = await client.query(`
      SELECT q.id, q.question_text, q.image_url, c.name as chapter_name, s.name as subject_name
      FROM question_bank q
      JOIN chapters c ON q.chapter_id = c.id
      JOIN subjects s ON q.subject_id = s.id
      WHERE c.name ILIKE 'Atoms'
      ORDER BY q.id ASC
    `);

    console.log(`Neon DB Questions count for 'Atoms': ${qRes.rows.length}`);
    const withImages = qRes.rows.filter(r => r.image_url);
    console.log(`Questions with diagram images: ${withImages.length}`);
    for (const imgQ of withImages) {
      console.log(`  - [ID ${imgQ.id}] ${imgQ.image_url}: "${imgQ.question_text.slice(0, 50)}..."`);
    }
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== Verifying Chapter Atoms on Live edvedum.com ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  const token = (await loginRes.json()).token;

  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  const liveAtomsQuestions = existingQuestions.filter(q =>
    (q.chapter && q.chapter.toLowerCase() === 'atoms') ||
    (q.chapter_id === 199)
  );

  console.log(`Live edvedum.com questions count for 'Atoms': ${liveAtomsQuestions.length}`);
  const liveWithImages = liveAtomsQuestions.filter(q => q.image_url && q.image_url.trim() !== '');
  console.log(`Live questions with diagram images: ${liveWithImages.length}`);
  for (const imgQ of liveWithImages) {
    console.log(`  - [Live ID ${imgQ.id}] ${imgQ.image_url}: "${imgQ.question_text.slice(0, 50)}..."`);
  }
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
