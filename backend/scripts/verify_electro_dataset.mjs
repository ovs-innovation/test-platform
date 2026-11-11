import fs from 'fs';
import { electroPyqQuestions } from './electro_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('backend/scripts/electro_official_key.json', 'utf8'));

async function main() {
  console.log(`Verifying ${electroPyqQuestions.length} Electrochemistry PYQ questions...`);

  let errors = 0;
  let mismatches = 0;

  if (electroPyqQuestions.length !== 91) {
    console.error(`ERROR: Expected 91 questions, found ${electroPyqQuestions.length}`);
    errors++;
  }

  const seenNumbers = new Set();

  electroPyqQuestions.forEach((q, idx) => {
    const num = q.question_number;
    if (seenNumbers.has(num)) {
      console.error(`ERROR: Duplicate question_number ${num}`);
      errors++;
    }
    seenNumbers.add(num);

    if (num !== idx + 1) {
      console.error(`ERROR: Question index ${idx} has question_number ${num}, expected ${idx + 1}`);
      errors++;
    }

    if (!q.question_text || q.question_text.trim().length === 0) {
      console.error(`ERROR: Q${num} has empty question_text`);
      errors++;
    }

    // Check for exam prefix remnants
    if (/^Q\d+\./i.test(q.question_text) || /\[NEET/i.test(q.question_text) || /\[AIPMT/i.test(q.question_text)) {
      console.error(`WARNING: Q${num} may contain exam prefix in text: "${q.question_text.slice(0, 40)}"`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR: Q${num} has ${q.options?.length} options instead of 4`);
      errors++;
    }

    q.options?.forEach((opt, optIdx) => {
      if (!opt || opt.trim().length === 0) {
        console.error(`ERROR: Q${num} Option ${optIdx} is empty`);
        errors++;
      }
    });

    const expectedAnswer = officialKey[num];
    if (q.correct_option !== expectedAnswer) {
      console.error(`MISMATCH: Q${num} has option ${q.correct_option}, official key has ${expectedAnswer}`);
      mismatches++;
    }

    // Check dollar sign balance in question_text, options, and solution_text
    const textToCheck = [q.question_text, ...(q.options || []), q.solution_text || ''].join(' ');
    const dollarCount = (textToCheck.match(/(?<!\\)\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      console.warn(`WARNING: Q${num} may have unbalanced dollar signs ($ count: ${dollarCount})`);
    }
  });

  console.log('--- Verification Summary ---');
  console.log(`Total questions: ${electroPyqQuestions.length} / 91`);
  console.log(`Key mismatches: ${mismatches}`);
  console.log(`Structural errors: ${errors}`);

  if (mismatches === 0 && errors === 0) {
    console.log('ALL 91 QUESTIONS VERIFIED SUCCESSFULLY AND MATCH 100% WITH OFFICIAL ANSWER KEY!');
  } else {
    process.exit(1);
  }
}

main().catch(console.error);
