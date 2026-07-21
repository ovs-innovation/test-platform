import { pool, withTransaction } from '../config/db.js';

const seedTestSeriesTests = async () => {
  try {
    await withTransaction(async (client) => {
      // Find admin user
      const adminRes = await client.query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
      if (!adminRes.rowCount) {
        console.error('No admin user found to associate with assessments.');
        return;
      }
      const adminId = adminRes.rows[0].id;

      // 1. JEE Main Practice Mock 1
      const jeeSeriesRes = await client.query("SELECT id FROM test_series WHERE slug = 'jee-main-2026'");
      if (jeeSeriesRes.rowCount) {
        const jeeId = jeeSeriesRes.rows[0].id;
        
        // Check if there are already assessments linked to this series
        const linkedJee = await client.query("SELECT COUNT(*) AS count FROM test_series_assessments WHERE test_series_id = $1", [jeeId]);
        if (parseInt(linkedJee.rows[0].count, 10) === 0) {
          // Create JEE Mock Assessment
          const mockRes = await client.query(
            `INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [
              'JEE Main Practice Mock 1',
              'Full syllabus practice mock test matching NTA standards.',
              'Instructions: Attempt all questions. Each correct MCQ gets 4 marks. No negative marking is configured in this practice mock.',
              180,
              100,
              3,
              true,
              true,
              adminId
            ]
          );
          const assessmentId = mockRes.rows[0].id;

          // Create section
          const sectionRes = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, $2, 'technical_mcq', 1) RETURNING id`,
            [assessmentId, 'Physics & Mathematics']
          );
          const sectionId = sectionRes.rows[0].id;

          // Insert questions
          const questions = [
            { text: 'A particle moves along a circular path of radius R. In one complete revolution, its displacement is:', options: ['2*pi*R', 'pi*R', 'Zero', '2*R'], correct: 2 },
            { text: 'The value of the limit as x approaches 0 of sin(3x)/x is:', options: ['1', '3', '0', 'Undefined'], correct: 1 },
            { text: 'The derivative of e^(x^2) with respect to x is:', options: ['2x * e^(x^2)', 'e^(x^2)', 'x^2 * e^(x-1)', 'e^(2x)'], correct: 0 },
            { text: 'Which of the following is a scalar quantity?', options: ['Velocity', 'Acceleration', 'Force', 'Work'], correct: 3 },
          ];

          for (let i = 0; i < questions.length; i++) {
            await client.query(
              `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
               VALUES ($1, $2, 'mcq', $3, $4, $5, 4, $6)`,
              [assessmentId, sectionId, questions[i].text, JSON.stringify(questions[i].options), questions[i].correct, i + 1]
            );
          }

          // Link to JEE series
          await client.query(
            `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
             VALUES ($1, $2, 1, 'Mock Test 1')`,
            [jeeId, assessmentId]
          );
          console.log('[seed] JEE Main Mock Test 1 created and linked.');
        } else {
          console.log('[seed] JEE Main series already has linked tests.');
        }
      }

      // 2. NEET UG Practice Mock 1
      const neetSeriesRes = await client.query("SELECT id FROM test_series WHERE slug = 'neet-ug-mock'");
      if (neetSeriesRes.rowCount) {
        const neetId = neetSeriesRes.rows[0].id;
        
        // Check if there are already assessments linked to this series
        const linkedNeet = await client.query("SELECT COUNT(*) AS count FROM test_series_assessments WHERE test_series_id = $1", [neetId]);
        if (parseInt(linkedNeet.rows[0].count, 10) === 0) {
          // Create NEET Mock Assessment
          const mockRes = await client.query(
            `INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [
              'NEET UG Practice Mock 1',
              'Full syllabus biology & chemistry-heavy practice mock test.',
              'Instructions: Attempt all questions. Each correct answer carries 4 marks.',
              200,
              180,
              3,
              true,
              true,
              adminId
            ]
          );
          const assessmentId = mockRes.rows[0].id;

          // Create section
          const sectionRes = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, $2, 'technical_mcq', 1) RETURNING id`,
            [assessmentId, 'Biology & Chemistry']
          );
          const sectionId = sectionRes.rows[0].id;

          // Insert questions
          const questions = [
            { text: 'Which cell organelle contains hydrolytic enzymes?', options: ['Ribosome', 'Lysosome', 'Centrosome', 'Mitochondria'], correct: 1 },
            { text: 'The natural reservoir of phosphorus is:', options: ['Rock', 'Fossils', 'Ocean', 'Atmosphere'], correct: 0 },
            { text: 'Double fertilization is a characteristic feature of:', options: ['Gymnosperms', 'Angiosperms', 'Algae', 'Bryophytes'], correct: 1 },
            { text: 'What is the molecular geometry of water (H2O)?', options: ['Linear', 'Bent', 'Tetrahedral', 'Trigonal Planar'], correct: 1 },
          ];

          for (let i = 0; i < questions.length; i++) {
            await client.query(
              `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
               VALUES ($1, $2, 'mcq', $3, $4, $5, 4, $6)`,
              [assessmentId, sectionId, questions[i].text, JSON.stringify(questions[i].options), questions[i].correct, i + 1]
            );
          }

          // Link to NEET series
          await client.query(
            `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
             VALUES ($1, $2, 1, 'Mock Test 1')`,
            [neetId, assessmentId]
          );
          console.log('[seed] NEET UG Mock Test 1 created and linked.');
        } else {
          console.log('[seed] NEET UG series already has linked tests.');
        }
      }

      // 3. NEET PG Practice Mock 1
      const neetPgSeriesRes = await client.query("SELECT id FROM test_series WHERE slug = 'neet-pg-mock'");
      if (neetPgSeriesRes.rowCount) {
        const neetPgId = neetPgSeriesRes.rows[0].id;
        
        // Check if there are already assessments linked to this series
        const linkedNeetPg = await client.query("SELECT COUNT(*) AS count FROM test_series_assessments WHERE test_series_id = $1", [neetPgId]);
        if (parseInt(linkedNeetPg.rows[0].count, 10) === 0) {
          // Create NEET PG Mock Assessment
          const mockRes = await client.query(
            `INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            [
              'NEET PG Practice Mock 1',
              'Full syllabus clinical scenario practice mock test.',
              'Instructions: Attempt all questions. Each correct answer carries 4 marks.',
              210,
              200,
              3,
              true,
              true,
              adminId
            ]
          );
          const assessmentId = mockRes.rows[0].id;

          // Create section
          const sectionRes = await client.query(
            `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
             VALUES ($1, $2, 'technical_mcq', 1) RETURNING id`,
            [assessmentId, 'Clinical Medicine & Sciences']
          );
          const sectionId = sectionRes.rows[0].id;

          // Insert questions
          const questions = [
            { text: 'A 45-year-old male presents with acute chest pain radiating to his left arm. The most appropriate initial action is:', options: ['Give Aspirin', 'Perform ECG', 'Order Chest X-Ray', 'Discharge home'], correct: 1 },
            { text: 'Which of the following is the drug of choice for anaphylactic shock?', options: ['Atropine', 'Dopamine', 'Epinephrine', 'Hydrocortisone'], correct: 2 },
            { text: 'A patient presents with hyperkalemia. The initial treatment to stabilize the cardiac membrane is:', options: ['Calcium Gluconate', 'Insulin with Glucose', 'Sodium Bicarbonate', 'Furosemide'], correct: 0 },
            { text: 'The primary visual cortex is located in which lobe of the brain?', options: ['Frontal', 'Parietal', 'Temporal', 'Occipital'], correct: 3 },
          ];

          for (let i = 0; i < questions.length; i++) {
            await client.query(
              `INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
               VALUES ($1, $2, 'mcq', $3, $4, $5, 4, $6)`,
              [assessmentId, sectionId, questions[i].text, JSON.stringify(questions[i].options), questions[i].correct, i + 1]
            );
          }

          // Link to NEET PG series
          await client.query(
            `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
             VALUES ($1, $2, 1, 'Mock Test 1')`,
            [neetPgId, assessmentId]
          );
          console.log('[seed] NEET PG Mock Test 1 created and linked.');
        } else {
          console.log('[seed] NEET PG series already has linked tests.');
        }
      }
    });
    console.log('[seed] Done linking test series assessments.');
  } catch (err) {
    console.error('Failed to link test series tests:', err.message);
  } finally {
    await pool.end();
  }
};

seedTestSeriesTests();
