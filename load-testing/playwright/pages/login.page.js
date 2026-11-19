import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.submit = page.getByRole('button', { name: /Log In with Student ID|Sign In to/i });
  }

  async open() {
    await this.page.goto('/student-login');
    await expect(this.page).toHaveURL(/\/student-login/);
    await expect(this.submit).toBeVisible();
  }

  async signIn(studentId, password) {
    if (!studentId || studentId.includes('@')) {
      throw new Error('Login needs a student id. The screen rejects an email address.');
    }
    await this.open();
    // TODO: Student ID and Password inputs have no associated label, aria-label, or data-testid.
    // getByLabel cannot resolve them, and getByPlaceholder is not used.
    void password;
  }
}
