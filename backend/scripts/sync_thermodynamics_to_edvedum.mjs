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
  console.log('=== Step 1: Connecting to Neon DB & Loading Thermodynamics Questions ===');
  const res = await pool.query(`
    SELECT qb.*
    FROM question_bank qb
    WHERE qb.category = 'Physics' AND qb.chapter = 'Thermodynamics'
    ORDER BY qb.id ASC
  `);

  console.log(`Loaded ${res.rows.length} questions from Neon DB for "Thermodynamics".`);
  if (res.rows.length === 0) {
    throw new Error('No questions found in Neon DB for Thermodynamics.');
  }

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

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let thermoChap = chaps.find(c => c.name.toLowerCase() === 'thermodynamics');

  if (!thermoChap) {
    console.log("Chapter 'Thermodynamics' not found on edvedum.com. Creating it...");
    const createChapRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSubjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Thermodynamics' })
    });

    if (createChapRes.ok) {
      const data = await createChapRes.json();
      thermoChap = data.chapter || data;
      console.log(`Created chapter 'Thermodynamics' on live API with ID: ${thermoChap.id}`);
    } else {
      console.warn(`Failed to create chapter via API: ${createChapRes.status} ${await createChapRes.text()}`);
      const reChapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSubjectId}/chapters`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reChaps = (await reChapsRes.json()).chapters || [];
      thermoChap = reChaps.find(c => c.name.toLowerCase() === 'thermodynamics') || { id: null, name: 'Thermodynamics' };
    }
  } else {
    console.log(`Found existing chapter 'Thermodynamics' on edvedum.com with ID: ${thermoChap.id}`);
  }

  console.log(`Target Chapter: ${thermoChap.name} (ID: ${thermoChap.id})`);

  console.log('\n=== Step 4: Checking Existing Questions on edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  console.log(`Found ${existingQuestions.length} existing Physics questions on edvedum.com.`);

  const existingInChapter = existingQuestions.filter(q => 
    q.chapter_id === thermoChap.id || 
    (q.chapter && q.chapter.toLowerCase() === 'thermodynamics')
  );
  console.log(`Found ${existingInChapter.length} existing questions in chapter "${thermoChap.name}" on edvedum.com.`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  console.log('\n=== Step 5: Uploading Thermodynamics Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < res.rows.length; i++) {
    const q = res.rows[i];
    const key = q.question_text.trim().toLowerCase();
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
      chapter_id: thermoChap.id,
      chapter: 'Thermodynamics',
      topic: q.topic || 'Thermodynamics',
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
  const liveThermoQuestions = verifyQuestions.filter(q => 
    q.chapter?.toLowerCase() === 'thermodynamics' || 
    q.chapter_id === thermoChap.id
  );

  console.log(`\nVerified on live edvedum.com: ${liveThermoQuestions.length} questions in chapter "Thermodynamics".`);
  await pool.end();
}

syncToLive().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
