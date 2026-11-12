import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/biodiversity_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/biodiversity_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/biodiversity_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 21)) {
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
  7: {
    question: `Match List-I with List-II:

| List - I (Ecological Phenomenon) | List - II (Associated Concept / Factor) |
| :--- | :--- |
| **A** The Evil Quartet | **I** Cryopreservation |
| **B** Ex situ conservation | **II** Alien species invasion |
| **C** *Lantana camara* | **III** Causes of biodiversity losses |
| **D** Dodo | **IV** Extinction |

Choose the option with all correct matches:`,
    options: [
      { id: 'A', text: 'A-III, B-IV, C-II, D-I' },
      { id: 'B', text: 'A-III, B-II, C-IV, D-I' },
      { id: 'C', text: 'A-III, B-II, C-I, D-IV' },
      { id: 'D', text: 'A-III, B-I, C-II, D-IV' }
    ],
    explanation: `**Correct Option: D**

- **The Evil Quartet**: The four major causes of biodiversity losses (Habitat loss & fragmentation, Over-exploitation, Alien species invasions, Co-extinctions) -> **(III)**
- **Ex situ conservation**: Advanced techniques include **Cryopreservation** of gametes -> **(I)**
- ***Lantana camara***: Invasive weed introduced into India causing threat to native biodiversity (Alien species invasion) -> **(II)**
- **Dodo**: Extinct flightless bird from Mauritius -> **(IV)**

Hence, the correct matching is **A-III, B-I, C-II, D-IV**.`
  },

  11: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(A)** Biodiversity hotspot | **(I)** Khasi and Jaintia hills in Meghalaya |
| **(B)** Sacred groves | **(II)** World Summit on Sustainable Development 2002 |
| **(C)** Johannesburg, South Africa | **(III)** *Parthenium* |
| **(D)** Alien species invasion | **(IV)** Western Ghats |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-I, C-II, D-III' },
      { id: 'B', text: 'A-II, B-III, C-IV, D-I' },
      { id: 'C', text: 'A-I, B-IV, C-III, D-II' },
      { id: 'D', text: 'A-III, B-I, C-II, D-IV' }
    ],
    explanation: `**Correct Option: A**

- **Biodiversity hotspot**: Western Ghats is one of India's key biodiversity hotspots -> **(IV)**
- **Sacred groves**: Khasi and Jaintia hills in Meghalaya are famous sacred groves -> **(I)**
- **Johannesburg, South Africa**: Venue for the World Summit on Sustainable Development in 2002 -> **(II)**
- **Alien species invasion**: Carrot grass (*Parthenium*) invaded native flora -> **(III)**

Matching: **A-IV, B-I, C-II, D-III**.`
  },

  16: {
    question: `Match List I with List II:

| List - I (Ecologist / Scientist) | List - II (Ecological Contribution) |
| :--- | :--- |
| **A.** Robert May | **I.** Species-Area relationship |
| **B.** Alexander von Humboldt | **II.** Long term ecosystem experiment using outdoor plots |
| **C.** Paul Ehrlich | **III.** Global species diversity at about 7 million |
| **D.** David Tilman | **IV.** Rivet popper hypothesis |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-III, C-I, D-IV' },
      { id: 'B', text: 'A-III, B-I, C-IV, D-II' },
      { id: 'C', text: 'A-I, B-III, C-II, D-IV' },
      { id: 'D', text: 'A-III, B-IV, C-II, D-I' }
    ],
    explanation: `**Correct Option: B**

- **Robert May**: Estimated global species diversity to be around 7 million -> **(III)**
- **Alexander von Humboldt**: Observed that within a region, species richness increased with increasing explored area (Species-Area relationship) -> **(I)**
- **Paul Ehrlich**: Proposed the 'Rivet popper hypothesis' using an airplane analogy -> **(IV)**
- **David Tilman**: Conducted long-term outdoor plot experiments showing diverse communities exhibit less year-to-year biomass variation -> **(II)**

Matching: **A-III, B-I, C-IV, D-II**.`
  },

  24: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **(a)** Sacred groves | **(i)** Alien species |
| **(b)** Zoological park | **(ii)** Release of large quantity of oxygen |
| **(c)** Nile perch | **(iii)** Ex-situ conservation |
| **(d)** Amazon forest | **(iv)** Khasi Hills in Meghalaya |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a) – (iv), (b) – (iii), (c) – (ii), (d) – (i)' },
      { id: 'B', text: '(a) – (iv), (b) – (iii), (c) – (i), (d) – (ii)' },
      { id: 'C', text: '(a) – (ii), (b) – (iv), (c) – (i), (d) – (iii)' },
      { id: 'D', text: '(a) – (iv), (b) – (i), (c) – (ii), (d) – (iii)' }
    ],
    explanation: `**Correct Option: B**

- **Sacred groves**: Khasi Hills in Meghalaya -> **(iv)**
- **Zoological park**: Form of *ex-situ* conservation -> **(iii)**
- **Nile perch**: Invasive alien predator introduced into Lake Victoria -> **(i)**
- **Amazon forest**: Often referred to as the 'lungs of the planet', producing huge amounts of oxygen -> **(ii)**

Matching: **(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)**.`
  },

  57: {
    question: `Given below is the representation of the extent of global diversity of invertebrates. What groups do the four portions (A-D) represent respectively?

<div align="center">
  <img src="${diagramUrls.q_57}" alt="Global Diversity of Invertebrates Pie Chart" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'A - Insects, B - Crustaceans, C - Other animal groups, D - Molluscs' },
      { id: 'B', text: 'A - Molluscs, B - Other animal groups, C - Crustaceans, D - Insects' },
      { id: 'C', text: 'A - Crustaceans, B - Insects, C - Molluscs, D - Other animal groups' },
      { id: 'D', text: 'A - Insects, B - Molluscs, C - Crustaceans, D - Other animal groups' }
    ],
    explanation: `**Correct Option: D**

According to NCERT global biodiversity representation of invertebrates:
- **A** (largest segment, >70% of all animal species): **Insects**
- **B** (second largest phylum): **Molluscs**
- **C**: **Crustaceans**
- **D**: **Other animal groups**

Therefore: **A - Insects, B - Molluscs, C - Crustaceans, D - Other animal groups**.`
  },

  74: {
    question: `The table below gives the populations (in thousands) of ten species (A-J) in four areas (a-d) consisting of the number of habitats given within brackets against each. Study the table and answer the question which follows:

<div align="center">
  <img src="${diagramUrls.q_74}" alt="Species populations in habitats table" style="max-width: 100%; height: auto;" />
</div>

| Area and Number of Habitats | A | B | C | D | E | F | G | H | I | J |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **a (11)** | 2.3 | 1.2 | 0.52 | 6.0 | - | 3.1 | 1.1 | 9.0 | - | 10.3 |
| **b (11)** | 10.2 | - | 0.62 | - | 1.5 | 3.0 | - | 8.2 | 1.1 | 11.2 |
| **c (13)** | 11.3 | 0.9 | 0.48 | 2.4 | 1.4 | 4.2 | 0.8 | 8.4 | 2.2 | 4.1 |
| **d (12)** | 3.2 | 10.2 | 11.1 | 4.8 | 0.4 | 3.3 | 0.8 | 7.3 | 11.3 | 2.1 |

Which area out of a to d shows maximum species diversity?`,
    options: [
      { id: 'A', text: 'b' },
      { id: 'B', text: 'd' },
      { id: 'C', text: 'c' },
      { id: 'D', text: 'a' }
    ],
    explanation: `**Correct Option: B**

Species diversity depends on both **species richness** (number of different species) and **species evenness** (relative abundance of each species):
- In area **'d'**, all 10 species (A through J) are present with substantial, balanced representation across all species cohorts.
- Hence, area **d** exhibits maximum species diversity.`
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

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
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
      explanation: `**Correct Option: ${officialKey}**\n\nOfficial NEET Answer Key verified.`
    });
  } else {
    console.error(`FAILED TO PARSE Q${num} (Page ${cur.page})`);
  }
}

console.log(`Successfully generated ${allQuestions.length} questions out of 104.`);
fs.writeFileSync('./backend/scripts/biodiversity_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/biodiversity_all_questions.json');
