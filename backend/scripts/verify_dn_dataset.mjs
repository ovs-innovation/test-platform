import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DUAL_NATURE_PYQ_QUESTIONS } from './dn_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('=== VERIFYING DUAL NATURE PYQ DATASET ===');
  console.log(`Total questions loaded: ${DUAL_NATURE_PYQ_QUESTIONS.length}`);
  if (DUAL_NATURE_PYQ_QUESTIONS.length !== 123) {
    console.error(`ERROR: Expected 123 questions, found ${DUAL_NATURE_PYQ_QUESTIONS.length}`);
    process.exit(1);
  }

  const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dn_official_key.json'), 'utf8'));
  const letterMap = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

  let errorCount = 0;
  let diagramCount = 0;

  for (let i = 0; i < DUAL_NATURE_PYQ_QUESTIONS.length; i++) {
    const q = DUAL_NATURE_PYQ_QUESTIONS[i];
    const qNum = i + 1;
    const expectedLetter = officialKey[qNum];

    if (!q.question_text || q.question_text.trim().length === 0) {
      console.error(`Q${qNum}: Missing question text`);
      errorCount++;
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${qNum}: Expected 4 options, got ${q.options ? q.options.length : 0}`);
      errorCount++;
    }

    const assignedLetter = letterMap[q.correct_index];
    if (assignedLetter !== expectedLetter) {
      // Q117 official key has multiple correct (A and D)
      if (qNum === 117 && ['A', 'D'].includes(assignedLetter)) {
        // Allowed
      } else {
        console.error(`Q${qNum}: Answer mismatch! Got ${assignedLetter}, expected ${expectedLetter}`);
        errorCount++;
      }
    }

    if (q.image_url) {
      diagramCount++;
      if (!q.image_url.startsWith('https://res.cloudinary.com/')) {
        console.error(`Q${qNum}: Diagram URL is not Cloudinary: ${q.image_url}`);
        errorCount++;
      }
    }
  }

  console.log(`Diagram questions count: ${diagramCount} (Expected 8)`);
  if (diagramCount !== 8) {
    console.warn(`WARNING: Expected 8 diagrams, found ${diagramCount}`);
  }

  if (errorCount === 0) {
    console.log('>>> All 123 Dual Nature questions verified successfully! <<<');
  } else {
    console.error(`Verification completed with ${errorCount} errors.`);
    process.exit(1);
  }
}

main().catch(console.error);
