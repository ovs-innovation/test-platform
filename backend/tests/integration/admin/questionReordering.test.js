import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getPlatformAdminToken, getStudentAToken } from '../../helpers/authTokens.js';
import { query } from '../../../src/db/index.js';

describe('Question Reordering, Positioning, and Attempt Safety Integration Tests', () => {
  const adminToken = getPlatformAdminToken();
  const studentToken = getStudentAToken();

  let assessmentId = null;
  let physicsSectionId = null;
  let chemistrySectionId = null;
  let qP1Id = null;
  let qP2Id = null;
  let qP3Id = null;
  let qC1Id = null;
  let qC2Id = null;

  beforeAll(async () => {
    // 1. Create a test assessment
    const aRes = await request(app)
      .post('/api/assessments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Reorder Test Assessment',
        description: 'Testing section boundaries and reordering',
        time_limit_minutes: 60,
        passing_score: 50,
      });
    expect(aRes.status).toBe(201);
    assessmentId = aRes.body.assessment.id;

    // 2. Create Physics and Chemistry sections
    const s1Res = await request(app)
      .post(`/api/assessments/${assessmentId}/sections`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Physics',
        section_type: 'technical_mcq',
        position: 1,
      });
    expect(s1Res.status).toBe(201);
    physicsSectionId = s1Res.body.section.id;

    const s2Res = await request(app)
      .post(`/api/assessments/${assessmentId}/sections`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Chemistry',
        section_type: 'technical_mcq',
        position: 2,
      });
    expect(s2Res.status).toBe(201);
    chemistrySectionId = s2Res.body.section.id;

    // 3. Create 3 Physics questions
    const q1Res = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Physics Question 1: What is velocity?',
        question_type: 'mcq',
        section_id: physicsSectionId,
        subject: 'Physics',
        marks: 4,
        options: ['Speed with direction', 'Scalar distance', 'Acceleration', 'Force'],
        correct_index: 0,
        original_question_number: 1,
      });
    qP1Id = q1Res.body.question.id;

    const q2Res = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Physics Question 2: Newton second law formula?',
        question_type: 'mcq',
        section_id: physicsSectionId,
        subject: 'Physics',
        marks: 4,
        options: ['F = ma', 'E = mc^2', 'V = IR', 'P = VI'],
        correct_index: 0,
        original_question_number: 2,
      });
    qP2Id = q2Res.body.question.id;

    const q3Res = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Physics Question 3: Unit of capacitance?',
        question_type: 'mcq',
        section_id: physicsSectionId,
        subject: 'Physics',
        marks: 4,
        options: ['Farad', 'Henry', 'Tesla', 'Coulomb'],
        correct_index: 0,
        original_question_number: 3,
      });
    qP3Id = q3Res.body.question.id;

    // 4. Create 2 Chemistry questions
    const q4Res = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Chemistry Question 1: Atomic number of Carbon?',
        question_type: 'mcq',
        section_id: chemistrySectionId,
        subject: 'Chemistry',
        marks: 4,
        options: ['6', '12', '14', '8'],
        correct_index: 0,
        original_question_number: 4,
      });
    qC1Id = q4Res.body.question.id;

    const q5Res = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Chemistry Question 2: pH of pure water at 25C?',
        question_type: 'mcq',
        section_id: chemistrySectionId,
        subject: 'Chemistry',
        marks: 4,
        options: ['7', '0', '14', '1'],
        correct_index: 0,
        original_question_number: 5,
      });
    qC2Id = q5Res.body.question.id;
  });

  it('initially assigns consecutive positions 1..5', async () => {
    const listRes = await request(app)
      .get(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(listRes.status).toBe(200);

    const questions = listRes.body.questions;
    expect(questions.length).toBe(5);
    expect(questions.map((q) => q.position)).toEqual([1, 2, 3, 4, 5]);
    expect(questions.map((q) => q.id)).toEqual([qP1Id, qP2Id, qP3Id, qC1Id, qC2Id]);
  });

  it('allows moving questions within a subject section (Move to Position / Move Down)', async () => {
    // Reorder Physics: move Q1 (qP1Id) to position 3 within Physics
    // New intended order: [qP2Id, qP3Id, qP1Id, qC1Id, qC2Id]
    const reorderPayload = [
      { id: qP2Id, position: 1 },
      { id: qP3Id, position: 2 },
      { id: qP1Id, position: 3 },
      { id: qC1Id, position: 4 },
      { id: qC2Id, position: 5 },
    ];

    const res = await request(app)
      .put(`/api/assessments/${assessmentId}/questions/reorder`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ order: reorderPayload });

    expect(res.status).toBe(200);

    const listRes = await request(app)
      .get(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`);
    const questions = listRes.body.questions;
    expect(questions.map((q) => q.id)).toEqual([qP2Id, qP3Id, qP1Id, qC1Id, qC2Id]);
    expect(questions.map((q) => q.position)).toEqual([1, 2, 3, 4, 5]);
    // Confirm original_question_number was preserved without corruption
    const qP1 = questions.find((q) => q.id === qP1Id);
    expect(qP1.original_question_number).toBe(1);
    expect(qP1.position).toBe(3);
  });

  it('rejects cross-subject or cross-section question reordering', async () => {
    // Try to move a Chemistry question into Physics section
    const invalidPayload = [
      { id: qC1Id, position: 1 }, // Moving Chemistry into Physics slot!
      { id: qP2Id, position: 2 },
      { id: qP3Id, position: 3 },
      { id: qP1Id, position: 4 },
      { id: qC2Id, position: 5 },
    ];

    const res = await request(app)
      .put(`/api/assessments/${assessmentId}/questions/reorder`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ order: invalidPayload });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/isolated to its own subject and section/i);
  });

  it('atomically inserts a question before a reference position and shifts subsequent questions', async () => {
    // Current order: [qP2Id (1), qP3Id (2), qP1Id (3), qC1Id (4), qC2Id (5)]
    // Insert new Physics question BEFORE qP3Id (which is at pos 2)
    const insRes = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Inserted Physics Question: What is power?',
        question_type: 'mcq',
        section_id: physicsSectionId,
        subject: 'Physics',
        marks: 4,
        options: ['Rate of doing work', 'Force times distance', 'Mass times volume', 'Density'],
        correct_index: 0,
        insert_mode: 'before',
        reference_question_id: qP3Id,
        target_position: 2,
      });

    expect(insRes.status).toBe(201);
    const newQId = insRes.body.question.id;

    const listRes = await request(app)
      .get(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`);
    const questions = listRes.body.questions;
    expect(questions.length).toBe(6);
    expect(questions.map((q) => q.position)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(questions.map((q) => q.id)).toEqual([qP2Id, newQId, qP3Id, qP1Id, qC1Id, qC2Id]);
  });

  it('deletes a question and guarantees consecutive gapless positions', async () => {
    // Delete qP2Id (which is currently pos 1)
    const delRes = await request(app)
      .delete(`/api/questions/${qP2Id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(delRes.status).toBe(200);

    const listRes = await request(app)
      .get(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`);
    const questions = listRes.body.questions;
    expect(questions.length).toBe(5);
    // Verifies all positions are gapless: 1, 2, 3, 4, 5
    expect(questions.map((q) => q.position)).toEqual([1, 2, 3, 4, 5]);
  });

  it('blocks reordering, insertion, and deletion when attempts exist (Attempt Safety)', async () => {
    // Create a mock student attempt for this assessment
    await query(
      `INSERT INTO attempts (assessment_id, candidate_id, status, started_at, ends_at)
       VALUES ($1, 101, 'in_progress', NOW(), NOW() + INTERVAL '1 hour')
       ON CONFLICT (assessment_id, candidate_id) DO NOTHING`,
      [assessmentId]
    );

    // Verify assessment admin endpoint reports attempt_count > 0 and is_locked = true
    const aAdminRes = await request(app)
      .get(`/api/assessments/${assessmentId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(aAdminRes.status).toBe(200);
    expect(aAdminRes.body.assessment.attempt_count).toBeGreaterThan(0);
    expect(aAdminRes.body.assessment.is_locked).toBe(true);

    // Try to reorder -> must be rejected with 409 Conflict
    const reorderRes = await request(app)
      .put(`/api/assessments/${assessmentId}/questions/reorder`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        order: [
          { id: qP3Id, position: 1 },
          { id: qP1Id, position: 2 },
        ],
      });
    expect(reorderRes.status).toBe(409);
    expect(reorderRes.body.message).toMatch(/duplicate/i);

    // Try to insert -> must be rejected with 409 Conflict
    const insertRes = await request(app)
      .post(`/api/assessments/${assessmentId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Blocked Insert Question',
        question_type: 'mcq',
        section_id: physicsSectionId,
        subject: 'Physics',
        marks: 4,
        options: ['A', 'B'],
        correct_index: 0,
      });
    expect(insertRes.status).toBe(409);

    // Try to delete -> must be rejected with 409 Conflict
    const deleteRes = await request(app)
      .delete(`/api/questions/${qP3Id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(deleteRes.status).toBe(409);
  });

  it('allows duplicating locked assessment into an editable draft', async () => {
    const dupRes = await request(app)
      .post(`/api/assessments/${assessmentId}/duplicate`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(dupRes.status).toBe(201);
    const duplicated = dupRes.body.assessment;
    expect(duplicated.id).not.toBe(assessmentId);
    expect(duplicated.is_published).toBe(false);
    expect(duplicated.attempt_count).toBe(0);
    expect(duplicated.is_locked).toBe(false);

    // Verify duplicated questions exist and can be reordered in the draft
    const dupListRes = await request(app)
      .get(`/api/assessments/${duplicated.id}/questions`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(dupListRes.status).toBe(200);
    const dupQuestions = dupListRes.body.questions;
    expect(dupQuestions.length).toBe(5);

    // Reorder in draft must succeed
    const draftReorderPayload = dupQuestions.map((q, idx) => ({
      id: q.id,
      position: idx + 1,
    }));
    const draftReorderRes = await request(app)
      .put(`/api/assessments/${duplicated.id}/questions/reorder`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ order: draftReorderPayload });
    expect(draftReorderRes.status).toBe(200);
  });

  it('detects concurrent edits via client_updated_at revision check', async () => {
    // Create an unlocked assessment
    const freshRes = await request(app)
      .post('/api/assessments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Concurrency Test Assessment',
        time_limit_minutes: 30,
        passing_score: 50,
      });
    const freshId = freshRes.body.assessment.id;

    // Create 2 questions
    const qA = await request(app)
      .post(`/api/assessments/${freshId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Question A',
        question_type: 'mcq',
        subject: 'General',
        marks: 4,
        options: ['A1', 'A2'],
        correct_index: 0,
      });
    const qB = await request(app)
      .post(`/api/assessments/${freshId}/questions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        question_text: 'Question B',
        question_type: 'mcq',
        subject: 'General',
        marks: 4,
        options: ['B1', 'B2'],
        correct_index: 0,
      });

    // Provide a stale client_updated_at (e.g. 1 hour ago)
    const staleTime = new Date(Date.now() - 3600 * 1000).toISOString();
    const conflictRes = await request(app)
      .put(`/api/assessments/${freshId}/questions/reorder`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        order: [
          { id: qB.body.question.id, position: 1 },
          { id: qA.body.question.id, position: 2 },
        ],
        client_updated_at: staleTime,
      });

    expect(conflictRes.status).toBe(409);
    expect(conflictRes.body.message).toMatch(/modified by another session/i);
  });
});
