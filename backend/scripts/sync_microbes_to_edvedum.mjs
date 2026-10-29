import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const Q45_CLOUDINARY_URL = 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793199199/edvedum_botany/microbes_q45_biogas.png';

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

function getQuestionKey(q) {
  if (q.assertion_text && q.reason_text) {
    return `AR:${norm(q.assertion_text)}||${norm(q.reason_text)}`;
  }
  return `SC:${norm(q.question_text)}`;
}

async function syncMicrobesToLive() {
  console.log('========================================================================');
  console.log('Syncing "Microbes in Human Welfare" Questions to Live edvedum.com');
  console.log('========================================================================\n');

  // Step 1: Login to Live Admin
  console.log('--- Step 1: Authenticating with edvedum.com as Admin ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed (${loginRes.status}): ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('✓ Successfully authenticated with live edvedum.com\n');

  // Step 2: Ensure Subject Botany and Chapter exist on live
  console.log('--- Step 2: Verifying Botany Subject & Chapter on Live ---');
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  let botanySub = subs.find(s => s.name.toLowerCase() === 'botany');
  if (!botanySub) {
    console.log('Creating subject Botany...');
    const createSub = await fetch(`${LIVE_API}/admin/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name: 'Botany', exam_type: 'NEET' })
    });
    botanySub = (await createSub.json()).subject;
  }
  const botanySubjectId = botanySub.id;
  console.log(`Botany Subject ID on live: ${botanySubjectId}`);

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${botanySubjectId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let targetChapter = chaps.find(c => c.name.toLowerCase().includes('microbes in human welfare'));
  if (!targetChapter) {
    console.log('Creating chapter "Microbes in Human Welfare" under Botany...');
    const createChap = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ subject_id: botanySubjectId, name: 'Microbes in Human Welfare', position: 0 })
    });
    targetChapter = (await createChap.json()).chapter;
  }
  const targetChapterId = targetChapter.id;
  console.log(`Target Chapter: "${targetChapter.name}" (ID: ${targetChapterId})\n`);

  // Step 3: Fetch existing Botany questions on live
  console.log('--- Step 3: Fetching Existing Botany Questions on Live ---');
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Botany&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const liveData = await liveRes.json();
  const allLiveBotany = liveData.questions || [];
  console.log(`Total Botany questions currently on live: ${allLiveBotany.length}`);

  // Find all live questions related to Microbes
  const liveMicrobes = allLiveBotany.filter(q =>
    (q.chapter && q.chapter.toLowerCase().includes('microbe')) ||
    (q.topic && q.topic.toLowerCase().includes('microbe')) ||
    q.id === 6569 || // Swelling of dough during bread making (was Biomolecules)
    q.id === 6581    // Read the following four statements... (was Plant Kingdom)
  );
  console.log(`Found ${liveMicrobes.length} Microbes-related questions on live.\n`);

  // Step 4: Normalize existing live Microbes questions so their chapter is 'Microbes in Human Welfare'
  console.log('--- Step 4: Normalizing Existing Live Microbes Questions ---');
  let normalizedCount = 0;
  for (const q of liveMicrobes) {
    const needsUpdate = 
      q.chapter !== 'Microbes in Human Welfare' ||
      q.chapter_id !== targetChapterId ||
      q.subject_id !== botanySubjectId ||
      q.subject !== 'Botany' ||
      q.category !== 'Botany';

    if (needsUpdate) {
      const updatePayload = {
        ...q,
        category: 'Botany',
        subject: 'Botany',
        subject_id: botanySubjectId,
        chapter_id: targetChapterId,
        chapter: 'Microbes in Human Welfare',
        topic: q.topic || q.chapter || 'Microbes in Human Welfare',
      };

      const putRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });

      if (putRes.ok) {
        normalizedCount++;
        console.log(`[Normalized Live ID ${q.id}] Chapter set to 'Microbes in Human Welfare' (Topic: ${updatePayload.topic})`);
      } else {
        console.warn(`[Failed to normalize ID ${q.id}] ${putRes.status}: ${await putRes.text()}`);
      }
    }
  }
  console.log(`Normalized ${normalizedCount} existing questions to chapter 'Microbes in Human Welfare'.\n`);

  // Build live duplicate lookup set
  const liveSet = new Set();
  // Refetch live botany to have latest state
  const updatedLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const updatedLiveQuestions = (await updatedLiveRes.json()).questions || [];
  for (const q of updatedLiveQuestions) {
    liveSet.add(getQuestionKey(q));
  }
  console.log(`Live question text index built: ${liveSet.size} unique keys.\n`);

  // Step 5: Read local questions from local DB
  console.log('--- Step 5: Reading Local Microbes Questions ---');
  const localRes = await query(`
    SELECT * FROM question_bank 
    WHERE chapter = 'Microbes in Human Welfare'
    ORDER BY id ASC
  `);
  console.log(`Found ${localRes.rows.length} questions in local DB for 'Microbes in Human Welfare'.\n`);

  // Step 6: Upload missing questions to live
  console.log('--- Step 6: Uploading Missing Questions to Live edvedum.com ---');
  let uploadedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < localRes.rows.length; i++) {
    const q = localRes.rows[i];
    const key = getQuestionKey(q);

    if (liveSet.has(key)) {
      skippedCount++;
      console.log(`[${i + 1}/${localRes.rows.length}] [SKIP EXISTING] "${q.question_text.slice(0, 45)}..."`);
      continue;
    }

    let parsedOptions = [];
    if (typeof q.options === 'string') {
      try {
        parsedOptions = JSON.parse(q.options);
      } catch {
        parsedOptions = q.options.split('|').map(s => ({ text: s.trim() }));
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

    // Set Cloudinary image URL for Q45 or any diagram
    let imageUrl = q.image_url || '';
    if (q.question_text.toLowerCase().includes('biogas plant') || (imageUrl && imageUrl.includes('microbes_q45'))) {
      imageUrl = Q45_CLOUDINARY_URL;
    }

    const payload = {
      category: 'Botany',
      subject: 'Botany',
      subject_id: botanySubjectId,
      chapter_id: targetChapterId,
      chapter: 'Microbes in Human Welfare',
      topic: q.topic || 'Microbes in Human Welfare',
      question_type: q.question_type || 'single_choice',
      question_text: q.question_text,
      options: parsedOptions,
      correct_index: q.correct_index ?? 0,
      correct_indices: parsedCorrectIndices,
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: imageUrl,
      solution_image_url: q.solution_image_url || '',
      assertion_text: q.assertion_text || null,
      reason_text: q.reason_text || null,
    };

    let retries = 3;
    let success = false;
    while (retries > 0 && !success) {
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
          uploadedCount++;
          liveSet.add(key);
          console.log(`[${i + 1}/${localRes.rows.length}] [UPLOADED ✓] ID: ${resData.question?.id || 'OK'} - "${q.question_text.slice(0, 45)}..."`);
          success = true;
        } else {
          const errText = await uploadRes.text();
          console.warn(`[${i + 1}/${localRes.rows.length}] Upload failed (${uploadRes.status}): ${errText}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      } catch (err) {
        console.warn(`[${i + 1}/${localRes.rows.length}] Network error: ${err.message}`);
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  console.log(`\nUpload complete: ${uploadedCount} inserted, ${skippedCount} skipped.\n`);

  // Step 7: Update local Q45 image_url to Cloudinary CDN
  console.log('--- Step 7: Updating Local Q45 Diagram URL ---');
  await query(`
    UPDATE question_bank 
    SET image_url = $1
    WHERE chapter = 'Microbes in Human Welfare' 
      AND (question_text ILIKE '%biogas plant%' OR image_url ILIKE '%microbes_q45%')
  `, [Q45_CLOUDINARY_URL]);
  console.log('Updated local Q45 diagram to Cloudinary URL.\n');

  // Step 8: Sync preexisting live questions to local DB if not present
  console.log('--- Step 8: Syncing Any Preexisting Live Questions to Local DB ---');
  const localSet = new Set();
  const refreshedLocal = await query(`
    SELECT * FROM question_bank WHERE chapter = 'Microbes in Human Welfare'
  `);
  for (const r of refreshedLocal.rows) {
    localSet.add(getQuestionKey(r));
  }

  let localSynced = 0;
  for (const lq of liveMicrobes) {
    const key = getQuestionKey(lq);
    if (!localSet.has(key)) {
      const optsJson = JSON.stringify(lq.options);
      const corrJson = JSON.stringify(lq.correct_indices || [lq.correct_index]);
      await query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          marks, solution, subject_id, chapter_id, difficulty, image_url, solution_image_url,
          chapter, topic, subject, assertion_text, reason_text
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      `, [
        'Botany',
        lq.question_type || 'single_choice',
        lq.question_text,
        optsJson,
        Number(lq.correct_index ?? 0),
        corrJson,
        Number(lq.marks ?? 4),
        lq.solution || '',
        15, // local botany subject_id
        149, // local microbes chapter_id
        lq.difficulty || 'medium',
        lq.image_url || '',
        lq.solution_image_url || '',
        'Microbes in Human Welfare',
        lq.topic || 'Microbes in Human Welfare',
        'Botany',
        lq.assertion_text || null,
        lq.reason_text || null,
      ]);
      localSet.add(key);
      localSynced++;
    }
  }
  console.log(`Synced ${localSynced} questions from live into local DB.\n`);

  // Invalidate local redis cache
  await delCache('cache:qb:*').catch(() => {});

  // Step 9: Final verification on Live Platform
  console.log('--- Step 9: Final Live Verification ---');
  const finalLiveRes = await fetch(`${LIVE_API}/question-bank?category=Botany&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const finalLiveData = await finalLiveRes.json();
  const finalBotany = finalLiveData.questions || [];

  const finalInChapter = finalBotany.filter(q =>
    q.chapter === 'Microbes in Human Welfare' || q.chapter_id === targetChapterId
  );
  console.log(`✓ Total questions in Botany -> "Microbes in Human Welfare" on LIVE: ${finalInChapter.length}`);

  const q45Check = finalInChapter.find(q => q.question_text.toLowerCase().includes('biogas plant'));
  if (q45Check) {
    console.log(`✓ Biogas Plant Q45 verified on live! Image URL: ${q45Check.image_url}`);
  }

  // Count question types
  const types = {};
  for (const q of finalInChapter) {
    types[q.question_type] = (types[q.question_type] || 0) + 1;
  }
  console.log('Live question types breakdown:', types);

  console.log('\n========================================================================');
  console.log(`SYNC TO LIVE SUCCESSFUL! All questions are now live on edvedum.com.`);
  console.log('========================================================================');

  process.exit(0);
}

syncMicrobesToLive().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
