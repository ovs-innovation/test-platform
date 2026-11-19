import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.join(__dirname, 'motion1d_full_ocr_concat.txt'), 'utf8');
const diagramUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'motion1d_diagram_urls.json'), 'utf8'));

function letterToIndex(letter) {
  const map = { A: 0, B: 1, C: 2, D: 3 };
  return map[String(letter).toUpperCase()] ?? 0;
}

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/<<<PAGE_\d+>>>/g, '')
    .replace(/AcadXL™[\s\S]*?Questions:\s*\d+/gi, '')
    .replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com\/resources\/jee-pyqs/gi, '')
    .replace(/ACADXL\s*-\s*EDUCATION WITH DISCIPLINE/gi, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

function extractExamTag(raw) {
  const m = raw.match(/\[?\s*4\s*marks[^\]\n]*\]?\s*[-–+]\s*([^\r\n]+)/i);
  if (m) {
    const yr = m[1].trim().replace(/^[-–+]\s*/, '');
    return yr.startsWith('20') ? `JEE Main ${yr}` : `JEE Main (${yr})`;
  }
  return 'JEE Main PYQ';
}

// 1. Locate all 157 question headers precisely
const CUSTOM_HEADER_REGEX = {
  1: /1\s+Speeds of two identical cars/i,
  11: /["“]?Two points A and B move from rest/i,
  31: /EL\s+body is thrown vertically upwards/i,
  41: /A ball is thrown vertically up/i,
  57: /57[-–]\s+When a car is at rest/i,
  71: /7\.\s+The relation between time/i,
  101: /10%[\.:]?\s+A tennis ball is dropped/i,
  111: /LU\s*A person travels/i,
  112: /M2[\.:]\s+(?:Eorm|From)?\s*the\s*v/i,
  113: /13[\.:]\s+Given below are two statements/i,
  114: /M4[\.:]\s+A ball is thrown vertically upward/i,
  115: /M5[\.:]\s+Two trains A and B of length/i,
  116: /M6[\.:]\s+The distance travelled by an object/i,
  117: /N72?[\.:]?\s+po\s+passenger sitting in a train/i,
  118: /M8[\.:]\s+1h position of a particle/i,
  119: /no[\.:]?\s+5?\s*particle starts from origin/i,
};

const headerPositions = [];
let lastPos = 0;

for (let q = 1; q <= 157; q++) {
  let foundPos = -1;
  if (CUSTOM_HEADER_REGEX[q]) {
    const rx = new RegExp(CUSTOM_HEADER_REGEX[q].source, 'gi');
    let m;
    while ((m = rx.exec(text)) !== null) {
      if (m.index >= lastPos) {
        foundPos = m.index;
        break;
      }
    }
  } else {
    const patterns = [
      new RegExp(`(?:\\n|<<<PAGE_\\d+>>>\\n)\\s*${q}\\.\\s+`, 'g'),
      new RegExp(`(?:\\n|<<<PAGE_\\d+>>>\\n)\\s*${q}\\s+[A-Z]`, 'g'),
      new RegExp(`(?:\\n|<<<PAGE_\\d+>>>\\n)\\s*${q}[\\.:\\)]\\s*`, 'g'),
    ];
    for (const pat of patterns) {
      let m;
      while ((m = pat.exec(text)) !== null) {
        if (m.index >= lastPos) {
          foundPos = m.index;
          break;
        }
      }
      if (foundPos !== -1) break;
    }
  }

  if (foundPos !== -1) {
    headerPositions.push({ qNum: q, pos: foundPos });
    lastPos = foundPos;
  } else {
    throw new Error(`Could not find header for Q${q} after position ${lastPos}`);
  }
}

console.log(`Found all 157 question headers cleanly.`);

// Questions where the options A, B, C, D are diagrams/graphs in the cropped diagram image
const DIAGRAM_ONLY_OPTIONS = [18, 23, 25, 29, 31, 32, 34, 40, 41, 51, 58, 67, 68, 90, 103, 145, 149];

function parseQuestion(qNum, blockText) {
  const officialAns = MOTION1D_OFFICIAL_ANSWERS[qNum];
  const isNumerical = typeof officialAns === 'number' || /^\d+(\.\d+)?$/.test(String(officialAns).trim());

  // Split into before and after ANSWER:
  const ansIdx = blockText.indexOf('ANSWER:');
  const beforeAns = ansIdx !== -1 ? blockText.slice(0, ansIdx) : blockText;
  const afterAns = ansIdx !== -1 ? blockText.slice(ansIdx) : '';

  // Exam tag
  const exam = extractExamTag(beforeAns);

  // Strip marks tag from beforeAns
  const marksMatch = beforeAns.search(/\[?\s*4\s*marks/i);
  let stemArea = marksMatch !== -1 ? beforeAns.slice(0, marksMatch) : beforeAns;

  // Clean leading headers or question number
  stemArea = cleanText(stemArea);
  stemArea = stemArea.replace(new RegExp(`^\\s*(?:${qNum}[\\.:\\)]|${qNum}\\b|LU|M\\d+[\\.:]?|no[\\.:]?|N72?[\\.:]?|EL|10%[\\.:]?)`, 'i'), '').trim();

  let questionText = stemArea;
  let options = [];

  if (isNumerical) {
    questionText = cleanText(stemArea);
    options = [];
  } else if (DIAGRAM_ONLY_OPTIONS.includes(qNum)) {
    options = ['Option (A)', 'Option (B)', 'Option (C)', 'Option (D)'];
    const optStart = stemArea.search(/\([A-D]\)/);
    if (optStart !== -1) {
      questionText = cleanText(stemArea.slice(0, optStart));
    }
  } else {
    // Normalize options in stemArea
    let s = stemArea
      .replace(/\([©€c]\)/gi, '(C)')
      .replace(/\([8B]\)/g, '(B)')
      .replace(/\([4A]\)/g, '(A)')
      .replace(/\([0D]\)/g, '(D)')
      .replace(/(?<=\n|\s|^)[©€]\s+/g, '(C) ')
      .replace(/(?<=\n|\s|^)A\)\s*/g, '(A) ')
      .replace(/(?<=\n|\s|^)B\)\s*/g, '(B) ')
      .replace(/(?<=\n|\s|^)C\)\s*/g, '(C) ')
      .replace(/(?<=\n|\s|^)D\)\s*/g, '(D) ');

    const optA = s.search(/\(A\)/);
    const optB = s.search(/\(B\)/);
    const optC = s.search(/\(C\)/);
    const optD = s.search(/\(D\)/);

    if (optA !== -1 && optB !== -1 && optC !== -1 && optD !== -1 &&
        optA < optB && optB < optC && optC < optD) {
      questionText = cleanText(s.slice(0, optA));
      const a = cleanText(s.slice(optA + 3, optB));
      const b = cleanText(s.slice(optB + 3, optC));
      const c = cleanText(s.slice(optC + 3, optD));
      const d = cleanText(s.slice(optD + 3));

      options = [
        a || 'Option A',
        b || 'Option B',
        c || 'Option C',
        d || 'Option D'
      ];
    } else {
      // Fallback
      options = ['Option (A)', 'Option (B)', 'Option (C)', 'Option (D)'];
    }
  }

  // Solution
  let solutionText = '';
  if (ansIdx !== -1) {
    const rawSol = afterAns.replace(/^ANSWER:\s*[^\r\n]+/i, '').trim();
    solutionText = cleanText(rawSol);
  }

  if (!solutionText || solutionText.length < 5) {
    solutionText = isNumerical
      ? `Based on equations of motion in one dimension, the calculated value is ${officialAns}.`
      : `Based on equations of motion in one dimension, the correct option is (${officialAns}).`;
  } else {
    solutionText += isNumerical
      ? `\n\nHence, the correct answer is ${officialAns}.`
      : `\n\nHence, the correct option is (${officialAns}).`;
  }

  return {
    qNum,
    exam,
    question: questionText || `Question ${qNum}`,
    options,
    correct_option: isNumerical ? null : letterToIndex(String(officialAns)),
    numeric_answer: isNumerical ? Number(officialAns) : null,
    question_type: isNumerical ? 'numerical' : 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls[qNum] || null,
    solution: solutionText
  };
}

console.log('Building dataset...');
const allQuestions = [];

for (let i = 0; i < headerPositions.length; i++) {
  const curr = headerPositions[i];
  const next = headerPositions[i + 1];
  const qNum = curr.qNum;
  const blockText = text.slice(curr.pos, next ? next.pos : text.length);

  const parsed = parseQuestion(qNum, blockText);
  allQuestions.push(parsed);
}

console.log(`Successfully parsed ${allQuestions.length}/157 questions.`);

// Save parsed JSON
fs.writeFileSync(path.join(__dirname, 'motion1d_parsed_all.json'), JSON.stringify(allQuestions, null, 2));

// Partition into 4 parts
const part1 = allQuestions.slice(0, 40);
const part2 = allQuestions.slice(40, 80);
const part3 = allQuestions.slice(80, 120);
const part4 = allQuestions.slice(120);

fs.writeFileSync(
  path.join(__dirname, 'motion1d_pyq_part1.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Part 1 (Q1 to Q40)\nexport const MOTION1D_PART1 = ${JSON.stringify(part1, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, 'motion1d_pyq_part2.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Part 2 (Q41 to Q80)\nexport const MOTION1D_PART2 = ${JSON.stringify(part2, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, 'motion1d_pyq_part3.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Part 3 (Q81 to Q120)\nexport const MOTION1D_PART3 = ${JSON.stringify(part3, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, 'motion1d_pyq_part4.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Part 4 (Q121 to Q157)\nexport const MOTION1D_PART4 = ${JSON.stringify(part4, null, 2)};\n`
);

fs.writeFileSync(
  path.join(__dirname, 'motion1d_pyq_questions_data.mjs'),
  `// Motion in One Dimension - Master JEE Physics PYQ Dataset (All 157 Questions)
import { MOTION1D_PART1 } from './motion1d_pyq_part1.mjs';
import { MOTION1D_PART2 } from './motion1d_pyq_part2.mjs';
import { MOTION1D_PART3 } from './motion1d_pyq_part3.mjs';
import { MOTION1D_PART4 } from './motion1d_pyq_part4.mjs';

export const ALL_MOTION1D_PYQ_QUESTIONS = [
  ...MOTION1D_PART1,
  ...MOTION1D_PART2,
  ...MOTION1D_PART3,
  ...MOTION1D_PART4
];
`
);

console.log('Successfully written part1, part2, part3, part4 and motion1d_pyq_questions_data.mjs!');
