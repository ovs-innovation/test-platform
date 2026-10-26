import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function run() {
  console.log('=== Step 1: Connecting to Neon DB & Loading "Work, Power and Energy" Questions ===');
  const res = await pool.query(`
    SELECT qb.*, c.name as neon_chapter_name
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.category = 'Physics' AND (
      qb.chapter = 'Work, Power and Energy'
      OR c.name = 'Work, Power and Energy'
      OR LOWER(COALESCE(qb.chapter, c.name, '')) LIKE '%work%'
    )
    ORDER BY qb.id ASC
  `);

  console.log(`Loaded ${res.rows.length} questions from Neon DB for "Work, Power and Energy".`);

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

  console.log('\n=== Step 3: Checking Physics Subject & Chapters on edvedum.com ===');
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

  let wpeChap = chaps.find(c => c.name.toLowerCase().includes('work') && c.name.toLowerCase().includes('energy'));
  if (!wpeChap) {
    console.log('Creating "Work, Power and Energy" chapter on edvedum.com...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ subject_id: physicsSubjectId, name: 'Work, Power and Energy', position: 5 })
    });
    wpeChap = (await createRes.json()).chapter;
  }
  console.log(`Work, Power and Energy Chapter ID: ${wpeChap.id} (${wpeChap.name})`);

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

  console.log('\n=== Step 5: Uploading Work, Power and Energy Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < res.rows.length; i++) {
    const q = res.rows[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 100);
    if (existingTextSet.has(key)) {
      skipped++;
      continue;
    }

    let parsedOptions = [];
    if (typeof q.options === 'string') {
      try {
        parsedOptions = JSON.parse(q.options);
      } catch {
        parsedOptions = q.options.split('|');
      }
    } else if (Array.isArray(q.options)) {
      parsedOptions = q.options;
    }

    let parsedCorrectIndices = [];
    if (q.correct_indices) {
      if (typeof q.correct_indices === 'string') {
        try {
          parsedCorrectIndices = JSON.parse(q.correct_indices);
        } catch {
          parsedCorrectIndices = [q.correct_index];
        }
      } else if (Array.isArray(q.correct_indices)) {
        parsedCorrectIndices = q.correct_indices;
      }
    } else {
      parsedCorrectIndices = [q.correct_index];
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: wpeChap.id,
      chapter: 'Work, Power and Energy',
      topic: q.topic || 'Work, Power and Energy',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: parsedOptions,
      correct_index: q.correct_index ?? 0,
      correct_indices: parsedCorrectIndices,
      numeric_answer: q.numeric_answer,
      numerical_tolerance: q.numerical_tolerance,
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
      inserted++;
      existingTextSet.add(key);
      if (inserted % 10 === 0 || inserted === res.rows.length) {
        process.stdout.write(`Work, Power & Energy: ${inserted}/${res.rows.length} uploaded\r`);
      }
    } else {
      console.warn(`\nFailed to upload Q${i + 1}: ${upRes.status} ${await upRes.text()}`);
    }
  }

  console.log(`\nUpload complete: ${inserted} questions added, ${skipped} already present.`);

  console.log('\n=== Step 6: Verifying Live edvedum.com Question Bank ===');
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
