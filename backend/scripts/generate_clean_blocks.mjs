import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocr = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const base = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_base_records.json'), 'utf8'));

// Fix page assignments in base records
const pMap = {
  108: 66,
  208: 130
};
for (const b of base) {
  if (pMap[b.qNum]) b.page = pMap[b.qNum];
}

// Group questions by page
const pageToQ = {};
for (const b of base) {
  if (!pageToQ[b.page]) pageToQ[b.page] = [];
  pageToQ[b.page].push(b.qNum);
}

// Get sliced blocks for all 228
const qRawBlocks = {};
for (let p = 1; p <= 144; p++) {
  const pStr = String(p).padStart(3, '0');
  let text = ocr[pStr] || '';
  if (p === 1) {
    const idx = text.indexOf('1. If suddenly');
    if (idx !== -1) text = text.slice(idx);
  }
  const qList = pageToQ[p] || [];
  if (qList.length === 0) continue;

  if (qList.length === 1) {
    qRawBlocks[qList[0]] = text.trim();
    continue;
  }

  // Splitting page with multiple questions
  const splitIndices = [0];
  for (let i = 1; i < qList.length; i++) {
    const q = qList[i];
    let idx = -1;

    // Custom exact markers for questions on shared pages
    const customMarkers = {
      12: '12. The change in the value',
      13: '13. Average density of the earth',
      15: '75: This question contains Statement',
      16: '16. A planet in a distant solar',
      18: '18. A body of mass m is',
      19: '19. Two bodies of masses',
      21: '21. Assuming the earth',
      23: '2a point particle is held on the axis',
      33: '33 the gravitational field in a region',
      64: '84. The value of acceleration due to gravity at Earth',
      71: 'Abody A of mass mis moving ina circular orbit',
      106: '108. The minimum and maximum distances of a planet',
      108: '108. Suppose two planets',
      110: 'M0. Tyo identical particles',
      114: 'The masses and radii of the earth and moon',
      121: '121. 16 satellites',
      141: '181. An object of mass 1kg is taken to a height',
      152: '152. K',
      164: '184. The weight of a body on the earth is 400N',
      172: '72.\nThe radii of two planets',
      174: '74. £ / is the gravitational potential',
      208: '208. A satellite is launched into a circular orbit',
      210: '210. Earth has mass 8 times',
      212: '212. Tyo planets, A and B are orbiting',
      222: '222. An object is projected vertically upwards'
    };

    if (customMarkers[q]) {
      idx = text.indexOf(customMarkers[q]);
    }

    if (idx === -1) {
      // Regex match
      const patterns = [
        new RegExp(`\\n\\s*${q}[\\.\\:\\%\\-\\)]\\s+`),
        new RegExp(`\\n\\s*${q}\\s+[A-Z]`)
      ];
      for (const pat of patterns) {
        const m = pat.exec(text);
        if (m && m.index > splitIndices[i - 1]) {
          idx = m.index;
          break;
        }
      }
    }

    if (idx !== -1) {
      splitIndices.push(idx);
    } else {
      console.warn(`Fallback split for Q${q} on page ${p}`);
      const mAns = text.indexOf('ANSWER:', splitIndices[i - 1]);
      if (mAns !== -1) {
        const nextLine = text.indexOf('\n', mAns + 15);
        splitIndices.push(nextLine !== -1 ? nextLine : text.length);
      } else {
        splitIndices.push(text.length);
      }
    }
  }
  splitIndices.push(text.length);

  for (let i = 0; i < qList.length; i++) {
    qRawBlocks[qList[i]] = text.slice(splitIndices[i], splitIndices[i + 1]).trim();
  }
}

console.log(`Extracted raw blocks for ${Object.keys(qRawBlocks).length} questions.`);
fs.writeFileSync(path.resolve(__dirname, 'gravitation_raw_blocks_verified.json'), JSON.stringify(qRawBlocks, null, 2));
