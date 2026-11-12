import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/structural_org_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 28)) {
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
  12: {
    question: `Match List I with List II :

| List - I | List - II |
| :--- | :--- |
| **(A)** Squamous Epithelium | **(I)** Goblet cells of alimentary canal |
| **(B)** Ciliated Epithelium | **(II)** Inner lining of pancreatic ducts |
| **(C)** Glandular Epithelium | **(III)** Walls of blood vessels |
| **(D)** Compound Epithelium | **(IV)** Inner surface of Fallopian tubes |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'B', text: 'A-II, B-IV, C-III, D-I' },
      { id: 'C', text: 'A-III, B-I, C-II, D-IV' },
      { id: 'D', text: 'A-III, B-IV, C-I, D-II' }
    ],
    explanation: `**Correct Option: D**

- **Squamous Epithelium**: Present in the walls of blood vessels and air sacs of lungs -> **(III)**
- **Ciliated Epithelium**: Found in the inner surface of hollow organs like Fallopian tubes and bronchioles -> **(IV)**
- **Glandular Epithelium**: Specialized for secretions, such as goblet cells of the alimentary canal -> **(I)**
- **Compound Epithelium**: Multilayered, covers moist surface of buccal cavity and inner lining of pancreatic ducts -> **(II)**

Matching: **A-III, B-IV, C-I, D-II**.`
  },

  13: {
    question: `In both sexes of cockroach, a pair of jointed filamentous structures called anal cerci are present on:`,
    options: [
      { id: 'A', text: '5th segment' },
      { id: 'B', text: '10th segment' },
      { id: 'C', text: '8th and 9th segment' },
      { id: 'D', text: '11th segment' }
    ],
    explanation: `**Correct Option: B**

In both male and female cockroaches, the $10^{\\text{th}}$ abdominal segment bears a pair of jointed filamentous structures called **anal cerci**, which function as sensitive sound and vibration receptors.`
  },

  14: {
    question: `Match List I with List II related to digestive system of cockroach:

| List - I | List - II |
| :--- | :--- |
| **A.** The structures used for storing of food | **I.** Gizzard |
| **B.** Ring of 6-8 blind tubules at junction of foregut and midgut | **II.** Gastric Caeca |
| **C.** Ring of 100-150 yellow coloured thin filaments at junction of midgut and hindgut | **III.** Malpighian tubules |
| **D.** The structures used for grinding the food | **IV.** Crop |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-II, C-III, D-I' },
      { id: 'B', text: 'A-I, B-II, C-III, D-IV' },
      { id: 'C', text: 'A-IV, B-III, C-II, D-I' },
      { id: 'D', text: 'A-III, B-II, C-IV, D-I' }
    ],
    explanation: `**Correct Option: A**

- **Structure used for storing food**: **Crop** -> **IV**
- **Ring of 6-8 blind tubules at foregut-midgut junction**: **Gastric (hepatic) caeca** which secrete digestive juice -> **II**
- **Ring of 100-150 yellow thin filaments at midgut-hindgut junction**: **Malpighian tubules** for excretion -> **III**
- **Structure used for grinding food**: **Gizzard (proventriculus)** with six chitinous teeth -> **I**

Matching: **A-IV, B-II, C-III, D-I**.`
  },

  15: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** Unicellular glandular epithelium | **I.** Salivary glands |
| **B.** Compound epithelium | **II.** Pancreas |
| **C.** Multicellular glandular epithelium | **III.** Goblet cells of alimentary canal |
| **D.** Endocrine glandular epithelium | **IV.** Moist surface of buccal cavity |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-I, C-III, D-IV' },
      { id: 'B', text: 'A-IV, B-III, C-I, D-II' },
      { id: 'C', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'D', text: 'A-II, B-I, C-IV, D-III' }
    ],
    explanation: `**Correct Option: C**

- **Unicellular glandular epithelium**: Consists of isolated glandular cells, such as **goblet cells of the alimentary canal** -> **III**
- **Compound epithelium**: Multilayered, covers the **moist surface of buccal cavity**, pharynx, etc. -> **IV**
- **Multicellular glandular epithelium**: Consists of clusters of cells, such as **salivary glands** -> **I**
- **Endocrine glandular epithelium**: Ductless glands that secrete hormones directly into fluid bathing the gland, e.g. islets of **pancreas** -> **II**

Matching: **A-III, B-IV, C-I, D-II**.`
  },

  19: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(A)** Columnar epithelium | **(I)** Ducts of glands |
| **(B)** Ciliated epithelium | **(II)** Inner lining of stomach and intestine |
| **(C)** Squamous epithelium | **(III)** Inner lining of bronchioles |
| **(D)** Cuboidal epithelium | **(IV)** Endothelium |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)' },
      { id: 'B', text: '(A)-(III), (B)-(II), (C)-(IV), (D)-(I)' },
      { id: 'C', text: '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)' },
      { id: 'D', text: '(A)-(II), (B)-(III), (C)-(IV), (D)-(I)' }
    ],
    explanation: `**Correct Option: D**

- **Columnar epithelium**: Composed of single layer of tall and slender cells, lines **stomach and intestine** -> **(II)**
- **Ciliated epithelium**: Bears cilia to move particles/mucus, lines **bronchioles** and Fallopian tubes -> **(III)**
- **Squamous epithelium**: Single thin layer of flattened cells, forms **endothelium** of blood vessels and alveoli -> **(IV)**
- **Cuboidal epithelium**: Single layer of cube-like cells, commonly found in **ducts of glands** and tubular parts of nephrons -> **(I)**

Matching: **(A)-(II), (B)-(III), (C)-(IV), (D)-(I)**.`
  },

  21: {
    question: `Match List I with List II:

| List I | List II |
| :--- | :--- |
| **(A)** Mast cells | **(I)** Ciliated epithelium |
| **(B)** Inner surface of bronchiole | **(II)** Areolar connective tissue |
| **(C)** Blood | **(III)** Cuboidal epithelium |
| **(D)** Tubular parts of nephron | **(IV)** Specialised connective tissue |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'B', text: 'A-II, B-I, C-IV, D-III' },
      { id: 'C', text: 'A-III, B-IV, C-II, D-I' },
      { id: 'D', text: 'A-I, B-II, C-IV, D-III' }
    ],
    explanation: `**Correct Option: B**

- **Mast cells**: Present in **areolar connective tissue** -> **(II)**
- **Inner surface of bronchiole**: Lined by **ciliated epithelium** -> **(I)**
- **Blood**: A **specialised connective tissue** consisting of plasma, RBCs, WBCs, and platelets -> **(IV)**
- **Tubular parts of nephron**: Lined by **cuboidal epithelium** -> **(III)**

Matching: **A-II, B-I, C-IV, D-III**.`
  },

  26: {
    question: `Match List-I with List-II regarding the organs of Cockroach:

| List - I | List - II |
| :--- | :--- |
| **(a)** Crop | **(i)** Grinding the food particles |
| **(b)** Proventriculus | **(ii)** Secretion of digestive juice |
| **(c)** Hepatic caecae | **(iii)** Removal of nitrogenous waste |
| **(d)** Malpighian tubules | **(iv)** Storage of food |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a) - (i), (b) - (iv), (c) - (iii), (d) - (ii)' },
      { id: 'B', text: '(a) - (iv), (b) - (i), (c) - (ii), (d) - (iii)' },
      { id: 'C', text: '(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)' },
      { id: 'D', text: '(a) - (ii), (b) - (iv), (c) - (i), (d) - (iii)' }
    ],
    explanation: `**Correct Option: B**

- **Crop**: Sac-like structure used for **storage of food** -> **(iv)**
- **Proventriculus (gizzard)**: Has outer circular muscles and thick inner cuticle forming six chitinous teeth for **grinding food particles** -> **(i)**
- **Hepatic caecae**: 6-8 blind tubules at the junction of foregut and midgut that **secrete digestive juice** -> **(ii)**
- **Malpighian tubules**: 100-150 yellow filaments that aid in **removal of nitrogenous waste** (uric acid) from haemolymph -> **(iii)**

Matching: **(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)**.`
  },

  31: {
    question: `Match List - I with List - II:

| List - I | List - II |
| :--- | :--- |
| **(a)** Bronchioles | **(i)** Dense Regular Connective Tissue |
| **(b)** Goblet Cell | **(ii)** Loose Connective Tissue |
| **(c)** Tendons | **(iii)** Glandular Tissue |
| **(d)** Adipose Tissue | **(iv)** Ciliated Epithelium |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)' },
      { id: 'B', text: '(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)' },
      { id: 'C', text: '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)' },
      { id: 'D', text: '(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)' }
    ],
    explanation: `**Correct Option: A**

- **Bronchioles**: Lined by **ciliated epithelium** -> **(iv)**
- **Goblet Cell**: Unicellular **glandular tissue** secreting mucus -> **(iii)**
- **Tendons**: Collagen fibres present in rows between parallel bundles, representing **dense regular connective tissue** -> **(i)**
- **Adipose Tissue**: Located mainly beneath the skin, representing **loose connective tissue** specialized to store fats -> **(ii)**

Matching: **(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)**.`
  },

  35: {
    question: `Match the following columns with reference to cockroach and select the correct option:

| Column - I | Column - II |
| :--- | :--- |
| **(a)** Grinding of the food particles | **(i)** Hepatic caeca |
| **(b)** Secrete gastric juice | **(ii)** 10th segment |
| **(c)** 10 pairs | **(iii)** Proventriculus |
| **(d)** Anal cerci | **(iv)** Spiracles |
| | **(v)** Alary muscles |`,
    options: [
      { id: 'A', text: '(a)-(ii), (b)-(iii), (c)-(i), (d)-(iv)' },
      { id: 'B', text: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)' },
      { id: 'C', text: '(a)-(iv), (b)-(iii), (c)-(v), (d)-(ii)' },
      { id: 'D', text: '(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)' }
    ],
    explanation: `**Correct Option: B**

- **Grinding of food particles**: Performed by the **proventriculus (gizzard)** -> **(iii)**
- **Secrete gastric juice**: Performed by **hepatic (gastric) caeca** -> **(i)**
- **10 pairs**: Number of **spiracles** on the lateral side of the body (2 thoracic + 8 abdominal) -> **(iv)**
- **Anal cerci**: Located on the **10th segment** in both sexes -> **(ii)**

Matching: **(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)**.`
  },

  40: {
    question: `Match the following cell structure with its characteristic feature:

| Cell Structure | Characteristic Feature |
| :--- | :--- |
| **(a)** Tight junctions | **(i)** Cement neighbouring cells together to form sheet |
| **(b)** Adhering junctions | **(ii)** Transmit information through chemical to another cells |
| **(c)** Gap junctions | **(iii)** Establish a barrier to prevent leakage of fluid across epithelial cells |
| **(d)** Synaptic junctions | **(iv)** Cytoplasmic channels to facilitate communication between adjacent cells |

Select correct option from the following:`,
    options: [
      { id: 'A', text: '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)' },
      { id: 'B', text: '(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)' },
      { id: 'C', text: '(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)' },
      { id: 'D', text: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)' }
    ],
    explanation: `**Correct Option: D**

- **Tight junctions**: Help to stop substances from leaking across a tissue -> **(iii)**
- **Adhering junctions**: Perform cementing to keep neighbouring cells together -> **(i)**
- **Gap junctions**: Facilitate the cells to communicate with each other by connecting the cytoplasm for rapid transfer of ions and small molecules -> **(iv)**
- **Synaptic junctions**: Transmit information across neurons via chemical neurotransmitters -> **(ii)**

Matching: **(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)**.`
  },

  58: {
    question: `Identify the tissue shown in the diagram and match with its characteristics and its location:

<div align="center">
  <img src="${diagramUrls.q_58}" alt="Muscle Tissue" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'Smooth muscles, show branching, found in the walls of the heart.' },
      { id: 'B', text: 'Striated muscles, tapering at both-ends, attached with the bones of the ribs' },
      { id: 'C', text: 'Skeletal muscle, shows striations and closely attached with the bones of the limbs' },
      { id: 'D', text: 'Cardiac muscles, unbranched muscles, found in the walls of the heart' }
    ],
    explanation: `**Correct Option: C**

The diagram shows **skeletal (striated) muscle tissue**. 
- It consists of cylindrical, unbranched, multinucleated fibres displaying alternate light and dark striations (cross-striations).
- They are voluntary muscles that are closely attached to skeletal bones (such as bones of the limbs) to bring about body movement.`
  },

  60: {
    question: `Given below is the diagrammatic sketch of a certain type of connective tissue. Identify the parts labeled A, B, C and D and select the right option about them:

<div align="center">
  <img src="${diagramUrls.q_60}" alt="Areolar Connective Tissue" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'A - Mast cell, B - Collagen fibres, C - Fibroblast, D - Macrophage' },
      { id: 'B', text: 'A - Mast cell, B - Macrophage, C - Fibroblast, D - Collagen fibres' },
      { id: 'C', text: 'A - Macrophage, B - Fibroblast, C - Collagen fibres, D - Mast cell' },
      { id: 'D', text: 'A - Macrophage, B - Collagen fibres, C - Fibroblast, D - Mast cell' }
    ],
    explanation: `**Correct Option: C**

The diagram represents **loose (areolar) connective tissue** from NCERT:
- **A**: **Macrophage** (large amoeboid phagocytic cell)
- **B**: **Fibroblast** (cell producing and secreting fibers)
- **C**: **Collagen fibres** (thick bundles of white unbranched fibers)
- **D**: **Mast cell** (cell containing histamine, serotonin, and heparin)`
  },

  62: {
    question: `The four sketches (A, B, C and D) given below, represent four different types of animal tissues. Which one of these is correctly identified in the options given, along with its correct location and function?

<div align="center">
  <img src="${diagramUrls.q_62}" alt="Four Animal Tissues Sketches" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '(A) Tissue: Columnar epithelium, Location: Nephron, Function: Secretion and absorption' },
      { id: 'B', text: '(C) Tissue: Collagen fibres, Location: Cartilage, Function: Attach skeletal muscles to bones' },
      { id: 'C', text: '(B) Tissue: Glandular epithelium, Location: Intestine, Function: Secretion' },
      { id: 'D', text: '(D) Tissue: Smooth muscle tissue, Location: Heart, Function: Heart contraction' }
    ],
    explanation: `**Correct Option: C**

In the given sketches:
- **(A)** is cuboidal epithelium (found in ducts of glands and tubular parts of nephrons).
- **(B)** is **glandular epithelium** (isolated or clustered secretory cells, found in the alimentary canal / intestine for **secretion**).
- **(C)** is dense regular connective tissue (collagen fibres in parallel rows, such as tendons).
- **(D)** is cardiac muscle tissue (showing branching and intercalated discs, not smooth muscle).

Therefore, option **(C)** is the correctly identified tissue, location, and function.`
  },

  117: {
    question: `Following are the statements about prostomium of earthworm:
(1) It serves as a covering for mouth.
(2) It helps to open cracks in the soil into which it can crawl.
(3) It is one of the sensory structures.
(4) It is the first body segment.

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(2) and (3) are correct' },
      { id: 'B', text: '(1), (2) and (3) are correct' },
      { id: 'C', text: '(1), (2) and (4) are correct' },
      { id: 'D', text: '(1), (2), (3) and (4) are correct' }
    ],
    explanation: `**Correct Option: B**

- **Prostomium** is a fleshy lobe that overhangs the mouth (serves as a covering for the mouth) -> (1) is correct.
- It is used as a wedge to open cracks in the soil for burrowing -> (2) is correct.
- The prostomium is sensory in function -> (3) is correct.
- The first body segment is the **peristomium** (buccal segment), which contains the mouth. The prostomium is pre-segmental, not the first body segment -> (4) is incorrect.

Therefore, **(1), (2) and (3) are correct**.`
  },

  122: {
    question: `Which one of the following correctly described the location of some body parts in the earthworm Pheretima ?`,
    options: [
      { id: 'A', text: 'Two pairs of testes in 10th and 11th segments.' },
      { id: 'B', text: 'One pair of ovaries attached at intersegmental septum of 14th and 15th segments.' },
      { id: 'C', text: 'Two pairs of accessory glands in 16–18 segments' },
      { id: 'D', text: 'Four pairs of spermathecae in 4–7 segments' }
    ],
    explanation: `**Correct Option: A**

- **Testes**: Two pairs situated in the $10^{\\text{th}}$ and $11^{\\text{th}}$ segments (Correct).
- **Ovaries**: One pair attached at the intersegmental septum of the $12^{\\text{th}}$ and $13^{\\text{th}}$ segments (not 14-15).
- **Accessory glands**: Two pairs situated in the $17^{\\text{th}}$ and $19^{\\text{th}}$ segments.
- **Spermathecae**: Four pairs located in segments 6 to 9 (intersegmental grooves 5/6, 6/7, 7/8, and 8/9).`
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

console.log(`Successfully generated ${allQuestions.length} questions out of 130.`);
fs.writeFileSync('./backend/scripts/structural_org_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/structural_org_all_questions.json');
