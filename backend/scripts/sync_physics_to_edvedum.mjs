import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function run() {
  console.log('=== Step 1: Connecting to Neon DB & Loading Physics Questions ===');
  const res = await pool.query(`
    SELECT qb.*, c.name as neon_chapter_name
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.category = 'Physics' AND (
      LOWER(COALESCE(qb.chapter, c.name, '')) LIKE '%straight line%'
      OR LOWER(COALESCE(qb.chapter, c.name, '')) LIKE '%plane%'
    )
    ORDER BY qb.id ASC
  `);

  console.log(`Loaded ${res.rows.length} questions from Neon DB for straight line & plane.`);

  // Group by chapter
  const straightLineQs = res.rows.filter(q => {
    const ch = (q.chapter || q.neon_chapter_name || '').toLowerCase();
    return ch.includes('straight line');
  });
  const planeQs = res.rows.filter(q => {
    const ch = (q.chapter || q.neon_chapter_name || '').toLowerCase();
    return ch.includes('plane');
  });

  console.log(`- Motion in straight line: ${straightLineQs.length} questions`);
  console.log(`- motion in a plane: ${planeQs.length} questions`);

  console.log('\n=== Step 2: Authenticating with Live edvedum.com API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed with status ${loginRes.status}: ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Logged in successfully to edvedum.com as admin.');

  console.log('\n=== Step 3: Checking Existing Physics Chapters on edvedum.com ===');
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on edvedum.com');
  const physicsSubjectId = physicsSub.id;
  console.log(`Physics Subject ID: ${physicsSubjectId}`);

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];

  let straightLineChap = chaps.find(c => c.name.toLowerCase().includes('straight line'));
  if (!straightLineChap) {
    console.log('Creating "Motion in straight line" chapter on edvedum.com...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ subject_id: physicsSubjectId, name: 'Motion in straight line', position: 2 })
    });
    straightLineChap = (await createRes.json()).chapter;
  }
  console.log(`Motion in straight line Chapter ID: ${straightLineChap.id}`);

  let planeChap = chaps.find(c => c.name.toLowerCase().includes('plane'));
  if (!planeChap) {
    console.log('Creating "motion in a plane" chapter on edvedum.com...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ subject_id: physicsSubjectId, name: 'motion in a plane', position: 3 })
    });
    planeChap = (await createRes.json()).chapter;
  }
  console.log(`motion in a plane Chapter ID: ${planeChap.id} (${planeChap.name})`);

  console.log('\n=== Step 4: Checking Existing Questions on edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  console.log(`Found ${existingQuestions.length} existing Physics questions on edvedum.com.`);

  const existingTextSet = new Set(
    existingQuestions.map(q => q.question_text.trim().toLowerCase().slice(0, 100))
  );

  console.log('\n=== Step 5: Uploading Motion in straight line Questions ===');
  let slInserted = 0;
  for (let i = 0; i < straightLineQs.length; i++) {
    const q = straightLineQs[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 100);
    if (existingTextSet.has(key)) {
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: straightLineChap.id,
      chapter: 'Motion in straight line',
      topic: q.topic || '',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices ? (typeof q.correct_indices === 'string' ? JSON.parse(q.correct_indices) : q.correct_indices) : [],
      numeric_answer: q.numeric_answer,
      numerical_tolerance: q.numerical_tolerance,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: q.solution_image_url || ''
    };

    const upRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (upRes.ok) {
      slInserted++;
      if (slInserted % 10 === 0 || slInserted === straightLineQs.length) {
        process.stdout.write(`Straight Line: ${slInserted}/${straightLineQs.length} uploaded\r`);
      }
    } else {
      console.warn(`\nFailed to upload Q${i + 1}: ${upRes.status} ${await upRes.text()}`);
    }
  }
  console.log(`\nMotion in straight line upload complete: ${slInserted} questions added.`);

  console.log('\n=== Step 6: Uploading motion in a plane Questions ===');
  let planeInserted = 0;
  for (let i = 0; i < planeQs.length; i++) {
    const q = planeQs[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 100);
    if (existingTextSet.has(key)) {
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: planeChap.id,
      chapter: 'motion in a plane',
      topic: q.topic || '',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices ? (typeof q.correct_indices === 'string' ? JSON.parse(q.correct_indices) : q.correct_indices) : [],
      numeric_answer: q.numeric_answer,
      numerical_tolerance: q.numerical_tolerance,
      assertion_text: q.assertion_text,
      reason_text: q.reason_text,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: q.solution_image_url || ''
    };

    const upRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (upRes.ok) {
      planeInserted++;
      if (planeInserted % 10 === 0 || planeInserted === planeQs.length) {
        process.stdout.write(`motion in a plane: ${planeInserted}/${planeQs.length} uploaded\r`);
      }
    } else {
      console.warn(`\nFailed to upload plane Q${i + 1}: ${upRes.status} ${await upRes.text()}`);
    }
  }
  console.log(`\nmotion in a plane upload complete: ${planeInserted} questions added.`);

  console.log('\n=== Step 7: Verifying Live edvedum.com Question Bank ===');
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const finalData = await finalRes.json();
  const finalQuestions = finalData.questions || [];
  const finalChapters = {};
  finalQuestions.forEach(q => {
    const ch = (q.chapter || q.chapter_name || 'General').trim();
    finalChapters[ch] = (finalChapters[ch] || 0) + 1;
  });

  console.log(`Total Physics questions on live edvedum.com: ${finalQuestions.length}`);
  console.log('Chapters breakdown on live edvedum.com:', finalChapters);

  await pool.end();
}

run().catch(err => {
  console.error('Fatal error:', err);
  pool.end();
  process.exit(1);
});
