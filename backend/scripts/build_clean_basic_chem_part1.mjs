import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_official_keys.json'), 'utf8'));

// Format chemical formulas into clean KaTeX
function formatChemicalLatex(str) {
  if (!str) return '';
  return str
    // Common chemical species
    .replace(/\bH2SO4\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bH3PO3\b/g, '$\\text{H}_3\\text{PO}_3$')
    .replace(/\bH3PO4\b/g, '$\\text{H}_3\\text{PO}_4$')
    .replace(/\bHyPO3\b/g, '$\\text{H}_3\\text{PO}_3$')
    .replace(/\bHyPO4\b/g, '$\\text{H}_3\\text{PO}_4$')
    .replace(/\bCO2\b/g, '$\\text{CO}_2$')
    .replace(/\bH2O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bHy0\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bNH3\b/g, '$\\text{NH}_3$')
    .replace(/\bCH4\b/g, '$\\text{CH}_4$')
    .replace(/\bC6H6\b/g, '$\\text{C}_6\\text{H}_6$')
    .replace(/\bC7H8\b/g, '$\\text{C}_7\\text{H}_8$')
    .replace(/\bC6H12O6\b/g, '$\\text{C}_6\\text{H}_{12}\\text{O}_6$')
    .replace(/\bBaCl2\b/g, '$\\text{BaCl}_2$')
    .replace(/\bBa\(OH\)2\b/g, '$\\text{Ba(OH)}_2$')
    .replace(/\bFe\(OH\)3\b/g, '$\\text{Fe(OH)}_3$')
    .replace(/\bFeCl3\b/g, '$\\text{FeCl}_3$')
    .replace(/\bNaOH\b/g, '$\\text{NaOH}$')
    .replace(/\bKOH\b/g, '$\\text{KOH}$')
    .replace(/\bHCl\b/g, '$\\text{HCl}$')
    .replace(/\bHNO3\b/g, '$\\text{HNO}_3$')
    .replace(/\bNa2CO3\b/g, '$\\text{Na}_2\\text{CO}_3$')
    .replace(/\bNaHCO3\b/g, '$\\text{NaHCO}_3$')
    .replace(/\bNa2SO4\b/g, '$\\text{Na}_2\\text{SO}_4$')
    .replace(/\bAgNO3\b/g, '$\\text{AgNO}_3$')
    .replace(/\bO2\b/g, '$\\text{O}_2$')
    .replace(/\bN2\b/g, '$\\text{N}_2$')
    .replace(/\bH2\b/g, '$\\text{H}_2$')
    .replace(/\bCl2\b/g, '$\\text{Cl}_2$')
    .replace(/\bBr2\b/g, '$\\text{Br}_2$')
    .replace(/\bI2\b/g, '$\\text{I}_2$')
    .replace(/\bMg\(OH\)2\b/g, '$\\text{Mg(OH)}_2$')
    .replace(/\bCaCO3\b/g, '$\\text{CaCO}_3$')
    .replace(/\bCaCl2\b/g, '$\\text{CaCl}_2$')
    // Scientific notation
    .replace(/(\d+(?:\.\d+)?)\s*[xX*×]\s*10\^?([-\d]+)/g, '$$$1 \\times 10^{$2}$$')
    .replace(/(\d+(?:\.\d+)?)\s*[xX*×]\s*10(\d{2})/g, '$$$1 \\times 10^{$2}$$')
    .replace(/\$\$\$/g, '$')
    .replace(/\$\$/g, '$');
}

// Clean and parse a raw block
function parseQuestionBlock(qNum, rawText, officialKey) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  // Extract year / exam session from marks line
  let exam = 'JEE Main';
  const marksLineIdx = lines.findIndex(l => /(?:\[|\()?\s*\d+\s*marks?[^\]\n]*\]?/i.test(l));
  if (marksLineIdx !== -1) {
    const ml = lines[marksLineIdx];
    const yrMatch = ml.match(/\b(20\d{2})\b/);
    if (yrMatch) {
      exam = `JEE Main ${yrMatch[1]}`;
    }
  }

  // Answer line
  const ansLineIdx = lines.findIndex(l => /^(?:answer|answeR|Answer|Ans)\s*[:\.]/i.test(l));

  // Determine stem lines vs option lines vs solution lines
  // Marks line divides stem/options from solution
  const cutOffIdx = (marksLineIdx !== -1) ? marksLineIdx : (ansLineIdx !== -1 ? ansLineIdx : lines.length);
  const preLines = lines.slice(0, cutOffIdx);
  const solLines = (ansLineIdx !== -1) ? lines.slice(ansLineIdx + 1) : (marksLineIdx !== -1 ? lines.slice(marksLineIdx + 1) : []);

  // Remove Q number from preLines[0]
  if (preLines.length > 0) {
    preLines[0] = preLines[0].replace(/^(?:Q\.?\s*)?\d+[\.:\-\)]\s*/i, '').trim();
  }

  const preText = preLines.join('\n');

  // Check if MCQ
  const isMcq = ['A', 'B', 'C', 'D'].includes(officialKey);

  let stem = '';
  let options = [];

  if (isMcq) {
    // Look for options in preText
    // Standard patterns: (A) ... (B) ... (C) ... (D) ...
    // or A) ... B) ... C) ... D) ...
    // or W ... ® ... © ... © ...
    const optSplitRegex = /(?:^|\n|\s+)(?:\(([A-Da-d1Ww®©08])\)|\b([A-Da-d1Ww®©08])\))\s+/g;
    
    // Find all potential option bullets
    const bulletMatches = [...preText.matchAll(optSplitRegex)];

    if (bulletMatches.length >= 4) {
      // Last 4 bullets are likely (A), (B), (C), (D)
      const last4 = bulletMatches.slice(-4);
      stem = preText.slice(0, last4[0].index).trim();

      const oA = preText.slice(last4[0].index + last4[0][0].length, last4[1].index).trim();
      const oB = preText.slice(last4[1].index + last4[1][0].length, last4[2].index).trim();
      const oC = preText.slice(last4[2].index + last4[2][0].length, last4[3].index).trim();
      const oD = preText.slice(last4[3].index + last4[3][0].length).trim();
      options = [oA, oB, oC, oD];
    } else {
      // Fallback: search lines for A/B/C/D
      stem = preText.trim();
      // Leave options to be refined if fallback
      options = [];
    }
  } else {
    stem = preText.trim();
    options = [];
  }

  let solText = solLines.join('\n').trim();
  if (!solText || solText === 'No Solution Available' || solText.length < 5) {
    solText = `The correct answer is Option (${officialKey}).`;
  }

  return {
    qNum,
    exam,
    question: formatChemicalLatex(stem),
    options: options.map(o => formatChemicalLatex(o)),
    correct_option: isMcq ? (officialKey.charCodeAt(0) - 65) : null,
    numeric_answer: isMcq ? null : officialKey,
    question_type: isMcq ? 'mcq' : 'numerical',
    marks: 4,
    negative_marks: isMcq ? 1 : 0,
    difficulty: 'medium',
    category: 'Chemistry',
    chapter: 'Some Basic Concepts of Chemistry',
    exam_type: 'JEE',
    image_url: null,
    solution_image_url: null,
    solution: formatChemicalLatex(solText)
  };
}

// Build Part 1
const part1Questions = [];
const needManualRefinement = [];

for (let q = 1; q <= 60; q++) {
  const rawText = rawBlocks[q]?.text || '';
  const key = officialKeys[q];
  const item = parseQuestionBlock(q, rawText, key);

  if (item.question_type === 'mcq' && item.options.length !== 4) {
    needManualRefinement.push(q);
  }
  part1Questions.push(item);
}

console.log(`Part 1 generated ${part1Questions.length} questions.`);
console.log(`Questions needing option refinement: ${needManualRefinement.length}`, needManualRefinement);

fs.writeFileSync(path.resolve(__dirname, 'clean_basic_chem_part1.json'), JSON.stringify(part1Questions, null, 2));
