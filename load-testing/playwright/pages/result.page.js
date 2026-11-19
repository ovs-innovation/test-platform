import { expect } from '@playwright/test';

export class ResultPage {
  constructor(page) {
    this.page = page;
    this.scorecard = page.getByRole('button', { name: 'Print Scorecard' });
    this.received = page.getByRole('heading', { name: 'Submission Received' });
  }

  async open(resultUrl) {
    await this.page.goto(resultUrl);
    await expect(this.page).toHaveURL(/\/results\//);
  }

  async expectPublishedOrReceived() {
    await expect(this.page).toHaveURL(/\/results\//);
    await expect(this.scorecard.or(this.received)).toBeVisible();
  }
}
