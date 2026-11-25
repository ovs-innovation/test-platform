import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

const allAnswers = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    // match "ANSWER: X" or "ANSWER : X"
    const m = line.match(/^ANSWER\s*:\s*(.+)/i);
    if (m) {
      allAnswers.push({
        page: p,
        lineIdx: l,
        answer: m[1].trim(),
        line
      });
    }
  }
}

console.log(`Total ANSWER lines found across pages 1..144: ${allAnswers.length}`);
allAnswers.forEach((a, idx) => {
  if (idx < 15 || idx > allAnswers.length - 15) {
    console.log(`  Q#${idx + 1} (Page ${a.page}): Ans = "${a.answer}"`);
  }
});
