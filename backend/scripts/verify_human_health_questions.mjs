import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_all_questions.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_official_keys.json'), 'utf8'));

let errors = 0;

if (questions.length !== 171) {
  console.error(`Expected 171 questions, got ${questions.length}`);
  errors++;
}

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const qNum = i + 1;

  if (q.num !== qNum) {
    console.error(`Q${q.num}: Number mismatch with index ${qNum}`);
    errors++;
  }

  if (!q.question || q.question.trim().length < 5) {
    console.error(`Q${qNum}: Empty or too short question text`);
    errors++;
  }

  if (!q.options || q.options.length !== 4) {
    console.error(`Q${qNum}: Expected 4 options, found ${q.options ? q.options.length : 0}`);
    errors++;
  } else {
    for (let optIdx = 0; optIdx < 4; optIdx++) {
      const opt = q.options[optIdx];
      const expectedId = ['A', 'B', 'C', 'D'][optIdx];
      if (opt.id !== expectedId) {
        console.error(`Q${qNum}: Option index ${optIdx} id is ${opt.id}, expected ${expectedId}`);
        errors++;
      }
      if (!opt.text || opt.text.trim().length === 0) {
        console.error(`Q${qNum}: Option ${expectedId} has empty text`);
        errors++;
      }
    }
  }

  const expectedKey = officialKeys[String(qNum)];
  if (q.correctOption !== expectedKey) {
    console.error(`Q${qNum}: correctOption ${q.correctOption} does not match official key ${expectedKey}`);
    errors++;
  }

  if (!q.explanation || q.explanation.trim().length < 20) {
    console.error(`Q${qNum}: Explanation missing or too short (${q.explanation ? q.explanation.length : 0} chars)`);
    errors++;
  }

  if (qNum === 61 || qNum === 68) {
    if (!q.image || !q.image.startsWith('https://res.cloudinary.com/')) {
      console.error(`Q${qNum}: Missing Cloudinary image: ${q.image}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log(`✅ VERIFICATION PASSED: All ${questions.length} questions are 100% complete, properly formatted, diagram-verified, and official-key matched!`);
} else {
  console.error(`❌ VERIFICATION FAILED: ${errors} errors found.`);
  process.exit(1);
}

