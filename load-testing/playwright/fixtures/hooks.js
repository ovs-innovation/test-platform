import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { missingReason, readStudent } from '../utils/credentials.js';

const artifactsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'artifacts');

function artifactDir(testInfo) {
  const safeTitle = testInfo.title.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-|-$/g, '').slice(0, 80) || 'test';
  return path.join(artifactsRoot, testInfo.project.name, `${safeTitle}-retry-${testInfo.retry}`);
}

function autoLoginEnabled(option) {
  if (option) return true;
  const value = String(process.env.AUTO_LOGIN || '').toLowerCase();
  return value === '1' || value === 'true' || value === 'yes';
}

export function installHooks(test) {
  test.beforeEach(async ({ actions, autoLogin }) => {
    if (!autoLoginEnabled(autoLogin)) return;
    const student = readStudent();
    const reason = missingReason(student);
    test.skip(Boolean(reason), reason);
    await actions.login(student);
  });

  test.afterEach(async ({ page, diagnostics }, testInfo) => {
    const dir = artifactDir(testInfo);
    fs.mkdirSync(dir, { recursive: true });
    const consoleText = diagnostics.consoleLogs
      .map((entry) => `${entry.type}: ${entry.text}`)
      .join('\n');
    fs.writeFileSync(path.join(dir, 'console.log'), consoleText ? `${consoleText}\n` : '');
    fs.writeFileSync(path.join(dir, 'network.json'), `${JSON.stringify(diagnostics.networkFailures, null, 2)}\n`);

    const failed = testInfo.status === 'failed' || testInfo.status === 'timedOut' || testInfo.status === 'interrupted';
    if (!failed) return;
    await page.screenshot({ path: path.join(dir, 'failure.png'), fullPage: true }).catch(() => {});
  });
}
