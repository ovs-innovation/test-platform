import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/locomotion_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/locomotion_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/locomotion_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 20)) {
  const items = [...p.items];
  items.sort((a, b) => (Math.abs(b.y - a.y) > 3) ? (b.y - a.y) : (a.x - b.x));

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    linesWithMeta.push({ page: p.page, text: currentLineItems.map(i => i.str).join(' ').trim() });
  }
}

// Find questions
const qIndices = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\./);
  if (m) {
    qIndices.push({ qNum: parseInt(m[1]), lineIdx: i, page: linesWithMeta[i].page });
  }
}

console.log(`Found ${qIndices.length} questions in lines dump.`);

const SPECIAL_QUESTIONS = {
  5: {
    question: `Choose the correct statements regarding muscle contraction.
A. A motor neuron carries a signal sent by the Central Nervous System (CNS) to the sarcolemma of the muscle fibre.
B. The neural signal generates an action potential which causes the release of $\\text{Ca}^{++}$ into sarcoplasm.
C. Increase in $\\text{Ca}^{++}$ inactivates the actin for breaking cross bridges.
D. Actin binds to the myosin head to form a cross bridge.
E. Shortening of sarcomere takes place, by pulling actin filaments towards the centre of 'A' band.

Choose the correct answer from the options given below :`,
    options: [
      "C and D only",
      "A and B only",
      "C and E only",
      "A, B, D and E only"
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: D**\n\n- Statement A is correct: Motor neurons carry CNS signals to muscle fiber sarcolemma.\n- Statement B is correct: Action potential in sarcolemma spreads to sarcoplasmic reticulum releasing $\\text{Ca}^{++}$ into sarcoplasm.\n- Statement C is incorrect: $\\text{Ca}^{++}$ binds to troponin on actin, removing tropomyosin masking, activating actin to bind with myosin head (does not inactivate actin).\n- Statement D is correct: Active sites exposed on actin bind to myosin head forming cross bridges.\n- Statement E is correct: Sliding pulls actin filaments towards the centre of 'A' band, shortening the sarcomere.\nHence, statements A, B, D and E only are correct."
  },
  7: {
    question: `Match List I with List II related to muscular/skeletal system:

| List I | List II |
| :--- | :--- |
| A. Tetany | I. Inflammation of joints |
| B. Arthritis | II. Autoimmune disorder affecting neuromuscular junction |
| C. Myasthenia gravis | III. Wild contraction in muscle due to low $\\text{Ca}^{++}$ in body fluid |
| D. Muscular dystrophy | IV. Progressive degeneration of skeletal muscle |

Choose the correct answer from the options given below:`,
    options: [
      "A-III, B-I, C-II, D-IV",
      "A-I, B-II, C-III, D-IV",
      "A-IV, B-III, C-II, D-I",
      "A-III, B-II, C-I, D-IV"
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: A**\n\n- Tetany: Rapid spasms (wild contractions) in muscle due to low $\\text{Ca}^{++}$ in body fluid (A-III).\n- Arthritis: Inflammation of joints (B-I).\n- Myasthenia gravis: Autoimmune disorder affecting neuromuscular junction leading to fatigue, weakening and paralysis (C-II).\n- Muscular dystrophy: Progressive degeneration of skeletal muscle, mostly genetic (D-IV)."
  },
  8: {
    question: `Match List-I with List-II:

| List - I (Location of Joint) | List - II (Type of Joint) |
| :--- | :--- |
| (A) Joint between humerus and pectoral girdle | (I) Gliding joint |
| (B) Knee joint | (II) Ball and Socket joint |
| (C) Joint between atlas and axis | (III) Hinge joint |
| (D) Joint between carpals | (IV) Pivot joint |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-III, C-IV, D-I",
      "A-III, B-II, C-I, D-IV",
      "A-I, B-IV, C-III, D-II",
      "A-II, B-I, C-III, D-IV"
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\n- Joint between humerus and pectoral girdle (glenoid cavity): Ball and socket joint (A-II).\n- Knee joint: Hinge joint (B-III).\n- Joint between atlas and axis: Pivot joint (C-IV).\n- Joint between carpals: Gliding joint (D-I)."
  },
  9: {
    question: `Select the correct statements regarding mechanism of muscle contraction.
A. It is initiated by a signal sent by CNS via sensory neuron.
B. Neurotransmitter generates action potential in the sarcolemma.
C. Increased $\\text{Ca}^{++}$ level leads to the binding of calcium with troponin on actin filaments.
D. Masking of active site for actin is activated.
E. Utilising the energy from ATP hydrolysis to form cross bridge.

Choose the most appropriate answer from the options given below:`,
    options: [
      "B, C and E only",
      "C, D and E only",
      "A and D only",
      "B, D and E only"
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\n- A is incorrect: Initiated by CNS signal sent via a motor neuron (not sensory neuron).\n- B is correct: Acetylcholine release generates action potential in sarcolemma.\n- C is correct: Release of $\\text{Ca}^{++}$ leads to binding of calcium with troponin on actin filaments.\n- D is incorrect: Binding of $\\text{Ca}^{++}$ removes (unmasks) the active site on actin (unmasking, not masking).\n- E is correct: Myosin head hydrolyzes ATP ($ADP + P_i$) and uses this energy to bind actin and form cross bridge.\nHence, statements B, C and E only are correct."
  },
  10: {
    question: "Three types of muscles are given as a, b and c in the figure. Identify the correct matching pair along with their location in human body:",
    options: [
      "(a) Smooth - Toes (b) Skeletal - Legs (c) Cardiac - Heart",
      "(a) Skeletal - Triceps (b) Smooth - Stomach (c) Cardiac - Heart",
      "(a) Skeletal - Biceps (b) Involuntary - Intestine (c) Smooth - Heart",
      "(a) Involuntary - Nose tip (b) Skeletal - Bone (c) Cardiac - Heart"
    ],
    exam: "NEET 2024",
    diagramUrl: diagramUrls['q_10'],
    explanation: "**Correct Option: B**\n\nIn the given figure:\n- (a) shows striated, unbranched, cylindrical muscle fibers with peripheral nuclei, representing skeletal muscle (e.g. Triceps/Biceps).\n- (b) shows spindle-shaped (fusiform), unstriated fibers with central nuclei, representing smooth/involuntary muscle (e.g. wall of Stomach/Intestine).\n- (c) shows striated, branched fibers with intercalated discs and uninucleate cells, representing cardiac muscle (Heart)."
  },
  11: {
    question: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| A. Fibrous joints | I. Adjacent vertebrae, limited movement |
| B. Cartilaginous joints | II. Humerus and Pectoral girdle, rotational movement |
| C. Hinge joints | III. Skull, don't allow any movement |
| D. Ball and socket joints | IV. Knee, help in locomotion |

Choose the correct answer from the options given below :`,
    options: [
      "A-IV, B-II, C-III, D-I",
      "A-I, B-III, C-II, D-IV",
      "A-II, B-III, C-I, D-IV",
      "A-III, B-I, C-IV, D-II"
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: D**\n\n- Fibrous joints: Immovable joints, present between flat skull bones (sutures) (A-III).\n- Cartilaginous joints: Permit limited movement, found between adjacent vertebrae in vertebral column (B-I).\n- Hinge joints: Movement in one plane, e.g. knee joint, helps in locomotion (C-IV).\n- Ball and socket joints: Allow 360-degree rotational movement, e.g. between humerus and glenoid cavity of pectoral girdle (D-II)."
  },
  12: {
    question: `Match List-I with List-II.

| List - I | List - II |
| :--- | :--- |
| (A) Palm bones | (I) Phalanges |
| (B) Wrist bones | (II) Metacarpals |
| (C) Ankle bones | (III) Carpals |
| (D) Digit bones | (IV) Tarsals |

Choose the correct answer from the options given below :`,
    options: [
      "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
      "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)"
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: D**\n\n- Palm bones: Metacarpals (5 in each hand) (A-II).\n- Wrist bones: Carpals (8 in each wrist) (B-III).\n- Ankle bones: Tarsals (7 in each ankle) (C-IV).\n- Digit bones: Phalanges (14 in each limb) (D-I)."
  },
  13: {
    question: `Match List I with List II.

| List I (Type of Joint) | List II (Found between) |
| :--- | :--- |
| (A) Cartilaginous Joint | (I) Between flat skull bones |
| (B) Ball and Socket Joint | (II) Between adjacent vertebrae in vertebral column |
| (C) Fibrous Joint | (III) Between carpal and metacarpal of thumb |
| (D) Saddle joint | (IV) Between Humerus and Pectoral girdle |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-IV, C-I, D-III",
      "A-I, B-IV, C-III, D-II",
      "A-II, B-IV, C-III, D-I",
      "A-III, B-I, C-II, D-IV"
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: A**\n\n- Cartilaginous joint: Found between adjacent vertebrae in the vertebral column (A-II).\n- Ball and socket joint: Found between humerus and pectoral girdle (A-IV).\n- Fibrous joint: Found between flat skull bones (sutures) (C-I).\n- Saddle joint: Found between carpal and metacarpal of thumb (D-III)."
  },
  17: {
    question: `Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).
Assertion (A) : Osteoporosis is characterised by decreased bone mass and increased chance of fractures.
Reason (R) : Common cause of osteoporosis is increased levels of estrogen.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct but (R) is not correct",
      "(A) is not correct but (R) is correct"
    ],
    exam: "NEET 2022 Phase 1",
    explanation: "**Correct Option: C**\n\n- Assertion (A) is correct: Osteoporosis is an age-related disorder characterised by decreased bone mass and increased chance of fractures.\n- Reason (R) is incorrect: Common cause of osteoporosis is *decreased* (deficiency of) estrogen levels after menopause.\nHence, (A) is correct but (R) is not correct."
  },
  20: {
    question: `Match List-I with List-II :

| List-I | List-II |
| :--- | :--- |
| (a) Scapula | (i) Cartilaginous joints |
| (b) Cranium | (ii) Flat bone |
| (c) Sternum | (iii) Fibrous joints |
| (d) Vertebral column | (iv) Triangular flat bone |

Choose the correct answer from the options given below :`,
    options: [
      "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)",
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)"
    ],
    exam: "NEET 2021",
    explanation: "**Correct Option: A**\n\n- Scapula: Large triangular flat bone situated on dorsal part of thorax (a-iv).\n- Cranium: Bones joined by immovable fibrous joints (sutures) (b-iii).\n- Sternum: Flat bone on the ventral midline of thorax (c-ii).\n- Vertebral column: Adjacent vertebrae joined by cartilaginous joints (d-i)."
  },
  22: {
    question: `Match the following columns and select the correct option :

| Column - I | Column - II |
| :--- | :--- |
| (a) Gout | (i) Decreased levels of estrogen |
| (b) Osteoporosis | (ii) Low $\\text{Ca}^{++}$ ions in the blood |
| (c) Tetany | (iii) Accumulation of uric acid crystals |
| (d) Muscular dystrophy | (iv) Auto immune disorder |
| | (v) Genetic disorder |`,
    options: [
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)",
      "(a)-(iii), (b)-(i), (c)-(ii), (d)-(v)",
      "(a)-(iv), (b)-(v), (c)-(i), (d)-(ii)"
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: C**\n\n- Gout: Inflammation of joints due to accumulation of uric acid crystals (a-iii).\n- Osteoporosis: Age-related decrease in bone mass caused commonly by decreased levels of estrogen in elderly women (b-i).\n- Tetany: Wild muscle contractions due to low $\\text{Ca}^{++}$ in blood (c-ii).\n- Muscular dystrophy: Progressive degeneration of skeletal muscles, mostly a genetic disorder (d-v)."
  },
  23: {
    question: `Match the following columns and select the correct option.

| Column-I | Column-II |
| :--- | :--- |
| (a) Floating Ribs | (i) Located between second and seventh ribs |
| (b) Acromion | (ii) Head of the Humerus |
| (c) Scapula | (iii) Clavicle |
| (d) Glenoid cavity | (iv) Do not connect with the sternum |`,
    options: [
      "(A)-(ii), (B)-(iv), (C)-(i), (D)-(iii)",
      "(A)-(i), (B)-(iii), (C)-(ii), (D)-(iv)",
      "(A)-(iv), (B)-(iii), (C)-(i), (D)-(ii)",
      "(A)-(iii), (B)-(ii), (C)-(iv), (D)-(i)"
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: C**\n\n- Floating ribs (11th and 12th pairs): Not connected ventrally to the sternum (a-iv).\n- Acromion: Expanded process on spine of scapula articulating with clavicle (b-iii).\n- Scapula: Large triangular flat bone located between second and seventh ribs dorsally (c-i).\n- Glenoid cavity: Depression on scapula which articulates with head of the humerus (d-ii)."
  },
  24: {
    question: `Match the following joints with the bones involved:

| Joint | Bones Involved |
| :--- | :--- |
| (a) Gliding joint | (i) Between carpal and metacarpal of thumb |
| (b) Hinge joint | (ii) Between Atlas and Axis |
| (c) Pivot joint | (iii) Between the Carpals |
| (d) Saddle joint | (iv) Between Humerus and Ulna |

Select the correct option from the following:`,
    options: [
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)",
      "(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)"
    ],
    exam: "NEET 2019 (Odisha)",
    explanation: "**Correct Option: B**\n\n- Gliding joint: Between the carpals (a-iii).\n- Hinge joint: Between humerus and ulna (elbow joint) (b-iv).\n- Pivot joint: Between atlas and axis (c-ii).\n- Saddle joint: Between carpal and metacarpal of thumb (d-i)."
  },
  30: {
    question: `Out of 'X' pairs of ribs in humans only 'Y' pairs are true ribs. Select the option that correctly represents values of X and Y and provides their explanation.

| Option | Values | Explanation |
| :--- | :--- | :--- |
| (A) | $X=12, Y=5$ | True ribs are attached dorsally to vertebral column and sternum on the two ends |
| (B) | $X=24, Y=2$ | The true ribs are dorsally attached to vertebral column but are free on ventral side |
| (C) | $X=24, Y=12$ | True ribs are dorsally attached to vertebral column but are free on ventral side |
| (D) | $X=12, Y=7$ | True ribs are attached dorsally to vertebral column and ventrally to the sternum |`,
    options: [
      "$X=12, Y=5$: True ribs are attached dorsally to vertebral column and sternum on the two ends",
      "$X=24, Y=2$: The true ribs are dorsally attached to vertebral column but are free on ventral side",
      "$X=24, Y=12$: True ribs are dorsally attached to vertebral column but are free on ventral side",
      "$X=12, Y=7$: True ribs are attached dorsally to vertebral column and ventrally to the sternum"
    ],
    exam: "NEET 2017",
    explanation: "**Correct Option: D**\n\nThere are 12 pairs of ribs in humans ($X = 12$). The first 7 pairs ($1^{\\text{st}}$ to $7^{\\text{th}}$) are called true ribs ($Y = 7$) because they are attached dorsally to thoracic vertebrae and connected ventrally to the sternum via hyaline cartilages."
  },
  38: {
    question: `Select the correct matching of the type of the joint with the example in human skeletal system.

| Option | Type of joint | Example |
| :--- | :--- | :--- |
| (A) | Cartilaginous | Between frontal and parietal |
| (B) | Pivot joint | Between third and fourth cervical |
| (C) | Hinge joint | Between humerus and pectoral girdle |
| (D) | Gliding joint | Between carpals |`,
    options: [
      "Cartilaginous - Between frontal and parietal",
      "Pivot joint - Between third and fourth cervical",
      "Hinge joint - Between humerus and pectoral girdle",
      "Gliding joint - Between carpals"
    ],
    exam: "AIPMT 2014",
    explanation: "**Correct Option: D**\n\n- Gliding joint is found between the carpals (intercarpal joints).\n- Frontal and parietal bones are joined by fibrous joints (sutures).\n- Pivot joint is between atlas and axis (first and second cervical vertebrae).\n- Joint between humerus and pectoral girdle is a ball and socket joint."
  },
  44: {
    question: `The characteristic and an example of a synovial joint in humans is:

| Option | Characteristics | Examples |
| :--- | :--- | :--- |
| (A) | Fluid filled synovial cavity between two bones | Joint between atlas and axis |
| (B) | Lymph filled between two bones, limited movement | Gliding joint between carpals |
| (C) | Fluid cartilage between two bones, limited movements | Knee joint |
| (D) | Fluid filled between two joints, provides cushion | Skull bones |`,
    options: [
      "Fluid filled synovial cavity between two bones - Joint between atlas and axis",
      "Lymph filled between two bones, limited movement - Gliding joint between carpals",
      "Fluid cartilage between two bones, limited movements - Knee joint",
      "Fluid filled between two joints, provides cushion - Skull bones"
    ],
    exam: "NEET 2013",
    explanation: "**Correct Option: A**\n\nSynovial joints are characterized by the presence of a fluid-filled synovial cavity between the articulating surfaces of two bones, which allows considerable movement. An example is the pivot joint between atlas and axis."
  },
  49: {
    question: `Three of the following pairs of the human skeletal parts are correctly matched with their respective inclusive skeletal category and one pair is not matched. Identify the non-matching pair.

| Option | Pair of skeletal parts | Category |
| :--- | :--- | :--- |
| (A) | Sternum and ribs | Axial skeleton |
| (B) | Clavicle and glenoid | Pelvic girdle |
| (C) | Humerus and ulna | Appendicular skeleton |
| (D) | Malleus and stapes | Ear ossicles |`,
    options: [
      "Sternum and ribs - Axial skeleton",
      "Clavicle and glenoid - Pelvic girdle",
      "Humerus and ulna - Appendicular skeleton",
      "Malleus and stapes - Ear ossicles"
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: B**\n\nClavicle and glenoid cavity (on scapula) belong to the pectoral girdle (not pelvic girdle). Pelvic girdle consists of two coxal bones (ilium, ischium, and pubis)."
  },
  53: {
    question: `Which one of the following is the correct matching of three items and their grouping category?

| Option | Items | Group |
| :--- | :--- | :--- |
| (A) | Ilium, ischium, pubis | Coxal bones of pelvic girdle |
| (B) | Actin, myosin, rhodopsin | Muscle proteins |
| (C) | Cytosine, uracil, thiamine | Pyrimidines |
| (D) | Malleus, incus, cochlea | Ear ossicles |`,
    options: [
      "Ilium, ischium, pubis - Coxal bones of pelvic girdle",
      "Actin, myosin, rhodopsin - Muscle proteins",
      "Cytosine, uracil, thiamine - Pyrimidines",
      "Malleus, incus, cochlea - Ear ossicles"
    ],
    exam: "AIPMT 2009",
    explanation: "**Correct Option: A**\n\n- Each coxal bone of the pelvic girdle is formed by the fusion of three bones: ilium, ischium, and pubis.\n- Rhodopsin is a visual pigment of retina (not muscle protein).\n- Thiamine is vitamin B1 (thymine is pyrimidine).\n- Cochlea is part of internal ear (ear ossicles are malleus, incus, stapes)."
  },
  57: {
    question: "The contractile protein of skeletal muscle involving ATPase activity is",
    options: [
      "troponin",
      "tropomyosin",
      "myosin",
      "$\\alpha$-actinin"
    ],
    exam: "AIPMT 2006",
    explanation: "**Correct Option: C**\n\nEach myosin head functions as an active ATPase enzyme and has binding sites for ATP and active sites for actin. Troponin, tropomyosin, and $\\alpha$-actinin do not have ATPase catalytic activity."
  },
  59: {
    question: `Which of the following pairs is correctly matched?

| Option | Joint | Location |
| :--- | :--- | :--- |
| (A) | Hinge joint | Between vertebrae |
| (B) | Gliding joint | Between zygapophyses of the successive vertebrae |
| (C) | Cartilaginous joint | Skull bones |
| (D) | Fibrous joint | Between phalanges |`,
    options: [
      "Hinge joint - Between vertebrae",
      "Gliding joint - Between zygapophyses of the successive vertebrae",
      "Cartilaginous joint - Skull bones",
      "Fibrous joint - between phalanges"
    ],
    exam: "AIPMT 2005",
    explanation: "**Correct Option: B**\n\nThe articular processes (zygapophyses) of adjacent vertebrae form gliding joints (plane synovial joints) with each other."
  },
  78: {
    question: "Which statement is correct for muscle contraction?",
    options: [
      "Length of H-zone decreases",
      "Length of A-band remains constant",
      "Length of I-band increases",
      "Length of two Z-line increases"
    ],
    exam: "AIPMT 2001",
    explanation: "**Correct Options: A, B**\n\nDuring muscle contraction:\n- The actin filaments slide over myosin filaments toward the center of the sarcomere.\n- The 'I' band shortens.\n- The 'H' zone reduces / decreases and may disappear.\n- The 'A' band retains its length (remains constant).\n- The distance between two Z-lines decreases (sarcomere shortens).\nHence, both statements (A) and (B) are correct."
  }
};

function parseGeneralQuestion(qNum, qLines) {
  const cleaned = qLines.map(l => {
    let t = l.text.replace(/Open solution/g, '').trim();
    if (t.includes('Exam GOAL') || t.includes('Keep practising') || t.includes('Chapter-wise PYQs') || t.includes('NEET Biology:') || t.includes('MCQ (More than One Correct Answer)')) {
      return '';
    }
    return t;
  }).filter(t => t.length > 0);

  let exam = 'NEET / AIPMT';
  const firstLine = cleaned[0];
  const mExam = firstLine.match(/^Q\d+\.\s*(.+)$/);
  if (mExam && mExam[1].trim().length > 0) {
    exam = mExam[1].replace(/·\s*MCQ.*$/, '').trim();
  }

  const fullText = cleaned.slice(1).join('\n');
  const aIdx = fullText.search(/\(A\)/);
  if (aIdx === -1) {
    throw new Error(`Q${qNum} no (A) found`);
  }

  const qText = fullText.substring(0, aIdx).trim();
  const optText = fullText.substring(aIdx);

  const parts = optText.split(/\(([ABCD])\)/g);
  const opts = {};
  for (let i = 1; i < parts.length; i += 2) {
    opts[parts[i]] = parts[i+1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  }

  if (!opts['A'] || !opts['B'] || !opts['C'] || !opts['D']) {
    throw new Error(`Q${qNum} missing options: ${JSON.stringify(opts)}`);
  }

  return {
    question: qText,
    options: [opts['A'], opts['B'], opts['C'], opts['D']],
    exam
  };
}

let success = 0;
const errors = [];
for (let i = 0; i < qIndices.length; i++) {
  const qNum = qIndices[i].qNum;
  const start = qIndices[i].lineIdx;
  const end = (i + 1 < qIndices.length) ? qIndices[i+1].lineIdx : linesWithMeta.length;
  const qLines = linesWithMeta.slice(start, end);

  try {
    let qData;
    if (SPECIAL_QUESTIONS[qNum]) {
      qData = SPECIAL_QUESTIONS[qNum];
    } else {
      qData = parseGeneralQuestion(qNum, qLines);
    }

    const officialKey = officialKeys[String(qNum)];
    if (!officialKey) throw new Error(`Missing key for Q${qNum}`);

    if (!qData.question || qData.question.length < 5) throw new Error(`Q${qNum} question too short`);
    if (qData.options.length !== 4) throw new Error(`Q${qNum} not 4 options`);
    for (let optIdx = 0; optIdx < 4; optIdx++) {
      if (!qData.options[optIdx] || qData.options[optIdx].length === 0) {
        throw new Error(`Q${qNum} option ${optIdx} empty`);
      }
    }
    success++;
  } catch (err) {
    errors.push({ qNum, err: err.message });
  }
}

console.log(`Successfully parsed ${success}/78 questions.`);
if (errors.length > 0) {
  console.log('Errors:', errors);
}
