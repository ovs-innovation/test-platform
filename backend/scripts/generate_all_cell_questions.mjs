import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/cell_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/cell_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/cell_diagram_urls.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^MCQ \(More than One Correct Answer\)/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Cell - The Unit of Life/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  clean.push(line);
}

// Group into question blocks
const qBlocks = [];
let currentBlock = null;

for (const line of clean) {
  const match = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (match) {
    if (currentBlock) qBlocks.push(currentBlock);
    currentBlock = {
      qNum: parseInt(match[1], 10),
      header: match[2],
      lines: []
    };
  } else if (currentBlock) {
    currentBlock.lines.push(line);
  }
}
if (currentBlock) qBlocks.push(currentBlock);

console.log(`Parsed ${qBlocks.length} question blocks.`);

function cleanText(s) {
  return s
    .replace(/Open\s*solution/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const allQuestions = [];

for (const b of qBlocks) {
  const qNum = b.qNum;
  const header = b.header;
  let keyRaw = officialKeys[qNum];
  if (qNum === 178) keyRaw = 'C';

  let imageUrl = '';
  if (qNum === 86) imageUrl = diagramUrls.q86_diag;
  else if (qNum === 88) imageUrl = diagramUrls.q88_diag;
  else if (qNum === 96) imageUrl = diagramUrls.q96_diag;
  else if (qNum === 100) imageUrl = diagramUrls.q100_diag;

  let questionText = '';
  let options = [];
  let correctIndex = ['A', 'B', 'C', 'D'].indexOf(keyRaw);
  if (correctIndex === -1) correctIndex = 0;
  let correctIndices = [correctIndex];

  if (qNum === 6) {
    questionText = "Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Cristae | I. Flat membrane sacs in stroma of chloroplast |\n| B. Cisternae | II. Infoldings in mitochondria |\n| C. Thylakoids | III. Cell membrane |\n| D. Phospholipid | IV. Disc shaped sacs in the Golgi apparatus |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-IV, B-III, C-I, D-II",
      "A-III, B-IV, C-I, D-II",
      "A-II, B-IV, C-I, D-III",
      "A-II, B-IV, C-III, D-I"
    ];
  } else if (qNum === 15) {
    questionText = "Match List-I with List-II.\n\n| List - I | List - II |\n| :--- | :--- |\n| A Centromere | I Mitochondrion |\n| B Cilium | II Cell division |\n| C Cristae | III Cell movement |\n| D Cell membrane | IV Phospholipid Bilayer |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-IV, B-II, C-III, D-I",
      "A-II, B-III, C-I, D-IV",
      "A-I, B-II, C-III, D-IV",
      "A-II, B-I, C-IV, D-III"
    ];
  } else if (qNum === 16) {
    questionText = "Match List I with List II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Flemming | (I) Disc shaped sacs or cisternae near cell nucleus |\n| (B) Robert Brown | (II) Chromatin |\n| (C) George Palade | (III) Ribosomes |\n| (D) Camillo Golgi | (IV) Nucleus |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-II, B-IV, C-III, D-I",
      "A-II, B-III, C-I, D-IV",
      "A-I, B-II, C-III, D-IV",
      "A-IV, B-II, C-III, D-I"
    ];
  } else if (qNum === 18) {
    questionText = "Match List-I with List-II:\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Histones | (I) Loosely packed chromatin |\n| (B) Nucleosome | (II) Densely packed chromatin |\n| (C) Euchromatin | (III) Positively charged basic proteins |\n| (D) Heterochromatin | (IV) DNA wrapped around histone octamer |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-IV, B-III, C-II, D-I",
      "A-III, B-I, C-IV, D-II",
      "A-II, B-III, C-IV, D-I",
      "A-III, B-IV, C-I, D-II"
    ];
  } else if (qNum === 19) {
    questionText = "Match List-I with List-II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Metacentric chromosome | (I) Chromosome has a terminal centromere |\n| (B) Sub-metacentric chromosome | (II) Middle centromere forming two equal arms of chromosome |\n| (C) Acrocentric chromosome | (III) Centromere is slightly away from the middle of chromosome resulting into two unequal arms |\n| (D) Telocentric chromosome | (IV) Centromere is situated close to its end forming one extremely short and one very long arm |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-II, B-I, C-IV, D-III",
      "A-IV, B-I, C-II, D-III",
      "A-I, B-II, C-III, D-IV",
      "A-II, B-III, C-IV, D-I"
    ];
  } else if (qNum === 20) {
    questionText = "Match List-I with List-II.\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) F1 Particles | (I) Chromosomes |\n| (B) Histones | (II) Cilia |\n| (C) Axoneme | (III) Golgi apparatus |\n| (D) Cisternae | (IV) Mitochondria |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-II, B-I, C-IV, D-III",
      "A-IV, B-I, C-II, D-III",
      "A-IV, B-I, C-III, D-II",
      "A-IV, B-III, C-I, D-II"
    ];
  } else if (qNum === 22) {
    questionText = "Match List I with List II :\n\n| List - I | List - II |\n| :--- | :--- |\n| A. Nucleolus | I. Site of formation of glycolipid |\n| B. Centriole | II. Organization like the cartwheel |\n| C. Leucoplasts | III. Site of active ribosomal RNA synthesis |\n| D. Golgi apparatus | IV. For storing nutrients |\n\nChoose the correct answer from the options given below:";
    options = [
      "A-III, B-II, C-IV, D-I",
      "A-II, B-III, C-I, D-IV",
      "A-III, B-IV, C-II, D-I",
      "A-I, B-II, C-III, D-IV"
    ];
  } else if (qNum === 24) {
    questionText = "Match List I with List II :\n\n| List - I | List - II |\n| :--- | :--- |\n| A. Axoneme | I. Centriole |\n| B. Cartwheel pattern | II. Cilia and flagella |\n| C. Crista | III. Chromosome |\n| D. Satellite | IV. Mitochondria |\n\nChoose the correct answer from the options given below :";
    options = [
      "A-IV, B-III, C-II, D-I",
      "A-IV, B-II, C-III, D-I",
      "A-II, B-IV, C-I, D-III",
      "A-II, B-I, C-IV, D-III"
    ];
  } else if (qNum === 27) {
    questionText = "Which of the following statements are correct with respect to Golgi apparatus ?\n\n(A) It is the important site of formation of glycoprotein and glycolipids.\n(B) It produces cellular energy in the form of ATP.\n(C) It modifies the protein synthesized by ribosomes on ER.\n(D) It facilitates the transport of ions.\n(E) It provides mechanical support.\n\nChoose the most appropriate answer from the options given below :";
    options = [
      "(B) and (C) only",
      "(A) and (C) only",
      "(A) and (D) only",
      "(D) and (E) only"
    ];
  } else if (qNum === 31) {
    questionText = "Match List-I with List-II :\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Porins | (i) Pink coloured nodules |\n| (b) leg haemoglobin | (ii) Lumen of thylakoid |\n| (c) H+ accumulation | (iii) Amphibolic pathway |\n| (d) Respiration | (iv) Huge pores in outer membrane of mitochondria |\n\nChoose the correct answer from the options given below.";
    options = [
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)",
      "(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)"
    ];
  } else if (qNum === 34) {
    questionText = "Match List I with List II.\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Metacentric chromosome | (i) Centromere situated close to the end forming one extremely short and one very long arms |\n| (b) Acrocentric chromosome | (ii) Centromere at the terminal end |\n| (c) Submetacentric | (iii) Centromere in the middle forming two equal arms of chromosomes |\n| (d) Telocentric chromosome | (iv) Centromere slightly away from the middle forming one shorter arm and one longer arm |\n\nChoose the correct answer from the options given below:";
    options = [
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)"
    ];
  } else if (qNum === 37) {
    questionText = "Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Cristae | (i) Primary constriction in chromosome |\n| (b) Thylakoids | (ii) Disc-shaped sacs in Golgi apparatus |\n| (c) Centromere | (iii) Infoldings in mitochondria |\n| (d) Cisternae | (iv) Flattened membranous sacs in stroma of plastids |\n\nChoose the correct answer from the options given below.";
    options = [
      "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
      "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)",
      "(a)-(i), (b)-(iv), (c)-(iii), (d)-(ii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)"
    ];
  } else if (qNum === 42) {
    questionText = "The size of Pleuropneumonia - like Organism (PPLO) is :";
    options = ["0.1 µm", "0.02 µm", "1 – 2 µm", "10 – 20 µm"];
  } else if (qNum === 43) {
    questionText = "Match the following columns and select the correct option :\n\n| Column - I | Column - II |\n| :--- | :--- |\n| (a) Smooth Endoplasmic Reticulum | (i) Protein synthesis |\n| (b) Rough endoplasmic reticulum | (ii) Lipid synthesis |\n| (c) Golgi complex | (iii) Glycosylation |\n| (d) Centriole | (iv) Spindle formation |";
    options = [
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)",
      "(a)-(iii), (b)-(i), (c)-(ii), (d)-(iv)",
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)"
    ];
  } else if (qNum === 46) {
    questionText = "Match the column I with column II.\n\n| Column I | Column II |\n| :--- | :--- |\n| (a) Golgi apparatus | (i) Synthesis of protein |\n| (b) Lysosomes | (ii) Trap waste and excretory products |\n| (c) Vacuoles | (iii) Formation of glycoproteins and glycolipids |\n| (d) Ribosomes | (iv) Digesting biomolecules |\n\nChoose the right match from options given below :";
    options = [
      "(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)",
      "(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)"
    ];
  } else if (qNum === 68) {
    questionText = "Match the columns and identify the correct option.\n\n| Column I | Column II |\n| :--- | :--- |\n| (a) Thylakoids | (i) Disc-shaped sacs in Golgi apparatus |\n| (b) Cristae | (ii) Condensed structure of DNA |\n| (c) Cisternae | (iii) Flat membranous sacs in stroma |\n| (d) Chromatin | (iv) Infoldings in mitochondria |";
    options = [
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)",
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)"
    ];
  } else if (qNum === 82) {
    questionText = "Match the following and select the correct answer :\n\n| Column I | Column II |\n| :--- | :--- |\n| (a) Centriole | (i) Infoldings in mitochondria |\n| (b) Chlorophyll | (ii) Thylakoids |\n| (c) Cristae | (iii) Nucleic acid |\n| (d) Ribozymes | (iv) Basal body cilia or flagella |";
    options = [
      "(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)",
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)",
      "(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)"
    ];
  } else if (qNum === 86) {
    questionText = "Select the alternative giving correct identification and function of the organelle 'A' in the diagram :";
    options = [
      "Golgi body - provides packaging material",
      "Mitochondria - produce cellular energy in the form of ATP",
      "Endoplasmic reticulum - synthesis of lipids",
      "Lysosomes - secrete hydrolytic enzymes"
    ];
  } else if (qNum === 88) {
    questionText = "Which one of the following organelle in the figure correctly matches with its function ?";
    options = [
      "Golgi apparatus, formation of glycolipids",
      "Rough endoplasmic reticulum, formation of glycoproteins",
      "Rough endoplasmic reticulum, protein synthesis",
      "Golgi apparatus, protein synthesis"
    ];
  } else if (qNum === 96) {
    questionText = "The figure below shows the structure of a mitochondrion with its four parts labelled (A), (B), (C) and (D). Select the part correctly matched with its function :";
    options = [
      "Part (B) : Inner membrane – forms infoldings called cristae",
      "Part (C) : Cristae – possess single circular DNA molecule and ribosome",
      "Part (A) : Matrix – major site for respiratory chain enzymes",
      "Part (D) : Outer membrane – gives rise to inner membrane by splitting"
    ];
  } else if (qNum === 100) {
    questionText = "Identify the components labelled A, B, C and D in the diagram below from the list (i) to (viii) given along with :\n\nComponents :\n(i) Cristae of mitochondria\n(ii) Inner membrane of mitochondria\n(iii) Cytoplasm\n(iv) Smooth endoplasmic reticulum\n(v) Rough endoplasmic reticulum\n(vi) Mitochondrial matrix\n(vii) Cell vacuole\n(viii) Nucleus\n\nThe correct components are :";
    options = [
      "(A) -> (v), (B) -> (iv), (C) -> (viii), (D) -> (iii)",
      "(A) -> (i), (B) -> (iv), (C) -> (viii), (D) -> (vi)",
      "(A) -> (v), (B) -> (i), (C) -> (iii), (D) -> (ii)",
      "(A) -> (vi), (B) -> (v), (C) -> (iv), (D) -> (vii)"
    ];
  } else if (qNum === 117) {
    questionText = "Chlorophyll in chloroplasts is located in :";
    options = ["Stroma", "Grana", "Pyrenoid", "Both (A) and (C)"];
  } else if (qNum === 178) {
    questionText = "Angstrom (Å) is equal to :";
    options = ["0.01 mm", "0.001 mm", "0.0001 mm", "0.00001 mm"];
  } else {
    // Normal extraction
    const fullText = b.lines.join(' ');
    // Match options (A), (B), (C), (D)
    const m = fullText.match(/^(.*?)\s*\(A\)\s+(.*?)\s*\(B\)\s+(.*?)\s*\(C\)\s+(.*?)\s*\(D\)\s+(.*)$/);
    if (m) {
      questionText = cleanText(m[1]);
      options = [cleanText(m[2]), cleanText(m[3]), cleanText(m[4]), cleanText(m[5])];
    } else {
      const aIdx = fullText.indexOf('(A)');
      const bIdx = fullText.indexOf('(B)', aIdx + 3);
      const cIdx = fullText.indexOf('(C)', bIdx + 3);
      const dIdx = fullText.indexOf('(D)', cIdx + 3);

      questionText = cleanText(fullText.slice(0, aIdx));
      options = [
        cleanText(fullText.slice(aIdx + 3, bIdx)),
        cleanText(fullText.slice(bIdx + 3, cIdx)),
        cleanText(fullText.slice(cIdx + 3, dIdx)),
        cleanText(fullText.slice(dIdx + 3))
      ];
    }
  }

  // Generate Solution
  const correctOptionText = options[correctIndex] || '';
  let solution = `Correct Answer: Option (${keyRaw})${correctOptionText ? ` - ${correctOptionText}` : ''}.`;

  if (qNum === 1) {
    solution += ` The inner membrane of a mitochondrion encloses a dense, homogeneous fluid called the mitochondrial matrix. The matrix contains circular DNA, 70S ribosomes, and enzymes of the Krebs cycle.`;
  } else if (qNum === 2) {
    solution += ` Matthias Schleiden (1838) and Theodore Schwann (1839) together formulated the cell theory, which was later expanded by Rudolf Virchow (1855) with the addition of 'Omnis cellula-e cellula'.`;
  } else if (qNum === 3) {
    solution += ` Chromoplasts contain fat-soluble carotenoid pigments like carotene, xanthophylls, and others, giving plants yellow, orange, or red colors.`;
  } else if (qNum === 4) {
    solution += ` Smooth endoplasmic reticulum (SER) is devoid of ribosomes and is the major cellular site for the synthesis of lipids, phospholipids, and steroid hormones.`;
  } else if (qNum === 5) {
    solution += ` In prokaryotic cells, 70S ribosomes consist of 50S and 30S subunits (a), small circular extra-chromosomal DNA called plasmids are present (b), and specialized membranous infoldings called mesosomes are present (c). Peroxisomes are membrane-bound eukaryotic organelles.`;
  } else if (qNum === 6) {
    solution += ` Cristae are infoldings of the inner mitochondrial membrane (A-II); Cisternae are disc-shaped sacs in the Golgi apparatus (B-IV); Thylakoids are flattened membranous sacs in chloroplast stroma (C-I); Phospholipids form the lipid bilayer of cell membranes (D-III).`;
  } else if (qNum === 7) {
    solution += ` The endomembrane system includes endoplasmic reticulum (ER), Golgi complex, lysosomes, and vacuoles because their functions are coordinated. Mitochondria, chloroplasts, and peroxisomes are not part of it.`;
  } else if (qNum === 8) {
    solution += ` The nucleolus is a non-membrane bound spherical structure in the nucleoplasm that is the active site for ribosomal RNA (rRNA) synthesis.`;
  } else if (qNum === 9) {
    solution += ` Ribosomes are non-membrane bound organelles found in both prokaryotes (70S) and eukaryotes (80S, as well as 70S in mitochondria/plastids).`;
  } else if (qNum === 10) {
    solution += ` RER bears ribosomes (B), mitochondria and plastids have circular DNA (C), and the cytoskeleton consists of microtubules, microfilaments, and intermediate filaments (D). Statement A is false because mitochondria are not part of the endomembrane system, and E is false because mitochondria are double-membraned.`;
  } else if (qNum === 15) {
    solution += ` Centromere holds chromatids during cell division (A-II); Cilium is involved in cell movement (B-III); Cristae are infoldings of inner mitochondrial membrane (C-I); Cell membrane consists of a phospholipid bilayer (D-IV).`;
  } else if (qNum === 16) {
    solution += ` Flemming named chromatin (A-II); Robert Brown discovered the nucleus (B-IV); George Palade discovered ribosomes (C-III); Camillo Golgi described Golgi cisternae (D-I).`;
  } else if (qNum === 18) {
    solution += ` Histones are positively charged basic proteins (A-III); Nucleosome consists of DNA wrapped around a histone octamer (B-IV); Euchromatin is loosely packed transcriptionally active chromatin (C-I); Heterochromatin is densely packed inactive chromatin (D-II).`;
  } else if (qNum === 19) {
    solution += ` Metacentric: middle centromere with two equal arms (A-II); Sub-metacentric: centromere slightly off-center with one shorter and one longer arm (B-III); Acrocentric: centromere close to one end forming one extremely short and one very long arm (C-IV); Telocentric: terminal centromere (D-I).`;
  } else if (qNum === 20) {
    solution += ` F1 particles (ATP synthase) are in mitochondria (A-IV); Histones package chromosome DNA (B-I); Axoneme is the core of cilia and flagella (C-II); Cisternae are Golgi apparatus units (D-III).`;
  } else if (qNum === 22) {
    solution += ` Nucleolus is the site of rRNA synthesis (A-III); Centriole has cartwheel organization (B-II); Leucoplasts store nutrients (C-IV); Golgi apparatus forms glycoproteins and glycolipids (D-I).`;
  } else if (qNum === 23) {
    solution += ` Chloroplasts possess a circular, double-stranded naked DNA molecule.`;
  } else if (qNum === 86) {
    solution += ` The organelle 'A' shown in the figure is the mitochondrion, which produces cellular energy in the form of ATP through oxidative phosphorylation.`;
  } else if (qNum === 88) {
    solution += ` The figure shows rough endoplasmic reticulum (RER) with attached ribosomes, which is actively involved in protein synthesis and secretion.`;
  } else if (qNum === 96) {
    solution += ` Part (B) is the inner mitochondrial membrane which forms infoldings called cristae, increasing the surface area for ATP synthesizing complexes.`;
  } else if (qNum === 100) {
    solution += ` In the diagram of a eukaryotic cell: (A) = Rough endoplasmic reticulum (v), (B) = Smooth endoplasmic reticulum (iv), (C) = Nucleus (viii), (D) = Cytoplasm (iii).`;
  }

  allQuestions.push({
    q_num: qNum,
    exam: header,
    text: questionText,
    options,
    correct_index: correctIndex,
    correct_indices: correctIndices,
    solution,
    image_url: imageUrl,
    marks: 4,
    difficulty: 'medium',
    status: 'normal',
    topic: 'Cell: The Unit of Life'
  });
}

fs.writeFileSync('./backend/scripts/cell_all_questions.json', JSON.stringify(allQuestions, null, 2));
console.log(`Generated ${allQuestions.length} complete questions in cell_all_questions.json`);
