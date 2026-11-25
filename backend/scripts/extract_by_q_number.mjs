import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Question sequence 1..300
// We know exactly which questions are on which pages because the pages are strictly chronological!
// Let's test tracking currentQ from 1 to 300 across pages 1 to 170.

const questions = [];
let expectedQ = 1;

for (let p = 1; p <= 170; p++) {
  const pText = cache[String(p)] || '';
  const lines = pText.split('\n');

  // Let's find all occurrences of expectedQ or expectedQ + 1, etc.
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    // Check if line starts expectedQ
    // Regex matches e.g. "1. ", "1 ", "50, ", "M. " (for 11), "M2." (for 112), etc.
    const patterns = [
      new RegExp(`^${expectedQ}[\\.\\s\\:\\,\\-]\\s*(.*)`, 'i'),
      new RegExp(`^[\"\'\\(\\[]?${expectedQ}[\\.\\s\\:\\,\\-]\\s*(.*)`, 'i')
    ];

    let matched = false;
    for (const pat of patterns) {
      if (pat.test(l)) {
        matched = true;
        break;
      }
    }

    // Special OCR fixes for expectedQ:
    if (expectedQ === 11 && (/^M[\.\s]/i.test(l) || /^11[\.\s]/.test(l))) matched = true;
    if (expectedQ === 31 && /^3[\%\&][\.\s]/i.test(l)) matched = true;
    if (expectedQ === 50 && /^50[\,\.\s]/i.test(l)) matched = true;
    if (expectedQ === 63 && /^83[\.\s]/.test(l)) matched = true;
    if (expectedQ === 111 && /^m[\.\s]/i.test(l)) matched = true;
    if (expectedQ === 112 && /^M2[\.\s]/i.test(l)) matched = true;
    if (expectedQ === 116 && /^M6[\.\s]/i.test(l)) matched = true;
    if (expectedQ === 121 && /^0[\:\.\s]/.test(l) && p === 66) matched = true;
    if (expectedQ === 131 && /^13[\%8][\.\s]/.test(l)) matched = true;
    if (expectedQ === 157 && /^["']?57[\.\s]/.test(l)) matched = true;
    if (expectedQ === 158 && /^Be[\.\s]/i.test(l)) matched = true;
    if (expectedQ === 171 && /^0[\.\s]/.test(l) && p === 94) matched = true;
    if (expectedQ === 185 && /^a[\.\s]/i.test(l) && p === 107) matched = true;
    if (expectedQ === 211 && /^2M[\.\s]/.test(l)) matched = true;
    if (expectedQ === 221 && /^0[\.\s]/.test(l) && p === 128) matched = true;
    if (expectedQ === 230 && /^0[\.\s]/.test(l) && p === 131) matched = true;
    if (expectedQ === 232 && /^Ar[\.\s]/i.test(l)) matched = true;
    if (expectedQ === 271 && /^27[\.\s]/.test(l) && p === 150) matched = true;

    if (matched) {
      questions.push({ qNum: expectedQ, page: p, lineIdx: i, line: l });
      expectedQ++;
    }
  }
}

console.log(`Sequentially tracked ${questions.length} / 300 questions!`);
if (questions.length < 300) {
  console.log(`Stopped at expectedQ = ${expectedQ}`);
}
