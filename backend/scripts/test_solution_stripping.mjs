import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

function testPage(p) {
  const lines = cache[String(p)].split('\n');
  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    if (/^.*answ[a-z]{0,3}\s*:/i.test(lines[l].trim())) {
      ansIndices.push(l);
    }
  }

  const filteredAns = [];
  for (let i = 0; i < ansIndices.length; i++) {
    if (i > 0 && (ansIndices[i] - ansIndices[i - 1] <= 3)) continue;
    filteredAns.push(ansIndices[i]);
  }

  const units = [];
  for (let k = 0; k < filteredAns.length; k++) {
    const ansLineIdx = filteredAns[k];
    const qStartIdx = (k === 0) ? 0 : filteredAns[k - 1] + 1;

    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr') || lines[l].includes('May')) {
        marksLineIdx = l;
        break;
      }
    }

    let rawQLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);

    // If k > 0, find where the question statement actually begins
    let solPrefix = [];
    if (k > 0) {
      const qStartRegex = /^(\d{1,3}[\.\s\:\-\)]|Two|Three|Four|Five|Six|Charges|Along|Shown|If|Consider|Find|In the|What|Calculate|A |An |The |When|Given|At |On |In |For )/i;
      const startIdx = rawQLines.findIndex(l => qStartRegex.test(l));
      if (startIdx > 0) {
        solPrefix = rawQLines.slice(0, startIdx);
        rawQLines = rawQLines.slice(startIdx);
        // Add solPrefix to previous unit's solLines
        units[k - 1].solLines.push(...solPrefix);
      }
    } else if (p === 1) {
      // Strip header on page 1
      const startIdx = rawQLines.findIndex(l => /^1\s+[A-Za-z]/.test(l));
      if (startIdx !== -1) rawQLines = rawQLines.slice(startIdx);
    }

    const solLines = lines.slice(ansLineIdx + 1, Math.min(lines.length, (k + 1 < filteredAns.length) ? filteredAns[k + 1] : lines.length)).map(l => l.trim()).filter(Boolean);

    units.push({
      ansVal: lines[ansLineIdx].replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim(),
      qLines: rawQLines,
      solLines
    });
  }

  return units;
}

for (let p = 1; p <= 3; p++) {
  console.log(`\n=================== PAGE ${p} ===================`);
  const units = testPage(p);
  units.forEach((u, idx) => {
    console.log(`--- Q${idx + 1} on p${p} (Ans: ${u.ansVal}) ---`);
    console.log(`Q: ${u.qLines[0] || 'EMPTY'}`);
    console.log(`Sol: ${u.solLines.join(' ').substring(0, 80)}`);
  });
}
