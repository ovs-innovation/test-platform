import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Let's parse all rows from p79_upscaled_ocr.txt
// Remember Row 1 (Q1-Q6) was:
// 1. A, 2. C, 3. A, 4. D, 5. C, 6. D
const raw = fs.readFileSync(path.resolve(__dirname, 'p79_upscaled_ocr.txt'), 'utf8');
const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);

console.log(`Read ${lines.length} lines from upscaled OCR.`);

// Let's assemble all tokens
const fullList = [
  '1. A', '2. C', '3. A', '4. D', '5. C', '6. D'
];

for (const line of lines) {
  // Line has tokens like "7.C 8.C 9.C 10.8 nc 12.C"
  // Split by whitespace
  const tokens = line.split(/\s+/);
  // Recombine tokens that might be separated like "100." "875"
  let i = 0;
  while (i < tokens.length) {
    let t = tokens[i];
    if (/^\d+\.?$/.test(t) && i + 1 < tokens.length && !/^\d+\.?$/.test(tokens[i+1])) {
      fullList.push(`${t} ${tokens[i+1]}`);
      i += 2;
    } else {
      fullList.push(t);
      i++;
    }
  }
}

console.log('Total tokens extracted:', fullList.length);
fs.writeFileSync(path.resolve(__dirname, 'p79_tokens.json'), JSON.stringify(fullList, null, 2));
