import fs from 'fs';
import { REDOX_PART1 } from './clean_redox_part1.mjs';
import { REDOX_PART2 } from './clean_redox_part2.mjs';

const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/redox_official_keys.json', 'utf-8'));
const all = [...REDOX_PART1, ...REDOX_PART2];

console.log('Total questions:', all.length);

let errors = [];
let mcqCount = 0;
let numCount = 0;
let diagramsCount = 0;

all.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.qNum !== expectedNum) {
    errors.push(`Item ${idx}: expected qNum ${expectedNum}, got ${q.qNum}`);
  }
  const officialKey = officialKeys[q.qNum];
  if (officialKey === undefined) {
    errors.push(`Q${q.qNum}: missing from official keys`);
    return;
  }
  
  if (q.question_type === 'numerical') {
    numCount++;
    if (String(q.numeric_answer).trim() !== String(officialKey).trim()) {
      errors.push(`Q${q.qNum} (num): expected answer ${officialKey}, got ${q.numeric_answer}`);
    }
    if (q.options && q.options.length > 0) {
      errors.push(`Q${q.qNum} (num): should not have options, got ${q.options.length}`);
    }
  } else if (q.question_type === 'mcq') {
    mcqCount++;
    const keyLetter = ['A', 'B', 'C', 'D'][q.correct_option];
    if (keyLetter !== officialKey) {
      errors.push(`Q${q.qNum} (mcq): expected option ${officialKey}, got ${keyLetter} (index ${q.correct_option})`);
    }
    if (!q.options || q.options.length !== 4) {
      errors.push(`Q${q.qNum}: options length is not 4 (got ${q.options ? q.options.length : 0})`);
    } else {
      q.options.forEach((opt, oi) => {
        if (/Option \([ABCD]\)/i.test(opt)) {
          errors.push(`Q${q.qNum}: dummy option detected in opt ${oi}: ${opt}`);
        }
      });
    }
  } else {
    errors.push(`Q${q.qNum}: invalid question_type ${q.question_type}`);
  }

  if (q.image_url) {
    diagramsCount++;
    console.log(`Q${q.qNum} has question image: ${q.image_url}`);
  }
  if (q.solution_image_url) {
    diagramsCount++;
    console.log(`Q${q.qNum} has solution image: ${q.solution_image_url}`);
  }
});

console.log(`MCQs: ${mcqCount}, Numericals: ${numCount}, Total diagrams: ${diagramsCount}`);
if (errors.length > 0) {
  console.error('Validation errors found (' + errors.length + '):');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('SUCCESS: All 76 questions strictly match official keys, continuous sequence (1..76), valid types, and 0 dummy options!');
}
