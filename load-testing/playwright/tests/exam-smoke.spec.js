import { test, expect } from '@playwright/test';

const email = process.env.STUDENT_EMAIL || '';
const password = process.env.STUDENT_PASSWORD || '';
const assessmentId = Number(process.env.ASSESSMENT_ID || '0');
const isPlaceholder = !email
  || email === 'student@example.com'
  || !password
  || password === 'replace-me'
  || !Number.isInteger(assessmentId)
  || assessmentId <= 0;

test('candidate exam flow smoke', async ({ request }) => {
  test.skip(isPlaceholder, 'Set STUDENT_EMAIL, STUDENT_PASSWORD, and ASSESSMENT_ID in load-testing/.env');

  const login = await request.post('/api/auth/student-login', {
    data: { email, password },
  });
  expect(login.ok()).toBeTruthy();
  const loginBody = await login.json();
  const token = loginBody.accessToken || loginBody.token;
  expect(token, 'login response token').toBeTruthy();

  const auth = { Authorization: `Bearer ${token}` };

  const assessment = await request.get(`/api/assessments/available/${assessmentId}`, {
    headers: auth,
  });
  expect(assessment.ok()).toBeTruthy();
  const assessmentBody = await assessment.json();
  expect(assessmentBody.assessment).toBeTruthy();
  expect(Number(assessmentBody.assessment.id)).toBe(assessmentId);

  const started = await request.post('/api/attempts/start', {
    headers: auth,
    data: { assessment_id: assessmentId },
  });
  expect([200, 201]).toContain(started.status());
  const startedBody = await started.json();
  const attemptId = startedBody.attempt && startedBody.attempt.id;
  expect(attemptId, 'attempt id').toBeTruthy();

  const paper = await request.get(`/api/attempts/${attemptId}`, {
    headers: auth,
  });
  expect(paper.ok()).toBeTruthy();
  const paperBody = await paper.json();
  expect(Array.isArray(paperBody.questions)).toBeTruthy();
  expect(paperBody.questions.length).toBeGreaterThan(0);
  const questionId = paperBody.questions[0].id;

  const saved = await request.put(`/api/attempts/${attemptId}/answer`, {
    headers: auth,
    data: { question_id: questionId, selected_index: 0 },
  });
  expect(saved.ok()).toBeTruthy();
  expect((await saved.json()).saved).toBe(true);

  const reviewed = await request.put(`/api/attempts/${attemptId}/review`, {
    headers: auth,
    data: { question_id: questionId, marked_for_review: true },
  });
  expect(reviewed.ok()).toBeTruthy();
  expect((await reviewed.json()).marked).toBe(true);

  const submitted = await request.post(`/api/attempts/${attemptId}/submit`, {
    headers: auth,
    data: {},
  });
  expect(submitted.ok()).toBeTruthy();

  const result = await request.get(`/api/attempts/${attemptId}/result`, {
    headers: auth,
  });
  expect(result.ok()).toBeTruthy();
  const resultBody = await result.json();
  expect(resultBody.score).toBeTruthy();

  const analytics = await request.get(`/api/student/analytics/${attemptId}`, {
    headers: auth,
  });
  expect(analytics.ok()).toBeTruthy();
  const analyticsBody = await analytics.json();
  expect(analyticsBody.summary).toBeTruthy();
});
