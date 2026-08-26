import { pool, withTransaction } from '../src/config/db.js';

async function fixTestSeriesData() {
  console.log('--- Starting Test Series Data Repair ---');
  try {
    await withTransaction(async (client) => {
      // 1. Get admin user ID
      const adminRes = await client.query("SELECT id FROM users WHERE role = 'admin' ORDER BY id LIMIT 1");
      if (!adminRes.rowCount) {
        console.error('No admin user found.');
        return;
      }
      const adminId = adminRes.rows[0].id;

      // 2. Clean up orphan test_series_assessments references
      const deleteOrphans = await client.query(`
        DELETE FROM test_series_assessments 
        WHERE assessment_id NOT IN (SELECT id FROM assessments);
      `);
      console.log(`Cleaned up ${deleteOrphans.rowCount} orphan rows from test_series_assessments.`);

      // 3. Define tests to create for series if they lack valid published assessments
      const seriesDefinitions = [
        {
          slug: 'jee-main-2026',
          title: 'JEE Main 2026 Full Length Mock Test 1',
          desc: 'Comprehensive 180-min NEET / JEE CBT Mock covering Physics, Chemistry, and Mathematics.',
          duration: 180,
          passMarks: 100,
          label: 'Mock Test 1',
          sectionName: 'Physics, Chemistry & Math',
          questions: [
            { text: 'A particle moves along a circular path of radius R. In one complete revolution, its displacement is:', options: ['2*pi*R', 'pi*R', 'Zero', '2*R'], correct: 2, marks: 4 },
            { text: 'The value of the limit as x approaches 0 of sin(3x)/x is:', options: ['1', '3', '0', 'Undefined'], correct: 1, marks: 4 },
            { text: 'The derivative of e^(x^2) with respect to x is:', options: ['2x * e^(x^2)', 'e^(x^2)', 'x^2 * e^(x-1)', 'e^(2x)'], correct: 0, marks: 4 },
            { text: 'Which of the following is a conservative force?', options: ['Friction force', 'Gravitational force', 'Viscous force', 'Air resistance'], correct: 1, marks: 4 },
            { text: 'What is the oxidation state of Chromium in K2Cr2O7?', options: ['+3', '+5', '+6', '+7'], correct: 2, marks: 4 },
          ]
        },
        {
          slug: 'jee-main-2026',
          title: 'JEE Main 2026 Full Length Mock Test 2',
          desc: 'Practice Mock Test 2 matching latest NEET / JEE question distribution and numerical input formatting.',
          duration: 180,
          passMarks: 100,
          label: 'Mock Test 2',
          sectionName: 'Full Syllabus Section',
          questions: [
            { text: 'Work done by a central force on a particle moving in a closed path is:', options: ['Always Zero', 'Positive', 'Negative', 'Depends on speed'], correct: 0, marks: 4 },
            { text: 'Integral of 1/x dx from 1 to e is equal to:', options: ['0', '1', 'e', 'ln(2)'], correct: 1, marks: 4 },
            { text: 'pH of pure water at 25 degree C is:', options: ['6', '7', '8', '14'], correct: 1, marks: 4 },
          ]
        },
        {
          slug: 'neet-ug-mock',
          title: 'NEET UG 2026 Full Mock Test 1',
          desc: 'NCERT-based Biology, Physics, and Chemistry Mock test.',
          duration: 200,
          passMarks: 180,
          label: 'Mock Test 1',
          sectionName: 'Biology & Physical Sciences',
          questions: [
            { text: 'Which cell organelle contains hydrolytic enzymes?', options: ['Ribosome', 'Lysosome', 'Centrosome', 'Mitochondria'], correct: 1, marks: 4 },
            { text: 'The natural reservoir of phosphorus is:', options: ['Rock', 'Fossils', 'Ocean', 'Atmosphere'], correct: 0, marks: 4 },
            { text: 'Double fertilization is a characteristic feature of:', options: ['Gymnosperms', 'Angiosperms', 'Algae', 'Bryophytes'], correct: 1, marks: 4 },
            { text: 'What is the molecular geometry of water (H2O)?', options: ['Linear', 'Bent', 'Tetrahedral', 'Trigonal Planar'], correct: 1, marks: 4 },
          ]
        },
        {
          slug: 'neet-pg-mock',
          title: 'NEET PG Clinical Practice Mock 1',
          desc: 'Clinical vignette-based questions tailored for NEET PG & NEXT examination.',
          duration: 210,
          passMarks: 200,
          label: 'Mock Test 1',
          sectionName: 'Clinical Medicine & Pathology',
          questions: [
            { text: 'A 45-year-old male presents with acute chest pain. Initial ECG shows ST elevation in leads II, III, aVF. Diagnosis:', options: ['Anterior Wall MI', 'Inferior Wall MI', 'Lateral Wall MI', 'Pericarditis'], correct: 1, marks: 4 },
            { text: 'Which of the following is the drug of choice for anaphylactic shock?', options: ['Atropine', 'Dopamine', 'Epinephrine', 'Hydrocortisone'], correct: 2, marks: 4 },
            { text: 'Primary visual cortex is situated in which lobe of the cerebrum?', options: ['Frontal', 'Parietal', 'Temporal', 'Occipital'], correct: 3, marks: 4 },
          ]
        },
        {
          slug: 'jee-main-physics-pack',
          title: 'JEE Physics Mechanics & Electromagnetism Mock',
          desc: 'Targeted physics mock covering high-weightage Mechanics and Electrodynamics topics.',
          duration: 90,
          passMarks: 40,
          label: 'Physics Mock 1',
          sectionName: 'Physics Core',
          questions: [
            { text: 'Unit of magnetic flux in SI system is:', options: ['Tesla', 'Weber', 'Gauss', 'Henry'], correct: 1, marks: 4 },
            { text: 'Escape velocity from the surface of Earth is approximately:', options: ['9.8 km/s', '11.2 km/s', '42 km/s', '3 x 10^8 m/s'], correct: 1, marks: 4 },
          ]
        },
        {
          slug: 'neet-ug-super-mock',
          title: 'NEET UG All India Super Mock 1',
          desc: 'All-India level diagnostic mock test for NEET UG aspirants.',
          duration: 200,
          passMarks: 180,
          label: 'Super Mock 1',
          sectionName: 'Full Syllabus NEET',
          questions: [
            { text: 'Which hormone regulates basal metabolic rate in humans?', options: ['Insulin', 'Thyroxine', 'Adrenaline', 'Growth Hormone'], correct: 1, marks: 4 },
            { text: 'Functional unit of kidney is:', options: ['Neuron', 'Nephron', 'Axon', 'Glomerulus'], correct: 1, marks: 4 },
          ]
        },
        {
          slug: 'neet-ug-diagnostic-free',
          title: 'NEET Biology & Chemistry Diagnostic Mock',
          desc: 'Free diagnostic assessment for NEET candidates.',
          duration: 90,
          passMarks: 60,
          label: 'Diagnostic Test 1',
          sectionName: 'Biology & Chemistry',
          questions: [
            { text: 'Power house of the cell is:', options: ['Golgi body', 'Mitochondria', 'Nucleus', 'Endoplasmic Reticulum'], correct: 1, marks: 4 },
            { text: 'Universal donor blood group is:', options: ['A positive', 'AB positive', 'O negative', 'B negative'], correct: 2, marks: 4 },
          ]
        },
        {
          slug: 'neet-pg-clinical-free',
          title: 'NEET PG High Yield Clinical Diagnostic',
          desc: 'Free diagnostic mock test focused on high yield NEET PG subjects.',
          duration: 90,
          passMarks: 60,
          label: 'Diagnostic Test 1',
          sectionName: 'Clinical High Yield',
          questions: [
            { text: 'Koplik spots are pathognomonic of:', options: ['Rubella', 'Measles', 'Mumps', 'Chickenpox'], correct: 1, marks: 4 },
            { text: 'Glasgow Coma Scale minimum score is:', options: ['0', '1', '3', '15'], correct: 2, marks: 4 },
          ]
        },
        {
          slug: 'class-12-science-prep',
          title: 'Class 12 Science Board & Entrance Mock 1',
          desc: 'Mock exam covering Class 12 NCERT core concepts for Board and competitive prep.',
          duration: 120,
          passMarks: 50,
          label: 'Science Mock 1',
          sectionName: 'Class 12 Science',
          questions: [
            { text: 'SI unit of electric charge is:', options: ['Ampere', 'Coulomb', 'Volt', 'Ohm'], correct: 1, marks: 4 },
            { text: 'Formic acid is present in:', options: ['Vinegar', 'Ant sting', 'Lemon juice', 'Tamarind'], correct: 1, marks: 4 },
          ]
        },
        {
          slug: 'general-aptitude-reasoning',
          title: 'General Aptitude & Logical Reasoning Mock 1',
          desc: 'Diagnostic assessment for Quantitative Aptitude, Logical Reasoning, and Verbal ability.',
          duration: 60,
          passMarks: 30,
          label: 'Aptitude Mock 1',
          sectionName: 'Quantitative & Logical Aptitude',
          questions: [
            { text: 'Complete the series: 2, 6, 12, 20, 30, ?', options: ['36', '40', '42', '48'], correct: 2, marks: 4 },
            { text: 'If CAT is coded as 3120, how is DOG coded?', options: ['4157', '41515', '4147', '3157'], correct: 0, marks: 4 },
          ]
        }
      ];

      for (const def of seriesDefinitions) {
        const seriesRes = await client.query('SELECT id FROM test_series WHERE slug = $1', [def.slug]);
        if (!seriesRes.rowCount) continue;
        const seriesId = seriesRes.rows[0].id;

        // Check how many valid published assessments are currently linked to this series
        const checkLinked = await client.query(`
          SELECT COUNT(*)::int AS count 
          FROM test_series_assessments tsa
          JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
          WHERE tsa.test_series_id = $1 AND tsa.label = $2
        `, [seriesId, def.label]);

        if (checkLinked.rows[0].count === 0) {
          // Create assessment
          const aRes = await client.query(`
            INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
            VALUES ($1, $2, $3, $4, $5, 3, true, true, $6)
            RETURNING id
          `, [
            def.title,
            def.desc,
            'Instructions: Attempt all questions. Maintain focus and do not switch browser tabs.',
            def.duration,
            def.passMarks,
            adminId
          ]);
          const assessmentId = aRes.rows[0].id;

          // Create section
          const secRes = await client.query(`
            INSERT INTO assessment_sections (assessment_id, name, section_type, position)
            VALUES ($1, $2, 'technical_mcq', 1)
            RETURNING id
          `, [assessmentId, def.sectionName]);
          const sectionId = secRes.rows[0].id;

          // Insert questions
          let pos = 1;
          for (const q of def.questions) {
            await client.query(`
              INSERT INTO questions (assessment_id, section_id, question_type, question_text, options, correct_index, marks, position)
              VALUES ($1, $2, 'mcq', $3, $4, $5, $6, $7)
            `, [assessmentId, sectionId, q.text, JSON.stringify(q.options), q.correct, q.marks, pos++]);
          }

          // Link assessment in test_series_assessments
          const posRes = await client.query(`
            SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM test_series_assessments WHERE test_series_id = $1
          `, [seriesId]);
          const nextPos = posRes.rows[0].next_pos;

          await client.query(`
            INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (test_series_id, assessment_id) DO UPDATE SET label = EXCLUDED.label
          `, [seriesId, assessmentId, nextPos, def.label]);

          console.log(`[repair] Created and linked "${def.title}" to series "${def.slug}".`);
        }
      }

      console.log('--- Test Series Data Repair Completed Successfully ---');
    });
  } catch (err) {
    console.error('Error during data repair:', err);
  } finally {
    await pool.end();
  }
}

fixTestSeriesData();
