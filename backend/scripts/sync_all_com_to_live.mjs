import { ALL_COM_PYQ_QUESTIONS } from './com_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncAllComToLive() {
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

  // 1. Fetch live Physics subject and COM chapter
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
  const comCh = (chData.chapters || chData || []).find(c => 
    c.name?.toLowerCase().includes('mass') || c.name?.toLowerCase().includes('collision')
  );
  const chapterId = comCh?.id || 303;
  console.log(`Resolved Live Subject ID: ${subjectId}, Chapter ID: ${chapterId} ("${comCh?.name || 'Center of Mass and Collision'}")`);

  // 2. Check existing COM questions on live
  console.log('Fetching existing live COM questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const qbData = await qbRes.json();
  const existingCom = (qbData.questions || []).filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('mass') || ch.includes('collision') || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingCom.length} existing COM questions on live server.`);

  // If any old/stale COM questions exist, clean them up
  if (existingCom.length > 0) {
    console.log(`Cleaning up ${existingCom.length} previous COM questions on live...`);
    for (const oldQ of existingCom) {
      await fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    console.log('Cleanup complete.');
  }

  // 3. Upload all 139 clean questions to live
  console.log(`\nUploading ${ALL_COM_PYQ_QUESTIONS.length} questions to live question bank...`);
  let successCount = 0;
  let failCount = 0;

  const BATCH_SIZE = 5;
  for (let i = 0; i < ALL_COM_PYQ_QUESTIONS.length; i += BATCH_SIZE) {
    const chunk = ALL_COM_PYQ_QUESTIONS.slice(i, i + BATCH_SIZE);
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
        chapter: 'Center of mass momentum and collision',
        topic: 'Center of mass momentum and collision',
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

    process.stdout.write(`Uploaded ${Math.min(i + BATCH_SIZE, ALL_COM_PYQ_QUESTIONS.length)} / ${ALL_COM_PYQ_QUESTIONS.length}...\r`);
  }

  console.log(`\n\nUpload finished: ${successCount} succeeded, ${failCount} failed.`);

  // 4. Verification on live API
  console.log('\n=== VERIFYING ON LIVE EDVEDUM.COM ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const allLive = verifyData.questions || [];
  const liveComQuestions = allLive.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('mass') || ch.includes('collision') || q.chapter_id === chapterId;
  });

  console.log(`Total JEE Physics questions on live: ${allLive.length}`);
  console.log(`Total COM questions on live: ${liveComQuestions.length}`);

  // Summary by chapter
  const counts = {};
  for (const q of allLive) {
    counts[q.chapter || 'Unknown'] = (counts[q.chapter || 'Unknown'] || 0) + 1;
  }
  console.log('\nBreakdown of Live JEE Physics Chapters:');
  console.table(counts);

  if (liveComQuestions.length === ALL_COM_PYQ_QUESTIONS.length) {
    console.log('\nSUCCESS! All 139 Center of mass momentum and collision questions are LIVE on edvedum.com!');
  } else {
    console.warn(`\nWarning: Expected ${ALL_COM_PYQ_QUESTIONS.length} COM questions, found ${liveComQuestions.length}`);
  }
}

syncAllComToLive().catch(console.error);
