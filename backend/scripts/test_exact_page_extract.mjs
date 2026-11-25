import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

const testQs = [1, 5, 10, 25, 51, 75, 100, 101, 102, 103, 150, 200, 250, 300, 350, 400, 407, 408];

for (const q of testQs) {
  const p = pageMap[q];
  const text = cache[p] || '';
  const first2Lines = text.split('\n').filter(Boolean).slice(0, 3).join(' ');
  console.log(`Q${q} (Page ${p}, Official Ans: ${keys[q]}): "${first2Lines.slice(0, 90)}"`);
}
