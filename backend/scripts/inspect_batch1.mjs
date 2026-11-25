import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Inspect Batch 1: Q51 to Q76
for (let q = 51; q <= 76; q++) {
  const p = pageMap[q];
  const k = keys[q];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  if (isNum) {
    console.log(`Q${q} (Page ${p}) [NUMERICAL Ans: ${k}]`);
    continue;
  }
  const pageText = cache[p] || '';
  console.log(`\n------------------- Q${q} (Page ${p}) [MCQ Ans: ${k}] -------------------`);
  console.log(pageText.slice(0, 400).replace(/\n+/g, ' '));
}
