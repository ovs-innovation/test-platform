import { pool } from '../src/config/db.js';
import { allEcologyQuestions } from './ecology_questions_data.mjs';

function normalizeQuestion(q) {
  if (q.question_type === 'assertion_reason' || q.assertion_text) {
    const a = (q.assertion_text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const r = (q.reason_text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (a || r) {
      return 'ar_' + a.slice(0, 50) + '_' + r.slice(0, 50);
    }
  }
  let text = (q.question_text || q.question || '').toLowerCase();
  text = text.replace(/in the following questions.*?mark\s*\([1-4]\)\.?/gis, '');
  text = text.replace(/assertion\s*\(a\)\s*:\s*/gi, '');
  text = text.replace(/reason\s*\(r\)\s*:\s*/gi, '');
  text = text.replace(/\\[a-zA-Z]+/g, '');
  text = text.replace(/[^a-z0-9]/g, '');
  const optSig = (q.options || []).map(o => String(o).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10)).join('_');
  return text.slice(0, 120) + (optSig ? '__' + optSig : '');
}

async function run() {
  console.log('========================================================================');
  console.log('IMPORT ECOLOGY (ORGANISMS AND POPULATIONS) QUESTIONS TO LOCAL DB');
  console.log(`Total questions in dataset: ${allEcologyQuestions.length}`);
  console.log('========================================================================\n');

  const botanySubjectId = 15;
  const chapterName = 'Organisms and Populations';

  // 1. Ensure Botany subject exists
  const subRes = await pool.query("SELECT id, name FROM subjects WHERE id = $1", [botanySubjectId]);
  if (subRes.rows.length === 0) {
    throw new Error(`Botany subject (ID ${botanySubjectId}) not found in database!`);
  }
  console.log(`[Subject] Verified Subject ID ${botanySubjectId}: '${subRes.rows[0].name}'`);

  // 2. Ensure Chapter exists under Botany
  let chapRes = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE subject_id = $1 AND name ILIKE $2",
    [botanySubjectId, chapterName]
  );

  let chapterId;
  if (chapRes.rows.length > 0) {
    chapterId = chapRes.rows[0].id;
    console.log(`[Chapter] Found existing chapter '${chapRes.rows[0].name}' with id ${chapterId}`);
  } else {
    const posRes = await pool.query(
      "SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = $1",
      [botanySubjectId]
    );
    const nextPos = posRes.rows[0].next_pos;

    const newChap = await pool.query(
      "INSERT INTO chapters (name, subject_id, position) VALUES ($1, $2, $3) RETURNING id, name",
      [chapterName, botanySubjectId, nextPos]
    );
    chapterId = newChap.rows[0].id;
    console.log(`[Chapter] Created new chapter '${chapterName}' with id ${chapterId} at position ${nextPos}`);
  }

  // 3. Load all existing questions in DB to prevent duplicates
  const existingRes = await pool.query(
    "SELECT id, question_text, options, assertion_text, reason_text, question_type, chapter, category, image_url FROM question_bank"
  );
  console.log(`[Deduplication] Loaded ${existingRes.rows.length} existing questions across DB.`);

  const existingMap = new Map();
  existingRes.rows.forEach(r => {
    let opts = r.options;
    if (typeof opts === 'string') {
      try { opts = JSON.parse(opts); } catch (e) {}
    }
    const norm = normalizeQuestion({ ...r, options: opts });
    if (norm && !existingMap.has(norm)) {
      existingMap.set(norm, r);
    }
  });

  let insertedCount = 0;
  let skippedCount = 0;
  let updatedCount = 0;

  for (let i = 0; i < allEcologyQuestions.length; i++) {
    const q = allEcologyQuestions[i];
    const qNorm = normalizeQuestion(q);

    // Duplicate check
    if (existingMap.has(qNorm)) {
      const match = existingMap.get(qNorm);
      // Update diagram or solution if missing
      if (q.image_url && (!match.image_url || match.image_url === '')) {
        await pool.query(
          "UPDATE question_bank SET image_url = $1, chapter_id = $2, chapter = $3 WHERE id = $4",
          [q.image_url, chapterId, chapterName, match.id]
        );
        console.log(`  └─ Updated missing diagram for existing question ID: ${match.id}`);
        updatedCount++;
      }
      skippedCount++;
      continue;
    }

    // Insert new question
    const insertRes = await pool.query(
      `INSERT INTO question_bank (
         category, question_type, question_text, options, correct_index, correct_indices,
         marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
         assertion_text, reason_text, image_url, status
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
       RETURNING id`,
      [
        'Botany',
        q.question_type || 'mcq',
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        q.marks || 4,
        q.difficulty || 'medium',
        q.solution || '',
        botanySubjectId,
        chapterId,
        chapterName,
        'Botany',
        q.topic || chapterName,
        q.assertion_text || null,
        q.reason_text || null,
        q.image_url || null,
        'normal'
      ]
    );

    const newId = insertRes.rows[0].id;
    insertedCount++;
    existingMap.set(qNorm, { id: newId, chapter: chapterName, image_url: q.image_url });

    const preview = q.question_text.replace(/\s+/g, ' ').slice(0, 50);
    const hasImg = q.image_url ? ' [DIAGRAM]' : '';
    console.log(`[INSERTED] Q${i + 1} (${q.section}${q.booklet_qno}) -> ID: ${newId}${hasImg} | "${preview}..."`);
  }

  console.log(`\n========================================`);
  console.log(`Total questions processed: ${allEcologyQuestions.length}`);
  console.log(`Questions inserted: ${insertedCount}`);
  console.log(`Questions skipped (duplicates): ${skippedCount}`);
  console.log(`Existing questions updated: ${updatedCount}`);
  console.log(`========================================\n`);

  // Final verification
  const finalCount = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = $1",
    [chapterId]
  );
  console.log(`Final count in Chapter ${chapterId} ('${chapterName}'):`, finalCount.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
