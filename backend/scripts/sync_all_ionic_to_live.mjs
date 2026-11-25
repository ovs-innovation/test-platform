import { ALL_IONIC_JEE_PYQ_QUESTIONS } from './ionic_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncIonicToLive() {
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
  const chapterId = 13;
  const chapterName = 'Ionic Equilibrium';

  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: "${chapterName}"`);

  // 1. Fetch existing questions for JEE in this chapter
  console.log('Checking for any existing JEE questions in this chapter on Live...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter_id=${chapterId}&refresh=true&limit=500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const existingQuestions = qbData.questions || [];
  console.log(`Current existing questions on Live for "${chapterName}" (JEE): ${existingQuestions.length}`);

  if (existingQuestions.length > 0) {
    console.log(`Deleting ${existingQuestions.length} existing questions on Live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingQuestions.length; i += DELETE_BATCH) {
      const chunk = existingQuestions.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Existing questions deleted.');
  }

  // 2. Upload all 159 verified questions to Live question bank
  console.log(`Uploading ${ALL_IONIC_JEE_PYQ_QUESTIONS.length} clean questions to Live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_IONIC_JEE_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_IONIC_JEE_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        question_text: q.question_text || q.question,
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
          const errBody = await createRes.text();
          throw new Error(`HTTP ${createRes.status}: ${errBody}`);
        }
        successCount++;
      } catch (err) {
        console.error(`Failed to upload Q${q.qNum}:`, err.message);
        failCount++;
      }
    }));

    if ((i + BATCH_SIZE) % 25 === 0 || i + BATCH_SIZE >= ALL_IONIC_JEE_PYQ_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, ALL_IONIC_JEE_PYQ_QUESTIONS.length)}/${ALL_IONIC_JEE_PYQ_QUESTIONS.length} uploaded...`);
    }
  }

  console.log(`Upload completed. Success: ${successCount}, Failed: ${failCount}`);

  // 3. Final live verification
  console.log('Verifying Live Question Bank count...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter_id=${chapterId}&refresh=true&limit=500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveCount = (verifyData.questions || []).length;
  console.log(`Live Verified Total Questions in "${chapterName}" (JEE): ${liveCount}`);

  if (liveCount === ALL_IONIC_JEE_PYQ_QUESTIONS.length) {
    console.log('🎉 100% PERFECT MATCH! ALL 159 QUESTIONS LIVE ON EDVEDUM.COM 🎉');
  } else {
    console.warn(`Discrepancy: expected ${ALL_IONIC_JEE_PYQ_QUESTIONS.length}, found ${liveCount} on live.`);
  }
}

syncIonicToLive().catch(console.error);
