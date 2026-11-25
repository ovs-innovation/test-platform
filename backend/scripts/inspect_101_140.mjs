import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Inspect Q101 to Q140
for (let q = 101; q <= 140; q++) {
  const p = pageMap[q];
  const k = keys[q];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  if (isNum) continue;

  const pageText = cache[p] || '';
  const lines = pageText.split('\n').filter(Boolean);
  // Find where q is mentioned
  const qLine = lines.find(l => new RegExp(`(?:^|\\s)(?:Q\\.?\\s*)?${q}[\\.\\:\\)]`, 'i').test(l)) || lines[0] || '';
  console.log(`Q${q} (P.${p}) [Ans: ${k}]: "${qLine.slice(0, 80)}"`);
}
