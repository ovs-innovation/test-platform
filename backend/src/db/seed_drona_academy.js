import bcrypt from 'bcryptjs';
import { pool, query } from '../config/db.js';

export async function seedDronaAcademy() {
  console.log('=== SEEDING DRONA ACADEMY (DRON-2026) 20 NEET STUDENTS & PERFORMANCE DATA ===\n');

  try {
    // 1. Upsert Institution: Drona Acadmy
    let instRes = await query(
      `SELECT id FROM institutions WHERE code = 'DRON-2026' OR name ILIKE '%Drona Acad%' LIMIT 1`
    );

    let instId = instRes.rows[0]?.id;
    const defaultPasswordHash = await bcrypt.hash('drona123', 10);

    if (!instId) {
      const insInst = await query(
        `INSERT INTO institutions (
          name, code, email, institution_type,
          total_licenses, used_licenses, city, state, contact_person, contact_mobile,
          logo_url, logo_badge, tagline, accent_color, password_hash, raw_password, is_active
        ) VALUES (
          'Drona Acadmy', 'DRON-2026', 'director@dronaacademy.edu.in', 'School / Coaching Institute',
          200, 20, 'Kota', 'Rajasthan', 'Dr. Arvind Sharma', '+91 98201 44521',
          '/edvedum/drona-academy-logo.svg', 'DRO', 'Premier NEET & Medical Entrance Academy · Kota',
          '#4f46e5', $1, 'drona123', true
        ) RETURNING id`,
        [defaultPasswordHash]
      );
      instId = insInst.rows[0].id;
      console.log(`Created Institution: Drona Acadmy (ID: ${instId})`);
    } else {
      await query(
        `UPDATE institutions SET
          total_licenses = 200,
          used_licenses = 20,
          logo_url = '/edvedum/drona-academy-logo.svg',
          logo_badge = 'DRO',
          tagline = 'Premier NEET & Medical Entrance Academy · Kota',
          accent_color = '#4f46e5',
          password_hash = COALESCE(password_hash, $1),
          raw_password = COALESCE(raw_password, 'drona123'),
          is_active = true
        WHERE id = $2`,
        [defaultPasswordHash, instId]
      );
      console.log(`Updated Institution: Drona Acadmy (ID: ${instId})`);
    }

    // 2. Upsert Batches
    const batchesData = [
      {
        batch_name: 'NEET Achievers Batch A',
        academic_year: '2026-2027',
        class_level: 'Class 12',
        target_exam: 'NEET',
        faculty_name: 'Dr. Arvind Sharma (AIIMS Alum)',
        max_capacity: 50,
      },
      {
        batch_name: 'NEET Super 30 Elite',
        academic_year: '2026-2027',
        class_level: 'Class 12 Pass',
        target_exam: 'NEET',
        faculty_name: 'Prof. Rajesh Verma',
        max_capacity: 30,
      },
    ];

    const batchMap = {};
    for (const b of batchesData) {
      let bRes = await query(
        `SELECT id FROM batches WHERE (institution_id = $1 OR institution_id IS NULL) AND (batch_name = $2 OR name = $2) LIMIT 1`,
        [instId, b.batch_name]
      );

      if (bRes.rows.length === 0) {
        const insB = await query(
          `INSERT INTO batches (
            institution_id, batch_name, name, academic_year, class_level,
            target_exam, faculty_name, max_capacity, status
          ) VALUES ($1, $2, $2, $3, $4, $5, $6, $7, 'active') RETURNING id`,
          [instId, b.batch_name, b.academic_year, b.class_level, b.target_exam, b.faculty_name, b.max_capacity]
        );
        batchMap[b.batch_name] = insB.rows[0].id;
        console.log(`Created Batch: ${b.batch_name} (ID: ${insB.rows[0].id})`);
      } else {
        batchMap[b.batch_name] = bRes.rows[0].id;
        await query(
          `UPDATE batches SET institution_id = $1, batch_name = $2, name = $2, status = 'active' WHERE id = $3`,
          [instId, b.batch_name, bRes.rows[0].id]
        );
        console.log(`Updated Batch: ${b.batch_name} (ID: ${bRes.rows[0].id})`);
      }
    }

    // 3. 20 Student Definitions
    const students = [
      { name: 'Aarav Singhania', roll: 'DRON-2026-001', email: 'aarav.singhania@drona.edu', mobile: '+91 98201 44521', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 685, air: 142, state_rank: 8, pct: 99.85 },
      { name: 'Ananya Deshmukh', roll: 'DRON-2026-002', email: 'ananya.deshmukh@drona.edu', mobile: '+91 98192 33412', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 672, air: 288, state_rank: 14, pct: 99.68 },
      { name: 'Rohan Kulkarni', roll: 'DRON-2026-003', email: 'rohan.kulkarni@drona.edu', mobile: '+91 97654 88201', batch: 'NEET Achievers Batch A', class_level: '12th', score: 665, air: 412, state_rank: 22, pct: 99.52 },
      { name: 'Ishita Iyer', roll: 'DRON-2026-004', email: 'ishita.iyer@drona.edu', mobile: '+91 98451 90234', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 651, air: 730, state_rank: 39, pct: 99.18 },
      { name: 'Kabir Mukherjee', roll: 'DRON-2026-005', email: 'kabir.mukherjee@drona.edu', mobile: '+91 98310 77651', batch: 'NEET Achievers Batch A', class_level: '12th', score: 642, air: 985, state_rank: 51, pct: 98.92 },
      { name: 'Diya Sen', roll: 'DRON-2026-006', email: 'diya.sen@drona.edu', mobile: '+91 98305 12984', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 635, air: 1240, state_rank: 67, pct: 98.65 },
      { name: 'Aditya Nair', roll: 'DRON-2026-007', email: 'aditya.nair@drona.edu', mobile: '+91 94471 22890', batch: 'NEET Achievers Batch A', class_level: '12th', score: 628, air: 1590, state_rank: 84, pct: 98.24 },
      { name: 'Pooja Hegde', roll: 'DRON-2026-008', email: 'pooja.hegde@drona.edu', mobile: '+91 98860 34119', batch: 'NEET Achievers Batch A', class_level: '12th', score: 619, air: 2105, state_rank: 112, pct: 97.75 },
      { name: 'Vikramaditya Chauhan', roll: 'DRON-2026-009', email: 'vikram.chauhan@drona.edu', mobile: '+91 98290 88712', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 612, air: 2650, state_rank: 138, pct: 97.10 },
      { name: 'Sanya Malhotra', roll: 'DRON-2026-010', email: 'sanya.malhotra@drona.edu', mobile: '+91 98110 56230', batch: 'NEET Achievers Batch A', class_level: '12th', score: 604, air: 3200, state_rank: 170, pct: 96.45 },
      { name: 'Aryan Patel', roll: 'DRON-2026-011', email: 'aryan.patel@drona.edu', mobile: '+91 98250 11982', batch: 'NEET Achievers Batch A', class_level: '12th', score: 592, air: 4410, state_rank: 225, pct: 95.20 },
      { name: 'Meera Joshi', roll: 'DRON-2026-012', email: 'meera.joshi@drona.edu', mobile: '+91 98220 90123', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 585, air: 5180, state_rank: 270, pct: 94.35 },
      { name: 'Devansh Saxena', roll: 'DRON-2026-013', email: 'devansh.saxena@drona.edu', mobile: '+91 98390 44512', batch: 'NEET Achievers Batch A', class_level: '12th', score: 574, air: 6400, state_rank: 330, pct: 93.10 },
      { name: 'Tanvi Rao', roll: 'DRON-2026-014', email: 'tanvi.rao@drona.edu', mobile: '+91 98480 32190', batch: 'NEET Achievers Batch A', class_level: '12th', score: 561, air: 8120, state_rank: 415, pct: 91.40 },
      { name: 'Varun Sundaram', roll: 'DRON-2026-015', email: 'varun.sundaram@drona.edu', mobile: '+91 98400 77812', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 549, air: 9950, state_rank: 520, pct: 89.65 },
      { name: 'Sneha Bhattacharya', roll: 'DRON-2026-016', email: 'sneha.b@drona.edu', mobile: '+91 98300 66541', batch: 'NEET Achievers Batch A', class_level: '12th', score: 538, air: 11800, state_rank: 610, pct: 87.80 },
      { name: 'Kunal Kashyap', roll: 'DRON-2026-017', email: 'kunal.kashyap@drona.edu', mobile: '+91 94310 88231', batch: 'NEET Achievers Batch A', class_level: '12th', score: 522, air: 15200, state_rank: 790, pct: 84.50 },
      { name: 'Rhea Menon', roll: 'DRON-2026-018', email: 'rhea.menon@drona.edu', mobile: '+91 98460 11234', batch: 'NEET Super 30 Elite', class_level: '12th Pass', score: 508, air: 18600, state_rank: 940, pct: 81.30 },
      { name: 'Harshavardhan Reddy', roll: 'DRON-2026-019', email: 'harsha.reddy@drona.edu', mobile: '+91 98490 55432', batch: 'NEET Achievers Batch A', class_level: '12th', score: 489, air: 24100, state_rank: 1180, pct: 76.50 },
      { name: 'Kavya Nambiar', roll: 'DRON-2026-020', email: 'kavya.nambiar@drona.edu', mobile: '+91 94470 99876', batch: 'NEET Achievers Batch A', class_level: '12th', score: 472, air: 29500, state_rank: 1450, pct: 72.10 },
    ];

    // 4. Ensure a base test exists
    let testRes = await query(`SELECT id, title FROM tests WHERE title ILIKE '%AIETS%' LIMIT 1`);
    let testId = testRes.rows[0]?.id;

    if (!testId) {
      const insTest = await query(
        `INSERT INTO tests (title, duration_minutes, total_marks, is_active)
         VALUES ('AIETS National Mock Test #05', 180, 720, true) RETURNING id`
      );
      testId = insTest.rows[0].id;
    }

    // 5. Insert or Update all 20 students
    let count = 0;
    for (const s of students) {
      const batchId = batchMap[s.batch] || Object.values(batchMap)[0];

      let userRes = await query(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [s.email]);
      let studentId;

      if (userRes.rows.length === 0) {
        const insUser = await query(
          `INSERT INTO users (
            name, email, password_hash, role, institution_id, batch_id, roll_number
          ) VALUES ($1, $2, $3, 'candidate', $4, $5, $6) RETURNING id`,
          [s.name, s.email, defaultPasswordHash, instId, batchId, s.roll]
        );
        studentId = insUser.rows[0].id;
      } else {
        studentId = userRes.rows[0].id;
        await query(
          `UPDATE users SET
            institution_id = $1,
            batch_id = $2,
            roll_number = $3
          WHERE id = $4`,
          [instId, batchId, s.roll, studentId]
        );
      }

      // Upsert student_profiles
      await query(
        `INSERT INTO student_profiles (user_id, roll_number, target_exam, class, phone, institution_id, batch_id)
         VALUES ($1, $2, 'NEET', $3, $4, $5, $6)
         ON CONFLICT (user_id) DO UPDATE SET
           roll_number = EXCLUDED.roll_number,
           target_exam = EXCLUDED.target_exam,
           class = EXCLUDED.class,
           phone = EXCLUDED.phone,
           institution_id = EXCLUDED.institution_id,
           batch_id = EXCLUDED.batch_id`,
        [studentId, s.roll, s.class_level, s.mobile, instId, batchId]
      );

      // Upsert test_attempt for rankings and analytics
      const percentage = Number(((s.score / 720) * 100).toFixed(2));
      const submittedAt = new Date(Date.now() - (count * 3600000));

      const responses = [
        { subject: 'Biology', marks: 360, isAttempted: true, isCorrect: s.score > 550 },
        { subject: 'Chemistry', marks: 180, isAttempted: true, isCorrect: s.score > 580 },
        { subject: 'Physics', marks: 180, isAttempted: true, isCorrect: s.score > 620 },
      ];

      await query(
        `INSERT INTO test_attempts (
          test_id, student_id, score, max_marks, percentage, percentile,
          all_india_rank, institute_rank, question_responses, subject_wise_score, submitted_at
        ) VALUES ($1, $2, $3, 720, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (test_id, student_id) DO UPDATE SET
          score = EXCLUDED.score,
          max_marks = EXCLUDED.max_marks,
          percentage = EXCLUDED.percentage,
          percentile = EXCLUDED.percentile,
          all_india_rank = EXCLUDED.all_india_rank,
          institute_rank = EXCLUDED.institute_rank,
          question_responses = EXCLUDED.question_responses,
          subject_wise_score = EXCLUDED.subject_wise_score,
          submitted_at = EXCLUDED.submitted_at`,
        [testId, studentId, s.score, percentage, s.pct, s.air, count + 1, JSON.stringify(responses), JSON.stringify(responses), submittedAt]
      );

      count++;
    }

    // 6. Assign Tests to Drona Acadmy & its Batches
    const testsToAssign = [108, 126, 127];
    for (const tId of testsToAssign) {
      await query(
        `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
         SELECT $1, 'institution', $2
         WHERE NOT EXISTS (
           SELECT 1 FROM test_assignments WHERE test_id = $1 AND assigned_to_type = 'institution' AND assigned_to_id = $2
         )`,
        [tId, instId]
      );
    }

    console.log(`\nSuccessfully seeded ${count} students and performance records for Drona Acadmy!`);
  } catch (err) {
    console.error('Error during Drona Academy seeding:', err.message);
  } finally {
    await pool.end();
  }
}

// Direct execution support
if (process.argv[1]?.endsWith('seed_drona_academy.js')) {
  seedDronaAcademy().then(() => process.exit(0)).catch(() => process.exit(1));
}
