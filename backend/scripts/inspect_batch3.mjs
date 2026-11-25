import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Inspect Batch 3: Q111 to Q140
console.log('=== BATCH 3: Q111 to Q140 ===');
for (let q = 111; q <= 140; q++) {
  const p = pageMap[q];
  const k = keys[q];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  if (isNum) {
    console.log(`Q${q} (P.${p}) [NUM: ${k}]`);
  } else {
    const text = (cache[p] || '').split('\n').filter(Boolean).slice(0, 4).join(' ').slice(0, 80);
    console.log(`Q${q} (P.${p}) [MCQ: ${k}]: "${text}"`);
  }
}
