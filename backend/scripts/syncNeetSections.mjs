import { pool, withTransaction } from '../src/config/db.js';

async function syncNeetSections() {
  console.log('=== Syncing NEET Sections (Physics, Chemistry, Botany, Zoology) ===');
  try {
    await withTransaction(async (client) => {
      // Find all NEET assessments
      const assessRes = await client.query(`
        SELECT a.id, a.title, COUNT(q.id)::int AS question_count
        FROM assessments a
        LEFT JOIN tests t ON t.id = a.id
        LEFT JOIN questions q ON q.assessment_id = a.id
        WHERE a.title ILIKE '%NEET%' 
           OR COALESCE(t.test_name, '') ILIKE '%NEET%'
           OR COALESCE(t.syllabus, '') ILIKE '%NEET%'
        GROUP BY a.id, a.title
      `);

      for (const a of assessRes.rows) {
        console.log(`Processing NEET Assessment ID ${a.id}: "${a.title}" (${a.question_count} questions)`);

        // Standardize question subjects based on count and position
        if (a.question_count >= 170 && a.question_count <= 190) {
          // 180 Questions: Physics (1-45), Chemistry (46-90), Botany (91-135), Zoology (136-180)
          await client.query(`
            UPDATE questions
            SET 
              subject = CASE 
                WHEN position >= 1 AND position <= 45 THEN 'Physics'
                WHEN position >= 46 AND position <= 90 THEN 'Chemistry'
                WHEN position >= 91 AND position <= 135 THEN 'Botany'
                WHEN position >= 136 AND position <= 180 THEN 'Zoology'
                ELSE subject
              END,
              bank_category = CASE 
                WHEN position >= 1 AND position <= 45 THEN 'Physics'
                WHEN position >= 46 AND position <= 90 THEN 'Chemistry'
                WHEN position >= 91 AND position <= 135 THEN 'Botany'
                WHEN position >= 136 AND position <= 180 THEN 'Zoology'
                ELSE bank_category
              END
            WHERE assessment_id = $1
          `, [a.id]);
        } else if (a.question_count >= 195 && a.question_count <= 205) {
          // 200 Questions: Physics (1-50), Chemistry (51-100), Botany (101-150), Zoology (151-200)
          await client.query(`
            UPDATE questions
            SET 
              subject = CASE 
                WHEN position >= 1 AND position <= 50 THEN 'Physics'
                WHEN position >= 51 AND position <= 100 THEN 'Chemistry'
                WHEN position >= 101 AND position <= 150 THEN 'Botany'
                WHEN position >= 151 AND position <= 200 THEN 'Zoology'
                ELSE subject
              END,
              bank_category = CASE 
                WHEN position >= 1 AND position <= 50 THEN 'Physics'
                WHEN position >= 51 AND position <= 100 THEN 'Chemistry'
                WHEN position >= 101 AND position <= 150 THEN 'Botany'
                WHEN position >= 151 AND position <= 200 THEN 'Zoology'
                ELSE bank_category
              END
            WHERE assessment_id = $1
          `, [a.id]);
        }

        // Divide any remaining Biology questions: first half Botany, second half Zoology
        await client.query(`
          WITH bio_ranked AS (
            SELECT 
              id,
              ROW_NUMBER() OVER (ORDER BY position ASC, id ASC) AS bio_rank,
              COUNT(*) OVER () AS total_bio
            FROM questions
            WHERE assessment_id = $1
              AND (LOWER(COALESCE(subject, '')) = 'biology' OR LOWER(COALESCE(bank_category, '')) = 'biology')
          )
          UPDATE questions q
          SET 
            subject = CASE WHEN br.bio_rank <= CEIL(br.total_bio::numeric / 2.0) THEN 'Botany' ELSE 'Zoology' END,
            bank_category = CASE WHEN br.bio_rank <= CEIL(br.total_bio::numeric / 2.0) THEN 'Botany' ELSE 'Zoology' END
          FROM bio_ranked br
          WHERE q.id = br.id
        `, [a.id]);

        // Clean & Recreate standard assessment_sections
        await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [a.id]);

        const secPhysics = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id`, [a.id]
        );
        const secChemistry = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id`, [a.id]
        );
        const secBotany = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id`, [a.id]
        );
        const secZoology = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id`, [a.id]
        );

        // Link question section_id
        await client.query('UPDATE questions SET section_id = $1 WHERE assessment_id = $2 AND LOWER(subject) = \'physics\'', [secPhysics.rows[0].id, a.id]);
        await client.query('UPDATE questions SET section_id = $1 WHERE assessment_id = $2 AND LOWER(subject) = \'chemistry\'', [secChemistry.rows[0].id, a.id]);
        await client.query('UPDATE questions SET section_id = $1 WHERE assessment_id = $2 AND LOWER(subject) = \'botany\'', [secBotany.rows[0].id, a.id]);
        await client.query('UPDATE questions SET section_id = $1 WHERE assessment_id = $2 AND LOWER(subject) = \'zoology\'', [secZoology.rows[0].id, a.id]);

        // Update tests subjects jsonb
        await client.query(`
          UPDATE tests
          SET subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb
          WHERE id = $1
        `, [a.id]);

        console.log(`[synced] Assessment ID ${a.id} successfully updated with Botany & Zoology sections.`);
      }
    });
    console.log('=== All NEET Assessment Sections Synced Successfully ===');
  } catch (err) {
    console.error('Error syncing NEET sections:', err);
  } finally {
    await pool.end();
  }
}

syncNeetSections();
