import { query } from '../config/db.js';
import { resolveStandardChapter } from '../utils/chapterResolver.js';

async function backfillChapters() {
  console.log('[backfillChapters] Starting chapter resolution and backfill...');

  // 1. Fetch subjects
  const subRes = await query('SELECT id, name FROM subjects');
  const subjects = subRes.rows;
  const botanySub = subjects.find((s) => s.name.toLowerCase() === 'botany');
  const biologySub = subjects.find((s) => s.name.toLowerCase() === 'biology');

  const botanyId = botanySub ? botanySub.id : 15;
  const biologyId = biologySub ? biologySub.id : 9;

  // 2. Ensure "Sexual Reproduction in Flowering Plants" exists in chapters
  const ensureChapter = async (subId, chapterName) => {
    const existing = await query(
      'SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2)',
      [subId, chapterName]
    );
    if (existing.rows.length > 0) return existing.rows[0].id;
    const inserted = await query(
      'INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, 0) RETURNING id',
      [subId, chapterName]
    );
    return inserted.rows[0].id;
  };

  const chIdBotany = await ensureChapter(botanyId, 'Sexual Reproduction in Flowering Plants');
  if (biologySub) {
    await ensureChapter(biologyId, 'Sexual Reproduction in Flowering Plants');
  }
  console.log(`[backfillChapters] Chapter "Sexual Reproduction in Flowering Plants" linked with id ${chIdBotany}`);

  // 3. Fetch all questions from question_bank
  const qRes = await query('SELECT id, category, chapter, topic, question_text, subject_id, chapter_id FROM question_bank');
  console.log(`[backfillChapters] Found ${qRes.rows.length} total questions in question_bank`);

  let updatedCount = 0;
  for (const q of qRes.rows) {
    const resolvedChapter = resolveStandardChapter(
      q.category || '',
      q.topic || '',
      q.question_text || '',
      q.chapter || ''
    );

    let newSubjectId = q.subject_id;
    let newChapterId = q.chapter_id;

    if (!newSubjectId && q.category && q.category.toLowerCase() === 'botany') {
      newSubjectId = botanyId;
    }

    if (resolvedChapter === 'Sexual Reproduction in Flowering Plants') {
      newChapterId = chIdBotany;
    }

    const needsUpdate =
      q.chapter !== resolvedChapter ||
      q.chapter_id !== newChapterId ||
      q.subject_id !== newSubjectId;

    if (needsUpdate) {
      await query(
        'UPDATE question_bank SET chapter = $1, chapter_id = $2, subject_id = $3 WHERE id = $4',
        [resolvedChapter, newChapterId, newSubjectId, q.id]
      );
      updatedCount++;
    }
  }

  console.log(`[backfillChapters] Successfully updated ${updatedCount} question_bank row(s).`);

  // Verify
  const summaryRes = await query(
    'SELECT category, chapter, COUNT(*) as count FROM question_bank GROUP BY category, chapter ORDER BY count DESC'
  );
  console.table(summaryRes.rows);
}

backfillChapters()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[backfillChapters] Error:', err);
    process.exit(1);
  });
