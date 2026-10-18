import { pool } from '../src/config/db.js';

async function verify() {
  for (const assessId of [238, 41]) {
    console.log(`\n================= VERIFYING ASSESSMENT ${assessId} =================`);
    const qCount = await pool.query('SELECT count(*) FROM questions WHERE assessment_id = $1', [assessId]);
    console.log(`Total questions: ${qCount.rows[0].count}`);

    const secRes = await pool.query('SELECT id, name, position FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC', [assessId]);
    console.log('Sections:', secRes.rows);

    const breakdown = await pool.query(`
      SELECT 
        s.name as section_name,
        q.subject,
        min(q.position) as min_pos,
        max(q.position) as max_pos,
        count(q.id) as count
      FROM questions q
      LEFT JOIN assessment_sections s ON s.id = q.section_id
      WHERE q.assessment_id = $1
      GROUP BY s.name, q.subject
      ORDER BY min_pos ASC
    `, [assessId]);

    console.log('Subject & Section breakdown:');
    console.table(breakdown.rows);

    const riccia = await pool.query(`
      SELECT q.id, q.position, q.subject, q.topic, s.name as section_name, q.original_question_number, LEFT(q.question_text, 60) as text
      FROM questions q
      LEFT JOIN assessment_sections s ON s.id = q.section_id
      WHERE q.assessment_id = $1 AND q.question_text ILIKE '%Rhizoids of Riccia%'
    `, [assessId]);
    console.log(`'Rhizoids of Riccia' in assessment ${assessId}:`, riccia.rows);
  }

  process.exit(0);
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
