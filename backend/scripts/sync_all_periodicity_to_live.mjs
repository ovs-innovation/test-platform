import { ALL_PERIODICITY_QUESTIONS } from './periodicity_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncPeriodicityToLive() {
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
  const chapterId = 94;
  const chapterName = 'Classification of Elements and Periodicity in Properties';

  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: ${chapterName}`);

  // 1. Fetch existing questions for JEE in this chapter
  console.log('Checking for any existing JEE questions in this chapter on Live...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter=${encodeURIComponent(chapterName)}&refresh=true&limit=500`, {
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

  // 2. Upload all 193 verified questions to Live question bank
  console.log(`Uploading ${ALL_PERIODICITY_QUESTIONS.length} clean questions to Live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_PERIODICITY_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_PERIODICITY_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        marks: 4,
        negative_marks: 1,
        difficulty: q.difficulty || 'medium',
        image_url: q.image_url || null,
        solution_image_url: q.solution_image_url || null,
        solution: q.solution || '',
        exam_type: 'JEE',
        status: 'active'
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
          const errText = await postRes.text();
          console.error(`Failed to upload Q#${q.qNum}: ${postRes.status} - ${errText}`);
          failCount++;
        } else {
          successCount++;
        }
      } catch (postErr) {
        console.error(`Network error uploading Q#${q.qNum}:`, postErr.message);
        failCount++;
      }
    }));

    if ((i + BATCH_SIZE) % 25 === 0 || i + BATCH_SIZE >= ALL_PERIODICITY_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, ALL_PERIODICITY_QUESTIONS.length)}/${ALL_PERIODICITY_QUESTIONS.length} uploaded...`);
    }
  }

  console.log(`\nUpload complete. Success: ${successCount}, Failed: ${failCount}`);

  // 3. Verify Live count
  console.log('Verifying uploaded questions on Live server...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&chapter=${encodeURIComponent(chapterName)}&refresh=true&limit=500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const liveQs = verifyData.questions || [];
  console.log(`Verification: Live now has ${liveQs.length} questions for "${chapterName}" (JEE).`);

  if (liveQs.length === ALL_PERIODICITY_QUESTIONS.length) {
    console.log('ALL 193 QUESTIONS SUCCESSFULLY VERIFIED ON LIVE PRODUCTION SERVER!');
  } else {
    console.warn(`Warning: Expected ${ALL_PERIODICITY_QUESTIONS.length}, found ${liveQs.length}`);
  }
}

syncPeriodicityToLive().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
