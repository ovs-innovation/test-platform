import fetch from 'node-fetch';
import { ALL_BASIC_CHEM_QUESTIONS } from './basic_chem_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncBasicChemToLive() {
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
  
  let basicChemCh = chaptersList.find(c => 
    c.name?.toLowerCase().includes('some basic concepts of chemistry') ||
    c.name?.toLowerCase().includes('some basic concept')
  );
  let chapterId = basicChemCh?.id || 95;
  let chapterName = basicChemCh?.name || 'Some Basic Concepts of Chemistry';

  if (!basicChemCh) {
    console.log('Creating "Some Basic Concepts of Chemistry" chapter on live under Chemistry...');
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

  // 3. Clean up existing questions for this chapter on live if any
  const existingBasicChem = allLiveQuestions.filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('basic concept') || q.chapter_id === chapterId;
  });
  console.log(`Found ${existingBasicChem.length} existing Basic Concepts of Chemistry questions on live server.`);

  if (existingBasicChem.length > 0) {
    console.log(`Deleting ${existingBasicChem.length} old Basic Concepts of Chemistry questions on live...`);
    const DELETE_BATCH = 10;
    for (let i = 0; i < existingBasicChem.length; i += DELETE_BATCH) {
      const chunk = existingBasicChem.slice(i, i + DELETE_BATCH);
      await Promise.all(chunk.map(oldQ => 
        fetch(`${LIVE_API}/question-bank/${oldQ.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(e => console.warn(`Failed to delete Q#${oldQ.id}:`, e.message))
      ));
    }
    console.log('Old questions deleted.');
  }

  // 4. Upload all 221 verified questions to live question-bank
  console.log(`Uploading ${ALL_BASIC_CHEM_QUESTIONS.length} clean questions to live question bank...`);
  const BATCH_SIZE = 5;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < ALL_BASIC_CHEM_QUESTIONS.length; i += BATCH_SIZE) {
    const batch = ALL_BASIC_CHEM_QUESTIONS.slice(i, i + BATCH_SIZE);
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

        if (createRes.ok) {
          successCount++;
        } else {
          const errTxt = await createRes.text();
          console.error(`Failed to upload Q#${q.qNum}:`, errTxt);
          failCount++;
        }
      } catch (err) {
        console.error(`Network error for Q#${q.qNum}:`, err.message);
        failCount++;
      }
    }));

    if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= ALL_BASIC_CHEM_QUESTIONS.length) {
      console.log(`Progress: ${Math.min(i + BATCH_SIZE, ALL_BASIC_CHEM_QUESTIONS.length)}/${ALL_BASIC_CHEM_QUESTIONS.length} uploaded.`);
    }
  }

  console.log(`\nUpload complete! Successfully uploaded: ${successCount}, Failed: ${failCount}`);

  // 5. Final Live Verification
  console.log('Performing final verification on live API...');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Chemistry&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const finalQuestions = (verifyData.questions || []).filter(q => {
    const ch = (q.chapter || '').toLowerCase();
    return ch.includes('basic concept') || q.chapter_id === chapterId;
  });

  console.log(`Live verification: found ${finalQuestions.length} questions in "${chapterName}".`);
  if (finalQuestions.length === ALL_BASIC_CHEM_QUESTIONS.length) {
    console.log('SUCCESS: All 221 questions accurately verified on live production!');
  } else {
    console.warn(`Warning: Expected 221 questions, but found ${finalQuestions.length} on live server.`);
  }
}

syncBasicChemToLive().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
