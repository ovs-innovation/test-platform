import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_diagram_urls.json'), 'utf8'));

// Build diagram files map by page
const diagFiles = fs.readdirSync(path.resolve(__dirname, 'electrostatics_diagrams'));
const pageDiagrams = {};
for (const f of diagFiles) {
  const m = f.match(/^p(\d+)_span(\d+)_y(\d+)_h(\d+)\.png$/);
  if (m) {
    const p = parseInt(m[1], 10);
    const y = parseInt(m[3], 10);
    const h = parseInt(m[4], 10);
    if (!pageDiagrams[p]) pageDiagrams[p] = [];
    pageDiagrams[p].push({ file: f, y, h });
  }
}
for (const p in pageDiagrams) {
  pageDiagrams[p].sort((a, b) => a.y - b.y);
}

const allQuestions = [];

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

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

  if (filteredAnsIndices.length === 0) {
    // Page with no answers (e.g. p23) -> append to last question's solution
    if (allQuestions.length > 0) {
      allQuestions[allQuestions.length - 1].solTextLines.push(...lines.map(l => l.trim()).filter(Boolean));
    }
    continue;
  }

  let prevQEndLine = 0;

  for (let k = 0; k < filteredAnsIndices.length; k++) {
    const ansIdx = filteredAnsIndices[k];

    // Find question start
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
      let foundNextStart = -1;
      for (let l = ansIdx + 1; l < filteredAnsIndices[k + 1]; l++) {
        const curL = lines[l].trim();
        if (/^\d{1,3}[\.\s\:\-\)]\s*[A-Za-z]/.test(curL) || /^(Two|A |An |Three|Four|Five|Six|Charges|Along|Shown|If|Consider|Find|In the|What|Calculate)\b/i.test(curL)) {
          foundNextStart = l;
          break;
        }
      }
      nextQStartIdx = foundNextStart !== -1 ? foundNextStart : Math.floor((ansIdx + filteredAnsIndices[k + 1]) / 2);
    }

    const solTextLines = lines.slice(ansIdx + 1, nextQStartIdx).map(l => l.trim()).filter(Boolean);
    prevQEndLine = nextQStartIdx;

    const qNum = allQuestions.length + 1;
    allQuestions.push({
      qNum,
      page: p,
      ansVal: lines[ansIdx].replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim(),
      qTextLines,
      solTextLines
    });
  }
}

console.log(`Total questions extracted: ${allQuestions.length}`);
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_all_300_intermediate.json'), JSON.stringify(allQuestions, null, 2));
