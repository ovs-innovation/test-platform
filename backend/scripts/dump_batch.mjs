import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

const startQ = parseInt(process.argv[2] || '101');
const endQ = parseInt(process.argv[3] || '120');

for (let q = startQ; q <= endQ; q++) {
  const p = map[q];
  const k = keys[q];
  console.log(`\n==================== Q${q} (Page ${p}) [Key: ${k}] ====================`);
  console.log(cache[p] || 'NO OCR TEXT');
}
