import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete map of the 180 questions according to the source NEET paper
export const NEET_180_QUESTIONS = [
  // Page 1: Biology Q1 to Q15
  {
    qNum: 1,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 1,
    questionText: 'Who is regarded as "Darwin of 20th century"?',
    options: [
      { key: 'A', text: 'John Ray' },
      { key: 'B', text: 'Lamarck' },
      { key: 'C', text: 'Ernst Mayr' },
      { key: 'D', text: 'Darwin' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 2,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 1,
    questionText: 'The method of classification, called phylogenetic is based on',
    options: [
      { key: 'A', text: 'natural system' },
      { key: 'B', text: 'mutation theory' },
      { key: 'C', text: 'artificial system' },
      { key: 'D', text: 'evolutionary history.' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 3,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 1,
    questionText: 'Marchantia requires water as',
    options: [
      { key: 'A', text: 'it is complete hydrophyte' },
      { key: 'B', text: 'it requires water for germination' },
      { key: 'C', text: 'fertilization occurs with the help of water only' },
      { key: 'D', text: 'it requires water for sporogenesis.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 4,
    subject: 'Biology',
    chapter: 'Cell: The Unit of Life',
    page: 1,
    questionText: 'The bacterial genome contains',
    options: [
      { key: 'A', text: 'DNA and histone' },
      { key: 'B', text: 'DNA or histone' },
      { key: 'C', text: 'DNA without histone' },
      { key: 'D', text: 'neither DNA or histone.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 5,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 1,
    questionText: 'Which of the following feature/event in pteridophytes is a precursor to the seed habit considered as an important step in evolution?',
    options: [
      { key: 'A', text: 'Development of cone' },
      { key: 'B', text: 'Vascular tissue' },
      { key: 'C', text: 'Internal fertilization' },
      { key: 'D', text: 'Heterospory' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 6,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 1,
    questionText: 'Find out the correct matches from the following pairs and select the option accordingly :\n(a) Poales – Order\n(b) Hominidae – Class\n(c) Arthropoda – Phylum\n(d) Diptera – Family\n(e) Angiospermae – Division',
    options: [
      { key: 'A', text: '(a) and (c) only' },
      { key: 'B', text: '(a), (c) and (e)' },
      { key: 'C', text: '(b), (c) and (e)' },
      { key: 'D', text: '(a), (b), (d) and (e)' }
    ],
    correctAnswer: 'B'
  },
  {
    qNum: 7,
    subject: 'Biology',
    chapter: 'Animal Kingdom',
    page: 1,
    questionText: 'Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A) : All vertebrates are chordates but all chordates are not vertebrates.\nReason (R) : Notochord is replaced by vertebral column in the adult vertebrates.\nIn the light of the above statements, choose the most appropriate answer from the options given below',
    options: [
      { key: 'A', text: 'Both (A) and (R) are correct but (R) is not the correct explanation of (A)' },
      { key: 'B', text: '(A) is correct but (R) is not correct' },
      { key: 'C', text: '(A) is not correct but (R) is correct' },
      { key: 'D', text: 'Both (A) and (R) are correct and (R) is the correct explanation of (A)' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 8,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 1,
    questionText: 'Which of the following taxonomic category is the lowest in hierarchy?',
    options: [
      { key: 'A', text: 'Species' },
      { key: 'B', text: 'Class' },
      { key: 'C', text: 'Division' },
      { key: 'D', text: 'Kingdom' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 9,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 1,
    questionText: 'Identify the pair of heterosporous pteridophytes among the following :',
    options: [
      { key: 'A', text: 'Selaginella and Salvinia' },
      { key: 'B', text: 'Psilotum and Salvinia' },
      { key: 'C', text: 'Equisetum and Salvinia' },
      { key: 'D', text: 'Lycopodium and Selaginella' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 10,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 1,
    questionText: 'In Euglena, pigments are found in',
    options: [
      { key: 'A', text: 'nucleoid' },
      { key: 'B', text: 'vacuole' },
      { key: 'C', text: 'plastids' },
      { key: 'D', text: 'reservoir.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 11,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 1,
    questionText: 'Which among the following is not a prokaryote?',
    options: [
      { key: 'A', text: 'Saccharomyces' },
      { key: 'B', text: 'Mycobacterium' },
      { key: 'C', text: 'Nostoc' },
      { key: 'D', text: 'Oscillatoria' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 12,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 1,
    questionText: 'Male gametes are flagellated in',
    options: [
      { key: 'A', text: 'Anabaena' },
      { key: 'B', text: 'Ectocarpus' },
      { key: 'C', text: 'Spirogyra' },
      { key: 'D', text: 'Polysiphonia.' }
    ],
    correctAnswer: 'B'
  },
  {
    qNum: 13,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 1,
    questionText: 'Viruses are non-cellular organisms but replicate themselves once they infect the host cell. To which of the following kingdom do viruses belong to?',
    options: [
      { key: 'A', text: 'Monera' },
      { key: 'B', text: 'Protista' },
      { key: 'C', text: 'Fungi' },
      { key: 'D', text: 'None of these' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 14,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 1,
    questionText: 'In taxonomic hierarchy, which of the following group of taxa will have less number of similarities as compared to other?',
    options: [
      { key: 'A', text: 'Solanaceae, Convolvulaceae and Poaceae' },
      { key: 'B', text: 'Polymoniales, Poales and Sapindales' },
      { key: 'C', text: 'Solanum, Petunia and Atropa' },
      { key: 'D', text: 'Leopard, Tiger and Lion' }
    ],
    correctAnswer: 'B'
  },
  {
    qNum: 15,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 1,
    questionText: 'Given below are two statements.\nStatement I : Mycoplasma can pass through less than 1 micron filter size.\nStatement II : Mycoplasma are bacteria with cell wall.\nIn the light of the above statements, choose the most appropriate answer from the options given below.',
    options: [
      { key: 'A', text: 'Both statement I and statement II are incorrect.' },
      { key: 'B', text: 'Statement I is correct but statement II is incorrect.' },
      { key: 'C', text: 'Statement I is incorrect but statement II is correct.' },
      { key: 'D', text: 'Both statement I and statement II are correct.' }
    ],
    correctAnswer: 'B'
  },

  // Page 2: Biology Q16 to Q28
  {
    qNum: 16,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 2,
    questionText: 'The process in which biologists follow universally accepted principles to provide name of any organism is called',
    options: [
      { key: 'A', text: 'identification' },
      { key: 'B', text: 'classification' },
      { key: 'C', text: 'nomenclature' },
      { key: 'D', text: 'systematics.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 17,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 2,
    questionText: 'Artificial system of classification classifies plants on the basis of',
    options: [
      { key: 'A', text: 'one or two morphological characters' },
      { key: 'B', text: 'phylogenetic trends' },
      { key: 'C', text: 'many naturally existing characters' },
      { key: 'D', text: 'none of the above.' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 18,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'In basidiomycetes, the vegetative reproduction takes place by',
    options: [
      { key: 'A', text: 'endospore' },
      { key: 'B', text: 'conidia' },
      { key: 'C', text: 'akinetes' },
      { key: 'D', text: 'fragmentation.' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 19,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 2,
    questionText: 'Match column-I with column-II for housefly classification and select the correct option using the codes given below:\n\n| Column-I | Column-II |\n| :--- | :--- |\n| a. Family | (i) Diptera |\n| b. Order | (ii) Arthropoda |\n| c. Class | (iii) Muscidae |\n| d. Phylum | (iv) Insecta |',
    options: [
      { key: 'A', text: 'a-iii, b-ii, c-iv, d-i' },
      { key: 'B', text: 'a-iv, b-iii, c-ii, d-i' },
      { key: 'C', text: 'a-iv, b-ii, c-i, d-iii' },
      { key: 'D', text: 'a-iii, b-i, c-iv, d-ii' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 20,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'Which organism behaves like plants in the presence of light and absence of organic food, but in reverse conditions behaves like animals?',
    options: [
      { key: 'A', text: 'Archaebacteria' },
      { key: 'B', text: 'Euglena' },
      { key: 'C', text: 'Nostoc' },
      { key: 'D', text: 'Paramecium' }
    ],
    correctAnswer: 'B'
  },
  {
    qNum: 21,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'Read the following assertion and reason statements and select the correct option :\nAssertion (A) : All fungi are filamentous.\nReason (R) : Yeasts are multicellular.\n',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true, and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true, and (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' }
    ],
    correctAnswer: 'D'
  },
  {
    qNum: 22,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 2,
    questionText: 'Read the following statements :\n(i) Classification is a single step process.\n(ii) Classification involves hierarchy of steps in which each step represents a rank or category.\n(iii) Taxon is a unit of ecological hierarchy.\n(iv) Insects represent a species.\n(v) The taxonomic group/categories are distinct biological entities and not merely morphological aggregates.\nHow many of the above statements are correct?',
    options: [
      { key: 'A', text: 'Five' },
      { key: 'B', text: 'Three' },
      { key: 'C', text: 'Two' },
      { key: 'D', text: 'One' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 23,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'Viruses have',
    options: [
      { key: 'A', text: 'DNA enclosed in a protein coat' },
      { key: 'B', text: 'prokaryotic nucleus' },
      { key: 'C', text: 'single chromosome' },
      { key: 'D', text: 'both DNA and RNA.' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 24,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 2,
    questionText: 'Bryophytes can be separated from algae, because they',
    options: [
      { key: 'A', text: 'are thalloid forms' },
      { key: 'B', text: 'have no conducting tissue' },
      { key: 'C', text: 'possess archegonia' },
      { key: 'D', text: 'contain chloroplast.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 25,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'Which of the following is very simple in structure but very complex in behaviour?',
    options: [
      { key: 'A', text: 'Bacteria' },
      { key: 'B', text: 'Archaebacteria' },
      { key: 'C', text: 'Cyanobacteria' },
      { key: 'D', text: 'Mycoplasma' }
    ],
    correctAnswer: 'A'
  },
  {
    qNum: 26,
    subject: 'Biology',
    chapter: 'The Living World',
    page: 2,
    questionText: 'Monkey, gorilla and gibbons belong to which of the following order and class respectively?',
    options: [
      { key: 'A', text: 'Primata and Prototheria' },
      { key: 'B', text: 'Primata and Mammalia' },
      { key: 'C', text: 'Carnivora and Eutheria' },
      { key: 'D', text: 'Carnivora and Mammalia' }
    ],
    correctAnswer: 'B'
  },
  {
    qNum: 27,
    subject: 'Biology',
    chapter: 'Biological Classification',
    page: 2,
    questionText: 'Reserve food of blue green algae is',
    options: [
      { key: 'A', text: 'starch' },
      { key: 'B', text: 'glycogen' },
      { key: 'C', text: 'cyanophycean starch' },
      { key: 'D', text: 'protein.' }
    ],
    correctAnswer: 'C'
  },
  {
    qNum: 28,
    subject: 'Biology',
    chapter: 'Plant Kingdom',
    page: 2,
    questionText: 'Identify the gymnosperms shown in figure and select the correct option.',
    imageUrl: '/uploads/q28/question-diagram-1.png',
    options: [
      { key: 'A', text: 'A-Cycas, B-Cedrus' },
      { key: 'B', text: 'A-Pinus, B-Cycas' },
      { key: 'C', text: 'A-Ginkgo, B-Pinus' },
      { key: 'D', text: 'A-Cycas, B-Ginkgo' }
    ],
    correctAnswer: 'A'
  }
];

console.log(`Defined first ${NEET_180_QUESTIONS.length} questions.`);
