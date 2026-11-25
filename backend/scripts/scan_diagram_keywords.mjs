import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.resolve(__dirname, 'bonding_ocr_linear.txt'), 'utf8');

const regex = /(\d+)\.\s+([^\n]+(?:\n[^\n]+){1,5})/g;
let match;
const suspicious = [];

const keywords = [
  'given below', 'as follows', 'shown below', 'structure', 'diagram',
  'curve', 'figure', 'following compound', 'following molecule',
  'pictorial', 'representation'
];

while ((match = regex.exec(text)) !== null) {
  const qNum = parseInt(match[1], 10);
  const qText = match[2];
  for (const kw of keywords) {
    if (qText.toLowerCase().includes(kw)) {
      suspicious.push({ qNum, kw, snippet: qText.replace(/\n/g, ' ').slice(0, 100) });
      break;
    }
  }
}

console.log(`Found ${suspicious.length} potential questions with diagrams:`);
console.table(suspicious);
