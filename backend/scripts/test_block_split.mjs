import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

const lines = cache['1'].split('\n');

// On page 1: ansIndices are at line 12, 19, 33
// Let's split page 1 into 3 questions with exact question text and solution text:

function splitPageIntoQuestions(lines, p) {
  // Find all answer lines on this page
  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    const lineTrim = lines[l].trim();
    if (/^.*answ[a-z]{0,3}\s*:/i.test(lineTrim)) {
      ansIndices.push(l);
    }
  }

  // Filter out adjacent repetitions
  const filteredAnsIndices = [];
  for (let i = 0; i < ansIndices.length; i++) {
    if (i > 0 && (ansIndices[i] - ansIndices[i - 1] <= 3)) continue;
    const curIdx = ansIndices[i];
    const prevText = lines.slice(Math.max(0, curIdx - 2), curIdx).join(' ');
    if (i > 0 && /^(According to|Position vector|Therefore|When two|In electrostatics|Normal reaction)\b/i.test(prevText.trim())) {
      continue;
    }
    filteredAnsIndices.push(curIdx);
  }

  const qBlocks = [];
  let prevQEndLine = 0;

  for (let k = 0; k < filteredAnsIndices.length; k++) {
    const ansIdx = filteredAnsIndices[k];
    
    // Find question start: from prevQEndLine up to ansIdx
    // Question start is the first line after prevQEndLine that looks like a question or has content
    let qStartIdx = prevQEndLine;
    while (qStartIdx < ansIdx && (!lines[qStartIdx].trim() || lines[qStartIdx].includes('AcadXL') || lines[qStartIdx].includes('PREVIOUS YEAR') || lines[qStartIdx].includes('300 previous') || lines[qStartIdx].includes('Free to downoad') || lines[qStartIdx].includes('Practise these') || lines[qStartIdx].includes('Electrostatics —') || lines[qStartIdx].includes('Maximum marks:'))) {
      qStartIdx++;
    }

    // Marks line before answer:
    let marksIdx = -1;
    for (let l = ansIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr') || lines[l].includes('May')) {
        marksIdx = l;
        break;
      }
    }

    const qTextLines = lines.slice(qStartIdx, marksIdx !== -1 ? marksIdx : ansIdx).map(l => l.trim()).filter(Boolean);

    // Solution starts after ansIdx:
    let nextQStartIdx = lines.length;
    if (k + 1 < filteredAnsIndices.length) {
      // Next question answer is at filteredAnsIndices[k+1]
      // Let's find where next question starts by looking backwards from filteredAnsIndices[k+1]
      // In AcadXL, question statements usually have options (A), (B), (C), (D) or start with a number
      let foundNextStart = -1;
      for (let l = ansIdx + 1; l < filteredAnsIndices[k + 1]; l++) {
        const curL = lines[l].trim();
        if (/^\d{1,3}[\.\s\:\-\)]\s+[A-Za-z]/.test(curL) || /^(Two|A |An |Three|Four|Five|Six|Charges|Along|Shown|If|Consider|Find|In the|What|Calculate)\b/i.test(curL)) {
          foundNextStart = l;
          break;
        }
      }
      nextQStartIdx = foundNextStart !== -1 ? foundNextStart : Math.floor((ansIdx + filteredAnsIndices[k + 1]) / 2);
    }

    const solTextLines = lines.slice(ansIdx + 1, nextQStartIdx).map(l => l.trim()).filter(Boolean);
    prevQEndLine = nextQStartIdx;

    qBlocks.push({
      ansVal: lines[ansIdx].replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim(),
      qTextLines,
      solTextLines
    });
  }

  return qBlocks;
}

const p1Blocks = splitPageIntoQuestions(lines, 1);
console.log(`Page 1 produced ${p1Blocks.length} blocks:`);
p1Blocks.forEach((b, i) => {
  console.log(`\n--- Block ${i + 1} ---`);
  console.log(`Answer: ${b.ansVal}`);
  console.log(`Question: ${b.qTextLines.join(' ')}`);
  console.log(`Solution: ${b.solTextLines.join(' ')}`);
});
