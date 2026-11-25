import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Build list of raw answers with line content and surrounding context
const answers = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    const m = l.match(/answ[a-z]{0,3}\s*:\s*(.*)/i);
    if (m) {
      // Find marks line above if any
      let marksLine = '';
      for (let prev = idx - 1; prev >= Math.max(0, idx - 10); prev--) {
        if (lines[prev].includes('marks') || lines[prev].includes('Shift') || lines[prev].includes('Offline')) {
          marksLine = lines[prev].trim();
          break;
        }
      }
      answers.push({
        page: p,
        rawAns: m[1].trim(),
        line: l,
        marksLine,
        prevLine: lines[Math.max(0, idx - 1)]?.trim() || ''
      });
    }
  }
}

console.log(`Total answers collected: ${answers.length}`);
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_all_302_answers.json'), JSON.stringify(answers, null, 2));
