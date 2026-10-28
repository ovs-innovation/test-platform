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

async function queryWithRetry(sql, params = [], maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await pool.query(sql, params);
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB transient error: ${err.message}] Retrying query in 1.5s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 1500));
      } else {
        throw err;
      }
    }
  }
}

export async function seedAndSyncChapter({ chapterName, jsonFile, position = 1 }) {
  console.log(`\n======================================================`);
  console.log(`=== SYNCING CHAPTER: "${chapterName}" ===`);
  console.log(`======================================================`);

  const allJsonPath = path.resolve(__dirname, 'extracted_chapters', jsonFile);
  if (!fs.existsSync(allJsonPath)) {
    throw new Error(`File ${allJsonPath} not found.`);
  }

  const rawQuestions = JSON.parse(fs.readFileSync(allJsonPath, 'utf-8'));
  console.log(`Loaded ${rawQuestions.length} extracted questions from ${jsonFile}.`);

  console.log('\n--- Step 1: Seeding Questions into Neon Database ---');
  const subRes = await queryWithRetry("SELECT id FROM subjects WHERE LOWER(name) = 'physics' LIMIT 1");
  const subjectId = subRes.rows[0]?.id || 5;

  let chapterId;
  const chapRes = await queryWithRetry(
    "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = LOWER(TRIM($2)) LIMIT 1",
    [subjectId, chapterName]
  );
  if (chapRes.rows.length === 0) {
    const insertChap = await queryWithRetry(
      "INSERT INTO chapters (name, subject_id, position) VALUES ($1, $2, $3) RETURNING id",
      [chapterName, subjectId, position]
    );
    chapterId = insertChap.rows[0].id;
    console.log(`Created new chapter '${chapterName}' in Neon DB with ID: ${chapterId}`);
  } else {
    chapterId = chapRes.rows[0].id;
    console.log(`Using existing chapter '${chapterName}' in Neon DB with ID: ${chapterId}`);
  }

  let dbInserted = 0;
  let dbSkipped = 0;

  for (let i = 0; i < rawQuestions.length; i++) {
    const q = rawQuestions[i];
    const qText = q.question_text.trim();

    const dupRes = await queryWithRetry(
      `SELECT id FROM question_bank WHERE category = 'Physics' AND LOWER(TRIM(question_text)) = LOWER(TRIM($1))`,
      [qText]
    );

    if (dupRes.rows.length > 0) {
      dbSkipped++;
      continue;
    }

    const optionsJson = JSON.stringify(q.options || []);
    const correctIndicesJson = JSON.stringify([q.correct_index ?? 0]);

    let normalizedType = (q.question_type || 'single_choice').toLowerCase().trim();
    if (normalizedType === 'mcq' || normalizedType === 'multiple_choice' || normalizedType === 'single_choice') {
      normalizedType = 'single_choice';
    } else if (normalizedType === 'assertion_reason' || normalizedType.includes('assertion')) {
      normalizedType = 'assertion_reason';
    } else {
      normalizedType = 'single_choice';
    }

    await queryWithRetry(
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
        chapterName,
        q.topic || chapterName,
        normalizedType,
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
  console.log(`Neon DB: Inserted ${dbInserted}, Skipped ${dbSkipped}. Total in source: ${rawQuestions.length}`);

  console.log('\n--- Step 2: Authenticating with Live edvedum.com ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login to live edvedum failed: ${loginRes.status} ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;

  console.log(`\n--- Step 3: Checking Live Chapter "${chapterName}" ---`);
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
  let liveChap = chaps.find(c => c.name.toLowerCase() === chapterName.toLowerCase());

  if (!liveChap) {
    console.log(`Creating chapter '${chapterName}' on live edvedum...`);
    const createRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: chapterName, position })
    });
    const cData = await createRes.json();
    liveChap = cData.chapter || cData;
    console.log(`Created live chapter with ID: ${liveChap.id}`);
  } else {
    console.log(`Found live chapter: ${liveChap.name} (ID: ${liveChap.id})`);
  }

  console.log('\n--- Step 4: Syncing Questions to Live edvedum.com ---');
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
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

    let liveNormType = (q.question_type || 'single_choice').toLowerCase().trim();
    if (liveNormType === 'mcq' || liveNormType === 'multiple_choice' || liveNormType === 'single_choice') {
      liveNormType = 'single_choice';
    } else if (liveNormType === 'assertion_reason' || liveNormType.includes('assertion')) {
      liveNormType = 'assertion_reason';
    } else {
      liveNormType = 'single_choice';
    }

    const payload = {
      category: 'Physics',
      subject_id: liveSubjectId,
      chapter_id: liveChap.id,
      chapter: chapterName,
      topic: q.topic || chapterName,
      question_type: liveNormType,
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
            console.log(`[${liveInserted}/${rawQuestions.length}] Uploaded to live...`);
          }
        }
      } catch (uploadErr) {
        retries--;
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  console.log(`\n🎉 Sync Completed for "${chapterName}"! Live Uploaded: ${liveInserted}, Skipped: ${liveSkipped}`);

  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const verifyData = await verifyRes.json();
  const countInChap = (verifyData.questions || []).filter(
    q => q.chapter?.toLowerCase() === chapterName.toLowerCase()
  ).length;
  console.log(`Verified on Live Website: ${countInChap} questions in "${chapterName}".`);
  console.log(`Total Physics questions now on live website: ${verifyData.questions?.length}`);
}

// CLI runner if invoked directly
if (process.argv[1] && process.argv[1].endsWith('seed_and_sync_chapter.mjs')) {
  const args = process.argv.slice(2);
  let chapterName = '';
  let jsonFile = '';
  let position = 1;
  for (const arg of args) {
    if (arg.startsWith('--chapter=')) chapterName = arg.split('=')[1];
    if (arg.startsWith('--file=')) jsonFile = arg.split('=')[1];
    if (arg.startsWith('--position=')) position = parseInt(arg.split('=')[1], 10);
  }

  if (!chapterName || !jsonFile) {
    console.error('Usage: node seed_and_sync_chapter.mjs --chapter="Name" --file="filename.json" [--position=8]');
    process.exit(1);
  }

  seedAndSyncChapter({ chapterName, jsonFile, position })
    .then(() => pool.end())
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
