import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Get all answer lines
const answers = [];
for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(l.trim())) {
      // Exclude the 2 solution summary lines:
      if (p === 169 && l.includes('20')) return;
      if (p === 170 && l.includes('10%')) return;
      answers.push({
        p,
        lIdx: idx,
        text: l.trim()
      });
    }
  });
}

console.log(`Total clean answers: ${answers.length}`);

// For each answer i from 0 to 299:
// The question number is i + 1!
// The answer line is at answers[i].p, answers[i].lIdx!
// Where does question i+1 start?
// On page answers[i].p:
// If i === 0 or answers[i-1].p < answers[i].p:
//   It starts at line 0 (or after page header on page 1)!
// If answers[i-1].p === answers[i].p:
//   It starts between answers[i-1].lIdx and answers[i].lIdx!
// Let's verify by finding the question start line for every question i+1!

let foundStarts = 0;
for (let i = 0; i < answers.length; i++) {
  const qNum = i + 1;
  const ans = answers[i];
  const pLines = (cache[String(ans.p)] || '').split('\n');
  const minLine = (i > 0 && answers[i - 1].p === ans.p) ? answers[i - 1].lIdx + 1 : 0;

  let qStartLine = -1;
  // Look for question start between minLine and ans.lIdx
  // Try matching qNum first: e.g. "^(qNum)"
  for (let l = minLine; l < ans.lIdx; l++) {
    const t = pLines[l].trim();
    if (!t) continue;
    if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
    
    // Check if line starts with qNum
    const reg = new RegExp(`^(?:[~*#_>|§©®\\s()[\\]-]{0,3})?\\b${qNum}[\\.\\:\\;\\,\\s\\-\\)\\~*#]`, 'i');
    if (reg.test(t)) {
      qStartLine = l;
      break;
    }
  }

  // If not found with exact number, find first line after previous question's solution
  if (qStartLine === -1) {
    for (let l = minLine; l < ans.lIdx; l++) {
      const t = pLines[l].trim();
      if (!t) continue;
      if (t.includes('AcadXL') || t.includes('PREVIOUS YEAR') || t.includes('300 previous') || t.includes('Maximum marks:')) continue;
      if (/^(\d{1,3}|[M©§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i.test(t) || /^(Two|Three|Four|Five|Six|Charges|Along|Shown|If|Consider|Find|In the|What|Calculate|A |An |The |When|Given|At |On |In |For )/i.test(t)) {
        qStartLine = l;
        break;
      }
    }
  }

  if (qStartLine === -1) {
    qStartLine = minLine;
  } else {
    foundStarts++;
  }
}

console.log(`Question starts found between answer boundaries: ${foundStarts} / 300`);
