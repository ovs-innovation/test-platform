import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));

// 13 diagram questions
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

// 15 Numerical questions
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

// Flatten page lines
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

const qIndices = {};
let currentSearch = 1;
for (let i = 0; i < pageLines.length && currentSearch <= 217; i++) {
  const { page, line } = pageLines[i];
  if (matchesQ(line, currentSearch, page)) {
    qIndices[currentSearch] = i;
    currentSearch++;
  }
}

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

const finalQuestions = [];

for (let q = 1; q <= 217; q++) {
  const startIdx = qIndices[q];
  const endIdx = q < 217 ? qIndices[q + 1] : pageLines.length;
  const chunkLines = pageLines.slice(startIdx, endIdx).map(x => x.line);
  const rawChunk = chunkLines.join('\n');

  const isNumeric = NUMERICAL_QUESTIONS.has(q);
  const officialKey = officialKeys[q];

  // Find where answer/solution starts
  let solIdx = -1;
  for (let l = 0; l < chunkLines.length; l++) {
    if (/ANSWER\s*:\s*/i.test(chunkLines[l])) {
      solIdx = l;
      break;
    }
  }

  // Pre-answer lines contain Question statement and Options
  const preAnsLines = solIdx !== -1 ? chunkLines.slice(0, solIdx) : chunkLines;
  const postAnsLines = solIdx !== -1 ? chunkLines.slice(solIdx) : [];

  const solutionText = cleanKaTeX(postAnsLines.join('\n'));

  // Question body vs options
  // Strip question number header from first line
  let firstLine = preAnsLines[0] || '';
  firstLine = firstLine.replace(/^(\bQ\\.?\s*)?\d+[\.:\)]\s*/i, '');
  if (q === 6) firstLine = firstLine.replace(/^8\.\s*/i, '');
  if (q === 11) firstLine = firstLine.replace(/^TM\.\s*/i, '');
  if (q === 51) firstLine = firstLine.replace(/^S51\s*/i, '');
  if (q === 110) firstLine = firstLine.replace(/^M0\.\s*/i, '');
  if (q === 111) firstLine = firstLine.replace(/^MM\.\s*/i, '');
  if (q === 113) firstLine = firstLine.replace(/^M3\.\s*/i, '');
  if (q === 115) firstLine = firstLine.replace(/^LUE\s*/i, '');
  if (q === 117) firstLine = firstLine.replace(/^M7\.\s*/i, '');
  if (q === 119) firstLine = firstLine.replace(/^M[89]\.\s*/i, '');
  if (q === 133) firstLine = firstLine.replace(/^13\s*/i, '');
  if (q === 135) firstLine = firstLine.replace(/^15\s*/i, '');
  if (q === 159) firstLine = firstLine.replace(/^189\.\s*/i, '');
  if (q === 182) firstLine = firstLine.replace(/^82\.\s*/i, '');
  if (q === 185) firstLine = firstLine.replace(/^Ho:\s*/i, '');
  if (q === 190) firstLine = firstLine.replace(/^i308\s*/i, '');
  if (q === 191) firstLine = firstLine.replace(/^bi\s*/i, '');
  if (q === 192) firstLine = firstLine.replace(/^ea\s*/i, '');

  const preLinesClean = [firstLine, ...preAnsLines.slice(1)];
  const preText = preLinesClean.join('\n');

  let questionText = '';
  let options = [];

  if (isNumeric) {
    questionText = cleanKaTeX(preText);
    options = [];
  } else {
    // MCQ: split question body and options (A), (B), (C), (D)
    // Find where (A) appears
    const optAMatch = preText.match(/\((?:A|[1a])\)\s*([\s\S]*)/i);
    if (optAMatch) {
      questionText = cleanKaTeX(preText.slice(0, optAMatch.index));
      const optBlock = preText.slice(optAMatch.index);

      // Parse (A), (B), (C), (D)
      const bIdx = optBlock.search(/\((?:B|[2b]|8)\)/i);
      const cIdx = optBlock.search(/\((?:C|[3c]|©)\)/i);
      const dIdx = optBlock.search(/\((?:D|[4d]|0)\)/i);

      if (bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && bIdx < cIdx && cIdx < dIdx) {
        const optA = cleanKaTeX(optBlock.slice(optBlock.indexOf(')') + 1, bIdx));
        const optB = cleanKaTeX(optBlock.slice(bIdx + optBlock.slice(bIdx).indexOf(')') + 1, cIdx));
        const optC = cleanKaTeX(optBlock.slice(cIdx + optBlock.slice(cIdx).indexOf(')') + 1, dIdx));
        const optD = cleanKaTeX(optBlock.slice(dIdx + optBlock.slice(dIdx).indexOf(')') + 1));
        options = [optA, optB, optC, optD];
      }
    }

    if (options.length !== 4 || options.some(o => !o || o.length === 0)) {
      // Fallback extraction
      questionText = cleanKaTeX(preText);
      options = ["A", "B", "C", "D"]; // Will be reviewed
    }
  }

  const correctIndex = isNumeric ? null : ({ A: 0, B: 1, C: 2, D: 3 }[officialKey] ?? 0);
  const numericAnswer = isNumeric ? parseFloat(officialKey) : null;

  finalQuestions.push({
    q_num: q,
    question_text: questionText,
    options: options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: numericAnswer,
    tolerance: isNumeric ? 0 : null,
    correct_option: officialKey,
    correct_index: correctIndex,
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty: q > 150 ? 'hard' : (q > 70 ? 'medium' : 'easy'),
    image_url: diagramMap[q] || null,
    solution_image_url: null,
    solution: solutionText || `Official Answer: ${officialKey}`
  });
}

console.log(`Built ${finalQuestions.length} preliminary questions.`);
fs.writeFileSync(path.resolve(__dirname, 'dual_nature_jee_final_217.json'), JSON.stringify(finalQuestions, null, 2));

// Check how many have fallback options
const fallbackCount = finalQuestions.filter(q => q.question_type === 'mcq' && q.options.join('') === 'ABCD').length;
console.log(`Questions needing option refinement: ${fallbackCount}`);
