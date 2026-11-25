import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prelim = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_clean_408_prelim.json'), 'utf8'));

console.log('Prelim length:', prelim.length);
for (let i = 0; i < 20; i++) {
  const p = prelim[i];
  console.log(`Q${p.q_num} (p.${p.page}): text: "${p.question_text.slice(0, 80)}"`);
}
