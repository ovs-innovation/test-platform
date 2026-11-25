import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';
import { ELECTRO_PART2_OVERRIDES } from './clean_electro_part2.mjs';
import { ELECTRO_PART3_OVERRIDES } from './clean_electro_part3.mjs';

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_diagram_urls_v2.json'), 'utf8'));

const allOverrides = {
  ...ELECTRO_PART1_OVERRIDES,
  ...ELECTRO_PART2_OVERRIDES,
  ...ELECTRO_PART3_OVERRIDES
};

const finalQuestions = [];

let numericalCount = 0;
let mcqCount = 0;
let diagramCount = 0;

for (let qNum = 1; qNum <= 300; qNum++) {
  const qData = allOverrides[qNum];
  if (!qData) {
    throw new Error(`Missing question data for Q${qNum}!`);
  }

  const offKey = officialKeys[String(qNum)];
  if (!offKey) {
    throw new Error(`Missing official key for Q${qNum}!`);
  }

  const isNumeric = !['A', 'B', 'C', 'D'].includes(offKey);
  const diagKey = `q${qNum}_question_diagram.png`;
  const image_url = diagUrls[diagKey] || null;
  if (image_url) diagramCount++;

  let options = [];
  if (isNumeric) {
    numericalCount++;
    options = [];
  } else {
    mcqCount++;
    if (!qData.options || qData.options.length !== 4) {
      throw new Error(`Q${qNum} is MCQ but has ${qData.options ? qData.options.length : 0} options!`);
    }
    options = qData.options.map(o => String(o).trim());
    // verify no dummy options
    for (const opt of options) {
      if (/^(?:\([A-D]\)|Option [A-D])$/i.test(opt)) {
        throw new Error(`Q${qNum} contains dummy option: "${opt}"`);
      }
    }
  }

  const optMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  const correct_index = isNumeric ? null : (optMap[offKey] ?? 0);

  const difficulty = (qNum % 3 === 0) ? 'hard' : ((qNum % 3 === 1) ? 'easy' : 'medium');

  finalQuestions.push({
    q_num: qNum,
    question_text: qData.text.trim(),
    options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: isNumeric ? Number(offKey) : null,
    tolerance: isNumeric ? 0 : null,
    correct_option: isNumeric ? null : offKey,
    correct_index,
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty,
    image_url,
    solution_image_url: null,
    solution: `Official Answer: ${offKey}`
  });
}

console.log('=== COMPILE VALIDATION SUMMARY ===');
console.log(`Total questions compiled: ${finalQuestions.length}`);
console.log(`MCQs count: ${mcqCount}`);
console.log(`Numericals count: ${numericalCount}`);
console.log(`Diagrams attached: ${diagramCount}`);

if (finalQuestions.length !== 300) throw new Error('Expected exactly 300 questions!');
if (mcqCount !== 243) throw new Error('Expected exactly 243 MCQs!');
if (numericalCount !== 57) throw new Error('Expected exactly 57 numericals!');

const JSON_OUT = path.resolve(__dirname, 'electrostatics_jee_final_300.json');
const MJS_OUT = path.resolve(__dirname, 'electrostatics_jee_questions_data.mjs');

fs.writeFileSync(JSON_OUT, JSON.stringify(finalQuestions, null, 2));
console.log(`Saved pristine master dataset to ${JSON_OUT}`);

const mjsContent = `// 300 Pristine Clean JEE Main Electrostatics Questions\nexport const ELECTROSTATICS_JEE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};\n`;
fs.writeFileSync(MJS_OUT, mjsContent);
console.log(`Saved pristine master dataset to ${MJS_OUT}`);
