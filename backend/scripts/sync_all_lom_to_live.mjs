import { ALL_LOM_PYQ_QUESTIONS } from './lom_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function syncAllLomToLive() {
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

  console.log('Fetching live Laws of Motion questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!qbRes.ok) {
    throw new Error(`Failed to fetch questions: ${qbRes.status} ${await qbRes.text()}`);
  }
  const qbData = await qbRes.json();
  const liveLom = (qbData.questions || [])
    .filter(q => (q.chapter || '').toLowerCase() === 'laws of motion')
    .sort((a, b) => a.id - b.id);

  console.log(`Found ${liveLom.length} Laws of Motion questions on live server.`);
  console.log(`Clean questions to sync: ${ALL_LOM_PYQ_QUESTIONS.length}`);

  if (liveLom.length !== ALL_LOM_PYQ_QUESTIONS.length) {
    console.warn(`WARNING: Count mismatch! Live: ${liveLom.length}, Clean: ${ALL_LOM_PYQ_QUESTIONS.length}`);
  }

  let successCount = 0;
  let failCount = 0;

  // Process questions in batches of 5
  const CONCURRENCY = 5;
  for (let i = 0; i < ALL_LOM_PYQ_QUESTIONS.length; i += CONCURRENCY) {
    const chunk = ALL_LOM_PYQ_QUESTIONS.slice(i, i + CONCURRENCY);
    const promises = chunk.map(async (cleanQ, idxInChunk) => {
      const qIndex = i + idxInChunk;
      const liveTarget = liveLom[qIndex];
      if (!liveTarget) {
        console.error(`No live target for question index ${qIndex} (Q#${cleanQ.qNum})`);
        failCount++;
        return;
      }

      const isNumerical = cleanQ.question_type === 'numerical' || cleanQ.numeric_answer !== null && cleanQ.numeric_answer !== undefined;
      let optionsPayload;
      let correctIndexPayload;
      let correctIndicesPayload;
      let numericAnswerPayload;

      if (isNumerical) {
        optionsPayload = [];
        correctIndexPayload = null;
        correctIndicesPayload = [];
        numericAnswerPayload = Number(cleanQ.numeric_answer ?? 0);
      } else {
        optionsPayload = (cleanQ.options || []).map((t, optIdx) => ({
          id: ['A', 'B', 'C', 'D'][optIdx] || String(optIdx),
          text: String(t).trim(),
        }));
        correctIndexPayload = cleanQ.correct_option !== undefined && cleanQ.correct_option !== null ? Number(cleanQ.correct_option) : 0;
        correctIndicesPayload = [correctIndexPayload];
        numericAnswerPayload = null;
      }

      const payload = {
        question_type: isNumerical ? 'numerical' : 'mcq',
        question_text: cleanQ.question,
        options: optionsPayload,
        correct_index: correctIndexPayload,
        correct_indices: correctIndicesPayload,
        numeric_answer: numericAnswerPayload,
        marks: 4,
        difficulty: cleanQ.difficulty || 'medium',
        image_url: cleanQ.image_url || null,
        solution: cleanQ.solution || '',
        chapter: 'Laws of Motion',
        topic: 'Laws of Motion',
        category: 'Physics',
        subject: 'Physics',
        exam_type: 'JEE',
      };

      let retries = 3;
      while (retries > 0) {
        try {
          const putRes = await fetch(`${LIVE_API}/question-bank/${liveTarget.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
          if (putRes.ok) {
            successCount++;
            break;
          } else {
            const errText = await putRes.text();
            retries--;
            if (retries === 0) {
              console.error(`Failed to update Q#${cleanQ.qNum} (ID: ${liveTarget.id}): ${putRes.status} ${errText}`);
              failCount++;
            } else {
              await new Promise(r => setTimeout(r, 1000));
            }
          }
        } catch (err) {
          retries--;
          if (retries === 0) {
            console.error(`Exception updating Q#${cleanQ.qNum} (ID: ${liveTarget.id}):`, err.message);
            failCount++;
          } else {
            await new Promise(r => setTimeout(r, 1000));
          }
        }
      }
    });

    await Promise.all(promises);
    process.stdout.write(`\rProgress: ${Math.min(i + CONCURRENCY, ALL_LOM_PYQ_QUESTIONS.length)} / ${ALL_LOM_PYQ_QUESTIONS.length} questions synced...`);
  }

  console.log(`\n\n=== SYNC COMPLETE ===`);
  console.log(`Successfully synced: ${successCount} / ${ALL_LOM_PYQ_QUESTIONS.length}`);
  console.log(`Failed: ${failCount}`);

  // Verification step
  console.log('\n=== VERIFYING EDVEDUM.COM DATA ===');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?exam_type=JEE&category=Physics&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyData = await verifyRes.json();
  const updatedLom = (verifyData.questions || [])
    .filter(q => (q.chapter || '').toLowerCase() === 'laws of motion')
    .sort((a, b) => a.id - b.id);

  let fallbackCount = 0;
  let diagramsCount = 0;
  let numericalCount = 0;
  for (const q of updatedLom) {
    if (q.image_url) diagramsCount++;
    if (q.question_type === 'numerical') numericalCount++;
    const opts = Array.isArray(q.options) ? q.options : JSON.parse(q.options || '[]');
    if (opts.some(o => (o.text || '').toLowerCase().includes('option (a)'))) {
      fallbackCount++;
    }
  }

  console.log(`Verified ${updatedLom.length} questions on edvedum.com:`);
  console.log(`- Genuine diagrams attached: ${diagramsCount} (Expected: 68)`);
  console.log(`- Numericals: ${numericalCount} (Expected: 31)`);
  console.log(`- Fallback "Option (A)" count: ${fallbackCount} (Expected: 0 or 1 for graphical Q49)`);
  console.log(`- Q14 image_url: ${updatedLom[13]?.image_url}`);
  console.log(`- Q15 image_url: ${updatedLom[14]?.image_url}`);
  console.log(`- Q23 image_url: ${updatedLom[22]?.image_url}`);
  console.log(`- Q24 image_url: ${updatedLom[23]?.image_url}`);
}

syncAllLomToLive().catch(console.error);
