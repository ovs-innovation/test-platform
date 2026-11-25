import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Test searching all pages 1..211 for Q51 to Q80
for (let q = 51; q <= 80; q++) {
  const officialKey = keys[q];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(officialKey);
  if (isNumeric) continue;

  let foundPage = 0;
  let foundText = '';

  for (let p = 1; p <= 211; p++) {
    const text = cache[p] || '';
    const reg = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*(.*)`, 'i');
    const m = text.match(reg);
    if (m) {
      foundPage = p;
      foundText = text.slice(m.index);
      break;
    }
  }

  if (foundPage > 0) {
    console.log(`Q${q} found on Page ${foundPage} [Ans: ${officialKey}]:`);
    const lines = foundText.split('\n').slice(0, 4);
    console.log('   ', lines.join(' | '));
  } else {
    console.log(`Q${q} NOT found by regex '${q}.'`);
  }
}
