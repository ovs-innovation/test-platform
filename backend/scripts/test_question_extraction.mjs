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

// Let's test extracting question text and options for each Q
const extracted = [];

for (let q = 1; q <= 191; q++) {
  const markIdx = markIndices[q - 1];
  const prevAnsIdx = q === 1 ? 7 : (function() {
    const prevMark = markIndices[q - 2];
    for (let k = prevMark; k < markIdx; k++) {
      if (allLines[k].text.match(/^ANSWER:/i)) return k;
    }
    return prevMark + 1;
  })();

  const expectedKey = String(officialKeys[q]).trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(expectedKey);

  // Candidate lines between prevAnsIdx and markIdx
  const blockLines = [];
  for (let i = prevAnsIdx + 1; i < markIdx; i++) {
    blockLines.push({ idx: i, text: allLines[i].text, p: allLines[i].p });
  }

  extracted.push({
    q,
    page: allLines[markIdx].p,
    expectedKey,
    isNumeric,
    blockLinesCount: blockLines.length,
    last3Lines: blockLines.slice(-3).map(b => b.text)
  });
}

console.log('Processed all 191 questions.');
console.log('Sample Q1..Q5:');
extracted.slice(0, 5).forEach(e => console.log(`Q${e.q} (p${e.page}): isNum=${e.isNumeric}, lines=${e.blockLinesCount}, lastLines:`, e.last3Lines));
console.log('Sample Q67 (numerical):', extracted[66]);
