import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LOM_OFFICIAL_ANSWERS } from './lom_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const text = fs.readFileSync(path.join(__dirname, 'lom_full_ocr_concat.txt'), 'utf8');
const diagramUrls = JSON.parse(fs.readFileSync(path.join(__dirname, 'lom_diagram_urls.json'), 'utf8'));

// Custom anchor regex for questions where OCR or PDF misprint had unique start
const CUSTOM_ANCHORS = {
  1: /Three identical blocks of masses/i,
  2: /When forces/i,
  5: /5a?\s+light string passing over/i,
  8: /4 rocket with a lift-off mass/i,
  9: /A block of mass M is pulled along/i,
  11: /spring balance is attached to the ceiling/i,
  14: /horizontal force of 10/i,
  15: /Two masses m/i,
  16: /machine\s*qun fires a bullet/i,
  17: /black rests on a rough inclined plane/i,
  22: /body of mass 5 kg is under the action/i,
  31: /If two springs/i,
  34: /crawls up a hemispherical surface/i,
  39: /ocks of mass/i,
  40: /starts from rest on a long inclined plane of slope 45/i,
  41: /is placed on a rough horizontal plane.*time dependent/i,
  42: /block of mass m is placed on a surface with a vertical section/i,
  46: /two blocks [4A] and [1B]3? of weight/i,
  51: /particle of mass m is acted upon by a force F given by/i,
  52: /machine as shown has 2 rods of length 1m/i,
  55: /55[\.:\s]+given object takes n times more time/i,
  61: /plock of mass m is placed on a vertical/i,
  64: /Two blocks A and B of masses/i,
  66: /k of mass 5g is \(i\) pushed in case/i,
  68: /Consider a uniform cubical box of side a/i,
  71: /horizontal force 10 N is applied to a block A as shown/i,
  74: /block of mass 200 g is kept stationary/i,
  79: /inclined plane making an angle of 30/i,
  81: /block of mass m slides along a floor while a force of magnitude F/i,
  83: /lacks\s*\[?m\s*=\s*0\.5kg/i,
  84: /Two identical blocks A and B each of mass m/i,
  85: /boy of mass 4kg is standing on a piece of wood/i,
  86: /body of mass 1kg rests on a horizontal floor/i,
  87: /bullet of mass 0\.1kg is fired on a wooden block/i,
  88: /steel block of 10kg rests on a horizontal/i,
  89: /body of mass m is launched up on a rough inclined plane/i,
  90: /bullet of 4g mass is fired from a gun/i,
  91: /pili?ard balls of equal mass 30g/i,
  92: /force F = \(40i \+ 10j\)N/i,
  93: /initial mass of a rocket is 1000/i,
  94: /coefficient of static friction between twa blocks is/i,
  95: /boxes of masses 2kg and 8kg are connected/i,
  96: /car is moving on a plane inclined at 30/i,
  97: /Statement [|I1!]: If three forces/i,
  98: /block of mass m slides on the wooden wedge/i,
  99: /block of mass 40 kg is resting on a horizontal|average translational kinetic energy/i,
  100: /whan a body slides down from rest along a smoeth inclined plane/i,
  101: /object of mass m is being moved with a constant velocity/i,
  102: /average transiational kinetic energy/i,
  103: /block of mass 10kg starts sliding an a surface/i,
  104: /force on an object of mass 100g is/i,
  105: /uniform chain of/i,
  106: /block of mass 200g is kept stationary on a smooth/i,
  107: /person is standing in an elevator/i,
  108: /system to 10 balls each of mass 2kg/i,
  109: /In the arrangement shown in figure a/i,
  110: /system of two blocks of masses m = 2k[y\s]*g/i,
  111: /mass of 10\s*k?g is suspended vertically by a rope/i,
  112: /One end of a massless spring of spring constant k/i,
  113: /hanging mass M is connected to a four times bigger mass/i,
  114: /block of mass 2kg moving on a horizontal surface with speed of/i,
  115: /block of metal weighing 2kg is resting on a frictionless/i,
  116: /block of mass M placed inside a box descends vertically/i,
  117: /block of mass 40k.*slides over a surface.*when a mass of 4kg/i,
  118: /Four forces are acting at a point P in equilibrium/i,
  119: /For a free body diagram shown in the figure.*four forces/i,
  120: /monkey of mass 50kg climbs on a rope/i,
  121: /Three masses M = 100kg/i,
  122: /Two masses M.*and M.*are tied together/i,
  123: /bag is gently dropped on/i,
  124: /takes 2s to slide down a frictionless incline of 30/i,
  125: /block of mass M slides down on a rough inclined plane with constant velocity/i,
  126: /126[\.:\s]+|Given below are two statements/i,
  127: /uniform metal chain of mass m/i,
  128: /Two bodies of masses m1 = 5kg/i,
  129: /elevator can go up o[rf] down with uniform speed/i,
  130: /As per given figure, a weightless pulley P/i,
  131: /Consider a block kept on an inclined plane/i,
  132: /block of mass m slides down the plane inclined at angle 30/i,
  133: /force acts for 20s on a body of mass 20kg/i,
  134: /time taken by an object to slide down 45/i,
  135: /The figure represents the momentum time/i,
  136: /block of \S*kg is attached to a string whose other end is attached to the wall/i,
  137: /garden roller is pushed/i,
  138: /body of mass 10kg is moving with an initial speed of 20/i,
  139: /139[\.:\s]+|mass m = 10kg is placed/i,
  140: /block of mass 10kg lying on a horizontal surface is pulled by a force/i,
  141: /mass m1? is attached to twe springs/i,
  142: /142[\.:\s]+|Two bodies of mass/i,
  143: /Assertion A.*electric fan continues to rotate/i,
  144: /body of mass.*moves along x-axis such that.*velocity varies with displacement/i,
  145: /Three forces Fy = 10N,F, = 8N/i,
  146: /The position vector of a particle related to time/i,
  147: /Statement {?I}?\s*:\s*The limiting force of static friction/i,
  148: /All surfaces shown In figure are assumed to be frictionless/i,
  149: /Three blocks A, B and C are pulled on a horizontal/i,
  150: /block of mass mils placed on a surface having vertical cross section/i,
  151: /In the given arrangement of a doubly inclined plane/i,
  152: /light string passing over a smooth light fixed pulley/i,
  153: /block of mass 5kg is placed en a reugh inclined surface/i,
  154: /Consider a block and tralley system as shown/i,
  155: /bady of mass dkg experiences two forces/i,
  156: /cricket player catches a ball of mass 120g/i,
  157: /wooden block, initially at rest on the ground, is pushed by a force which increases linearly/i,
  158: /brick begins to slide over a surface which is inclined at an angle of 45/i,
  159: /Three blocks Mi, Ma, Ma having masses 4 kg, 6 kg and 10 kg/i,
  160: /wooden block of mass 5 kg rests on a soft horizontal floor/i,
  161: /heavy box of mass 50 kg is moving on a horizontal surface/i,
  162: /light string passing over a smooth light pulley connects two blocks of masses my and my/i,
  163: /body of weight 200 N Is suspended from a tree branch/i,
  164: /Tea\.\s*A\s*gl?ven object/i,
  165: /light unstretchable string passing over a smogcth light pulley connects two blocks/i,
  166: /mass is suspended from the ceiling by a rope of length 4 m/i,
  167: /massless spring gets elongated by amount x.*under a tension of 5 N/i,
  168: /balloon and its content having mass M is moving up/i,
  169: /body of mass 1kg is suspended with the.*help of two strings/i,
  170: /length of a light string is 1\.4 m when the tension on it is 5 N/i,
  171: /body of mass yn is suspended by two strings making angles/i,
  172: /cubic block of mass m is sliding down on an inclined plane at 6/i,
  173: /object with mass 500 g moves along x\s*-?axis with speed/i,
  174: /4 kg mass moves under the influence of a force/i,
  175: /block is sliding down on an inclined plane of slope/i,
  176: /spring of force constant 15 N\/m Is cut into two pieces/i,
  177: /blocks 4, \[?7B\]? and C weigh 4 kg, 6 kg and 8 kg/i,
  178: /flexible chain of mass mt hangs between two fixed points/i,
  179: /particle of mass m falls from rest through a resistive medium/i,
  180: /black of mass 5 kg is moving on an inclined plane which makes an angle of 30/i,
  181: /small block of mass m slides down from the top of a frictionless/i,
  182: /time taken by a block of mass m to slide down from the highest point/i,
  183: /body of mass 100\)?\s*g starts moving under the influence of a force/i,
  184: /wedge \S+ with mass of 10 kg/i,
  185: /Three masses my = 4 kg, my = 4 kg and my = 6 kg/i,
  186: /mass\s*of 1 kg is kept on an inclined plane with 30/i,
  187: /Two blocks \[?FP and Q\]? with respectively masses 2 kg and 1\.5 kg/i,
  188: /block takes \S* time to slide down a plane inclined at 45/i,
};

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
  const m = raw.match(/\[?\s*[#4]\s*marks?[^\]\n]*\]?\s*[-–+]\s*([^\r\n]+)/i);
  if (m) {
    const yr = m[1].trim().replace(/^[-–+]\s*/, '');
    return yr.startsWith('20') ? `JEE Main ${yr}` : `JEE Main (${yr})`;
  }
  return 'JEE Main PYQ';
}

function normOptions(t) {
  return t
    .replace(/(?:\([4A]\)|\[4A\]|\[A\]|\(Al|IA\)|(?<=\s|\n|^)[IA]\)|(?<=\s|\n|^)A[\)\.])/gm, '(A)')
    .replace(/(?:\([8B]\)|\[8B\]|\[B\]|\(Bl|IB\)|(?<=\s|\n|^)[8B]\)|(?<=\s|\n|^)B[\)\.])/gm, '(B)')
    .replace(/(?:\([©€cC]\)|\[[©€cC]\]|\(Cl|IC\)|(?<=\s|\n|^)[©€cC]\)|(?<=\s|\n|^)[©€]|(?<=\s|\n|^)C[\)\.])/gm, '(C)')
    .replace(/(?:\([0D]\)|\[[0D]\]|\[D\]|\(Dl|ID\)|(?<=\s|\n|^)[0D]\)|(?<=\s|\n|^)D[\)\.])/gm, '(D)');
}

// 1. Locate all 188 question headers
const headerPositions = [];
let lastPos = 0;

for (let q = 1; q <= 188; q++) {
  let found = -1;
  const windowText = text.slice(lastPos, lastPos + 8000);

  if (CUSTOM_ANCHORS[q]) {
    const m = windowText.match(CUSTOM_ANCHORS[q]);
    if (m) found = lastPos + m.index;
  }

  if (found === -1) {
    const patterns = [
      new RegExp(`(?:^|\\n)\\s*${q}[\\.:\\)]\\s*`, 'i'),
      new RegExp(`(?:^|\\n)<<<PAGE_\\d+>>>\\n\\s*${q}[\\.:\\)]\\s*`, 'i'),
      new RegExp(`(?:^|\\n)\\s*${q}\\s+[A-Za-z]`, 'i'),
    ];
    for (const pat of patterns) {
      const m = windowText.match(pat);
      if (m) {
        found = lastPos + m.index + (m[0].startsWith('\n') ? 1 : 0);
        break;
      }
    }
  }

  if (found !== -1) {
    headerPositions.push({ qNum: q, pos: found });
    lastPos = found + 10;
  } else {
    throw new Error(`Could not find header for Q${q} after position ${lastPos}`);
  }
}

console.log(`Found all 188 question headers cleanly!`);

// Questions where options are diagrams in the cropped diagram image
const DIAGRAM_ONLY_OPTIONS = [29, 41, 49, 54, 55, 101, 135, 136, 157, 158, 179];

const parsedQuestions = [];

for (let i = 0; i < headerPositions.length; i++) {
  const qNum = headerPositions[i].qNum;
  const start = headerPositions[i].pos;
  const end = (i < headerPositions.length - 1) ? headerPositions[i + 1].pos : text.length;

  const blockText = text.slice(start, end);
  const officialAns = LOM_OFFICIAL_ANSWERS[qNum];
  const isNumerical = typeof officialAns === 'number' || /^\d+(\.\d+)?$/.test(String(officialAns).trim());

  // Split into before and after ANSWER:
  const ansIdx = blockText.search(/(?:ANSWER|ANEWER|ANSWEP|ANSwER|AHSWER|ANS|Answor|Answer|awswen)[;:! |]+/i);
  const beforeAns = ansIdx !== -1 ? blockText.slice(0, ansIdx) : blockText;
  const afterAns = ansIdx !== -1 ? blockText.slice(ansIdx) : '';

  // Exam tag
  const exam = extractExamTag(beforeAns);

  // Strip marks tag from beforeAns
  const marksMatch = beforeAns.search(/\[?\s*[#4]\s*marks/i);
  let stemArea = marksMatch !== -1 ? beforeAns.slice(0, marksMatch) : beforeAns;

  // Clean leading question number
  stemArea = cleanText(stemArea);
  stemArea = stemArea.replace(new RegExp(`^\\s*(?:${qNum}[\\.:\\)]|${qNum}\\b|[a-z]\\d+[\\.:]?|no[\\.:]?|LU|EL|M\\d+[\\.:]?|ne\\.|na\\.|Tea\\.|nz\\.)`, 'i'), '').trim();

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
    let s = normOptions(stemArea);

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
        a || 'Option (A)',
        b || 'Option (B)',
        c || 'Option (C)',
        d || 'Option (D)'
      ];
    } else {
      // Fallback
      options = ['Option (A)', 'Option (B)', 'Option (C)', 'Option (D)'];
    }
  }

  // Solution
  let solutionText = '';
  if (ansIdx !== -1) {
    const rawSol = afterAns.replace(/^(?:ANSWER|ANEWER|ANSWEP|ANSwER|AHSWER|ANS|Answor|Answer|awswen)[;:! |]+[^\r\n]+/i, '').trim();
    solutionText = cleanText(rawSol);
  }

  if (!solutionText || solutionText.length < 5) {
    solutionText = isNumerical
      ? `The correct numerical answer is ${officialAns}.`
      : `Hence, the correct option is (${officialAns}).`;
  } else if (!isNumerical && !solutionText.includes(`(${officialAns})`)) {
    solutionText += `\n\nHence, the correct option is (${officialAns}).`;
  }

  const imageUrl = diagramUrls[qNum] || null;

  parsedQuestions.push({
    qNum,
    exam,
    question: questionText,
    options,
    correct_option: isNumerical ? null : letterToIndex(officialAns),
    numeric_answer: isNumerical ? Number(officialAns) : null,
    question_type: isNumerical ? 'numerical' : 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: imageUrl,
    solution: solutionText
  });
}

console.log(`Parsed all ${parsedQuestions.length} questions.`);

// Split into 4 parts
const part1 = parsedQuestions.slice(0, 50);    // Q1..50
const part2 = parsedQuestions.slice(50, 100);  // Q51..100
const part3 = parsedQuestions.slice(100, 150); // Q101..150
const part4 = parsedQuestions.slice(150);      // Q151..188

fs.writeFileSync(
  path.join(__dirname, 'lom_pyq_part1.mjs'),
  `// Laws of Motion - JEE Physics PYQ - Part 1 (Q1 to Q50)\nexport const LOM_PART1 = ${JSON.stringify(part1, null, 2)};\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'lom_pyq_part2.mjs'),
  `// Laws of Motion - JEE Physics PYQ - Part 2 (Q51 to Q100)\nexport const LOM_PART2 = ${JSON.stringify(part2, null, 2)};\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'lom_pyq_part3.mjs'),
  `// Laws of Motion - JEE Physics PYQ - Part 3 (Q101 to Q150)\nexport const LOM_PART3 = ${JSON.stringify(part3, null, 2)};\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'lom_pyq_part4.mjs'),
  `// Laws of Motion - JEE Physics PYQ - Part 4 (Q151 to Q188)\nexport const LOM_PART4 = ${JSON.stringify(part4, null, 2)};\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(__dirname, 'lom_pyq_questions_data.mjs'),
  `import { LOM_PART1 } from './lom_pyq_part1.mjs';
import { LOM_PART2 } from './lom_pyq_part2.mjs';
import { LOM_PART3 } from './lom_pyq_part3.mjs';
import { LOM_PART4 } from './lom_pyq_part4.mjs';

export const ALL_LOM_PYQ_QUESTIONS = [
  ...LOM_PART1,
  ...LOM_PART2,
  ...LOM_PART3,
  ...LOM_PART4
];
`,
  'utf8'
);

console.log('Successfully written part1, part2, part3, part4 and master lom_pyq_questions_data.mjs!');
