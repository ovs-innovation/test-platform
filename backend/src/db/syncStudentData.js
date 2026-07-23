import dns from 'node:dns';
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

import { pool, withTransaction } from '../config/db.js';

export async function syncStudentData() {
  console.log('[sync] Starting student data sync for active candidate accounts...');

  await withTransaction(async (client) => {
    // 1. Get candidate users
    const usersRes = await client.query(
      `SELECT id, name, email FROM users WHERE role = 'candidate'`
    );
    const candidates = usersRes.rows;

    if (!candidates.length) {
      console.log('[sync] No candidate accounts found.');
      return;
    }

    console.log(`[sync] Found ${candidates.length} candidates:`, candidates.map(c => `${c.name} (${c.email})`));

    // 2. Fetch available test series
    const seriesRes = await client.query('SELECT id, title, price, validity_days FROM test_series');
    const seriesList = seriesRes.rows;

    // 3. Fetch published assessments
    const assessmentRes = await client.query('SELECT id, title, duration_minutes, passing_marks FROM assessments WHERE is_published = true LIMIT 5');
    const assessments = assessmentRes.rows;

    for (const student of candidates) {
      const uId = student.id;
      const uEmail = student.email;

      // A. Create Student Profile if missing
      await client.query(
        `INSERT INTO student_profiles (user_id, phone, class, target_exam, city, state)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (user_id) DO UPDATE SET
           class = EXCLUDED.class,
           target_exam = EXCLUDED.target_exam`,
        [uId, `98765${String(uId).padStart(5, '0')}`, 'Class 12', 'NEET', 'New Delhi', 'Delhi']
      );

      // B. Assign Test Series Enrollments & Payments
      for (const s of seriesList) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + (s.validity_days || 365));

        // Check if enrollment already exists
        const existingEnr = await client.query(
          'SELECT id FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2',
          [uId, s.id]
        );

        if (!existingEnr.rowCount) {
          // Insert Payment Receipt
          const payRes = await client.query(
            `INSERT INTO payments (user_id, test_series_id, amount, status, razorpay_payment_id, razorpay_order_id)
             VALUES ($1, $2, $3, 'success', $4, $5)
             RETURNING id`,
            [uId, s.id, s.price || 0, `pay_edv_${uId}_${s.id}`, `order_edv_${uId}_${s.id}`]
          );

          const paymentId = payRes.rows[0]?.id || null;

          await client.query(
            `INSERT INTO student_enrollments (user_id, test_series_id, payment_id, status, purchased_at, expires_at)
             VALUES ($1, $2, $3, 'active', NOW(), $4)`,
            [uId, s.id, paymentId, expiresAt]
          );
        }
      }

      // C. Assign Candidate Invites for Proctored Assessments
      for (const a of assessments) {
        await client.query(
          `INSERT INTO candidate_invites (assessment_id, candidate_name, candidate_email, token, status, invited_at)
           VALUES ($1, $2, $3, gen_random_uuid(), 'pending', NOW())
           ON CONFLICT (assessment_id, candidate_email) DO NOTHING`,
          [a.id, student.name, uEmail]
        );
      }

      // D. Insert Notifications
      const notifItems = [
        {
          title: 'Welcome to EDVEDUM Academy',
          body: 'Explore test series and start your NTA CBT preparation journey.',
          type: 'welcome'
        },
        {
          title: 'Test series unlocked',
          body: 'You have full access to NEET UG Mock Test Pack & JEE Main Practice Series.',
          type: 'unlock'
        },
        {
          title: 'Invited Assessment Assigned',
          body: 'Your proctored diagnostic assessment is now live on your student dashboard.',
          type: 'invite'
        },
        {
          title: 'Payment Receipt Confirmed',
          body: 'Official invoice generated for your test series subscription order #EDV-98421.',
          type: 'payment'
        }
      ];

      for (const n of notifItems) {
        const existingNotif = await client.query(
          'SELECT id FROM notifications WHERE user_id = $1 AND title = $2',
          [uId, n.title]
        );
        if (!existingNotif.rowCount) {
          await client.query(
            `INSERT INTO notifications (user_id, title, body, type)
             VALUES ($1, $2, $3, $4)`,
            [uId, n.title, n.body, n.type]
          );
        }
      }

      // E. Insert Completed Mock Test Attempt & Score for Leaderboard/Analytics
      if (assessments.length > 0) {
        const targetAssessment = assessments[0];
        
        // Check if an attempt already exists
        const existingAttempt = await client.query(
          'SELECT id FROM attempts WHERE candidate_id = $1 AND assessment_id = $2',
          [uId, targetAssessment.id]
        );

        let attemptId = existingAttempt.rows[0]?.id;

        if (!attemptId) {
          const attemptRes = await client.query(
            `INSERT INTO attempts (candidate_id, assessment_id, status, started_at, ends_at, submitted_at, duration_seconds, violation_count)
             VALUES ($1, $2, 'submitted', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '30 minutes', NOW() - INTERVAL '2 days' + INTERVAL '25 minutes', 1500, 0)
             RETURNING id`,
            [uId, targetAssessment.id]
          );
          attemptId = attemptRes.rows[0].id;

          // Insert Score Record
          await client.query(
            `INSERT INTO scores (attempt_id, marks_obtained, total_marks, percentage, passed)
             VALUES ($1, 88, 100, 88.0, true)
             ON CONFLICT (attempt_id) DO NOTHING`,
            [attemptId]
          );
        }
      }
    }
  });

  console.log('[sync] Completed student data sync successfully!');
}

// Run standalone if executed directly
if (process.argv[1]?.endsWith('syncStudentData.js')) {
  syncStudentData().then(() => process.exit(0)).catch(err => {
    console.error('[sync] Error:', err);
    process.exit(1);
  });
}
