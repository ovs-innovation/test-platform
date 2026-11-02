import { pool } from '../src/config/db.js';

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

async function checkQuestions() {
  console.log('=== Checking Local DB questions for chapter 60 ===');
  const localRes = await pool.query("SELECT question_type, count(*)::int as count FROM question_bank WHERE chapter_id = 60 GROUP BY question_type");
  console.log('Chapter 60 local counts:', localRes.rows);

  const localTotal = await pool.query("SELECT count(*)::int as total, min(id) as min_id, max(id) as max_id FROM question_bank WHERE chapter_id = 60");
  console.log('Chapter 60 total:', localTotal.rows[0]);

  console.log('\n=== Checking Live DB questions for chapter 38 and 12 ===');
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQs = data.questions || data.data?.questions || data.data || [];
  
  const ch38Qs = allQs.filter(q => q.chapter_id === 38 || /chemical bonding and molecular structure/i.test(q.chapter || q.chapter_name || ''));
  const ch12Qs = allQs.filter(q => q.chapter_id === 12);

  console.log(`Live chapter 38: ${ch38Qs.length} questions`);
  console.log(`Live chapter 12: ${ch12Qs.length} questions`);
  
  if (ch38Qs.length > 0) {
    let mcq = 0, ar = 0;
    ch38Qs.forEach(q => {
      if (q.question_type === 'assertion_reason' || q.type === 'assertion_reason') ar++;
      else mcq++;
    });
    console.log(`Chapter 38 breakdown: MCQs: ${mcq}, AR: ${ar}`);
  }

  await pool.end();
}

checkQuestions().catch(console.error);

