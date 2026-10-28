import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

async function run() {
  console.log('=== Step 1: Loading Extracted Questions for Chapter 8: Electromagnetic Waves ===');
  const allJsonPath = path.resolve(__dirname, 'extracted_chapters/ch8_electromagnetic_waves_all.json');
  if (!fs.existsSync(allJsonPath)) {
    throw new Error(`File ${allJsonPath} not found. Please run extract_ch8_em_waves.mjs first.`);
  }

  const rawQuestions = JSON.parse(fs.readFileSync(allJsonPath, 'utf-8'));
  console.log(`Loaded ${rawQuestions.length} extracted questions.`);

  console.log('\n=== Step 2: Seeding Chapter 8 Questions into Neon DB ===');
  // 1. Get Physics subject_id
  const subRes = await pool.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1");
  const subjectId = subRes.rows[0]?.id || 5;

  // 2. Ensure chapter exists
  let chapterId;
  const chapRes = await pool.query(
    "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'electromagnetic waves' LIMIT 1",
    [subjectId]
  );
  if (chapRes.rows.length === 0) {
    const insertChap = await pool.query(
      "INSERT INTO chapters (name, subject_id, position) VALUES ('Electromagnetic Waves', $1, 8) RETURNING id",
      [subjectId]
    );
    chapterId = insertChap.rows[0].id;
    console.log(`Created new chapter 'Electromagnetic Waves' in Neon DB with ID: ${chapterId}`);
  } else {
    chapterId = chapRes.rows[0].id;
    console.log(`Using existing chapter 'Electromagnetic Waves' in Neon DB with ID: ${chapterId}`);
  }

  let dbInserted = 0;
  let dbSkipped = 0;

  for (let i = 0; i < rawQuestions.length; i++) {
    const q = rawQuestions[i];
    const qText = q.question_text.trim();

    // Check duplicate
    const dupRes = await pool.query(
      `SELECT id FROM question_bank WHERE category = 'Physics' AND LOWER(TRIM(question_text)) = LOWER(TRIM($1))`,
      [qText]
    );

    if (dupRes.rows.length > 0) {
      dbSkipped++;
      continue;
    }

    const optionsJson = JSON.stringify(q.options || []);
    const correctIndicesJson = JSON.stringify([q.correct_index ?? 0]);

    await pool.query(
      `INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, topic,
        question_type, question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url, assertion_text, reason_text
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16
      )`,
      [
        'Physics',
        subjectId,
        chapterId,
        'Electromagnetic Waves',
        q.topic || 'Electromagnetic Waves',
        q.question_type || 'single_choice',
        qText,
        optionsJson,
        q.correct_index ?? 0,
        correctIndicesJson,
        q.marks || 4,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || null,
        q.assertion_text || null,
        q.reason_text || null
      ]
    );
    dbInserted++;
  }

  console.log(`Neon DB Seeding: Inserted ${dbInserted}, Skipped ${dbSkipped}. Total: ${rawQuestions.length}`);

  console.log('\n=== Step 3: Authenticating with Live edvedum.com API ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login to live edvedum failed: ${loginRes.status} ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Logged in successfully to edvedum.com as admin.');

  console.log('\n=== Step 4: Ensuring Chapter "Electromagnetic Waves" on edvedum.com ===');
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on live edvedum');
  const liveSubjectId = physicsSub.id;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === 'electromagnetic waves');

  if (!liveChap) {
    console.log("Chapter 'Electromagnetic Waves' not found on live edvedum. Creating it...");
    const createRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Electromagnetic Waves' })
    });
    const cData = await createRes.json();
    liveChap = cData.chapter || cData;
    console.log(`Created live chapter with ID: ${liveChap.id}`);
  } else {
    console.log(`Found existing live chapter: ${liveChap.name} (ID: ${liveChap.id})`);
  }

  console.log('\n=== Step 5: Syncing Questions to Live edvedum.com ===');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  console.log(`Found ${existingQuestions.length} existing Physics questions on live edvedum.`);

  const existingTextSet = new Set(
    existingQuestions.map(q => q.question_text.trim().toLowerCase())
  );

  let liveInserted = 0;
  let liveSkipped = 0;

  for (let i = 0; i < rawQuestions.length; i++) {
    const q = rawQuestions[i];
    const key = q.question_text.trim().toLowerCase();
    if (existingTextSet.has(key)) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Physics',
      subject_id: liveSubjectId,
      chapter_id: liveChap.id,
      chapter: 'Electromagnetic Waves',
      topic: q.topic || 'Electromagnetic Waves',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: q.options || [],
      correct_index: q.correct_index ?? 0,
      correct_indices: [q.correct_index ?? 0],
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: q.image_url || '',
      assertion_text: q.assertion_text || null,
      reason_text: q.reason_text || null
    };

    let retries = 3;
    let uploaded = false;
    while (retries > 0 && !uploaded) {
      try {
        const uploadRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!uploadRes.ok) {
          const errText = await uploadRes.text();
          console.error(`Failed to upload Q#${i + 1}: ${uploadRes.status} - ${errText}`);
          retries--;
          await new Promise(r => setTimeout(r, 1000));
        } else {
          liveInserted++;
          uploaded = true;
          if (liveInserted % 10 === 0 || liveInserted === rawQuestions.length) {
            console.log(`Live sync progress: ${liveInserted} questions uploaded...`);
          }
        }
      } catch (uploadErr) {
        retries--;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log(`\n🎉 Chapter 8 Live Sync Completed! Uploaded: ${liveInserted}, Skipped: ${liveSkipped}`);

  // Step 6: Verify final count on live
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const finalData = await finalRes.json();
  const emCount = (finalData.questions || []).filter(
    q => q.chapter?.toLowerCase() === 'electromagnetic waves'
  ).length;
  console.log(`Total Physics questions on live edvedum: ${finalData.questions?.length}`);
  console.log(`Total "Electromagnetic Waves" questions on live edvedum: ${emCount}`);

  await pool.end();
}

run().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
