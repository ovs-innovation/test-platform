import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocrCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Check each page for "answer" case-insensitively
const altAnswers = [];
for (let p = 1; p <= 250; p++) {
  const text = ocrCache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    const lower = l.toLowerCase();
    if (lower.includes('ans') && !/^(?:ANSWER|Answer|Ans)\s*:/i.test(l)) {
      altAnswers.push({ page: p, line: l.trim() });
    }
  }
}

console.log(`Found ${altAnswers.length} alternative ans lines.`);
console.log(altAnswers.slice(0, 30));
