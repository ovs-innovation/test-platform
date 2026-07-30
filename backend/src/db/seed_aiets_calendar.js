import { pool, withTransaction } from '../config/db.js';

const aietsTests = [
  // Past tests (Jan - June 2026)
  {
    test_name: 'AIETS 01 - Physics: Kinematics & Laws of Motion',
    test_type: 'AIETS',
    test_date: '2026-01-11',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Rectilinear Motion, Projectile Motion, Relative Motion, Newton Laws of Motion, Friction.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-01-11T14:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_01_sol.pdf'
  },
  {
    test_name: 'Unit Test 01 - Organic Chemistry Fundamentals',
    test_type: 'Unit Test',
    test_date: '2026-01-25',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Chemistry: IUPAC Nomenclature, Isomerism, GOC-I (Inductive & Resonance Effects).',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-01-25T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_01_sol.pdf'
  },
  {
    test_name: 'AIETS 02 - Mathematics: Calculus I',
    test_type: 'AIETS',
    test_date: '2026-02-08',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Mathematics: Sets, Relations, Functions, Limits, Continuity & Differentiability.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-02-08T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_02_sol.pdf'
  },
  {
    test_name: 'Part Test 01 - Mechanics & Physical Chemistry',
    test_type: 'Part Test',
    test_date: '2026-02-22',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Work, Power & Energy, System of Particles. Chemistry: Mole Concept, Atomic Structure.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-02-22T18:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/pt_01_sol.pdf'
  },
  {
    test_name: 'AIETS 03 - Biology: Cell Structure & Plant Physiology',
    test_type: 'AIETS',
    test_date: '2026-03-08',
    start_time: '09:00:00',
    end_time: '12:20:00',
    duration_minutes: 200,
    syllabus: 'Biology: Cell Division, Biomolecules, Photosynthesis in Higher Plants, Respiration.',
    max_marks: 720,
    is_published: true,
    result_publish_time: '2026-03-08T14:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_03_sol.pdf'
  },
  {
    test_name: 'Unit Test 02 - Electrostatics & Current Electricity',
    test_type: 'Unit Test',
    test_date: '2026-03-22',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Physics: Electric Charges & Fields, Electrostatic Potential & Capacitance, Electric Current.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-03-22T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_02_sol.pdf'
  },
  {
    test_name: 'AIETS 04 - Full Syllabus Class 11 Revision',
    test_type: 'Cumulative Test',
    test_date: '2026-04-05',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Entire Class 11 Syllabus for Physics, Chemistry & Mathematics/Biology.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-04-05T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_04_sol.pdf'
  },
  {
    test_name: 'Unit Test 03 - Inorganic Chemistry & Chemical Bonding',
    test_type: 'Unit Test',
    test_date: '2026-04-19',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Chemistry: Periodic Table Trends, Chemical Bonding & Molecular Structure, s-Block Elements.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-04-19T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_03_sol.pdf'
  },
  {
    test_name: 'AIETS 05 - Magnetism & Electromagnetic Induction',
    test_type: 'AIETS',
    test_date: '2026-05-03',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Moving Charges & Magnetism, Magnetism & Matter, EMI, Alternating Current.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-05-03T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_05_sol.pdf'
  },
  {
    test_name: 'Part Test 02 - Calculus II & Organic Chemistry II',
    test_type: 'Part Test',
    test_date: '2026-05-17',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Mathematics: Definite Integrals, Differential Equations. Chemistry: Hydrocarbons, Haloalkanes.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-05-17T18:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/pt_02_sol.pdf'
  },
  {
    test_name: 'AIETS 06 - Optics & Wave Motion',
    test_type: 'AIETS',
    test_date: '2026-05-31',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Ray Optics & Optical Instruments, Wave Optics, Waves & Sound.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-05-31T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_06_sol.pdf'
  },
  {
    test_name: 'Unit Test 04 - Coordination Compounds & Metallurgy',
    test_type: 'Unit Test',
    test_date: '2026-06-14',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Chemistry: Coordination Chemistry, d & f Block Elements, General Principles of Extraction.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-06-14T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_04_sol.pdf'
  },
  {
    test_name: 'AIETS 07 - Modern Physics & Electronics',
    test_type: 'AIETS',
    test_date: '2026-06-28',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Dual Nature of Radiation, Atoms, Nuclei, Semiconductor Devices.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-06-28T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_07_sol.pdf'
  },

  // July 2026 (Current month)
  {
    test_name: 'Unit Test 05 - Genetics & Molecular Inheritance',
    test_type: 'Unit Test',
    test_date: '2026-07-12',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Biology: Principles of Inheritance, Molecular Basis of Inheritance, Biotechnology.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-07-12T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_05_sol.pdf'
  },
  {
    test_name: 'AIETS 08 - Mid-Session Grand Assessment',
    test_type: 'Cumulative Test',
    test_date: '2026-07-26',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Combined 50% Syllabus of Physics, Chemistry & Mathematics.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-07-26T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_08_sol.pdf'
  },
  {
    test_name: 'AIETS 09 - Live Mid-Summer Mock',
    test_type: 'AIETS',
    test_date: '2026-07-30',
    start_time: '00:00:00',
    end_time: '23:59:59',
    duration_minutes: 180,
    syllabus: 'Special Live Benchmark Mock Test for All Students.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-07-31T10:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_09_sol.pdf'
  },

  // August 2026
  {
    test_name: 'AIETS 10 - Thermodynamics & Kinetic Theory',
    test_type: 'AIETS',
    test_date: '2026-08-09',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Thermal Properties of Matter, Thermodynamics, KTG. Chemistry: Chemical Thermodynamics.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-08-09T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/aiets_10_sol.pdf'
  },
  {
    test_name: 'Unit Test 06 - Vectors & 3D Geometry',
    test_type: 'Unit Test',
    test_date: '2026-08-16',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Mathematics: Vector Algebra, 3D Coordinate Geometry, Linear Programming.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-08-16T13:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/ut_06_sol.pdf'
  },
  {
    test_name: 'Part Test 03 - Organic Reactions & Mechanisms',
    test_type: 'Part Test',
    test_date: '2026-08-23',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Chemistry: Aldehydes, Ketones, Carboxylic Acids, Amines, Biomolecules, Polymers.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-08-23T18:00:00Z',
    solution_pdf_url: null
  },

  // September 2026
  {
    test_name: 'AIETS 11 - Electricity & Magnetism Comprehensive',
    test_type: 'AIETS',
    test_date: '2026-09-06',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Electrostatics, Capacitance, Current Electricity, Magnetism, EMI & AC.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-09-06T15:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Unit Test 07 - Human Anatomy & Physiology',
    test_type: 'Unit Test',
    test_date: '2026-09-13',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Biology: Digestion, Breathing & Gas Exchange, Body Fluids, Excretory Products, Locomotion.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-09-13T13:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 12 - Algebra & Probability Benchmark',
    test_type: 'AIETS',
    test_date: '2026-09-20',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Mathematics: Matrices & Determinants, Permutations & Combinations, Probability, Complex Numbers.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-09-20T15:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Cumulative Test 01 - Pre-Final Assessment',
    test_type: 'Cumulative Test',
    test_date: '2026-09-27',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Complete 75% Syllabus Revision for All Subjects.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-09-27T18:00:00Z',
    solution_pdf_url: null
  },

  // October 2026
  {
    test_name: 'AIETS 13 - National Level All-India Open Mock 01',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-10-04',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Full NTA Syllabus - Physics, Chemistry & Mathematics.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-10-04T16:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Unit Test 08 - Physical Chemistry Solutions & Kinetics',
    test_type: 'Unit Test',
    test_date: '2026-10-11',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Chemistry: Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-10-11T13:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 14 - Optics, Waves & Modern Physics',
    test_type: 'AIETS',
    test_date: '2026-10-18',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Physics: Ray Optics, Wave Optics, Dual Nature, Atoms & Nuclei, Semiconductor Physics.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-10-18T15:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Part Test 04 - Coordinate Geometry & Vectors',
    test_type: 'Part Test',
    test_date: '2026-10-25',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Mathematics: Straight Lines, Circles, Parabola, Ellipse, Hyperbola, Vectors & 3D.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-10-25T18:00:00Z',
    solution_pdf_url: null
  },

  // November 2026
  {
    test_name: 'AIETS 15 - All-India Grand Test Series - Phase I',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-11-01',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Complete NTA Full Syllabus Test Series Phase 1.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-11-01T16:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Unit Test 09 - Organic Chemistry Complete Sprint',
    test_type: 'Unit Test',
    test_date: '2026-11-08',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Chemistry: GOC, Hydrocarbons, Haloalkanes, Alcohols, Carbonyl Compounds, Amines.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-11-08T13:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 16 - Full Syllabus Practice Mock 02',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-11-15',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Complete NTA Standard Practice Mock Test 02.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-11-15T16:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Part Test 05 - Inorganic & Physical Chemistry Review',
    test_type: 'Part Test',
    test_date: '2026-11-22',
    start_time: '14:00:00',
    end_time: '17:00:00',
    duration_minutes: 180,
    syllabus: 'Inorganic Chemistry + Physical Chemistry complete revision.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-11-22T18:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 17 - Advanced Speed & Accuracy Test',
    test_type: 'AIETS',
    test_date: '2026-11-29',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'High difficulty speed and time management test across all subjects.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-11-29T16:00:00Z',
    solution_pdf_url: null
  },

  // December 2026
  {
    test_name: 'AIETS 18 - All-India Grand Test Series - Phase II',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-12-06',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Full Syllabus Exam Simulation matching exam pattern & difficulty.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-12-06T16:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'Unit Test 10 - High Weightage Topics Quick Revision',
    test_type: 'Unit Test',
    test_date: '2026-12-13',
    start_time: '10:00:00',
    end_time: '12:00:00',
    duration_minutes: 120,
    syllabus: 'Focus on Top 15 high-weightage topics across Physics & Chemistry.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-12-13T13:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 19 - Pre-Board / Main Warm-Up Mock 01',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-12-20',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'NTA Exam Simulation Mock 01.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-12-20T16:00:00Z',
    solution_pdf_url: null
  },
  {
    test_name: 'AIETS 20 - Final All-India Grand Ranker Mock 2026',
    test_type: 'Full Syllabus Mock',
    test_date: '2026-12-27',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Grand Final All-India Mock Test for 2026 Season.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-12-27T16:00:00Z',
    solution_pdf_url: null
  },

  // Remaining tests to reach exact 39 count if needed
  {
    test_name: 'AIETS Diagnostic Mock 01',
    test_type: 'AIETS',
    test_date: '2026-01-04',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Initial diagnostic baseline mock examination.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-01-04T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/diag_01_sol.pdf'
  },
  {
    test_name: 'AIETS Diagnostic Mock 02',
    test_type: 'AIETS',
    test_date: '2026-02-01',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    syllabus: 'Mid-quarter diagnostic review examination.',
    max_marks: 300,
    is_published: true,
    result_publish_time: '2026-02-01T15:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/diag_02_sol.pdf'
  },
  {
    test_name: 'AIETS Mid-Term Speed Drill',
    test_type: 'Unit Test',
    test_date: '2026-07-20',
    start_time: '16:00:00',
    end_time: '18:00:00',
    duration_minutes: 120,
    syllabus: 'Speed & accuracy problem solving drill.',
    max_marks: 180,
    is_published: true,
    result_publish_time: '2026-07-20T19:00:00Z',
    solution_pdf_url: 'https://edvedum.com/solutions/speed_drill_sol.pdf'
  }
];

const seedAietsCalendar = async () => {
  try {
    await withTransaction(async (client) => {
      // Clear existing test entries in test_assignments & tests to avoid duplicates
      await client.query('DELETE FROM test_assignments WHERE test_id IN (SELECT id FROM tests)');
      await client.query('DELETE FROM tests');

      console.log(`[seed] Inserting ${aietsTests.length} AIETS tests into database...`);

      for (const t of aietsTests) {
        const testRes = await client.query(
          `INSERT INTO tests (
            test_name, test_type, test_date, start_time, end_time,
            duration_minutes, syllabus, max_marks, is_published,
            result_publish_time, solution_pdf_url, recommended_ebook_id
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING id`,
          [
            t.test_name,
            t.test_type,
            t.test_date,
            t.start_time,
            t.end_time,
            t.duration_minutes,
            t.syllabus,
            t.max_marks,
            t.is_published,
            t.result_publish_time,
            t.solution_pdf_url,
            null
          ]
        );

        const testId = testRes.rows[0].id;

        // Assign test to 'all' candidates
        await client.query(
          `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
           VALUES ($1, 'all', NULL)`,
          [testId]
        );
      }

      console.log(`[seed] Successfully seeded ${aietsTests.length} tests and assigned them to all students.`);
    });
  } catch (err) {
    console.error('[seed] Error seeding AIETS calendar tests:', err);
  } finally {
    await pool.end();
  }
};

seedAietsCalendar();
