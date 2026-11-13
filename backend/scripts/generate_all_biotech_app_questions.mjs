import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_official_keys.json', 'utf8'));

const questions = [];

for (const b of blocks) {
  const qNum = b.qNum;
  const examTag = b.examTag || '';
  const officialKey = officialKeys[qNum] || '';

  let fullLines = [...b.rawLines];

  // Specific question overrides / special handling
  if (qNum === 10) {
    // Q10 options are sequence of steps
    const optA = 'E -> C -> B -> A -> D';
    const optB = 'B -> C -> A -> E -> D';
    const optC = 'A -> E -> B -> D -> C';
    const optD = 'B -> E -> C -> A -> D';

    // Question text is everything before "(A)"
    const qTextLines = [];
    for (const line of fullLines) {
      if (line.trim().startsWith('(A)')) break;
      qTextLines.push(line);
    }
    const qText = qTextLines.join('\n').trim();

    questions.push({
      qNum,
      examTag,
      question_text: qText,
      options: [optA, optB, optC, optD],
      correct_option: officialKey
    });
    continue;
  }

  // Handle Match questions specially
  if (qNum === 8) {
    const qText = `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Genetically engineered Human Insulin | (I) Gene therapy |
| (B) GM Cotton | (II) E. coli |
| (C) ADA Deficiency | (III) Antigen-antibody interaction |
| (D) ELISA | (IV) Bacillus thuringiensis |

Choose the correct answer from the options given below:`;

    const optA = 'A-III, B-II, C-IV, D-I';
    const optB = 'A-II, B-I, C-IV, D-III';
    const optC = 'A-IV, B-III, C-I, D-II';
    const optD = 'A-II, B-IV, C-I, D-III';

    questions.push({
      qNum,
      examTag,
      question_text: qText,
      options: [optA, optB, optC, optD],
      correct_option: officialKey
    });
    continue;
  }

  if (qNum === 15) {
    const qText = `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| (A) $\\alpha$-1-antitrypsin | (I) Cotton bollworm |
| (B) Cry IAb | (II) ADA deficiency |
| (C) Cry IAc | (III) Emphysema |
| (D) Enzyme replacement therapy | (IV) Corn borer |

Choose the correct answer from the options given below:`;

    const optA = 'A-II, B-I, C-IV, D-III';
    const optB = 'A-III, B-I, C-II, D-IV';
    const optC = 'A-III, B-IV, C-I, D-II';
    const optD = 'A-II, B-IV, C-I, D-III';

    questions.push({
      qNum,
      examTag,
      question_text: qText,
      options: [optA, optB, optC, optD],
      correct_option: officialKey
    });
    continue;
  }

  if (qNum === 17) {
    const qText = `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Gene therapy | (I) Separation of DNA fragments |
| (B) RNA interference | (II) Diagnostic test for AIDS |
| (C) ELISA | (III) Cellular defence |
| (D) Gel Electrophoresis | (IV) Allows correction of a gene defect |

Choose the correct answer from the options given below:`;

    const optA = '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)';
    const optB = '(A)-(IV), (B)-(II), (C)-(III), (D)-(I)';
    const optC = '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)';
    const optD = '(A)-(IV), (B)-(III), (C)-(I), (D)-(II)';

    questions.push({
      qNum,
      examTag,
      question_text: qText,
      options: [optA, optB, optC, optD],
      correct_option: officialKey
    });
    continue;
  }

  if (qNum === 32) {
    const qText = `Match the following columns and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| (a) Bt cotton | (i) Gene therapy |
| (b) Adenosine deaminase deficiency | (ii) Cellular defence |
| (c) RNAi | (iii) Detection of HIV infection |
| (d) PCR | (iv) Bacillus thuringiensis |

Select the correct option:`;

    const optA = '(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)';
    const optB = '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)';
    const optC = '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)';
    const optD = '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)';

    questions.push({
      qNum,
      examTag,
      question_text: qText,
      options: [optA, optB, optC, optD],
      correct_option: officialKey
    });
    continue;
  }

  // General questions parsing:
  // Find where option (A) begins
  let fullText = fullLines.join('\n');

  // Fix Greek symbols and missing tokens
  fullText = fullText.replace(/named\s+-1-antitrypsin/g, 'named $\\alpha$-1-antitrypsin');
  fullText = fullText.replace(/protein\s+-1-antitrypsin/g, 'protein $\\alpha$-1-antitrypsin');
  fullText = fullText.replace(/\(C\)\s+phage/g, '(C) $\\lambda$ phage');

  // Find option markers
  // Option markers are (A), (B), (C), (D)
  const aIdx = fullText.indexOf('(A)');
  const bIdx = fullText.indexOf('(B)');
  const cIdx = fullText.indexOf('(C)');
  const dIdx = fullText.indexOf('(D)');

  let qText = fullText.substring(0, aIdx).trim();
  let optA = fullText.substring(aIdx + 3, bIdx).replace(/\n/g, ' ').trim();
  let optB = fullText.substring(bIdx + 3, cIdx).replace(/\n/g, ' ').trim();
  let optC = fullText.substring(cIdx + 3, dIdx).replace(/\n/g, ' ').trim();
  let optD = fullText.substring(dIdx + 3).replace(/\n/g, ' ').trim();

  // Clean double spaces
  qText = qText.replace(/[ ]{2,}/g, ' ');
  optA = optA.replace(/[ ]{2,}/g, ' ');
  optB = optB.replace(/[ ]{2,}/g, ' ');
  optC = optC.replace(/[ ]{2,}/g, ' ');
  optD = optD.replace(/[ ]{2,}/g, ' ');

  questions.push({
    qNum,
    examTag,
    question_text: qText,
    options: [optA, optB, optC, optD],
    correct_option: officialKey
  });
}

console.log(`Generated ${questions.length} questions.`);
fs.writeFileSync('backend/scripts/biotech_app_parsed_questions.json', JSON.stringify(questions, null, 2));
