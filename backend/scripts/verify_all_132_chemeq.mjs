import { ALL_CHEMEQ_JEE_PYQ_QUESTIONS } from './chemeq_jee_pyq_questions_data.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_official_keys.json'), 'utf8'));
const diagrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_diagram_urls.json'), 'utf8'));

console.log('====================================================');
console.log('VERIFYING ALL 132 CHEMICAL EQUILIBRIUM JEE QUESTIONS');
console.log('====================================================');

let errors = 0;
let mcqCount = 0;
let numCount = 0;
let diagramCount = 0;

if (ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length !== 132) {
  console.error(`FATAL: Expected 132 questions, got ${ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length}`);
  errors++;
}

for (let i = 0; i < ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length; i++) {
  const q = ALL_CHEMEQ_JEE_PYQ_QUESTIONS[i];
  const expectedNum = i + 1;
  const officialKey = keys[String(expectedNum)];

  if (q.qNum !== expectedNum) {
    console.error(`Question number mismatch at index ${i}: expected ${expectedNum}, got ${q.qNum}`);
    errors++;
  }

  if (q.category !== 'Chemistry' || q.chapter !== 'Chemical Equilibrium' || q.exam_type !== 'JEE') {
    console.error(`Metadata mismatch at Q${q.qNum}:`, { category: q.category, chapter: q.chapter, exam_type: q.exam_type });
    errors++;
  }

  if (q.image_url) {
    diagramCount++;
    if (!q.solution_image_url) {
      console.error(`Missing solution_image_url for diagram Q${q.qNum}`);
      errors++;
    }
  }

  if (['A', 'B', 'C', 'D'].includes(officialKey)) {
    mcqCount++;
    if (q.question_type !== 'mcq') {
      console.error(`Q${q.qNum}: Expected 'mcq', got '${q.question_type}'`);
      errors++;
    }
    const expectedOpt = { A: 0, B: 1, C: 2, D: 3 }[officialKey];
    if (q.correct_option !== expectedOpt) {
      console.error(`Q${q.qNum}: Answer key mismatch! Expected ${officialKey} (${expectedOpt}), got ${q.correct_option}`);
      errors++;
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${q.qNum}: Options array must have length 4, got`, q.options);
      errors++;
    } else {
      for (let optIdx = 0; optIdx < 4; optIdx++) {
        const opt = q.options[optIdx];
        if (!opt || opt.trim().length === 0) {
          console.error(`Q${q.qNum}: Option ${optIdx} is empty!`);
          errors++;
        }
        if (/^Option\s*\([A-D]\)$/i.test(opt.trim())) {
          console.error(`Q${q.qNum}: Dummy option detected: "${opt}"`);
          errors++;
        }
      }
    }
  } else {
    numCount++;
    if (q.question_type !== 'numerical') {
      console.error(`Q${q.qNum}: Expected 'numerical', got '${q.question_type}'`);
      errors++;
    }
    if (q.correct_option !== null) {
      console.error(`Q${q.qNum}: Numerical question must have correct_option null, got ${q.correct_option}`);
      errors++;
    }
    if (String(q.numeric_answer) !== officialKey) {
      console.error(`Q${q.qNum}: Numeric answer mismatch! Expected ${officialKey}, got ${q.numeric_answer}`);
      errors++;
    }
    if (q.options && q.options.length > 0) {
      console.error(`Q${q.qNum}: Numerical question must have empty options, got`, q.options);
      errors++;
    }
  }

  if (!q.question || q.question.trim().length < 5) {
    console.error(`Q${q.qNum}: Question stem is too short or empty!`);
    errors++;
  }
}

// Check diagrams
const expectedDiagrams = [12, 37, 52, 110, 118];
for (const dNum of expectedDiagrams) {
  const q = ALL_CHEMEQ_JEE_PYQ_QUESTIONS.find(x => x.qNum === dNum);
  if (!q?.image_url) {
    console.error(`Expected diagram for Q${dNum}, but image_url is null!`);
    errors++;
  } else {
    console.log(`Q${dNum} diagram verified: ${q.image_url}`);
  }
}

console.log('----------------------------------------------------');
console.log(`Total questions verified: ${ALL_CHEMEQ_JEE_PYQ_QUESTIONS.length}`);
console.log(`MCQ count: ${mcqCount} (Expected: 85)`);
console.log(`Numerical count: ${numCount} (Expected: 47)`);
console.log(`Diagram count: ${diagramCount} (Expected: 5)`);
console.log(`Total errors: ${errors}`);
console.log('----------------------------------------------------');

if (errors === 0) {
  console.log('STATUS: ALL 132 QUESTIONS ARE 100% CLEAN AND VALIDATED!');
} else {
  console.error(`STATUS: FAILED WITH ${errors} ERRORS.`);
  process.exit(1);
}
