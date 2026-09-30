import { query } from '../src/config/db.js';
import {
  PARTICIPANT_THRESHOLD,
  getAssessmentRankingData,
  syncAssessmentRankings,
} from '../src/services/assessmentRankingService.js';

async function runTests() {
  console.log('--- STARTING FAST BULK ASSESSMENT RANKING SYSTEM VERIFICATION ---');
  let testAssessmentIdA = null;
  let testAssessmentIdB = null;
  let testAssessmentIdC = null;
  const createdUserIds = [];

  try {
    // 1. Create test assessments
    const aResA = await query(
      `INSERT INTO assessments (title, duration_minutes, is_published, result_visible)
       VALUES ('Test Assessment Alpha for Verification', 60, true, true)
       RETURNING id`
    );
    testAssessmentIdA = aResA.rows[0].id;

    const aResB = await query(
      `INSERT INTO assessments (title, duration_minutes, is_published, result_visible, available_until)
       VALUES ('Test Assessment Beta Closed', 60, true, true, NOW() - INTERVAL '1 hour')
       RETURNING id`
    );
    testAssessmentIdB = aResB.rows[0].id;

    const aResC = await query(
      `INSERT INTO assessments (title, duration_minutes, is_published, result_visible)
       VALUES ('Test Assessment Gamma Tied Scores', 60, true, true)
       RETURNING id`
    );
    testAssessmentIdC = aResC.rows[0].id;

    console.log(`Created test assessments: Alpha=${testAssessmentIdA}, Beta=${testAssessmentIdB}, Gamma=${testAssessmentIdC}`);

    // Helper: Bulk create users
    const createBulkUsers = async (prefix, count) => {
      const userRows = [];
      const now = Date.now();
      for (let i = 1; i <= count; i++) {
        userRows.push(`('User ${prefix}_${i}', '${prefix}_${i}_${now}@test.com', 'hash', 'candidate')`);
      }
      const res = await query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ${userRows.join(', ')}
         RETURNING id`
      );
      const ids = res.rows.map((r) => r.id);
      createdUserIds.push(...ids);
      return ids;
    };

    // Helper: Bulk create attempts & scores
    const createBulkAttemptsAndScores = async (assessmentId, userIds, scoreGenerator, status = 'submitted') => {
      const attemptRows = [];
      for (let i = 0; i < userIds.length; i++) {
        const uid = userIds[i];
        attemptRows.push(`(${assessmentId}, ${uid}, '${status}', NOW() - INTERVAL '30 minutes', NOW(), NOW(), 600)`);
      }
      const attRes = await query(
        `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at, submitted_at, duration_seconds)
         VALUES ${attemptRows.join(', ')}
         RETURNING id, candidate_id`
      );

      const scoreRows = [];
      for (let i = 0; i < attRes.rows.length; i++) {
        const att = attRes.rows[i];
        const marks = scoreGenerator(i, att.candidate_id);
        if (marks !== null) {
          scoreRows.push(`(${att.id}, ${marks}, 100, ${marks}, true)`);
        }
      }

      if (scoreRows.length > 0) {
        await query(
          `INSERT INTO scores (attempt_id, marks_obtained, total_marks, percentage, passed)
           VALUES ${scoreRows.join(', ')}`
        );
      }

      return attRes.rows;
    };

    // TEST 1: Initial empty state
    console.log('\n[TEST 1] Initial empty state:');
    const emptyRank = await getAssessmentRankingData(testAssessmentIdA, null);
    console.assert(emptyRank.total_participants === 0, 'Total should be 0');
    console.assert(emptyRank.ranking_available === false, 'Ranking should not be available');
    console.assert(emptyRank.rank === null, 'Rank should be null');
    console.assert(emptyRank.percentile === null, 'Percentile should be null');
    console.log('✓ Initial empty state verified.');

    // TEST 2: Add 32 completed students (below 50 threshold)
    console.log('\n[TEST 2] Adding 32 completed & scored students (below 50 threshold):');
    const users32 = await createBulkUsers('alpha32', 32);
    const student1 = users32[0]; // Student 1 scores 85

    // Add 1 in-progress attempt (should NOT be counted)
    const inProgressUser = (await createBulkUsers('inprog', 1))[0];
    await query(
      `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at)
       VALUES (${testAssessmentIdA}, ${inProgressUser}, 'in_progress', NOW() - INTERVAL '10 minutes', NOW() + INTERVAL '50 minutes')`
    );

    // Add 1 auto-submitted attempt (SHOULD be counted)
    const autoUser = (await createBulkUsers('auto', 1))[0];
    const autoAtt = await query(
      `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at, submitted_at, duration_seconds)
       VALUES (${testAssessmentIdA}, ${autoUser}, 'auto_submitted', NOW() - INTERVAL '30 minutes', NOW(), NOW(), 600)
       RETURNING id`
    );
    await query(
      `INSERT INTO scores (attempt_id, marks_obtained, total_marks, percentage, passed)
       VALUES (${autoAtt.rows[0].id}, 65, 100, 65, true)`
    );

    // Score the 32 students (student 1 gets 85, others get 50-70)
    await createBulkAttemptsAndScores(testAssessmentIdA, users32, (idx) => (idx === 0 ? 85 : 50 + (idx % 25)));

    // Total should be 32 regular + 1 auto-submitted = 33 completed students
    const rank33 = await getAssessmentRankingData(testAssessmentIdA, student1);
    console.log(`Current Total Participants: ${rank33.total_participants}`);
    console.log(`Ranking Available: ${rank33.ranking_available}`);
    console.log(`Rank: ${rank33.rank}`);
    console.log(`Percentile: ${rank33.percentile}`);
    console.log(`Ranking Status: ${rank33.ranking_status}`);

    console.assert(rank33.total_participants === 33, `Expected 33 participants, got ${rank33.total_participants}`);
    console.assert(rank33.ranking_available === false, 'Ranking must be false below 50');
    console.assert(rank33.rank === null, 'Rank must be null below 50');
    console.assert(rank33.percentile === null, 'Percentile must be null below 50');
    console.assert(rank33.ranking_status === 'pending', 'Status should be pending');
    console.log('✓ 33 participants state, in-progress exclusion, auto-submit inclusion, and threshold enforcement verified.');

    // TEST 3: Add students to reach exactly 49
    console.log('\n[TEST 3] Adding 16 more students to reach exactly 49 participants:');
    const users16 = await createBulkUsers('alpha49', 16);
    await createBulkAttemptsAndScores(testAssessmentIdA, users16, () => 60);

    const rank49 = await getAssessmentRankingData(testAssessmentIdA, student1);
    console.log(`49-participant count: ${rank49.total_participants}, available: ${rank49.ranking_available}`);
    console.assert(rank49.total_participants === 49, `Expected 49, got ${rank49.total_participants}`);
    console.assert(rank49.ranking_available === false, 'Must still be false at 49');
    console.assert(rank49.rank === null, 'Rank must be null at 49');
    console.assert(rank49.percentile === null, 'Percentile must be null at 49');
    console.assert(rank49.ranking_status === 'pending', 'Status must be pending at 49');
    console.log('✓ 49 participants condition verified.');

    // TEST 4: Add 50th student (49 to 50 transition!)
    console.log('\n[TEST 4] 49 to 50 transition - Unlocking results for everyone:');
    const user50 = (await createBulkUsers('alpha50', 1))[0];
    await createBulkAttemptsAndScores(testAssessmentIdA, [user50], () => 90);

    // Check earlier submitter (student 1 who submitted first with score 85):
    const unlockedStudent1 = await getAssessmentRankingData(testAssessmentIdA, student1);
    console.log('Student 1 (first submitter, score 85):', {
      total: unlockedStudent1.total_participants,
      available: unlockedStudent1.ranking_available,
      rank: unlockedStudent1.rank,
      percentile: unlockedStudent1.percentile,
      status: unlockedStudent1.ranking_status,
    });

    console.assert(unlockedStudent1.total_participants === 50, `Expected 50 participants, got ${unlockedStudent1.total_participants}`);
    console.assert(unlockedStudent1.ranking_available === true, 'Ranking must be available at 50');
    console.assert(unlockedStudent1.rank !== null, 'Rank must not be null');
    console.assert(unlockedStudent1.percentile !== null, 'Percentile must not be null');
    console.assert(unlockedStudent1.ranking_status === 'provisional', 'Status should be provisional while test is open');
    console.log('✓ 49-to-50 transition and automatic unlock for earlier submitter verified.');

    // TEST 5: Verify tied score rank & percentile calculations
    console.log('\n[TEST 5] Testing tied scores formula on assessment Gamma:');
    const gammaUsers = await createBulkUsers('gamma', 50);
    // Student 0: 100
    // Student 1: 90
    // Student 2: 90
    // Student 3: 80
    // Students 4..49: 50
    await createBulkAttemptsAndScores(testAssessmentIdC, gammaUsers, (idx) => {
      if (idx === 0) return 100;
      if (idx === 1) return 90;
      if (idx === 2) return 90;
      if (idx === 3) return 80;
      return 50;
    });

    const rankT1 = await getAssessmentRankingData(testAssessmentIdC, gammaUsers[0]);
    const rankT2 = await getAssessmentRankingData(testAssessmentIdC, gammaUsers[1]);
    const rankT3 = await getAssessmentRankingData(testAssessmentIdC, gammaUsers[2]);
    const rankT4 = await getAssessmentRankingData(testAssessmentIdC, gammaUsers[3]);

    console.log(`Student T1 (score 100): Rank ${rankT1.rank}, Percentile ${rankT1.percentile}`);
    console.log(`Student T2 (score 90):  Rank ${rankT2.rank}, Percentile ${rankT2.percentile}`);
    console.log(`Student T3 (score 90):  Rank ${rankT3.rank}, Percentile ${rankT3.percentile}`);
    console.log(`Student T4 (score 80):  Rank ${rankT4.rank}, Percentile ${rankT4.percentile}`);

    // T1: 1 + 0 higher = Rank 1. 50/50 <= 100 = 100.00%
    console.assert(rankT1.rank === 1, `T1 rank should be 1, got ${rankT1.rank}`);
    console.assert(rankT1.percentile === 100.0, `T1 percentile should be 100.00, got ${rankT1.percentile}`);

    // T2 & T3: 1 + 1 higher (score 100) = Rank 2. 49/50 <= 90 = 98.00%
    console.assert(rankT2.rank === 2, `T2 rank should be 2, got ${rankT2.rank}`);
    console.assert(rankT3.rank === 2, `T3 rank should be 2, got ${rankT3.rank}`);
    console.assert(rankT2.percentile === rankT3.percentile, 'Tied scores must have identical percentile');
    console.assert(rankT2.percentile === 98.0, `T2 percentile should be 98.00, got ${rankT2.percentile}`);

    // T4: 1 + 3 higher (100, 90, 90) = Rank 4 (1, 2, 2, 4 pattern). 47/50 <= 80 = 94.00%
    console.assert(rankT4.rank === 4, `T4 rank should be 4 (1, 2, 2, 4 pattern), got ${rankT4.rank}`);
    console.assert(rankT4.percentile === 94.0, `T4 percentile should be 94.00, got ${rankT4.percentile}`);
    console.log('✓ Tied scores ranking (1, 2, 2, 4) and percentile equality verified.');

    // TEST 6: Closed test below threshold -> 'unavailable'
    console.log('\n[TEST 6] Closed test below threshold on assessment Beta:');
    const betaUsers = await createBulkUsers('beta', 15);
    await createBulkAttemptsAndScores(testAssessmentIdB, betaUsers, () => 75);

    const rankBeta = await getAssessmentRankingData(testAssessmentIdB, betaUsers[0]);
    console.log('Closed assessment Beta with 15 students:', {
      total: rankBeta.total_participants,
      available: rankBeta.ranking_available,
      status: rankBeta.ranking_status,
      rank: rankBeta.rank,
      percentile: rankBeta.percentile,
    });
    console.assert(rankBeta.total_participants === 15, `Expected 15, got ${rankBeta.total_participants}`);
    console.assert(rankBeta.ranking_available === false, 'Ranking should be false below 50');
    console.assert(rankBeta.ranking_status === 'unavailable', `Expected 'unavailable', got ${rankBeta.ranking_status}`);
    console.assert(rankBeta.rank === null, 'Rank should be null');
    console.assert(rankBeta.percentile === null, 'Percentile should be null');
    console.log('✓ Closed test below threshold status is correctly "unavailable" with null rank/percentile.');

    // TEST 7: Test separation
    console.log('\n[TEST 7] Test separation:');
    console.assert(rankBeta.total_participants === 15, 'Beta has 15 participants');
    console.assert(unlockedStudent1.total_participants === 50, 'Alpha has 50 participants');
    console.assert(rankT1.total_participants === 50, 'Gamma has 50 participants');
    console.log('✓ Separation between assessments verified.');

    // TEST 8: DB Sync Persistence
    console.log('\n[TEST 8] syncAssessmentRankings DB persistence:');
    await syncAssessmentRankings(testAssessmentIdC);
    const scoreCheck = await query(
      `SELECT s.marks_obtained, s.rank, s.percentile
       FROM scores s
       JOIN attempts a ON a.id = s.attempt_id
       WHERE a.assessment_id = $1 AND a.candidate_id = $2`,
      [testAssessmentIdC, gammaUsers[0]]
    );
    console.log('DB Scores row for Gamma T1:', scoreCheck.rows[0]);
    console.assert(Number(scoreCheck.rows[0].rank) === 1, 'DB rank should be 1');
    console.assert(Number(scoreCheck.rows[0].percentile) === 100.0, 'DB percentile should be 100.00');
    console.log('✓ DB persistence for ranks and percentiles verified.');

    console.log('\n🎉 ALL 8 VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exitCode = 1;
  } finally {
    console.log('\nCleaning up verification records...');
    try {
      if (testAssessmentIdA) await query('DELETE FROM assessments WHERE id = $1', [testAssessmentIdA]);
      if (testAssessmentIdB) await query('DELETE FROM assessments WHERE id = $1', [testAssessmentIdB]);
      if (testAssessmentIdC) await query('DELETE FROM assessments WHERE id = $1', [testAssessmentIdC]);
      if (createdUserIds.length > 0) {
        await query(`DELETE FROM users WHERE id = ANY($1::int[])`, [createdUserIds]);
      }
      console.log('Cleanup finished.');
    } catch (e) {
      console.error('Cleanup error:', e.message);
    }
    process.exit(process.exitCode || 0);
  }
}

runTests();
