import fetch from 'node-fetch';
import { ALL_CHEMEQ_JEE_PYQ_QUESTIONS } from './chemeq_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncChemEqToLive() {
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

  // 1. Fetch live Chemistry subject and chapters
  console.log('Fetching live Chemistry subject and chapters...');
  const subRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = await subRes.json();
  const subjectsList = subs.subjects || subs || [];
  const chemSub = subjectsList.find(s => s.name?.toLowerCase() === 'chemistry');
  const subjectId = chemSub?.id || 6;

  const chRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const chaptersList = chData.chapters || chData || [];
  
  let chemeqCh = chaptersList.find(c => 
    c.name?.toLowerCase().includes('chemical equilibrium') || c.name?.toLowerCase() === 'chemical equilibrium'
  );
  let chapterId = chemeqCh?.id;
  let chapterName = chemeqCh?.name || 'Chemical Equilibrium';

  if (!chapterId) {
    console.log('Creating "Chemical Equilibrium" chapter on live under Chemistry...');
    const createChRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: chapterName })
    });
    const createdCh = await createChRes.json();
    chapterId = createdCh.id || createdCh.chapter?.id;
  }
  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId}, Name: ${chapterName}`);

  // 2. Fetch existing questions from live question bank
  console.log('Fetching existing questions from live question bank...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const allLiveQuestions = qbData.questions || [];
  console.log(`Current total live JEE Chemistry questions: ${allLiveQuestions.length}`);

  // 3. Clean up existing Chemical Equilibrium questions on live if any
  const existingChemEq = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('chemical equilibrium') || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingChemEq.length} existing Chemical Equilibrium questions on live server.`);

  if (existingChemEq.length > 0) {
    console.log(`Deleting ${existingChemEq.length} old Chemical Equilibrium questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingChemEq.length; i += DELETE_BATCH) {
      const chunk = existingChemEq.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Old questions deleted.');
  }

  // 4. Upload all 132 verified questions to live question-bank
  console.log(`Uploading ${ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length} clean questions to live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_CHEMEQ_JEE_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
    console.log(`Progress: ${successCount + failCount} / ${ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length} uploaded...`);
  }

  console.log(`Upload complete. Success: ${successCount}, Failures: ${failCount}`);

  // 5. Verification on Live VPS
  console.log('Verifying live questions count for Chemical Equilibrium...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&chapter_id=${chapterId}&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const liveQuestions = verifyData.questions || [];
  console.log(`Total live Chemical Equilibrium questions: ${liveQuestions.length} (Expected: 132)`);

  let dummyOptionsFound = 0;
  for (const lq of liveQuestions) {
    if (lq.question_type === 'mcq' && Array.isArray(lq.options)) {
      for (const opt of lq.options) {
        const txt = typeof opt === 'string' ? opt : opt.text;
        if (/^Option\s*\([A-D]\)$/i.test((txt || '').trim())) {
          dummyOptionsFound++;
        }
      }
    }
  }
  console.log(`Dummy options count on live: ${dummyOptionsFound} (Expected: 0)`);

  if (liveQuestions.length === 132 && dummyOptionsFound === 0) {
    console.log('STATUS: LIVE VPS SYNC 100% VERIFIED!');
  } else {
    console.warn('STATUS: Live VPS verification warning. Recheck counts.');
  }
}

syncChemEqToLive().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
