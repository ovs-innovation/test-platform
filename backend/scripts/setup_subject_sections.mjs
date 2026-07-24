import { pool, withTransaction } from '../src/config/db.js';

async function setupSubjectWiseSections() {
  console.log('=== Setting Up Subject-Wise Sections ===');
  try {
    await withTransaction(async (client) => {
      // 1. Get all assessments
      const assessmentsRes = await client.query('SELECT id, title FROM assessments');
      
      for (const a of assessmentsRes.rows) {
        const titleLower = a.title.toLowerCase();
        
        if (titleLower.includes('jee') || titleLower.includes('physics')) {
          // JEE / Engineering Track: Physics, Chemistry, Mathematics
          // Remove old generic sections
          await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [a.id]);

          const secPhysics = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Physics', 'technical_mcq', 1) RETURNING id`, [a.id]
          );
          const secChem = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Chemistry', 'technical_mcq', 2) RETURNING id`, [a.id]
          );
          const secMath = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Mathematics', 'technical_mcq', 3) RETURNING id`, [a.id]
          );

          // Get questions for this assessment
          const qRes = await client.query('SELECT id, question_text FROM questions WHERE assessment_id = $1 ORDER BY position, id', [a.id]);
          const qList = qRes.rows;

          // Distribute questions across Physics, Chemistry, Math
          for (let i = 0; i < qList.length; i++) {
            let targetSecId = secPhysics.rows[0].id;
            if (i % 3 === 1) targetSecId = secChem.rows[0].id;
            else if (i % 3 === 2) targetSecId = secMath.rows[0].id;

            await client.query('UPDATE questions SET section_id = $1 WHERE id = $2', [targetSecId, qList[i].id]);
          }
          console.log(`[updated] Assessment "${a.title}" (ID ${a.id}) -> Subject sections: Physics, Chemistry, Mathematics`);

        } else if (titleLower.includes('neet') || titleLower.includes('bio') || titleLower.includes('clinical')) {
          // NEET / Medical Track: Botany, Zoology, Physics, Chemistry
          await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [a.id]);

          const secBotany = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Botany', 'technical_mcq', 1) RETURNING id`, [a.id]
          );
          const secZoology = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Zoology', 'technical_mcq', 2) RETURNING id`, [a.id]
          );
          const secPhy = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Physics', 'technical_mcq', 3) RETURNING id`, [a.id]
          );
          const secChem = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Chemistry', 'technical_mcq', 4) RETURNING id`, [a.id]
          );

          const qRes = await client.query('SELECT id FROM questions WHERE assessment_id = $1 ORDER BY position, id', [a.id]);
          const qList = qRes.rows;

          for (let i = 0; i < qList.length; i++) {
            let targetSecId = secBotany.rows[0].id;
            if (i % 4 === 1) targetSecId = secZoology.rows[0].id;
            else if (i % 4 === 2) targetSecId = secPhy.rows[0].id;
            else if (i % 4 === 3) targetSecId = secChem.rows[0].id;

            await client.query('UPDATE questions SET section_id = $1 WHERE id = $2', [targetSecId, qList[i].id]);
          }
          console.log(`[updated] Assessment "${a.title}" (ID ${a.id}) -> Subject sections: Botany, Zoology, Physics, Chemistry`);

        } else {
          // General / Aptitude Track: Logical Reasoning, Quantitative Aptitude, Verbal Ability
          await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [a.id]);

          const secReasoning = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Logical Reasoning', 'aptitude', 1) RETURNING id`, [a.id]
          );
          const secQuant = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Quantitative Aptitude', 'aptitude', 2) RETURNING id`, [a.id]
          );
          const secVerbal = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, 'Verbal Ability', 'aptitude', 3) RETURNING id`, [a.id]
          );

          const qRes = await client.query('SELECT id FROM questions WHERE assessment_id = $1 ORDER BY position, id', [a.id]);
          const qList = qRes.rows;

          for (let i = 0; i < qList.length; i++) {
            let targetSecId = secReasoning.rows[0].id;
            if (i % 3 === 1) targetSecId = secQuant.rows[0].id;
            else if (i % 3 === 2) targetSecId = secVerbal.rows[0].id;

            await client.query('UPDATE questions SET section_id = $1 WHERE id = $2', [targetSecId, qList[i].id]);
          }
          console.log(`[updated] Assessment "${a.title}" (ID ${a.id}) -> Subject sections: Logical Reasoning, Quantitative Aptitude, Verbal Ability`);
        }
      }

      console.log('=== Subject-Wise Sections Setup Completed ===');
    });
  } catch (err) {
    console.error('Error setting up subject sections:', err);
  } finally {
    await pool.end();
  }
}

setupSubjectWiseSections();
