import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ac_jee_ocr_cache.json'), 'utf8'));

// Flatten lines with page numbers
const pageLines = [];
for (let p = 1; p <= 112; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (let li = 0; li < lines.length; li++) {
    pageLines.push({ page: p, lineIdx: li, line: lines[li] });
  }
}

function matchesQ(item, q) {
  const { page, line } = item;
  const expPage = Math.ceil(q * 0.63);
  if (Math.abs(page - expPage) > 8) return false;

  // Specific overrides for OCR quirks
  if (q === 1 && page === 1 && line.includes('The power factor of an AC circuit having resistance (R)')) return true;
  if (q === 7 && page === 3 && line.startsWith('7 In an LCR series')) return true;
  if (q === 11 && page === 4 && (line.startsWith('MM.') || line.includes('self inductance of the motor of an electric fan'))) return true;
  if (q === 14 && page === 5 && (line.startsWith('18,') || line.includes('In a series LCR circuit R = 200'))) return true;
  if (q === 15 && page === 5 && (line.startsWith('5a') || line.includes('A fully charged capacitor C'))) return true;
  if (q === 16 && page === 6 && (line.startsWith('16.') || line.includes('In an LCR circuit shown in the following figure'))) return true;
  if (q === 17 && page === 6 && (line.startsWith('1.') || line.includes('In the circuit shown here, the voltage across E and C'))) return true;
  if (q === 19 && page === 7 && (line.startsWith('Rs') || line.includes('An LCR circuit as shown in the figure is connected'))) return true;
  if (q === 46 && page === 30 && (line.startsWith('48.') || line.includes('In a series LR circuit, power of 400W'))) return true;
  if (q === 51 && page === 33 && (line.startsWith('51') || line.includes('The angular frequency of alternating current in a L-C-R'))) return true;
  if (q === 58 && page === 37 && (line.startsWith('BS') || line.startsWith('58.') || line.includes('An RC circuit as shown in the figure'))) return true;
  if (q === 66 && page === 42 && (line.startsWith('9 ') || line.includes('inductive reactance (X 1) is 102 and the capacitive reactance (X¢) is 49') || line.includes('inductive reactance (X_L) is 10'))) return true;
  if (q === 81 && page === 53 && (line.startsWith('81') || line.includes('an inductor, a capacitor and a resistor are connected in series with X'))) return true;
  if (q === 91 && page === 59 && (line.startsWith('9 ') || line.includes('current flowing through an ac circuit is given by I = 5sin'))) return true;
  if (q === 94 && page === 61 && (line.startsWith('LL') || line.startsWith('94.') || line.includes('In the given circuit, the magnitude of'))) return true;
  if (q === 110 && page === 71 && (line.startsWith('MO.') || line.includes('circuit element X when connected to an AC supply'))) return true;
  if (q === 111 && page === 72 && (line.startsWith('MM.') || line.includes('ratio of the quality factor and the band width is'))) return true;
  if (q === 112 && page === 73 && (line.startsWith('M2.') || line.includes('LCR series circuit of capacitance 62.5nF'))) return true;
  if (q === 113 && page === 73 && (line.startsWith('113.') || line.includes('In an LC oscillator, if values of inductance and capacitance become twice'))) return true;
  if (q === 114 && page === 74 && (line.startsWith('M4.') || line.includes('A series LCR circuit is connected to an AC source of 220V, 50Hz. The circuit contains a resistance R = 80'))) return true;
  if (q === 115 && page === 74 && (line.startsWith('115.') || line.includes('An inductor of inductance 2uH is connected in series') || line.includes('An inductor of inductance 2'))) return true;
  if (q === 116 && page === 75 && (line.startsWith('M6.') || line.includes('For the given figures, choose the correct options'))) return true;
  if (q === 117 && page === 76 && (line.startsWith('17.') || line.includes('In a series LR circuit with X 1 = R') || line.includes('In a series LR circuit with X_L = R'))) return true;
  if (q === 118 && page === 77 && (line.startsWith('Ha.') || line.includes('rms value of current (Trms) through the resistor R is') || line.includes('rms value of current (Irms) through the resistor R is'))) return true;
  if (q === 119 && page === 78 && (line.startsWith('M9.') || line.includes('An inductor of 0.5mH, a capacitor of 20') || line.includes('amplitude of current of the circuit is \\/zA'))) return true;
  if (q === 120 && page === 78 && (line.startsWith('120.') || line.includes('A series LCR circuit consists of R = 80'))) return true;
  if (q === 132 && page === 85 && (line.startsWith('Le') || line.includes('A series LCR circuit with') && line.includes('mH,C ='))) return true;
  if (q === 135 && page === 86 && (line.startsWith('5.') || line.startsWith('135.') || line.includes('circuit, voltage and current are given by: V = 100'))) return true;
  if (q === 141 && page === 90 && (line.startsWith('181.') || line.startsWith('141.') || line.includes('series LCR circuit, the capacitance is changed from C to 4C'))) return true;
  if (q === 146 && page === 93 && (line.startsWith('148.') || line.startsWith('146.') || line.includes('Match List | with List Il') || line.includes('Match List I with List II'))) return true;
  if (q === 157 && page === 99 && (line.startsWith('82') || line.startsWith('157.') || line.includes('capacitor of reactance 4+/3') || (line.includes('capacitor of reactance 4') && line.includes('resistor of resistance 4')))) return true;
  if (q === 166 && page === 104 && (line.startsWith('168.') || line.startsWith('166.') || line.includes('For ac circuit shown in figure, R = 100k'))) return true;
  if (q === 170 && page === 106 && (line.startsWith('170.') || line.includes('For the series LCR circuit connected with 220 V'))) return true;
  if (q === 173 && page === 108 && (line.startsWith('173.') || line.includes('shows an LCR series circuit with two switches S1 and Sa'))) return true;

  // General regex
  const loneReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)]?$`, 'i');
  if (loneReg.test(line)) return true;

  const inlineReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)\\s]\\s*`, 'i');
  if (inlineReg.test(line)) return true;

  return false;
}

// Perform monotonic segmentation
const chunks = {};
let currentLineIdx = 0;

for (let q = 1; q <= 177; q++) {
  let foundIdx = -1;
  for (let i = currentLineIdx; i < pageLines.length; i++) {
    if (matchesQ(pageLines[i], q)) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx === -1) {
    console.error(`FAILED to find Q${q} starting from line ${currentLineIdx} (page ${pageLines[currentLineIdx]?.page})`);
    break;
  }

  if (q > 1) {
    const prevQ = q - 1;
    const slice = pageLines.slice(chunks[prevQ].startLineIdx, foundIdx);
    chunks[prevQ].lines = slice.map(s => s.line);
    chunks[prevQ].endPage = slice[slice.length - 1].page;
    chunks[prevQ].text = chunks[prevQ].lines.join('\n');
  }

  chunks[q] = {
    q,
    startLineIdx: foundIdx,
    startPage: pageLines[foundIdx].page,
    headerLine: pageLines[foundIdx].line
  };

  currentLineIdx = foundIdx + 1;
}

if (chunks[177]) {
  const slice = pageLines.slice(chunks[177].startLineIdx);
  chunks[177].lines = slice.map(s => s.line);
  chunks[177].endPage = slice[slice.length - 1].page;
  chunks[177].text = chunks[177].lines.join('\n');
}

console.log(`Matched ${Object.keys(chunks).length} / 177 questions monotonically!`);

fs.writeFileSync(
  path.resolve(__dirname, 'ac_monotonic_chunks.json'),
  JSON.stringify(chunks, null, 2)
);
console.log('Saved ac_monotonic_chunks.json');
