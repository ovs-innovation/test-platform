import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));

let identifiedStart = 0;
let unidentified = [];

for (const b of blocks) {
  const qNum = b.qNum;
  // look for question number header in b.rawLines
  let foundIdx = -1;
  for (let i = 0; i < b.rawLines.length; i++) {
    const t = b.rawLines[i].text.trim();
    if (!t) continue;
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    
    // Check regex variations for qNum
    // e.g. "1.", "1 ", "Q.1", "Q1", "#1", "(1)", "[1]"
    const reg = new RegExp(`^(?:[~*#_>|§©®M\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    if (reg.test(t)) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx !== -1) {
    identifiedStart++;
  } else {
    unidentified.push({ qNum, linesCount: b.rawLines.length, sample: b.rawLines.slice(0, 5).map(l => l.text) });
  }
}

console.log(`Identified start for ${identifiedStart} / 300 questions.`);
console.log(`Unidentified count: ${unidentified.length}`);
if (unidentified.length > 0) {
  console.log('Unidentified sample:', JSON.stringify(unidentified.slice(0, 15), null, 2));
}
