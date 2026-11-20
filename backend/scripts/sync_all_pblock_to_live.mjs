import fetch from 'node-fetch';
import { ALL_PBLOCK_JEE_PYQ_QUESTIONS } from './pblock_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncPBlockToLive() {
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
  
  let pblockCh = chaptersList.find(c => 
    c.name?.toLowerCase().includes('p-block') && (c.name.includes('13') || c.name.includes('14'))
  );
  let chapterId = pblockCh?.id;
  let chapterName = pblockCh?.name || 'The p-Block Elements (Gr. 13 & 14)';

  if (!chapterId) {
    console.log('Creating "The p-Block Elements (Gr. 13 & 14)" chapter on live under Chemistry...');
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

  // 3. Clean up existing p-block questions on live if any
  const existingPBlock = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('p-block') || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingPBlock.length} existing p-block questions on live server.`);

  if (existingPBlock.length > 0) {
    console.log(`Deleting ${existingPBlock.length} old p-block questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingPBlock.length; i += DELETE_BATCH) {
      const chunk = existingPBlock.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Old questions deleted.');
  }

  // 4. Upload all 96 verified questions to live question-bank
  console.log(`Uploading ${ALL_PBLOCK_JEE_PYQ_QUESTIONS.length} clean questions to live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_PBLOCK_JEE_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_PBLOCK_JEE_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        solution: q.solution || '',
        exam_type: 'JEE',
        status: 'available'
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

        if (createRes.ok) {
          successCount++;
        } else {
          failCount++;
          const errBody = await createRes.text();
          console.error(`Failed to create Q${q.qNum} (${createRes.status}):`, errBody.slice(0, 150));
        }
      } catch (err) {
        failCount++;
        console.error(`Error uploading Q${q.qNum}:`, err.message);
      }
    }));
    process.stdout.write(`Uploaded ${Math.min(i + BATCH_SIZE, ALL_PBLOCK_JEE_PYQ_QUESTIONS.length)}/${ALL_PBLOCK_JEE_PYQ_QUESTIONS.length}...\r`);
  }

  console.log(`\nUpload complete! Success: ${successCount}, Failures: ${failCount}`);

  // 5. Verify on live VPS
  console.log('Verifying live questions on edvedum.com...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const livePBlockQuestions = (verifyData.questions || []).filter(q => 
    (q.chapter || '').toLowerCase().includes('p-block') || q.chapter_id === chapterId
  );

  console.log(`Total live verified p-block questions: ${livePBlockQuestions.length}`);
  
  let dummyCount = 0;
  let withDiagrams = 0;
  livePBlockQuestions.forEach(q => {
    if (q.image_url) withDiagrams++;
    if (Array.isArray(q.options)) {
      q.options.forEach(opt => {
        const text = typeof opt === 'string' ? opt : opt.text;
        if (/^option\s*[A-D]$/i.test(text?.trim())) dummyCount++;
      });
    }
  });

  console.log(`- Questions with diagrams: ${withDiagrams}`);
  console.log(`- Dummy options detected: ${dummyCount}`);

  if (livePBlockQuestions.length === 96 && dummyCount === 0) {
    console.log('[SUCCESS] All 96 p-Block questions successfully live on edvedum.com with zero errors!');
  } else {
    console.warn(`[WARNING] Expected 96 questions with 0 dummy options, got ${livePBlockQuestions.length} questions and ${dummyCount} dummy options.`);
  }
}

syncPBlockToLive().catch(console.error);
