import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { KINETICS_PART1 } from './kinetics_data_part1.mjs';
import { KINETICS_PART2 } from './kinetics_data_part2.mjs';
import { KINETICS_PART3 } from './kinetics_data_part3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'kinetics_diagram_urls.json'), 'utf8'));

const allData = {
  ...KINETICS_PART1,
  ...KINETICS_PART2,
  ...KINETICS_PART3
};

console.log('Total questions combined:', Object.keys(allData).length);

const finalQuestions = [];

for (let i = 1; i <= 235; i++) {
  const item = allData[i];
  if (!item) {
    throw new Error(`Missing question data for Q${i}!`);
  }

  const isMcq = item.options && item.options.length > 0;
  
  let correctIndex = null;
  if (isMcq) {
    if (item.answer === 'A') correctIndex = 0;
    else if (item.answer === 'B') correctIndex = 1;
    else if (item.answer === 'C') correctIndex = 2;
    else if (item.answer === 'D') correctIndex = 3;
    else correctIndex = 0;
  }

  // Diagram URL
  const diagKey1 = `q${i}_diagram`;
  const diagKey2 = `kinetics_q${i}_diagram`;
  const imageUrl = diagramUrls[diagKey1] || diagramUrls[diagKey2] || null;

  finalQuestions.push({
    question_number: i,
    question_type: isMcq ? 'mcq' : 'numerical',
    question_text: item.statement,
    options: isMcq ? item.options : [],
    correct_index: isMcq ? correctIndex : null,
    correct_indices: isMcq ? [correctIndex] : [],
    numeric_answer: isMcq ? null : (item.numeric_answer !== undefined ? item.numeric_answer : null),
    marks: 4,
    solution: item.solution,
    image_url: imageUrl,
    difficulty: 'medium',
    subject: 'Chemistry',
    subject_id: 10,
    chapter: 'Chemical Kinetics',
    chapter_id: 21,
    exam_type: 'JEE',
    status: 'available'
  });
}

// Validation assertions
console.log(`\nValidating assembled dataset of ${finalQuestions.length} questions...`);

if (finalQuestions.length !== 235) {
  throw new Error(`Assertion failed: Expected 235 questions, got ${finalQuestions.length}`);
}

let mcqCount = 0;
let numCount = 0;
let placeholderCount = 0;
let diagramCount = 0;

finalQuestions.forEach((q, idx) => {
  const num = idx + 1;
  if (q.question_type === 'mcq') {
    mcqCount++;
    if (q.options.length !== 4) {
      throw new Error(`Q${num} is MCQ but has ${q.options.length} options!`);
    }
    const hasPl = q.options.some(o => o.text && (o.text.includes('Option (B)') || o.text.includes('Option (C)') || o.text.includes('Option (D)')));
    if (hasPl) {
      placeholderCount++;
      console.error(`Q${num} has placeholder options!`);
    }
    if (q.correct_index === null || q.correct_index < 0 || q.correct_index > 3) {
      throw new Error(`Q${num} has invalid correct_index: ${q.correct_index}`);
    }
  } else if (q.question_type === 'numerical') {
    numCount++;
    if (q.options.length > 0) {
      throw new Error(`Q${num} is Numerical but has non-empty options!`);
    }
    if (q.numeric_answer === null || typeof q.numeric_answer !== 'number') {
      throw new Error(`Q${num} has invalid numeric_answer: ${q.numeric_answer}`);
    }
  } else {
    throw new Error(`Q${num} has unknown question_type: ${q.question_type}`);
  }

  if (q.image_url) {
    diagramCount++;
  }
});

console.log('--- SUMMARY STATS ---');
console.log(`Total Questions: ${finalQuestions.length}`);
console.log(`MCQs: ${mcqCount}`);
console.log(`Numericals: ${numCount}`);
console.log(`Placeholder Options: ${placeholderCount}`);
console.log(`Diagram Questions: ${diagramCount}`);

if (placeholderCount > 0) {
  throw new Error(`Validation failed: ${placeholderCount} questions still have placeholder options!`);
}

const outFile = path.join(__dirname, 'chemical_kinetics_jee_final_235.json');
fs.writeFileSync(outFile, JSON.stringify(finalQuestions, null, 2));
console.log(`Successfully written flawless dataset to ${outFile}`);
