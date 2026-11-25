import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ATOM_PART1 } from './clean_atom_part1.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));

console.log('=== VERIFYING ATOM PART 1 (Q1 to Q60) ===');
if (ATOM_PART1.length !== 60) {
  throw new Error(`Expected 60 questions, got ${ATOM_PART1.length}`);
}

for (let i = 0; i < 60; i++) {
  const q = ATOM_PART1[i];
  const expectedNum = i + 1;
  if (q.qNum !== expectedNum) throw new Error(`Expected qNum ${expectedNum}, got ${q.qNum}`);
  if (!q.question || q.question.trim().length < 10) throw new Error(`Q${q.qNum} has empty/short question`);
  if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Q${q.qNum} does not have exactly 4 options`);
  for (let o = 0; o < 4; o++) {
    if (!q.options[o] || q.options[o].trim().length === 0) throw new Error(`Q${q.qNum} option ${o} is empty`);
  }
  const officialKey = String(officialKeys[expectedNum]).trim().toUpperCase();
  const optionLetter = ['A', 'B', 'C', 'D'][q.correct_option];
  if (!officialKey.includes(optionLetter) && !optionLetter.includes(officialKey)) {
    throw new Error(`Q${q.qNum} key mismatch: got ${optionLetter}, expected ${officialKey}`);
  }
  if (!q.solution || q.solution.trim().length < 10) throw new Error(`Q${q.qNum} has empty/short solution`);
}

console.log('100% of 60 questions in Part 1 passed verification with ZERO errors!');
