import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/sexual_repro_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/sexual_repro_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/sexual_repro_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 30)) {
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

console.log(`Found ${qStarts.length} question markers in dump.`);

const SPECIAL_QUESTIONS = {
  5: {
    question_text: "Arrange the following in the correct developmental sequence related to microsporogenesis :\nA. Microspore tetrads\nB. Sporogenous tissue\nC. Pollen grains\nD. Pollen mother cells\n\nChoose the correct answer from the options given below :",
    options: [
      "D, A, C, B",
      "B, D, A, C",
      "B, D, C, A",
      "A, D, C, B"
    ],
    explanation: "During microsporogenesis inside the anther:\n1. As the anther develops, the cells of the **sporogenous tissue** (B) undergo mitotic divisions.\n2. Each sporogenous cell is capable of giving rise to a **pollen mother cell (PMC)** (D).\n3. Each PMC undergoes meiosis to form a cluster of four cells called **microspore tetrads** (A).\n4. As the anthers mature and dehydrate, the microspores dissociate from each other and develop into **pollen grains** (C).\nTherefore, the correct developmental sequence is **B, D, A, C**."
  },
  8: {
    question_text: "Given below are two statements : One is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : A typical unfertilised, angiosperm embryo sac at maturity is 8 nucleate and 7-celled.\nReason (R) : The egg apparatus has 2 polar nuclei.\n\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "(A) is true but (R) is false",
      "(A) is false but (R) is true",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)"
    ],
    explanation: "• **Assertion (A)** is true: A typical mature angiosperm female gametophyte (embryo sac) is 8-nucleate and 7-celled (3 antipodals, 2 synergids, 1 egg cell, and 1 large central cell with 2 polar nuclei).\n• **Reason (R)** is false: The egg apparatus consists of three cells grouped together at the micropylar end—two synergids and one egg cell. The 2 polar nuclei are located in the large central cell below the egg apparatus, not inside it."
  },
  9: {
    question_text: "Given below are two statements: One is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : Both wind and water pollinated flowers are not very colourful and do not produce nectar.\nReason (R) : The flowers produce enormous amount of pollen grains in wind and water pollinated flowers.\n\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "(A) is true but (R) is false",
      "(A) is false but (R) is true",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)"
    ],
    explanation: "• **Assertion (A)** is true: Wind and water-pollinated flowers do not need to attract biotic pollinators (insects, birds), so they are small, inconspicuous, devoid of bright colour, scent, or nectar.\n• **Reason (R)** is true: To compensate for uncertainties and passive loss of pollen during transit via abiotic wind/water, flowers produce enormous amounts of pollen grains.\n• However, producing enormous pollen grains is an adaptation to compensate for pollen loss, not the explanation for why flowers lack colour and nectar. Hence, both are true but (R) is not the correct explanation of (A)."
  },
  11: {
    question_text: "Given below are two statements : One is labelled as Assertion (A) and other is labelled as Reason (R).\n\nAssertion (A) : Cells of the tapetum possess dense cytoplasm and generally have more than one nucleus.\nReason (R) : Presence of more than one nucleus in the tapetum increases the efficiency of nourishing the developing microspore mother cells.\n\nIn light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(A) is true but (R) is false",
      "(A) is false but (R) is true",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)"
    ],
    explanation: "• **Assertion (A)** is true: Cells of the tapetum, the innermost anther wall layer, possess dense cytoplasm and often become binucleate or multinucleate through endomitosis.\n• **Reason (R)** is true: Tapetal cells are highly metabolically active and multinucleation provides increased transcriptional machinery and enzymatic/nutritive efficiency to nourish the developing microspores and pollen grains.\nTherefore, both (A) and (R) are true and (R) is the correct explanation of (A)."
  },
  12: {
    question_text: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| A. Scutellum | I. Persistent nucellus |
| B. Non-albuminous seed | II. Cotyledon of Monocot seed |
| C. Epiblast | III. Groundnut |
| D. Perisperm | IV. Rudimentary cotyledon |

Choose the option with all correct matches:`,
    options: [
      "A-IV, B-III, C-I, D-II",
      "A-II, B-IV, C-III, D-I",
      "A-II, B-III, C-IV, D-I",
      "A-IV, B-III, C-II, D-I"
    ],
    explanation: "• **Scutellum**: The single large, shield-shaped cotyledon of a monocot (grass) embryo (A-II).\n• **Non-albuminous seed**: Seeds that have no residual endosperm as it is completely consumed during embryo development, e.g., Groundnut, Pea, Bean (B-III).\n• **Epiblast**: The rudimentary second cotyledon found in some grass embryos (C-IV).\n• **Perisperm**: Persistent remnant of nucellus in mature seeds, e.g., Black pepper, Beet (D-I).\nHence, the correct match is **A-II, B-III, C-IV, D-I**."
  },
  15: {
    question_text: "The part marked as 'x' in the given figure is",
    options: [
      "Endosperm",
      "Thalamus",
      "Endocarp",
      "Mesocarp"
    ],
    image_url: diagramUrls.q_15,
    explanation: "In false fruits like strawberry, the flesh that is eaten is the enlarged, fleshy **thalamus** (receptacle), marked as 'x'. The actual fruits are the tiny seed-like achenes embedded on its surface."
  },
  17: {
    question_text: "Identify the correct description about the given figure :",
    options: [
      "Wind pollinated plant inflorescence showing flowers with well exposed stamens.",
      "Water pollinated flowers showing stamens with mucilaginous covering.",
      "Cleistogamous flowers showing autogamy.",
      "Compact inflorescence showing complete autogamy"
    ],
    image_url: diagramUrls.q_17,
    explanation: "The figure illustrates a **wind-pollinated plant inflorescence** (such as grasses or maize) characterized by well-exposed stamens so that pollens are easily dispersed into wind currents, and feathery stigmas to easily trap airborne pollen grains."
  },
  27: {
    question_text: "Given below are two statements:\nStatement I : Cleistogamous flowers are invariably autogamous\nStatement II : Cleistogamy is disadvantageous as there is no chance for cross pollination\n\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct but Statement II is incorrect",
      "Statement I is incorrect but Statement II is correct"
    ],
    explanation: "• **Statement I is correct**: Cleistogamous flowers do not open at all; hence autogamy is the only possible method of pollination.\n• **Statement II is correct**: Because cleistogamous flowers never open, there is zero opportunity for cross-pollination, preventing genetic recombination and new variations, which can lead to inbreeding depression.\nThus, both Statement I and Statement II are correct."
  },
  29: {
    question_text: "Which part of the fruit, labelled in the given figure makes it a false fruit?",
    options: [
      "A $\\rightarrow$ Mesocarp",
      "B $\\rightarrow$ Endocarp",
      "C $\\rightarrow$ Thalamus",
      "D $\\rightarrow$ Seed"
    ],
    image_url: diagramUrls.q_29,
    explanation: "In apple (a pome/false fruit), the bulk of the fleshy edible fruit develops from the **thalamus** (labeled C), rather than the ovary alone. Hence, **C $\\rightarrow$ Thalamus** makes it a false fruit."
  },
  46: {
    question_text: "Pollen grains can be stored for several years in liquid nitrogen having a temperature of",
    options: [
      "$-120^\\circ\\text{C}$",
      "$-80^\\circ\\text{C}$",
      "$-196^\\circ\\text{C}$",
      "$-160^\\circ\\text{C}$"
    ],
    explanation: "Pollen grains can be preserved for long periods in pollen banks using cryopreservation in liquid nitrogen at **$-196^\\circ\\text{C}$**, maintaining their viability for future crop breeding programs."
  },
  102: {
    question_text: "Examine the figures (A-D) given below and select the right option out of (a – d), in which all the four structures A, B, C and D are identified correctly.",
    options: [
      "A $\\rightarrow$ offset, B $\\rightarrow$ Antheridiophore, C $\\rightarrow$ Antipodals, D $\\rightarrow$ Oogonium",
      "A $\\rightarrow$ Rhizome, B $\\rightarrow$ Sporangiophore, C $\\rightarrow$ Polar cell, D $\\rightarrow$ Globule",
      "A $\\rightarrow$ Sucker, B $\\rightarrow$ Seta, C $\\rightarrow$ Megaspore mother cell , D $\\rightarrow$ Gemma cup",
      "A $\\rightarrow$ Runner, B $\\rightarrow$ Archegoniophore, C $\\rightarrow$ Synergid, D $\\rightarrow$ Antheridium"
    ],
    image_url: diagramUrls.q_102,
    explanation: "In the diagrams from NCERT Reproduction in Organisms / Plant Reproduction:\n• Figure A shows vegetative propagule offset (*Pistia/Eichhornia*).\n• Figure B shows *Marchantia* antheridiophore bearing antheridia.\n• Figure C shows antipodal cells of female gametophyte.\n• Figure D shows the upper female reproductive structure (nucule/oogonium) of *Chara*.\nTherefore, option (A) is correct."
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
    const sp = SPECIAL_QUESTIONS[num];
    allQuestions.push({
      _source_num: num,
      category: 'PYQ',
      subject: 'Botany',
      subject_id: 10,
      chapter: 'Sexual Reproduction in Flowering Plants',
      chapter_id: 215,
      topic: 'Sexual Reproduction in Flowering Plants',
      question_type: 'mcq',
      question_text: sp.question_text,
      options: sp.options,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      explanation: sp.explanation,
      difficulty: 'medium',
      marks: 4,
      image_url: sp.image_url || ''
    });
    continue;
  }

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text.replace(/Open solution/gi, '').trim())
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|MCQ \(|Out of syllabus|These questions are on topics/i.test(t));

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

  // Clean extra spaces
  qText = qText.replace(/\s+/g, ' ').trim();
  optA = optA.replace(/\s+/g, ' ').trim();
  optB = optB.replace(/\s+/g, ' ').trim();
  optC = optC.replace(/\s+/g, ' ').trim();
  optD = optD.replace(/\s+/g, ' ').trim();

  // Fix degree celsius if any
  const formatTemp = (str) => {
    return str
      .replace(/-196\s*o\s*C/gi, '$-196^\\circ\\text{C}$')
      .replace(/-120\s*o\s*C/gi, '$-120^\\circ\\text{C}$')
      .replace(/-160\s*o\s*C/gi, '$-160^\\circ\\text{C}$')
      .replace(/-80\s*o\s*C/gi, '$-80^\\circ\\text{C}$');
  };

  qText = formatTemp(qText);
  optA = formatTemp(optA);
  optB = formatTemp(optB);
  optC = formatTemp(optC);
  optD = formatTemp(optD);

  const correctOptLetter = officialKey;
  const correctOptText = [optA, optB, optC, optD][correctIndex];
  const explanation = `According to NCERT Sexual Reproduction in Flowering Plants, the correct answer is option (${correctOptLetter}): **${correctOptText}**.`;

  allQuestions.push({
    _source_num: num,
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 10,
    chapter: 'Sexual Reproduction in Flowering Plants',
    chapter_id: 215,
    topic: 'Sexual Reproduction in Flowering Plants',
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

console.log(`Successfully parsed and generated ${allQuestions.length} questions out of 163.`);

// Sanity check
for (const q of allQuestions) {
  if (!q.question_text || q.question_text.length < 5) {
    throw new Error(`Empty question text for Q${q._source_num}`);
  }
  if (!q.options || q.options.length !== 4) {
    throw new Error(`Invalid options count for Q${q._source_num}`);
  }
  if (q.correct_index === undefined || q.correct_index < 0 || q.correct_index > 3) {
    throw new Error(`Invalid correct_index for Q${q._source_num}`);
  }
  for (let idx = 0; idx < 4; idx++) {
    if (!q.options[idx] || q.options[idx].trim().length === 0) {
      throw new Error(`Empty option ${idx} for Q${q._source_num}`);
    }
  }
}

fs.writeFileSync('./backend/scripts/sexual_repro_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully saved to backend/scripts/sexual_repro_all_questions.json');
