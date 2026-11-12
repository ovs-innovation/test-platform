import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_official_keys.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 22)) {
  const items = [...p.items];
  items.sort((a, b) => {
    if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
    return a.x - b.x;
  });

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        const text = currentLineItems.map(i => i.str).join(' ').trim();
        linesWithMeta.push({ page: p.page, text });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    const text = currentLineItems.map(i => i.str).join(' ').trim();
    linesWithMeta.push({ page: p.page, text });
  }
}

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const line = linesWithMeta[i].text;
  const m = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page
    });
  }
}

// Special overrides for match questions and questions with special formatting
const SPECIAL_QUESTIONS = {
  2: {
    question_text: "Which of the following plant growth regulators is used as herbicide?",
    options: [
      "Gibberellin",
      "2, 4 - D",
      "Kinetin",
      "Abscisic acid"
    ],
    explanation: "2,4-D (2,4-dichlorophenoxyacetic acid) is a synthetic auxin widely used as a selective herbicide to kill broad-leaved (dicotyledonous) weeds in lawns and cereal crops without affecting mature monocotyledonous plants."
  },
  3: {
    question_text: "Length of the stem at time 0 is $20\\text{ cm}$. The arithmetic growth rate is $30\\text{ cm per day}$. What is the length of the stem at the end of the $7^\\text{th}$ day?",
    options: [
      "460 cm",
      "50 cm",
      "170 cm",
      "230 cm"
    ],
    explanation: "In arithmetic growth, the length at time $t$ is given by the linear equation:\n$$L_t = L_0 + rt$$\nHere, initial length $L_0 = 20\\text{ cm}$, growth rate $r = 30\\text{ cm/day}$, and time $t = 7\\text{ days}$.\n$$L_7 = 20 + (30 \\times 7) = 20 + 210 = 230\\text{ cm}$$.\nHence, option (D) is correct."
  },
  5: {
    question_text: `Match List-I with List-II:

| List-I (Growth Regulator) | List-II (Function/Effect) |
| :--- | :--- |
| A. 2,4-D | I. Brewing industry |
| B. $\\text{GA}_3$ | II. Stimulation of stomatal closure |
| C. Kinetin | III. Herbicide |
| D. ABA | IV. Nutrient mobilisation |

Choose the correct answer from the options given below:`,
    options: [
      "A-III, B-I, C-IV, D-II",
      "A-IV, B-III, C-II, D-I",
      "A-I, B-IV, C-III, D-II",
      "A-I, B-II, C-IV, D-III"
    ],
    explanation: "• **2,4-D** (Auxin) is used as a weedicide/herbicide (A-III).\n• **$\\text{GA}_3$** speeds up the malting process in the brewing industry (B-I).\n• **Kinetin** (Cytokinin) promotes nutrient mobilisation and delays leaf senescence (C-IV).\n• **ABA** (Abscisic acid) stimulates stomatal closure during water stress (D-II).\nTherefore, the correct matching is A-III, B-I, C-IV, D-II."
  },
  9: {
    question_text: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Abscisic acid | (I) Promotes female flowers in cucumber |
| (B) Ethylene | (II) Helps seeds to withstand desiccation |
| (C) Gibberellin | (III) Helps in nutrient mobilisation |
| (D) Cytokinin | (IV) Promotes bolting in beet, cabbage etc. |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-III, C-IV, D-I",
      "A-III, B-II, C-I, D-IV",
      "A-II, B-I, C-IV, D-III",
      "A-II, B-I, C-III, D-IV"
    ],
    explanation: "• **Abscisic acid (ABA)** induces seed dormancy and helps seeds withstand desiccation (A-II).\n• **Ethylene** promotes female flowers in cucumbers, increasing yield (B-I).\n• **Gibberellin** promotes bolting (internode elongation prior to flowering) in beet, cabbage, etc. (C-IV).\n• **Cytokinin** helps in nutrient mobilisation, delaying leaf senescence (D-III).\nHence, the correct option is (C): A-II, B-I, C-IV, D-III."
  },
  16: {
    question_text: `Match List - I with List - II:

| List - I | List - II |
| :--- | :--- |
| (A) Auxin | (I) Promotes female flower formation in cucumber |
| (B) Gibberellin | (II) Overcoming apical dominance |
| (C) Cytokinin | (III) Increase in the length of grape stalks |
| (D) Ethylene | (IV) Promotes flowering in pineapple |

Choose the correct answer from the options given below:`,
    options: [
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)",
      "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)",
      "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)"
    ],
    explanation: "• **Auxin** initiates rooting in stem cuttings and promotes flowering in pineapple (A-IV).\n• **Gibberellins** cause increase in the length of grape stalks (B-III).\n• **Cytokinins** help overcome apical dominance by promoting lateral bud growth (C-II).\n• **Ethylene** promotes female flower formation in cucumber (D-I).\nThus, (A)-(IV), (B)-(III), (C)-(II), (D)-(I) is the correct match."
  },
  30: {
    question_text: `Match the following concerning the activity/function and the phytohormone involved:

| List-I (Activity/Function) | List-II (Phytohormone) |
| :--- | :--- |
| (a) Fruit ripener | (i) Abscisic acid |
| (b) Herbicide | (ii) $\\text{GA}_3$ |
| (c) Bolting agent | (iii) 2, 4-D |
| (d) Stress hormone | (iv) Ethephon |

Select the correct option from following:`,
    options: [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)"
    ],
    explanation: "• Fruit ripener is **Ethephon** (source of ethylene) ((a)-(iv)).\n• Herbicide is **2, 4-D** ((b)-(iii)).\n• Bolting agent is **$\\text{GA}_3$** ((c)-(ii)).\n• Stress hormone is **Abscisic acid (ABA)** ((d)-(i)).\nHence, (a)-(iv), (b)-(iii), (c)-(ii), (d)-(i) is the correct option."
  },
  35: {
    question_text: "Removal of shoot tips is a very useful technique to boost the production of tea-leaves. This is because :",
    options: [
      "Gibberellins delay senescence of leaves.",
      "Gibberellins prevent bolting and are inactivated.",
      "Auxins prevent leaf drop at early stages.",
      "Effect of auxins is removed and growth of lateral buds is enhanced."
    ],
    explanation: "Decapitation (removal of shoot apex/apical bud) removes apical dominance maintained by auxins produced in the tip. In the absence of apical dominance, lateral/axillary buds grow rapidly, producing bushy growth with numerous new tea leaves (flush)."
  },
  82: {
    question_text: "Which combination of gases is suitable for fruit ripening?",
    options: [
      "80% $\\text{C}_2\\text{H}_4$ and 20% $\\text{CO}_2$",
      "80% $\\text{CO}_2$ and 20% $\\text{CH}_2$",
      "80% $\\text{CH}_4$ and 20% $\\text{CO}_2$",
      "80% $\\text{CO}_2$ and 20% $\\text{O}_2$"
    ],
    explanation: "Ethylene ($\\text{C}_2\\text{H}_4$) is a gaseous hormone that promotes fruit ripening. A combination of $80\\%\\ \\text{C}_2\\text{H}_4$ and $20\\%\\ \\text{CO}_2$ provides an effective atmosphere for artificial ripening of fruits."
  },
  122: {
    question_text: "The wavelength of light absorbed by $P_r$ form of phytochrome is",
    options: [
      "680 nm",
      "720 nm",
      "620 nm",
      "640 nm"
    ],
    explanation: "Phytochrome exists in two interconvertible forms:\n1. $P_r$ (inactive form) absorbs red light at $660-680\\text{ nm}$ and is converted into the $P_{fr}$ form.\n2. $P_{fr}$ (active form) absorbs far-red light at $730\\text{ nm}$ and is converted back into $P_r$.\nHence, $680\\text{ nm}$ is absorbed by the $P_r$ form."
  }
};

const allQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;

  const num = cur.num;
  const officialKey = officialKeys[num] || officialKeys[String(num)];
  if (!officialKey) {
    throw new Error(`Missing official key for Q${num}`);
  }

  const correctIndex = { A: 0, B: 1, C: 2, D: 3 }[officialKey];

  if (SPECIAL_QUESTIONS[num]) {
    allQuestions.push({
      _source_num: num,
      category: 'PYQ',
      subject: 'Botany',
      subject_id: 10,
      chapter: 'Plant Growth and Development',
      chapter_id: 255,
      topic: 'Plant Growth and Development',
      question_type: 'mcq',
      question_text: SPECIAL_QUESTIONS[num].question_text,
      options: SPECIAL_QUESTIONS[num].options,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      explanation: SPECIAL_QUESTIONS[num].explanation,
      difficulty: 'medium',
      marks: 4,
      image_url: ''
    });
    continue;
  }

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text)
    .filter(t => !/ExamGOAL|P Y Q P D F|Open solution|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|MCQ \(|Out of syllabus|These questions are on topics/i.test(t));

  // Line 0 is exam header line
  const contentLines = rawLines.slice(1);
  let combined = contentLines.join(' ').trim();

  // Find options
  const aIdx = combined.search(/\(A\)\s+/);
  const bIdx = combined.search(/\(B\)\s+/);
  const cIdx = combined.search(/\(C\)\s+/);
  const dIdx = combined.search(/\(D\)\s+/);

  if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1) {
    throw new Error(`Failed to locate options for Q${num}: ${combined}`);
  }

  let qText = combined.substring(0, aIdx).trim();
  let optA = combined.substring(aIdx + 3, bIdx).trim();
  let optB = combined.substring(bIdx + 3, cIdx).trim();
  let optC = combined.substring(cIdx + 3, dIdx).trim();
  let optD = combined.substring(dIdx + 3).trim();

  // Clean trailing artifacts
  optD = optD.replace(/\s*Open solution\s*$/i, '').trim();
  qText = qText.replace(/\s*Open solution\s*$/i, '').trim();

  // Fix subscripts / formulas
  qText = qText.replace(/\bGA3\b/g, '$\\text{GA}_3$');
  optA = optA.replace(/\bGA3\b/g, '$\\text{GA}_3$');
  optB = optB.replace(/\bGA3\b/g, '$\\text{GA}_3$');
  optC = optC.replace(/\bGA3\b/g, '$\\text{GA}_3$');
  optD = optD.replace(/\bGA3\b/g, '$\\text{GA}_3$');

  qText = qText.replace(/\bP r\b/g, '$P_r$');
  qText = qText.replace(/\bP fr\b/g, '$P_{fr}$');

  // Explanation
  const correctOptLetter = officialKey;
  const correctOptText = [optA, optB, optC, optD][correctIndex];
  const explanation = `According to NCERT Plant Growth and Development, the correct answer is option (${correctOptLetter}): **${correctOptText}**.`;

  allQuestions.push({
    _source_num: num,
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 10,
    chapter: 'Plant Growth and Development',
    chapter_id: 255,
    topic: 'Plant Growth and Development',
    question_type: 'mcq',
    question_text: qText,
    options: [optA, optB, optC, optD],
    correct_index: correctIndex,
    correct_indices: [correctIndex],
    explanation,
    difficulty: 'medium',
    marks: 4,
    image_url: ''
  });
}

console.log(`Successfully generated all ${allQuestions.length} questions.`);
fs.writeFileSync('./backend/scripts/plant_growth_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Saved to backend/scripts/plant_growth_all_questions.json');
