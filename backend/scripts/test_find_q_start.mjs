import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

function findQStartLine(b) {
  const qNum = b.qNum;
  const lines = b.rawLines;

  // 1. Direct match of qNum
  const numRegex = new RegExp(`^(?:[~*#_>|§©®M\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].text.trim();
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    if (numRegex.test(t)) {
      return i;
    }
  }

  // 2. Fuzzy match for corrupted numbers (e.g. "M." for 11, "©." for 6 or 9, "83." for 63, "86." for 66, "8." for 68, "89." for 69, "7a." for 74, "9%." for 91, "10%." for 100)
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].text.trim();
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    // Check if line looks like a question start: starts with a bullet/number and has typical question words
    if (/^(?:[0-9M©§®A-Za-z]{1,4}[\.\:\-\)]\s*)*(?:A|An|The|If|Two|Three|Four|Five|Six|Consider|On|In|Charges?|What|Find|Assume|Which|Let|When|Acharged)\b/i.test(t)) {
      // Must not be a solution sentence like "By Gauss law", "According to", "Apply condition"
      if (!/^(?:According to|Apply (?:the )?condition|By (?:the )?principle|By Gauss|Since|We know that|Therefore|Here W|From the formula)\b/i.test(t)) {
        return i;
      }
    }
  }

  // 3. Fallback: look backwards from marks line
  let marksIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/(?:marks|mars|mark|wong|wrong|wang|marking|Shift|Offline|\b20\d\d\b)/i.test(lines[i].text)) {
      marksIdx = i;
      break;
    }
  }
  if (marksIdx > 0) {
    // Look up to 5-8 lines above marksIdx
    for (let i = Math.max(0, marksIdx - 8); i < marksIdx; i++) {
      const t = lines[i].text.trim();
      if (/^[0-9M©§®A-Za-z]{1,4}[\.\:\-\)]/i.test(t) || /^(?:A|An|The|If|Two|Three|Four|Consider|On|In|Charges?|What|Find)\b/i.test(t)) {
        return i;
      }
    }
  }

  return 0;
}

let foundCount = 0;
const results = [];
for (const b of blocks) {
  const startIdx = findQStartLine(b);
  const qNum = b.qNum;
  const startLine = b.rawLines[startIdx] ? b.rawLines[startIdx].text : '';
  results.push({ qNum, startIdx, startLine: startLine.slice(0, 80) });
}

console.log('Sample question starts:');
results.slice(0, 25).forEach(r => console.log(`Q${r.qNum} [line ${r.startIdx}]: ${r.startLine}`));
console.log('Sample question starts 60..75:');
results.slice(59, 75).forEach(r => console.log(`Q${r.qNum} [line ${r.startIdx}]: ${r.startLine}`));
