import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

for (let q = 101; q <= 200; q++) {
  const p = map[q];
  const k = keys[q];
  const isNum = !['A', 'B', 'C', 'D'].includes(k);
  console.log(`Q${q} [${isNum ? 'NUM: ' + k : 'MCQ: ' + k}] (P.${p})`);
}
