import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_linear.txt'), 'utf8');
const lines = linearText.split('\n');

const qBlocks = [];
let currentPage = 1;

// Regex to detect question number at start of line
// Matches "1. ", "191. ", "1 ", "191 " etc.
const qNumRegex = /^(\d{1,3})[\.\s]\s*(.*)$/;

const detectedQs = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const pageMatch = line.match(/^---\s*PAGE\s*(\d+)\s*---$/);
  if (pageMatch) {
    currentPage = parseInt(pageMatch[1], 10);
    continue;
  }

  const m = line.match(qNumRegex);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 191) {
      // Check if this is a real question start (not inside a solution or option)
      // Usually followed by question text and within reasonable distance
      if (!detectedQs[num]) {
        detectedQs[num] = [];
      }
      detectedQs[num].push({ lineIndex: i, page: currentPage, lineText: line });
    }
  }
}

console.log(`Detected numbers count: ${Object.keys(detectedQs).length} / 191`);

const missing = [];
for (let i = 1; i <= 191; i++) {
  if (!detectedQs[i]) missing.push(i);
}
console.log('Missing question numbers:', missing);

fs.writeFileSync(path.resolve(__dirname, 'wave_optics_detected_qs.json'), JSON.stringify(detectedQs, null, 2));
