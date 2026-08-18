import { query } from './config/db.js';

async function inspectAssessment106() {
  try {
    console.log('=== INSPECTING ASSESSMENT 106 & ATTEMPT 38 ===');

    const assessRes = await query(`SELECT * FROM assessments WHERE id = 106`);
    console.log('assessment 106:', assessRes.rows[0]);

    const qRes = await query(`
      SELECT q.id, q.assessment_id, q.question_text, q.bank_category, q.marks, q.subject_id, q.chapter_id, s.name as subject_name, c.name as chapter_name 
      FROM questions q 
      LEFT JOIN subjects s ON s.id = q.subject_id 
      LEFT JOIN chapters c ON c.id = q.chapter_id 
      WHERE q.assessment_id = 106
    `);
    console.log(`questions count for assessment 106: ${qRes.rowCount}`);
    console.log('questions sample for 106:', qRes.rows.slice(0, 5));

    const ansRes = await query(`SELECT * FROM answers WHERE attempt_id = 38`);
    console.log(`answers count for attempt 38: ${ansRes.rowCount}`);
    console.log('answers sample for 38:', ansRes.rows.slice(0, 5));

  } catch (err) {
    console.error('Error inspecting 106:', err);
  }
  process.exit(0);
}

inspectAssessment106();
