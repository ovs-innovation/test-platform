import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));

// Build list of all lines with page number
const allLines = [];
for (let p = 1; p <= 128; p++) {
  const pLines = (pages[p] || '').split('\n').map(l => l.trim()).filter(Boolean);
  for (let li = 0; li < pLines.length; li++) {
    allLines.push({ p, li, text: pLines[li] });
  }
}

// Locate all 191 marks lines
const markIndices = [];
for (let i = 0; i < allLines.length; i++) {
  if (allLines[i].text.match(/\[?\s*4\s*marks/i)) {
    markIndices.push(i);
  }
}

const starts = {};

for (let q = 1; q <= 191; q++) {
  const markIdx = markIndices[q - 1];
  const prevAnsIdx = q === 1 ? 7 : (function() {
    const prevMark = markIndices[q - 2];
    for (let k = prevMark; k < markIdx; k++) {
      if (allLines[k].text.match(/^ANSWER:/i)) return k;
    }
    return prevMark + 1;
  })();

  // Search in reverse from markIdx - 1 back to prevAnsIdx + 1
  // Look for a line starting with number q
  let foundIdx = -1;
  const numRegex = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.:;\\s]`, 'i');

  for (let i = markIdx - 1; i > prevAnsIdx; i--) {
    if (numRegex.test(allLines[i].text)) {
      foundIdx = i;
      break;
    }
  }

  // If not found by exact number, check if there's any line starting with a number or standard question intro
  if (foundIdx === -1) {
    for (let i = markIdx - 1; i > prevAnsIdx; i--) {
      const line = allLines[i].text;
      // If the line starts on the same page as markIdx, and is the first line on that page
      if (allLines[i].p === allLines[markIdx].p && allLines[i].li === 0) {
        foundIdx = i;
        break;
      }
      // Or matches standard question openings
      if (/^(In\s|Two\s|A\s|An\s|When\s|Light\s|Consider\s|Direction:|If\s|Using\s|The\s|For\s|Some\s|At\s)/i.test(line)) {
        // Make sure it's not a solution line (e.g. "For first wavelength", "In diffraction, first minima")
        if (i <= markIdx - 2 && !line.startsWith('For first') && !line.startsWith('For second') && !line.startsWith('In diffraction,')) {
          foundIdx = i;
          // Keep looking backwards in case there's an earlier line of the same question
        }
      }
    }
  }

  if (foundIdx === -1) {
    foundIdx = prevAnsIdx + 1;
  }

  starts[q] = foundIdx;
}

console.log('Question starts mapped for all 191 questions.');
// Let's inspect some samples
for (let q of [1, 2, 9, 10, 11, 13, 15, 16, 21, 41, 67, 100, 150, 191]) {
  console.log(`Q${q} (page ${allLines[starts[q]].p}): "${allLines[starts[q]].text}"`);
}
