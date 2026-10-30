import { query } from '../src/config/db.js';
import { livingWorldPart1 } from './living_world_part1.mjs';
import { livingWorldPart2 } from './living_world_part2.mjs';
import { livingWorldPart3 } from './living_world_part3.mjs';

const allQuestions = [...livingWorldPart1, ...livingWorldPart2, ...livingWorldPart3];

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('========================================================================');
  console.log('   IMPORTING THE LIVING WORLD (BOTANY) QUESTIONS: LOCAL + NEON + LIVE    ');
  console.log('========================================================================\n');

  console.log(`Total questions to process: ${allQuestions.length}`);

  // 1. Verify all questions
  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    if (!q.question_text || !q.options || q.options.length !== 4 || q.correct_index === undefined) {
      throw new Error(`Invalid question format at index ${i} (Q#${q.qNo})`);
    }
  }
  console.log('[Validation] All 144 questions passed validation checks.');

  // 2. Insert into local / Neon DB
  console.log('\n[Database] Connecting to DB to insert questions...');
  
  // Find or verify subject & chapter
  const subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'botany'");
  const subjectId = subRes.rows[0]?.id || 15;

  let chapRes = await query("SELECT id, name FROM chapters WHERE LOWER(name) = 'the living world' AND subject_id = $1", [subjectId]);
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const createChap = await query("INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id", [subjectId, 'The Living World']);
    chapterId = createChap.rows[0].id;
  }
  console.log(`[Database] Subject ID: ${subjectId}, Chapter ID: ${chapterId}`);

  let dbInserted = 0;
  for (const q of allQuestions) {
    const check = await query(
      "SELECT id FROM question_bank WHERE category = 'Botany' AND question_text = $1 AND chapter = 'The Living World'",
      [q.question_text]
    );
    if (check.rows.length === 0) {
      await query(
        `INSERT INTO question_bank 
         (category, question_type, question_text, options, correct_index, marks, solution, subject_id, chapter_id, chapter, topic, difficulty, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          'Botany',
          'mcq',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          4,
          q.solution,
          subjectId,
          chapterId,
          'The Living World',
          'The Living World',
          'medium',
          'normal'
        ]
      );
      dbInserted++;
    }
  }
  console.log(`[Database] Inserted ${dbInserted} new questions into local / Neon DB.`);

  // 3. Sync to Live Server
  console.log('\n[Live Server] Logging into Live API...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) throw new Error('Live auth failed');
  const { token } = await loginRes.json();
  console.log('[Live Server] Logged in successfully.');

  // Fetch existing Botany questions on Live
  const liveQRes = await fetch(LIVE_API + '/question-bank?category=Botany', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const liveQData = await liveQRes.json();
  const existingLive = liveQData.questions || [];
  console.log(`[Live Server] Currently ${existingLive.length} Botany questions on Live.`);

  const existingTexts = new Set(
    existingLive
      .filter(q => /living world/i.test(q.chapter || ''))
      .map(q => q.question_text.trim())
  );

  let liveInserted = 0;
  let liveSkipped = 0;
  let liveErrors = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    if (existingTexts.has(q.question_text.trim())) {
      liveSkipped++;
      continue;
    }

    const payload = {
      category: 'Botany',
      question_type: 'mcq',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      marks: 4,
      solution: q.solution,
      subject_id: 10,       // Live Botany subject ID
      chapter_id: 221,      // Live 'The Living World' chapter ID
      chapter: 'The Living World',
      topic: 'The Living World',
      difficulty: 'medium',
      status: 'normal'
    };

    try {
      const createRes = await fetch(LIVE_API + '/question-bank', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (createRes.ok) {
        liveInserted++;
        if (liveInserted % 20 === 0 || liveInserted === allQuestions.length) {
          console.log(`[Live Server] Uploaded ${liveInserted}/${allQuestions.length} questions...`);
        }
      } else {
        const errText = await createRes.text();
        console.error(`[Live Server] Failed Q#${q.qNo}: ${createRes.status} ${errText}`);
        liveErrors++;
      }
    } catch (err) {
      console.error(`[Live Server] Network error Q#${q.qNo}: ${err.message}`);
      liveErrors++;
    }
  }

  console.log(`\n========================================================================`);
  console.log(`   SYNC COMPLETE:`);
  console.log(`   - Local / Neon DB Inserted : ${dbInserted}`);
  console.log(`   - Live Server Inserted     : ${liveInserted}`);
  console.log(`   - Live Server Skipped      : ${liveSkipped}`);
  console.log(`   - Live Server Errors       : ${liveErrors}`);
  console.log(`========================================================================\n`);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

