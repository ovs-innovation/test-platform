import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_linear.txt'), 'utf8');

// Let's find each question boundary in the continuous text.
// We know question numbers are strictly increasing 1 to 221.
// Let's test finding question starts.
const questionBlocks = {};
let searchPos = 0;

// Custom aliases / variations for tricky OCR question numbers
const ALIASES = {
  11: [/M-|\b11[\.:\)]/i, '11.'],
  14: [/"4\.|14[\.:\)]/i, '14.'],
  15: [/\b5\.\s*The ratio of number of oxygen/i, '15.'],
  16: [/76\.\s*The concentrated sulphuric acid/i, '16.'],
  17: [/”\s*5 g of benzene on nitration/i, '17.'],
  19: [/9\.\s*When CO is passed over red hot coke/i, '19.'],
  26: [/26\.\s*g litres of an alkene/i, '26.'],
  27: [/27\.\s*The molecular formula/i, '27.'],
  86: [/86\.\s*0\.45 g of an organic compound/i, '86.'],
  88: [/88\.\s*NO,/i, '88.'],
  93: [/9\.\s*coon|Consider the above reaction where 6\.1g/i, '93.'],
  94: [/94\.\s*250mL of 0\.5MNaOH/i, '94.'],
  95: [/95\.\s*44 equimolar mixture/i, '95.'],
  110: [/M0\.\s*A protein|110[\.:\)]/i, '110.'],
  111: [/MM\.\s*The neutralization|111[\.:\)]/i, '111.'],
  112: [/M2\.\s*on complete combustion|112[\.:\)]/i, '112.'],
  113: [/M3\.\s*A commercially sold|113[\.:\)]/i, '113.'],
  114: [/M4\.|114[\.:\)]/i, '114.'],
  115: [/M5\.|115[\.:\)]/i, '115.'],
  116: [/me\.|116[\.:\)]/i, '116.'],
  117: [/7\.\s*46 g of|117[\.:\)]/i, '117.'],
  146: [/M6\.\s*The volume of 0\.02M/i, '146.'],
  147: [/47\.\s*\(?5g of an organic compound|147[\.:\)]/i, '147.'],
  151: [/51\.\s*Given below are two statements/i, '151.'],
  154: [/154[\.:\)]|54\.\s*A sample of a metal oxide/i, '154.'],
  157: [/157[\.:\)]|57\.\s*When 0\.01 mol of an organic compound/i, '157.'],
  158: [/158[\.:\)]|58\.\s*The mass of sodium acetate/i, '158.'],
  162: [/62\.\s*\\?ioiume|Volume of 3MNaOH/i, '162.'],
  163: [/63\.\s*\|?\s*mole of PbS/i, '163.'],
  164: [/64\.\s*A compound is formed/i, '164.'],
  167: [/67\.\s*The number of moles of/i, '167.'],
  170: [/70\.\s*In the reaction/i, '170.'],
  171: [/71\.\s*Choose the Incorrect Statement about Dalton/i, '171.'],
  174: [/74\.\s*The incorrect postulates/i, '174.'],
  175: [/75\.\s*The number of moles of methane/i, '175.'],
  176: [/76\.\s*Consider the reaction/i, '176.'],
  178: [/78\.\s*When 800 mL of 0\.5 M/i, '178.'],
  182: [/82\.\s*When 5 moles of/i, '182.'],
  185: [/785\.|185\.\s*,?01 mole of an organic/i, '185.'],
  191: [/91\.\s*Volume of 0\.02 M/i, '191.'],
  197: [/""97\.|97\.\s*CaCOs\( s\) \+ 2HCl/i, '197.'],
  201: [/01\.\s*Mass of urea required/i, '201.'],
  211: [/211[\.:\)]|21\.\s*A sample of a metal oxide/i, '211.']
};

const qPositions = [];

for (let q = 1; q <= 221; q++) {
  // Search from searchPos
  let foundIndex = -1;

  if (ALIASES[q]) {
    const [re, _] = ALIASES[q];
    const sub = linearText.slice(searchPos);
    const m = sub.match(re);
    if (m && m.index !== undefined) {
      foundIndex = searchPos + m.index;
    }
  }

  if (foundIndex === -1) {
    // Standard patterns
    const sub = linearText.slice(searchPos);
    const pats = [
      new RegExp(`(?:^|\\n)\\s*${q}[\\.:\\)]\\s+`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${q}\\s+[A-Z]`, 'i'),
      new RegExp(`(?:^|\\n)\\s*Q\\.?\\s*${q}[\\.:\\)]`, 'i')
    ];
    for (const pat of pats) {
      const m = sub.match(pat);
      if (m && m.index !== undefined) {
        foundIndex = searchPos + m.index;
        break;
      }
    }
  }

  if (foundIndex !== -1) {
    qPositions.push({ q, pos: foundIndex });
    searchPos = foundIndex + 5; // move past the start of this question
  } else {
    console.warn(`Could NOT find Q${q} starting from pos ${searchPos}!`);
  }
}

console.log(`Found ${qPositions.length}/221 question positions!`);

for (let i = 0; i < qPositions.length; i++) {
  const current = qPositions[i];
  const nextPos = (i + 1 < qPositions.length) ? qPositions[i + 1].pos : linearText.indexOf('Answer key');
  const blockText = linearText.slice(current.pos, nextPos).trim();
  questionBlocks[current.q] = blockText;
}

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_raw_blocks.json'), JSON.stringify(questionBlocks, null, 2));
console.log('Saved basic_chem_raw_blocks.json');
