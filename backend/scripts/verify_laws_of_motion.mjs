import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  const countRes = await pool.query("SELECT count(*)::int as count FROM question_bank WHERE category = 'Physics' AND lower(chapter) = 'laws of motion'");
  console.log('Neon DB Total Laws of Motion questions:', countRes.rows[0].count);

  const sampleRes = await pool.query("SELECT id, question_text, options, correct_index, image_url FROM question_bank WHERE category = 'Physics' AND lower(chapter) = 'laws of motion' AND image_url IS NOT NULL ORDER BY id ASC LIMIT 3");
  console.log('\nSample diagram questions in Neon DB:');
  for (const row of sampleRes.rows) {
    console.log({ id: row.id, text: row.question_text.slice(0, 50) + '...', image_url: row.image_url });
  }

  // Check live website
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;
  const liveRes = await fetch('https://edvedum.com/api/question-bank?category=Physics&skip_cache=true', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const liveData = await liveRes.json();
  const liveLaws = (liveData.questions || []).filter(q => (q.chapter || '').toLowerCase().includes('law'));
  console.log('\nLive edvedum.com Total Laws of Motion questions:', liveLaws.length);
  if (liveLaws.length > 0) {
    console.log('Live sample question:', {
      text: liveLaws[0].question_text.slice(0, 50) + '...',
      chapter: liveLaws[0].chapter,
      options: liveLaws[0].options,
      correct_index: liveLaws[0].correct_index,
      image_url: liveLaws[0].image_url
    });
  }
  await pool.end();
}
verify().catch(console.error);
