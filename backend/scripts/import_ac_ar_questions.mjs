import { query } from '../src/config/db.js';
import { acArQuestions } from './ac_ar_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('========================================================================');
  console.log('   IMPORTING AR QUESTIONS (PHYSICS: ALTERNATING CURRENT)                ');
  console.log('========================================================================\n');

  console.log(`Total AR questions to process: ${acArQuestions.length}`);

  // 1. Validate all questions
  for (let i = 0; i < acArQuestions.length; i++) {
    const q = acArQuestions[i];
    if (!q.assertion || !q.reason || !q.options || q.options.length !== 4 || q.correct_index == null) {
      throw new Error(`Invalid format at index ${i} (Q#${q.qNo})`);
    }
  }
  console.log('[Validation] All 17 AR questions passed format validation.');

  // 2. Insert into Local & Neon DB
  console.log('\n[Database] Connecting to Local / Neon DB...');
  const subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
  const subjectId = subRes.rows[0]?.id || 11;

  let chapRes = await query("SELECT id, name FROM chapters WHERE LOWER(name) = 'alternating current' AND subject_id = $1", [subjectId]);
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const createChap = await query("INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id", [subjectId, 'Alternating Current']);
    chapterId = createChap.rows[0].id;
  }
  console.log(`[Database] Subject ID: ${subjectId}, Chapter ID: ${chapterId}`);

  let dbInserted = 0;
  for (const q of acArQuestions) {
    const qText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;
    const check = await query(
      "SELECT id FROM question_bank WHERE category = 'Physics' AND question_text = $1 AND chapter = 'Alternating Current'",
      [qText]
    );
    if (check.rows.length === 0) {
      await query(
        `INSERT INTO question_bank 
         (category, question_type, question_text, options, correct_index, marks, solution, subject_id, chapter_id, chapter, topic, difficulty, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          'Physics',
          'assertion_reason',
          qText,
          JSON.stringify(q.options),
          q.correct_index,
          4,
          q.solution,
          subjectId,
          chapterId,
          'Alternating Current',
          'Alternating Current',
          'medium',
          'normal'
        ]
      );
      dbInserted++;
    }
  }
  console.log(`[Database] Inserted ${dbInserted} new AR questions into local / Neon DB.`);

  // 3. Upload to Live Server
  console.log('\n[Live Server] Logging into Live API...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) throw new Error('Live auth failed');
  const { token } = await loginRes.json();
  console.log('[Live Server] Logged in successfully.');

  // Fetch existing Physics questions on Live
  const liveQRes = await fetch(LIVE_API + '/question-bank?category=Physics', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveQData = await liveQRes.json();
  const existingLive = liveQData.questions || [];
  console.log(`[Live Server] Currently ${existingLive.length} Physics questions on Live.`);

  // Filter existing texts in Alternating Current
  const existingTexts = new Set(
    existingLive
      .filter(q => /alternat/i.test(q.chapter || ''))
      .map(q => q.question_text.trim())
  );

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveErrors = 0;

  for (let i = 0; i < acArQuestions.length; i++) {
    const q = acArQuestions[i];
    const qText = `Assertion (A): ${q.assertion}\nReason (R): ${q.reason}`;
    if (existingTexts.has(qText.trim())) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Physics',
      subject: 'Physics',
      chapter: 'Alternating Current',
      topic: 'Alternating Current',
      question_type: 'assertion_reason',
      difficulty: 'medium',
      marks: 4,
      question_text: qText,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      status: 'normal'
    };

    try {
      const createRes = await fetch(LIVE_API + '/question-bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error(`[Live Server Error] Q#${q.qNo}: ${createRes.status} - ${errText}`);
        liveErrors++;
      } else {
        liveInserted++;
        existingTexts.add(qText.trim());
      }
    } catch (err) {
      console.error(`[Live Server Exception] Q#${q.qNo}: ${err.message}`);
      liveErrors++;
    }
  }

  console.log('\n========================================================================');
  console.log('   AC AR IMPORT COMPLETE:');
  console.log(`   - Local / Neon DB Inserted : ${dbInserted}`);
  console.log(`   - Live Server Inserted     : ${liveInserted}`);
  console.log(`   - Live Server Skipped      : ${liveSkipped}`);
  console.log(`   - Live Server Errors       : ${liveErrors}`);
  console.log('========================================================================\n');

  // Verify final count on Live
  const verifyRes = await fetch(LIVE_API + '/question-bank?category=Physics', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const verifyData = await verifyRes.json();
  const allLivePhysics = verifyData.questions || [];
  const acLive = allLivePhysics.filter(q => /alternat/i.test(q.chapter || ''));
  const acArLive = acLive.filter(q => 
    q.question_type === 'assertion_reason' || 
    (q.question_text && /assertion/i.test(q.question_text) && /reason/i.test(q.question_text))
  );

  console.log(`[Verification] Total Alternating Current questions on Live: ${acLive.length}`);
  console.log(`[Verification] Total AR questions in Alternating Current on Live: ${acArLive.length}`);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

