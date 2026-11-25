import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

let hasAns = 0;
for (let q = 1; q <= 217; q++) {
  const c = chunks[q];
  if (c.lines.some(l => /ANSWER\s*:\s*/i.test(l))) {
    hasAns++;
  } else {
    console.log(`Q${q} has NO ANSWER line`);
  }
}
console.log(`Questions with ANSWER line: ${hasAns} / 217`);
