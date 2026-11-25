import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

const allAnswers = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let l of lines) {
    l = l.trim();
    const m = l.match(/answ[a-z]{0,3}\s*:\s*(.*)/i);
    if (m) {
      allAnswers.push({ page: p, ans: m[1].trim() });
    }
  }
}

console.log(`With flexible regex, found ${allAnswers.length} ANSWER entries!`);
