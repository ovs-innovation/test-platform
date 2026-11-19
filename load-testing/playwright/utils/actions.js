import { expect } from '@playwright/test';

export class ExamActions {
  constructor({ page, loginPage, dashboardPage, examPage, resultPage }) {
    this.page = page;
    this.loginPage = loginPage;
    this.dashboardPage = dashboardPage;
    this.examPage = examPage;
    this.resultPage = resultPage;
  }

  async login(student) {
    await this.loginPage.signIn(student.studentId, student.password);
    await this.dashboardPage.expectOpen();
  }

  async startExam(assessmentId) {
    await this.page.goto(`/assessments/${assessmentId}/instructions`);
    await expect(this.page).toHaveURL(new RegExp(`/assessments/${assessmentId}/instructions`));
    const agree = this.page.getByRole('checkbox', { name: /I have read and understood/i });
    await expect(agree).toBeVisible();
    await expect(agree).toBeEnabled();
    await agree.check();
    const begin = this.page.getByRole('button', { name: 'I am ready to begin' });
    await expect(begin).toBeVisible();
    await expect(begin).toBeEnabled();
    await begin.click();
    await expect(this.page).toHaveURL(/\/exam\//);
    await this.examPage.expectOpen();
  }

  async answerQuestion() {
    await this.examPage.answer();
  }

  async skipQuestion() {
    await this.examPage.skip();
  }

  async markReview() {
    await this.examPage.review();
  }

  async submitExam() {
    await this.examPage.submitExam();
    return this.page.url();
  }

  async expectResult(resultUrl) {
    if (resultUrl) await this.resultPage.open(resultUrl);
    await this.resultPage.expectPublishedOrReceived();
  }

  async logout() {
    await this.dashboardPage.logout();
  }
}
