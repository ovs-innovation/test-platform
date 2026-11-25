import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw171 = fs.readFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), 'utf8');
const lines = raw171.split('\n').filter(l => l.trim() && !l.includes('Answer key'));

// We know each line i (0..49) corresponds to questions (i*6 + 1) to (i*6 + 6)
// Let's print each line with its tokens
const officialKeys = {};

for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
  const lineStr = lines[lineIdx].trim();
  const startQ = lineIdx * 6 + 1;
  console.log(`L${lineIdx + 1} (Q${startQ}..Q${startQ + 5}): ${lineStr}`);
}
