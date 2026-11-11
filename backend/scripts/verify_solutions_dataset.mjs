import fs from 'fs';
import { solutionsPyqQuestions } from './solutions_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/solutions_official_key.json', 'utf8'));

async function main() {
  console.log(`Loaded ${solutionsPyqQuestions.length} questions from dataset.`);

  if (solutionsPyqQuestions.length !== 70) {
    throw new Error(`Expected 70 questions, got ${solutionsPyqQuestions.length}`);
  }

  let mismatches = 0;
  let validationErrors = 0;

  for (let i = 0; i < solutionsPyqQuestions.length; i++) {
    const q = solutionsPyqQuestions[i];
    const qNum = i + 1;

    if (q.question_number !== qNum) {
      console.error(`Index ${i} has question_number ${q.question_number}, expected ${qNum}`);
      validationErrors++;
    }

    if (!q.question_text || q.question_text.trim().length === 0) {
      console.error(`Q${qNum} has empty question_text!`);
      validationErrors++;
    }

    if (/^Q\d+\./i.test(q.question_text) || /\[NEET/i.test(q.question_text) || /\[AIPMT/i.test(q.question_text)) {
      console.error(`Q${qNum} has lingering exam tags in question_text: "${q.question_text.slice(0, 40)}"`);
      validationErrors++;
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${qNum} does not have exactly 4 options!`);
      validationErrors++;
    }

    for (let optIdx = 0; optIdx < (q.options || []).length; optIdx++) {
      if (!q.options[optIdx] || q.options[optIdx].trim().length === 0) {
        console.error(`Q${qNum} option [${optIdx}] is empty!`);
        validationErrors++;
      }
    }

    if (!q.explanation || q.explanation.trim().length === 0) {
      console.error(`Q${qNum} explanation is empty!`);
      validationErrors++;
    }

    const officialAns = officialKey[qNum];
    if (q.correct_option !== officialAns) {
      console.error(`Q${qNum} MISMATCH! Dataset=${q.correct_option}, OfficialKey=${officialAns}`);
      mismatches++;
    }
  }

  console.log('----------------------------------------------------');
  console.log(`Total questions checked: ${solutionsPyqQuestions.length}`);
  console.log(`Validation errors: ${validationErrors}`);
  console.log(`Answer key mismatches: ${mismatches}`);

  if (validationErrors === 0 && mismatches === 0) {
    console.log('✅ ALL 70 QUESTIONS FULLY VERIFIED AND 100% MATCH OFFICIAL KEY!');
  } else {
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
