import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(here, '..', '..', '.env');

const blockedHosts = [
  'edvedum.com',
  'www.edvedum.com',
  'cbt.prosperrainfra.com',
];

export function loadEnvFile() {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

export function appBaseUrl() {
  return process.env.PLAYWRIGHT_BASE_URL || process.env.APP_URL || 'http://localhost:5173';
}

export function assertSafeAppUrl(raw) {
  let host = '';
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch {
    throw new Error(`PLAYWRIGHT_BASE_URL is not a valid URL: ${raw}`);
  }
  if (blockedHosts.includes(host)) {
    throw new Error(`Refusing to run Playwright against ${host}`);
  }
}

export function isHeaded() {
  const value = String(process.env.HEADED || '').toLowerCase();
  return value === '1' || value === 'true' || value === 'yes';
}
