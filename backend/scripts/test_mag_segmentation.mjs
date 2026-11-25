import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Flatten lines with page numbers
const pageLines = [];
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (let li = 0; li < lines.length; li++) {
    pageLines.push({ page: p, lineIdx: li, line: lines[li] });
  }
}

console.log(`Loaded ${pageLines.length} non-empty lines across pages 1..202.`);

function matchesQ(item, q) {
  const { page, line } = item;
  // Expected page roughly q * 0.75
  const expPage = Math.ceil(q * 0.75);
  if (Math.abs(page - expPage) > 15) return false;

  // General regex
  const loneReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)]?$`, 'i');
  if (loneReg.test(line)) return true;

  const inlineReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)\\s]\\s*`, 'i');
  if (inlineReg.test(line)) return true;

  return false;
}

let currentLineIdx = 0;
const matched = [];
const missing = [];

for (let q = 1; q <= 268; q++) {
  let foundIdx = -1;
  for (let i = currentLineIdx; i < pageLines.length; i++) {
    if (matchesQ(pageLines[i], q)) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx === -1) {
    missing.push({ q, lastPage: pageLines[currentLineIdx]?.page });
  } else {
    matched.push({ q, page: pageLines[foundIdx].page, line: pageLines[foundIdx].line });
    currentLineIdx = foundIdx + 1;
  }
}

console.log(`Matched: ${matched.length} / 268`);
if (missing.length > 0) {
  console.log(`First 10 missing:`, missing.slice(0, 10));
}
