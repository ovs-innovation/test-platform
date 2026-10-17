import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function reorderNeet180Assessments(clientOrPool) {
  try {
    // Check if any assessment with 180 questions has wrong ordering (e.g., Q1 is botany/banyan)
    const { rows: checkRows } = await clientOrPool.query(`
      SELECT q.assessment_id, q.question_text, q.subject
      FROM questions q
      WHERE q.assessment_id IN (35, 58, 235) AND q.position = 1
      LIMIT 10
    `);

    const needsFix = checkRows.some(
      (r) => r.question_text.toLowerCase().includes('banyan') || r.question_text.toLowerCase().includes('prop root')
    );

    if (!needsFix && checkRows.length > 0) {
      console.log('[reorderNeet180] Assessment questions are already in standard NEET CBT order.');
      return;
    }

    console.log('[reorderNeet180] Detected misaligned NEET questions. Applying standard order...');

    // Load standard ordered questions from json if available, or migration SQL
    const fixturePath = path.resolve(__dirname, '../../scripts/neet_180_full_mock_test_2.json');
    const sqlPath = path.resolve(__dirname, 'migration_v69_reorder_neet_180_questions.sql');

    if (fs.existsSync(sqlPath)) {
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await clientOrPool.query(sql);
      console.log('[reorderNeet180] Applied migration_v69 SQL successfully.');
    } else if (fs.existsSync(fixturePath)) {
      const rawJson = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      for (const assessId of [35, 58, 235]) {
        // Recreate sections
        await clientOrPool.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [assessId]);
        const s1 = await clientOrPool.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id`,
          [assessId]
        );
        const s2 = await clientOrPool.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id`,
          [assessId]
        );
        const s3 = await clientOrPool.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id`,
          [assessId]
        );
        const s4 = await clientOrPool.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id`,
          [assessId]
        );

        const secIds = {
          Physics: s1.rows[0].id,
          Chemistry: s2.rows[0].id,
          Botany: s3.rows[0].id,
          Zoology: s4.rows[0].id,
        };

        for (let i = 0; i < rawJson.length; i++) {
          const q = rawJson[i];
          const pos = i + 1;
          const subj = q.subject;
          await clientOrPool.query(
            `UPDATE questions 
             SET position = $1, subject = $2, bank_category = $2, section_id = $3
             WHERE assessment_id = $4 AND TRIM(question_text) = $5`,
            [pos, subj, secIds[subj], assessId, (q.questionText || '').trim()]
          );
        }
      }
      console.log('[reorderNeet180] Reordering via JSON fixture completed.');
    }
  } catch (err) {
    console.error('[reorderNeet180 warning]:', err.message);
  }
}
