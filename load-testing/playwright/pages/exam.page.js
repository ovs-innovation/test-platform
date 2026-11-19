import { expect } from '@playwright/test';

export class ExamPage {
  constructor(page) {
    this.page = page;
    this.saveAndNext = page.getByRole('button', { name: 'Save & Next' });
    this.markForReview = page.getByRole('button', { name: 'Mark For Review & Next' });
    this.next = page.getByRole('button', { name: 'Next >>' });
    this.submit = page.getByRole('button', { name: 'Submit', exact: true });
    this.confirmSubmit = page.getByRole('button', { name: 'Yes, submit' });
    this.windowed = page.getByRole('button', { name: 'Continue in Windowed Mode' });
  }

  async dismissOverlays() {
    if (await this.windowed.isVisible()) {
      await expect(this.windowed).toBeEnabled();
      await this.windowed.click();
      await expect(this.windowed).toBeHidden();
    }
  }

  async expectOpen() {
    await expect(this.page).toHaveURL(/\/exam\//);
    await this.dismissOverlays();
    await expect(this.saveAndNext).toBeVisible();
    await expect(this.saveAndNext).toBeEnabled();
  }

  async answer() {
    await this.dismissOverlays();
    await expect(this.saveAndNext).toBeVisible();
    await expect(this.saveAndNext).toBeEnabled();
    // TODO: Answer options have no data-testid. Their accessible name is the option text, which is not stable.
    await this.saveAndNext.click();
  }

  async skip() {
    await this.dismissOverlays();
    await expect(this.next).toBeVisible();
    await expect(this.next).toBeEnabled();
    await this.next.click();
  }

  async review() {
    await this.dismissOverlays();
    await expect(this.markForReview).toBeVisible();
    await expect(this.markForReview).toBeEnabled();
    await this.markForReview.click();
  }

  async submitExam() {
    await this.dismissOverlays();
    const submit = this.submit.first();
    await expect(submit).toBeVisible();
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(this.confirmSubmit).toBeVisible();
    await expect(this.confirmSubmit).toBeEnabled();
    await this.confirmSubmit.click();
    await expect(this.page).toHaveURL(/\/results\//);
  }
}
