import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');

// Match "=== PAGE X ==="
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = [];
for (let i = 0; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pages.push({ pageNum: pNum, text: pText });
}

console.log(`Loaded ${pages.length} pages.`);

// Let's test a regex for question start
// Questions in AcadXL PYQ PDFs usually start with a number at line start, e.g. "1.", "2.", "15.", etc.
// Sometimes with OCR a bullet or noise appears like "Lif two mirrors" or "oa light ray" or "M- Two lenses"
// Let's inspect where "ANSWER:" appears across all pages!
let totalAnswers = 0;
const answerMatches = [];

for (const p of pages) {
  if (p.pageNum >= 251) continue; // Skip answer key pages
  const lines = p.text.split('\n');
  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const l = lines[lIdx].trim();
    if (/^ANSWER\s*:/i.test(l)) {
      totalAnswers++;
      answerMatches.push({ page: p.pageNum, line: l });
    }
  }
}

console.log(`Total 'ANSWER:' lines found on pages 1..250: ${totalAnswers}`);
console.log('Sample answer lines:', answerMatches.slice(0, 10));
console.log('Last answer lines:', answerMatches.slice(-10));
