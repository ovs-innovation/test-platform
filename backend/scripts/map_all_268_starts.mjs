import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Flatten lines with page number and line number
const allLines = [];
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n');
  lines.forEach((l, li) => {
    allLines.push({
      page: p,
      lineIdx: li,
      text: l.trim(),
      raw: l
    });
  });
}

console.log(`Total lines: ${allLines.length}`);

// We know the questions are sequential Q1 to Q268.
// Let's write a locator function that looks for Q(k) forward from Q(k-1).
// To be robust against OCR issues like "7.", "7%", "MM.", "LY", "2%", etc.:
// A question start line:
// 1. Either starts with `${q}.` or `${q} ` or `${q})`
// 2. Or is on a page near the expected page, following previous question's ANSWER / solution
