import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { CURRENT_ELEC_BATCH1_QUESTIONS } from './seed_current_elec_part1.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function syncToLive() {
  console.log(`=== Step 1: Preparing ${CURRENT_ELEC_BATCH1_QUESTIONS.length} Questions for Live edvedum.com Sync ===`);

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
  let targetChap = chaps.find(c => c.name.toLowerCase().includes('current electricity'));

  if (!targetChap) {
    console.log("Chapter 'Current Electricity' not found on edvedum.com. Creating it...");
    const createChapRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSubjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Current Electricity' })
    });

    if (createChapRes.ok) {
      const data = await createChapRes.json();
      targetChap = data.chapter || data;
      console.log(`Created chapter 'Current Electricity' on live API with ID: ${targetChap.id}`);
    } else {
      targetChap = { id: 24, name: 'Current Electricity' };
    }
  } else {
    console.log(`Found existing chapter '${targetChap.name}' on edvedum.com with ID: ${targetChap.id}`);
  }

  console.log('\n=== Step 4: Checking Existing Questions on edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  const existingInChapter = existingQuestions.filter(q => 
    (targetChap.id && q.chapter_id === targetChap.id) || 
    (q.chapter && q.chapter.toLowerCase() === 'current electricity')
  );
  console.log(`Found ${existingInChapter.length} existing questions in chapter "${targetChap.name}" on edvedum.com.`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  console.log('\n=== Step 5: Uploading Batch 1 Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < CURRENT_ELEC_BATCH1_QUESTIONS.length; i++) {
    const q = CURRENT_ELEC_BATCH1_QUESTIONS[i];
    const key = q.question_text.trim().toLowerCase();
    if (existingTextSet.has(key)) {
      skipped++;
      console.log(`[${i + 1}/${CURRENT_ELEC_BATCH1_QUESTIONS.length}] Skipped existing: "${q.question_text.slice(0, 40)}..."`);
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: targetChap.id,
      chapter: 'Current Electricity',
      topic: q.topic || 'Current Electricity',
      question_type: 'single_choice',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      marks: 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      solution_image_url: ''
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

        if (uploadRes.ok) {
          const resData = await uploadRes.json();
          uploaded = true;
          inserted++;
          console.log(`[${i + 1}/${CURRENT_ELEC_BATCH1_QUESTIONS.length}] Uploaded: "${q.question_text.slice(0, 35)}..." (ID: ${resData.question?.id || 'OK'})`);
        } else {
          const errText = await uploadRes.text();
          console.warn(`[${i + 1}/${CURRENT_ELEC_BATCH1_QUESTIONS.length}] Upload failed (status ${uploadRes.status}): ${errText}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.warn(`[${i + 1}/${CURRENT_ELEC_BATCH1_QUESTIONS.length}] Error on upload: ${err.message}`);
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log(`\n🎉 Live Sync Complete! Inserted: ${inserted}, Skipped: ${skipped}, Total: ${CURRENT_ELEC_BATCH1_QUESTIONS.length}`);
}

syncToLive().catch(console.error);
