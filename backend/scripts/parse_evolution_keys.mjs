import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_pages_dump.json'), 'utf8'));

// Answer key is on page 38 and 39
const p38Text = pages[37].rawText;
const p39Text = pages[38].rawText;
const combinedText = p38Text + ' ' + p39Text;

console.log('Combined text preview (p38):', p38Text.slice(0, 300));
console.log('Combined text preview (p39):', p39Text.slice(0, 300));

const keyMatches = [...combinedText.matchAll(/(\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)/g)];
const keys = {};
for (const m of keyMatches) {
  const num = parseInt(m[1]);
  const val = m[2].replace(/\s+/g, '');
  keys[num] = val;
}

console.log('Extracted keys count:', Object.keys(keys).length);
for (let i = 1; i <= 189; i++) {
  if (!keys[i]) {
    console.log(`Missing key for Q${i}`);
  }
}

console.log('Q1:', keys[1], 'Q188:', keys[188], 'Q189:', keys[189]);

const outFile = path.resolve(__dirname, 'evolution_official_keys.json');
fs.writeFileSync(outFile, JSON.stringify(keys, null, 2));
console.log('Saved official keys to', outFile);

