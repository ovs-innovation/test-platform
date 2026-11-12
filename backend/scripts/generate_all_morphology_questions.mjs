import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/morphology_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/morphology_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/morphology_diagram_urls.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Morphology of Flowering Plants/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
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

const allQuestions = [];

for (const b of qBlocks) {
  const qNum = b.qNum;
  const header = b.header;
  const keyLetter = officialKeys[qNum];
  const correctIndex = ['A', 'B', 'C', 'D'].indexOf(keyLetter);
  let imageUrl = '';
  if (qNum === 5) imageUrl = diagramUrls.q5_diag;
  else if (qNum === 15) imageUrl = diagramUrls.q15_diag;
  else if (qNum === 16) imageUrl = diagramUrls.q16_diag;
  else if (qNum === 26) imageUrl = diagramUrls.q26_diag;
  else if (qNum === 31) imageUrl = diagramUrls.q31_diag;
  else if (qNum === 32) imageUrl = diagramUrls.q32_diag;
  else if (qNum === 62) imageUrl = diagramUrls.q62_diag;
  else if (qNum === 86) imageUrl = diagramUrls.q86_diag;
  else if (qNum === 91) imageUrl = diagramUrls.q91_diag;
  else if (qNum === 95) imageUrl = diagramUrls.q95_diag;
  else if (qNum === 96) imageUrl = diagramUrls.q96_diag;
  else if (qNum === 97) imageUrl = diagramUrls.q97_diag;
  else if (qNum === 107) imageUrl = diagramUrls.q107_diag;
  else if (qNum === 146) imageUrl = diagramUrls.q146_diag;
  else if (qNum === 153) imageUrl = diagramUrls.q153_diag;
  else if (qNum === 159) imageUrl = diagramUrls.q159_diag;

  let questionText = '';
  let options = [];

  // Match table questions
  if (qNum === 2) {
    questionText = "Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Marginal placentation | I. Argemone |\n| B. Axile placentation | II. Tomato |\n| C. Parietal placentation | III. Primrose |\n| D. Free central placentation | IV. Pea |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-IV, B-II, C-I, D-III",
      "A-II, B-IV, C-I, D-III",
      "A-IV, B-II, C-III, D-I",
      "A-IV, B-III, C-I, D-II"
    ];
  } else if (qNum === 7) {
    questionText = "Match List I with List II :\n\n| List I (Placentation) | List II (Example) |\n| :--- | :--- |\n| A. Marginal | I. Mustard |\n| B. Axile | II. Pea |\n| C. Parietal | III. Marigold |\n| D. Basal | IV. Lemon |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-II, B-IV, C-I, D-III",
      "A-I, B-III, C-II, D-IV",
      "A-III, B-I, C-IV, D-II",
      "A-IV, B-II, C-I, D-III"
    ];
  } else if (qNum === 11) {
    questionText = "Match List-I with List-II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Vexillary aestivation | (I) Brinjal |\n| (B) Epipetalous stamens | (II) Peach |\n| (C) Epiphyllous stamens | (III) Pea |\n| (D) Perigynous flower | (IV) Lily |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-III, B-I, C-IV, D-II",
      "A-III, B-IV, C-I, D-II",
      "A-III, B-II, C-I, D-IV",
      "A-II, B-I, C-IV, D-III"
    ];
  } else if (qNum === 12) {
    questionText = "Match List-I with List-II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) China rose | (I) Free central |\n| (B) Mustard | (II) Basal |\n| (C) Primrose | (III) Axile |\n| (D) Marigold | (IV) Parietal |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-IV, B-III, C-II, D-I",
      "A-II, B-III, C-IV, D-I",
      "A-III, B-IV, C-I, D-II",
      "A-III, B-IV, C-II, D-I"
    ];
  } else if (qNum === 17) {
    questionText = "Match List I with List II :\n\n| List - I | List - II |\n| :--- | :--- |\n| A. Rose | I. Twisted aestivation |\n| B. Pea | II. Perigynous flower |\n| C. Cotton | III. Drupe |\n| D. Mango | IV. Marginal placentation |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-II, B-IV, C-I, D-III",
      "A-I, B-II, C-III, D-IV",
      "A-IV, B-III, C-II, D-I",
      "A-II, B-III, C-IV, D-I"
    ];
  } else if (qNum === 18) {
    questionText = "Match List I with List II :\n\n| List - I (Types of Stamens) | List - II (Example) |\n| :--- | :--- |\n| A. Monoadelphous | I. Citrus |\n| B. Diadelphous | II. Pea |\n| C. Polyadelphous | III. Lily |\n| D. Epiphyllous | IV. China-rose |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-IV, B-II, C-I, D-III",
      "A-IV, B-I, C-II, D-III",
      "A-I, B-II, C-IV, D-III",
      "A-III, B-I, C-IV, D-II"
    ];
  } else if (qNum === 21) {
    questionText = "Match the following :\n\n| Type of flower | Example |\n| :--- | :--- |\n| (A) Zygomorphic | (I) Mustard |\n| (B) Hypogynous | (II) Plum |\n| (C) Perigynous | (III) Cassia |\n| (D) Epigynous | (IV) Cucumber |\n\nSelect the correct option :";
    options = [
      "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
      "(A)-(IV), (B)-(I), (C)-(III), (D)-(II)",
      "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)"
    ];
  } else if (qNum === 25) {
    questionText = "Match List - I with List - II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Imbricate | (i) Calotropis |\n| (b) Valvate | (ii) Cassia |\n| (c) Vexillary | (iii) Cotton |\n| (d) Twisted | (iv) Bean |\n\nChoose the correct answer from the options given below :";
    options = [
      "(a) - (i), (b) - (iii), (c) - (iv), (d) - (ii)",
      "(a) - (ii), (b) - (i), (c) - (iii), (d) - (iv)",
      "(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)",
      "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)"
    ];
  } else if (qNum === 31) {
    questionText = "Match Column-I with Column-II (refer to the floral formulas given below):\n\nChoose the correct answer from the options given below :";
    options = [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)"
    ];
  } else if (qNum === 38) {
    questionText = "Match the placental types (column-I) with their examples (column-II) :\n\n| Column-I | Column-II |\n| :--- | :--- |\n| (a) Basal | (i) Mustard |\n| (b) Axile | (ii) China rose |\n| (c) Parietal | (iii) Dianthus |\n| (d) Free central | (iv) Sunflower |\n\nChoose the correct answer from the following options :";
    options = [
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)"
    ];
  } else if (qNum === 5) {
    questionText = "Which of the following floral formula is the correct floral formula of Solanaceae family? (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 15) {
    questionText = "Identify the part of the seed from the given figure which is destined to form root when the seed germinates.";
    options = ["A", "B", "C", "D"];
  } else if (qNum === 16) {
    questionText = "Identify the type of flowers based on the position of calyx, corolla and androecium with respect to the ovary from the given figures (a) and (b) :";
    options = [
      "(a) Epigynous; (b) Hypogynous",
      "(a) Hypogynous; (b) Epigynous",
      "(a) Perigynous; (b) Epigynous",
      "(a) Perigynous; (b) Perigynous"
    ];
  } else if (qNum === 26) {
    questionText = "The Floral Diagram represents which one of the following families?";
    options = ["Liliaceae", "Fabaceae", "Brassicaceae", "Solanaceae"];
  } else if (qNum === 32) {
    questionText = "Which of the following is the correct floral formula of Liliaceae ? (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 62) {
    questionText = "The floral formula shown above is that of :";
    options = ["Petunia", "Brassica", "Allium", "Sesbania"];
  } else if (qNum === 86) {
    questionText = "Which one of the following figures represents the placentation in Dianthus ? (Refer to the images below)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 91) {
    questionText = "The correct floral formula of chilli is : (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 95) {
    questionText = "The correct floral formula of soyabean is : (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 96) {
    questionText = "Consider the following four statements (i), (ii), (iii) and (iv) and select the right option for two correct statements.\n\nStatements :\n(i) In vexillary aestivation, the large posterior petal is called standard, two lateral ones are wings and two small anterior petals are termed keel.\n(ii) The floral formula for Liliaceae is shown above.\n(iii) In pea flower the stamens are monadelphous.\n(iv) The floral formula for Solanaceae is shown above.\n\nThe correct statements are :";
    options = ["(i) and (iii)", "(i) and (ii)", "(ii) and (iii)", "(iii) and (iv)"];
  } else if (qNum === 97) {
    questionText = "Aestivation of petals in the flower of cotton is correctly shown in : (Refer to the images below)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 107) {
    questionText = "The floral formula shown above is that of :";
    options = ["soybean", "sunhemp", "tobacco", "tulip"];
  } else if (qNum === 146) {
    questionText = "Floral formula of tomato/tobacco is : (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else if (qNum === 153) {
    questionText = "The floral formula shown above is floral formula of :";
    options = ["Liliaceae", "Solanaceae", "Asteraceae", "Fabaceae"];
  } else if (qNum === 159) {
    questionText = "Floral formula of tomato/tobacco is : (Refer to the image options)";
    options = ["(A)", "(B)", "(C)", "(D)"];
  } else {
    // Standard extraction
    const fullText = b.lines.join(' ');
    const aIdx = fullText.lastIndexOf('(A)');
    const bIdx = fullText.lastIndexOf('(B)');
    const cIdx = fullText.lastIndexOf('(C)');
    const dIdx = fullText.lastIndexOf('(D)');

    questionText = fullText.slice(0, aIdx).trim();
    const optA = fullText.slice(aIdx + 3, bIdx).trim();
    const optB = fullText.slice(bIdx + 3, cIdx).trim();
    const optC = fullText.slice(cIdx + 3, dIdx).trim();
    const optD = fullText.slice(dIdx + 3).trim();

    options = [optA, optB, optC, optD];
  }

  // Generate Solution
  const correctOptionText = options[correctIndex] || '';
  let solution = `Correct Answer: Option (${keyLetter})${correctOptionText ? ` - ${correctOptionText}` : ''}.`;
  
  if (qNum === 1) {
    solution += ` Phyllotaxy is the pattern or arrangement of leaves on the stem or branch. It is typically of three types: alternate, opposite, and whorled.`;
  } else if (qNum === 2) {
    solution += ` Marginal placentation is found in Pea (A-IV); Axile placentation in Tomato (B-II); Parietal placentation in Argemone/Mustard (C-I); Free central placentation in Primrose/Dianthus (D-III).`;
  } else if (qNum === 3) {
    solution += ` Stems are modified into flattened photosynthetic structures in Opuntia (flattened cladode/phylloclade) and fleshy cylindrical structures in Euphorbia.`;
  } else if (qNum === 4) {
    solution += ` In caryopsis (grain of maize/cereals), the fruit wall (pericarp) is fused with the seed coat. The seed has a large endosperm and a single shield-shaped cotyledon known as scutellum.`;
  } else if (qNum === 5) {
    solution += ` The correct floral formula of Solanaceae is: ⊕ ⚥ K(5) C(5) A5 G(2) (bisexual, actinomorphic, calyx 5 united, corolla 5 united, epipetalous stamens 5, bicarpellary syncarpous superior ovary with oblique septum).`;
  } else if (qNum === 6) {
    solution += ` In calotropis and guava, a pair of leaves arise at each node and lie opposite to each other, representing opposite phyllotaxy.`;
  } else if (qNum === 7) {
    solution += ` Marginal placentation: Pea (A-II); Axile placentation: Lemon/Tomato/China rose (B-IV); Parietal placentation: Mustard/Argemone (C-I); Basal placentation: Marigold/Sunflower (D-III).`;
  } else if (qNum === 8) {
    solution += ` Potato tubers possess 'eyes' which are actually nodes bearing axillary buds with scale leaves.`;
  } else if (qNum === 9) {
    solution += ` Free central placentation is seen in Dianthus and Primula (Primrose), where ovules are borne on a central axis without septa.`;
  } else if (qNum === 10) {
    solution += ` In monocot seeds (like cereals/maize), the outer covering of endosperm separates the embryo by a proteinaceous layer called the aleurone layer.`;
  } else if (qNum === 11) {
    solution += ` Vexillary aestivation is seen in Pea (A-III); Epipetalous stamens in Brinjal/Solanaceae (B-I); Epiphyllous stamens in Lily (C-IV); Perigynous flower in Peach/Plum/Rose (D-II).`;
  } else if (qNum === 12) {
    solution += ` China rose has axile placentation (A-III); Mustard has parietal placentation (B-IV); Primrose has free central placentation (C-I); Marigold has basal placentation (D-II).`;
  } else if (qNum === 13) {
    solution += ` Pneumatophores are respiratory roots found in halophytes like Rhizophora growing in swampy areas; they grow vertically upward to get oxygen for respiration.`;
  } else if (qNum === 14) {
    solution += ` Roots of ginger and turmeric are modified rhizomes (underground stem modifications). Sweet potato is a modified adventitious root, while potato is an underground stem (tuber).`;
  } else if (qNum === 15) {
    solution += ` In a dicot embryo/seed, the radicle (labeled C) gives rise to the root system upon germination.`;
  } else if (qNum === 16) {
    solution += ` In both figures (a) and (b), the gynoecium is situated in the center and other floral parts are located on the rim of the thalamus almost at the same level, which is characteristic of perigynous flowers (half-inferior ovary, as in Plum, Rose, Peach).`;
  } else if (qNum === 17) {
    solution += ` Rose has a perigynous flower (A-II); Pea has marginal placentation (B-IV); Cotton has twisted aestivation (C-I); Mango is a drupe fruit (D-III).`;
  } else if (qNum === 18) {
    solution += ` Monoadelphous stamens: China rose (A-IV); Diadelphous stamens: Pea (B-II); Polyadelphous stamens: Citrus (C-I); Epiphyllous stamens: Lily (D-III).`;
  } else if (qNum === 19) {
    solution += ` In Fabaceae, the calyx has five sepals that are gamosepalous (united) with valvate or imbricate aestivation.`;
  } else if (qNum === 20) {
    solution += ` In vexillary (papilionaceous) aestivation of pea/bean petals: the largest posterior petal is the standard (vexillum), two lateral petals are wings (alae), and the two smallest anterior united petals are the keel (carina).`;
  } else if (qNum === 21) {
    solution += ` Zygomorphic flower: Cassia/Pea/Gulmohar (A-III); Hypogynous flower: Mustard/China rose/Brinjal (B-I); Perigynous flower: Plum/Rose/Peach (C-II); Epigynous flower: Cucumber/Guava/Ray florets of sunflower (D-IV).`;
  } else if (qNum === 22) {
    solution += ` Keel is the characteristic feature of the flower of family Fabaceae (e.g., Indigofera, Pea, Bean, Gram).`;
  } else if (qNum === 25) {
    solution += ` Imbricate: Cassia/Gulmohar (a-ii); Valvate: Calotropis (b-i); Vexillary: Bean/Pea (c-iv); Twisted: Cotton/China rose/Lady's finger (d-iii).`;
  } else if (qNum === 26) {
    solution += ` The floral diagram shows tetramerous symmetry (K2+2 C4 A2+4 G(2)), which is characteristic of family Brassicaceae (Cruciferae, e.g., Brassica/Mustard).`;
  } else if (qNum === 31) {
    solution += ` The matching floral formulas represent: (a) Brassicaceae (Mustard), (b) Fabaceae (Pea), (c) Solanaceae (Tomato/Petunia), (d) Liliaceae (Lily/Allium).`;
  } else if (qNum === 32) {
    solution += ` Floral formula of Liliaceae: Br ⊕ ⚥ P(3+3) A3+3 G(3) (tricarpellary syncarpous superior ovary with axile placentation).`;
  } else if (qNum === 38) {
    solution += ` Basal: Sunflower/Marigold (a-iv); Axile: China rose/Tomato/Lemon (b-ii); Parietal: Mustard/Argemone (c-i); Free central: Dianthus/Primrose (d-iii).`;
  } else if (qNum === 62) {
    solution += ` The floral formula ⊕ ⚥ K(5) C(5) A5 G(2) is characteristic of family Solanaceae, which includes Petunia.`;
  } else if (qNum === 86) {
    solution += ` Free central placentation is present in Dianthus and Primrose, represented by ovules developing on the central axis and septa being absent.`;
  } else if (qNum === 91) {
    solution += ` Chilli belongs to family Solanaceae, whose floral formula is ⊕ ⚥ K(5) C(5) A5 G(2).`;
  } else if (qNum === 95) {
    solution += ` Soyabean belongs to family Fabaceae, with floral formula % ⚥ K(5) C1+2+(2) A(9)+1 G1.`;
  } else if (qNum === 96) {
    solution += ` Statements (i) and (ii) are correct. In vexillary aestivation, large posterior petal is standard, two lateral are wings, two anterior are keel. The floral formula for Liliaceae is Br ⊕ ⚥ P(3+3) A3+3 G(3). Pea stamens are diadelphous (9)+1, not monadelphous.`;
  } else if (qNum === 97) {
    solution += ` Cotton has twisted aestivation of petals, where one margin of the appendage overlaps that of the next one in a regular clockwise or anti-clockwise direction.`;
  } else if (qNum === 107) {
    solution += ` The floral formula ⊕ ⚥ K(5) C(5) A5 G(2) represents family Solanaceae, which includes tobacco (Nicotiana tabacum).`;
  } else if (qNum === 146 || qNum === 159) {
    solution += ` Tomato and tobacco belong to Solanaceae. Floral formula: ⊕ ⚥ K(5) C(5) A5 G(2).`;
  } else if (qNum === 153) {
    solution += ` The floral formula ⊕ ⚥ K(5) C(5) A5 G(2) belongs to family Solanaceae.`;
  }

  allQuestions.push({
    q_num: qNum,
    exam: header,
    text: questionText,
    options,
    correct_index: correctIndex,
    correct_indices: [correctIndex],
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    status: 'normal',
    topic: 'Morphology of Flowering Plants'
  });
}

fs.writeFileSync('./backend/scripts/morphology_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log(`Generated ${allQuestions.length} complete questions in morphology_all_questions.json`);
