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
  // Expected page constraint
  const expPage = Math.ceil(q * 0.82); // 173 Qs across 143 pages -> 143/173 ~ 0.82
  if (Math.abs(page - expPage) > 10) return false;

  if (q === 1 && page === 1 && line.includes('A conducting square loop of side L')) return true;
  if (q === 2 && page === 1 && (line.startsWith('2,') || line.includes('The inductance between Aand Dis') || line.includes('inductance between A and D'))) return true;

  const loneReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)]?$`, 'i');
  if (loneReg.test(line)) return true;

  const inlineReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)\\s]\\s*`, 'i');
  if (inlineReg.test(line)) return true;

  if (q === 9 && page === 4 && line.startsWith('9 A coil of inductance')) return true;
  if (q === 11 && page === 5 && (line.startsWith('n ') || line.includes('In an AC generator, a coil with N turns'))) return true;
  if (q === 27 && page === 16 && (line.startsWith('a ') || line.includes('In the circuit shown here, the point'))) return true;
  if (q === 46 && page === 35 && line.includes('circuit contains two identical resistors with resistance R = 5')) return true;
  if (q === 71 && page === 57 && line.includes('A part of a complete circuit is shown in the figure')) return true;
  if (q === 74 && page === 59 && line.includes('The current (i) attime t = 0 and t = oo respectively')) return true;

  // Let's see what happens after 74:
  if (q === 110 && page === 90 && line.includes('square loop of area 25cm')) return true;
  if (q === 111 && page === 91 && (line.startsWith('mn ') || line.includes('As per the given figure, if'))) return true;
  if (q === 112 && page === 92 && (line.startsWith('M2.') || line.includes('rectangular coil of 100 turns each having area 14 x 10'))) return true;
  if (q === 113 && page === 92 && (line.startsWith('M3.') || line.includes('square shaped coil of area 70cm'))) return true;
  if (q === 114 && page === 93 && line.includes('induced emf can be produced in a coil by')) return true;
  if (q === 115 && page === 93 && line.includes('ratio of average electric energy density to average magnetic energy density')) return true;
  if (q === 116 && page === 94 && line.includes('concentric circular coils with radii 1em and 1000em')) return true;
  if (q === 117 && page === 94 && line.includes('Certain galvanometers have a fixed core made of non magnetic')) return true;
  if (q === 118 && page === 95 && line.includes('emf of 0.08V is induced in a metal rod of length 10cm')) return true;
  if (q === 119 && page === 96 && line.includes('metal rod') && line.includes('completes the circuit')) return true;
  if (q === 144 && page === 114 && line.includes('current changes from —2 A to +2 A in 0.2 s')) return true;

  return false;
}

let currentSearch = 1;
const matched = {};
for (let i = 0; i < pageLines.length && currentSearch <= 173; i++) {
  const { page, line } = pageLines[i];
  if (matchesQ(line, currentSearch, page)) {
    matched[currentSearch] = { page, line: line.substring(0, 80) };
    currentSearch++;
  }
}

console.log(`Matched: ${Object.keys(matched).length} / 173`);
const missing = [];
for (let q = 1; q <= 173; q++) {
  if (!matched[q]) missing.push(q);
}
console.log('Missing:', missing);
