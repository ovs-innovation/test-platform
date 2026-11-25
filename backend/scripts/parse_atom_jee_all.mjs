import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));

// Identify the starting line for each question 1..237
const questionStarts = [];

// OCR corrections for question headers where number was misread
const MANUAL_OVERRIDES = {
  11: { page: 4, startsWith: '1. Of the following sets' },
  31: { page: 13, regex: /The radius of the second Bohr orbit/i },
  51: { page: 24, regex: /de-Broglie wavelength/i },
  71: { page: 38, regex: /radial node/i },
  81: { page: 44, regex: /energy of light/i },
  91: { page: 50, regex: /radial distribution/i },
  110: { page: 61, regex: /de-Broglie|Bohr/i },
  111: { page: 62, regex: /Ge/i },
  112: { page: 62, regex: /maximum number of electrons/i },
  113: { page: 63, regex: /magnetic moment/i },
  115: { page: 64, regex: /spin/i },
  116: { page: 64, regex: /threshold/i },
  117: { page: 65, regex: /Lyman/i },
  119: { page: 66, regex: /uncertainty/i },
  122: { page: 67, regex: /wavelength/i },
  125: { page: 69, regex: /125/i },
  131: { page: 73, regex: /de-Broglie/i },
  172: { page: 106, regex: /172/i },
  182: { page: 110, regex: /182/i },
  189: { page: 113, regex: /189|LIST/i },
  208: { page: 124, regex: /208/i },
  223: { page: 137, regex: /223|probability density/i },
  236: { page: 150, regex: /238\.\s*The Bohr radius|The Bohr radius of a hydrogen like/i }
};

for (let qNum = 1; qNum <= 237; qNum++) {
  let found = null;
  // First check if known regex or normal pattern
  for (let p = 1; p <= 151; p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      // standard match: "1. ", "237. "
      if (new RegExp(`^${qNum}\\.\\s+`).test(line)) {
        found = { qNum, page: p, lineIdx: l, lineText: line };
        break;
      }
    }
    if (found) break;
  }
  if (found) {
    questionStarts.push(found);
  } else {
    questionStarts.push({ qNum, notFound: true });
  }
}

const missing = questionStarts.filter(q => q.notFound);
console.log(`Found ${questionStarts.length - missing.length} / 237 questions with standard regex.`);
console.log('Missing question numbers:', missing.map(m => m.qNum));
