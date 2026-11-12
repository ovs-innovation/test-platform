import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/anatomy_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/anatomy_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/anatomy_diagram_urls.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^MCQ \(More than One Correct Answer\)/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Anatomy of Flowering Plants/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  clean.push(line);
}

// Group into question blocks
const qBlocks = [];
let currentBlock = null;

for (const line of clean) {
  const match = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (match) {
    if (currentBlock) qBlocks.push(currentBlock);
    currentBlock = {
      qNum: parseInt(match[1], 10),
      header: match[2],
      lines: []
    };
  } else if (currentBlock) {
    currentBlock.lines.push(line);
  }
}
if (currentBlock) qBlocks.push(currentBlock);

console.log(`Parsed ${qBlocks.length} question blocks.`);

function cleanText(s) {
  return s
    .replace(/Open\s*solution/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const allQuestions = [];

for (const b of qBlocks) {
  const qNum = b.qNum;
  const header = b.header;
  const keyRaw = officialKeys[qNum];
  let imageUrl = '';
  if (qNum === 7) imageUrl = diagramUrls.q7_diag;

  let questionText = '';
  let options = [];
  let questionType = 'mcq';
  let correctIndex = 0;
  let correctIndices = [];

  if (qNum === 93) {
    questionType = 'multiple_choice';
    correctIndices = [2, 3];
    correctIndex = 2;
  } else {
    correctIndex = ['A', 'B', 'C', 'D'].indexOf(keyRaw);
    correctIndices = [correctIndex];
  }

  if (qNum === 2) {
    questionText = "Match List-I with List-II :\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Conjunctive tissue | I. Specialised cells in the vicinity of guard cells |\n| B. Casparian strips | II. Endodermal cells rich in starch |\n| C. Subsidiary cells | III. Tissue between xylem and phloem |\n| D. Starch sheath | IV. Endodermal cells with suberin deposition |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-IV, B-III, C-I, D-II",
      "A-III, B-IV, C-II, D-I",
      "A-III, B-IV, C-I, D-II",
      "A-IV, B-III, C-II, D-I"
    ];
  } else if (qNum === 7) {
    questionText = "In the given figure, which component has thin outer walls and highly thickened inner walls?";
    options = ["C", "D", "A", "B"];
  } else if (qNum === 11) {
    questionText = "Consider the following plant tissues :\n\n(A) Axillary buds\n(B) Fascicular vascular cambium\n(C) Interfascicular cambium\n(D) Cork cambium\n(E) Intercalary meristem\n\nIdentify the lateral meristems among the above.";
    options = [
      "(A), (C) and (D) only",
      "(B), (C) and (D) only",
      "(A), (B), (C) and (E) only",
      "(A), (B), (D) and (E) only"
    ];
  } else if (qNum === 17) {
    questionText = "Match List-I with List-II :\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Cells with active cell division capacity | (i) Vascular tissues |\n| (b) Tissue having all cells similar in structure and function | (ii) Meristematic tissue |\n| (c) Tissue having different types of cells | (iii) Sclereids |\n| (d) Dead cells with highly thickened walls and narrow lumen | (iv) Simple tissue |\n\nSelect the correct answer from the options given below :";
    options = [
      "(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)",
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)"
    ];
  } else if (qNum === 94) {
    questionText = "Consider the following tissues in the stelar region of a stem showing secondary growth :\n\n(A) Primary xylem\n(B) Secondary xylem\n(C) Primary phloem\n(D) Secondary phloem\n\nArrange these in the correct sequence of their position from pith towards cortex.";
    options = [
      "(A), (B), (D), (C)",
      "(B), (A), (C), (D)",
      "(A), (B), (C), (D)",
      "(B), (A), (D), (C)"
    ];
  } else if (qNum === 99) {
    questionText = "Match List-I with List-II :\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Lenticels | (i) Phellogen |\n| (b) Cork cambium | (ii) Suberin deposition |\n| (c) Secondary cortex | (iii) Exchange of gases |\n| (d) Cork | (iv) Phelloderm |\n\nChoose the correct answer from the options given below :";
    options = [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)",
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)"
    ];
  } else {
    // Standard extraction
    const fullText = b.lines.join(' ');
    const aIdx = fullText.lastIndexOf('(A)');
    const bIdx = fullText.lastIndexOf('(B)');
    const cIdx = fullText.lastIndexOf('(C)');
    const dIdx = fullText.lastIndexOf('(D)');

    questionText = cleanText(fullText.slice(0, aIdx));
    const optA = cleanText(fullText.slice(aIdx + 3, bIdx));
    const optB = cleanText(fullText.slice(bIdx + 3, cIdx));
    const optC = cleanText(fullText.slice(cIdx + 3, dIdx));
    const optD = cleanText(fullText.slice(dIdx + 3));

    options = [optA, optB, optC, optD];
  }

  // Generate Solution
  let correctLabel = qNum === 93 ? 'Options (C) and (D)' : `Option (${keyRaw})`;
  let correctOptionText = qNum === 93 ? 'Elongating, Differentiating' : (options[correctIndex] || '');
  let solution = `Correct Answer: ${correctLabel}${correctOptionText ? ` - ${correctOptionText}` : ''}.`;

  if (qNum === 1) {
    solution += ` Bulliform cells are large, bubble-shaped epidermal cells present on the adaxial surface of grass leaves. During water stress, they lose water and become flaccid, causing the leaves to curl inward to minimize water loss.`;
  } else if (qNum === 2) {
    solution += ` Conjunctive tissue is parenchymatous tissue situated between xylem and phloem in root (A-III); Casparian strips are suberin depositions on radial/tangential walls of endodermal cells (B-IV); Subsidiary cells are specialized epidermal cells neighboring guard cells (C-I); Starch sheath refers to the endodermis of dicot stems rich in starch grains (D-II).`;
  } else if (qNum === 3) {
    solution += ` In monocot stems, the hypodermis is sclerenchymatous (providing mechanical support), not parenchymatous. Vascular bundles are conjoint, closed, and scattered in ground tissue; phloem parenchyma is absent.`;
  } else if (qNum === 4) {
    solution += ` Sclereids (brachysclereids / stone cells) are extremely thick-walled, lignified, dead cells providing gritty texture in the pulp of pear, sapota, guava, and hard seed coats and fruit walls of nuts.`;
  } else if (qNum === 5) {
    solution += ` Companion cells are specialized parenchymatous cells closely associated with sieve tube elements. They help maintain the pressure gradient in the sieve tubes.`;
  } else if (qNum === 6) {
    solution += ` In a dorsiventral (dicot) leaf, the abaxial (lower) epidermis generally bears more stomata than the adaxial (upper) epidermis. Statement I is false. Palisade parenchyma consists of vertically elongated parallel cells placed towards the adaxial side. Statement II is true.`;
  } else if (qNum === 7) {
    solution += ` In the stomatal apparatus, guard cells (labeled C/inner wall) have a thin, elastic outer wall and a highly thickened, inelastic inner wall facing the stomatal aperture.`;
  } else if (qNum === 8) {
    solution += ` Collenchyma is a living mechanical tissue composed of living cells with pectin thickenings at cell corners. Hence Statement I is false. Gymnosperms lack true xylem vessels (characteristic of angiosperms). Statement II is true.`;
  } else if (qNum === 9) {
    solution += ` Bulliform cells on the adaxial epidermis of grass leaves become flaccid during water stress, leading to inward curling of leaves to reduce transpiration.`;
  } else if (qNum === 10) {
    solution += ` In monocot roots, the xylem bundles are polyarch (more than six), radial in arrangement, and exarch (protoxylem towards periphery).`;
  } else if (qNum === 11) {
    solution += ` Lateral meristems include fascicular vascular cambium (B), interfascicular cambium (C), and cork cambium/phellogen (D). Axillary buds and intercalary meristems are primary/apical derivatives.`;
  } else if (qNum === 12) {
    solution += ` Endarch and exarch describe the relative position of protoxylem in primary xylem (not secondary xylem). Endarch occurs in stems and exarch occurs in roots. Statement I is false; Statement II is true.`;
  } else if (qNum === 13) {
    solution += ` Interfascicular cambium develops from cells of medullary rays situated between two adjacent vascular bundles in dicot stems.`;
  } else if (qNum === 14) {
    solution += ` Sclereids are found in the fruit walls of nuts, giving them mechanical strength.`;
  } else if (qNum === 15) {
    solution += ` In dicot roots, both lateral roots and portions of the vascular cambium originate from cells of the pericycle.`;
  } else if (qNum === 16) {
    solution += ` All statements (a), (b), (c), (d), and (e) are correct descriptions of vascular bundles and plant anatomy.`;
  } else if (qNum === 17) {
    solution += ` (a) Active cell division capacity: Meristematic tissue (ii); (b) Similar cells in structure and function: Simple tissue (iv); (c) Different types of cells: Complex/Vascular tissues (i); (d) Dead cells with narrow lumen: Sclereids (iii).`;
  } else if (qNum === 18) {
    solution += ` Cells of medullary rays bordering intra-fascicular cambium become meristematic and form interfascicular cambium, completing the cambial ring.`;
  } else if (qNum === 20) {
    solution += ` Scattered vascular bundles surrounded by bundle sheath, conjoint and closed vascular bundles, absence of phloem parenchyma, and parenchymatous ground tissue characterize monocotyledonous stem.`;
  } else if (qNum === 93) {
    solution += ` Annular and spirally thickened protoxylem vessels differentiate early during the elongation and differentiation phases of root or stem development.`;
  } else if (qNum === 94) {
    solution += ` From pith towards cortex in a woody stem: Pith -> Primary xylem (A) -> Secondary xylem (B) -> Vascular cambium -> Secondary phloem (D) -> Primary phloem (C) -> Pericycle -> Endodermis -> Cortex.`;
  } else if (qNum === 99) {
    solution += ` Lenticels function in exchange of gases (a-iii); Cork cambium is phellogen (b-i); Secondary cortex is phelloderm (c-iv); Cork is phellem having suberin deposition (d-ii).`;
  }

  allQuestions.push({
    q_num: qNum,
    exam: header,
    text: questionText,
    options,
    correct_index: correctIndex,
    correct_indices: correctIndices,
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    status: 'normal',
    topic: 'Anatomy of Flowering Plants'
  });
}

fs.writeFileSync('./backend/scripts/anatomy_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log(`Generated ${allQuestions.length} complete questions in anatomy_all_questions.json`);
