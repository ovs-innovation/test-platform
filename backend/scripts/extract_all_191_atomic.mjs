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

console.log(`Found ${markIndices.length} marks markers for 191 questions.`);

// Verify 1:1 mapping with official keys
const qBlocks = [];
for (let q = 1; q <= 191; q++) {
  const markIdx = markIndices[q - 1];
  const nextMarkIdx = q < 191 ? markIndices[q] : allLines.length;
  
  // Find ANSWER line after markIdx
  let ansIdx = -1;
  for (let i = markIdx; i < Math.min(markIdx + 5, allLines.length); i++) {
    if (allLines[i].text.match(/^ANSWER:/i)) {
      ansIdx = i;
      break;
    }
  }

  qBlocks.push({
    q,
    markIdx,
    ansIdx,
    page: allLines[markIdx].p,
    expectedKey: officialKeys[q]
  });
}

console.log('Sample first 5 blocks:', qBlocks.slice(0, 5));
console.log('Sample last 5 blocks:', qBlocks.slice(186));
