import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcome = page.getByRole('heading', { name: /Welcome back/i });
    this.signOut = page.getByRole('button', { name: 'Sign Out' });
  }

  async expectOpen() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.welcome).toBeVisible();
  }

  async logout() {
    await expect(this.signOut).toBeVisible();
    await expect(this.signOut).toBeEnabled();
    await this.signOut.click();
    await expect(this.page).toHaveURL(/\/student-login/);
  }
}
