import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const localRes = await pool.query(
    "SELECT id, question_text, chapter, chapter_id, image_url FROM question_bank WHERE chapter ILIKE '%Chemical Kinetics%' OR chapter_id = 14 ORDER BY id"
  );
  console.log('Local Chemical Kinetics questions count:', localRes.rowCount);
  if (localRes.rowCount > 0) {
    console.log('Sample local:', localRes.rows.slice(0, 5).map(r => ({ id: r.id, text: r.question_text.slice(0, 50), img: r.image_url })));
  }
  await pool.end();

  // Check live
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveData = await liveRes.json();
  const liveKinetics = (liveData.questions || []).filter(
    q => q.chapter_id === 14 || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  console.log('Live Chemical Kinetics questions count:', liveKinetics.length);
  if (liveKinetics.length > 0) {
    console.log('Sample live:', liveKinetics.slice(0, 5).map(r => ({ id: r.id, text: r.question_text.slice(0, 50), img: r.image_url })));
  }
}

check().catch(console.error);
