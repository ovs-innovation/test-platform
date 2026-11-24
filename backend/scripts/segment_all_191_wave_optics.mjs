import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));

// Total 191 questions
console.log('Total official keys loaded:', Object.keys(officialKeys).length);

// Let's create an ordered list of pages with lines
const pageLines = [];
for (let p = 1; p <= 128; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (const line of lines) {
    pageLines.push({ page: p, line });
  }
}

console.log(`Total non-empty lines across pages 1..128: ${pageLines.length}`);

// Monotonic search for Q1..Q191
const qIndices = {};
let currentSearch = 1;

for (let i = 0; i < pageLines.length && currentSearch <= 191; i++) {
  const { page, line } = pageLines[i];
  
  // Header patterns for Q currentSearch:
  // e.g. "1. ", "1.", "1 ", "Q1", "Q. 1", "Q.1", "(1) "
  // Special OCR glitches:
  // 11 -> "1.", 15 -> "By", 16 -> "8:", 41 -> "4% ", etc.
  
  let isMatch = false;
  
  // Exact regex
  const exactReg = new RegExp(`^(\\bQ\\.?\\s*)?${currentSearch}[\\.:\\)\\s]`, 'i');
  if (exactReg.test(line)) {
    isMatch = true;
  }
  
  // Known OCR glitches for specific Q numbers:
  if (currentSearch === 11 && (line.startsWith('1. Direction') || line.startsWith('Direction:'))) isMatch = true;
  if (currentSearch === 15 && (line.startsWith('By The maximum') || line.startsWith('By '))) isMatch = true;
  if (currentSearch === 16 && (line.startsWith('8: The first diffraction') || line.startsWith('8: '))) isMatch = true;
  if (currentSearch === 41 && (line.startsWith('4%') || line.includes('unpolarized light of intensity'))) isMatch = true;
  if (currentSearch === 47 && line.includes('two polaroids')) isMatch = true;
  if (currentSearch === 71 && line.includes('In an experiment')) isMatch = true;
  if (currentSearch === 110 && line.includes('In a Young')) isMatch = true;
  if (currentSearch === 111 && line.includes('na Young\'s double slit experiment, two slits are illuminated')) isMatch = true;
  if (currentSearch === 112 && line.includes('As shown in figures, three identical polaroids')) isMatch = true;
  if (currentSearch === 113 && line.includes('interference fringes are produced')) isMatch = true;
  if (currentSearch === 114 && line.includes('Young\'s double slit experiment, two slits S')) isMatch = true;
  if (currentSearch === 116 && line.includes('In a double slit experiment')) isMatch = true;
  if (currentSearch === 117 && line.includes('In a Young\'s double slit experiment, an angular width')) isMatch = true;
  if (currentSearch === 118 && line.includes('In Young\'s double slit experiment, the fringe width')) isMatch = true;
  if (currentSearch === 119 && line.includes('As shown in the figure, in Young\'s double slit experiment, a thin plate')) isMatch = true;
  if (currentSearch === 131 && line.includes('In a Young\'s double slit experiment')) isMatch = true;
  if (currentSearch === 147 && line.includes('In a double slit experiment')) isMatch = true;

  if (isMatch) {
    qIndices[currentSearch] = { idx: i, page, line };
    currentSearch++;
  }
}

console.log(`Matched questions: ${Object.keys(qIndices).length} / 191`);
const missed = [];
for (let q = 1; q <= 191; q++) {
  if (!qIndices[q]) missed.push(q);
}
console.log('Still missed:', missed);
