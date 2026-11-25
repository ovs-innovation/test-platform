import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

// We have 78 pages and 221 questions.
// Let's inspect each page from 1 to 78.
// We keep track of currentQ (starting at 1).
// On each page, we search for currentQ, currentQ+1, ...
const pageRanges = {};
let currentQ = 1;

for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');

  const startQ = currentQ;
  // Look ahead for next questions on this page
  while (currentQ <= 221) {
    const nextQ = currentQ + 1;
    if (nextQ > 221) break;

    // Check if nextQ starts on this page
    // Patterns for nextQ:
    // "nextQ." or "nextQ:" or "nextQ " or special OCR glitches
    let foundNext = false;
    const pats = [
      new RegExp(`(?:^|\\n)\\s*${nextQ}[\\.:\\-\\)]\\s+`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${nextQ}\\s+[A-Z]`, 'i'),
      new RegExp(`(?:^|\\n)\\s*Q\\.?\\s*${nextQ}[\\.:\\-\\)]`, 'i')
    ];

    // Special glitches:
    if (nextQ === 11 && /M-|\b11\b|Density of a 2\.05M/.test(text)) foundNext = true;
    if (nextQ === 14 && /"4\.|14\./.test(text)) foundNext = true;
    if (nextQ === 17 && /” 5 g of benzene|17\./.test(text)) foundNext = true;
    if (nextQ === 19 && /9\.\s*When CO|19\./.test(text)) foundNext = true;
    if (nextQ === 27 && /27\.|26\.\s*g litres|litres of an alkene/.test(text)) foundNext = true;
    if (nextQ === 86 && /86\./.test(text)) foundNext = true;
    if (nextQ === 93 && /9\.\s*coon|Consider the above reaction where 6\.1g/.test(text)) foundNext = true;
    if (nextQ === 110 && /M0\./.test(text)) foundNext = true;
    if (nextQ === 111 && /MM\./.test(text)) foundNext = true;
    if (nextQ === 112 && /M2\./.test(text)) foundNext = true;
    if (nextQ === 113 && /M3\./.test(text)) foundNext = true;
    if (nextQ === 114 && /M4\.|114\./.test(text)) foundNext = true;
    if (nextQ === 115 && /M5\.|115\./.test(text)) foundNext = true;
    if (nextQ === 116 && /me\.|116\./.test(text)) foundNext = true;
    if (nextQ === 117 && /7\.|117\./.test(text)) foundNext = true;
    if (nextQ === 146 && /M6\./.test(text)) foundNext = true;
    if (nextQ === 147 && /47\.\s*\(?5g|147\./.test(text)) foundNext = true;
    if (nextQ === 151 && /51\.\s*Given|151\./.test(text)) foundNext = true;
    if (nextQ === 154 && /154\.|54\./.test(text)) foundNext = true;
    if (nextQ === 157 && /157\.|57\./.test(text)) foundNext = true;
    if (nextQ === 158 && /158\.|58\./.test(text)) foundNext = true;
    if (nextQ === 162 && /62\.\s*\\?ioiume|Volume of 3MNaOH/.test(text)) foundNext = true;
    if (nextQ === 163 && /63\.\s*\|?\s*mole of PbS/.test(text)) foundNext = true;
    if (nextQ === 164 && /64\.|164\./.test(text)) foundNext = true;
    if (nextQ === 174 && /74\.\s*The incorrect postulates/.test(text)) foundNext = true;
    if (nextQ === 175 && /75\.\s*The number of moles of methane/.test(text)) foundNext = true;
    if (nextQ === 185 && /785\.|185\.\s*,?01 mole/.test(text)) foundNext = true;

    for (const pat of pats) {
      if (pat.test(text)) {
        foundNext = true;
        break;
      }
    }

    if (foundNext) {
      currentQ = nextQ;
    } else {
      break;
    }
  }

  pageRanges[p] = [startQ, currentQ];
  currentQ = currentQ + 1; // next page starts at currentQ + 1
}

console.log('Final page 78 ends at Q:', currentQ - 1);
fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page_ranges_resolved.json'), JSON.stringify(pageRanges, null, 2));

for (let p = 1; p <= 78; p++) {
  console.log(`Page ${String(p).padStart(2, '0')}: Q${pageRanges[p][0]} to Q${pageRanges[p][1]}`);
}
