import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Run same logic and find which units have qLines < 2
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

  if (ansIndices.length === 0) continue;

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
    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);

    units.push({
      page: p,
      k,
      ansVal,
      qLineCount: qLines.length,
      qPreview: qLines[0] || 'EMPTY'
    });
  }
}

for (let i = 0; i < units.length; i++) {
  if (units[i].qLineCount <= 1) {
    console.log(`Unit idx ${i} (p${units[i].page}, k=${units[i].k}): ansVal='${units[i].ansVal}', count=${units[i].qLineCount}, preview='${units[i].qPreview}'`);
  }
}
