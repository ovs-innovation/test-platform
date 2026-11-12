import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/microbes_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/microbes_official_keys.json', 'utf8'));

// Reconstruct lines per page for pages 2 to 21
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 21)) {
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
  2: {
    question_text: `Match List I with List II:

| List I (Bioactive molecules) | List II (Importance) |
| :--- | :--- |
| A. Streptokinase | II. Removal of clots from the blood vessels |
| B. Statins | III. Blood cholesterol-lowering agent |
| C. Lipases | IV. Detergent formulations |
| D. Cyclosporin A | I. Immunosuppressive agent |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-III, C-I, D-IV",
      "A-IV, B-III, C-II, D-I",
      "A-III, B-II, C-IV, D-I",
      "A-II, B-III, C-IV, D-I"
    ],
    explanation: "• **Streptokinase** (produced by *Streptococcus*): Used as a 'clot buster' for removing clots from blood vessels of patients suffering myocardial infarction (A-II).\n• **Statins** (produced by *Monascus purpureus*): Blood cholesterol-lowering agent (B-III).\n• **Lipases**: Used in detergent formulations to remove oily stains (C-IV).\n• **Cyclosporin A** (produced by *Trichoderma polysporum*): Immunosuppressive agent in organ transplantation (D-I).\nHence, the correct match is **A-II, B-III, C-IV, D-I**."
  },
  8: {
    question_text: `Match List-I with List-II relating to microbes and their products:

| List - I (Microbes) | List - II (Products) |
| :--- | :--- |
| (A) Streptococcus | (II) Clot buster |
| (B) Trichoderma polysporum | (III) Cyclosporin A |
| (C) Monascus purpureus | (IV) Statins |
| (D) Aspergillus niger | (I) Citric acid |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-III, C-IV, D-I",
      "A-I, B-II, C-III, D-IV",
      "A-I, B-III, C-II, D-IV",
      "A-I, B-IV, C-II, D-III"
    ],
    explanation: "• *Streptococcus* produces streptokinase (Clot buster): (A)-(II)\n• *Trichoderma polysporum* produces Cyclosporin A: (B)-(III)\n• *Monascus purpureus* produces Statins: (C)-(IV)\n• *Aspergillus niger* produces Citric acid: (D)-(I)\nHence, the correct match is **A-II, B-III, C-IV, D-I**."
  },
  9: {
    question_text: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Clostridium butylicum | III. Butyric acid |
| B. Saccharomyces cerevisiae | I. Ethanol |
| C. Trichoderma polysporum | IV. Cyclosporin-A |
| D. Streptococcus sp. | II. Streptokinase |

Choose the correct answer from the options given below:`,
    options: [
      "A-III, B-I, C-II, D-IV",
      "A-II, B-IV, C-III, D-I",
      "A-III, B-I, C-IV, D-II",
      "A-IV, B-I, C-III, D-II"
    ],
    explanation: "• *Clostridium butylicum* (bacterium) produces butyric acid: (A)-(III)\n• *Saccharomyces cerevisiae* (yeast) ferments sugars to ethanol: (B)-(I)\n• *Trichoderma polysporum* (fungus) produces cyclosporin-A: (C)-(IV)\n• *Streptococcus sp.* (bacterium) produces streptokinase: (D)-(II)\nHence, the correct match is **A-III, B-I, C-IV, D-II**."
  },
  12: {
    question_text: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| (a) Aspergillus niger | (iii) Citric Acid |
| (b) Acetobacter aceti | (i) Acetic Acid |
| (c) Clostridium butylicum | (iv) Butyric Acid |
| (d) Lactobacillus | (ii) Lactic Acid |

Choose the correct answer from the options given below:`,
    options: [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)"
    ],
    explanation: "• *Aspergillus niger* (fungus) $\\rightarrow$ Citric Acid: (a)-(iii)\n• *Acetobacter aceti* (bacterium) $\\rightarrow$ Acetic Acid: (b)-(i)\n• *Clostridium butylicum* (bacterium) $\\rightarrow$ Butyric Acid: (c)-(iv)\n• *Lactobacillus* (bacterium) $\\rightarrow$ Lactic Acid: (d)-(ii)\nHence, the correct match is **(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)**."
  },
  15: {
    question_text: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (a) Dragonflies | (ii) Get rid of Aphids and mosquitoes |
| (b) Bacillus thuringiensis | (iv) Biocontrol agents of lepidopteran plant pests |
| (c) Glomus | (v) Absorb phosphorus from soil |
| (d) Baculoviruses | (iii) Narrow spectrum insecticidal applications |

Select the correct option :`,
    options: [
      "(a)-(ii), (b)-(iv), (c)-(v), (d)-(iii)",
      "(a)-(iii), (b)-(v), (c)-(iv), (d)-(i)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(v)"
    ],
    explanation: "• Dragonflies are biocontrol agents used to get rid of mosquitoes: (a)-(ii)\n• *Bacillus thuringiensis* controls caterpillars and lepidopteran pests: (b)-(iv)\n• *Glomus* (mycorrhiza) absorbs phosphorus from soil for the host plant: (c)-(v)\n• Baculoviruses are narrow spectrum species-specific insecticidal viruses: (d)-(iii)\nHence, option (A) is correct."
  },
  17: {
    question_text: `Match the following columns and select the correct option :

| Column-I | Column-II |
| :--- | :--- |
| (a) Clostridium butylicum | (ii) Butyric Acid |
| (b) Trichoderma polysporum | (i) Cyclosporin-A |
| (c) Monascus purpureus | (iv) Blood cholesterol lowering agent |
| (d) Aspergillus niger | (iii) Citric Acid |

Choose the correct option:`,
    options: [
      "(a) $\\rightarrow$ (iii), (b) $\\rightarrow$ (iv), (c) $\\rightarrow$ (ii), (d) $\\rightarrow$ (i)",
      "(a) $\\rightarrow$ (i), (b) $\\rightarrow$ (ii), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (iii)",
      "(a) $\\rightarrow$ (iv), (b) $\\rightarrow$ (iii), (c) $\\rightarrow$ (ii), (d) $\\rightarrow$ (i)",
      "(a) $\\rightarrow$ (ii), (b) $\\rightarrow$ (i), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (iii)"
    ],
    explanation: "• *Clostridium butylicum* produces Butyric Acid: (a) $\\rightarrow$ (ii)\n• *Trichoderma polysporum* produces Cyclosporin-A: (b) $\\rightarrow$ (i)\n• *Monascus purpureus* produces Statins (Blood cholesterol lowering agent): (c) $\\rightarrow$ (iv)\n• *Aspergillus niger* produces Citric Acid: (d) $\\rightarrow$ (iii)\nHence, the correct option is (D)."
  },
  22: {
    question_text: `Match the following organisms with the products they produce :

| Organism | Product |
| :--- | :--- |
| (a) Lactobacillus | (ii) Curd |
| (b) Saccharomyces cerevisiae | (iv) Bread |
| (c) Aspergillus niger | (iii) Citric Acid |
| (d) Acetobacter aceti | (v) Acetic Acid |

Select the correct option:`,
    options: [
      "(a)-(iii), (b)-(iv), (c)-(v), (d)-(i)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(v)",
      "(a)-(ii), (b)-(iv), (c)-(v), (d)-(iii)",
      "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(v)"
    ],
    explanation: "• *Lactobacillus* converts milk to curd: (a)-(ii)\n• *Saccharomyces cerevisiae* ferments dough in bread making: (b)-(iv)\n• *Aspergillus niger* produces citric acid: (c)-(iii)\n• *Acetobacter aceti* produces acetic acid (vinegar): (d)-(v)\nHence, the correct match is **(a)-(ii), (b)-(iv), (c)-(iii), (d)-(v)**."
  },
  29: {
    question_text: `Match Column-I with Column-II and select the correct option using the codes given below :

| Column-I | Column-II |
| :--- | :--- |
| (a) Citric acid | (iii) Aspergillus |
| (b) Cyclosporin A | (i) Trichoderma |
| (c) Statins | (iv) Monascus |
| (d) Butyric acid | (ii) Clostridium |

Select the correct option :`,
    options: [
      "(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)",
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(i), (b)-(iv), (c)-(ii), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)"
    ],
    explanation: "• Citric acid is produced by *Aspergillus niger*: (a)-(iii)\n• Cyclosporin A is produced by *Trichoderma polysporum*: (b)-(i)\n• Statins are produced by *Monascus purpureus*: (c)-(iv)\n• Butyric acid is produced by *Clostridium butylicum*: (d)-(ii)\nHence, option (B) is correct."
  },
  30: {
    question_text: `Which of the following is wrongly matched in the given table?

| Microbe | Product | Application |
| :--- | :--- | :--- |
| (A) Streptococcus | Streptokinase | Removal of clot from blood vessel |
| (B) Trichoderma polysporum | Cyclosporin A | Immunosuppressive drug |
| (C) Monascus purpureus | Statins | Lowering of blood cholesterol |
| (D) Clostridium butylicum | Lipase | Removal of oil stains |`,
    options: [
      "Microbe - Streptococcus, Product - Streptokinase, Application - Removal of clot from blood vessel",
      "Microbe - Trichoderma polysporum, Product - Cyclosporin A, Application - Immunosuppressive drug",
      "Microbe - Monascus purpureus, Product - Statins, Application - Lowering of blood cholesterol",
      "Microbe - Clostridium butylicum , Product - Lipase, Application - Removal of oil stains"
    ],
    explanation: "*Clostridium butylicum* is a bacterium that produces **butyric acid**, not lipase. Lipases are enzymes produced by microbes like *Candida* and used in detergent formulations to remove oily stains."
  },
  31: {
    question_text: `Match the following list of microbes and their importance :

| Column I | Column II |
| :--- | :--- |
| (a) Saccharomyces cerevisiae | (iii) Commercial production of ethanol |
| (b) Monascus purpureus | (iv) Production of blood cholesterol lowering agents |
| (c) Trichoderma polysporum | (i) Production of immunosuppressive agent |
| (d) Propionibacterium sharmanii | (ii) Ripening of Swiss cheese |

Select the correct option :`,
    options: [
      "(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)",
      "(a) - (iii), (b) - (iv), (c) - (i), (d) - (ii)",
      "(a) - (iv), (b) - (ii), (c) - (i), (d) - (iii)",
      "(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)"
    ],
    explanation: "• *Saccharomyces cerevisiae* (yeast): Ethanol fermentation: (a)-(iii)\n• *Monascus purpureus*: Blood cholesterol lowering statins: (b)-(iv)\n• *Trichoderma polysporum*: Immunosuppressive cyclosporin A: (c)-(i)\n• *Propionibacterium sharmanii*: Production and ripening of Swiss cheese: (d)-(ii)\nHence, the correct option is (B)."
  },
  90: {
    question_text: "Gobar gas contains mainly",
    options: [
      "$\\text{CO}_2 + \\text{H}_2$",
      "$\\text{CO}_2 + \\text{H}_2\\text{O}$",
      "$\\text{CH}_4\\text{ only}$",
      "$\\text{CH}_4 + \\text{CO}_2$"
    ],
    explanation: "Gobar gas (biogas) is produced by the anaerobic digestion of dung by methanogens. It is a mixture composed predominantly of methane ($\\text{CH}_4$, 50–70%) and carbon dioxide ($\\text{CO}_2$, 30–40%), with small traces of other gases."
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
      chapter: 'Microbes in Human Welfare',
      topic: 'Microbes in Human Welfare',
      question_type: 'mcq',
      question_text: sp.question_text,
      options: sp.options,
      correct_index: correctIndex,
      correct_indices: [correctIndex],
      explanation: sp.explanation,
      difficulty: 'medium',
      marks: 4,
      image_url: ''
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

  // Chemical and formula formatting
  const formatFormulas = (str) => {
    return str
      .replace(/\bCO2\b/g, '$\\text{CO}_2$')
      .replace(/\bH2\b/g, '$\\text{H}_2$')
      .replace(/\bO2\b/g, '$\\text{O}_2$')
      .replace(/\bCH4\b/g, '$\\text{CH}_4$')
      .replace(/\bB12\b/g, '$\\text{B}_{12}$');
  };

  qText = formatFormulas(qText);
  optA = formatFormulas(optA);
  optB = formatFormulas(optB);
  optC = formatFormulas(optC);
  optD = formatFormulas(optD);

  const correctOptLetter = officialKey;
  const correctOptText = [optA, optB, optC, optD][correctIndex];
  const explanation = `According to NCERT Microbes in Human Welfare, the correct answer is option (${correctOptLetter}): **${correctOptText}**.`;

  allQuestions.push({
    _source_num: num,
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 15,
    chapter: 'Microbes in Human Welfare',
    topic: 'Microbes in Human Welfare',
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

console.log(`Successfully parsed and generated ${allQuestions.length} questions out of 99.`);

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

fs.writeFileSync('./backend/scripts/microbes_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully saved to backend/scripts/microbes_all_questions.json');
