import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));

const diagramMap = {
  13: diagramUrls['dual_nature_q13_diagram.png'],
  14: diagramUrls['dual_nature_q14_diagram.png'],
  15: diagramUrls['dual_nature_q15_diagram.png'],
  27: diagramUrls['dual_nature_q27_diagram.png'],
  35: diagramUrls['dual_nature_q35_diagram.png'],
  62: diagramUrls['dual_nature_q62_diagram.png'],
  75: diagramUrls['dual_nature_q75_diagram.png'],
  76: diagramUrls['dual_nature_q76_diagram.png'],
  153: diagramUrls['dual_nature_q153_diagram.png'],
  164: diagramUrls['dual_nature_q164_diagram.png'],
  172: diagramUrls['dual_nature_q172_diagram.png'],
  195: diagramUrls['dual_nature_q195_diagram.png'],
  210: diagramUrls['dual_nature_q210_diagram.png']
};

const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

function cleanKaTeX(text) {
  if (!text) return '';
  let s = text.trim();
  s = s.replace(/AcadXL™[\s\S]*?ACADXL\s*-\s*EDUCATION\s*WITH\s*DISCIPLINE/gi, '');
  s = s.replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com[^\n]*/gi, '');
  s = s.replace(/Dual Nature of Matter\s*—\s*JEE[^\n]*/gi, '');
  s = s.replace(/Time:\s*\d+\s*minutes[^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*-\d+\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*1\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/ANSWER\s*:\s*[A-D0-9\.\-]+/gi, '');

  s = s.replace(/(\d+)\s*x\s*10\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\^([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\s*\^\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/\b([hvcmeEkKVpP])\^(\d+)/g, '$1^{$2}');
  s = s.replace(/10\s*\^\s*([–\-\+−]?\d+)/g, '10^{$1}');
  s = s.replace(/([0-9])\s*eV\b/gi, '$1\\text{ eV}');
  s = s.replace(/([0-9])\s*nm\b/gi, '$1\\text{ nm}');
  s = s.replace(/([0-9])\s*m\/s\b/gi, '$1\\text{ m/s}');
  s = s.replace(/([0-9])\s*J\.?s\b/gi, '$1\\text{ J}\\cdot\\text{s}');
  s = s.replace(/([0-9])\s*kg\b/gi, '$1\\text{ kg}');
  s = s.replace(/([0-9])\s*V\b/g, '$1\\text{ V}');
  s = s.replace(/([0-9])\s*Hz\b/g, '$1\\text{ Hz}');
  s = s.replace(/([0-9])\s*Å\b/g, '$1\\text{ \\AA}');
  s = s.replace(/\bA\s*°/g, '\\text{\\AA}');
  s = s.replace(/\\text\{ \\AA\}/g, '\\text{\\AA}');
  s = s.replace(/\bde\s*-\s*Broglie\b/gi, 'de Broglie');
  s = s.replace(/\bdeBroglie\b/gi, 'de Broglie');
  s = s.replace(/photo\s*-\s*electric/gi, 'photoelectric');
  s = s.replace(/photo\s*-\s*electrons/gi, 'photoelectrons');
  s = s.replace(/photo\s*-\s*cathode/gi, 'photocathode');
  s = s.replace(/--+/g, '—');
  return s.trim();
}

function parseMCQ(raw) {
  let text = ' ' + raw.trim() + ' ';
  text = text.replace(/®\s*\)/g, '(B)');
  text = text.replace(/®/g, '(B)');
  text = text.replace(/©\s*\)/g, '(C)');
  text = text.replace(/©/g, '(C)');
  text = text.replace(/\bW\s*([0-9a-zA-Z\$\\])/g, '(A) $1');
  text = text.replace(/(?:^|\n|\s)\(?[aA]\)\s*/g, ' <<<A>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[bB8]\)\s*/g, ' <<<B>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[cC]\)\s*/g, ' <<<C>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[dD0]\)\s*/g, ' <<<D>>> ');

  const aIdx = text.indexOf('<<<A>>>');
  const bIdx = text.indexOf('<<<B>>>', aIdx !== -1 ? aIdx + 7 : 0);
  const cIdx = text.indexOf('<<<C>>>', bIdx !== -1 ? bIdx + 7 : 0);
  const dIdx = text.indexOf('<<<D>>>', cIdx !== -1 ? cIdx + 7 : 0);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    let qBody = text.slice(0, aIdx).trim();
    let optA = text.slice(aIdx + 7, bIdx).trim();
    let optB = text.slice(bIdx + 7, cIdx).trim();
    let optC = text.slice(cIdx + 7, dIdx).trim();
    let optD = text.slice(dIdx + 7).trim();

    const marksIdx = optD.search(/\[\d+\s*marks/i);
    if (marksIdx !== -1) optD = optD.slice(0, marksIdx).trim();

    return {
      text: cleanKaTeX(qBody),
      options: [cleanKaTeX(optA), cleanKaTeX(optB), cleanKaTeX(optC), cleanKaTeX(optD)]
    };
  }

  // Fallback if parsing didn't find all 4 tokens
  let cleanBody = cleanKaTeX(raw);
  const marksIdx = cleanBody.search(/\[\d+\s*marks/i);
  if (marksIdx !== -1) cleanBody = cleanBody.slice(0, marksIdx).trim();

  return {
    text: cleanBody,
    options: ["Option A", "Option B", "Option C", "Option D"]
  };
}

const allClean = {};

for (let q = 1; q <= 217; q++) {
  const item = parsed[q];
  const isNumeric = NUMERICAL_QUESTIONS.has(q);
  const key = officialKeys[q];

  if (isNumeric) {
    let qText = cleanKaTeX(item.rawQuestion);
    const mIdx = qText.search(/\[\d+\s*marks/i);
    if (mIdx !== -1) qText = qText.slice(0, mIdx).trim();
    allClean[q] = {
      text: qText,
      options: []
    };
  } else {
    allClean[q] = parseMCQ(item.rawQuestion);
  }
}

// Write 3 parts
const part1 = {};
for (let q = 1; q <= 75; q++) part1[q] = allClean[q];
fs.writeFileSync(path.resolve(__dirname, 'clean_dual_nature_part1.json'), JSON.stringify(part1, null, 2));

const part2 = {};
for (let q = 76; q <= 150; q++) part2[q] = allClean[q];
fs.writeFileSync(path.resolve(__dirname, 'clean_dual_nature_part2.json'), JSON.stringify(part2, null, 2));

const part3 = {};
for (let q = 151; q <= 217; q++) part3[q] = allClean[q];
fs.writeFileSync(path.resolve(__dirname, 'clean_dual_nature_part3.json'), JSON.stringify(part3, null, 2));

console.log('Saved clean_dual_nature_part1.json, part2.json, part3.json');
