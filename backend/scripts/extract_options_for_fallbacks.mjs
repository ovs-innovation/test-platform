import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cleanPhysicsProse } from './clean_physics_prose.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Test extracting on questions 51 to 80
for (let q = 51; q <= 80; q++) {
  const officialKey = keys[q];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(officialKey);
  if (isNumeric) continue;

  // Find page where q or its content appears
  // Search in pages around q * 211 / 408
  const approxPage = Math.round(q * 0.42);
  let foundText = '';
  let foundPage = 0;

  for (let p = Math.max(1, approxPage - 5); p <= Math.min(211, approxPage + 10); p++) {
    const text = cache[p] || '';
    // Look for q. or q) or start of question
    const reg = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*(.*)`, 'i');
    const m = text.match(reg);
    if (m) {
      foundPage = p;
      foundText = text.slice(m.index);
      break;
    }
  }

  if (foundPage > 0) {
    console.log(`\n=== Q${q} found on Page ${foundPage} [Official Ans: ${officialKey}] ===`);
    const lines = foundText.split('\n').slice(0, 8);
    console.log(lines.join(' | '));
  } else {
    console.log(`Q${q} NOT found in expected range`);
  }
}
