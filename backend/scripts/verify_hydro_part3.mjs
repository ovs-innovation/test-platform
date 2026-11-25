import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HYDRO_PART3 } from './clean_hydro_part3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_official_keys.json'), 'utf8'));

console.log('=== VERIFYING HYDROCARBONS PART 3 (Q121 to Q180) ===');
if (HYDRO_PART3.length !== 60) {
  throw new Error(`Expected 60 questions, got ${HYDRO_PART3.length}`);
}

for (let i = 0; i < 60; i++) {
  const q = HYDRO_PART3[i];
  const expectedNum = 121 + i;
  if (q.qNum !== expectedNum) throw new Error(`Expected qNum ${expectedNum}, got ${q.qNum}`);
  if (!q.question || q.question.trim().length < 10) throw new Error(`Q${q.qNum} has empty/short question`);
  const officialKey = String(officialKeys[expectedNum]).trim().toUpperCase();
  const isNumerical = /^[0-9]+(\.[0-9]+)?$/.test(officialKey);

  if (isNumerical) {
    if (q.question_type !== 'numerical') throw new Error(`Q${q.qNum} should be numerical`);
    if (q.negative_marks !== 0) throw new Error(`Q${q.qNum} numerical must have negative_marks = 0`);
    if (String(q.numeric_answer).trim() !== officialKey) {
      throw new Error(`Q${q.qNum} numeric answer mismatch: got ${q.numeric_answer}, expected ${officialKey}`);
    }
  } else {
    if (q.question_type !== 'mcq') throw new Error(`Q${q.qNum} should be mcq`);
    if (q.negative_marks !== 1) throw new Error(`Q${q.qNum} mcq must have negative_marks = 1`);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Q${q.qNum} does not have exactly 4 options`);
    for (let o = 0; o < 4; o++) {
      if (!q.options[o] || q.options[o].trim().length === 0) throw new Error(`Q${q.qNum} option ${o} is empty`);
      if (/dummy|placeholder|option\s+[a-d]$/i.test(q.options[o].trim())) {
        throw new Error(`Q${q.qNum} option ${o} has dummy text: "${q.options[o]}"`);
      }
    }
    const optionLetter = ['A', 'B', 'C', 'D'][q.correct_option];
    if (!officialKey.includes(optionLetter) && !optionLetter.includes(officialKey)) {
      throw new Error(`Q${q.qNum} key mismatch: got ${optionLetter}, expected ${officialKey}`);
    }
  }
  if (!q.solution || q.solution.trim().length < 10) throw new Error(`Q${q.qNum} has empty/short solution`);
}

console.log('✅ 100% of 60 questions in Part 3 passed verification with ZERO errors!');
