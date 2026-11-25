import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

let currentQ = 1;
const pageQuestionMap = {};

for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n').map(l => l.trim());
  const foundOnPage = [];

  for (let lIdx = 0; lIdx < lines.length; lIdx++) {
    const line = lines[lIdx];
    if (!line) continue;
    if (line.includes('AcadXL') || line.includes('PREVIOUS') || line.includes('Current Electricity') || line.includes('Questions: 408')) continue;

    // We expect currentQ
    // Check if line starts with currentQ followed by dot, colon, parenthesis or space
    // e.g. "1.", "1 ", "1:", "1)", "(1)"
    const regDirect = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,2})?\\b${currentQ}[\\.\\:\\;\\,\\-\\)\\~*#]\\s*(.*)`, 'i');
    const regExact = new RegExp(`^${currentQ}$`);

    if (regDirect.test(line) || regExact.test(line)) {
      foundOnPage.push({ q: currentQ, lIdx, line });
      currentQ++;
    }
  }

  pageQuestionMap[p] = foundOnPage;
}

console.log(`Tracked up to question ${currentQ - 1} / 408.`);
let totalFound = 0;
for (let p = 1; p <= 211; p++) {
  totalFound += pageQuestionMap[p].length;
}
console.log(`Total questions matched: ${totalFound}`);

// Print first 20 pages mapping
for (let p = 1; p <= 20; p++) {
  console.log(`Page ${p}:`, pageQuestionMap[p].map(x => `Q${x.q}`));
}
