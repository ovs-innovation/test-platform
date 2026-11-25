import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_linear.txt'), 'utf8');

console.log(`Linear text length: ${linearText.length} characters`);

// Let's check how many lines start with a number followed by period or space
const lines = linearText.split('\n');
console.log(`Total lines: ${lines.length}`);

const qStarts = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  // match e.g. "1. ", "2. ", "15. ", "105. "
  const m = line.match(/^(\d{1,3})[\.\s\:\-]\s+([A-Z].*)/);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 300) {
      qStarts.push({ lineIdx: i, qNum: num, line: line.substring(0, 70) });
    }
  }
}

console.log(`Found ${qStarts.length} candidate question starts with capital letter following number.`);
