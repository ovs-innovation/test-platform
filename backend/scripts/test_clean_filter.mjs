import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Extract units with clean filtering
const units = [];

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

  // Filter out duplicate answer lines that occur within 3 lines of another answer on the same page
  const filteredAnsIndices = [];
  for (let i = 0; i < ansIndices.length; i++) {
    if (i > 0 && (ansIndices[i] - ansIndices[i - 1] <= 3)) {
      continue;
    }
    const curIdx = ansIndices[i];
    const prevText = lines.slice(Math.max(0, curIdx - 2), curIdx).join(' ');
    if (i > 0 && /^(According to|Position vector|Therefore|When two|In electrostatics|Normal reaction)\b/i.test(prevText.trim())) {
      continue;
    }
    filteredAnsIndices.push(curIdx);
  }

  for (let k = 0; k < filteredAnsIndices.length; k++) {
    const ansLineIdx = filteredAnsIndices[k];
    const qStartIdx = (k === 0) ? 0 : filteredAnsIndices[k - 1] + 1;

    let marksLineIdx = -1;
    for (let l = ansLineIdx - 1; l >= qStartIdx; l--) {
      if (lines[l].includes('marks') || lines[l].includes('Shift') || lines[l].includes('Offline') || lines[l].includes('Jan') || lines[l].includes('Apr') || lines[l].includes('May')) {
        marksLineIdx = l;
        break;
      }
    }

    const qLines = lines.slice(qStartIdx, marksLineIdx !== -1 ? marksLineIdx : ansLineIdx).map(l => l.trim()).filter(Boolean);
    const nextQBoundary = (k + 1 < filteredAnsIndices.length) ? filteredAnsIndices[k + 1] - 8 : lines.length;
    const solLines = lines.slice(ansLineIdx + 1, Math.max(ansLineIdx + 1, nextQBoundary)).map(l => l.trim()).filter(Boolean);

    // Skip empty units or units that are purely solution text
    const qPreview = qLines.join(' ');
    if (qLines.length === 0 || /^(Potential due to spherical shell|Since ball is hanging)\b/i.test(qPreview)) {
      continue;
    }

    units.push({
      page: p,
      ansLine: lines[ansLineIdx].trim(),
      qLines,
      solLines
    });
  }
}

console.log(`Filtered units extracted: ${units.length}`);
console.log('--- FIRST 5 QUESTIONS ---');
for (let i = 0; i < 5; i++) {
  console.log(`Q${i + 1} (p${units[i].page}): Key=${officialKeys[i + 1]} | ${units[i].qLines[0].substring(0, 70)}`);
}

console.log('--- LAST 5 QUESTIONS ---');
for (let i = 295; i < 300; i++) {
  console.log(`Q${i + 1} (p${units[i].page}): Key=${officialKeys[i + 1]} | ${units[i].qLines[0].substring(0, 70)}`);
}
