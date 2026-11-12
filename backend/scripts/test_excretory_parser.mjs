import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/excretory_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/excretory_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/excretory_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 19)) {
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
  1: {
    question: `Which of the following statements about the reabsorption process in Henle's loop are correct?
(a) The descending limb of Henle's loop is permeable to water but almost impermeable to electrolytes.
(b) Urine gets concentrated in Henle's loop.
(c) Reabsorption of $\\text{Na}^+$ and water takes place in Henle's loop.
(d) Active or passive transport of electrolytes occurs in the ascending limb of Henle's loop.

Choose the correct answer from the options given below:`,
    options: [
      "(a), (b) and (d) only",
      "(a) and (b) only",
      "(b), (c) and (d) only",
      "(a), (b) and (c) only"
    ],
    exam: "RE-NEET 2026",
    explanation: "**Correct Option: A**\n\n- (a) is correct: The descending limb of loop of Henle is permeable to water but almost impermeable to electrolytes.\n- (b) is correct: As filtrate flows down the descending limb, water moves out, concentrating the filtrate.\n- (c) is incorrect: In Henle's loop, water is reabsorbed in the descending limb and $\\text{Na}^+$ (electrolytes) in the ascending limb, but reabsorption of water does NOT occur in the ascending limb, and electrolytes are not reabsorbed in descending limb.\n- (d) is correct: The ascending limb allows transport of electrolytes actively or passively into medullary interstitium.\nHence, statements (a), (b) and (d) only are correct."
  },
  2: {
    question: `Arrange the following events occuring in Renin-Angiotensin mechanism in the correct order:
A. Increase in blood pressure and Glomerular filtration rate
B. Reabsorption of $\\text{Na}^+$ and water from distal parts of tubule due to Aldosterone
C. Fall in Glomerular filtration rate
D. Vasoconstriction by Angiotensin II and release of Aldosterone.
E. Renin converts Angiotensinogen into Angiotensin I, followed by Angiotensin II.

Choose the correct answer from the options given below:`,
    options: [
      "A, C, E, B, D",
      "C, A, B, D, E",
      "A, D, B, E, C",
      "C, E, D, B, A"
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: D**\n\nThe correct sequence of the Renin-Angiotensin-Aldosterone System (RAAS) is:\n1. (C) A fall in GFR / glomerular blood flow / blood pressure activates JG cells.\n2. (E) JG cells release renin which converts angiotensinogen to angiotensin I and subsequently to angiotensin II.\n3. (D) Angiotensin II, a powerful vasoconstrictor, activates adrenal cortex to release aldosterone.\n4. (B) Aldosterone causes reabsorption of $\\text{Na}^+$ and water from distal parts of tubule.\n5. (A) This leads to an increase in blood pressure and GFR.\nHence: C, E, D, B, A."
  },
  4: {
    question: "Which of the following diagrams is correct with regard to the proximal ($P$) and distal ($D$) tubule of the Nephron?",
    options: [
      `Diagram (A): <img src="${diagramUrls['q_4_a']}" alt="Option A diagram" style="max-height:120px;" />`,
      `Diagram (B): <img src="${diagramUrls['q_4_b']}" alt="Option B diagram" style="max-height:120px;" />`,
      `Diagram (C): <img src="${diagramUrls['q_4_c']}" alt="Option C diagram" style="max-height:120px;" />`,
      `Diagram (D): <img src="${diagramUrls['q_4_d']}" alt="Option D diagram" style="max-height:120px;" />`
    ],
    exam: "NEET 2025",
    diagramUrl: diagramUrls['q_4'],
    explanation: "**Correct Option: D**\n\nAccording to NCERT (Fig. 19.5):\n- Proximal Convoluted Tubule (PCT): Reabsorbs $\\text{HCO}_3^-$, $\\text{NaCl}$, and $\\text{H}_2\\text{O}$ into surrounding peritubular capillaries; selectively secretes $\\text{H}^+$ and $\\text{NH}_3$ into the filtrate.\n- Distal Convoluted Tubule (DCT): Reabsorbs $\\text{NaCl}$, $\\text{H}_2\\text{O}$, and $\\text{HCO}_3^-$; selectively secretes $\\text{K}^+$ and $\\text{H}^+$ into the tubular lumen to maintain pH and ionic balance.\nThis matches Diagram (D)."
  },
  9: {
    question: `Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R)
Assertion (A) : Ascending limb of loop of Henle is impermeable to water and allows transport of electrolytes actively or passively.
Reason (R) : Dilution of filtrate takes place due to efflux of electrolytes in the medullary fluid.

In the light of the above statements, choose the correct answer from the options given below :`,
    options: [
      "(A) is true but (R) is false",
      "(A) is false but (R) is true",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true and (R) is not the correct explanation of (A)"
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: C**\n\n- Assertion (A) is true: The ascending limb of loop of Henle is impermeable to water and allows transport of electrolytes actively or passively.\n- Reason (R) is true: As the concentrated filtrate passes upward through the ascending limb, dilution of filtrate occurs due to the efflux of electrolytes into the medullary interstitium.\n- Reason (R) correctly explains Assertion (A)."
  },
  10: {
    question: `Arrange the events of Renin - Angiotensin mechanism in correct sequence.
(A) Activation of JG cells and release of renin.
(B) Angiotensin II activates release of aldosterone.
(C) Fall in glomerular blood pressure.
(D) Reabsorption of $\\text{Na}^+$ and water from distal convoluted tubule.
(E) Angiotensinogen is converted to Angiotensin I and then to Angiotensin II.

Choose the correct answer from the options given below :`,
    options: [
      "(C), (A), (E), (B), (D)",
      "(A), (D), (E), (C), (B)",
      "(A), (D), (C), (B), (E)",
      "(B), (A), (E), (D), (C)"
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: A**\n\nCorrect sequence:\n1. (C) Fall in glomerular blood pressure / GFR\n2. (A) Activation of JG cells and release of renin\n3. (E) Angiotensinogen is converted to Angiotensin I and then to Angiotensin II\n4. (B) Angiotensin II activates release of aldosterone\n5. (D) Reabsorption of $\\text{Na}^+$ and water from distal convoluted tubule\nHence, (C), (A), (E), (B), (D)."
  },
  12: {
    question: `Match List I with List II.

| List I | List II |
| :--- | :--- |
| (A) Taenia | (I) Nephridia |
| (B) Paramoecium | (II) Contractile vacuole |
| (C) Periplaneta | (III) Flame cells |
| (D) Pheretima | (IV) Urecose gland |

Choose the correct answer from the options given below :`,
    options: [
      "A-I, B-II, C-IV, D-III",
      "A-III, B-II, C-IV, D-I",
      "A-II, B-I, C-IV, D-III",
      "A-I, B-II, C-III, D-IV"
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: B**\n\n- Taenia (Platyhelminthes): Flame cells / protonephridia (A-III)\n- Paramoecium (Protozoa): Contractile vacuole for osmoregulation (B-II)\n- Periplaneta (Cockroach): Urecose glands / Malpighian tubules (C-IV)\n- Pheretima (Earthworm): Nephridia (D-I)"
  },
  16: {
    question: `The increase in osmolarity from outer to inner medullary interstitium is maintained due to :
(i) Close proximity between Henle's loop and vasa recta
(ii) Counter current mechanism
(iii) Selective secretion of $\\text{HCO}_3^-$ and hydrogen ions in PCT
(iv) Higher blood pressure in glomerular capillaries`,
    options: [
      "(i) and (ii)",
      "Only (ii)",
      "(iii) and (iv)",
      "(i), (ii) and (iii)"
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: A**\n\nThe proximity between the Henle's loop and vasa recta, as well as the counter current in them, help in maintaining an increasing osmolarity towards the inner medullary interstitium (from 300 mOsmol/L in cortex to about 1200 mOsmol/L in inner medulla). Hence, statements (i) and (ii) are correct."
  },
  19: {
    question: "Which of the following would help in prevention of diuresis?",
    options: [
      "Decrease in secretion of renin by JG cells",
      "More water reabsorption due to undersecretion of ADH",
      "Reabsorption of $\\text{Na}^+$ and water from renal tubules due to aldosterone",
      "Atrial natriuretic factor causes vasoconstriction"
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: C**\n\nAldosterone acts mainly at the renal tubules and stimulates the reabsorption of $\\text{Na}^+$ and water, and excretion of $\\text{K}^+$ and phosphate ions. This conserves water in the body and prevents diuresis."
  },
  20: {
    question: `Match the following parts of a nephron with their function:

| Part of Nephron | Function |
| :--- | :--- |
| (a) Descending limb of Henle's loop | (i) Reabsorption of salts only |
| (b) Proximal convoluted tubule | (ii) Reabsorption of water only |
| (c) Ascending limb of Henle's loop | (iii) Conditional reabsorption of sodium ions and water |
| (d) Distal convoluted tubule | (iv) Reabsorption of ions, water and organic nutrients |

Select the correct option from the following:`,
    options: [
      "(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)",
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(i), (b)-(iv), (c)-(ii), (d)-(iii)"
    ],
    exam: "NEET 2019 (Odisha)",
    explanation: "**Correct Option: C**\n\n- (a) Descending limb of Henle's loop: Permeable to water but impermeable to electrolytes, so reabsorption of water only occurs here (a-ii).\n- (b) Proximal convoluted tubule (PCT): Reabsorbs nearly 70-80% of electrolytes, water, and essential organic nutrients (b-iv).\n- (c) Ascending limb of Henle's loop: Impermeable to water, permeable to electrolytes (reabsorption of salts only) (c-i).\n- (d) Distal convoluted tubule (DCT): Conditional reabsorption of $\\text{Na}^+$ and water (d-iii)."
  },
  21: {
    question: `Match the items in Column-I with those in Column-II :

| Column-I | Column-II |
| :--- | :--- |
| (a) Podocytes | (i) Crystallised oxalates |
| (b) Protonephridia | (ii) Annelids |
| (c) Nephridia | (iii) Amphioxus |
| (d) Renal calculi | (iv) Filtration slits |

Select the correct option from the following:`,
    options: [
      "(a)-(iv), (b)-(ii), (c)-(iii), (d)-(i)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)",
      "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)"
    ],
    exam: "NEET 2019 (Odisha)",
    explanation: "**Correct Option: D**\n\n- Podocytes: Epithelial cells of Bowman's capsule arranged in an intricate manner leaving minute spaces called filtration slits or slit pores (a-iv).\n- Protonephridia: Excretory structures in cephalochordates like Amphioxus (b-iii).\n- Nephridia: Tubular excretory structures in annelids like earthworm (c-ii).\n- Renal calculi: Insoluble mass of crystallised salts (oxalates, etc.) formed within kidney (d-i)."
  },
  24: {
    question: `Match the items given in column I with those in column II and select the correct option given below.

| Column I | Column II |
| :--- | :--- |
| A. Glycosuria | (i) Accumulation of uric acid in joints |
| B. Gout | (ii) Mass of crystallised salts within the kidney |
| C. Renal calculi | (iii) Inflammation in glomeruli |
| D. Glomerular nephritis | (iv) Presence of glucose in urine |`,
    options: [
      "A-(iv), B-(i), C-(ii), D-(iii)",
      "A-(ii), B-(iii), C-(i), D-(iv)",
      "A-(iii), B-(ii), C-(iv), D-(i)",
      "A-(i), B-(ii), C-(iii), D-(iv)"
    ],
    exam: "NEET 2018",
    explanation: "**Correct Option: A**\n\n- Glycosuria: Presence of glucose in urine, indicative of diabetes mellitus (A-iv).\n- Gout: Inflammation of joints due to accumulation of uric acid crystals (B-i).\n- Renal calculi: Stone or insoluble mass of crystallised salts formed within the kidney (C-ii).\n- Glomerulonephritis: Inflammation of glomeruli of kidney (D-iii)."
  },
  25: {
    question: `Match the items given in column I with those in column II and select the correct option given below.

| Column I (Function) | Column II (Part of excretory system) |
| :--- | :--- |
| A. Ultrafiltration | (i) Henle’s loop |
| B. Concentration of urine | (ii) Ureter |
| C. Transport of urine | (iii) Urinary bladder |
| D. Storage of urine | (iv) Malpighian corpuscle |
| | (v) Proximal convoluted tubule |`,
    options: [
      "A-(iv), B-(i), C-(ii), D-(iii)",
      "A-(iv), B-(v), C-(ii), D-(iii)",
      "A-(v), B-(iv), C-(i), D-(iii)",
      "A-(v), B-(iv), C-(i), D-(ii)"
    ],
    exam: "NEET 2018",
    explanation: "**Correct Option: A**\n\n- Ultrafiltration: Malpighian corpuscle (glomerulus + Bowman's capsule) (A-iv).\n- Concentration of urine: Henle's loop and vasa recta (counter-current system) (B-i).\n- Transport of urine: Ureter (conducts urine from pelvis to urinary bladder) (C-ii).\n- Storage of urine: Urinary bladder (D-iii)."
  },
  34: {
    question: "Select the option which shows correct matching of animal with its excretory organ and excretory product.",
    options: [
      "Animal: Labeo (Rohu) | Excretory organ: Nephridial tubes | Excretory product: Ammonia",
      "Animal: Salamander | Excretory organ: Kidneys | Excretory product: Urea",
      "Animal: Peacock | Excretory organ: Kidneys | Excretory product: Urea",
      "Animal: Housefly | Excretory organ: Renal tubules | Excretory product: Uric acid"
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: B**\n\n- Salamander (Amphibian): Excretes urea (ureotelic) through mesonephric kidneys.\n- Labeo (Bony fish): Excretes ammonia (ammonotelic) mainly through gills, not nephridial tubes.\n- Peacock (Bird): Excretes uric acid (uricotelic), not urea.\n- Housefly (Insect): Excretes uric acid via Malpighian tubules, not renal tubules."
  },
  35: {
    question: "Figure shows human urinary system with structures labelled A to D. Select option which correctly identifies them and gives their characteristic and/or functions.",
    options: [
      "A - Adrenal gland - located at the anterior part of kidney. Secrete catecholamines which stimulate glycogen breakdown.",
      "C - Medulla - inner zone of kidney and contains complete nephrons.",
      "B - Pelvis - broad funnel shaped space inner to hilum, directly connected to loops of Henle.",
      "D - Cortex - outer part of kidney and do not contain any part of nephrons."
    ],
    exam: "NEET 2013",
    diagramUrl: diagramUrls['q_35'],
    explanation: "**Correct Option: A**\n\nIn the given figure of the human urinary system:\n- A represents the adrenal gland, situated at the superior/anterior pole of each kidney; its medulla secretes catecholamines (adrenaline and noradrenaline) which stimulate glycogen breakdown.\n- B represents the renal pelvis (funnel-shaped cavity).\n- C represents renal medulla (medullary pyramids).\n- D represents the renal cortex, which contains Malpighian corpuscles, PCT, and DCT."
  },
  36: {
    question: `Which one of the following options gives the correct categorization of six animals according to the type of nitrogenous waste they give out?

| Option | Ammonotelic | Ureotelic | Uricotelic |
| :--- | :--- | :--- | :--- |
| (A) | Pigeon, Humans | Aquatic amphibia, lizards | Cockroach, frog |
| (B) | Frog, lizards | Aquatic amphibia, humans | Cockroach, pigeon |
| (C) | Aquatic amphibia | Frog, humans | Pigeon, lizards, Cockroach |
| (D) | Aquatic amphibia | Cockroach, humans | Frog, pigeon, lizards |`,
    options: [
      "Ammonotelic: Pigeon, Humans; Ureotelic: Aquatic amphibia, lizards; Uricotelic: Cockroach, frog",
      "Ammonotelic: Frog, lizards; Ureotelic: Aquatic amphibia, humans; Uricotelic: Cockroach, pigeon",
      "Ammonotelic: Aquatic amphibia; Ureotelic: Frog, humans; Uricotelic: Pigeon, lizards, Cockroach",
      "Ammonotelic: Aquatic amphibia; Ureotelic: Cockroach, humans; Uricotelic: Frog, pigeon, lizards"
    ],
    exam: "AIPMT 2012 Mains",
    explanation: "**Correct Option: C**\n\n- Ammonotelic: Aquatic amphibians (tadpoles/adults in water), bony fishes, and aquatic insects.\n- Ureotelic: Terrestrial amphibians (adult frog) and mammals (humans).\n- Uricotelic: Reptiles (lizards), birds (pigeon), and terrestrial insects (cockroach)."
  },
  41: {
    question: "Which one of the following correctly explains the function of a specific part of the human nephron?",
    options: [
      "Podocytes : create minute spaces (slit pores) for the filtration of blood into the Bowman's capsule",
      "Henle's loop : most reabsorption of the major substances from the glomerular filtrate",
      "Distal convoluted tubule : reabsorption of $\\text{K}^+$ ions into the surrounding blood capillaries",
      "Afferent arteriole : carries the blood away from the glomerulus towards renal vein."
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: A**\n\nThe epithelial cells of Bowman's capsule, called podocytes, are arranged in an intricate manner so as to leave some minute spaces called filtration slits or slit pores through which blood is filtered into the lumen of Bowman's capsule."
  },
  43: {
    question: "Which one of the following statements in regard to the excretion by the human kidneys is correct?",
    options: [
      "Descending limb of loop of Henle is impermeable to water.",
      "Distal convoluted tubule is incapable of reabsorbing $\\text{HCO}_3^-$",
      "Nearly 99 per cent of the glomerular filtrate is reabsorbed by the renal tubules.",
      "Ascending limb of loop of Henle is impermeable to electrolytes."
    ],
    exam: "AIPMT 2010 Prelims",
    explanation: "**Correct Option: C**\n\nA comparison of the volume of the filtrate formed per day (180 litres per day) with that of the urine released (1.5 litres) suggests that nearly 99 percent of the filtrate has to be reabsorbed by the renal tubules."
  },
  49: {
    question: "In ornithine cycle, which of the following wastes are removed from the blood?",
    options: [
      "$\\text{CO}_2$ and urea",
      "Ammonia and urea",
      "$\\text{CO}_2$ and ammonia",
      "Urea and urine"
    ],
    exam: "AIPMT 2005",
    explanation: "**Correct Option: C**\n\nIn the liver, the ornithine cycle (urea cycle) converts toxic ammonia and $\\text{CO}_2$ into urea ($2\\text{NH}_3 + \\text{CO}_2 \\rightarrow \\text{NH}_2\\text{CONH}_2 + \\text{H}_2\\text{O}$), removing $\\text{CO}_2$ and ammonia from the blood."
  },
  61: {
    question: "The ornithine cycle removes two waste products from the blood in liver. These products are",
    options: [
      "$\\text{CO}_2$ and ammonia",
      "ammonia and uric acid",
      "$\\text{CO}_2$ and urea",
      "ammonia and urea"
    ],
    exam: "AIPMT 1996",
    explanation: "**Correct Option: A**\n\nThe ornithine cycle removes ammonia and $\\text{CO}_2$ from blood in the liver by converting them into less toxic urea."
  }
};

function parseGeneralQuestion(qNum, qLines) {
  const cleaned = qLines.map(l => {
    let t = l.text.replace(/Open solution/g, '').trim();
    if (t.includes('Exam GOAL') || t.includes('Keep practising') || t.includes('Chapter-wise PYQs') || t.includes('NEET Biology:') || t.includes('Out of syllabus') || t.includes('These questions are on topics')) {
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

console.log(`Successfully parsed ${success}/72 questions.`);
if (errors.length > 0) {
  console.log('Errors:', errors);
}
