import { defineConfig, devices } from '@playwright/test';
import { appBaseUrl, assertSafeAppUrl, isHeaded, loadEnvFile } from './utils/env.js';

loadEnvFile();

const baseURL = appBaseUrl();
assertSafeAppUrl(baseURL);

const retries = process.env.PW_RETRIES !== undefined ? Number(process.env.PW_RETRIES) : 1;
const workers = process.env.PW_WORKERS !== undefined ? Number(process.env.PW_WORKERS) : undefined;

export default defineConfig({
  testDir: './tests',
  testMatch: /exam-flow\.spec\.js/,
  outputDir: 'test-results',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers,
  retries,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
    ['./reporters/summary.reporter.js', { outputFile: 'reports/summary.json' }],
  ],
  use: {
    baseURL,
    headless: !isHeaded(),
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
