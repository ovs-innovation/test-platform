import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

// Flatten into ordered lines with page numbers
const pageLines = [];
for (let p = 1; p <= 143; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (const line of lines) {
    pageLines.push({ page: p, line });
  }
}

function matchesQ(line, q, page) {
  if (q === 1 && page === 1 && line.includes('A conducting square loop of side L')) return true;
  if (q === 2 && page === 1 && (line.startsWith('2,') || line.includes('The inductance between Aand Dis') || line.includes('inductance between A and D'))) return true;

  const loneReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)]?$`, 'i');
  if (loneReg.test(line)) return true;

  const inlineReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)\\s]\\s*`, 'i');
  if (inlineReg.test(line)) return true;

  if (q === 9 && page === 4 && line.startsWith('9 A coil of inductance')) return true;
  if (q === 11 && page === 5 && (line.startsWith('n ') || line.includes('In an AC generator, a coil with N turns'))) return true;
  if (q === 27 && page === 16 && (line.startsWith('a ') || line.includes('In the circuit shown here, the point'))) return true;
  if (q === 46 && page === 35 && (line.includes('circuit contains two identical resistors with resistance R = 5') || line.includes('inductance with L = 2mH'))) return true;
  if (q === 71 && page === 57 && line.includes('A part of a complete circuit is shown in the figure')) return true;

  return false;
}

let currentSearch = 1;
for (let i = 0; i < pageLines.length && currentSearch <= 76; i++) {
  const { page, line } = pageLines[i];
  if (matchesQ(line, currentSearch, page)) {
    console.log(`Matched Q${currentSearch} at Page ${page}: ${line.substring(0, 80)}`);
    currentSearch++;
  }
}
