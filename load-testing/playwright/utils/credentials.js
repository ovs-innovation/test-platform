import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile } from './env.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, '..', 'data');

const emptyPasswords = new Set(['', 'replace-me', 'changeme', 'password']);

function present(value) {
  return value !== undefined && value !== null && String(value).trim() !== '';
}

function readDataFile() {
  loadEnvFile();
  const explicit = process.env.PLAYWRIGHT_DATA;
  const local = path.join(dataDir, 'students.json');
  const chosen = explicit || (fs.existsSync(local) ? local : '');
  if (!chosen) return {};
  const parsed = JSON.parse(fs.readFileSync(chosen, 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Playwright test data must be a JSON object with studentId, password, and assessmentId');
  }
  return parsed;
}

export function readStudent() {
  loadEnvFile();
  const file = readDataFile();
  const studentId = present(process.env.STUDENT_ID)
    ? String(process.env.STUDENT_ID).trim()
    : (present(file.studentId) ? String(file.studentId).trim() : '');
  const password = present(process.env.STUDENT_PASSWORD)
    ? String(process.env.STUDENT_PASSWORD)
    : (present(file.password) ? String(file.password) : '');
  const assessmentRaw = present(process.env.ASSESSMENT_ID)
    ? process.env.ASSESSMENT_ID
    : file.assessmentId;
  const assessmentId = Number(assessmentRaw || 0);
  return { studentId, password, assessmentId };
}

export function missingReason(student) {
  const email = String(process.env.STUDENT_EMAIL || '');
  if (!student.studentId) {
    if (email.includes('@')) {
      return 'The student login screen rejects an email address. Set STUDENT_ID, or studentId in playwright test data.';
    }
    return 'Set STUDENT_ID, or studentId in load-testing/playwright/data/students.json';
  }
  if (student.studentId.includes('@')) {
    return 'STUDENT_ID contains an email address. The login screen needs the student id, not an email.';
  }
  if (!student.password || emptyPasswords.has(student.password)) {
    return 'Set STUDENT_PASSWORD, or password in playwright test data.';
  }
  if (!Number.isInteger(student.assessmentId) || student.assessmentId <= 0) {
    return 'Set ASSESSMENT_ID, or assessmentId in playwright test data.';
  }
  return '';
}
