import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Build list of lines with page and line index
const lines = [];
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const pageLines = text.split('\n');
  pageLines.forEach((l, li) => {
    lines.push({ page: p, lineIdx: li, text: l.trim(), raw: l });
  });
}

console.log(`Total flattened lines: ${lines.length}`);

// We will build a matcher for each question 1..268
// Let's create an explicit list or rule for finding each question monotonically
const qMatches = [];

// For any question where OCR dropped the number, we provide key phrases from the question
const PHRASES = {
  7: 'The magnetic fisld due to a current carrying circular loop',
  8: 'Along wire carries a steady current',
  11: 'two concentric coils each of radius equal to 2rem',
  14: 'thin, long paraliel wires separated by a distance',
  15: 'long solenoid has 200 turns per cm',
  16: 'In a region, steady and uniform electric',
  17: 'Twa identical conducting wires AQB and COD',
  18: 'current flows along the length of an infinitely long',
  19: 'long straight wire of radius "a \'',
  20: 'charged particle moves through a magnetic field perpendicular',
  21: 'charged particle with charge g enters a region of constant',
  22: 'current | flows along the length of an infinitely long, thin',
  23: 'horizontal overhead power line is at a height of 4 m',
  24: 'figure shows a current loop ABC ID',
  25: 'Due tothe presence of the current 1; at the origin',
  26: 'magnitude of the net force on the loop is',
  27: 'Two long parallel wires are at a distance 2 d apart',
  28: 'charge () is uniformly distributed over the surface of non conducting disc',
  29: 'magnitude of the magnetic field { B) due to loop ABCD at the origin',
  31: 'thin circular disk of radius R is uniformly charged',
  33: 'straight conductor of length 2a carries a current I',
  35: 'Currents of a 10 ampere and 2 ampere are passed through two parallel thin wires',
  41: 'particle of charge 16 » 10% moving with velocity 10 ms',
  47: 'uniform magnetic field is restricted to an area of radius',
};

// Test locator
let currentIdx = 0;
for (let q = 1; q <= 268; q++) {
  let found = -1;
  const numRegex = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.\\s\\)]`, 'i');

  for (let i = currentIdx; i < lines.length; i++) {
    const item = lines[i];
    if (PHRASES[q] && item.text.includes(PHRASES[q])) {
      found = i;
      break;
    }
    if (numRegex.test(item.text)) {
      // make sure it's not a marks line or solution line
      if (!item.text.includes('marks') && !item.text.includes('Weber') && !item.text.includes('Tesla')) {
        found = i;
        break;
      }
    }
  }

  if (found !== -1) {
    qMatches.push({ q, lineIdx: found, page: lines[found].page, text: lines[found].text.slice(0, 60) });
    currentIdx = found + 1;
  } else {
    console.log(`Failed to find Q${q} starting from line ${currentIdx} (page ${lines[currentIdx]?.page})`);
    break;
  }
}

console.log(`Matched ${qMatches.length} / 268`);
