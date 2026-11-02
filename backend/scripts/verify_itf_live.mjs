import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function verify() {
  console.log('=== Verifying Inverse Trigonometry Questions ===\n');

  // 1. Neon DB
  const localRes = await query(`
    SELECT count(*) as total,
           count(CASE WHEN question_type = 'single_choice' THEN 1 END) as mcq,
           count(CASE WHEN question_type = 'integer' THEN 1 END) as integer_qs
    FROM question_bank 
    WHERE chapter = 'Inverse Trignometry'
  `);
  console.log('Local Neon DB "Inverse Trignometry" counts:', localRes.rows[0]);

  const localSample = await query(`
    SELECT id, question_text, question_type, correct_index, marks
    FROM question_bank
    WHERE chapter = 'Inverse Trignometry'
    ORDER BY id ASC
    LIMIT 3
  `);
  console.log('\nLocal Neon DB Sample Questions (First 3):', localSample.rows);

  const localSampleLast = await query(`
    SELECT id, question_text, question_type, correct_index, marks
    FROM question_bank
    WHERE chapter = 'Inverse Trignometry'
    ORDER BY id DESC
    LIMIT 3
  `);
  console.log('\nLocal Neon DB Sample Questions (Last 3):', localSampleLast.rows);

  // 2. Live Production
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Mathematics&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const list = liveData.data?.questions || liveData.questions || [];
  
  const itfLive = list.filter(q => q.chapter === 'Inverse Trignometry' || q.chapter_id === 239);
  console.log(`\nLive Production "Inverse Trignometry" total questions: ${itfLive.length}`);
  console.log(`  MCQ: ${itfLive.filter(q => q.question_type === 'single_choice').length}`);
  console.log(`  Integer: ${itfLive.filter(q => q.question_type === 'integer' || q.question_type === 'numerical').length}`);

  console.log('\nLive Production Sample Questions (First 2):', itfLive.slice(0, 2).map(q => ({
    id: q.id,
    chapter: q.chapter,
    type: q.question_type,
    text: q.question_text?.slice(0, 70)
  })));

  console.log('\nLive Production Sample Questions (Last 2):', itfLive.slice(-2).map(q => ({
    id: q.id,
    chapter: q.chapter,
    type: q.question_type,
    text: q.question_text?.slice(0, 70)
  })));
}

verify().catch(console.error);

