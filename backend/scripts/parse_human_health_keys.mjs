import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDump = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_health_pages_dump.json'), 'utf8'));

const p38 = pagesDump.find(p => p.page === 38);
const p39 = pagesDump.find(p => p.page === 39);

const fullKeyText = (p38.lines.join(' ') + ' ' + p39.lines.join(' '));

const keys = {};

// Regex match patterns like "1. D" or "1.   D"
const regex = /(\b\d+)\.\s*([A-D])/g;
let match;
while ((match = regex.exec(fullKeyText)) !== null) {
  const qNum = parseInt(match[1]);
  const ans = match[2];
  keys[qNum] = ans;
}

console.log(`Parsed ${Object.keys(keys).length} keys`);
for (let i = 1; i <= 171; i++) {
  if (!keys[i]) {
    console.error(`Missing key for question ${i}`);
  }
}

fs.writeFileSync(path.resolve(__dirname, 'human_health_official_keys.json'), JSON.stringify(keys, null, 2));
console.log('Saved official keys to human_health_official_keys.json');

