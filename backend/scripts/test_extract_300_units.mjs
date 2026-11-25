import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Extract question units
const units = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  const ansIndices = [];
  for (let l = 0; l < lines.length; l++) {
    if (/answ[a-z]{0,3}\s*:/i.test(lines[l].trim())) {
      ansIndices.push(l);
    }
  }

  // If no answer line on this page, but there's text, it might be continuation of previous page's solution (e.g. p23)
  if (ansIndices.length === 0) {
    if (units.length > 0) {
      // Append lines to previous unit's solution
      units[units.length - 1].solLines.push(...lines.map(l => l.trim()).filter(Boolean));
    }
    continue;
  }

  for (let k = 0; k < ansIndices.length; k++) {
    const ansLineIdx = ansIndices[k];
    const ansLine = lines[ansLineIdx].trim();
    const ansVal = ansLine.replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim();

    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= Math.max(0, ansLineIdx - 12); l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr')) {
        marksLineIdx = l;
        break;
      }
    }

    const qStartIdx = (k === 0) ? 0 : ansIndices[k - 1] + 1;
    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx);
    const nextQBoundary = (k + 1 < ansIndices.length) ? ansIndices[k + 1] - 8 : lines.length;
    const solLines = lines.slice(ansLineIdx + 1, Math.max(ansLineIdx + 1, nextQBoundary));

    // If ansVal looks like just an answer repetition, avoid creating duplicate unit
    units.push({
      page: p,
      ansVal,
      marksLine: marksLineIdx !== -1 ? lines[marksLineIdx].trim() : '',
      qLines: qLines.map(l => l.trim()).filter(Boolean),
      solLines: solLines.map(l => l.trim()).filter(Boolean)
    });
  }
}

console.log(`Initial units extracted: ${units.length}`);
