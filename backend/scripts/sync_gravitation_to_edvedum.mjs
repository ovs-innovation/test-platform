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

async function syncToLive() {
  console.log('=== Step 1: Connecting to Neon DB & Loading "Gravitation" Questions ===');
  const res = await pool.query(`
    SELECT qb.*, c.name as neon_chapter_name
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.category = 'Physics' AND (
      qb.chapter = 'Gravitation'
      OR c.name = 'Gravitation'
      OR LOWER(COALESCE(qb.chapter, c.name, '')) LIKE '%gravitat%'
    )
    ORDER BY qb.id ASC
  `);

  console.log(`Loaded ${res.rows.length} questions from Neon DB for "Gravitation".`);

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

  let gravChap = chaps.find(c => c.name.toLowerCase() === 'gravitation');

  if (!gravChap) {
    console.log('Creating "Gravitation" chapter on edvedum.com...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        subject_id: physicsSubjectId,
        name: 'Gravitation',
        position: 7
      })
    });
    const createdData = await createRes.json();
    gravChap = createdData.chapter || createdData;
    console.log(`Created chapter "Gravitation" on live platform: ID ${gravChap.id}`);
  } else {
    console.log(`Found existing chapter "Gravitation" on live platform: ID ${gravChap.id}`);
  }

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

  console.log('\n=== Step 5: Uploading Gravitation Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < res.rows.length; i++) {
    const q = res.rows[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 100);
    if (existingTextSet.has(key)) {
      skipped++;
      console.log(`[${i + 1}/${res.rows.length}] Skipped existing: "${q.question_text.slice(0, 40)}..."`);
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
      chapter_id: gravChap.id,
      chapter: 'Gravitation',
      topic: q.topic || 'Gravitation',
      question_type: q.question_type || 'single_choice',
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

    let retries = 3;
    let uploaded = false;
    while (retries > 0 && !uploaded) {
      try {
        const uploadRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          console.error(`Failed to upload Q#${i + 1}: ${uploadRes.status} - ${errText}`);
          retries--;
          await new Promise(r => setTimeout(r, 1000));
        } else {
          const resData = await uploadRes.json();
          inserted++;
          console.log(`[${i + 1}/${res.rows.length}] Uploaded successfully (ID: ${resData.id || resData.question?.id}) - "${q.question_text.slice(0, 45)}..."`);
          uploaded = true;
        }
      } catch (err) {
        console.error(`Network error on Q#${i + 1}:`, err.message);
        retries--;
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total questions in batch: ${res.rows.length}`);
  console.log(`Successfully uploaded: ${inserted}`);
  console.log(`Skipped (already exists): ${skipped}`);

  // Final verification
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  const gravQuestions = verifyQuestions.filter(q => 
    q.chapter?.toLowerCase().includes('gravitat') || 
    q.chapter_id === gravChap.id
  );

  console.log(`\nVerified on live edvedum.com: ${gravQuestions.length} questions in chapter "Gravitation".`);
  await pool.end();
}

syncToLive().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
