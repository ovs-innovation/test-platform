import { pool } from '../src/config/db.js';

async function verify() {
  console.log('=== VERIFYING CHEMICAL KINETICS IN NEON DB ===');
  
  const countRes = await pool.query(`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE question_type = 'mcq') as mcqs,
      COUNT(*) FILTER (WHERE question_type = 'numerical') as numericals,
      COUNT(*) FILTER (WHERE image_url IS NOT NULL) as with_diagrams,
      COUNT(*) FILTER (WHERE status = 'available') as available,
      COUNT(*) FILTER (WHERE options::text LIKE '%Option (B)%' OR options::text LIKE '%Option (C)%') as with_placeholders
    FROM question_bank
    WHERE exam_type = 'JEE' AND (chapter_id = 21 OR LOWER(chapter) = 'chemical kinetics')
  `);

  console.log('Database Stats for Chemical Kinetics JEE:', countRes.rows[0]);

  // Sample question with diagram
  const diagSample = await pool.query(`
    SELECT id, question_text, question_type, options, correct_index, numeric_answer, image_url, solution
    FROM question_bank
    WHERE exam_type = 'JEE' AND chapter_id = 21 AND image_url IS NOT NULL
    ORDER BY id ASC
    LIMIT 2
  `);

  console.log('\n--- Sample Diagram Question ---');
  console.log(diagSample.rows[0]);

  // Sample numerical question
  const numSample = await pool.query(`
    SELECT id, question_text, question_type, numeric_answer, image_url, solution
    FROM question_bank
    WHERE exam_type = 'JEE' AND chapter_id = 21 AND question_type = 'numerical'
    ORDER BY id ASC
    LIMIT 1
  `);

  console.log('\n--- Sample Numerical Question ---');
  console.log(numSample.rows[0]);

  // Check all chapters in Chemistry JEE
  const chemChapters = await pool.query(`
    SELECT 
      c.id, c.name, 
      COUNT(qb.id) as question_count
    FROM chapters c
    LEFT JOIN question_bank qb ON qb.chapter_id = c.id AND qb.exam_type = 'JEE'
    WHERE c.subject_id = 10
    GROUP BY c.id, c.name
    HAVING COUNT(qb.id) > 0
    ORDER BY question_count DESC
  `);

  console.log('\nActive JEE Chemistry Chapters in DB:');
  chemChapters.rows.forEach(r => console.log(`  Chapter ID ${r.id}: "${r.name}" -> ${r.question_count} questions`));

  await pool.end();
}

verify().catch(console.error);
