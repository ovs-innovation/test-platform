import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function syncOscillationsToLive() {
  console.log('========================================================================');
  console.log('Step 1: Uploading all 41 Oscillations Diagrams to Cloudinary');
  console.log('========================================================================');

  const localDir = path.resolve(__dirname, '../uploads/oscillations');
  const files = fs.readdirSync(localDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} diagram files in ${localDir}`);

  const cloudinaryMap = new Map(); // e.g. '/uploads/oscillations/osc_q94.png' -> secure_url

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(localDir, file);
    const publicId = path.basename(file, '.png');

    try {
      const uploadRes = await uploadImageToCloudinary(fullPath, {
        folder: 'edvedum_oscillations',
        public_id: publicId,
        overwrite: true
      });
      const secureUrl = uploadRes.secure_url;
      cloudinaryMap.set(`/uploads/oscillations/${file}`, secureUrl);
      cloudinaryMap.set(`uploads/oscillations/${file}`, secureUrl);
      console.log(`[${i + 1}/${files.length}] Uploaded ${file} -> ${secureUrl}`);
    } catch (err) {
      console.error(`Failed to upload ${file} to Cloudinary:`, err.message);
    }
  }

  console.log('\n========================================================================');
  console.log('Step 2: Updating image_url in Neon DB with Cloudinary URLs');
  console.log('========================================================================');

  for (const [localUrl, cloudUrl] of cloudinaryMap.entries()) {
    await pool.query(`
      UPDATE question_bank 
      SET image_url = $1 
      WHERE image_url = $2 AND (chapter = 'Oscillations' OR chapter = 'Oscillation')
    `, [cloudUrl, localUrl]);
  }
  console.log('Neon DB updated with Cloudinary URLs.');

  console.log('\n========================================================================');
  console.log('Step 3: Loading all Oscillations Questions from Neon DB');
  console.log('========================================================================');

  const res = await pool.query(`
    SELECT * 
    FROM question_bank 
    WHERE category = 'Physics' AND (chapter = 'Oscillations' OR chapter = 'Oscillation')
    ORDER BY id ASC
  `);
  console.log(`Loaded ${res.rows.length} Oscillations questions from Neon DB.`);

  console.log('\n========================================================================');
  console.log('Step 4: Authenticating with Live edvedum.com API');
  console.log('========================================================================');

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

  // Find live subject and chapter
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on live edvedum.com');
  const liveSubjectId = physicsSub.id;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === 'oscillations' || c.name.toLowerCase() === 'oscillation');

  if (!liveChap) {
    console.log("Chapter 'Oscillations' not found on live. Creating it...");
    const createRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Oscillations' })
    });
    const cData = await createRes.json();
    liveChap = cData.chapter || cData;
  }
  console.log(`Target Live Subject: ${physicsSub.name} (ID: ${liveSubjectId})`);
  console.log(`Target Live Chapter: ${liveChap.name} (ID: ${liveChap.id})`);

  console.log('\n========================================================================');
  console.log('Step 5: Checking Existing Questions on edvedum.com');
  console.log('========================================================================');

  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || (Array.isArray(existingData) ? existingData : []);
  const existingInChapter = existingQuestions.filter(q => 
    q.chapter_id === liveChap.id || 
    (q.chapter && q.chapter.toLowerCase() === 'oscillations') ||
    (q.chapter && q.chapter.toLowerCase() === 'oscillation')
  );
  console.log(`Found ${existingInChapter.length} existing Oscillations questions on live edvedum.com.`);

  const existingTextSet = new Set(
    existingInChapter.map(q => q.question_text.trim().toLowerCase())
  );

  console.log('\n========================================================================');
  console.log('Step 6: Syncing Questions to Live edvedum.com');
  console.log('========================================================================');

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < res.rows.length; i++) {
    const q = res.rows[i];
    const key = q.question_text.trim().toLowerCase();

    if (existingTextSet.has(key)) {
      skipped++;
      console.log(`[${i + 1}/${res.rows.length}] Already exists on live: "${q.question_text.slice(0, 45)}..."`);
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

    // Replace image_url with Cloudinary URL if it was a local path
    let imageUrl = q.image_url || '';
    if (imageUrl && cloudinaryMap.has(imageUrl)) {
      imageUrl = cloudinaryMap.get(imageUrl);
    }

    const payload = {
      category: 'Physics',
      subject: 'Physics',
      subject_id: liveSubjectId,
      chapter_id: liveChap.id,
      chapter: 'Oscillations',
      topic: 'Oscillations',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: parsedOptions,
      correct_index: q.correct_index ?? 0,
      correct_indices: parsedCorrectIndices,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: imageUrl,
      status: 'normal'
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
          console.log(`[${i + 1}/${res.rows.length}] Uploaded: "${q.question_text.slice(0, 45)}..." (ID: ${resData.id || resData.question?.id})`);
          uploaded = true;
        }
      } catch (err) {
        console.error(`Network error on Q#${i + 1}:`, err.message);
        retries--;
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  console.log('\n========================================================================');
  console.log('Step 7: Verification on Live edvedum.com');
  console.log('========================================================================');
  console.log(`Total questions in batch: ${res.rows.length}`);
  console.log(`Successfully uploaded: ${inserted}`);
  console.log(`Skipped (already exists): ${skipped}`);

  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || (Array.isArray(verifyData) ? verifyData : []);
  const oscLive = verifyQuestions.filter(q => 
    q.chapter_id === liveChap.id ||
    (q.chapter && q.chapter.toLowerCase() === 'oscillations') ||
    (q.chapter && q.chapter.toLowerCase() === 'oscillation')
  );

  console.log(`\nVerified on live edvedum.com: ${oscLive.length} questions in chapter "Oscillations"!`);
  const liveWithImages = oscLive.filter(q => q.image_url);
  console.log(`Oscillations questions with diagram on live: ${liveWithImages.length}`);

  await pool.end();
}

syncOscillationsToLive().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
