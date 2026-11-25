import { ALL_REDOX_JEE_PYQ_QUESTIONS } from './redox_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncRedoxToLive() {
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
  const chapterId = 185;
  const chapterName = 'Redox Reactions';

  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: ${chapterName}`);

  // 1. Fetch existing questions from live question bank
  console.log('Fetching existing questions from live question bank...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const allLiveQuestions = qbData.questions || [];
  console.log(`Current total live JEE Chemistry questions: ${allLiveQuestions.length}`);

  // 2. Clean up existing Redox Reactions questions on live if any
  const existingRedox = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').trim().toLowerCase();
    return ch.includes('redox') || q.chapter_id === 185 || q.chapter_id === 40;
  });
  console.log(`Found ${existingRedox.length} existing Redox Reactions questions on live server.`);

  if (existingRedox.length > 0) {
    console.log(`Deleting ${existingRedox.length} old Redox Reactions questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingRedox.length; i += DELETE_BATCH) {
      const chunk = existingRedox.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Old questions deleted.');
  }

  // 3. Upload all 76 verified questions to live question-bank with chapter_id: 185
  console.log(`Uploading ${ALL_REDOX_JEE_PYQ_QUESTIONS.length} clean questions to live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_REDOX_JEE_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_REDOX_JEE_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        difficulty: q.difficulty || 'medium',
        image_url: q.image_url || null,
        solution_image_url: q.solution_image_url || null,
        solution: q.solution || '',
        exam_type: 'JEE',
        status: 'available'
      };

      try {
        const postRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!postRes.ok) {
          const errTxt = await postRes.text();
          console.error(`Error uploading Q#${q.qNum}:`, errTxt.slice(0, 150));
          failCount++;
        } else {
          successCount++;
        }
      } catch (postErr) {
        console.error(`Exception uploading Q#${q.qNum}:`, postErr.message);
        failCount++;
      }
    }));
    console.log(`Progress: ${successCount + failCount} / ${ALL_REDOX_JEE_PYQ_QUESTIONS.length} uploaded...`);
  }

  console.log(`Upload complete. Success: ${successCount}, Failures: ${failCount}`);

  // 4. Verification on Live VPS
  console.log('Verifying live questions count for Redox Reactions...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&chapter_id=${chapterId}&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const finalLiveQuestions = (verifyData.questions || []).filter(q => q.chapter_id === chapterId || (q.chapter || '').trim().toLowerCase() === 'redox reactions');
  console.log(`=== LIVE VERIFICATION RESULT ===`);
  console.log(`Total Redox Reactions questions on live VPS: ${finalLiveQuestions.length}`);

  const liveMcqs = finalLiveQuestions.filter(q => q.question_type === 'mcq');
  const liveNums = finalLiveQuestions.filter(q => q.question_type === 'numerical');
  console.log(`Breakdown on Live VPS: MCQs: ${liveMcqs.length}, Numericals: ${liveNums.length}`);

  // Check dummy options
  let dummyCount = 0;
  for (const q of finalLiveQuestions) {
    if (Array.isArray(q.options)) {
      for (const opt of q.options) {
        const t = typeof opt === 'string' ? opt : (opt.text || '');
        if (/Option \([ABCD]\)/i.test(t)) {
          dummyCount++;
        }
      }
    }
  }
  console.log(`Dummy options count on live VPS: ${dummyCount}`);
  
  if (finalLiveQuestions.length === ALL_REDOX_JEE_PYQ_QUESTIONS.length && dummyCount === 0) {
    console.log('SUCCESS: All 76 questions perfectly synced to Live VPS with 0 dummy options and Chapter ID 185!');
  } else {
    console.warn(`WARNING: Expected ${ALL_REDOX_JEE_PYQ_QUESTIONS.length} questions, got ${finalLiveQuestions.length}.`);
  }
}

syncRedoxToLive().catch(err => {
  console.error('Error syncing to Live VPS:', err);
  process.exit(1);
});
