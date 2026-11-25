import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_linear.txt'), 'utf8');
const lines = linearText.split('\n');

const answers = [];
let currentPage = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const pageMatch = line.match(/^---\s*PAGE\s*(\d+)\s*---$/);
  if (pageMatch) {
    currentPage = parseInt(pageMatch[1], 10);
    continue;
  }

  const m = line.match(/^ANSWER:\s*(.*)$/i);
  if (m) {
    answers.push({ lineIndex: i, page: currentPage, ans: m[1].trim() });
  }
}

console.log(`Found ${answers.length} ANSWER lines in the document!`);
fs.writeFileSync(path.resolve(__dirname, 'wave_optics_detected_answers.json'), JSON.stringify(answers, null, 2));
