import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));

// Flatten into ordered lines with page numbers
const pageLines = [];
for (let p = 1; p <= 114; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (const line of lines) {
    pageLines.push({ page: p, line });
  }
}

// Function to check if line matches Q
function matchesQ(line, q, page) {
  const expPage = Math.ceil(q / 2);
  if (Math.abs(page - expPage) > 8) return false;

  // Direct regex: number followed by dot or closing paren and a space
  const exactReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.:\\)](\\s+|$)`, 'i');
  if (exactReg.test(line)) return true;

  // Specific OCR typo overrides
  if (q === 6 && (line.startsWith('8. A radiation') || line.includes('radiation of energy E falls normally'))) return true;
  if (q === 11 && (line.startsWith('TM.') || line.includes('threshold frequency for a metallic surface'))) return true;
  if (q === 12 && (line.includes('photon of frequency v has a momentum associated with it'))) return true;
  if (q === 51 && (line.startsWith('S51') || line.includes('deBroglie wavelength of an electron is equal to 10'))) return true;
  if (q === 110 && (line.startsWith('M0.') || line.includes('Consider two separate ideal gases'))) return true;
  if (q === 111 && (line.startsWith('MM.') || line.includes('temperature of an ideal gas in three dimensions'))) return true;
  if (q === 113 && (line.startsWith('M3.') || line.includes('light of two different frequencies'))) return true;
  if (q === 115 && (line.startsWith('LUE') || line.includes('proton, a neutron, an electron and an a-particle have same energy'))) return true;
  if (q === 117 && (line.startsWith('M7.') || line.includes('stopping potential for photoelectrons emitted from a surface illuminated by light of wavelength 6630'))) return true;
  if (q === 119 && (line.startsWith('M8.') || line.startsWith('M9.') || line.includes('particle and a carbon 12 atom has same kinetic energy'))) return true;
  if (q === 133 && (line.includes('particle and a proton are accelerated from rest through the same potential difference'))) return true;
  if (q === 135 && (line.includes('particle, a proton and an electron have the same kinetic energy. Which one of the following is'))) return true;
  if (q === 159 && (line.includes('de Broglie wavelength of an electron having kinetic energy E is') || line.startsWith('189. The de Broglie wavelength'))) return true;
  if (q === 182 && (line.startsWith('82.') || line.includes('electron in the ground state of the hydrogen atom'))) return true;
  if (q === 185 && (line.startsWith('Ho:') || line.includes('sub-atomic particle of mass') || line.includes('velocity 2.21'))) return true;
  if (q === 189 && (line.includes('stopping potential Vo v/s frequency (v) curve is plotted') || line.includes('In photoelectric effect, the stopping potential Vo'))) return true;
  if (q === 190 && (line.startsWith('i308') || line.includes('ratio of the power of a light source'))) return true;
  if (q === 191 && (line.startsWith('bi') || line.includes('proton of mass') && line.includes('same energy as that of a photon of wavelength'))) return true;
  if (q === 192 && (line.startsWith('ea') || line.includes('de Broglie wavelength and kinetic energy'))) return true;

  return false;
}

let currentSearch = 1;
const found = {};
let lastIdx = 0;

for (let i = 0; i < pageLines.length && currentSearch <= 217; i++) {
  const { page, line } = pageLines[i];
  if (matchesQ(line, currentSearch, page)) {
    found[currentSearch] = { page, lineIndex: i, line };
    lastIdx = i;
    currentSearch++;
  }
}

console.log(`Matched sequentially: ${Object.keys(found).length} / 217`);
if (currentSearch <= 217) {
  console.log(`Stuck at Q${currentSearch}! Printing next 20 lines after last found (Q${currentSearch - 1} at page ${found[currentSearch-1].page}):`);
  for (let j = lastIdx + 1; j < Math.min(pageLines.length, lastIdx + 25); j++) {
    console.log(`[p${pageLines[j].page}]: ${pageLines[j].line.slice(0, 90)}`);
  }
}
