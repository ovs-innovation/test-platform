import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), 'utf8'));
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

// We will inspect each failed question's lines
const failedQs = [3, 10, 13, 23, 24, 25, 27, 30, 35, 38, 40, 57, 59, 61, 62, 69, 73, 75, 79, 81, 82, 85, 98, 109, 110, 111, 116, 118, 120, 121, 123, 125, 127, 131, 133, 141, 145, 147, 148, 151, 153, 155, 161, 170, 172, 192, 212];

const failedData = {};
for (const q of failedQs) {
  const c = chunks[q];
  if (!c) continue;
  const ansIdx = c.lines.findIndex(l => /ANSWER\s*:\s*/i.test(l));
  const preAns = ansIdx !== -1 ? c.lines.slice(0, ansIdx) : c.lines;
  failedData[q] = preAns;
}

fs.writeFileSync(path.resolve(__dirname, 'dual_nature_47_failed_lines.json'), JSON.stringify(failedData, null, 2));
console.log(`Saved lines for ${Object.keys(failedData).length} failed questions.`);
