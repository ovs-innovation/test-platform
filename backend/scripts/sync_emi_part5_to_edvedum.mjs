import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { EMI_BATCH5_QUESTIONS } from './seed_emi_part5.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function syncToLive() {
  console.log(`=== Step 1: Preparing ${EMI_BATCH5_QUESTIONS.length} Questions for Live edvedum.com Sync ===`);

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
  let targetChap = chaps.find(c => c.name.toLowerCase() === 'electromagnetic induction');

  if (!targetChap) {
    throw new Error('Chapter "Electromagnetic Induction" not found on edvedum.com');
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
    (q.chapter && q.chapter.toLowerCase() === 'electromagnetic induction')
  );

  console.log(`Found ${existingInChapter.length} existing questions in 'Electromagnetic Induction' on edvedum.com.`);

  const existingTexts = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  let createdCount = 0;
  let skippedCount = 0;

  console.log('\n=== Step 5: Uploading Batch 5 Questions to edvedum.com ===');
  for (let i = 0; i < EMI_BATCH5_QUESTIONS.length; i++) {
    const q = EMI_BATCH5_QUESTIONS[i];
    const textKey = q.question_text.trim().toLowerCase();

    if (existingTexts.has(textKey)) {
      console.log(`[${i + 1}/${EMI_BATCH5_QUESTIONS.length}] Skipping already synced: ${q.question_text.slice(0, 50)}...`);
      skippedCount++;
      continue;
    }

    const payload = {
      subject_id: physicsSubjectId,
      chapter_id: targetChap.id,
      category: 'NEET',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: q.correct_indices,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || null,
      is_active: true
    };

    const postRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!postRes.ok) {
      console.error(`Failed to create question ${i + 1}:`, await postRes.text());
    } else {
      console.log(`[${i + 1}/${EMI_BATCH5_QUESTIONS.length}] Successfully created: ${q.question_text.slice(0, 50)}...`);
      createdCount++;
      existingTexts.add(textKey);
    }
  }

  console.log(`\n=== Batch 5 Live Sync Complete: ${createdCount} created, ${skippedCount} skipped ===`);
}

syncToLive().catch(err => {
  console.error("Live sync error:", err);
  process.exit(1);
});
