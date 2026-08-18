import { query } from './config/db.js';

async function inspectAll38() {
  try {
    console.log('=== SEARCHING FOR ID 38 ACROSS ALL TABLES ===');

    const tests38 = await query(`SELECT * FROM tests WHERE id = 38`);
    console.log('tests WHERE id = 38:', tests38.rows);

    const assessments38 = await query(`SELECT * FROM assessments WHERE id = 38`);
    console.log('assessments WHERE id = 38:', assessments38.rows);

    const attempts38 = await query(`SELECT * FROM attempts WHERE id = 38 OR assessment_id = 38`);
    console.log('attempts WHERE id=38 OR assessment_id=38:', attempts38.rows);

    const scores38 = await query(`SELECT * FROM scores WHERE attempt_id = 38`);
    console.log('scores WHERE attempt_id=38:', scores38.rows);

    const questions38 = await query(`SELECT id, assessment_id, question_text, bank_category, subject_id FROM questions WHERE assessment_id = 38 LIMIT 10`);
    console.log('questions WHERE assessment_id=38:', questions38.rows);

    const allAttempts = await query(`SELECT id, assessment_id, candidate_id, submitted_at FROM attempts ORDER BY id DESC LIMIT 10`);
    console.log('Latest 10 attempts:', allAttempts.rows);

    const allScores = await query(`SELECT * FROM scores ORDER BY id DESC LIMIT 10`);
    console.log('Latest 10 scores:', allScores.rows);

  } catch (err) {
    console.error('Error inspecting:', err);
  }
  process.exit(0);
}

inspectAll38();
