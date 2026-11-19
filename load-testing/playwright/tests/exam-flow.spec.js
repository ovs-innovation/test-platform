import { test, expect } from '../fixtures/test.fixture.js';
import { missingReason, readStudent } from '../utils/credentials.js';

const student = readStudent();
const skipReason = missingReason(student);

test.describe('candidate exam flow', () => {
  test.describe.configure({ mode: 'serial' });

  let resultUrl = '';

  test.beforeEach(() => {
    test.skip(Boolean(skipReason), skipReason);
  });

  test('student login', async ({ actions }) => {
    await actions.login(student);
    await actions.logout();
  });

  test('start exam', async ({ actions, page }) => {
    await actions.login(student);
    await actions.startExam(student.assessmentId);
    await expect(page).toHaveURL(/\/exam\//);
  });

  test('answer questions', async ({ actions, examPage }) => {
    await actions.login(student);
    await actions.startExam(student.assessmentId);
    await actions.answerQuestion();
    await expect(examPage.saveAndNext).toBeVisible();
    await expect(examPage.saveAndNext).toBeEnabled();
  });

  test('skip questions', async ({ actions, examPage }) => {
    await actions.login(student);
    await actions.startExam(student.assessmentId);
    await actions.skipQuestion();
    await expect(examPage.next).toBeVisible();
    await expect(examPage.next).toBeEnabled();
  });

  test('review questions', async ({ actions, examPage }) => {
    await actions.login(student);
    await actions.startExam(student.assessmentId);
    await actions.markReview();
    await expect(examPage.markForReview).toBeVisible();
    await expect(examPage.markForReview).toBeEnabled();
  });

  test('submit exam', async ({ actions, page }) => {
    await actions.login(student);
    await actions.startExam(student.assessmentId);
    resultUrl = await actions.submitExam();
    await expect(page).toHaveURL(/\/results\//);
  });

  test('result validation', async ({ actions, page }) => {
    await actions.login(student);
    expect(resultUrl, 'submit exam stores the result URL').toMatch(/\/results\//);
    await actions.expectResult(resultUrl);
    await expect(page).toHaveURL(/\/results\//);
  });
});
