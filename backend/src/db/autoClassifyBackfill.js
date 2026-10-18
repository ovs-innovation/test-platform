import { query } from '../config/db.js';
import { inferSubjectAndTopic, inferSubjectFromTopic } from '../utils/subjectClassifier.js';

async function runBackfill() {
  console.log('--- Starting Subject & Topic Auto-Classification Backfill ---');
  
  const testsRes = await query('SELECT id, test_name, syllabus FROM tests');
  console.log(`Processing ${testsRes.rowCount} tests...`);

  for (const t of testsRes.rows) {
    const qsRes = await query('SELECT id, question_text, subject, topic, chapter FROM questions WHERE assessment_id = $1 ORDER BY position, id', [t.id]);
    for (const q of qsRes.rows) {
      const topicSub = inferSubjectFromTopic(q.topic) || inferSubjectFromTopic(q.chapter);
      const qClass = inferSubjectAndTopic({
        testName: t.test_name || '',
        syllabus: t.syllabus || '',
        questionText: q.question_text || ''
      });

      const correctSub = topicSub || (qClass.subject !== 'General' ? qClass.subject : q.subject);
      const correctTopic = (q.topic && q.topic !== 'General' && q.topic !== 'General Concepts') ? q.topic : qClass.topic;

      if (correctSub && correctSub !== 'General') {
        await query(
          `UPDATE questions SET 
            subject = $1,
            topic = COALESCE(topic, $2),
            bank_category = $1
           WHERE id = $3`,
          [correctSub, correctTopic, q.id]
        );
      }
    }
  }

  console.log('--- Auto-Classification Backfill Completed Successfully! ---');
  process.exit(0);
}

runBackfill().catch(err => {
  console.error('Error during backfill:', err);
  process.exit(1);
});
