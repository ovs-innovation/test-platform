import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { EMI_PART1 } from './clean_emi_part1.mjs';
import { EMI_PART2 } from './clean_emi_part2.mjs';
import { EMI_PART3 } from './clean_emi_part3.mjs';
import { EMI_PART4 } from './clean_emi_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_clean_diagram_urls.json'), 'utf8'));
const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_monotonic_chunks.json'), 'utf8'));

const allParts = { ...EMI_PART1, ...EMI_PART2, ...EMI_PART3, ...EMI_PART4 };

const finalQuestions = [];

for (let q = 1; q <= 173; q++) {
  const item = allParts[q];
  if (!item) {
    throw new Error(`Missing question Q${q} in clean parts!`);
  }

  const ans = String(keys[q]).trim();
  const isNumerical = !['A', 'B', 'C', 'D'].includes(ans);

  const imageKey = `emi_q${q}_diagram.png`;
  const imageUrl = diagramUrls[imageKey] || null;

  let solution = null;
  if (chunks[q] && chunks[q].lines) {
    const lines = chunks[q].lines;
    const ansIdx = lines.findIndex(l => l.startsWith('ANSWER:'));
    if (ansIdx !== -1 && ansIdx < lines.length - 1) {
      solution = lines.slice(ansIdx + 1).join('\n').trim();
    }
  }

  const questionObj = {
    q_num: q,
    question_text: item.text,
    options: isNumerical ? [] : item.options,
    question_type: isNumerical ? 'numerical' : 'mcq',
    numeric_answer: isNumerical ? Number(ans) : null,
    tolerance: isNumerical ? 0 : null,
    correct_option: ans,
    correct_index: isNumerical ? null : ['A', 'B', 'C', 'D'].indexOf(ans),
    marks: 4,
    negative_marks: isNumerical ? 0 : 1,
    difficulty: 'medium',
    image_url: imageUrl,
    solution_image_url: null,
    solution: solution
  };

  finalQuestions.push(questionObj);
}

console.log(`Generated ${finalQuestions.length} complete questions.`);

// Validation
let dummyOptionsCount = 0;
let mcqCount = 0;
let numCount = 0;
let diagramCount = 0;

for (const q of finalQuestions) {
  if (q.image_url) diagramCount++;
  if (q.question_type === 'numerical') {
    numCount++;
    if (q.options.length !== 0) console.error(`Q${q.q_num} numerical has non-empty options!`);
    if (isNaN(q.numeric_answer)) console.error(`Q${q.q_num} numerical answer is NaN!`);
  } else {
    mcqCount++;
    if (q.options.length !== 4) console.error(`Q${q.q_num} MCQ has ${q.options.length} options!`);
    for (const opt of q.options) {
      const lower = opt.trim().toLowerCase();
      if (['(a)', '(b)', '(c)', '(d)', 'option a', 'option b', 'option c', 'option d'].includes(lower)) {
        dummyOptionsCount++;
        console.error(`Dummy option in Q${q.q_num}: ${opt}`);
      }
    }
  }
}

console.log(`Validation results:`);
console.log(`- Total Questions: ${finalQuestions.length}`);
console.log(`- MCQs: ${mcqCount} (expected 122)`);
console.log(`- Numericals: ${numCount} (expected 51)`);
console.log(`- Diagrams mapped: ${diagramCount} (expected 51)`);
console.log(`- Dummy options: ${dummyOptionsCount} (strictly 0)`);

if (dummyOptionsCount > 0 || mcqCount !== 122 || numCount !== 51 || finalQuestions.length !== 173) {
  throw new Error('Validation failed!');
}

const outJsonPath = path.resolve(__dirname, 'emi_jee_final_173.json');
fs.writeFileSync(outJsonPath, JSON.stringify(finalQuestions, null, 2));
console.log(`Saved pristine dataset to ${outJsonPath}`);

const outMjsPath = path.resolve(__dirname, 'emi_jee_questions_data.mjs');
fs.writeFileSync(outMjsPath, `export const EMI_JEE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};\n`);
console.log(`Saved ESM dataset to ${outMjsPath}`);
