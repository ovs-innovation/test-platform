import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// We can inspect each page and find where questions start and end.
// Let's print out what is on each page from page 1 to 30.
for (let p = 1; p <= 30; p++) {
  const text = cache[p] || '';
  console.log(`\n================== PAGE ${p} ==================`);
  // Look for question beginnings:
  // In AcadXL, each question typically starts after "Answer:" of previous question, or at top of page.
  // Let's split by "Answer" or "ans:" or "AHEWER"
  const sections = text.split(/(?:Answer|ans|AHEWER|aweer|answ)\s*[\:\=]/i);
  console.log(`Page ${p} has ${sections.length} answer sections.`);
  sections.forEach((sec, idx) => {
    // The text before the first answer section is Question 1
    // The text after the first answer section contains (Solution 1) + Question 2!
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    console.log(`  Section ${idx} (lines ${lines.length}): first line = "${lines[0] || ''}", last line = "${lines[lines.length-1] || ''}"`);
  });
}
