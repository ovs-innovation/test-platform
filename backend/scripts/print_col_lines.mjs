import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const p251 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_col_lines_p251.json'), 'utf8'));
const p252 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_col_lines_p252.json'), 'utf8'));

console.log('=== PAGE 251 ===');
for (let c = 0; c < 6; c++) {
  console.log(`Col ${c} (length ${p251[c].length}):`);
  console.log(p251[c].join(' | '));
}

console.log('\n=== PAGE 252 ===');
for (let c = 0; c < 6; c++) {
  console.log(`Col ${c} (length ${p252[c].length}):`);
  console.log(p252[c].join(' | '));
}
