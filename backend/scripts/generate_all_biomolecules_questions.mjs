import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/biomolecules_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./scripts/biomolecules_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./scripts/biomolecules_diagram_urls.json', 'utf8'));

// Reconstruct lines per page (pages 2 to 34)
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 34)) {
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
    question: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| A. Starch | I. Fights infection |
| B. Antibody | II. Energy storage |
| C. Concanavalin A | III. Glucose transport |
| D. Glut-4 | IV. Lectin |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-I, B-II, C-III, D-IV" },
      { id: 'B', text: "A-I, B-II, C-IV, D-III" },
      { id: 'C', text: "A-II, B-I, C-IV, D-III" },
      { id: 'D', text: "A-II, B-I, C-III, D-IV" }
    ],
    exam: "RE-NEET 2026",
    explanation: "**Correct Option: C**\n\n- **Starch**: Acts as energy storage in plants (A-II).\n- **Antibody**: Fights infectious agents (B-I).\n- **Concanavalin A**: A plant lectin (secondary metabolite) (C-IV).\n- **GLUT-4**: Enables insulin-mediated glucose transport into cells (D-III)."
  },
  6: {
    question: `Match List I with List II :

| List I | List II |
| :--- | :--- |
| A. Trypsin | I. Intercellular ground substance |
| B. Morphine | II. Lectin |
| C. Concanavalin A | III. Enzyme |
| D. Collagen | IV. Alkaloid |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-III, B-IV, C-II, D-I" },
      { id: 'B', text: "A-I, B-II, C-III, D-IV" },
      { id: 'C', text: "A-IV, B-III, C-II, D-I" },
      { id: 'D', text: "A-III, B-II, C-IV, D-I" }
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: A**\n\n- **Trypsin**: Proteolytic enzyme (A-III).\n- **Morphine**: Alkaloid secondary metabolite (B-IV).\n- **Concanavalin A**: Lectin (C-II).\n- **Collagen**: Intercellular ground substance protein (D-I)."
  },
  7: {
    question: `The following reaction depicts the activity of a particular class of enzymes :

Identify the enzymes class '$E$' from the following options :`,
    options: [
      { id: 'A', text: "Transferases" },
      { id: 'B', text: "Isomerases" },
      { id: 'C', text: "Lyases" },
      { id: 'D', text: "Ligases" }
    ],
    exam: "NEET 2026",
    explanation: "**Correct Option: C**\n\nLyases are enzymes that catalyse the removal of groups from substrates by mechanisms other than hydrolysis, leaving double bonds: $X-C-C-Y \\xrightarrow{E} X-Y + C=C$."
  },
  9: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| A. Adenosine | I. Nitrogen base |
| B. Adenylic acid | II. Nucleotide |
| C. Adenine | III. Nucleoside |
| D. Alanine | IV. Amino acid |

Choose the option with all correct matches:`,
    options: [
      { id: 'A', text: "A-III, B-II, C-I, D-IV" },
      { id: 'B', text: "A-II, B-III, C-I, D-IV" },
      { id: 'C', text: "A-III, B-IV, C-II, D-I" },
      { id: 'D', text: "A-III, B-II, C-IV, D-I" }
    ],
    exam: "NEET 2025",
    explanation: "**Correct Option: A**\n\n- **Adenosine**: Nitrogen base attached to a sugar (nucleoside) (A-III).\n- **Adenylic acid**: Nucleoside with a phosphate group (nucleotide) (B-II).\n- **Adenine**: Purine nitrogenous base (C-I).\n- **Alanine**: Simplest amino acid with methyl side chain (D-IV)."
  },
  12: {
    question: `Name the class of enzyme that usually catalyze the following reaction :
$$S - G + S^\\# \\rightarrow S + S^\\# - G$$
Where, $G \\rightarrow$ a group other than hydrogen, $S \\rightarrow$ a substrate, $S^\\# \\rightarrow$ another substrate`,
    options: [
      { id: 'A', text: "Transferase" },
      { id: 'B', text: "Ligase" },
      { id: 'C', text: "Hydrolase" },
      { id: 'D', text: "Lyase" }
    ],
    exam: "NEET 2025",
    explanation: "**Correct Option: A**\n\nTransferases catalyze the transfer of a functional group $G$ (other than hydrogen) between a pair of substrates $S$ and $S^\\#$."
  },
  16: {
    question: `Which of the following graphs depicts the effect of substrate concentration on velocity of enzyme catalysed reaction?`,
    options: [
      { id: 'A', text: `![Graph A](${diagramUrls.q_16_a})` },
      { id: 'B', text: `![Graph B](${diagramUrls.q_16_b})` },
      { id: 'C', text: `![Graph C](${diagramUrls.q_16_c})` },
      { id: 'D', text: `![Graph D](${diagramUrls.q_16_d})` }
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\nWith the increase in substrate concentration, the velocity of the enzymatic reaction rises initially until it reaches a maximum velocity ($V_\\text{max}$), forming a rectangular hyperbola (Graph A). Once all enzyme active sites are saturated, further increases in substrate concentration do not increase velocity."
  },
  18: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Primary structure of protein | (I) Human haemoglobin |
| (B) Secondary structure of protein | (II) Disulphide bonds |
| (C) Tertiary structure of protein | (III) Polypeptide chain |
| (D) Quaternary structure of protein | (IV) Alpha helix and $\\beta$ sheet |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-III, B-IV, C-II, D-I" },
      { id: 'B', text: "A-III, B-II, C-I, D-IV" },
      { id: 'C', text: "A-I, B-III, C-II, D-IV" },
      { id: 'D', text: "A-IV, B-III, C-II, D-I" }
    ],
    exam: "NEET 2024 (Re-Examination)",
    explanation: "**Correct Option: A**\n\n- **Primary structure**: Positional sequence of amino acids in a polypeptide chain (A-III).\n- **Secondary structure**: Folding of polypeptide into $\\alpha$-helix or $\\beta$-pleated sheets stabilized by hydrogen bonds (B-IV).\n- **Tertiary structure**: Three-dimensional conformation stabilized by hydrophobic interactions, ionic bonds, and disulphide bonds (C-II).\n- **Quaternary structure**: Assembly of multiple polypeptide subunits (e.g., adult human haemoglobin with 4 subunits) (D-I)."
  },
  22: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. GLUT-4 | I. Hormone |
| B. Insulin | II. Enzyme |
| C. Trypsin | III. Intercellular ground substance |
| D. Collagen | IV. Enables glucose transport into cells |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-IV, B-I, C-II, D-III" },
      { id: 'B', text: "A-I, B-II, C-III, D-IV" },
      { id: 'C', text: "A-II, B-III, C-IV, D-I" },
      { id: 'D', text: "A-III, B-IV, C-I, D-II" }
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: A**\n\n- **GLUT-4**: Enables glucose transport into cells (A-IV).\n- **Insulin**: Peptide hormone (B-I).\n- **Trypsin**: Proteolytic digestive enzyme (C-II).\n- **Collagen**: Intercellular ground substance (D-III)."
  },
  23: {
    question: `Match List I with List II:

| List - I | List - II |
| :--- | :--- |
| A. Lipase | I. Peptide bond |
| B. Nuclease | II. Ester bond |
| C. Protease | III. Glycosidic bond |
| D. Amylase | IV. Phosphodiester bond |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-IV, B-II, C-III, D-I" },
      { id: 'B', text: "A-III, B-II, C-I, D-IV" },
      { id: 'C', text: "A-II, B-IV, C-I, D-III" },
      { id: 'D', text: "A-IV, B-I, C-III, D-II" }
    ],
    exam: "NEET 2024",
    explanation: "**Correct Option: C**\n\n- **Lipase**: Hydrolyses ester bonds in triglycerides (A-II).\n- **Nuclease**: Hydrolyses phosphodiester bonds in nucleic acids (B-IV).\n- **Protease**: Hydrolyses peptide bonds in proteins (C-I).\n- **Amylase**: Hydrolyses glycosidic bonds in carbohydrates like starch (D-III)."
  },
  25: {
    question: `Match List - I with List - II:

| List - I | List - II |
| :--- | :--- |
| (A) Protein | (I) C=C double bonds |
| (B) Unsaturated fatty acid | (II) Phosphodiester bond |
| (C) Nucleic acid | (III) Glycosidic bonds |
| (D) Polysaccharide | (IV) Peptide bonds |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)" },
      { id: 'B', text: "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)" },
      { id: 'C', text: "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)" },
      { id: 'D', text: "(A)-(I), (B)-(IV), (C)-(III), (D)-(II)" }
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: C**\n\n- **Protein**: Polymers of amino acids linked by peptide bonds (A-IV).\n- **Unsaturated fatty acid**: Possesses one or more C=C double bonds (B-I).\n- **Nucleic acid**: Nucleotides linked by $3'-5'$ phosphodiester bonds (C-II).\n- **Polysaccharide**: Monosaccharides joined by glycosidic bonds (D-III)."
  },
  28: {
    question: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Terpenoids | (I) Codeine |
| (B) Lectins | (II) Diterpenes |
| (C) Alkaloids | (III) Ricin |
| (D) Toxins | (IV) Concanavalin A |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "A-(II), B-(IV), C-(III), D-(I)" },
      { id: 'B', text: "A-(II), B-(I), C-(IV), D-(III)" },
      { id: 'C', text: "A-(II), B-(III), C-(I), D-(IV)" },
      { id: 'D', text: "A-(II), B-(IV), C-(I), D-(III)" }
    ],
    exam: "NEET 2023 Manipur",
    explanation: "**Correct Option: D**\n\n- **Terpenoids**: Monoterpenes, Diterpenes (A-II).\n- **Lectins**: Concanavalin A (B-IV).\n- **Alkaloids**: Morphine, Codeine (C-I).\n- **Toxins**: Abrin, Ricin (D-III)."
  },
  31: {
    question: `Given below are two statements:
Statement I: A protein is imagined as a line, the left end represented by first amino acid (C-terminal) and the right end represented by last amino acid (N-terminal).
Statement II: Adult human haemoglobin, consists of 4 subunits (two subunits of $\\alpha$ type and two subunits of $\\beta$ type.)

In the light of the above statements, choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "Both Statement I and Statement II are false." },
      { id: 'B', text: "Statement I is true but Statement II is false." },
      { id: 'C', text: "Statement I is false but Statement II is true." },
      { id: 'D', text: "Both Statement I and Statement II are true." }
    ],
    exam: "NEET 2023",
    explanation: "**Correct Option: C**\n\n- **Statement I is false**: In a protein line diagram, the left end is the N-terminal (first amino acid with free amino group) and the right end is the C-terminal (last amino acid with free carboxyl group).\n- **Statement II is true**: Adult human haemoglobin ($HbA$) has quaternary structure consisting of 4 subunits ($2\\alpha$ and $2\\beta$)."
  },
  33: {
    question: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| (a) Adenine | (i) Pigment |
| (b) Anthocyanin | (ii) Polysaccharide |
| (c) Chitin | (iii) Alkaloid |
| (d) Codeine | (iv) Purine |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "(a) - (i), (b) - (iv), (c) - (iii), (d) - (ii)" },
      { id: 'B', text: "(a) - (iv), (b) - (i), (c) - (ii), (d) - (iii)" },
      { id: 'C', text: "(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)" },
      { id: 'D', text: "(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)" }
    ],
    exam: "NEET 2022 Phase 2",
    explanation: "**Correct Option: B**\n\n- **Adenine**: Purine nitrogenous base (a-iv).\n- **Anthocyanin**: Secondary metabolite pigment (b-i).\n- **Chitin**: Complex nitrogen-containing polysaccharide (c-ii).\n- **Codeine**: Plant alkaloid (d-iii)."
  },
  35: {
    question: `Given below are two statements:
Statement I : Amino acids have a property of ionizable nature of $-\\text{NH}_2$ and $-\\text{COOH}$ groups, hence have different structures at different pH.
Statement-II : Amino acids can exist as Zwitterionic form at acidic and basic pH.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      { id: 'A', text: "Statement I is incorrect but Statement II is correct" },
      { id: 'B', text: "Both Statement I and Statement II are correct" },
      { id: 'C', text: "Both Statement I and Statement II are incorrect" },
      { id: 'D', text: "Statement I is correct but Statement II is incorrect" }
    ],
    exam: "NEET 2022 Phase 2",
    explanation: "**Correct Option: D**\n\n- **Statement I is correct**: Due to the ionizable nature of $-\\text{NH}_2$ and $-\\text{COOH}$ groups, the structure of amino acids changes at different pH.\n- **Statement II is incorrect**: At a specific pH called the isoelectric point (pI), amino acids exist as a dipolar Zwitterion (neutral net charge). At acidic pH, they exist as cations ($-\\text{NH}_3^+$), and at basic pH, as anions ($-\\text{COO}^-$)."
  },
  36: {
    question: `In the enzyme which catalyses the breakdown of:
$$2\\text{H}_2\\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O} + \\text{O}_2$$
the prosthetic group is :`,
    options: [
      { id: 'A', text: "Niacin" },
      { id: 'B', text: "Nicotinamide adenine dinucleotide" },
      { id: 'C', text: "Haem" },
      { id: 'D', text: "Zinc" }
    ],
    exam: "NEET 2022 Phase 2",
    explanation: "**Correct Option: C**\n\nCatalase and peroxidase catalyze the breakdown of hydrogen peroxide to water and oxygen. The prosthetic group present in these enzymes is **Haem**, an iron-porphyrin complex."
  },
  38: {
    question: `A dehydration reaction links two glucose molecules to product maltose. If the formula for glucose is $\\text{C}_6\\text{H}_{12}\\text{O}_6$ then what is the formula for maltose?`,
    options: [
      { id: 'A', text: "$\\text{C}_{12}\\text{H}_{20}\\text{O}_{10}$" },
      { id: 'B', text: "$\\text{C}_{12}\\text{H}_{24}\\text{O}_{12}$" },
      { id: 'C', text: "$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$" },
      { id: 'D', text: "$\\text{C}_{12}\\text{H}_{24}\\text{O}_{11}$" }
    ],
    exam: "NEET 2022 Phase 1",
    explanation: "**Correct Option: C**\n\nWhen two glucose molecules ($\\,2 \\times \\text{C}_6\\text{H}_{12}\\text{O}_6 = \\text{C}_{12}\\text{H}_{24}\\text{O}_{12}$) combine with the removal of one water molecule ($\\text{H}_2\\text{O}$), the formula of the resulting disaccharide maltose is:\n$$\\text{C}_{12}\\text{H}_{24}\\text{O}_{12} - \\text{H}_2\\text{O} = \\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$$"
  },
  39: {
    question: `Match List-I with List-II:

| List - I (Biological Molecules) | List - II (Biological functions) |
| :--- | :--- |
| (a) Glycogen | (i) Hormone |
| (b) Globulin | (ii) Biocatalyst |
| (c) Steroids | (iii) Antibody |
| (d) Thrombin | (iv) Storage product |

Choose the correct answer from the options given below:`,
    options: [
      { id: 'A', text: "(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)" },
      { id: 'B', text: "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)" },
      { id: 'C', text: "(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)" },
      { id: 'D', text: "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)" }
    ],
    exam: "NEET 2022 Phase 1",
    explanation: "**Correct Option: D**\n\n- **Glycogen**: Storage polysaccharide in animals and fungi (a-iv).\n- **Globulin**: Serum globulins include immunoglobulins (antibodies) (b-iii).\n- **Steroids**: Sex hormones and adrenal cortex hormones (c-i).\n- **Thrombin**: Proteolytic biocatalyst (enzyme) that converts fibrinogen to fibrin (d-ii)."
  },
  41: {
    question: `Match List-I with List-II:

| List-I | List-II |
| :--- | :--- |
| (a) Protein | (i) C = C double bonds |
| (b) Unsaturated fatty acid | (ii) Phosphodiester bonds |
| (c) Nucleic acid | (iii) Glycosidic bonds |
| (d) Polysaccharide | (iv) Peptide bonds |

Choose the correct answer from the options given below :`,
    options: [
      { id: 'A', text: "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)" },
      { id: 'B', text: "(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)" },
      { id: 'C', text: "(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)" },
      { id: 'D', text: "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)" }
    ],
    exam: "NEET 2021",
    explanation: "**Correct Option: B**\n\n- **Protein**: Formed of amino acids linked by peptide bonds (a-iv).\n- **Unsaturated fatty acid**: Contains carbon-carbon double bonds (C=C) (b-i).\n- **Nucleic acid**: Nucleotides joined by phosphodiester bonds (c-ii).\n- **Polysaccharide**: Monosaccharide units joined by glycosidic bonds (d-iii)."
  },
  45: {
    question: `Match the following :

| Column I | Column II |
| :--- | :--- |
| (a) Aquaporin | (i) Amide |
| (b) Asparagine | (ii) Polysaccharide |
| (c) Abscisic acid | (iii) Polypeptide |
| (d) Chitin | (iv) Carotenoids |

Select the correct option :`,
    options: [
      { id: 'A', text: "(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)" },
      { id: 'B', text: "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)" },
      { id: 'C', text: "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)" },
      { id: 'D', text: "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)" }
    ],
    exam: "NEET 2020 Phase 2",
    explanation: "**Correct Option: B**\n\n- **Aquaporin**: Water channel protein/polypeptide (a-iii).\n- **Asparagine**: Amide derived from aspartic acid (b-i).\n- **Abscisic acid**: Phytohormone derived from carotenoids / sesquiterpenes (c-iv).\n- **Chitin**: Complex polysaccharide of N-acetylglucosamine (d-ii)."
  },
  48: {
    question: `Match the following:

| Column I | Column II |
| :--- | :--- |
| (a) Inhibitor of catalytic activity | (i) Ricin |
| (b) Possess peptide bonds | (ii) Malonate |
| (c) Cell wall material in fungi | (iii) Chitin |
| (d) Secondary metabolite | (iv) Collagen |

Choose the correct option from the following:`,
    options: [
      { id: 'A', text: "(A) (ii), (B) (iii), (C) (i), (D) (iv)" },
      { id: 'B', text: "(A) (iii), (B) (i), (C) (iv), (D) (ii)" },
      { id: 'C', text: "(A) (ii), (B) (iv), (C) (iii), (D) (i)" },
      { id: 'D', text: "(A) (iii), (B) (iv), (C) (i), (D) (ii)" }
    ],
    exam: "NEET 2020 Phase 1",
    explanation: "**Correct Option: C**\n\n- **Inhibitor of catalytic activity**: Malonate inhibits succinate dehydrogenase (a-ii).\n- **Possess peptide bonds**: Collagen is a structural protein (b-iv).\n- **Cell wall material in fungi**: Chitin (c-iii).\n- **Secondary metabolite**: Ricin is a toxin (d-i)."
  },
  60: {
    question: `Which of the following describes the given graph correctly?`,
    options: [
      { id: 'A', text: "Endothermic reaction with energy A in presence of enzyme and B in absence of enzyme." },
      { id: 'B', text: "Exothermic reaction with energy A in presence of enzyme and B in absence of enzyme." },
      { id: 'C', text: "Endothermic reaction with energy A in absence of enzyme and B in presence of enzyme." },
      { id: 'D', text: "Exothermic reaction with energy A in absence of enzyme and B in presence of enzyme." }
    ],
    exam: "NEET 2016 Phase 2",
    explanation: "**Correct Option: B**\n\nIn the graph, the potential energy of the product is lower than that of the substrate, which indicates an **exothermic reaction**. Activation energy required in the presence of enzyme is lower (A), and activation energy in the absence of enzyme is higher (B)."
  },
  70: {
    question: `The figure shows a hypothetical tetrapeptide portion of a protein with parts labelled A - D. Which one of the following options is correct?`,
    options: [
      { id: 'A', text: "D is an acidic amino acid-glutamic acid." },
      { id: 'B', text: "C is an aromatic amino acid-tryptophan." },
      { id: 'C', text: "A is the C-terminal amino acid and D is N-terminal amino acid." },
      { id: 'D', text: "A is a sulphur containing amino acid methionine." }
    ],
    exam: "NEET 2013 (Karnataka)",
    explanation: "**Correct Option: A**\n\nIn the tetrapeptide:\n- A has side chain $-\\text{CH}_2\\text{OH}$ (Serine, not methionine).\n- B has side chain $-\\text{CH}_2-\\text{SH}$ (Cysteine).\n- C has side chain $-\\text{CH}_2-\\text{C}_6\\text{H}_4\\text{OH}$ (Tyrosine, not tryptophan).\n- D has side chain $-\\text{CH}_2-\\text{CH}_2-\\text{COOH}$ (Glutamic acid, which is an acidic amino acid).\nHence, option (A) is correct."
  },
  76: {
    question: `Which one out of A - D given below correctly represents the structural formula of the basic amino acid?`,
    options: [
      { id: 'A', text: "C" },
      { id: 'B', text: "D" },
      { id: 'C', text: "A" },
      { id: 'D', text: "B" }
    ],
    exam: "AIPMT 2012 Prelims",
    explanation: "**Correct Option: B**\n\nStructure D represents **Lysine**, which has an additional $-\\text{NH}_2$ group in its side chain ($-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{NH}_2$), making it a basic amino acid."
  },
  78: {
    question: `The given diagrammatic representation shows one of the categories of small molecular weight organic compounds in the living tissues. Identify the category shown and the one blank component 'X' in it.`,
    options: [
      { id: 'A', text: "Category: Cholesterol | Component: Guanine" },
      { id: 'B', text: "Category: Amino acid | Component: $\\text{NH}_2$" },
      { id: 'C', text: "Category: Nucleotide | Component: Adenine" },
      { id: 'D', text: "Category: Nucleoside | Component: Uracil" }
    ],
    exam: "AIPMT 2012 Prelims",
    explanation: "**Correct Option: D**\n\nThe diagram depicts a **nucleoside** composed of a pentose sugar (ribose) linked to a nitrogenous base 'X'. Since Uracil linked to ribose forms the nucleoside Uridine (without a phosphate group), option (D) is correct."
  },
  80: {
    question: `The curve given below shows enzymatic activity in relation to three conditions (pH, temperature and substrate concentration). What do the two axes (x and y) represent?`,
    options: [
      { id: 'A', text: "x-axis: enzymatic activity | y-axis: pH" },
      { id: 'B', text: "x-axis: temperature | y-axis: enzyme activity" },
      { id: 'C', text: "x-axis: substrate concentration | y-axis: enzymatic activity" },
      { id: 'D', text: "x-axis: enzymatic activity | y-axis: temperature" }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: B**\n\nThe bell-shaped curve indicates that enzyme activity increases up to an optimum value of temperature (or pH) and declines thereafter due to denaturation. Thus, x-axis represents temperature (or pH) and y-axis represents enzyme activity."
  },
  81: {
    question: `Which one of the following structural formulae of two organic compounds is correctly identified along with its related function?`,
    options: [
      { id: 'A', text: "B : Adenine - A nucleotide that makes up nucleic acids" },
      { id: 'B', text: "A : Triglyceride - Major source of energy" },
      { id: 'C', text: "B : Uracil - A component of DNA" },
      { id: 'D', text: "A : Lecithin - A component of cell membrane" }
    ],
    exam: "AIPMT 2011 Prelims",
    explanation: "**Correct Option: D**\n\nCompound A is **Lecithin** (a phospholipid with a choline group attached to the phosphate), an essential component of the cell membrane. Compound B is **Adenine**, which is a nitrogenous base (purine), not a nucleotide."
  },
  83: {
    question: `The figure given below shows the conversion of a substrate into product by an enzyme. In which one of the four options (a-d) the components of reaction labelled as A, B, C and D are identified correctly?`,
    options: [
      { id: 'A', text: "A: Potential energy | B: Transition state | C: Activation energy | D: Activation energy without enzyme" },
      { id: 'B', text: "A: Transition state | B: Potential energy | C: Activation energy without enzyme | D: Activation energy with enzyme" },
      { id: 'C', text: "A: Potential energy | B: Transition state | C: Activation energy with enzyme | D: Activation energy without enzyme" },
      { id: 'D', text: "A: Activation energy with enzyme | B: Transition state | C: Activation energy without enzyme | D: Potential energy" }
    ],
    exam: "AIPMT 2010 Mains",
    explanation: "**Correct Option: B**\n\nIn the reaction coordinate diagram:\n- **A**: Transition state (peak of the energy barrier)\n- **B**: Potential energy (y-axis)\n- **C**: Activation energy without enzyme (higher peak)\n- **D**: Activation energy with enzyme (lower peak)."
  },
  85: {
    question: `A competitive inhibitor of succinic dehydrogenase is`,
    options: [
      { id: 'A', text: "$\\alpha$-ketoglutarate" },
      { id: 'B', text: "Malate" },
      { id: 'C', text: "malonate" },
      { id: 'D', text: "oxaloacetate." }
    ],
    exam: "AIPMT 2008",
    explanation: "**Correct Option: C**\n\n**Malonate** closely resembles succinate in molecular structure and acts as a classical competitive inhibitor of the enzyme succinate dehydrogenase."
  },
  100: {
    question: `Which of the following is a reducing sugar?`,
    options: [
      { id: 'A', text: "Galactose" },
      { id: 'B', text: "Gluconic acid" },
      { id: 'C', text: "$\\beta$-methyl galactoside" },
      { id: 'D', text: "Sucrose" }
    ],
    exam: "AIPMT 2002",
    explanation: "**Correct Option: A**\n\n**Galactose** is an aldohexose monosaccharide possessing a free anomeric aldehyde group, which reduces Fehling's and Benedict's solutions; hence it is a reducing sugar."
  },
  109: {
    question: `Cellulose, the most important constituent of plant cell wall is made up of`,
    options: [
      { id: 'A', text: "branched chain of glucose molecules linked by $\\alpha$-1,6 glycosidic bond at the site of branching" },
      { id: 'B', text: "unbranched chain of glucose molecules linked by $\\alpha$-1,4 glycosidic bond" },
      { id: 'C', text: "branched chain of glucose molecules linked by $\\beta$-1,4 glycosidic bond in straight chain and $\\alpha$-1,6 glycosidic bond at the site of branching" },
      { id: 'D', text: "unbranched chain of glucose molecules linked by $\\beta$-1,4 glycosidic bond" }
    ],
    exam: "AIPMT 1998",
    explanation: "**Correct Option: D**\n\nCellulose is a linear, unbranched homopolysaccharide of $\\beta$-D-glucose units linked exclusively by **$\\beta$-1,4-glycosidic bonds**."
  },
  111: {
    question: `Which one of the following statements about cytochrome $\\text{P}_{450}$ is wrong?`,
    options: [
      { id: 'A', text: "It has an important role in metabolism" },
      { id: 'B', text: "It contains iron" },
      { id: 'C', text: "It is a coloured cell" },
      { id: 'D', text: "It is an enzyme involved in oxidation reactions" }
    ],
    exam: "AIPMT 1998",
    explanation: "**Correct Option: C**\n\nCytochrome $\\text{P}_{450}$ is a family of **heme-containing enzymes** (proteins) involved in cellular oxidation and drug detoxification, **not a cell**."
  }
};

const allQuestions = [];

for (let i = 0; i < qIndices.length; i++) {
  const qInfo = qIndices[i];
  const qNum = qInfo.qNum;
  const officialKey = officialKeys[qNum];

  if (SPECIAL_QUESTIONS[qNum]) {
    const sq = SPECIAL_QUESTIONS[qNum];
    allQuestions.push({
      num: qNum,
      exam: sq.exam,
      question: sq.question,
      options: sq.options,
      correctOption: officialKey,
      explanation: sq.explanation,
      image: diagramUrls['q_' + qNum] || ''
    });
    continue;
  }

  // Parse general question
  const nextLineIdx = (i + 1 < qIndices.length) ? qIndices[i + 1].lineIdx : linesWithMeta.length;
  const qLines = linesWithMeta.slice(qInfo.lineIdx, nextLineIdx).map(l => l.text);
  
  const cleanLines = qLines.map(l => l.replace(/Open solution/gi, '').trim()).filter(line => 
    !line.includes('ExamGOAL') &&
    !line.includes('Keep practising') &&
    !line.includes('Google Play') &&
    !line.includes('GET IT ON') &&
    !line.includes('NEET Biology:') &&
    !line.includes('Solutions: questions.examside.com') &&
    !line.startsWith('MCQ (Single Correct Answer)') &&
    !line.startsWith('Out of syllabus') &&
    !line.includes('These questions are on topics')
  ).filter(Boolean);

  const fullText = cleanLines.join(' ');
  const headerMatch = cleanLines[0].match(/^Q\d+\.\s*(.+?)(?:\s*·\s*MCQ.*)?$/);
  const exam = headerMatch ? headerMatch[1].replace(/·\s*MCQ.*$/i, '').trim() : 'NEET';

  const bodyStartIndex = fullText.indexOf(exam) + exam.length;
  let fullBody = fullText.slice(bodyStartIndex).trim();
  fullBody = fullBody.replace(/^·\s*MCQ\s*\(Single\s*Correct\s*Answer\)\s*/i, '').trim();

  const optMatch = fullBody.match(/\(A\)\s*(.*?)\s*\(B\)\s*(.*?)\s*\(C\)\s*(.*?)\s*\(D\)\s*(.*)$/);
  const questionText = fullBody.slice(0, fullBody.indexOf('(A)')).trim();

  const options = [
    { id: 'A', text: optMatch[1].trim() },
    { id: 'B', text: optMatch[2].trim() },
    { id: 'C', text: optMatch[3].trim() },
    { id: 'D', text: optMatch[4].trim() }
  ];

  const optKey = officialKey;
  const chosenOptText = options.find(o => o.id === optKey)?.text || '';

  const explanation = `**Correct Option: ${optKey}**\n\n${chosenOptText ? `**${chosenOptText}** is the correct answer according to the official NEET answer key and NCERT Biomolecules syllabus.` : `According to the official NEET answer key, option (${optKey}) is correct.`}`;

  allQuestions.push({
    num: qNum,
    exam: exam,
    question: questionText,
    options: options,
    correctOption: officialKey,
    explanation: explanation,
    image: diagramUrls['q_' + qNum] || ''
  });
}

console.log(`Generated all ${allQuestions.length} questions.`);
fs.writeFileSync('./scripts/biomolecules_all_questions.json', JSON.stringify(allQuestions, null, 2), 'utf8');
console.log('Saved to ./scripts/biomolecules_all_questions.json');

