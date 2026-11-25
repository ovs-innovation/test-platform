import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));
const ranges = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_page_ranges_final.json'), 'utf8'));

const rawBlocks = {};

for (let p = 1; p <= 78; p++) {
  const pad = String(p).padStart(3, '0');
  const pageText = cache[pad] || '';
  const [startQ, endQ] = ranges[p];

  if (startQ === endQ) {
    rawBlocks[startQ] = {
      page: p,
      text: pageText.trim()
    };
    continue;
  }

  // Find start indices of all questions on this page
  // We can look for the dividing lines / question numbers
  const lines = pageText.split('\n');
  const qLineIndices = [];

  for (let q = startQ; q <= endQ; q++) {
    // Find line index for q
    let foundLine = -1;
    for (let l = 0; l < lines.length; l++) {
      const line = lines[l].trim();
      // Match question start
      // e.g. "q.", "q:", "q " or special cases
      if (
        new RegExp(`^${q}[\\.:\\-\\)]\\s+`, 'i').test(line) ||
        new RegExp(`^Q\\.?\\s*${q}[\\.:\\-\\)]`, 'i').test(line) ||
        // special OCR glitches:
        (q === 11 && /^M-|^Density of a 2\.05M/i.test(line)) ||
        (q === 14 && /^"4\./.test(line)) ||
        (q === 15 && /^5\.\s*The ratio of/i.test(line)) ||
        (q === 16 && /^76\.\s*The concentrated/i.test(line)) ||
        (q === 17 && /^”\s*5 g of benzene/i.test(line)) ||
        (q === 19 && /^9\.\s*When CO/i.test(line)) ||
        (q === 26 && /^26\.\s*g litres/i.test(line)) ||
        (q === 27 && /^The molecular formula/i.test(line)) ||
        (q === 50 && /^80\.\s*The/i.test(line)) ||
        (q === 53 && /^83\.\s*50m/i.test(line)) ||
        (q === 58 && /^8\.\s*What/i.test(line)) ||
        (q === 59 && /^8\.\s*What/i.test(line)) ||
        (q === 60 && /^9\.\s*A 100/i.test(line)) ||
        (q === 65 && /^85\.\s*The vokume/i.test(line)) ||
        (q === 67 && /^7\.\s*5g of/i.test(line)) ||
        (q === 69 && /^89\.\s*54 of zinc/i.test(line)) ||
        (q === 70 && /^7\.\s*The mass/i.test(line)) ||
        (q === 72 && /^72s\s*0\.023/i.test(line)) ||
        (q === 86 && /^0\.45 g of an organic/i.test(line)) ||
        (q === 88 && /^88\.|^NO,|^HNO,/i.test(line)) ||
        (q === 91 && /^7\.\s*100 mL of Na,PO/i.test(line)) ||
        (q === 93 && /^9\.\s*coon|Consider the above reaction where 6\.1g/i.test(line)) ||
        (q === 94 && /^94\.\s*250mL/i.test(line)) ||
        (q === 108 && /^108\.\s*11,/i.test(line)) ||
        (q === 110 && /^M0\./i.test(line)) ||
        (q === 111 && /^MM\./i.test(line)) ||
        (q === 112 && /^M2\./i.test(line)) ||
        (q === 113 && /^M3\./i.test(line)) ||
        (q === 114 && /^M4\./i.test(line)) ||
        (q === 115 && /^M5\./i.test(line)) ||
        (q === 116 && /^me\./i.test(line)) ||
        (q === 117 && /^M7\.|^7\.\s*46 g of/i.test(line)) ||
        (q === 118 && /^8\.\s*The number of/i.test(line)) ||
        (q === 119 && /^mne\.|^119\./i.test(line)) ||
        (q === 120 && /^120\./i.test(line)) ||
        (q === 127 && /^127\./i.test(line)) ||
        (q === 131 && /^31\.\s*21 of/i.test(line)) ||
        (q === 132 && /^132\s*Ny/i.test(line)) ||
        (q === 139 && /^139\./i.test(line)) ||
        (q === 140 && /^140\./i.test(line)) ||
        (q === 141 && /^141\./i.test(line)) ||
        (q === 144 && /^44\.\s*A sample/i.test(line)) ||
        (q === 145 && /^145\./i.test(line)) ||
        (q === 146 && /^M6\./i.test(line)) ||
        (q === 147 && /^47\.\s*\(?5g/i.test(line)) ||
        (q === 148 && /^48\.\s*Which of the/i.test(line)) ||
        (q === 151 && /^51\.\s*Given below/i.test(line)) ||
        (q === 154 && /^"?54\.\s*The volume/i.test(line)) ||
        (q === 155 && /^155\./i.test(line)) ||
        (q === 157 && /^57\s*An organic/i.test(line)) ||
        (q === 158 && /^58\.\s*20mL/i.test(line)) ||
        (q === 162 && /^62\.\s*\\?ioiume|Volume of 3MNaOH/i.test(line)) ||
        (q === 163 && /^63\.\s*\|?\s*mole of PbS/i.test(line)) ||
        (q === 164 && /^184\.\s*if 50mL|164\./i.test(line)) ||
        (q === 167 && /^67\.\s*The molarity/i.test(line)) ||
        (q === 170 && /^70\.\s*In the reaction/i.test(line)) ||
        (q === 171 && /^71\.\s*Choose the/i.test(line)) ||
        (q === 174 && /^74\.\s*The incorrect/i.test(line)) ||
        (q === 175 && /^75\.\s*The number of/i.test(line)) ||
        (q === 176 && /^76\.\s*The density/i.test(line)) ||
        (q === 178 && /^78\.\s*Combustion of glucose/i.test(line)) ||
        (q === 182 && /^82\.\s*When 5 moles/i.test(line)) ||
        (q === 185 && /^785\.|185\.\s*,?01 mole/i.test(line)) ||
        (q === 191 && /^TOL\.|^191\./i.test(line)) ||
        (q === 197 && /^"?97\.\s*CaCO/i.test(line)) ||
        (q === 198 && /^198\./i.test(line)) ||
        (q === 201 && /^01\.\s*Mass of urea/i.test(line)) ||
        (q === 207 && /^207\./i.test(line)) ||
        (q === 208 && /^0\.\s*When|208\./i.test(line)) ||
        (q === 209 && /^209\./i.test(line)) ||
        (q === 211 && /^2M\.|^211\./i.test(line)) ||
        (q === 217 && /^6\.\s*Molar mass|217\./i.test(line)) ||
        (q === 220 && /^220\./i.test(line)) ||
        (q === 221 && /^221\./i.test(line))
      ) {
        foundLine = l;
        break;
      }
    }
    qLineIndices.push({ q, lineIdx: foundLine });
  }

  // Slice lines between question starts
  for (let i = 0; i < qLineIndices.length; i++) {
    const { q, lineIdx } = qLineIndices[i];
    const nextLineIdx = (i + 1 < qLineIndices.length) ? qLineIndices[i + 1].lineIdx : lines.length;

    if (lineIdx !== -1 && nextLineIdx !== -1 && nextLineIdx > lineIdx) {
      rawBlocks[q] = {
        page: p,
        text: lines.slice(lineIdx, nextLineIdx).join('\n').trim()
      };
    } else {
      // Fallback: estimate slice proportional to number of questions
      const numQ = endQ - startQ + 1;
      const relIdx = q - startQ;
      const startL = Math.floor(lines.length * relIdx / numQ);
      const endL = Math.floor(lines.length * (relIdx + 1) / numQ);
      rawBlocks[q] = {
        page: p,
        text: lines.slice(startL, endL).join('\n').trim()
      };
      console.warn(`Fallback slice for Q${q} on page ${p}`);
    }
  }
}

console.log(`Sliced all ${Object.keys(rawBlocks).length}/221 raw blocks.`);
fs.writeFileSync(path.resolve(__dirname, 'basic_chem_raw_blocks.json'), JSON.stringify(rawBlocks, null, 2));
console.log('Saved basic_chem_raw_blocks.json');
