import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_linear.txt'), 'utf8');

// Parse answers from solutions in linear OCR dump
const solutionAnswers = {};

for (let q = 1; q <= 217; q++) {
  // Find where Question q starts and where it ends
  // Typically "q. " or "q) "
  // And within its solution, look for "(a)", "(b)", "(c)", "(d)" or numeric values
  const qRegex = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*([\\s\\S]*?)(?=(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q+1}\\s*[\\.\\:\\)]|--- PAGE|$)`, 'i');
  const m = linearText.match(qRegex);
  if (m) {
    const chunk = m[1];
    // Look for Ans or Option in the solution portion
    // E.g. "Ans. (A)" or "Option (C)" or "Ans. 125" or "Answer is (D)"
    const ansMatch = chunk.match(/(?:Ans(?:wer)?\.?|Option|Correct(?:\s+option)?)\s*[:\.]?\s*\(?([A-D0-9\.\-]+)\)?/i);
    if (ansMatch) {
      solutionAnswers[q] = ansMatch[1].toUpperCase();
    }
  }
}

console.log(`Extracted ${Object.keys(solutionAnswers).length} answers from solutions.`);

// Let's print out the first 25 solution answers
for (let i = 1; i <= 25; i++) {
  console.log(`Q${i}: solutionAns = ${solutionAnswers[i]}`);
}
