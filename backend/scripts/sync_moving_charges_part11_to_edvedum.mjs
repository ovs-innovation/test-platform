import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { MOVING_CHARGES_BATCH11_QUESTIONS } from './seed_moving_charges_part11.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function syncToLive() {
  console.log(`=== Step 1: Preparing ${MOVING_CHARGES_BATCH11_QUESTIONS.length} Questions for Live edvedum.com Sync ===`);

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
  let targetChap = chaps.find(c => c.name.toLowerCase() === 'moving charges and magnetism');

  if (!targetChap) {
    throw new Error('Chapter "Moving Charges and Magnetism" not found on edvedum.com');
  }
  console.log(`Found existing chapter '${targetChap.name}' on edvedum.com with ID: ${targetChap.id}`);

  console.log('\n=== Step 4: Checking Existing Questions on edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];

  const existingInChapter = existingQuestions.filter(q => 
    (targetChap.id && q.chapter_id === targetChap.id) || 
    (q.chapter && q.chapter.toLowerCase() === 'moving charges and magnetism')
  );
  console.log(`Found ${existingInChapter.length} existing questions in chapter "${targetChap.name}" on edvedum.com.`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  console.log('\n=== Step 5: Uploading Batch 11 Questions to edvedum.com ===');
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < MOVING_CHARGES_BATCH11_QUESTIONS.length; i++) {
    const q = MOVING_CHARGES_BATCH11_QUESTIONS[i];
    const key = q.question_text.trim().toLowerCase();
    if (existingTextSet.has(key)) {
      skipped++;
      console.log(`[${i + 1}/${MOVING_CHARGES_BATCH11_QUESTIONS.length}] Skipped existing: "${q.question_text.slice(0, 40)}..."`);
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: physicsSubjectId,
      chapter_id: targetChap.id,
      chapter: 'Moving Charges and Magnetism',
      topic: q.topic || 'Moving Charges and Magnetism',
      question_type: q.question_type || 'single_choice',
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
          console.log(`[${i + 1}/${MOVING_CHARGES_BATCH11_QUESTIONS.length}] Uploaded: "${q.question_text.slice(0, 35)}..." (ID: ${resData.question?.id || 'OK'})`);
        } else {
          const errText = await uploadRes.text();
          console.warn(`[${i + 1}/${MOVING_CHARGES_BATCH11_QUESTIONS.length}] Upload failed (status ${uploadRes.status}): ${errText}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.warn(`[${i + 1}/${MOVING_CHARGES_BATCH11_QUESTIONS.length}] Error on upload: ${err.message}`);
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log('\n=== Live Sync Summary for Batch 11 ===');
  console.log(`Total questions in batch: ${MOVING_CHARGES_BATCH11_QUESTIONS.length}`);
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped: ${skipped}`);
}

syncToLive().catch(err => console.error('Fatal sync error:', err));
