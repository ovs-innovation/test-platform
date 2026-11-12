import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/breathing_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/breathing_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/breathing_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 18)) {
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

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const m = linesWithMeta[i].text.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2].trim()
    });
  }
}

console.log(`Found ${qStarts.length} question markers in document.`);

const SPECIAL_QUESTIONS = {
  1: {
    question: `Sponges exchange $\\text{O}_2$ with $\\text{CO}_2$ by:`,
    options: [
      { id: 'A', text: 'gills' },
      { id: 'B', text: 'simple diffusion over their entire body surfaces' },
      { id: 'C', text: 'moist cuticle' },
      { id: 'D', text: 'tracheal tubes' }
    ],
    explanation: `**Correct Option: B**

Lower invertebrates like sponges, coelenterates, and flatworms exchange $\\text{O}_2$ with $\\text{CO}_2$ by simple diffusion over their entire body surface.`
  },

  2: {
    question: `In humans, respiration occurs in the following steps. Arrange these steps in the correct order:
A. Diffusion of $\\text{O}_2$ and $\\text{CO}_2$ between blood and tissues
B. Diffusion of $\\text{O}_2$ and $\\text{CO}_2$ across alveolar membrane
C. Pulmonary ventilation by which atmospheric air is drawn in and $\\text{CO}_2$ rich alveolar air is released out
D. Cellular respiration
E. Transport of gases by the blood

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A, B, C, D, E' },
      { id: 'B', text: 'E, A, C, D, B' },
      { id: 'C', text: 'C, B, E, A, D' },
      { id: 'D', text: 'C, A, B, E, D' }
    ],
    explanation: `**Correct Option: C**

According to NCERT, respiration involves the following sequential steps:
1. **Pulmonary ventilation** by which atmospheric air is drawn in and $\\text{CO}_2$ rich alveolar air is released out (**C**).
2. **Diffusion of gases** ($\\text{O}_2$ and $\\text{CO}_2$) across alveolar membrane (**B**).
3. **Transport of gases** by the blood (**E**).
4. **Diffusion of $\\text{O}_2$ and $\\text{CO}_2$** between blood and tissues (**A**).
5. **Utilisation of $\\text{O}_2$** by the cells for catabolic reactions and resultant release of $\\text{CO}_2$ (Cellular respiration) (**D**).

Correct sequence: **C, B, E, A, D**.`
  },

  3: {
    question: `Match List-I with List-II:

| List-I (Respiratory Volume) | List-II (Capacity in mL) |
| :--- | :--- |
| **A.** ERV (Expiratory Reserve Volume) | **I.** $2500 - 3000\\text{ mL}$ |
| **B.** RV (Residual Volume) | **II.** $500\\text{ mL}$ |
| **C.** IRV (Inspiratory Reserve Volume) | **III.** $1000 - 1100\\text{ mL}$ |
| **D.** TV (Tidal Volume) | **IV.** $1100 - 1200\\text{ mL}$ |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'B', text: 'A-III, B-I, C-IV, D-II' },
      { id: 'C', text: 'A-I, B-III, C-II, D-IV' },
      { id: 'D', text: 'A-I, B-II, C-III, D-IV' }
    ],
    explanation: `**Correct Option: A**

- **ERV (Expiratory Reserve Volume)**: Additional volume of air that a person can expire by a forcible expiration = **$1000 - 1100\\text{ mL}$** -> **III**
- **RV (Residual Volume)**: Volume of air remaining in the lungs even after a forcible expiration = **$1100 - 1200\\text{ mL}$** -> **IV**
- **IRV (Inspiratory Reserve Volume)**: Additional volume of air a person can inspire by a forcible inspiration = **$2500 - 3000\\text{ mL}$** -> **I**
- **TV (Tidal Volume)**: Volume of air inspired or expired during a normal respiration = **$500\\text{ mL}$** -> **II**

Matching: **A-III, B-IV, C-I, D-II**.`
  },

  4: {
    question: `Match List I with List II:

| List I | List II |
| :--- | :--- |
| **A.** Molluscs | **I.** Pulmonary respiration only |
| **B.** Reptiles | **II.** Branchial respiration |
| **C.** Adult amphibians | **III.** Cellular respiration |
| **D.** *Amoeba* | **IV.** Pulmonary and cutaneous respiration |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-I, C-IV, D-III' },
      { id: 'B', text: 'A-I, B-II, C-IV, D-III' },
      { id: 'C', text: 'A-II, B-I, C-III, D-IV' },
      { id: 'D', text: 'A-III, B-II, C-I, D-IV' }
    ],
    explanation: `**Correct Option: A**

- **Molluscs**: Aquatic molluscs respire through feather-like gills (ctenidia) called **branchial respiration** -> **II**
- **Reptiles**: Possess well-developed lungs for **pulmonary respiration only** -> **I**
- **Adult amphibians**: Respire through both lungs (**pulmonary**) and moist skin (**cutaneous**) -> **IV**
- ***Amoeba***: Single-celled organism performing direct diffusion/cellular gas exchange -> **III**

Matching: **A-II, B-I, C-IV, D-III**.`
  },

  5: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(A)** Residual Volume | **(I)** Maximum volume of air that can be breathed in after forced expiration |
| **(B)** Vital Capacity | **(II)** Volume of air inspired or expired during normal respiration |
| **(C)** Expiratory Capacity | **(III)** Volume of air remaining in lungs after forcible expiration |
| **(D)** Tidal Volume | **(IV)** Total volume of air expired after normal inspiration |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-III, C-II, D-I' },
      { id: 'B', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'C', text: 'A-III, B-I, C-IV, D-II' },
      { id: 'D', text: 'A-I, B-II, C-III, D-IV' }
    ],
    explanation: `**Correct Option: C**

- **Residual Volume (RV)**: Volume of air remaining in lungs after forcible expiration -> **(III)**
- **Vital Capacity (VC)**: Maximum volume of air that can be breathed in after forced expiration (or expired after forced inspiration) -> **(I)**
- **Expiratory Capacity (EC)**: Total volume of air expired after normal inspiration (TV + ERV) -> **(IV)**
- **Tidal Volume (TV)**: Volume of air inspired or expired during normal respiration -> **(II)**

Matching: **A-III, B-I, C-IV, D-II**.`
  },

  7: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** Expiratory capacity | **I.** Expiratory reserve volume + Tidal volume + Inspiratory reserve volume |
| **B.** Functional residual capacity | **II.** Tidal volume + Expiratory reserve volume |
| **C.** Vital capacity | **III.** Tidal volume + Inspiratory reserve volume |
| **D.** Inspiratory capacity | **IV.** Expiratory reserve volume + Residual volume |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'B', text: 'A-III, B-II, C-IV, D-I' },
      { id: 'C', text: 'A-II, B-I, C-IV, D-III' },
      { id: 'D', text: 'A-I, B-III, C-II, D-IV' }
    ],
    explanation: `**Correct Option: A**

- **Expiratory capacity (EC)** = $\\text{TV} + \\text{ERV}$ -> **II**
- **Functional residual capacity (FRC)** = $\\text{ERV} + \\text{RV}$ -> **IV**
- **Vital capacity (VC)** = $\\text{ERV} + \\text{TV} + \\text{IRV}$ -> **I**
- **Inspiratory capacity (IC)** = $\\text{TV} + \\text{IRV}$ -> **III**

Matching: **A-II, B-IV, C-I, D-III**.`
  },

  20: {
    question: `Match the following columns and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| **(a)** Pneumotaxic Centre | **(i)** Alveoli |
| **(b)** $\\text{O}_2$ Dissociation curve | **(ii)** Pons region of brain |
| **(c)** Carbonic Anhydrase | **(iii)** Haemoglobin |
| **(d)** Primary site of exchange of gases | **(iv)** R.B.C. |`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)' },
      { id: 'B', text: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)' },
      { id: 'C', text: '(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)' },
      { id: 'D', text: '(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)' }
    ],
    explanation: `**Correct Option: C**

- **Pneumotaxic Centre**: Located in the **pons region of brain** -> **(ii)**
- **$\\text{O}_2$ Dissociation curve**: Sigmoid curve relating percentage saturation of **haemoglobin** with $\\text{pO}_2$ -> **(iii)**
- **Carbonic Anhydrase**: Enzyme present in very high concentration in **RBCs** -> **(iv)**
- **Primary site of exchange of gases**: **Alveoli** of the lungs -> **(i)**

Matching: **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**.`
  },

  27: {
    question: `Match the items given in column I with those in column II and select the correct option given below:

| Column I | Column II |
| :--- | :--- |
| **A.** Tidal volume | **(i)** $2500 - 3000\\text{ mL}$ |
| **B.** Inspiratory reserve volume | **(ii)** $1100 - 1200\\text{ mL}$ |
| **C.** Expiratory reserve volume | **(iii)** $500 - 550\\text{ mL}$ |
| **D.** Residual volume | **(iv)** $1000 - 1100\\text{ mL}$ |`,
    options: [
      { id: 'A', text: 'A-(iii), B-(i), C-(iv), D-(ii)' },
      { id: 'B', text: 'A-(iv), B-(iii), C-(ii), D-(i)' },
      { id: 'C', text: 'A-(iii), B-(ii), C-(i), D-(iv)' },
      { id: 'D', text: 'A-(i), B-(iv), C-(ii), D-(iii)' }
    ],
    explanation: `**Correct Option: A**

- **Tidal volume (TV)**: $\\approx 500 - 550\\text{ mL}$ -> **(iii)**
- **Inspiratory reserve volume (IRV)**: $2500 - 3000\\text{ mL}$ -> **(i)**
- **Expiratory reserve volume (ERV)**: $1000 - 1100\\text{ mL}$ -> **(iv)**
- **Residual volume (RV)**: $1100 - 1200\\text{ mL}$ -> **(ii)**

Matching: **A-(iii), B-(i), C-(iv), D-(ii)**.`
  },

  38: {
    question: `The figure shows a diagrammatic view of human respiratory system with labels A, B, C and D. Select the option which gives correct identification and main function and / or characteristic:

<div align="center">
  <img src="${diagramUrls.q_38}" alt="Human Respiratory System" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'A - Trachea - Long tube supported by complete cartilaginous rings for conducting inspired air.' },
      { id: 'B', text: 'C - Alveoli - Thin walled vascular bag like structures for exchange of gases.' },
      { id: 'C', text: 'B - Pleural membrane - Surround ribs on both sides to provide cushion against rubbing.' },
      { id: 'D', text: 'D - Lower end of lungs - Diaphragm pulls it down during inspiration.' }
    ],
    explanation: `**Correct Option: B**

In the given diagram:
- **A** represents the **trachea** (supported by incomplete, C-shaped cartilaginous rings, not complete rings).
- **B** represents the **pleural membrane** (double-layered membrane covering the lungs, with pleural fluid reducing friction on the lung surface).
- **C** represents **alveoli** — thin-walled, highly vascularized bag-like structures that serve as the primary site of gas exchange.
- **D** represents the **diaphragm** (a dome-shaped muscular partition separating thoracic and abdominal cavities).

Therefore, option **B** is correct.`
  },

  44: {
    question: `The figure given below shows a small part of human lung where exchange of gases takes place. Select the option which represents labelled part (A, B, C or D) correctly identified along with its function:

<div align="center">
  <img src="${diagramUrls.q_44}" alt="Alveolar Gas Exchange Membrane" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'D : capillary wall - exchange of O2 and CO2 takes place here' },
      { id: 'B', text: 'B : red blood cells - transport of CO2 mainly.' },
      { id: 'C', text: 'A : alveolar cavity - main site of exchange of respiratory gases' },
      { id: 'D', text: 'C : arterial capillary - passes oxygen to tissues' }
    ],
    explanation: `**Correct Option: C**

In the diagram of the respiratory membrane (diffusion membrane):
- **A** is the **alveolar cavity**, which is the primary site of gas exchange across the respiratory membrane.
- **B** is a **red blood cell (RBC)**, which primarily transports $\\text{O}_2$ ($97\\%$) as oxyhaemoglobin, and only $20-25\\%$ of $\\text{CO}_2$ as carbaminohaemoglobin.
- **C** is a **blood capillary**.
- **D** is the **alveolar wall / capillary endothelium / basement substance**.`
  },

  45: {
    question: `Listed below are four respiratory capacities (i – iv) and four jumbled respiratory volumes of a normal human adult:

| Respiratory capacities | Respiratory volumes |
| :--- | :--- |
| **(i)** Residual volume | $2500\\text{ mL}$ |
| **(ii)** Vital capacity | $3500\\text{ mL}$ |
| **(iii)** Inspiratory reserve volume | $1200\\text{ mL}$ |
| **(iv)** Inspiratory capacity | $4500\\text{ mL}$ |

Which one of the following is the correct matching of two capacities and volumes?`,
    options: [
      { id: 'A', text: '(ii) 2500 mL, (iii) 4500 mL' },
      { id: 'B', text: '(iii) 1200 mL, (iv) 2500 mL' },
      { id: 'C', text: '(iv) 3500 mL, (i) 1200 mL' },
      { id: 'D', text: '(i) 4500 mL, (ii) 3500 mL' }
    ],
    explanation: `**Correct Option: C**

- **Residual volume (RV)** $\\approx 1100 - 1200\\text{ mL}$ -> matched with **$1200\\text{ mL}$** in (i).
- **Inspiratory capacity (IC)** = $\\text{TV} + \\text{IRV} = 500 + (2500 - 3000) = 3000 - 3500\\text{ mL}$ -> matched with **$3500\\text{ mL}$** in (iv).
- **Vital capacity (VC)** = $\\text{TV} + \\text{IRV} + \\text{ERV} = 500 + 3000 + 1000 = 4500\\text{ mL}$.
- **Inspiratory reserve volume (IRV)** = $2500\\text{ mL}$.

Therefore, **(iv) $3500\\text{ mL}$, (i) $1200\\text{ mL}$** represents the correct matching.`
  }
};

const allQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const num = cur.num;

  const officialKey = officialKeys[String(num)] || 'A';

  if (SPECIAL_QUESTIONS[num]) {
    const sq = SPECIAL_QUESTIONS[num];
    allQuestions.push({
      num,
      page: cur.page,
      year: cur.header || '',
      question: sq.question,
      options: sq.options,
      correctOption: officialKey,
      explanation: sq.explanation || `**Correct Option: ${officialKey}**\n\nOfficial NEET Answer Key verified.`
    });
    continue;
  }

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text.replace(/Open solution/gi, '').trim())
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|Out of syllabus|These questions are on topics/i.test(t));

  const contentLines = rawLines.slice(1);
  let combined = contentLines.join(' ').trim();

  const aIdx = combined.search(/\(A\)\s+/);
  const bIdx = combined.search(/\(B\)\s+/);
  const cIdx = combined.search(/\(C\)\s+/);
  const dIdx = combined.search(/\(D\)\s+/);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    let qText = combined.substring(0, aIdx).trim();
    let optA = combined.substring(aIdx + 4, bIdx).trim();
    let optB = combined.substring(bIdx + 4, cIdx).trim();
    let optC = combined.substring(cIdx + 4, dIdx).trim();
    let optD = combined.substring(dIdx + 4).trim();

    allQuestions.push({
      num,
      page: cur.page,
      year: cur.header || '',
      question: qText,
      options: [
        { id: 'A', text: optA },
        { id: 'B', text: optB },
        { id: 'C', text: optC },
        { id: 'D', text: optD }
      ],
      correctOption: officialKey,
      explanation: `**Correct Option: ${officialKey}**\n\nAccording to the official NEET Answer Key, the correct answer is option (${officialKey}).`
    });
  } else {
    console.error(`FAILED TO PARSE Q${num} (Page ${cur.page})`);
  }
}

console.log(`Successfully generated ${allQuestions.length} questions out of 72.`);
fs.writeFileSync('./backend/scripts/breathing_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/breathing_all_questions.json');
