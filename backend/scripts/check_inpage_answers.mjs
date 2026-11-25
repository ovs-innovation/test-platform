import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linear = fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_linear.txt'), 'utf8');

const regex = /(?:ANSWER|Answer)\s*:\s*([^\n\r]+)/gi;
let match;
let count = 0;
const foundAnswers = [];

while ((match = regex.exec(linear)) !== null) {
  count++;
  if (count <= 25) {
    console.log(`Found: "${match[0]}"`);
  }
}
console.log(`Total ANSWER: tags found: ${count}`);
