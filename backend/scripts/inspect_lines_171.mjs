import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw171 = fs.readFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), 'utf8');
const lines = raw171.split('\n').filter(l => l.trim() && !l.includes('Answer key'));

for (let i = 0; i < lines.length; i++) {
  const startQ = i * 6 + 1;
  const endQ = startQ + 5;
  console.log(`Line ${i + 1} (Q${startQ}..Q${endQ}): ${lines[i]}`);
}
