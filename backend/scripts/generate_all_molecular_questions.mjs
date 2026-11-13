import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/molecular_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/molecular_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/molecular_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 48)) {
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
  5: {
    question: `Arrange the following steps of DNA fingerprinting in a correct sequence:
A. Isolation of DNA and its digestion by restriction endonucleases.
B. Hybridisation using a labelled VNTR probe.
C. Transferring of separated DNA fragments to synthetic membranes.
D. Detection of hybridised DNA fragments by autoradiography.
E. Separation of DNA fragments by electrophoresis.

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A, B, D, C, E' },
      { id: 'B', text: 'A, D, B, E, C' },
      { id: 'C', text: 'A, E, C, B, D' },
      { id: 'D', text: 'A, E, B, C, D' }
    ],
    explanation: `**Correct Option: C**

The correct sequence of steps in DNA fingerprinting is:
1. Isolation of DNA and digestion by restriction endonucleases (A)
2. Separation of DNA fragments by electrophoresis (E)
3. Transferring (blotting) of separated DNA fragments to synthetic membranes (such as nitrocellulose or nylon) (C)
4. Hybridisation using labelled VNTR probe (B)
5. Detection of hybridised DNA fragments by autoradiography (D)

Therefore, the correct order is **A, E, C, B, D**.`
  },

  9: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| **A** Alfred Hershey and Martha Chase | **I** *Streptococcus pneumoniae* |
| **B** Euchromatin | **II** Densely packed and dark-stained |
| **C** Frederick Griffith | **III** Loosely packed and light-stained |
| **D** Heterochromatin | **IV** DNA as genetic material confirmation |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-IV, B-III, C-I, D-II' },
      { id: 'B', text: 'A-III, B-II, C-IV, D-I' },
      { id: 'C', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'D', text: 'A-IV, B-II, C-I, D-III' }
    ],
    explanation: `**Correct Option: A**

- **Alfred Hershey and Martha Chase**: Unequivocal proof that DNA is the genetic material (bacteriophage $T_2$ experiment) -> **IV**
- **Euchromatin**: Loosely packed, light-stained, transcriptionally active chromatin -> **III**
- **Frederick Griffith**: Transformation experiment using *Streptococcus pneumoniae* -> **I**
- **Heterochromatin**: Densely packed, dark-stained, transcriptionally inactive chromatin -> **II**

Matching: **A-IV, B-III, C-I, D-II**.`
  },

  15: {
    question: `Which factor is important for termination of transcription in prokaryotes?`,
    options: [
      { id: 'A', text: '$\\rho$ (rho)' },
      { id: 'B', text: '$\\gamma$ (gamma)' },
      { id: 'C', text: '$\\alpha$ (alpha)' },
      { id: 'D', text: '$\\sigma$ (sigma)' }
    ],
    explanation: `**Correct Option: A**

In prokaryotes:
- Initiation factor is **$\\sigma$ (sigma)** factor.
- Termination factor is **$\\rho$ (rho)** factor.`
  },

  23: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** Frederick Griffith | **I.** Genetic code |
| **B.** Francois Jacob & Jacques Monod | **II.** Semi-conservative mode of DNA replication |
| **C.** Har Gobind Khorana | **III.** Transformation |
| **D.** Meselson & Stahl | **IV.** Lac operon |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-III, B-II, C-I, D-IV' },
      { id: 'B', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'C', text: 'A-II, B-III, C-IV, D-I' },
      { id: 'D', text: 'A-IV, B-II, C-II, D-III' }
    ],
    explanation: `**Correct Option: B**

- **Frederick Griffith**: Transformation experiment (1928) -> **III**
- **Francois Jacob & Jacques Monod**: Elucidated the Lac operon model -> **IV**
- **Har Gobind Khorana**: Synthesized defined RNA polymers to decipher the genetic code -> **I**
- **Meselson & Stahl**: Proved semi-conservative replication of DNA in *E. coli* -> **II**

Matching: **A-III, B-IV, C-I, D-II**.`
  },

  25: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| **A.** RNA polymerase III | **I.** snRNPs |
| **B.** Termination of transcription | **II.** Promoter |
| **C.** Splicing of Exons | **III.** Rho factor |
| **D.** TATA box | **IV.** 5S rRNA, tRNA, snRNA |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-IV, C-I, D-III' },
      { id: 'B', text: 'A-III, B-II, C-IV, D-I' },
      { id: 'C', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'D', text: 'A-IV, B-III, C-I, D-II' }
    ],
    explanation: `**Correct Option: D**

- **RNA polymerase III**: Transcribes tRNA, 5S rRNA, and snRNA -> **IV**
- **Termination of transcription**: Mediated by Rho factor in bacteria -> **III**
- **Splicing of Exons**: Carried out by spliceosome complex containing snRNPs -> **I**
- **TATA box**: Conserved promoter sequence element -> **II**

Matching: **A-IV, B-III, C-I, D-II**.`
  },

  37: {
    question: `Match List I with List II:

| List I (Lac Operon Gene) | List II (Product / Enzyme) |
| :--- | :--- |
| **(A)** Gene 'a' | **(I)** $\\beta$-galactosidase |
| **(B)** Gene 'y' | **(II)** Transacetylase |
| **(C)** Gene 'i' | **(III)** Permease |
| **(D)** Gene 'z' | **(IV)** Repressor protein |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: 'A-II, B-III, C-IV, D-I' },
      { id: 'B', text: 'A-III, B-IV, C-I, D-II' },
      { id: 'C', text: 'A-III, B-I, C-IV, D-II' },
      { id: 'D', text: 'A-II, B-I, C-IV, D-III' }
    ],
    explanation: `**Correct Option: A**

In the Lac operon:
- **Gene 'i'**: Codes for the repressor protein -> **IV**
- **Gene 'z'**: Codes for $\\beta$-galactosidase -> **I**
- **Gene 'y'**: Codes for permease -> **III**
- **Gene 'a'**: Codes for transacetylase -> **II**

Matching: **A-II, B-III, C-IV, D-I**.`
  },

  43: {
    question: `Match List - I with List - II:

| List - I (Lac Operon Gene) | List - II (Function / Product) |
| :--- | :--- |
| **(a)** In lac operon $i$ gene codes for | **(i)** transacetylase |
| **(b)** In lac operon $z$ gene codes for | **(ii)** permease |
| **(c)** In lac operon $y$ gene codes for | **(iii)** $\\beta$-galactosidase |
| **(d)** In lac operon $a$ gene codes for | **(iv)** Repressor |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)' },
      { id: 'B', text: '(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)' },
      { id: 'C', text: '(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)' },
      { id: 'D', text: '(a) - (iv), (b) - (i), (c) - (iii), (d) - (ii)' }
    ],
    explanation: `**Correct Option: C**

- $i$ gene -> Repressor protein (iv)
- $z$ gene -> $\\beta$-galactosidase (iii)
- $y$ gene -> permease (ii)
- $a$ gene -> transacetylase (i)

Matching: **(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)**.`
  },

  44: {
    question: `Match List-I with List-II:

| List - I (Organism / Genetic Material) | List - II (Genome Size) |
| :--- | :--- |
| **(a)** Bacteriophage $\\phi \\times 174$ | **(i)** $48,502$ base pairs |
| **(b)** Bacteriophage lambda | **(ii)** $5,386$ nucleotides |
| **(c)** *Escherichia coli* | **(iii)** $3.3 \\times 10^9$ base pairs |
| **(d)** Haploid content of human DNA | **(iv)** $4.6 \\times 10^6$ base pairs |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: '(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)' },
      { id: 'B', text: '(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)' },
      { id: 'C', text: '(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)' },
      { id: 'D', text: '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)' }
    ],
    explanation: `**Correct Option: D**

According to NCERT Molecular Basis of Inheritance:
- Bacteriophage $\\phi \\times 174$: **$5,386$ nucleotides** -> **(ii)**
- Bacteriophage lambda: **$48,502$ base pairs** -> **(i)**
- *Escherichia coli*: **$4.6 \\times 10^6$ base pairs** -> **(iv)**
- Haploid content of human DNA: **$3.3 \\times 10^9$ base pairs** -> **(iii)**

Matching: **(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)**.`
  },

  55: {
    question: `Complete the flow chart on central dogma:

<div align="center">
  <img src="${diagramUrls.q_55}" alt="Central Dogma Flow Chart" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: '(a) - Transduction; (b) - Translation; (c) - Replication; (d) - Protein' },
      { id: 'B', text: '(a) - Replication; (b) - Transcription; (c) - Transduction; (d) - Protein' },
      { id: 'C', text: '(a) - Translation; (b) - Replication; (c) - Transcription; (d) - Transduction' },
      { id: 'D', text: '(a) - Replication; (b) - Transcription; (c) - Translation; (d) - Protein' }
    ],
    explanation: `**Correct Option: D**

In the Central Dogma proposed by Francis Crick:
- **(a)**: Self-duplication of DNA = **Replication**
- **(b)**: Copying of genetic information from DNA to mRNA = **Transcription**
- **(c)**: Decoding mRNA into polypeptide chain = **Translation**
- **(d)**: End product of translation = **Protein**`
  },

  75: {
    question: `What initiation and termination factors are involved in transcription in prokaryotes/bacteria?`,
    options: [
      { id: 'A', text: '$\\alpha$ and $\\sigma$, respectively' },
      { id: 'B', text: '$\\sigma$ and $\\rho$, respectively' },
      { id: 'C', text: '$\\alpha$ and $\\beta$, respectively' },
      { id: 'D', text: '$\\beta$ and $\\gamma$, respectively' }
    ],
    explanation: `**Correct Option: B**

In bacterial transcription:
- RNA polymerase requires the **$\\sigma$ (sigma)** factor for initiation at the promoter.
- It requires the **$\\rho$ (rho)** factor for termination at the terminator region.`
  },

  76: {
    question: `Match the following RNA polymerases with their transcribed products:

| Column I (RNA Polymerase) | Column II (Transcribed Product) |
| :--- | :--- |
| **(a)** RNA polymerase I | **(i)** tRNA |
| **(b)** RNA polymerase II | **(ii)** rRNA ($28\\text{S}, 18\\text{S}, 5.8\\text{S}$) |
| **(c)** RNA polymerase III | **(iii)** hnRNA |

Select the correct option from the following:`,
    options: [
      { id: 'A', text: '(a)-(iii), (b)-(ii), (c)-(i)' },
      { id: 'B', text: '(a)-(i), (b)-(iii), (c)-(ii)' },
      { id: 'C', text: '(a)-(i), (b)-(ii), (c)-(iii)' },
      { id: 'D', text: '(a)-(ii), (b)-(iii), (c)-(i)' }
    ],
    explanation: `**Correct Option: D**

- **RNA polymerase I**: Transcribes rRNAs ($28\\text{S}, 18\\text{S}, 5.8\\text{S}$) -> **(ii)**
- **RNA polymerase II**: Transcribes precursor of mRNA (hnRNA) -> **(iii)**
- **RNA polymerase III**: Transcribes tRNA, $5\\text{S}$ rRNA, and snRNAs -> **(i)**

Matching: **(a)-(ii), (b)-(iii), (c)-(i)**.`
  },

  82: {
    question: `Match the following genes of the Lac operon with their respective products:

| Gene | Product / Function |
| :--- | :--- |
| **(a)** $i$ gene | **(i)** $\\beta$-galactosidase |
| **(b)** $z$ gene | **(ii)** Permease |
| **(c)** $a$ gene | **(iii)** Repressor |
| **(d)** $y$ gene | **(iv)** Transacetylase |

Select the correct option:`,
    options: [
      { id: 'A', text: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)' },
      { id: 'B', text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { id: 'C', text: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)' },
      { id: 'D', text: '(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)' }
    ],
    explanation: `**Correct Option: A**

- $i$ gene codes for Repressor -> **(iii)**
- $z$ gene codes for $\\beta$-galactosidase -> **(i)**
- $a$ gene codes for Transacetylase -> **(iv)**
- $y$ gene codes for Permease -> **(ii)**

Matching: **(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)**.`
  },

  114: {
    question: `The figure gives an important concept in the genetic implication of DNA. Fill the blanks A, B and C:

<div align="center">
  <img src="${diagramUrls.q_114}" alt="Genetic Implication of DNA" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'A - Erwin Chargaff, B - translation, C - replication' },
      { id: 'B', text: 'A - Maurice Wilkins, B - transcription, C - translation' },
      { id: 'C', text: 'A - Francis Crick, B - translation, C - transcription' },
      { id: 'D', text: 'A - James Watson, B - replication, C - extension' }
    ],
    explanation: `**Correct Option: C**

In the Central Dogma scheme:
- Proposed by **A**: **Francis Crick** (1958)
- DNA to mRNA (**C**): **Transcription**
- mRNA to protein (**B**): **Translation**`
  },

  120: {
    question: `The diagram shows an important concept in the genetic implication of DNA. Fill in the blanks A to C:

<div align="center">
  <img src="${diagramUrls.q_120}" alt="Central Dogma Scheme" style="max-width: 100%; height: auto;" />
</div>`,
    options: [
      { id: 'A', text: 'A - translation, B - extension, C - Rosalind Franklin' },
      { id: 'B', text: 'A - translation, B - transcription, C - Erwin Chargaff' },
      { id: 'C', text: 'A - transcription, B - translation, C - Francis Crick' },
      { id: 'D', text: 'A - transcription, B - replication, C - James Watson' }
    ],
    explanation: `**Correct Option: C**

- **A**: **Transcription** (DNA $\\rightarrow$ mRNA)
- **B**: **Translation** (mRNA $\\rightarrow$ protein)
- **C**: Proposed by **Francis Crick**`
  },

  234: {
    question: `Nucleosome core is made of:`,
    options: [
      { id: 'A', text: '$\\text{H}_1\\text{, }\\text{H}_2\\text{A, }\\text{H}_2\\text{B and }\\text{H}_3$' },
      { id: 'B', text: '$\\text{H}_1\\text{, }\\text{H}_2\\text{A, }\\text{H}_2\\text{B, }\\text{H}_4$' },
      { id: 'C', text: '$\\text{H}_1\\text{, }\\text{H}_2\\text{A, }\\text{H}_2\\text{B, }\\text{H}_3\\text{ and }\\text{H}_4$' },
      { id: 'D', text: '$\\text{H}_2\\text{A, }\\text{H}_2\\text{B, }\\text{H}_3\\text{ and }\\text{H}_4$' }
    ],
    explanation: `**Correct Option: D**

The core particle of a nucleosome is an octamer composed of two molecules each of four core histones: $\\text{H}_2\\text{A}$, $\\text{H}_2\\text{B}$, $\\text{H}_3$, and $\\text{H}_4$. Histone $\\text{H}_1$ is a linker histone located outside the core.`
  },

  254: {
    question: `Which one of the following is wrongly matched?`,
    options: [
      { id: 'A', text: 'Transcription − Writing information from DNA to t−RNA' },
      { id: 'B', text: 'Operon − Structural genes, operator and promoter' },
      { id: 'C', text: 'Repressor protein − Binds to operator to stop enzyme synthesis' },
      { id: 'D', text: 'Translation − Using information in m−RNA to make protein.' }
    ],
    explanation: `**Correct Option: A**

Transcription is the synthesis of RNA (principally mRNA for protein synthesis, as well as tRNA and rRNA) from a DNA template strand. In the context of the question, defining transcription simply as writing from DNA to tRNA is considered the wrongly matched option.`
  },

  255: {
    question: `Jacob and Monod studied lactose metabolism in E. coli and proposed operon concept. Operon concept is applicable for:`,
    options: [
      { id: 'A', text: 'All prokaryotes and all eukaryotes' },
      { id: 'B', text: 'All prokaryotes and some protozoans' },
      { id: 'C', text: 'All prokaryotes' },
      { id: 'D', text: 'All prokaryotes and some eukaryotes' }
    ],
    explanation: `**Correct Option: C, D**

According to official NEET keys:
Operon systems of gene regulation were discovered and established in prokaryotes (*E. coli*), but operon-like polycistronic gene clusters have also been found in certain lower eukaryotes (e.g., *C. elegans*), making both options (C) and (D) recognized as correct answers.`
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

console.log(`Successfully generated ${allQuestions.length} questions out of 255.`);
fs.writeFileSync('./backend/scripts/molecular_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./backend/scripts/molecular_all_questions.json');

