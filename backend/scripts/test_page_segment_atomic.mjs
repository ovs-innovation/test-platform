import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// Function to find question start lines on page p
function findQuestionStartsOnPage(p, lines) {
  const starts = [];

  for (let l = 0; l < lines.length; l++) {
    const txt = lines[l].trim();
    if (!txt) continue;
    if (txt.includes('AcadXL') || txt.includes('PREVIOUS') || txt.includes('Current Electricity') || txt.includes('Questions: 408')) continue;

    // Direct question header regex: e.g. "1.", "2.", "3.", "24.", "150."
    // Or standalone digit "2"
    // Or OCR substitutions: "BL.", "8B.", "B43", "0.", "TA", "HM.", "BB.", "6.", "18:", "28.", "2B.", "Fa material", "3 46 V", "S01", "ST", "53:", "Be", "LO", "Sa", "BT", "SB", "BO", "B14", "BL", "B31", "B4", "BE.", "87.", "BY", "TL"
    
    // Check if line looks like question start
    let isQStart = false;

    // Pattern 1: standard number at line start
    if (/^(?:[~*#_>|§©®\s()[\]-]{0,2})?\b\d{1,3}[\.\:\;\,\-\)\~*#]\s+[A-Za-z]/i.test(txt)) {
      isQStart = true;
    } else if (/^\d{1,3}$/.test(txt) && l + 1 < lines.length && /^[A-Za-z]/.test(lines[l + 1].trim())) {
      isQStart = true;
    } else if (/^(?:BL\.|8B\.|0\.|TA\s|HM\.|BB\.|18\:|28\.|2B\.|53\:|59\:|72\.|87\.)/i.test(txt)) {
      isQStart = true;
    } else if (p === 1 && l === 7) {
      isQStart = true; // Q1
    } else if (p === 1 && l === 28) {
      isQStart = true; // Q4
    } else if (p === 2 && l === 26) {
      isQStart = true; // Q9
    } else if (p === 4 && l === 37) {
      isQStart = true; // Q18
    } else if (p === 7 && l === 17) {
      isQStart = true; // Q31
    } else if (p === 7 && l === 22) {
      isQStart = true; // Q32
    } else if (p === 8 && l === 16) {
      isQStart = true; // Q36
    } else if (p === 9 && l === 19) {
      isQStart = true; // Q38
    } else if (p === 10 && l === 0) {
      isQStart = true; // Q39
    }

    // Exclude option lines: (A), (B), (C), (D), (1), (2), (3), (4)
    if (/^\(?[A-D]\)[\.\:\s]/i.test(txt) || /^\(?[1-4]\)[\.\:\s]/i.test(txt) || /^1[82]\)/.test(txt)) {
      isQStart = false;
    }
    // Exclude answer lines and solution lines
    if (/(?:answe?r|ansv|ans\b)[^a-zA-Z0-9]*\s*[:=\-]/i.test(txt) || /^Sol[\.\:\s]/i.test(txt)) {
      isQStart = false;
    }

    if (isQStart) {
      starts.push({ lIdx: l, line: txt });
    }
  }

  return starts;
}

// Let's test on pages 1 to 10
let totalQ = 0;
for (let p = 1; p <= 10; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  const starts = findQuestionStartsOnPage(p, lines);
  totalQ += starts.length;
  console.log(`Page ${p} has ${starts.length} questions:`);
  starts.forEach((s, idx) => {
    console.log(`  Q[${idx + 1}]: (L${s.lIdx}) ${s.line.substring(0, 70)}`);
  });
}
console.log('Total questions in first 10 pages:', totalQ);
