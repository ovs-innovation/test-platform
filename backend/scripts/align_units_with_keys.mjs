import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Extract units from all pages
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

  for (let k = 0; k < ansIndices.length; k++) {
    const ansLineIdx = ansIndices[k];
    const qStartIdx = (k === 0) ? 0 : ansIndices[k - 1] + 1;
    
    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr')) {
        marksLineIdx = l;
        break;
      }
    }

    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);
    const ansLine = lines[ansLineIdx].trim();
    const ansVal = ansLine.replace(/^.*answ[a-z]{0,3}\s*:\s*/i, '').trim();

    const nextQBoundary = (k + 1 < ansIndices.length) ? ansIndices[k + 1] - 8 : lines.length;
    const solLines = lines.slice(ansLineIdx + 1, Math.max(ansLineIdx + 1, nextQBoundary)).map(l => l.trim()).filter(Boolean);

    units.push({
      page: p,
      ansVal,
      qLines,
      solLines
    });
  }
}

console.log(`Extracted ${units.length} total raw units.`);

// Let's find which units are duplicate or false answers:
// If a unit has qLines < 2, or if ansVal is empty, or if preview is a solution fragment
for (let i = 0; i < units.length; i++) {
  const u = units[i];
  const qPreview = u.qLines.join(' ');
  const isLikelyFalse = (
    u.qLines.length === 0 ||
    /^(potential due to|since ball is|when two conducting|in electrostatics, the electric field inside|according to the work-energy|the electric field at the center|the force experienced by the charge|position vector of|normal reaction applied)\b/i.test(qPreview) ||
    /^\s*(\.|\-|\+|\=)\s*/.test(qPreview)
  );

  if (isLikelyFalse) {
    console.log(`Candidate false positive at idx ${i} (page ${u.page}): ansVal='${u.ansVal}', qPreview='${qPreview.substring(0, 60)}'`);
  }
}
