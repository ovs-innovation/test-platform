import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

for (let p = 40; p <= 66; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  const answers = lines.filter(l => /answ[a-z]{0,3}\s*:/i.test(l));
  const qHeaders = lines.filter(l => /^\s*\d{1,3}[\.\s\:\-]/i.test(l));
  console.log(`Page ${p}: ${answers.length} answers, headers: [${qHeaders.map(h => h.substring(0, 15)).join(' | ')}]`);
}
