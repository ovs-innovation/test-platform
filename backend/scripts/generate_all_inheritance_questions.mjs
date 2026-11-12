import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_diagram_urls.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 55)) {
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
  4: {
    question_text: `Match List I with List II:

| List-I | List-II |
| :--- | :--- |
| A. Incomplete dominance | I. Human skin colour |
| B. Co-dominance | II. Inheritance of flower colour in *Antirrhinum* sp. |
| C. Pleiotropy | III. Phenylketonuria disease in humans |
| D. Polygenic inheritance | IV. ABO blood groups |

Choose the correct answer from the options given below:`,
    options: [
      "A-II, B-IV, C-III, D-I",
      "A-I, B-III, C-II, D-IV",
      "A-I, B-IV, C-III, D-II",
      "A-II, B-I, C-III, D-IV"
    ],
    explanation: "• **Incomplete dominance**: Flower colour in *Antirrhinum majus* (snapdragon) shows a phenotypic ratio of 1:2:1 (Red:Pink:White) (A-II).\n• **Co-dominance**: ABO blood group alleles $I^A$ and $I^B$ are both fully expressed in heterozygous state ($I^A I^B$) (B-IV).\n• **Pleiotropy**: A single gene mutation in the enzyme phenylalanine hydroxylase causes Phenylketonuria, affecting multiple phenotypic traits (C-III).\n• **Polygenic inheritance**: Human skin colour is controlled by three or more genes with cumulative additive effect (D-I).\nHence, correct match is **A-II, B-IV, C-III, D-I**."
  },
  7: {
    question_text: "What is the probability of having children with 'O' blood group, where both mother and father are heterozygous for 'A' and 'B' blood group, respectively?",
    options: [
      "25%",
      "0%",
      "75%",
      "50%"
    ],
    explanation: "Mother is heterozygous for blood group A ($I^A i$) and father is heterozygous for blood group B ($I^B i$).\nA cross between $I^A i \\times I^B i$ yields:\n• $I^A I^B$ (Blood group AB) - 25%\n• $I^A i$ (Blood group A) - 25%\n• $I^B i$ (Blood group B) - 25%\n• $i i$ (Blood group O) - 25%\nTherefore, the probability of having a child with 'O' blood group is **25%**."
  },
  10: {
    question_text: "With the help of given pedigree, find out the probability for the birth of a child having no disease and being a carrier (has the disease mutation in one allele of the gene) in $F_3$ generation.",
    options: [
      "1/8",
      "Zero",
      "1/4",
      "1/2"
    ],
    image_url: diagramUrls.q_10,
    explanation: "Based on the pedigree chart showing sex-linked/autosomal transmission across $F_0, F_1, F_2$, the probability of a child in the $F_3$ generation inheriting one mutated allele without showing the disease (i.e. carrier phenotype) is **$1/4$** (Option C)."
  },
  11: {
    question_text: "Genes $R$ and $Y$ follow independent assortment. If $RRYY$ produce round yellow seeds and $rryy$ produce wrinkled green seeds, what will be the phenotypic ratio of the $F_2$ generation?",
    options: [
      "Phenotypic ratio - $9 : 3 : 3 : 1$",
      "Phenotypic ratio - $9 : 7$",
      "Phenotypic ratio - $1 : 2 : 1$",
      "Phenotypic ratio - $3 : 1$"
    ],
    explanation: "According to Mendel's Law of Independent Assortment, a dihybrid cross between homozygous round yellow ($RRYY$) and wrinkled green ($rryy$) produces an $F_1$ dihybrid ($RrYy$). On selfing $RrYy \\times RrYy$, the $F_2$ generation exhibits a classic dihybrid phenotypic ratio of **$9 : 3 : 3 : 1$** (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green)."
  },
  13: {
    question_text: `Match List-I with List-II:

| List - I (Type of Inheritance) | List - II (Example) |
| :--- | :--- |
| (A) Incomplete dominance | (I) Blood groups in human |
| (B) Co-dominance | (II) Flower colour in *Antirrhinum* |
| (C) Pleiotropy | (III) Skin colour in human |
| (D) Polygenic inheritance | (IV) Phenylketonuria |

Choose the correct answer from the options given below:`,
    options: [
      "A-III, B-IV, C-II, D-I",
      "A-II, B-I, C-IV, D-III",
      "A-II, B-III, C-I, D-IV",
      "A-IV, B-I, C-III, D-II"
    ],
    explanation: "• **Incomplete dominance**: Flower colour in *Antirrhinum* ((A)-(II)).\n• **Co-dominance**: ABO blood groups in human ((B)-(I)).\n• **Pleiotropy**: Phenylketonuria ((C)-(IV)).\n• **Polygenic inheritance**: Skin colour in human ((D)-(III)).\nThus, the correct match is **A-II, B-I, C-IV, D-III**."
  },
  20: {
    question_text: "In a plant, black seed color ($B$) is dominant over white seed color ($b$). In order to find out the genotype of the black seed plant, with which of the following genotype will you cross it?",
    options: [
      "BB",
      "bb",
      "Bb",
      "BB or bb"
    ],
    explanation: "To determine the genotype of an organism exhibiting a dominant phenotype (whether it is homozygous $BB$ or heterozygous $Bb$), a **test cross** is performed by crossing it with a homozygous recessive parent ($bb$)."
  },
  21: {
    question_text: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Two or more alternative forms of a gene | I. Back cross |
| B. Cross of $F_1$ progeny with homozygous recessive parent | II. Ploidy |
| C. Cross of $F_1$ progeny with any of the parents | III. Allele |
| D. Number of chromosome sets in plant | IV. Test cross |

Choose the correct answer from the options given below:`,
    options: [
      "A-I, B-II, C-III, D-IV",
      "A-II, B-I, C-III, D-IV",
      "A-III, B-IV, C-I, D-II",
      "A-IV, B-III, C-II, D-I"
    ],
    explanation: "• Two or more alternative forms of a gene = **Allele** (A-III).\n• Cross of $F_1$ with homozygous recessive parent = **Test cross** (B-IV).\n• Cross of $F_1$ with any parent = **Back cross** (C-I).\n• Number of chromosome sets in a plant = **Ploidy** (D-II).\nHence, the correct option is **A-III, B-IV, C-I, D-II**."
  },
  22: {
    question_text: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Down's syndrome | I. $11^\\text{th}$ chromosome |
| B. $\\alpha$-thalassemia | II. 'X' chromosome |
| C. $\\beta$-thalassemia | III. $21^\\text{st}$ chromosome |
| D. Klinefelter's syndrome | IV. $16^\\text{th}$ chromosome |

Choose the correct answer from the options given below:`,
    options: [
      "A-I, B-II, C-III, D-IV",
      "A-II, B-III, C-IV, D-I",
      "A-III, B-IV, C-I, D-II",
      "A-IV, B-I, C-II, D-III"
    ],
    explanation: "• **Down's syndrome**: Trisomy of $21^\\text{st}$ chromosome (A-III).\n• **$\\alpha$-thalassemia**: Controlled by genes $HBA1$ and $HBA2$ on chromosome 16 (B-IV).\n• **$\\beta$-thalassemia**: Controlled by gene $HBB$ on chromosome 11 (C-I).\n• **Klinefelter's syndrome**: Sex chromosome aneuploidy (47, XXY) involving 'X' chromosome (D-II).\nThus, the correct match is **A-III, B-IV, C-I, D-II**."
  },
  23: {
    question_text: "As per ABO blood grouping system, the blood group of father is $B^+$, mother is $A^+$ and child is $O^-$. Their respective genotype can be:\nA. $I^B i$ / $I^A i$ / $i i$\nB. $I^B I^B$ / $I^A I^A$ / $i i$\nC. $i I^B$ / $i I^A$ / $I^A I^B$\nD. $I^A i$ / $I^B i$ / $I^A i$\nE. $i I^B$ / $i I^A$ / $I^A I^B$\n\nChoose the most appropriate answer from the options given below:",
    options: [
      "A only",
      "B only",
      "C & B only",
      "D & E only"
    ],
    explanation: "For a child to have blood group O ($i i$) and Rh negative, both parents must contribute an $i$ allele. Since father is blood group B, his genotype must be heterozygous $I^B i$. Since mother is blood group A, her genotype must be heterozygous $I^A i$. Therefore, their genotypes are $I^B i$, $I^A i$, and $i i$ (A only)."
  },
  24: {
    question_text: `Match List - I with List - II:

| List - I | List - II |
| :--- | :--- |
| (A) Monohybrid Cross | (I) $1 : 1$ |
| (B) Dihybrid Cross | (II) $1 : 2 : 1$ |
| (C) Incomplete dominance | (III) $3 : 1$ |
| (D) Test Cross | (IV) $9 : 3 : 3 : 1$ |

Choose the correct answer from the options given below:`,
    options: [
      "(A)-(III), (B)-(IV), (C)-(II), (D)-(I)",
      "(A)-(II), (B)-(IV), (C)-(III), (D)-(I)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)",
      "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)"
    ],
    explanation: "• **Monohybrid cross** phenotypic ratio = $3 : 1$ ((A)-(III)).\n• **Dihybrid cross** phenotypic ratio = $9 : 3 : 3 : 1$ ((B)-(IV)).\n• **Incomplete dominance** phenotypic ratio = $1 : 2 : 1$ ((C)-(II)).\n• **Monohybrid test cross** phenotypic ratio = $1 : 1$ ((D)-(I)).\nHence, the correct match is **(A)-(III), (B)-(IV), (C)-(II), (D)-(I)**."
  },
  34: {
    question_text: "Which one of the following symbols represents mating between relatives (consanguineous mating) in human pedigree analysis?",
    options: [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    image_url: diagramUrls.q_34,
    explanation: "In pedigree analysis, a double horizontal line between a male (square) and female (circle) symbol indicates mating between relatives (consanguineous mating). Therefore, option (A) correctly represents this symbol."
  },
  40: {
    question_text: "Select the incorrect match regarding the symbols used in the Pedigree analysis:",
    options: [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    image_url: diagramUrls.q_40,
    explanation: "In standard human pedigree conventions:\n• Square represents male.\n• Circle represents female.\n• Diamond represents sex unspecified.\n• Filled symbols represent affected individuals.\nOption (D) incorrectly matches the pedigree symbol and its definition."
  },
  57: {
    question_text: `Match the items of Column-I with Column-II:

| Column-I | Column-II |
| :--- | :--- |
| (a) XX-XO method of Sex Determination | (i) Turner's Syndrome |
| (b) XX-XY method of Sex Determination | (ii) Female Heterogametic |
| (c) Karyotype-45 | (iii) Grasshopper |
| (d) ZW-ZZ method of Sex Determination | (iv) Female homogametic |

Select the correct option from the following:`,
    options: [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(i), (b)-(iv), (c)-(ii), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)"
    ],
    explanation: "• **XX-XO method**: Found in insects like grasshopper ((a)-(iii)).\n• **XX-XY method**: Females are homogametic (XX) and males heterogametic (XY) ((b)-(iv)).\n• **Karyotype-45 (45, X0)**: Characteristic of Turner's syndrome ((c)-(i)).\n• **ZW-ZZ method**: Found in birds where female is heterogametic (ZW) ((d)-(ii)).\nThus, the correct match is **(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)**."
  },
  79: {
    question_text: `Match the terms in Column-I with their description in Column-II and choose the correct option:

| Column-I | Column-II |
| :--- | :--- |
| (a) Dominance | (i) Many genes govern a single character |
| (b) Codominance | (ii) In a heterozygous organism only one allele expresses itself |
| (c) Pleiotropy | (iii) In a heterozygous organism both alleles express themselves fully |
| (d) Polygenic inheritance | (iv) A single gene influences many characters |`,
    options: [
      "(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)",
      "(a) - (iv), (b) - (i), (c) - (ii), (d) - (iii)",
      "(a) - (ii), (b) - (ii), (c) - (iv), (d) - (iii)",
      "(a) - (iv), (b) - (iii), (c) - (i), (d) - (ii)"
    ],
    explanation: "• **Dominance**: In heterozygote, only one allele expresses itself ((a)-(ii)).\n• **Codominance**: In heterozygote, both alleles express themselves fully ((b)-(iii)).\n• **Pleiotropy**: A single gene influences multiple phenotypic characters ((c)-(iv)).\n• **Polygenic inheritance**: Many genes govern a single character ((d)-(i)).\nHence, the correct match is **(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)**."
  },
  86: {
    question_text: "In the following human pedigree, the filled symbols represent the affected individuals. Identify the type of given pedigree.",
    options: [
      "X-linked dominant",
      "Autosomal dominant",
      "Autosomal recessive",
      "X-linked recessive"
    ],
    image_url: diagramUrls.q_86,
    explanation: "The pedigree shows unaffected parents having affected offspring (skipping generations) and affects both males and females equally, which is a classic hallmark of an **autosomal recessive** trait (e.g. sickle cell anaemia, phenylketonuria)."
  },
  106: {
    question_text: "Represented below is the inheritance pattern of a certain type of traits in humans. Which one of the following conditions could be an example of this pattern?",
    options: [
      "Haemophilia",
      "Sickle cell anaemia",
      "Thalassemia",
      "Phenylketonuria"
    ],
    image_url: diagramUrls.q_106,
    explanation: "The diagram depicts **criss-cross inheritance** (transmission of a sex-linked gene from mother to son and father to daughter via carrier female). **Haemophilia** is a sex-linked (X-linked) recessive genetic disorder that follows this criss-cross pattern."
  },
  117: {
    question_text: "Study the pedigree chart of a certain family given below and select the correct conclusion which can be drawn for the character –",
    options: [
      "The trait under study could not be colourblindness",
      "The female parent is heterozygous",
      "The parents could not have had a normal daughter for this character",
      "The male parent is homozygous dominant"
    ],
    image_url: diagramUrls.q_117,
    explanation: "In the pedigree chart, unaffected/affected parents produce both affected and unaffected children. For an autosomal/sex-linked recessive character to be expressed in the offspring while the mother appears normal, **the female parent must be heterozygous (carrier)** ($Aa$ or $X^C X^c$)."
  },
  121: {
    question_text: "Which one of the following symbols and its representation, used in human pedigree analysis is correct –",
    options: [
      "(A)",
      "(B)",
      "(C)",
      "(D)"
    ],
    image_url: diagramUrls.q_121,
    explanation: "In human pedigree analysis:\n• Solid filled square represents affected male.\n• A horizontal line connecting male and female represents mating.\n• Offspring are shown in order of birth from left to right.\nOption (A) accurately depicts the correct pedigree symbol and its standard representation."
  },
  129: {
    question_text: "Study the pedigree chart given below : What does it show ?",
    options: [
      "Inheritance of a recessive sex-linked disease like haemophilia",
      "Inheritance of a sex-linked inborn error of metabolism like phenylketonuria",
      "The pedigree chart is wrong as this is not possible",
      "Inheritance of a condition like phenylketonuria as an autosomal recessive trait"
    ],
    image_url: diagramUrls.q_129,
    explanation: "The pedigree chart illustrates an **autosomal recessive** pattern of inheritance, where unaffected parents have affected offspring. Phenylketonuria is an autosomal recessive inborn error of metabolism located on chromosome 12."
  },
  178: {
    question_text: "The linkage map of X-chromosome of fruit-fly has 66 units, with yellow body gene ($y$) at one end and bobbed hair ($b$) gene at the other end. The recombination frequency between these two genes ($y$ and $b$) should be",
    options: [
      "$\\le 50\\%$",
      "$100\\%$",
      "$66\\%$",
      "$> 50\\%$"
    ],
    explanation: "Although the map distance is 66 map units (centiMorgans), the maximum observed recombination frequency between any two linked genes in a test cross cannot exceed **50%**, because even with multiple crossovers between chromatids, independent assortment upper limit is 50%."
  },
  194: {
    question_text: "Probability of four sons to a couple is : -",
    options: [
      "1/16",
      "1/8",
      "1/4",
      "1/32"
    ],
    explanation: "The probability of having a son in any single birth is $1/2$. Since each birth is an independent event, the probability of having four consecutive sons is:\n$$\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$$"
  },
  242: {
    question_text: "The genotype of B blood group father of an O blood group child is",
    options: [
      "$I^B I^B$",
      "$I^A I^B$",
      "$I^A i$",
      "$I^B i$"
    ],
    explanation: "A child with blood group O has the homozygous recessive genotype $i i$ (or $I^O I^O$), receiving one $i$ allele from each parent. Since the father has blood group B, he must possess the dominant allele $I^B$ along with the recessive allele $i$. Therefore, the father's genotype must be **$I^B i$** (or $I^B I^O$)."
  }
};

const allQuestions = [];

for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;
  const num = cur.num;

  const officialKey = officialKeys[num] || officialKeys[String(num)];
  if (!officialKey) {
    throw new Error(`Missing official key for Q${num}`);
  }
  const correctIndex = { A: 0, B: 1, C: 2, D: 3 }[officialKey];

  if (SPECIAL_QUESTIONS[num]) {
    const sp = SPECIAL_QUESTIONS[num];
    allQuestions.push({
      _source_num: num,
      category: 'PYQ',
      subject: 'Botany',
      subject_id: 10,
      chapter: 'Principles of Inheritance and Variation',
      chapter_id: 216,
      topic: 'Principles of Inheritance and Variation',
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
    .filter(t => t.length > 0 && !/ExamGOAL|P Y Q P D F|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|MCQ \(|Out of syllabus|These questions are on topics/i.test(t));

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

  // Clean common OCR / PDF artifacts
  qText = qText.replace(/\s+/g, ' ').trim();
  optA = optA.replace(/\s+/g, ' ').trim();
  optB = optB.replace(/\s+/g, ' ').trim();
  optC = optC.replace(/\s+/g, ' ').trim();
  optD = optD.replace(/\s+/g, ' ').trim();

  // Replace blood group and genetic symbols with KaTeX
  const formatGenetics = (str) => {
    return str
      .replace(/\bF1\b/g, '$F_1$')
      .replace(/\bF2\b/g, '$F_2$')
      .replace(/\bF3\b/g, '$F_3$')
      .replace(/\bIA\b/g, '$I^A$')
      .replace(/\bIB\b/g, '$I^B$');
  };

  qText = formatGenetics(qText);
  optA = formatGenetics(optA);
  optB = formatGenetics(optB);
  optC = formatGenetics(optC);
  optD = formatGenetics(optD);

  const correctOptLetter = officialKey;
  const correctOptText = [optA, optB, optC, optD][correctIndex];
  const explanation = `According to NCERT Principles of Inheritance and Variation, the correct answer is option (${correctOptLetter}): **${correctOptText}**.`;

  allQuestions.push({
    _source_num: num,
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 10,
    chapter: 'Principles of Inheritance and Variation',
    chapter_id: 216,
    topic: 'Principles of Inheritance and Variation',
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

console.log(`Successfully parsed and generated ${allQuestions.length} questions out of 272.`);

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

fs.writeFileSync('./backend/scripts/inheritance_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log('Successfully saved to backend/scripts/inheritance_all_questions.json');
