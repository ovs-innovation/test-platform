import fs from 'fs';
import { allBiomoleculesQuestions } from './biomolecules_pyq_questions_data.mjs';

const officialKey = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_official_key.json', 'utf8'));

console.log('=== VERIFYING BIOMOLECULES DATASET ===');

let errors = 0;

if (allBiomoleculesQuestions.length !== 81) {
  console.error(`ERROR: Expected 81 questions, found ${allBiomoleculesQuestions.length}`);
  errors++;
}

for (let i = 0; i < allBiomoleculesQuestions.length; i++) {
  const q = allBiomoleculesQuestions[i];
  const expectedNum = i + 1;

  if (q.question_number !== expectedNum) {
    console.error(`Question at index ${i} has question_number ${q.question_number}, expected ${expectedNum}`);
    errors++;
  }

  // Check required fields
  const fields = ['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_option', 'solution'];
  for (const f of fields) {
    if (!q[f] || String(q[f]).trim() === '') {
      console.error(`Q${expectedNum} is missing or has empty field '${f}'`);
      errors++;
    }
  }

  // Check correct option against official key
  const officialAns = officialKey[expectedNum];
  if (q.correct_option !== officialAns) {
    console.error(`Q${expectedNum} answer mismatch! Dataset: ${q.correct_option}, Official Key: ${officialAns}`);
    errors++;
  }

  // Check exam tags
  if (/\[\s*(NEET|AIPMT|RE-NEET|AIIMS)/i.test(q.question_text)) {
    console.warn(`Q${expectedNum} still contains exam prefix in question_text: "${q.question_text.slice(0, 40)}"`);
    errors++;
  }

  // Check KaTeX delimiter pairing
  for (const f of ['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'solution']) {
    const text = String(q[f] || '');
    // Check $$
    const doubleCount = (text.match(/\$\$/g) || []).length;
    if (doubleCount % 2 !== 0) {
      console.error(`Q${expectedNum} field ${f} has unbalanced '$$' delimiters!`);
      errors++;
    }
    // Remove $$ blocks then check single $
    const noDouble = text.replace(/\$\$[\s\S]*?\$\$/g, '');
    const singleCount = (noDouble.match(/(?<!\\)\$/g) || []).length;
    if (singleCount % 2 !== 0) {
      console.error(`Q${expectedNum} field ${f} has unbalanced '$' delimiters!`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log('✅ ALL 81 QUESTIONS VERIFIED SUCCESSFULLY! 100% MATCH WITH OFFICIAL KEY, ZERO SYNTAX ERRORS!');
} else {
  console.error(`❌ Verification completed with ${errors} errors.`);
  process.exit(1);
}
