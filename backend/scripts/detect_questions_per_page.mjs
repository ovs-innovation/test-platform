import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linear = fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_linear.txt'), 'utf8');
const pageBlocks = linear.split(/=== PAGE (\d+) ===/);

console.log('Total page splits:', (pageBlocks.length - 1) / 2);

const pageTexts = {};
for (let i = 1; i < pageBlocks.length; i += 2) {
  const pNum = parseInt(pageBlocks[i], 10);
  const pText = pageBlocks[i + 1] || '';
  pageTexts[pNum] = pText;
}

// Let's inspect which question numbers are mentioned on each page
const detectedPageQuestions = [];

for (let p = 1; p <= 211; p++) {
  const text = pageTexts[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find lines starting with a number
  const qNumsOnPage = [];
  lines.forEach(l => {
    const m = l.match(/^(?:[~*#_>|§©®\s()[\]-]{0,3})?(\d{1,3})[\.\:\;\,\s\-\)\~*#]/);
    if (m) {
      const val = parseInt(m[1], 10);
      if (val >= 1 && val <= 408) {
        qNumsOnPage.push(val);
      }
    }
  });

  detectedPageQuestions.push({ p, nums: [...new Set(qNumsOnPage)] });
}

console.log('Detected question numbers per page (first 30 pages):');
detectedPageQuestions.slice(0, 30).forEach(d => {
  console.log(`Page ${d.p}:`, d.nums);
});
