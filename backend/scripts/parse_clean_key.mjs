import fs from 'fs';

const text = fs.readFileSync('backend/scripts/page169_text_raw.txt', 'utf8');

// Match question number followed by answer
// Format: "1B", "32. D", "78.118", "90. 12", "go. 12" -> "90. 12"
const keyMap = new Map();

// Normalize common OCR misreads like "go. 12" -> "90. 12"
let clean = text
  .replace(/go\.\s*(\d+|[A-D])/gi, '90. $1')
  .replace(/1B\b/g, '1. B')
  .replace(/(\d+)\.([A-D]|\d+)/g, '$1. $2');

const matches = [...clean.matchAll(/(\d+)[\.:\s]+([A-Da-e]|\d+)/g)];
for (const m of matches) {
  const qNum = parseInt(m[1]);
  if (qNum >= 1 && qNum <= 260) {
    keyMap.set(qNum, m[2].toUpperCase());
  }
}

console.log(`Parsed ${keyMap.size} questions from page 169 text:`);
const missing = [];
for (let i = 1; i <= 260; i++) {
  if (!keyMap.has(i)) missing.push(i);
}
console.log(`Missing ${missing.length} from page 169:`, missing);

