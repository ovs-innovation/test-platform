import { ALL_FLUIDS_PYQ_QUESTIONS } from './fluids_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncAllFluidsToLive() {
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

  // 1. Fetch live Physics subject and Fluids chapter
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
  let fluidsCh = (chData.chapters || chData || []).find(c => 
    c.name?.toLowerCase().includes('fluid')
  );
  
  let chapterId;
  if (!fluidsCh) {
    console.log('Creating "Mechanical properties of fluids" chapter on live...');
    const createChRes = await fetch(`${LIVE_API}/admin/subjects/${subjectId}/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: 'Mechanical properties of fluids' })
    });
    const createdCh = await createChRes.json();
    chapterId = createdCh.id || createdCh.chapter?.id;
  } else {
    chapterId = fluidsCh.id;
  }
  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId} ("${fluidsCh?.name || 'Mechanical properties of fluids'}")`);

  // 2. Check existing fluids questions on live
  console.log('Fetching existing live Fluids questions in JEE Physics...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const existingFluids = (qbData.questions || []).filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('fluid') || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingFluids.length} existing Fluids questions on live server.`);

  // If any old/stale fluids questions exist, clean them up
  if (existingFluids.length > 0) {
    console.log(`Cleaning up ${existingFluids.length} previous Fluids questions on live...`);
    const DEL_BATCH = 20;
    for (let i = 0; i < existingFluids.length; i += DEL_BATCH) {
      const chunk = existingFluids.slice(i, i + DEL_BATCH);
      await Promise.all(chunk.map(oldQ =>
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        })
      ));
    }
    console.log('Cleanup complete.');
  }

  // 3. Upload all 195 clean questions to live
  console.log(`\nUploading ${ALL_FLUIDS_PYQ_QUESTIONS.length} questions to live question bank...`);
  let successCount = 0;
  let failCount = 0;

  const BATCH_SIZE = 10;
  for (let i = 0; i < ALL_FLUIDS_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const chunk = ALL_FLUIDS_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        chapter: 'Mechanical properties of fluids',
        topic: 'Mechanical properties of fluids',
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
          console.error(`Failed to create Q#${q.qNum}: ${createRes.status} ${errText}`);
          failCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error(`Error uploading Q#${q.qNum}:`, err.message);
        failCount++;
      }
    }));

    process.stdout.write(`Uploaded ${Math.min(i + BATCH_SIZE, ALL_FLUIDS_PYQ_QUESTIONS.length)} / ${ALL_FLUIDS_PYQ_QUESTIONS.length}...\r`);
  }

  console.log(`\n\nUpload finished: ${successCount} succeeded, ${failCount} failed.`);

  // 4. Verification on live API
  console.log('\n=== VERIFYING ON LIVE EDVEDUM.COM ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const allLive = verifyData.questions || [];
  const liveFluidsQuestions = allLive.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('fluid') || q.chapter_id === chapterId;
  });

  console.log(`Total JEE Physics questions on live: ${allLive.length}`);
  console.log(`Total Fluids questions on live: ${liveFluidsQuestions.length}`);

  // Summary by chapter
  const counts = {};
  for (const q of allLive) {
    counts[q.chapter || 'Unknown'] = (counts[q.chapter || 'Unknown'] || 0) + 1;
  }
  console.log('\nBreakdown of Live JEE Physics Chapters:');
  console.table(counts);

  if (liveFluidsQuestions.length === ALL_FLUIDS_PYQ_QUESTIONS.length) {
    console.log('\nSUCCESS! All 195 Mechanical properties of fluids questions are LIVE on edvedum.com!');
  } else {
    console.warn(`\nWarning: Expected ${ALL_FLUIDS_PYQ_QUESTIONS.length} Fluids questions, found ${liveFluidsQuestions.length}`);
  }
}

syncAllFluidsToLive().catch(console.error);
