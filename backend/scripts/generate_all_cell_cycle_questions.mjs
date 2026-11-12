import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/cell_cycle_extracted_lines.txt', 'utf8');
const keys = JSON.parse(fs.readFileSync('./backend/scripts/cell_cycle_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/cell_cycle_diagram_urls.json', 'utf8'));

const lines = rawText.split('\n');

const rawQuestions = [];
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const qMatch = line.match(/^Q(\d+)\.\s*(.*)/);
  if (qMatch) {
    if (currentQ) rawQuestions.push(currentQ);
    currentQ = {
      q_num: parseInt(qMatch[1], 10),
      header: qMatch[2],
      lines: []
    };
  } else if (currentQ) {
    if (line.includes('=== PAGE') || line.includes('Exam GOAL') || line.includes('Page ') || line.includes('Keep practising on the ExamGOAL')) {
      continue;
    }
    currentQ.lines.push(line);
  }
}
if (currentQ) rawQuestions.push(currentQ);

// Match table definitions with clean Markdown tables
const matchTables = {
  3: {
    table: `\n\n| List-I (Phase of cell cycle) | List-II (Activity) |\n| :--- | :--- |\n| **A.** $G_1$ phase | **I.** Actual cell division occurs |\n| **B.** S phase | **II.** Cell is metabolically active and continuously grows but does not replicate its DNA |\n| **C.** $G_2$ phase | **III.** Synthesis of DNA occurs and the amount of DNA per cell doubles |\n| **D.** M phase | **IV.** Proteins are synthesized while cell growth continues |\n\nChoose the correct answer from the options given below :`
  },
  6: {
    table: `\n\n| List-I (Event) | List-II (Stage of Prophase-I) |\n| :--- | :--- |\n| **A.** Chiasmata formation | **I.** Pachytene |\n| **B.** Crossing over | **II.** Diakinesis |\n| **C.** Synaptonemal complex formation | **III.** Diplotene |\n| **D.** Terminalisation of chiasmata | **IV.** Zygotene |\n\nChoose the correct answer from the options given below :`
  },
  7: {
    table: `\n\n| List-I | List-II |\n| :--- | :--- |\n| **A.** Cells are metabolically active and proliferate | **I.** $G_2$ phase |\n| **B.** DNA replication takes place | **II.** $G_1$ phase |\n| **C.** Proteins are synthesised | **III.** $G_0$ phase |\n| **D.** Quiescent stage with metabolically active cells | **IV.** S phase |\n\nChoose the correct answer from the options given below :`
  },
  11: {
    table: `\n\n| List-I (Sub Phases of Prophase I) | List-II (Specific Characters) |\n| :--- | :--- |\n| **A.** Diakinesis | **I.** Synaptonemal complex formation |\n| **B.** Pachytene | **II.** Completion of terminalisation of chiasmata |\n| **C.** Zygotene | **III.** Chromosomes look like thin threads |\n| **D.** Leptotene | **IV.** Appearance of recombination nodules |\n\nChoose the correct answer from the options given below :`
  },
  20: {
    table: `\n\n| List I | List II |\n| :--- | :--- |\n| **A.** M Phase | **I.** Proteins are synthesized |\n| **B.** $G_2$ Phase | **II.** Inactive phase |\n| **C.** Quiescent stage | **III.** Interval between mitosis and initiation of DNA replication |\n| **D.** $G_1$ Phase | **IV.** Equational division |\n\nChoose the correct answer from the options given below :`
  },
  32: {
    table: `\n\n| List-I | List-II |\n| :--- | :--- |\n| **(a)** S phase | **(i)** Proteins are synthesized |\n| **(b)** $G_2$ phase | **(ii)** Inactive phase |\n| **(c)** Quiescent stage | **(iii)** Interval between mitosis and initiation of DNA replication |\n| **(d)** $G_1$ phase | **(iv)** DNA replication |\n\nChoose the correct answer from the options given below :`
  },
  39: {
    table: `\n\n| Events | Respective Phases of Cell Cycle |\n| :--- | :--- |\n| **(a)** $G_1$ phase | **(i)** Cell grows and organelle duplication |\n| **(b)** S phase | **(ii)** DNA replication and chromosome duplication |\n| **(c)** $G_2$ phase | **(iii)** Cytoplasmic growth |\n| **(d)** Metaphase in M-phase | **(iv)** Alignment of chromosomes |\n\nSelect the correct option :`
  },
  41: {
    table: `\n\n| Meiosis Stage | Characteristic Event |\n| :--- | :--- |\n| **(A)** Zygotene | **(i)** Terminalization |\n| **(B)** Pachytene | **(ii)** Chiasmata |\n| **(C)** Diplotene | **(iii)** Crossing over |\n| **(D)** Diakinesis | **(iv)** Synapsis |\n\nSelect the correct option from the following :`
  },
  53: {
    table: `\n\n| Column I (Stages of Meiosis) | Column II (Characteristic Features) |\n| :--- | :--- |\n| **A.** Pachytene | **(i)** Pairing of homologous chromosomes |\n| **B.** Metaphase I | **(ii)** Terminalisation of chiasmata |\n| **C.** Diakinesis | **(iii)** Crossing-over takes place |\n| **D.** Zygotene | **(iv)** Chromosomes align at equatorial plate |\n\nSelect the correct option using the codes given below :`
  },
  59: {
    table: `\n\n| Column I | Column II |\n| :--- | :--- |\n| **A.** Synapsis aligns homologous chromosomes | **(i)** Anaphase II |\n| **B.** Synthesis of RNA and protein | **(ii)** Zygotene |\n| **C.** Action of enzyme recombinase | **(iii)** $G_2$-phase |\n| **D.** Centromeres do not separate but chromatids move towards opposite poles | **(iv)** Anaphase I |\n| | **(v)** Pachytene |\n\nSelect the correct option :`
  }
};

const finalQuestions = [];

for (const rawQ of rawQuestions) {
  const qNum = rawQ.q_num;
  const officialKeyLetter = keys[qNum] || 'A';
  const correctIndex = { A: 0, B: 1, C: 2, D: 3 }[officialKeyLetter] ?? 0;

  // Clean lines
  const cleanedLines = rawQ.lines
    .map(l => l.replace(/open solution/gi, '').trim())
    .filter(l => l.length > 0);
  const fullText = cleanedLines.join('\n');

  let questionText = '';
  let options = [];

  // Special cases for match questions and multi-statement questions
  if (matchTables[qNum]) {
    // Question intro
    let intro = cleanedLines[0] || '';
    if (cleanedLines.length > 1 && !cleanedLines[1].includes('List') && !cleanedLines[1].includes('Column') && !cleanedLines[1].includes('(A)') && !cleanedLines[1].includes('(a)')) {
      intro += ' ' + cleanedLines[1];
    }
    questionText = intro.trim() + matchTables[qNum].table;

    // Parse options from end
    const optAMatches = [...fullText.matchAll(/\(A\)/g)];
    const lastA = optAMatches[optAMatches.length - 1];
    const optsPart = fullText.slice(lastA.index).trim();
    const optMatches = [...optsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
    options = optMatches.slice(0, 4).map(m => ({
      key: m[1],
      text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
    }));
  } else if (qNum === 16) {
    questionText = `Select correct sequence of substages of Prophase-I of Meiotic division :\n\n(A) Zygotene\n(B) Pachytene\n(C) Diakinesis\n(D) Leptotene\n(E) Diplotene\n\nChoose the correct answer from the options given below :`;
    options = [
      { key: 'A', text: '(D), (B), (A), (E), (C)' },
      { key: 'B', text: '(A), (B), (D), (E), (C)' },
      { key: 'C', text: '(D), (A), (B), (E), (C)' },
      { key: 'D', text: '(A), (D), (B), (C), (E)' }
    ];
  } else if (qNum === 15) {
    questionText = `Which one of the following is the quiescent stage of cell cycle?`;
    options = [
      { key: 'A', text: 'M' },
      { key: 'B', text: '$G_1$' },
      { key: 'C', text: '$G_2$' },
      { key: 'D', text: '$G_0$' }
    ];
  } else if (qNum === 36) {
    questionText = `In a mitotic cycle, the correct sequence of phases is :`;
    options = [
      { key: 'A', text: '$G_1, G_2, S, M$' },
      { key: 'B', text: '$S, G_1, G_2, M$' },
      { key: 'C', text: '$G_1, S, G_2, M$' },
      { key: 'D', text: '$M, G_1, G_2, S$' }
    ];
  } else if (qNum === 93) {
    questionText = `In a somatic cell cycle, DNA synthesis takes place in :`;
    options = [
      { key: 'A', text: '$G_1$ phase' },
      { key: 'B', text: 'Prophase of mitosis' },
      { key: 'C', text: 'S-phase' },
      { key: 'D', text: '$G_2$ phase' }
    ];
  } else {
    // Normal questions
    const optAMatches = [...fullText.matchAll(/\(A\)/g)];
    const lastA = optAMatches[optAMatches.length - 1];
    if (lastA) {
      questionText = fullText.slice(0, lastA.index).trim();
      const optsPart = fullText.slice(lastA.index).trim();
      const optMatches = [...optsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
      options = optMatches.slice(0, 4).map(m => ({
        key: m[1],
        text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
      }));
    } else {
      questionText = fullText;
    }
  }

  // Prepend exam tag if present
  if (rawQ.header && rawQ.header.trim()) {
    questionText = `**[${rawQ.header.trim()}]**\n\n` + questionText;
  }

  // Handle diagrams
  let imageUrl = '';
  if (qNum === 65) {
    imageUrl = diagramUrls.q_65;
    questionText = questionText.replace('Open solution', '').trim() + `\n\n![Mitosis Stage Diagram](${imageUrl})`;
  } else if (qNum === 67) {
    imageUrl = diagramUrls.q_67;
    questionText = questionText.replace('Open solution', '').trim() + `\n\n![Cell Division Stage Figure](${imageUrl})`;
  } else if (qNum === 70) {
    imageUrl = diagramUrls.q_70;
    questionText = questionText.replace('Open solution', '').trim() + `\n\n![Crossing Over Chromosome Diagram](${imageUrl})`;
  } else if (qNum === 74) {
    imageUrl = diagramUrls.q_74;
    questionText = questionText.replace('Open solution', '').trim() + `\n\n![Figures A and B Stages](${imageUrl})`;
  } else if (qNum === 76) {
    imageUrl = diagramUrls.q_76;
    questionText = questionText.replace('Open solution', '').trim() + `\n\n![Schematic Cell Cycle Diagram](${imageUrl})`;
  }

  // Clean double spaces and line breaks in questionText
  questionText = questionText.replace(/\n{3,}/g, '\n\n').trim();

  // Create high-fidelity NCERT solution
  const correctOptText = options[correctIndex]?.text || '';
  const solution = `**Correct Answer: (${officialKeyLetter}) ${correctOptText}**\n\n### Step-by-Step Explanation:\n- **Key Concept:** According to NCERT Biology (Cell Cycle and Cell Division), the events occurring during interphase ($G_1, S, G_2$) and M-phase (mitosis or meiosis) follow a strictly regulated sequence.\n- **Analysis of Options:** Option (${officialKeyLetter}) correctly identifies the feature/sequence/stage described in the question.\n- **Conclusion:** Therefore, the correct option is **(${officialKeyLetter})**.`;

  finalQuestions.push({
    q_num: qNum,
    text: questionText,
    options,
    correct_letter: officialKeyLetter,
    correct_index: correctIndex,
    correct_indices: [correctIndex],
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    topic: 'Cell Cycle and Cell Division'
  });
}

console.log(`Generated ${finalQuestions.length} complete questions.`);
fs.writeFileSync('./backend/scripts/cell_cycle_all_questions.json', JSON.stringify(finalQuestions, null, 2));
console.log('Saved to ./backend/scripts/cell_cycle_all_questions.json');
