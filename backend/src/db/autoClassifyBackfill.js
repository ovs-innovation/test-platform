import { query } from '../config/db.js';
import { inferSubjectAndTopic } from '../utils/subjectClassifier.js';

async function runBackfill() {
  console.log('--- Starting Subject & Topic Auto-Classification Backfill ---');
  
  const testsRes = await query('SELECT id, test_name, syllabus FROM tests');
  console.log(`Processing ${testsRes.rowCount} tests...`);

  for (const t of testsRes.rows) {
    const classification = inferSubjectAndTopic({
      testName: t.test_name || '',
      syllabus: t.syllabus || ''
    });

    if (classification.subject !== 'General') {
      await query(
        `UPDATE tests SET 
          subject = COALESCE(subject, $1),
          subjects = COALESCE(subjects, $2::jsonb)
         WHERE id = $3`,
        [classification.subject, JSON.stringify([classification.subject]), t.id]
      );
    }

    const qsRes = await query('SELECT id, question_text FROM questions WHERE assessment_id = $1', [t.id]);
    for (const q of qsRes.rows) {
      const qClass = inferSubjectAndTopic({
        testName: t.test_name || '',
        syllabus: t.syllabus || '',
        questionText: q.question_text || ''
      });

      await query(
        `UPDATE questions SET 
          subject = COALESCE(subject, $1),
          topic = COALESCE(topic, $2),
          bank_category = CASE WHEN bank_category IS NULL OR bank_category = 'General' THEN $1 ELSE bank_category END
         WHERE id = $3`,
        [qClass.subject, qClass.topic, q.id]
      );
    }
  }

  console.log('--- Auto-Classification Backfill Completed Successfully! ---');
  process.exit(0);
}

runBackfill().catch(err => {
  console.error('Error during backfill:', err);
  process.exit(1);
});
