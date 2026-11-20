import fetch from 'node-fetch';
import { ALL_GRAVITATION_JEE_PYQ_QUESTIONS } from './gravitation_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncGravitationToLive() {
  console.log('=== AUTHENTICATING WITH EDVEDUM.COM ===');
  let token = null;
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
    });
    if (!loginRes.ok) {
      const errTxt = await loginRes.text();
      throw new Error(`Login failed (${loginRes.status}): ${errTxt}`);
    }
    const data = await loginRes.json();
    token = data.token;
    console.log('Authentication successful.');
  } catch (err) {
    console.error('Failed to authenticate with live server:', err.message);
    process.exit(1);
  }

  // 1. Fetch live Physics subject and chapters
  console.log('Fetching live Physics subject and chapters...');
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = await subRes.json();
  const physics = (subs.subjects || subs || []).find(s => s.name?.toLowerCase() === 'physics');
  const subjectId = physics?.id || 5;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chaptersList = chData.chapters || chData || [];
  
  let gravitationCh = chaptersList.find(c => c.name?.toLowerCase() === 'gravitation');
  let chapterId = gravitationCh?.id;
  if (!chapterId) {
    console.log('Creating "Gravitation" chapter on live under Physics...');
    const createChRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Gravitation' })
    });
    const createdCh = await createChRes.json();
    chapterId = createdCh.id || createdCh.chapter?.id;
  }
  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}`);

  // 2. Fetch existing questions from live question bank
  console.log('Fetching existing questions from live question bank...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const allLiveQuestions = qbData.questions || [];
  console.log(`Current total live JEE Physics questions: ${allLiveQuestions.length}`);

  // 3. Clean up existing Gravitation questions on live
  const existingGrav = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch === 'gravitation' || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingGrav.length} existing Gravitation questions on live server.`);

  if (existingGrav.length > 0) {
    console.log(`Deleting ${existingGrav.length} old Gravitation questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingGrav.length; i += DELETE_BATCH) {
      const chunk = existingGrav.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
      ));
    }
    console.log('Cleanup of old Gravitation questions complete.');
  }

  // 4. Upload all 228 clean questions to live
  console.log(`\nUploading ${ALL_GRAVITATION_JEE_PYQ_QUESTIONS.length} clean Gravitation questions to live...`);
  let successCount = 0;
  let failCount = 0;

  const BATCH_SIZE = 5;
  for (let i = 0; i < ALL_GRAVITATION_JEE_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const chunk = ALL_GRAVITATION_JEE_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
    await Promise.all(chunk.map(async (q) => {
      const isNum = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);
      let optionsPayload;
      let correctIndexPayload;
      let correctIndicesPayload;
      let numericAnswerPayload;

      if (isNum) {
        optionsPayload = [];
        correctIndexPayload = null;
        correctIndicesPayload = [];
        numericAnswerPayload = Number(q.numeric_answer ?? 0);
      } else {
        optionsPayload = (q.options || []).map((t, optIdx) => ({
          id: ['A', 'B', 'C', 'D'][optIdx] || String(optIdx),
          text: String(t).trim(),
        }));
        correctIndexPayload = q.correct_option !== undefined && q.correct_option !== null ? Number(q.correct_option) : 0;
        correctIndicesPayload = [correctIndexPayload];
        numericAnswerPayload = null;
      }

      const body = {
        category: 'Physics',
        exam_type: 'JEE',
        subject: 'Physics',
        subject_id: subjectId,
        chapter: 'Gravitation',
        topic: 'Gravitation',
        chapter_id: chapterId,
        question_type: isNum ? 'numerical' : 'mcq',
        question_text: q.question,
        options: optionsPayload,
        correct_index: correctIndexPayload,
        correct_indices: correctIndicesPayload,
        numeric_answer: numericAnswerPayload,
        numerical_tolerance: 0,
        marks: q.marks || 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        image_url: q.image_url || null,
        solution_image_url: null,
        status: 'available',
      };

      try {
        let retries = 3;
        let created = false;
        while (retries > 0 && !created) {
          const createRes = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });

          if (createRes.ok) {
            created = true;
            successCount++;
          } else {
            retries--;
            if (retries === 0) {
              const errText = await createRes.text();
              console.error(`[FAIL] Q${q.qNum}: ${createRes.status} - ${errText.slice(0, 100)}`);
              failCount++;
            } else {
              await new Promise(r => setTimeout(r, 1000));
            }
          }
        }
      } catch (err) {
        console.error(`[ERR] Q${q.qNum}:`, err.message);
        failCount++;
      }
    }));
    process.stdout.write(`\rProgress: ${successCount + failCount}/${ALL_GRAVITATION_JEE_PYQ_QUESTIONS.length} uploaded...`);
  }

  console.log(`\n\nUpload Complete: ${successCount} succeeded, ${failCount} failed.`);

  // 5. Verify live database counts and dummy options
  console.log('\n=== VERIFYING FINAL LIVE DATABASE STATE ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const finalQuestions = verifyData.questions || [];
  console.log(`Final total JEE Physics questions on live: ${finalQuestions.length}`);

  const liveGravitation = finalQuestions.filter(q => (q.chapter || '').toLowerCase() === 'gravitation');
  console.log(`Live Gravitation questions count: ${liveGravitation.length}`);

  let liveDummyCount = 0;
  for (const q of liveGravitation) {
    for (const opt of (q.options || [])) {
      if (/^Option\s*\([A-D]\)$/i.test(opt.text?.trim())) {
        liveDummyCount++;
      }
    }
  }
  console.log(`Live Gravitation dummy options count: ${liveDummyCount}`);

  if (liveGravitation.length === 228 && liveDummyCount === 0) {
    console.log('>>> SUCCESS: ALL 228 GRAVITATION QUESTIONS SYNCED TO LIVE WITH ZERO DUMMY OPTIONS! <<<');
  } else {
    console.warn(`WARNING: Target was 228 questions with 0 dummy options, got ${liveGravitation.length} questions and ${liveDummyCount} dummy options.`);
  }
}

syncGravitationToLive().catch(console.error);
