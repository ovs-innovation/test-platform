import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));

// Flatten into ordered lines with page numbers
const pageLines = [];
for (let p = 1; p <= 114; p++) {
  const text = pages[p] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (const line of lines) {
    pageLines.push({ page: p, line });
  }
}

function matchesQ(line, q, page) {
  const expPage = Math.ceil(q / 2);
  if (Math.abs(page - expPage) > 8) return false;

  const exactReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.:\\)](\\s+|$)`, 'i');
  if (exactReg.test(line)) return true;

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
const qIndices = {};

for (let i = 0; i < pageLines.length && currentSearch <= 217; i++) {
  const { page, line } = pageLines[i];
  if (matchesQ(line, currentSearch, page)) {
    qIndices[currentSearch] = i;
    currentSearch++;
  }
}

console.log(`Matched sequentially: ${Object.keys(qIndices).length} / 217`);

const chunks = {};
for (let q = 1; q <= 217; q++) {
  const startIdx = qIndices[q];
  const endIdx = q < 217 ? qIndices[q + 1] : pageLines.length;
  if (startIdx !== undefined && endIdx !== undefined) {
    const rawLines = pageLines.slice(startIdx, endIdx);
    chunks[q] = {
      q,
      startPage: rawLines[0].page,
      endPage: rawLines[rawLines.length - 1].page,
      lines: rawLines.map(r => r.line),
      text: rawLines.map(r => r.line).join('\n')
    };
  }
}

fs.writeFileSync(path.resolve(__dirname, 'dual_nature_monotonic_chunks.json'), JSON.stringify(chunks, null, 2));
console.log(`Saved ${Object.keys(chunks).length} / 217 chunks to dual_nature_monotonic_chunks.json`);
