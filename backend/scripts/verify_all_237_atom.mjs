import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_ATOM_QUESTIONS } from './atom_jee_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));

console.log('=== FULL VERIFICATION OF ALL 237 STRUCTURE OF ATOM JEE QUESTIONS ===');

if (ALL_ATOM_QUESTIONS.length !== 237) {
  throw new Error(`Expected exactly 237 questions, got ${ALL_ATOM_QUESTIONS.length}`);
}

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));
const expectedDiagramQs = [57, 59, 69, 71, 73, 79, 87, 90, 111, 127, 140, 141, 143, 156, 159, 162, 177, 185, 194, 200, 203, 208, 223, 224];

let mcqCount = 0;
let numCount = 0;
let diagramCount = 0;

for (let i = 0; i < 237; i++) {
  const q = ALL_ATOM_QUESTIONS[i];
  const expectedNum = i + 1;
  if (q.qNum !== expectedNum) {
    throw new Error(`Index ${i}: expected qNum ${expectedNum}, got ${q.qNum}`);
  }

  if (!q.question || q.question.trim().length < 10) {
    throw new Error(`Q${q.qNum} has missing or too short question text: "${q.question}"`);
  }

  if (!q.solution || q.solution.trim().length < 10) {
    throw new Error(`Q${q.qNum} has missing or too short solution text: "${q.solution}"`);
  }

  const officialKey = String(officialKeys[expectedNum]).trim().toUpperCase();
  const isNumerical = /^[0-9]+$/.test(officialKey);

  if (isNumerical) {
    numCount++;
    if (q.question_type !== 'numerical') {
      throw new Error(`Q${q.qNum} expected question_type 'numerical', got '${q.question_type}'`);
    }
    if (q.negative_marks !== 0) {
      throw new Error(`Q${q.qNum} numerical must have negative_marks 0, got ${q.negative_marks}`);
    }
    if (String(q.numeric_answer).trim() !== officialKey) {
      throw new Error(`Q${q.qNum} numeric answer mismatch: got ${q.numeric_answer}, expected ${officialKey}`);
    }
  } else {
    mcqCount++;
    if (q.question_type !== 'mcq') {
      throw new Error(`Q${q.qNum} expected question_type 'mcq', got '${q.question_type}'`);
    }
    if (q.negative_marks !== 1) {
      throw new Error(`Q${q.qNum} mcq must have negative_marks 1, got ${q.negative_marks}`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Q${q.qNum} must have exactly 4 options, got ${q.options ? q.options.length : 0}`);
    }
    for (let o = 0; o < 4; o++) {
      const opt = q.options[o];
      if (!opt || opt.trim().length === 0) {
        throw new Error(`Q${q.qNum} option ${o} is empty`);
      }
      if (/^option\s+[a-d]$/i.test(opt.trim())) {
        throw new Error(`Q${q.qNum} option ${o} is a dummy placeholder: "${opt}"`);
      }
    }
    const optionLetter = ['A', 'B', 'C', 'D'][q.correct_option];
    if (!officialKey.includes(optionLetter) && !optionLetter.includes(officialKey)) {
      throw new Error(`Q${q.qNum} key mismatch: got ${optionLetter}, expected ${officialKey}`);
    }
  }

  if (q.image_url) {
    diagramCount++;
    if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
      throw new Error(`Q${q.qNum} image_url is not hosted on Cloudinary: "${q.image_url}"`);
    }
  }
}

console.log(`\n=== VERIFICATION RESULTS ===`);
console.log(`Total questions: ${ALL_ATOM_QUESTIONS.length}`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numericals: ${numCount}`);
console.log(`Questions with Diagrams: ${diagramCount}`);
console.log(`Expected Diagrams Count: ${expectedDiagramQs.length}`);

for (const dQ of expectedDiagramQs) {
  const item = ALL_ATOM_QUESTIONS.find(q => q.qNum === dQ);
  if (!item || !item.image_url) {
    throw new Error(`Expected diagram for Q${dQ} not found in questions data!`);
  }
}

console.log('\nALL 237 QUESTIONS PASSED STRICT VERIFICATION 100%!');
