import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HYDRO_PART4 } from './clean_hydro_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'hydro_jee_official_keys.json'), 'utf8'));

console.log('=== VERIFYING HYDROCARBONS PART 4 (Q181 to Q241) ===');
if (HYDRO_PART4.length !== 61) {
  throw new Error(`Expected 61 questions, got ${HYDRO_PART4.length}`);
}

for (let i = 0; i < 61; i++) {
  const q = HYDRO_PART4[i];
  const expectedNum = 181 + i;
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

console.log('✅ 100% of 61 questions in Part 4 passed verification with ZERO errors!');
