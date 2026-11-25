import fetch from 'node-fetch';
import { ALL_BONDING_QUESTIONS } from './bonding_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncBondingToLive() {
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

  const subjectId = 6;
  const chapterId = 38;
  const chapterName = 'Chemical Bonding and Molecular Structure';

  console.log(`Target Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: "${chapterName}"`);

  // 1. Fetch all live Chemistry JEE questions to find ONLY existing Bonding questions
  console.log('Fetching all Chemistry JEE questions from Live to safely check existing Bonding questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const allLiveQuestions = qbData.questions || [];
  console.log(`Total live Chemistry JEE questions currently: ${allLiveQuestions.length}`);

  // CRITICAL SAFETY FILTER: Only target questions belonging to Chemical Bonding
  const existingBondingQuestions = allLiveQuestions.filter(q => 
    q.chapter_id === 12 || q.chapter_id === 38 ||
    /chemical bonding/i.test(q.chapter || '') || /chemical bonding/i.test(q.chapter_name || '')
  );

  console.log(`Current existing questions on Live for Chemical Bonding: ${existingBondingQuestions.length}`);

  if (existingBondingQuestions.length > 0) {
    console.log(`Deleting ${existingBondingQuestions.length} existing Chemical Bonding questions on Live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingBondingQuestions.length; i += DELETE_BATCH) {
      const chunk = existingBondingQuestions.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Existing Chemical Bonding questions deleted.');
  }

  // 2. Upload all 314 verified questions to Live question bank
  console.log(`Uploading ${ALL_BONDING_QUESTIONS.length} clean Chemical Bonding questions to Live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_BONDING_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_BONDING_QUESTIONS.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const isNum = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);

      let optionsPayload;
      let correctIndexPayload;
      let correctIndicesPayload;
      let numericAnswerPayload;

      if (isNum) {
        optionsPayload = [];
        correctIndexPayload = null;
        correctIndicesPayload = [];
        numericAnswerPayload = Number(q.numeric_answer);
      } else {
        optionsPayload = (q.options || []).map((t, idx) => ({
          id: ['A', 'B', 'C', 'D'][idx] || String(idx),
          text: String(t).trim()
        }));
        correctIndexPayload = q.correct_option !== undefined && q.correct_option !== null ? Number(q.correct_option) : 0;
        correctIndicesPayload = [correctIndexPayload];
        numericAnswerPayload = null;
      }

      const payload = {
        category: 'Chemistry',
        subject: 'Chemistry',
        subject_id: subjectId,
        chapter: chapterName,
        chapter_id: chapterId,
        topic: chapterName,
        question_type: isNum ? 'numerical' : 'mcq',
        question_text: q.question,
        options: optionsPayload,
        correct_index: correctIndexPayload,
        correct_indices: correctIndicesPayload,
        numeric_answer: numericAnswerPayload,
        numerical_tolerance: 0,
        marks: q.marks || 4,
        negative_marks: isNum ? 0 : 1,
        difficulty: q.difficulty || 'medium',
        image_url: q.image_url || null,
        solution_image_url: q.solution_image_url || null,
        solution: q.solution || null,
        exam_type: 'JEE',
        status: 'active'
      };

      try {
        const createRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!createRes.ok) {
          const errTxt = await createRes.text();
          console.error(`Failed to create Q${q.qNum}: (${createRes.status}) ${errTxt}`);
          failCount++;
        } else {
          successCount++;
        }
      } catch (postErr) {
        console.error(`Network error on Q${q.qNum}:`, postErr.message);
        failCount++;
      }
    }));

    if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= ALL_BONDING_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, ALL_BONDING_QUESTIONS.length)}/${ALL_BONDING_QUESTIONS.length} uploaded...`);
    }
  }

  console.log(`Upload complete. Success: ${successCount}, Failed: ${failCount}`);

  // 3. Post-sync verification
  console.log('=== VERIFYING FINAL LIVE STATE ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  console.log(`Total live Chemistry JEE questions after sync: ${verifyQuestions.length}`);

  const breakdown = {};
  for (const q of verifyQuestions) {
    const k = `${q.chapter_id} - ${q.chapter}`;
    breakdown[k] = (breakdown[k] || 0) + 1;
  }
  console.table(breakdown);

  const bondingLiveCount = verifyQuestions.filter(q => 
    q.chapter_id === chapterId || q.chapter_id === 12 ||
    /chemical bonding/i.test(q.chapter || '') || /chemical bonding/i.test(q.chapter_name || '')
  ).length;

  console.log(`Live Chemical Bonding questions count: ${bondingLiveCount} (Expected: 314)`);

  if (bondingLiveCount === 314 && verifyQuestions.length === 1436) {
    console.log(' PERFECT: All 314 questions successfully synced to live server with total = 1,436 questions!');
  } else {
    console.warn(` Notice: count check: bonding=${bondingLiveCount}, total=${verifyQuestions.length}`);
  }
}

syncBondingToLive().catch(console.error);
