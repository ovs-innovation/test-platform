import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.page.js';
import { ExamPage } from '../pages/exam.page.js';
import { ResultPage } from '../pages/result.page.js';
import { ExamActions } from '../utils/actions.js';
import { installHooks } from './hooks.js';

export const test = base.extend({
  autoLogin: [false, { option: true }],
  diagnostics: async ({ page }, use) => {
    const consoleLogs = [];
    const networkFailures = [];
    const onConsole = (message) => {
      consoleLogs.push({ type: message.type(), text: message.text() });
    };
    const onRequestFailed = (request) => {
      networkFailures.push({
        url: request.url(),
        method: request.method(),
        error: request.failure()?.errorText || 'request failed',
      });
    };
    const onResponse = (response) => {
      if (response.status() < 400) return;
      networkFailures.push({
        url: response.url(),
        method: response.request().method(),
        status: response.status(),
      });
    };
    page.on('console', onConsole);
    page.on('requestfailed', onRequestFailed);
    page.on('response', onResponse);
    await use({ consoleLogs, networkFailures });
    page.off('console', onConsole);
    page.off('requestfailed', onRequestFailed);
    page.off('response', onResponse);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  examPage: async ({ page }, use) => {
    await use(new ExamPage(page));
  },
  resultPage: async ({ page }, use) => {
    await use(new ResultPage(page));
  },
  actions: async ({ page, loginPage, dashboardPage, examPage, resultPage }, use) => {
    await use(new ExamActions({ page, loginPage, dashboardPage, examPage, resultPage }));
  },
});

installHooks(test);

export { expect };
