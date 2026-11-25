import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));

// 15 Numerical questions
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

let success = 0;
let fail = 0;
const failures = [];

for (let q = 1; q <= 217; q++) {
  if (NUMERICAL_QUESTIONS.has(q)) continue;
  const c = chunks[q];
  const lines = c.lines;

  // Find marks line
  let mIdx = -1;
  for (let l = 0; l < lines.length; l++) {
    if (/\[\d+\s*marks/i.test(lines[l]) || /ANSWER\s*:\s*/i.test(lines[l])) {
      mIdx = l;
      break;
    }
  }

  if (mIdx === -1) {
    fail++;
    failures.push({ q, reason: 'no marks line' });
    continue;
  }

  // Pre-marks lines
  const preLines = lines.slice(0, mIdx);

  // Check how many option lines we have before mIdx
  // Let's print out what the last 2 or 3 lines of preLines are
  const optLines = [];
  for (let l = preLines.length - 1; l >= 0; l--) {
    const line = preLines[l].trim();
    if (line.length === 0) continue;
    optLines.unshift(line);
    // If we have found lines containing A and B and C and D
    const joined = optLines.join(' ');
    const hasA = /[\(]?[Aa][\)\.\:\s]|<<<A>>>/i.test(joined);
    const hasB = /[\(]?[Bb8®][\)\.\:\s]|<<<B>>>/i.test(joined);
    const hasC = /[\(]?[Cc©][\)\.\:\s]|<<<C>>>/i.test(joined);
    const hasD = /[\(]?[Dd0][\)\.\:\s]|<<<D>>>/i.test(joined);
    if ((hasA && hasB && hasC) || (hasA && hasD) || optLines.length >= 4) {
      break;
    }
  }

  if (optLines.length >= 1) {
    success++;
  } else {
    fail++;
    failures.push({ q, reason: 'empty optLines' });
  }
}

console.log(`Line-based options: ${success} / 202 MCQs, ${fail} failed.`);
