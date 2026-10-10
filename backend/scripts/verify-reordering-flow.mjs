import { query, withTransaction } from '../src/config/db.js';
import { signToken } from '../src/utils/token.js';

import request from 'supertest';
import app from '../src/app.js';

let adminToken = null;

async function api(path, options = {}) {
  const method = (options.method || 'GET').toLowerCase();
  let req = request(app)[method](path)
    .set('Authorization', `Bearer ${adminToken}`);
  if (options.body) {
    req = req.send(options.body);
  }
  const res = await req;
  return { status: res.status, data: res.body };
}

async function run() {
  console.log('🚀 Starting Question Reordering & Insertion Flow Verification...');

  const adminRow = await query(`SELECT id, email, role, name FROM users WHERE role = 'admin' LIMIT 1`);
  if (!adminRow.rowCount) throw new Error('No admin user found in database');
  const adminUser = adminRow.rows[0];
  adminToken = signToken({
    sub: adminUser.id,
    role: 'admin',
    email: adminUser.email,
    name: adminUser.name || 'Platform Admin',
  });
  console.log(`🔑 Authenticated as Admin ID=${adminUser.id} (${adminUser.email})`);

  let testAssessmentId = null;
  let secPhysicsId = null;
  let secChemistryId = null;
  let qP1 = null;
  let qP2 = null;
  let qP3 = null;
  let qC1 = null;
  let qC2 = null;

  try {
    // 1. Create a disposable assessment
    console.log('\n--- 1. Creating Assessment ---');
    const aRes = await api('/api/assessments', {
      method: 'POST',
      body: {
        title: 'VERIFY_REORDER_FLOW_' + Date.now(),
        description: 'Automated verification test',
        duration_minutes: 60,
        passing_score: 50,
      },
    });
    if (aRes.status !== 201) throw new Error(`Create assessment failed: ${JSON.stringify(aRes.data)}`);
    testAssessmentId = aRes.data.assessment.id;
    console.log(`✅ Assessment created: ID=${testAssessmentId}`);

    // 2. Create Sections: Physics & Chemistry
    console.log('\n--- 2. Creating Sections ---');
    const s1 = await api(`/api/assessments/${testAssessmentId}/sections`, {
      method: 'POST',
      body: { name: 'Physics', section_type: 'technical_mcq', position: 1 },
    });
    secPhysicsId = s1.data.section.id;

    const s2 = await api(`/api/assessments/${testAssessmentId}/sections`, {
      method: 'POST',
      body: { name: 'Chemistry', section_type: 'technical_mcq', position: 2 },
    });
    secChemistryId = s2.data.section.id;
    console.log(`✅ Sections created: Physics=${secPhysicsId}, Chemistry=${secChemistryId}`);

    // 3. Create 3 Physics questions and 2 Chemistry questions
    console.log('\n--- 3. Creating Questions ---');
    const q1Res = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Physics Q1: Velocity vector definition',
        question_type: 'mcq',
        section_id: secPhysicsId,
        subject: 'Physics',
        marks: 4,
        options: ['Rate of change of displacement', 'Rate of change of distance', 'Scalar speed', 'None'],
        correct_index: 0,
        original_question_number: 101,
      },
    });
    if (q1Res.status !== 201) {
      throw new Error(`Failed to create Q1: ${q1Res.status} ${JSON.stringify(q1Res.data)}`);
    }
    qP1 = q1Res.data.question;

    const q2Res = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Physics Q2: Newton second law',
        question_type: 'mcq',
        section_id: secPhysicsId,
        subject: 'Physics',
        marks: 4,
        options: ['F = ma', 'F = m/a', 'E = mc^2', 'W = Fd'],
        correct_index: 0,
        original_question_number: 102,
      },
    });
    qP2 = q2Res.data.question;

    const q3Res = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Physics Q3: Electric flux unit',
        question_type: 'mcq',
        section_id: secPhysicsId,
        subject: 'Physics',
        marks: 4,
        options: ['N m^2 / C', 'Tesla', 'Farad', 'Henry'],
        correct_index: 0,
        original_question_number: 103,
      },
    });
    qP3 = q3Res.data.question;

    const q4Res = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Chemistry Q1: Carbon atomic number',
        question_type: 'mcq',
        section_id: secChemistryId,
        subject: 'Chemistry',
        marks: 4,
        options: ['6', '12', '14', '8'],
        correct_index: 0,
        original_question_number: 104,
      },
    });
    qC1 = q4Res.data.question;

    const q5Res = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Chemistry Q2: Neutral pH',
        question_type: 'mcq',
        section_id: secChemistryId,
        subject: 'Chemistry',
        marks: 4,
        options: ['7', '0', '14', '1'],
        correct_index: 0,
        original_question_number: 105,
      },
    });
    qC2 = q5Res.data.question;

    // Verify initial sequential positions 1..5
    const initList = await api(`/api/assessments/${testAssessmentId}/questions`);
    const initPositions = initList.data.questions.map((q) => q.position);
    console.log('Initial positions:', initPositions);
    if (JSON.stringify(initPositions) !== JSON.stringify([1, 2, 3, 4, 5])) {
      throw new Error(`Expected [1,2,3,4,5], got ${JSON.stringify(initPositions)}`);
    }
    console.log('✅ Initial questions assigned consecutive positions 1..5');

    // 4. Test Reordering within section (Move Q1 to position 3 in Physics)
    console.log('\n--- 4. Reordering within section (Move Q1 down to position 3) ---');
    const reorderPayload = [
      { id: qP2.id, position: 1 },
      { id: qP3.id, position: 2 },
      { id: qP1.id, position: 3 },
      { id: qC1.id, position: 4 },
      { id: qC2.id, position: 5 },
    ];
    const reorderRes = await api(`/api/assessments/${testAssessmentId}/questions/reorder`, {
      method: 'PUT',
      body: { order: reorderPayload },
    });
    if (reorderRes.status !== 200) throw new Error(`Reorder failed: ${JSON.stringify(reorderRes.data)}`);

    const reorderedList = await api(`/api/assessments/${testAssessmentId}/questions`);
    const reorderedIds = reorderedList.data.questions.map((q) => q.id);
    const expectedIds = [qP2.id, qP3.id, qP1.id, qC1.id, qC2.id];
    if (JSON.stringify(reorderedIds) !== JSON.stringify(expectedIds)) {
      throw new Error(`Expected order ${JSON.stringify(expectedIds)}, got ${JSON.stringify(reorderedIds)}`);
    }
    // Verify original_question_number is preserved
    const movedQ1 = reorderedList.data.questions.find((q) => q.id === qP1.id);
    if (movedQ1.original_question_number !== 101 || movedQ1.position !== 3) {
      throw new Error(`Preservation failed: pos=${movedQ1.position}, orig=${movedQ1.original_question_number}`);
    }
    console.log('✅ Within-section reorder succeeded; original_question_number preserved');

    // 5. Test Partition Invariance: Cross-subject or cross-section reorder must be REJECTED
    console.log('\n--- 5. Testing cross-subject boundary rejection ---');
    const invalidPayload = [
      { id: qC1.id, position: 1 }, // Moving Chemistry question into Physics section slot
      { id: qP2.id, position: 2 },
      { id: qP3.id, position: 3 },
      { id: qP1.id, position: 4 },
      { id: qC2.id, position: 5 },
    ];
    const invalidRes = await api(`/api/assessments/${testAssessmentId}/questions/reorder`, {
      method: 'PUT',
      body: { order: invalidPayload },
    });
    if (invalidRes.status !== 400) {
      throw new Error(`Expected status 400 for cross-section move, got ${invalidRes.status}`);
    }
    console.log('✅ Cross-subject reordering correctly rejected with 400');

    // 6. Test Atomic Insertion (Insert before qP3, which is at pos 2)
    console.log('\n--- 6. Testing Atomic Insertion (Insert Before) ---');
    const insRes = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Inserted Physics Question: Kinetic Energy formula',
        question_type: 'numerical',
        section_id: secPhysicsId,
        subject: 'Physics',
        marks: 4,
        numeric_answer: 25.5,
        numerical_tolerance: 0.1,
        insert_mode: 'before',
        reference_question_id: qP3.id,
        target_position: 2,
        original_question_number: 999,
      },
    });
    if (insRes.status !== 201) throw new Error(`Insert failed: ${JSON.stringify(insRes.data)}`);
    const insertedQId = insRes.data.question.id;

    const afterInsList = await api(`/api/assessments/${testAssessmentId}/questions`);
    const afterInsPositions = afterInsList.data.questions.map((q) => q.position);
    const afterInsIds = afterInsList.data.questions.map((q) => q.id);
    console.log('After insert positions:', afterInsPositions);
    if (JSON.stringify(afterInsPositions) !== JSON.stringify([1, 2, 3, 4, 5, 6])) {
      throw new Error(`Positions not gapless consecutive: ${JSON.stringify(afterInsPositions)}`);
    }
    const expectedAfterInsIds = [qP2.id, insertedQId, qP3.id, qP1.id, qC1.id, qC2.id];
    if (JSON.stringify(afterInsIds) !== JSON.stringify(expectedAfterInsIds)) {
      throw new Error(`Ids after insert mismatch: ${JSON.stringify(afterInsIds)} vs ${JSON.stringify(expectedAfterInsIds)}`);
    }
    console.log('✅ Atomic insertion placed question at exact position and shifted subsequent questions gaplessly');

    // 7. Test Deletion and Gap Closing
    console.log('\n--- 7. Testing Deletion and Gap Closing ---');
    const delRes = await api(`/api/questions/${qP2.id}`, { method: 'DELETE' });
    if (delRes.status !== 200) throw new Error(`Delete failed: ${JSON.stringify(delRes.data)}`);

    const afterDelList = await api(`/api/assessments/${testAssessmentId}/questions`);
    const afterDelPositions = afterDelList.data.questions.map((q) => q.position);
    console.log('After delete positions:', afterDelPositions);
    if (JSON.stringify(afterDelPositions) !== JSON.stringify([1, 2, 3, 4, 5])) {
      throw new Error(`Positions after delete not closed: ${JSON.stringify(afterDelPositions)}`);
    }
    console.log('✅ Deletion closed gap, leaving consecutive 1..5 positions');

    // 8. Test Attempt Safety (Locking live tests)
    console.log('\n--- 8. Testing Attempt Protection (Safety Guard) ---');
    // Insert an attempt for this test
    await query(
      `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at)
       VALUES ($1, (SELECT id FROM users LIMIT 1), 'in_progress', NOW(), NOW() + INTERVAL '1 hour')
       ON CONFLICT (assessment_id, candidate_id) DO NOTHING`,
      [testAssessmentId]
    );

    // Verify assessment details report attempt_count and is_locked
    const checkA = await api(`/api/assessments/${testAssessmentId}`);
    if (!checkA.data.assessment.is_locked || checkA.data.assessment.attempt_count < 1) {
      throw new Error(`Expected test to be locked, got ${JSON.stringify(checkA.data.assessment)}`);
    }

    // Try to reorder -> must return 409
    const blockedReorder = await api(`/api/assessments/${testAssessmentId}/questions/reorder`, {
      method: 'PUT',
      body: {
        order: [
          { id: insertedQId, position: 1 },
          { id: qP3.id, position: 2 },
        ],
      },
    });
    if (blockedReorder.status !== 409) {
      throw new Error(`Expected 409 Conflict for reorder on locked test, got ${blockedReorder.status}`);
    }

    // Try to insert -> must return 409
    const blockedInsert = await api(`/api/assessments/${testAssessmentId}/questions`, {
      method: 'POST',
      body: {
        question_text: 'Blocked Question',
        question_type: 'mcq',
        subject: 'Physics',
        marks: 4,
        options: ['A', 'B'],
        correct_index: 0,
      },
    });
    if (blockedInsert.status !== 409) {
      throw new Error(`Expected 409 Conflict for insert on locked test, got ${blockedInsert.status}`);
    }

    // Try to delete -> must return 409
    const blockedDelete = await api(`/api/questions/${qP3.id}`, { method: 'DELETE' });
    if (blockedDelete.status !== 409) {
      throw new Error(`Expected 409 Conflict for delete on locked test, got ${blockedDelete.status}`);
    }
    console.log('✅ Attempt protection blocked reorder, insert, and delete with 409 Conflict');

    // 9. Test Duplication into Editable Draft
    console.log('\n--- 9. Testing Assessment Duplication into Draft ---');
    const dupRes = await api(`/api/assessments/${testAssessmentId}/duplicate`, { method: 'POST' });
    if (dupRes.status !== 201) throw new Error(`Duplication failed: ${JSON.stringify(dupRes.data)}`);
    const draftTest = dupRes.data.assessment;
    console.log(`✅ Duplicated test created: ID=${draftTest.id}, is_locked=${draftTest.is_locked}`);

    const draftQuestions = await api(`/api/assessments/${draftTest.id}/questions`);
    if (draftQuestions.data.questions.length !== 5) {
      throw new Error(`Expected 5 questions in duplicated draft, got ${draftQuestions.data.questions.length}`);
    }
    // Perform reorder on draft -> must succeed
    const draftReorder = await api(`/api/assessments/${draftTest.id}/questions/reorder`, {
      method: 'PUT',
      body: {
        order: draftQuestions.data.questions.map((q, idx) => ({ id: q.id, position: idx + 1 })),
      },
    });
    if (draftReorder.status !== 200) throw new Error(`Draft reorder failed: ${JSON.stringify(draftReorder.data)}`);
    console.log('✅ Duplicated draft allows full reordering without affecting locked test');

    // 10. Test Concurrency Guard (client_updated_at stale conflict)
    console.log('\n--- 10. Testing Concurrency Guard ---');
    const staleTime = new Date(Date.now() - 3600 * 1000).toISOString();
    const conflictRes = await api(`/api/assessments/${draftTest.id}/questions/reorder`, {
      method: 'PUT',
      body: {
        order: draftQuestions.data.questions.map((q, idx) => ({ id: q.id, position: idx + 1 })),
        client_updated_at: staleTime,
      },
    });
    if (conflictRes.status !== 409) {
      throw new Error(`Expected 409 Conflict for stale client_updated_at, got ${conflictRes.status}`);
    }
    console.log('✅ Stale concurrency timestamp rejected with 409 Conflict');

    // Clean up duplicated draft
    await query(`DELETE FROM assessments WHERE id = $1`, [draftTest.id]);

    console.log('\n🎉 ALL 10 VERIFICATION CHECKS PASSED PERFECTLY!\n');
  } finally {
    if (testAssessmentId) {
      await query(`DELETE FROM assessments WHERE id = $1`, [testAssessmentId]);
      console.log(`🧹 Cleaned up test assessment ID=${testAssessmentId}`);
    }
  }
}

run().catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
