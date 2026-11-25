import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// We want to map all 300 questions:
// Each question has:
// qNum: 1..300
// page: 1..170
// startLine: line index on that page
// ansLine: line index of "ANSWER:"
// endLine: line index where solution ends (or next question starts)

const qMap = [];
let currentQ = 1;

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  let l = 0;
  while (l < lines.length && currentQ <= 300) {
    const line = lines[l].trim();

    // Check if line starts with currentQ
    let matched = false;

    // Direct number regex: e.g. "1.", "1 ", "1-", "1)", "1:", "1~"
    const directRegex = new RegExp(`^(\\D{0,3})?${currentQ}[\\.\\:\\;\\,\\s\\-\\)\\~\\*\\#](.*)`, 'i');
    const m = line.match(directRegex);

    if (m) {
      // Make sure it's not a marks line like "[4 marks, -1" or formula line
      if (!line.includes('marks') && !line.includes('Shift') && !line.includes('Offline')) {
        matched = true;
      }
    }

    // Special OCR misreads:
    if (!matched) {
      if (currentQ === 1 && p === 1 && /^1\s+[A-Za-z]/.test(line)) matched = true;
      if (currentQ === 6 && p === 2 && /^©[\.\:\s]/.test(line)) matched = true;
      if (currentQ === 9 && p === 3 && /^©[\.\:\s]/.test(line)) matched = true;
      if (currentQ === 11 && p === 4 && /^M[\.\:\s]/.test(line)) matched = true;
      if (currentQ === 29 && p === 10 && l === 0) matched = true;
      if (currentQ === 63 && p === 29 && /^83[\.\:\s]/.test(line)) matched = true;
      if (currentQ === 66 && p === 31 && /^86[\.\:\s]/.test(line)) matched = true;
      if (currentQ === 69 && p === 33 && /^89[\.\:\s]/.test(line)) matched = true;
    }

    if (matched) {
      qMap.push({ qNum: currentQ, page: p, startLine: l, startText: line });
      currentQ++;
    }

    l++;
  }
}

console.log(`Mapped ${qMap.length} / 300 questions.`);
if (qMap.length < 300) {
  console.log(`Failed to match Q${currentQ}`);
}
