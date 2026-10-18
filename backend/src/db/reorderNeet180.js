import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function reorderNeet180Assessments(clientOrPool) {
  try {
    const sqlPath = path.resolve(__dirname, 'migration_v70_reorder_neet_180_and_fix_subjects.sql');

    if (fs.existsSync(sqlPath)) {
      console.log('[reorderNeet180] Executing migration_v70 SQL...');
      const sql = fs.readFileSync(sqlPath, 'utf8');
      await clientOrPool.query(sql);
      return;
    }

    // Fallback: Reorder via JSON fixture using integer original_question_number
    const fixturePath = path.resolve(__dirname, '../../scripts/neet_180_full_mock_test_2.json');
    if (fs.existsSync(fixturePath)) {
      console.log('[reorderNeet180] Applying standard order from JSON fixture...');
      const rawJson = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

      for (const assessId of [35, 58, 235]) {
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
          const orig = q.extraction_meta?.original_question_number;
          if (!orig) continue;

          await clientOrPool.query(
            `UPDATE questions 
             SET position = $1, subject = $2, bank_category = $2, section_id = $3,
                 chapter = COALESCE($4, chapter), topic = COALESCE($5, topic)
             WHERE assessment_id = $6 
               AND (original_question_number = $7 OR (extraction_meta->>'original_question_number')::int = $7)`,
            [pos, subj, secIds[subj], q.chapter || null, q.topic || null, assessId, orig]
          );
        }
      }
      console.log('[reorderNeet180] Reordering via JSON fixture completed.');
    }
  } catch (err) {
    console.error('[reorderNeet180 warning]:', err.message);
  }
}
