import { pool } from '../src/config/db.js';

async function inspectQuestions() {
  const res = await pool.query(
    "SELECT id, question_text, chapter_id, subject_id, chapter, subject, topic, question_type, created_at FROM questions WHERE chapter_id = 156 OR chapter ILIKE '%biological%' ORDER BY id ASC"
  );
  console.log(`Found ${res.rows.length} questions:`);
  for (const q of res.rows) {
    console.log(`ID: ${q.id}, ChapterId: ${q.chapter_id}, SubId: ${q.subject_id}, Subject: ${q.subject}, Ch: ${q.chapter}, Type: ${q.question_type}, Text: ${q.question_text.slice(0, 60)}...`);
  }
  await pool.end();
}

inspectQuestions().catch(console.error);
