import { ALL_MOTION1D_PYQ_QUESTIONS } from './motion1d_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncToLive() {
  console.log('=== AUTHENTICATING WITH EDVEDUM.COM ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed (${loginRes.status}): ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();
  console.log('Authentication successful.');

  // 1. Fetch live Physics subject and chapters
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
  
  let motion1dCh = chaptersList.find(c => 
    c.name?.toLowerCase().includes('motion in one') || 
    c.name?.toLowerCase().includes('straight line') ||
    c.name?.toLowerCase().includes('motion 1d')
  );
  let motion1dChapterId = motion1dCh?.id;
  if (!motion1dChapterId) {
    console.log('Creating "Motion in one Dimension" chapter on live...');
    const createChRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Motion in one Dimension' })
    });
    const createdCh = await createChRes.json();
    motion1dChapterId = createdCh.id || createdCh.chapter?.id;
  }
  console.log(`Resolved Live Subject ID: ${subjectId}, Motion 1D Chapter ID: ${motion1dChapterId}`);

  // 2. Fetch all live questions in JEE Physics
  console.log('Fetching existing questions from live question bank...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const allLiveQuestions = qbData.questions || [];
  console.log(`Total live JEE Physics questions: ${allLiveQuestions.length}`);

  // 3. Fix Laws of Motion Q49 on live if dummy options exist
  const lomQ49 = allLiveQuestions.find(q => 
    (q.chapter?.toLowerCase().includes('law') || q.chapter?.toLowerCase().includes('motion')) &&
    q.question_text?.includes('viscous medium under gravity')
  );
  if (lomQ49) {
    console.log(`Found live LOM Q49 (ID: ${lomQ49.id}). Updating options to Graph (A..D)...`);
    const newLomOpts = [
      { id: 'A', text: 'Graph (A)' },
      { id: 'B', text: 'Graph (B)' },
      { id: 'C', text: 'Graph (C)' },
      { id: 'D', text: 'Graph (D)' }
    ];
    const updateRes = await fetch(`${LIVE_API}/question-bank/${lomQ49.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...lomQ49,
        options: newLomOpts
      })
    });
    console.log(`LOM Q49 update status: ${updateRes.status}`);
  }

  // 4. Clean up existing Motion 1D questions on live
  const existingMotion1d = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('one dimension') || ch.includes('straight line') || q.chapter_id === motion1dChapterId;
  });
  console.log(`Found ${existingMotion1d.length} existing Motion 1D questions on live server.`);

  if (existingMotion1d.length > 0) {
    console.log(`Deleting ${existingMotion1d.length} old Motion 1D questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingMotion1d.length; i += DELETE_BATCH) {
      const chunk = existingMotion1d.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
      ));
    }
    console.log('Cleanup of old Motion 1D questions complete.');
  }

  // 5. Upload all 157 clean questions to live
  console.log(`\nUploading ${ALL_MOTION1D_PYQ_QUESTIONS.length} clean Motion 1D questions to live...`);
  let successCount = 0;
  let failCount = 0;

  const BATCH_SIZE = 5;
  for (let i = 0; i < ALL_MOTION1D_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const chunk = ALL_MOTION1D_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        chapter: 'Motion in one Dimension',
        topic: 'Motion in one Dimension',
        chapter_id: motion1dChapterId,
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
        const createRes = await fetch(`${LIVE_API}/question-bank`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!createRes.ok) {
          const errText = await createRes.text();
          console.error(`[FAIL] Q${q.qNum}: ${createRes.status} - ${errText.slice(0, 100)}`);
          failCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error(`[ERR] Q${q.qNum}:`, err.message);
        failCount++;
      }
    }));
    process.stdout.write(`\rProgress: ${successCount + failCount}/${ALL_MOTION1D_PYQ_QUESTIONS.length} uploaded...`);
  }

  console.log(`\n\nUpload Complete: ${successCount} succeeded, ${failCount} failed.`);

  // 6. Verify live database counts and dummy options
  console.log('\n=== VERIFYING FINAL LIVE DATABASE STATE ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Physics&exam_type=JEE&refresh=true&limit=2000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const finalQuestions = verifyData.questions || [];
  console.log(`Final total JEE Physics questions on live: ${finalQuestions.length}`);

  let liveDummyCount = 0;
  const chapterCounts = {};
  for (const q of finalQuestions) {
    chapterCounts[q.chapter] = (chapterCounts[q.chapter] || 0) + 1;
    for (const opt of (q.options || [])) {
      const txt = typeof opt === 'object' && opt !== null ? opt.text : String(opt);
      if (/^Option\s*\([A-D]\)$/i.test(txt?.trim())) {
        liveDummyCount++;
      }
    }
  }
  console.log('Chapter breakdown on live:');
  console.table(chapterCounts);
  console.log(`Total dummy options remaining on live: ${liveDummyCount}`);
}

syncToLive().catch(console.error);
