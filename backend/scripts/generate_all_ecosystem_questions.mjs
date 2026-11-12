import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/ecosystem_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/ecosystem_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/ecosystem_diagram_urls.json', 'utf8'));

// Reconstruct lines per page for pages 2 to 24
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 24)) {
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
  3: {
    question_text: `Match List I with List II :

| List-I | List-II |
| :--- | :--- |
| A. Productivity | I. Gross primary productivity minus respiration losses |
| B. Net primary productivity | II. Rate of formation of new organic matter by consumers |
| C. Gross primary productivity | III. Rate of biomass production |
| D. Secondary productivity | IV. Rate of production of organic matter during photosynthesis |

Choose the correct answer from the options given below :`,
    options: [
      "A-III, B-I, C-IV, D-II",
      "A-I, B-II, C-III, D-IV",
      "A-I, B-III, C-IV, D-II",
      "A-III, B-I, C-II, D-IV"
    ],
    explanation: "• **Productivity**: Rate of biomass production (A-III).\n• **Net primary productivity (NPP)**: Gross primary productivity minus respiration losses ($NPP = GPP - R$) (B-I).\n• **Gross primary productivity (GPP)**: Rate of production of organic matter during photosynthesis (C-IV).\n• **Secondary productivity**: Rate of formation of new organic matter by consumers (D-II).\nHence, the correct match is **A-III, B-I, C-IV, D-II**."
  },
  4: {
    question_text: `Match List I with List II:

| List-I | List-II (Activity) |
| :--- | :--- |
| A. Decomposition | III. Breaking down of complex organic matter into inorganic substances. |
| B. Detritus | IV. Dead remains of plants and animals including fecal matter |
| C. Mineralisation | II. Release of inorganic nutrients by the activity of microbes in soil |
| D. Humification | I. Accumulation of dark coloured amorphous colloidal substance |

Choose the correct answer from the options given below:`,
    options: [
      "A-IV, B-III, C-I, D-II",
      "A-III, B-IV, C-II, D-I",
      "A-I, B-II, C-III, D-IV",
      "A-III, B-II, C-I, D-IV"
    ],
    explanation: "• **Decomposition**: Breaking down of complex organic matter into inorganic substances like $\\text{CO}_2$, water, and nutrients (A-III).\n• **Detritus**: Raw material for decomposition comprising dead plant and animal remains including fecal matter (B-IV).\n• **Mineralisation**: Release of inorganic nutrients by microbial activity in soil (C-II).\n• **Humification**: Accumulation of dark coloured amorphous colloidal substance called humus (D-I).\nHence, the correct match is **A-III, B-IV, C-II, D-I**."
  },
  9: {
    question_text: "Which of the following is the unit of productivity of an Ecosystem?",
    options: [
      "$\\text{Kcal m}^{-3}$",
      "$(\\text{Kcal m}^{-2})\\text{yr}^{-1}$",
      "$\\text{gm}^{-2}$",
      "$\\text{Kcal m}^{-2}$"
    ],
    explanation: "Productivity is defined as the rate of biomass or energy produced per unit area over a given time period. It is expressed in units of mass ($(\\text{g m}^{-2})\\text{yr}^{-1}$) or energy ($(\\text{Kcal m}^{-2})\\text{yr}^{-1}$)."
  },
  10: {
    question_text: "Consider the pyramid of energy of an ecosystem given below:\n\nIf $T_4$ is equivalent to $1000\\text{ J}$, what is the value at $T_1$ ?",
    options: [
      "$\\frac{10000}{10}\\text{ J}$",
      "$\\frac{10000}{10} \\times 4\\text{ J}$",
      "$10,000\\text{ J}$",
      "$10,00,000\\text{ J}$"
    ],
    image_url: diagramUrls.q_10,
    explanation: "According to Lindeman's 10% law of energy transfer:\n• Energy at $T_4 = 1,000\\text{ J}$\n• Energy at $T_3 = 1,000 / 0.1 = 10,000\\text{ J}$\n• Energy at $T_2 = 10,000 / 0.1 = 100,000\\text{ J}$\n• Energy at $T_1 = 100,000 / 0.1 = 1,000,000\\text{ J} = 10,00,000\\text{ J}$."
  },
  12: {
    question_text: "In an ecosystem if the Net Primary Productivity (NPP) of first trophic level is $100x\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$, what would be the GPP (Gross Primary Productivity) of the third trophic level of the same ecosystem?",
    options: [
      "$\\frac{x}{10}\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$",
      "$x\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$",
      "$10x\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$",
      "$\\frac{100x}{3x}\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$"
    ],
    explanation: "By Lindeman's 10% rule, 10% of energy available at the first trophic level ($100x$) is transferred to the second trophic level, providing an intake/gross productivity of $10x\\ (\\text{kcal m}^{-2})\\text{yr}^{-1}$."
  },
  14: {
    question_text: "In the equation GPP - R = NPP\nGPP is Gross Primary Productivity\nNPP is Net Primary Productivity\nR here is __________.",
    options: [
      "Respiratory quotient",
      "Respiratory loss",
      "Reproductive allocation",
      "Photosynthetically active radiation"
    ],
    explanation: "In the equation $\\text{GPP} - R = \\text{NPP}$, $\\text{GPP}$ is Gross Primary Productivity, $\\text{NPP}$ is Net Primary Productivity, and $R$ represents **respiratory losses** (energy utilized during plant respiration)."
  },
  19: {
    question_text: "In the equation GPP - R = NPP\nR represents :",
    options: [
      "Respiration losses",
      "Radiant energy",
      "Retardation factor",
      "Environmental factor"
    ],
    explanation: "In the ecological productivity equation $\\text{GPP} - R = \\text{NPP}$, $R$ represents **respiration losses** incurred by plants."
  },
  23: {
    question_text: `Match the trophic levels with their correct species examples in grassland ecosystem :

(A) Fourth trophic level — (ii) Vulture
(B) Second trophic level — (iii) Rabbit
(C) First trophic level — (iv) Grass
(D) Third trophic level — (i) Crow

Select the correct option :`,
    options: [
      "(A) $\\rightarrow$ (iv), (B) $\\rightarrow$ (iii), (C) $\\rightarrow$ (ii), (D) $\\rightarrow$ (i)",
      "(A) $\\rightarrow$ (ii), (B) $\\rightarrow$ (iii), (C) $\\rightarrow$ (iv), (D) $\\rightarrow$ (i)",
      "(A) $\\rightarrow$ (i), (B) $\\rightarrow$ (ii), (C) $\\rightarrow$ (iii), (D) $\\rightarrow$ (iv)",
      "(A) $\\rightarrow$ (iii), (B) $\\rightarrow$ (ii), (C) $\\rightarrow$ (i), (D) $\\rightarrow$ (iv)"
    ],
    explanation: "• Fourth trophic level ($T_4$): Vulture (A $\\rightarrow$ ii)\n• Second trophic level ($T_2$): Rabbit (B $\\rightarrow$ iii)\n• First trophic level ($T_1$): Grass (C $\\rightarrow$ iv)\n• Third trophic level ($T_3$): Crow (D $\\rightarrow$ i)\nHence, the correct option is (B)."
  },
  36: {
    question_text: `Match the following and select the correct option :

(a) Earthworm — (ii) Detritivore
(b) Succession — (i) Pioneer species
(c) Ecosystem service — (iv) Pollination
(d) Population growth — (iii) Natality`,
    options: [
      "(a) $\\rightarrow$ (i), (b) $\\rightarrow$ (ii), (c) $\\rightarrow$ (iii), (d) $\\rightarrow$ (iv)",
      "(a) $\\rightarrow$ (iii), (b) $\\rightarrow$ (ii), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (i)",
      "(a) $\\rightarrow$ (iv), (b) $\\rightarrow$ (i), (c) $\\rightarrow$ (iii), (d) $\\rightarrow$ (ii)",
      "(a) $\\rightarrow$ (ii), (b) $\\rightarrow$ (i), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (iii)"
    ],
    explanation: "• Earthworm is a detritivore: (a) $\\rightarrow$ (ii)\n• Succession involves pioneer species initiating colonization: (b) $\\rightarrow$ (i)\n• Ecosystem service includes pollination: (c) $\\rightarrow$ (iv)\n• Population growth includes natality (birth rate): (d) $\\rightarrow$ (iii)\nHence, the correct option is (D)."
  },
  43: {
    question_text: "Identify the likely organisms (a), (b), (c) and (d) in the food web shown below :",
    options: [
      "(a) $\\rightarrow$ deer , (b) $\\rightarrow$ rabbit , (c) $\\rightarrow$ frog, (d) $\\rightarrow$ rat",
      "(a) $\\rightarrow$ squirrel , (b) $\\rightarrow$ cat, (c) $\\rightarrow$ rat , (d) $\\rightarrow$ pigeon",
      "(a) $\\rightarrow$ dog, (b) $\\rightarrow$ squirrel , (c) $\\rightarrow$ bat , (d) $\\rightarrow$ deer",
      "(a) $\\rightarrow$ rat , (b) $\\rightarrow$ dog , (c) $\\rightarrow$ tortoise, (d) $\\rightarrow$ crow"
    ],
    image_url: diagramUrls.q_43,
    explanation: "In the given food web:\n• Organism (a) eats vegetation and is eaten by lion $\\rightarrow$ deer\n• Organism (b) eats vegetation and is eaten by foxes $\\rightarrow$ rabbit\n• Organism (c) eats grasshopper and is eaten by snakes $\\rightarrow$ frog\n• Organism (d) eats vegetation/seeds and is eaten by hawks $\\rightarrow$ rat\nTherefore, option (A) is the correct answer."
  },
  45: {
    question_text: "Given below is an imaginary pyramid of numbers. What could be one of the possibilities about certain organisms at some of the different levels ?",
    options: [
      "Level PC is \"rats\" and level SC is \"cats\"",
      "Level PP is \"phytoplanktons\" in sea and \"Whale\" on top level TC",
      "Level one PP is \"pipal trees\" and the level SC is \"sheep\"",
      "Level PC is \"insects\" and level SC is \"small insectivorous birds\""
    ],
    image_url: diagramUrls.q_45,
    explanation: "The pyramid shows a spindle-shaped pyramid of numbers in a parasitic or tree ecosystem:\n• PP = 1 (single large tree)\n• PC = 500 (numerous herbivorous insects feeding on tree)\n• SC = 50 (insectivorous birds feeding on insects)\n• TC = 10 (top carnivores/birds of prey)\nHence, Level PC is \"insects\" and level SC is \"small insectivorous birds\" (D)."
  },
  53: {
    question_text: "Which of the following representations shows the pyramid of numbers in a forest ecosystem ?",
    options: [
      "B",
      "A",
      "D",
      "C"
    ],
    image_url: diagramUrls.q_53,
    explanation: "In a forest ecosystem, the pyramid of numbers is spindle-shaped (represented by figure B): a single huge tree (producer) supports a large number of herbivores (birds/insects), which are preyed upon by fewer carnivores."
  },
  69: {
    question_text: "In a terrestrial ecosystem such as forest, maximum energy is in which trophic level?",
    options: [
      "$T_1$",
      "$T_2$",
      "$T_3$",
      "$T_4$"
    ],
    explanation: "In any ecosystem, primary producers occupy the first trophic level ($T_1$) and fix solar radiant energy into chemical energy. Since energy decreases at each successive trophic level according to the 10% law, maximum energy is always present at the producer level ($T_1$)."
  },
  86: {
    question_text: `Match List - I with List - II

| List - I | List - II |
| :--- | :--- |
| (A) Hydrarch succession | (IV) Phytoplankton to mesic conditions |
| (B) Xerarch succession | (III) Lichens to mesic conditions |
| (C) Ecological succession | (I) Gradual change in the species composition |
| (D) Secondary succession | (II) Faster and climax reached quickly |

Choose the correct answer from the options given below :`,
    options: [
      "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)",
      "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
      "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
      "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)"
    ],
    explanation: "• **Hydrarch succession**: Takes place in wet areas from phytoplankton to climax mesic condition: (A)-(IV)\n• **Xerarch succession**: Takes place in dry areas starting with crustose lichens to mesic conditions: (B)-(III)\n• **Ecological succession**: Gradual and predictable change in species composition: (C)-(I)\n• **Secondary succession**: Begins in areas where natural vegetation was destroyed, progressing much faster to climax: (D)-(II)\nHence, the correct match is **(A)-(IV), (B)-(III), (C)-(I), (D)-(II)**."
  },
  91: {
    question_text: `Match List - I with List - II :

| List - I | List - II |
| :--- | :--- |
| (a) Carbon dissolved in oceans | (ii) 71% |
| (b) Annual fixation of carbon through photosynthesis | (iii) $4 \\times 10^{13}\\text{ kg}$ |
| (c) PAR captured by plants | (iv) 2 to 10% |
| (d) Productivity of oceans | (i) 55 billion tons |

Choose the correct answer from the options given below:`,
    options: [
      "(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)",
      "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)"
    ],
    explanation: "• Carbon dissolved in oceans: 71% of total global carbon reservoir (a)-(ii)\n• Annual carbon fixation by photosynthesis: $4 \\times 10^{13}\\text{ kg}$ (b)-(iii)\n• PAR captured by plants: 2 to 10% of incident PAR (c)-(iv)\n• Annual productivity of oceans: 55 billion tons (out of 170 billion tons) (d)-(i)\nHence, the correct match is **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**."
  },
  98: {
    question_text: `In which of the following both pairs have correct combination?

| Option | Gaseous nutrient cycle | Sedimentary nutrient cycle |
| :--- | :--- | :--- |
| (A) | Carbon and Sulphur | Nitrogen and Phosphorus |
| (B) | Sulphur and Phosphorus | Carbon and Nitrogen |
| (C) | Nitrogen and Sulphur | Carbon and Phosphorus |
| (D) | Carbon and Nitrogen | Sulphur and Phosphorus |`,
    options: [
      "Gaseous: Carbon & Sulphur; Sedimentary: Nitrogen & Phosphorus",
      "Gaseous: Sulphur & Phosphorus; Sedimentary: Carbon & Nitrogen",
      "Gaseous: Nitrogen & Sulphur; Sedimentary: Carbon & Phosphorus",
      "Gaseous: Carbon & Nitrogen; Sedimentary: Sulphur & Phosphorus"
    ],
    explanation: "• **Gaseous nutrient cycles**: The reservoir pool is the atmosphere or hydrosphere (e.g., **Carbon**, **Nitrogen**).\n• **Sedimentary nutrient cycles**: The reservoir pool is Earth's crust (lithosphere) (e.g., **Phosphorus**, **Sulphur**).\nTherefore, option (D) is the correct combination."
  },
  100: {
    question_text: "Given below is a simplified model of phosphorus cycling in a terrestrial ecosystem with four blanks (A-D). Identify the blanks.",
    options: [
      "A $\\rightarrow$ Detritus, B $\\rightarrow$ Rock minerals, C $\\rightarrow$ Producers, D $\\rightarrow$ Litter fall",
      "A $\\rightarrow$ Litter fall, B $\\rightarrow$ Producers, C $\\rightarrow$ Rock minerals, D $\\rightarrow$ Detritus",
      "A $\\rightarrow$ Rock Minerals, B $\\rightarrow$ Detritus, C $\\rightarrow$ Litter fall, D $\\rightarrow$ Producers",
      "A $\\rightarrow$ Producers, B $\\rightarrow$ Litter fall, C $\\rightarrow$ Rock minerals, D $\\rightarrow$ Detritus"
    ],
    image_url: diagramUrls.q_100,
    explanation: "In the phosphorus cycle model:\n• C represents Producers (which take up dissolved phosphate from soil solution).\n• D represents plant litter fall adding organic matter.\n• A represents Detritus (dead organic matter from producers and consumers).\n• B represents Rock minerals (which undergo weathering and release phosphate into soil solution).\nHence, option (A) is correct."
  }
};

const allQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const num = cur.num;

  const officialKey = officialKeys[num];
  if (!officialKey) {
    throw new Error(`Missing official key for Q${num}`);
  }

  const correctIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[officialKey];
  if (correctIndex === undefined) {
    throw new Error(`Invalid official key "${officialKey}" for Q${num}`);
  }

  if (SPECIAL_QUESTIONS[num]) {
    const sp = SPECIAL_QUESTIONS[num];
    allQuestions.push({
      _source_num: num,
      category: 'PYQ',
      subject: 'Botany',
      subject_id: 15,
      chapter: 'Ecosystem',
      topic: 'Ecosystem',
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
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|Out of syllabus|These questions are on topics/i.test(t));

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

  // Chemical and arrow formatting
  const formatFormulas = (str) => {
    return str
      .replace(/\bN2\b/g, '$\\text{N}_2$')
      .replace(/\bCO2\b/g, '$\\text{CO}_2$')
      .replace(/(\w+)\s*→\s*(\w+)/g, '$1 $\\rightarrow$ $2')
      .replace(/gm\/m2\/yr/gi, '$\\text{g}/\\text{m}^2/\\text{yr}$')
      .replace(/gm\/m2/gi, '$\\text{g}/\\text{m}^2$');
  };

  qText = formatFormulas(qText);
  optA = formatFormulas(optA);
  optB = formatFormulas(optB);
  optC = formatFormulas(optC);
  optD = formatFormulas(optD);

  const correctOptLetter = officialKey;
  const correctOptText = [optA, optB, optC, optD][correctIndex];
  const explanation = `According to NCERT Ecosystem, the correct answer is option (${correctOptLetter}): **${correctOptText}**.`;

  allQuestions.push({
    _source_num: num,
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 15,
    chapter: 'Ecosystem',
    topic: 'Ecosystem',
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

console.log(`Successfully parsed and generated ${allQuestions.length} questions out of 111.`);

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

fs.writeFileSync('./backend/scripts/ecosystem_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully saved to backend/scripts/ecosystem_all_questions.json');
