import { query } from '../config/db.js';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function fixExistingAiQuestionOptions() {
  console.log('🔄 [DB Migration] Shuffling options for existing AI-generated questions...');

  const selectRes = await query(`
    SELECT id, assessment_id, question_text, options, correct_option_index, correct_index
    FROM questions
    WHERE source = 'ai_generated'
       OR assessment_id IN (SELECT id FROM tests WHERE type = 'ai_weak_topic' OR test_name LIKE 'AI Improvement%')
  `);

  const questions = selectRes.rows || [];
  console.log(`Found ${questions.length} existing AI questions in database to process.`);

  let updatedCount = 0;

  for (const q of questions) {
    let opts = q.options;
    if (typeof opts === 'string') {
      try {
        opts = JSON.parse(opts);
      } catch (_) {
        continue;
      }
    }

    if (!Array.isArray(opts) || opts.length < 2) continue;

    const currentCorrectIdx = q.correct_option_index != null
      ? Number(q.correct_option_index)
      : Number(q.correct_index || 0);

    const correctText = opts[currentCorrectIdx];
    if (!correctText) continue;

    // Shuffle options array
    const shuffledOpts = shuffleArray(opts);
    const newCorrectIdx = shuffledOpts.indexOf(correctText);

    if (newCorrectIdx === -1) continue;

    await query(
      `UPDATE questions
       SET options = $1,
           correct_option_index = $2,
           correct_index = $3
       WHERE id = $4`,
      [JSON.stringify(shuffledOpts), newCorrectIdx, newCorrectIdx, q.id]
    );

    updatedCount++;
  }

  console.log(`✅ [DB Migration] Successfully randomized options & correct index for ${updatedCount} AI questions.`);
  return updatedCount;
}

if (process.argv[1] && process.argv[1].endsWith('fix_existing_ai_question_options.js')) {
  fixExistingAiQuestionOptions()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Migration failed:', err);
      process.exit(1);
    });
}
