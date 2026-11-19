import { pool } from '../src/config/db.js';

async function verifyDb() {
  console.log('=== VERIFYING MOTION IN ONE DIMENSION IN DB ===');

  const qRes = await pool.query(`
    SELECT id, question_type, question_text, options, correct_index, numeric_answer, image_url, status, exam_type, category, chapter
    FROM question_bank
    WHERE exam_type = 'JEE' AND LOWER(category) = 'physics' AND (
      LOWER(chapter) = 'motion in one dimension' OR LOWER(chapter) = 'motion in straight line'
    )
    ORDER BY id ASC
  `);

  console.log(`Found ${qRes.rows.length} questions in DB for Motion in one Dimension.`);
  if (qRes.rows.length !== 157) {
    throw new Error(`Expected 157, got ${qRes.rows.length}`);
  }

  const withDiagrams = qRes.rows.filter(r => Boolean(r.image_url));
  const numericals = qRes.rows.filter(r => r.question_type === 'numerical');
  const mcqs = qRes.rows.filter(r => r.question_type === 'mcq');

  console.log(`MCQs: ${mcqs.length}`);
  console.log(`Numericals: ${numericals.length}`);
  console.log(`With Cloudinary diagrams: ${withDiagrams.length}`);
  console.log('Sample Cloudinary diagram URL:', withDiagrams[0]?.image_url);

  // Check random MCQ
  console.log('\nSample MCQ (Q1):', {
    text: mcqs[0].question_text.slice(0, 100),
    options: mcqs[0].options,
    correct_index: mcqs[0].correct_index
  });

  // Check random Numerical
  console.log('\nSample Numerical:', {
    text: numericals[0].question_text.slice(0, 100),
    numeric_answer: numericals[0].numeric_answer
  });

  await pool.end();
  console.log('\nDB VERIFICATION 100% SUCCESSFUL!');
}

verifyDb().catch(err => {
  console.error('DB verification failed:', err);
  process.exit(1);
});
