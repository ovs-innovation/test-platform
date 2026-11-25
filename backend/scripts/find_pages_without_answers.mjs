import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageAnswers = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_page_answers_map.json'), 'utf8'));
const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

const pagesWithoutAnswers = [];
for (let p = 1; p <= 250; p++) {
  if (!pageAnswers[String(p)]) {
    pagesWithoutAnswers.push(p);
  }
}

console.log(`Pages without answers (${pagesWithoutAnswers.length}):`, pagesWithoutAnswers);

// Inspect the first 10 pages without answers
for (const p of pagesWithoutAnswers.slice(0, 10)) {
  console.log(`\n=== PAGE ${p} ===`);
  const lines = (ocrCache[String(p)] || '').split('\n').filter(l => l.trim().length > 0);
  console.log(lines.slice(0, 8).join('\n'));
}
