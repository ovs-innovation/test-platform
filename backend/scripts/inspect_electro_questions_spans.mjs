import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

const answers = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l.trim())) {
      if (p === 169 && l.includes('20')) return;
      if (p === 170 && l.includes('10%')) return;
      answers.push({ p, lIdx: idx, text: l.trim() });
    }
  });
}

console.log(`Found ${answers.length} answers.`);

for (let i = 0; i < 20; i++) {
  const qNum = i + 1;
  const ans = answers[i];
  const prevAns = i > 0 ? answers[i - 1] : { p: 1, lIdx: -1 };
  console.log(`Q${qNum}: ans at P${ans.p}:L${ans.lIdx} | prevAns at P${prevAns.p}:L${prevAns.lIdx}`);
}
