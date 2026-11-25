import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const bounds = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_question_bounds.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));

// Flatten all lines
const lines = [];
for (let p = 1; p <= 151; p++) {
  const pLines = (cache[String(p)] || '').split('\n');
  for (let l = 0; l < pLines.length; l++) {
    lines.push({ page: p, text: pLines[l] });
  }
}

let dump = '';
for (let q = 61; q <= 120; q++) {
  const b = bounds[q - 1];
  const chunk = lines.slice(b.startLine, b.endLine).map(l => l.text).join('\n');
  dump += `\n=================== Q${q} [Official Key: ${officialKeys[q]}] ===================\n`;
  dump += chunk + '\n';
}

fs.writeFileSync(path.resolve(__dirname, 'part2_raw_dump.txt'), dump, 'utf8');
console.log('Saved part2_raw_dump.txt');
