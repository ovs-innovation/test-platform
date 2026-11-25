import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

const questions = [];

for (let q = 1; q <= 300; q++) {
  let found = null;
  // Regex allowing various prefixes
  const reg = new RegExp(`^(?:[\\~\\*\\#\\_\\-\\>\\|\\§\\©\\®\\s\\(\\)\\[\\]]{0,3})?\\b${q}[\\.\\:\\;\\,\\s\\-\\)\\~\\*\\#]`, 'i');

  for (let p = 1; p <= 170; p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');

    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      if (!line) continue;

      if (line.includes('AcadXL') || line.includes('PREVIOUS YEAR') || line.includes('300 previous') || line.includes('Maximum marks:')) continue;
      if (line.includes('marks') && line.includes('wrong')) continue;

      if (reg.test(line)) {
        found = { q, page: p, lineIdx: l, line };
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    questions.push(found);
  } else {
    questions.push({ q, missing: true });
  }
}

const foundCount = questions.filter(q => !q.missing).length;
console.log(`Located ${foundCount} / 300 questions by global search.`);
const missing = questions.filter(q => q.missing).map(q => q.q);
console.log(`Missing count: ${missing.length}`);
console.log(`Missing questions:`, missing);
