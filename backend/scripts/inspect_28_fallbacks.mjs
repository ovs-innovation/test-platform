import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const qs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

const fallbackNums = [
  56,  63,  69,  77,  78,  82, 118,
  152, 165, 179, 189, 208, 226, 228,
  253, 268, 270, 287, 294, 295, 312,
  313, 320, 321, 327, 341, 358, 398
];

console.log('Inspecting pages for 28 fallback questions:');
fallbackNums.forEach(qNum => {
  const q = qs[qNum - 1];
  const p = q.page;
  const pText = cache[String(p)] || '';
  const firstLines = pText.split('\n').filter(Boolean).slice(0, 5).join(' || ');
  console.log(`Q${qNum} (Page ${p}): ${firstLines.substring(0, 100)}`);
});
