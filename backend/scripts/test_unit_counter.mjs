import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));

// A question start line on page p is typically:
// - The first question on the page (starts after page header)
// - Or starts after a previous question's solution/answer
function getPageQuestionUnits(p, lines) {
  const units = [];
  let curUnitLines = [];
  let inHeader = true;

  for (let l = 0; l < lines.length; l++) {
    const txt = lines[l].trim();
    if (!txt) continue;

    if (inHeader && (txt.includes('AcadXL') || txt.includes('PREVIOUS') || txt.includes('Current Electricity') || txt.includes('Questions: 408') || txt.includes('Time: 12') || txt.includes('Max. Marks'))) {
      continue;
    }
    inHeader = false;

    // Check if txt looks like the START of a new question
    // 1. Direct number at start: e.g. "1.", "2.", "3.", "24.", "150.", "BL.", "8B.", "B43", "0.", "TA", "HM.", "BB.", "6.", "18:", "28.", "2B."
    // 2. Standalone number followed by text
    // 3. Clear question starter phrases: "If ", "A ", "In ", "The ", "Two ", "When ", "Consider ", "Three ", "Find ", "What ", "Calculate "
    const isNumberedStart = /^(?:[~*#_>|§©®\s()[\]-]{0,2})?\b\d{1,3}[\.\:\;\,\-\)\~*#]\s+[A-Za-z]/i.test(txt) ||
                            /^\d{1,3}$/.test(txt) ||
                            /^(?:BL\.|8B\.|0\.|TA\s|HM\.|BB\.|18\:|28\.|2B\.|53\:|59\:|72\.|87\.)/i.test(txt);

    // If numbered start, and we already have some lines in curUnitLines, that means a new question begins!
    if (isNumberedStart && curUnitLines.length >= 2) {
      // Exclude option lines e.g. "(A) 5", "(B) 10" or "18) ines"
      if (!/^\(?[A-D]\)[\.\:\s]/i.test(txt) && !/^1[82]\)/.test(txt) && !/^\(?[1-4]\)[\.\:\s]/i.test(txt)) {
        units.push(curUnitLines);
        curUnitLines = [];
      }
    }

    curUnitLines.push(txt);
  }

  if (curUnitLines.length > 0) {
    units.push(curUnitLines);
  }

  return units;
}

let totalUnits = 0;
for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  const u = getPageQuestionUnits(p, lines);
  totalUnits += u.length;
}

console.log(`Total detected question units across all 211 pages: ${totalUnits}`);
