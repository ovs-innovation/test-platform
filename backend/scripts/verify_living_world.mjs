import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  // Check local/neon DB
  const localRes = await query("SELECT COUNT(*) as count FROM question_bank WHERE category = 'Botany' AND chapter = 'The Living World'");
  console.log(`Local/Neon DB count for 'The Living World': ${localRes.rows[0].count}`);

  const diagRes = await query("SELECT id, question_text, image_url, options, correct_index FROM question_bank WHERE category = 'Botany' AND image_url IS NOT NULL");
  console.log(`Local/Neon DB diagrams count: ${diagRes.rows.length}`);
  if (diagRes.rows.length > 0) {
    console.log('Diagram question:', diagRes.rows[0].question_text);
    console.log('Image URL:', diagRes.rows[0].image_url);
    console.log('Options:', diagRes.rows[0].options);
    console.log('Correct index:', diagRes.rows[0].correct_index);
  }

  // Check Live API
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) {
    console.error('Live login failed');
    process.exit(1);
  }
  const { token } = await loginRes.json();
  const qRes = await fetch(LIVE_API + '/question-bank?category=Botany', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const qData = await qRes.json();
  const liveBotany = qData.questions || [];
  console.log(`Total Botany questions on Live: ${liveBotany.length}`);

  const livingWorldLive = liveBotany.filter(q => 
    q.chapter_id === 221 || 
    /living world/i.test(q.chapter || '') || 
    /living world/i.test(q.chapter_name || '')
  );
  console.log(`Total 'The Living World' questions on Live: ${livingWorldLive.length}`);

  const liveDiags = livingWorldLive.filter(q => q.image_url);
  console.log(`'The Living World' questions with images on Live: ${liveDiags.length}`);
  liveDiags.forEach(d => {
    console.log(`- Q#${d.id}: "${d.question_text.slice(0, 45)}..." -> ${d.image_url}`);
  });

  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});

