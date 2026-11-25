import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const linearText = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');

// Parse raw 171 official keys
const raw171 = fs.readFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), 'utf8');
const lines171 = raw171.split('\n').filter(l => l.trim() && !l.includes('Answer key'));

// Let's create an explicit array of 300 answers from lines171
const rawTokens = [];
for (let line of lines171) {
  // tokenize line into 6 answers
  const parts = line.trim().split(/\s+/);
  for (let p of parts) {
    if (p) rawTokens.push(p);
  }
}

console.log(`Total tokens extracted from page 171: ${rawTokens.length}`);
fs.writeFileSync(path.resolve(__dirname, 'page171_tokens.json'), JSON.stringify(rawTokens, null, 2));
