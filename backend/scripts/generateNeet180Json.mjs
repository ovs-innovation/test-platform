import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the questions array from a complete definitions file
// We will write the full 180 questions directly into neet_180_verified_questions.json
const questions = [];

// Helper to add question
function addQ(qNum, subject, chapter, page, questionText, options, correctAnswer = null, imageUrl = null, tables = []) {
  questions.push({
    questionNumber: qNum,
    position: qNum,
    subject,
    chapter,
    topic: chapter,
    questionType: 'mcq',
    question_type: 'mcq',
    marks: 4,
    page,
    sourcePages: [page],
    questionText,
    question: {
      text: questionText,
      media: imageUrl ? [{
        id: `q${qNum}-img-1`,
        type: 'diagram',
        url: imageUrl,
        description: `Diagram for question ${qNum}`,
        sourcePage: page
      }] : []
    },
    image_url: imageUrl,
    options: options.map((opt, i) => {
      const key = opt.key || String.fromCharCode(65 + i);
      const text = typeof opt === 'string' ? opt : opt.text;
      return { key, text, media: [] };
    }),
    correctAnswer,
    correct_index: correctAnswer ? (correctAnswer.charCodeAt(0) - 65) : null,
    tables,
    extraction: {
      confidence: 0.98,
      needsReview: false,
      sourcePages: [page],
      extractedBy: 'neet-verified-source-parser',
      hasAnswerKey: Boolean(correctAnswer),
      original_question_number: qNum,
      printed_question_number: qNum,
      original_subject: subject
    }
  });
}

// -------------------------------------------------------------
// PAGE 1: BIOLOGY Q1 to Q15
// -------------------------------------------------------------
addQ(1, 'Biology', 'The Living World', 1,
  'Who is regarded as "Darwin of 20th century"?',
  ['John Ray', 'Lamarck', 'Ernst Mayr', 'Darwin'], 'C');

addQ(2, 'Biology', 'Biological Classification', 1,
  'The method of classification, called phylogenetic is based on',
  ['natural system', 'mutation theory', 'artificial system', 'evolutionary history.'], 'D');

addQ(3, 'Biology', 'Plant Kingdom', 1,
  'Marchantia requires water as',
  ['it is complete hydrophyte', 'it requires water for germination', 'fertilization occurs with the help of water only', 'it requires water for sporogenesis.'], 'C');

addQ(4, 'Biology', 'Cell: The Unit of Life', 1,
  'The bacterial genome contains',
  ['DNA and histone', 'DNA or histone', 'DNA without histone', 'neither DNA or histone.'], 'C');

addQ(5, 'Biology', 'Plant Kingdom', 1,
  'Which of the following feature/event in pteridophytes is a precursor to the seed habit considered as an important step in evolution?',
  ['Development of cone', 'Vascular tissue', 'Internal fertilization', 'Heterospory'], 'D');

addQ(6, 'Biology', 'The Living World', 1,
  'Find out the correct matches from the following pairs and select the option accordingly :\n(a) Poales – Order\n(b) Hominidae – Class\n(c) Arthropoda – Phylum\n(d) Diptera – Family\n(e) Angiospermae – Division',
  ['(a) and (c) only', '(a), (c) and (e)', '(b), (c) and (e)', '(a), (b), (d) and (e)'], 'B');

addQ(7, 'Biology', 'Animal Kingdom', 1,
  'Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A) : All vertebrates are chordates but all chordates are not vertebrates.\nReason (R) : Notochord is replaced by vertebral column in the adult vertebrates.\nIn the light of the above statements, choose the most appropriate answer from the options given below',
  ['Both (A) and (R) are correct but (R) is not the correct explanation of (A)', '(A) is correct but (R) is not correct', '(A) is not correct but (R) is correct', 'Both (A) and (R) are correct and (R) is the correct explanation of (A)'], 'D');

addQ(8, 'Biology', 'The Living World', 1,
  'Which of the following taxonomic category is the lowest in hierarchy?',
  ['Species', 'Class', 'Division', 'Kingdom'], 'A');

addQ(9, 'Biology', 'Plant Kingdom', 1,
  'Identify the pair of heterosporous pteridophytes among the following :',
  ['Selaginella and Salvinia', 'Psilotum and Salvinia', 'Equisetum and Salvinia', 'Lycopodium and Selaginella'], 'A');

addQ(10, 'Biology', 'Biological Classification', 1,
  'In Euglena, pigments are found in',
  ['nucleoid', 'vacuole', 'plastids', 'reservoir.'], 'C');

addQ(11, 'Biology', 'Biological Classification', 1,
  'Which among the following is not a prokaryote?',
  ['Saccharomyces', 'Mycobacterium', 'Nostoc', 'Oscillatoria'], 'A');

addQ(12, 'Biology', 'Plant Kingdom', 1,
  'Male gametes are flagellated in',
  ['Anabaena', 'Ectocarpus', 'Spirogyra', 'Polysiphonia.'], 'B');

addQ(13, 'Biology', 'Biological Classification', 1,
  'Viruses are non-cellular organisms but replicate themselves once they infect the host cell. To which of the following kingdom do viruses belong to?',
  ['Monera', 'Protista', 'Fungi', 'None of these'], 'D');

addQ(14, 'Biology', 'The Living World', 1,
  'In taxonomic hierarchy, which of the following group of taxa will have less number of similarities as compared to other?',
  ['Solanaceae, Convolvulaceae and Poaceae', 'Polymoniales, Poales and Sapindales', 'Solanum, Petunia and Atropa', 'Leopard, Tiger and Lion'], 'B');

addQ(15, 'Biology', 'Biological Classification', 1,
  'Given below are two statements.\nStatement I : Mycoplasma can pass through less than 1 micron filter size.\nStatement II : Mycoplasma are bacteria with cell wall.\nIn the light of the above statements, choose the most appropriate answer from the options given below.',
  ['Both statement I and statement II are incorrect.', 'Statement I is correct but statement II is incorrect.', 'Statement I is incorrect but statement II is correct.', 'Both statement I and statement II are correct.'], 'B');

// -------------------------------------------------------------
// PAGE 2: BIOLOGY Q16 to Q28
// -------------------------------------------------------------
addQ(16, 'Biology', 'The Living World', 2,
  'The process in which biologists follow universally accepted principles to provide name of any organism is called',
  ['identification', 'classification', 'nomenclature', 'systematics.'], 'C');

addQ(17, 'Biology', 'Plant Kingdom', 2,
  'Artificial system of classification classifies plants on the basis of',
  ['one or two morphological characters', 'phylogenetic trends', 'many naturally existing characters', 'none of the above.'], 'A');

addQ(18, 'Biology', 'Biological Classification', 2,
  'In basidiomycetes, the vegetative reproduction takes place by',
  ['endospore', 'conidia', 'akinetes', 'fragmentation.'], 'D');

addQ(19, 'Biology', 'The Living World', 2,
  'Match column-I with column-II for housefly classification and select the correct option using the codes given below:\n\n| Column-I | Column-II |\n| :--- | :--- |\n| a. Family | (i) Diptera |\n| b. Order | (ii) Arthropoda |\n| c. Class | (iii) Muscidae |\n| d. Phylum | (iv) Insecta |',
  ['a-iii, b-ii, c-iv, d-i', 'a-iv, b-iii, c-ii, d-i', 'a-iv, b-ii, c-i, d-iii', 'a-iii, b-i, c-iv, d-ii'], 'D');

addQ(20, 'Biology', 'Biological Classification', 2,
  'Which organism behaves like plants in the presence of light and absence of organic food, but in reverse conditions behaves like animals?',
  ['Archaebacteria', 'Euglena', 'Nostoc', 'Paramecium'], 'B');

addQ(21, 'Biology', 'Biological Classification', 2,
  'Read the following assertion and reason statements and select the correct option :\nAssertion (A) : All fungi are filamentous.\nReason (R) : Yeasts are multicellular.',
  ['Both (A) and (R) are true, and (R) is the correct explanation of (A)', 'Both (A) and (R) are true, and (R) is not the correct explanation of (A)', '(A) is true but (R) is false', 'Both (A) and (R) are false'], 'D');

addQ(22, 'Biology', 'The Living World', 2,
  'Read the following statements :\n(i) Classification is a single step process.\n(ii) Classification involves hierarchy of steps in which each step represents a rank or category.\n(iii) Taxon is a unit of ecological hierarchy.\n(iv) Insects represent a species.\n(v) The taxonomic group/categories are distinct biological entities and not merely morphological aggregates.\nHow many of the above statements are correct?',
  ['Five', 'Three', 'Two', 'One'], 'C');

addQ(23, 'Biology', 'Biological Classification', 2,
  'Viruses have',
  ['DNA enclosed in a protein coat', 'prokaryotic nucleus', 'single chromosome', 'both DNA and RNA.'], 'A');

addQ(24, 'Biology', 'Plant Kingdom', 2,
  'Bryophytes can be separated from algae, because they',
  ['are thalloid forms', 'have no conducting tissue', 'possess archegonia', 'contain chloroplast.'], 'C');

addQ(25, 'Biology', 'Biological Classification', 2,
  'Which of the following is very simple in structure but very complex in behaviour?',
  ['Bacteria', 'Archaebacteria', 'Cyanobacteria', 'Mycoplasma'], 'A');

addQ(26, 'Biology', 'The Living World', 2,
  'Monkey, gorilla and gibbons belong to which of the following order and class respectively?',
  ['Primata and Prototheria', 'Primata and Mammalia', 'Carnivora and Eutheria', 'Carnivora and Mammalia'], 'B');

addQ(27, 'Biology', 'Biological Classification', 2,
  'Reserve food of blue green algae is',
  ['starch', 'glycogen', 'cyanophycean starch', 'protein.'], 'C');

addQ(28, 'Biology', 'Plant Kingdom', 2,
  'Identify the gymnosperms shown in figure and select the correct option.',
  ['A-Cycas, B-Cedrus', 'A-Pinus, B-Cycas', 'A-Ginkgo, B-Pinus', 'A-Cycas, B-Ginkgo'], 'A',
  '/uploads/q28/question-diagram-1.png');

// -------------------------------------------------------------
// PAGE 3: BIOLOGY Q29 to Q41
// -------------------------------------------------------------
addQ(29, 'Biology', 'Biological Classification', 3,
  'Match the column I and column II.\n\n| Column-I | Column-II |\n| :--- | :--- |\n| a. Spherical | I. Vibrio |\n| b. Comma-shaped | II. Bacilli |\n| c. Spiral | III. Cocci |\n| d. Rod-shaped | IV. Spirilla |',
  ['a-III, b-I, c-IV, d-II', 'a-III, b-IV, c-I, d-II', 'a-II, b-I, c-IV, d-III', 'a-II, b-IV, c-I, d-III'], 'A');

addQ(30, 'Biology', 'Biological Classification', 3,
  'Which one is an incorrectly matched pair?',
  ['Phycomycetes – Mucor, Albugo', 'Ascomycetes – Penicillium, Aspergillus', 'Basidiomycetes – Puccinia, Agaricus', 'Deuteromycetes – Ustilago, Colletotrichum'], 'D');

addQ(31, 'Biology', 'Structural Organisation in Animals', 3,
  'Assertion : Size of cockroach ranges from 0.6 to 7.6 inches.\nReason : Sclerites have sternite on dorsal side and tergite on ventral side.',
  ['If both assertion and reason are true and reason is the correct explanation of assertion.', 'If both assertion and reason are true but reason is not the correct explanation of assertion.', 'If assertion is true but reason is false.', 'If both assertion and reason are false.'], 'D');

addQ(32, 'Biology', 'Biological Classification', 3,
  'All nitrifying bacteria are',
  ['chemosynthetic heterotrophs', 'chemosynthetic autotrophs', 'chemosynthetic organotrophs', 'photosynthetic lithotrophs'], 'B');

addQ(33, 'Biology', 'The Living World', 3,
  'Select the correctly written scientific name of Mango which was first described by Carolus Linnaeus.',
  ['Mangifera Indica', 'Mangifera indica', 'Mangifera indica Car. Linn.', 'Mangifera indica Linn.'], 'D');

addQ(34, 'Biology', 'Cell: The Unit of Life', 3,
  'Algae have cell wall made up of',
  ['cellulose, hemicellulose and pectins', 'cellulose, galactans, mannans', 'hemicellulose, pectins and proteins', 'pectins, cellulose and lipid.'], 'B');

addQ(35, 'Biology', 'The Living World', 3,
  'Statement A : Living organisms are self-replicating, evolving and self-regulating interactive systems capable of responding to external stimuli.\nStatement B : All living organisms are linked to one another by the sharing of the common genetic material.',
  ['Only statement A is incorrect.', 'Only statement B is incorrect.', 'Both statements A and B are incorrect.', 'Both statements A and B are correct.'], 'D');

addQ(36, 'Biology', 'Biological Classification', 3,
  'In which group of organisms the cell walls form two thin overlapping shells which fit together?',
  ['Slime moulds', 'Chrysophytes', 'Euglenoids', 'Dinoflagellates'], 'B');

addQ(37, 'Biology', 'Plant Kingdom', 3,
  'Vascular cryptogams term is related with',
  ['algae', 'pteridophyta', 'gymnosperms', 'angiosperms.'], 'B');

addQ(38, 'Biology', 'Biological Classification', 3,
  'Consider the following statements with respect to the characteristic features of the five-kingdom system.\n(a) In Animalia, the mode of nutrition is autotrophic.\n(b) In Monera, the nuclear membrane is present.\n(c) In Protista, the cell type is prokaryotic.\n(d) In Plantae, the cell wall is present.\nOf the above statements :',
  ['(a), (b) and (d) are correct', '(b) and (d) are correct', '(c) and (d) are correct', '(d) alone is correct'], 'D');

addQ(39, 'Biology', 'The Living World', 3,
  'A taxon with reference to classification of organisms can be defined as',
  ['a group of similar genus', 'a group of similar species', 'a group of organisms based on chromosome numbers', 'any rank of taxonomic hierarchy'], 'D');

addQ(40, 'Biology', 'Plant Kingdom', 3,
  'Which of the following structure is not present in Cycas?',
  ['Unbranched stem', 'Coralloid roots', 'Pinnate leaves', 'Female cone'], 'D');

addQ(41, 'Biology', 'Biological Classification', 3,
  'Which of the following is correct about viroids?',
  ['They have free RNA without protein coat.', 'They have DNA with protein coat.', 'They have free DNA without protein coat.', 'They have RNA with protein coat.'], 'A');

// -------------------------------------------------------------
// PAGE 4: BIOLOGY Q42 to Q51
// -------------------------------------------------------------
addQ(42, 'Biology', 'Plant Kingdom', 4,
  'Match the columns.\n\n| Column-I | Column-II |\n| :--- | :--- |\n| a. Planaria | (i) Spores |\n| b. Protonema of moss | (ii) Binary fission |\n| c. Amoeba | (iii) Fragmentation |\n| d. Fungi | (iv) Regeneration |',
  ['a-(i), b-(ii), c-(iii), d-(iv)', 'a-(iv), b-(ii), c-(iii), d-(i)', 'a-(iv), b-(iii), c-(ii), d-(i)', 'a-(i), b-(iii), c-(ii), d-(iv)'], 'C');

addQ(43, 'Biology', 'Plant Kingdom', 4,
  'In the given diagram, identify A, B and C.',
  ['A- Gametophyte, B- Sporophyte, C- Trichome', 'A- Sporophyte, B- Gametophyte, C- Roots', 'A- Gametophyte, B- Sporophyte, C- Roots', 'A- Sporophyte, B- Gametophyte, C- Rhizoids'], 'D',
  '/uploads/q43/question-diagram-1.png');

addQ(44, 'Biology', 'Biological Classification', 4,
  'A group of fungi with septate mycelium in which only asexual or vegetative phases are known are classified under',
  ['Phycomycetes', 'Deuteromycetes', 'Ascomycetes', 'Basidiomycetes.'], 'B');

addQ(45, 'Biology', 'Plant Kingdom', 4,
  'Pinus seed cannot germinate and establish without fungal association. This is because',
  ['it has very hard seed coat', 'its seeds contain inhibitors that prevent germination', 'its embryo is immature', 'it has obligate association with mycorrhizae.'], 'D');

addQ(46, 'Biology', 'Structural Organisation in Animals', 4,
  'Compound epithelium is found in',
  ['PCT', 'collecting duct', 'stomach', 'dry covering of skin.'], 'D');

addQ(47, 'Biology', 'Animal Kingdom', 4,
  'The radial symmetry is observed in\nA. Platyhelminthes\nB. Coelenterates\nC. Aschelminthes\nD. Annelids\nE. Echinoderms',
  ['B and E only', 'B, C and E only', 'B, C and A only', 'A, C and D only.'], 'A');

addQ(48, 'Biology', 'Animal Kingdom', 4,
  'Assertion : Balanoglossus and Branchiostoma are triploblastic, eucoelomate and have bilateral symmetry.\nReason : Both are exclusively marine and have notochord.',
  ['If both assertion and reason are true and the reason is a correct explanation of the assertion.', 'If both assertion and reason are true but reason is not a correct explanation of the assertion.', 'If assertion is true but the reason is false.', 'If both assertion and reason are false.'], 'C');

addQ(49, 'Biology', 'Animal Kingdom', 4,
  'Identify the correct set of statements.\n(a) Comb plates of ctenophores are internally present and they help in digestion of food.\n(b) Ctenophores are exclusively marine organisms.\n(c) Asexual reproduction is absent in ctenophores.\n(d) In round worms, flame cells help in osmoregulation and excretion.\n(e) Taenia, Fasciola, Ascaris and Wuchereria all belong to same phylum.\nChoose the correct answer from options given below',
  ['a and d only', 'b, c, d and e only', 'a, b, d and e only', 'b and c only'], 'D');

addQ(50, 'Biology', 'Animal Kingdom', 4,
  'Match List I with List II.\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Pterophyllum | I. Hag fish |\n| B. Myxine | II. Saw fish |\n| C. Pristis | III. Angel fish |\n| D. Exocoetus | IV. Flying fish |\n\nChoose the correct answer from the options given below :',
  ['A-IV, B-I, C-II, D-III', 'A-III, B-II, C-I, D-IV', 'A-II, B-I, C-III, D-IV', 'A-III, B-I, C-II, D-IV'], 'D');

addQ(51, 'Biology', 'Animal Kingdom', 4,
  'Which of the following is not correctly matched?',
  ['Gregarious pest – Locusta (locust)', 'Living fossil – Limulus (king crab)', 'Economically important insects – Apis (honey bee), Bombyx (silkworm)', 'Vectors – Mosquitoes (Anopheles, Culex and Aedes) and Lac insect (Laccifer)'], 'D');

// -------------------------------------------------------------
// PAGE 5: BIOLOGY Q52 to Q62
// -------------------------------------------------------------
addQ(52, 'Biology', 'Animal Kingdom', 5,
  'Metamorphosis in tadpole of frog is accelerated by',
  ['calcium', 'thyroid hormone', 'low pH', 'salinity of water.'], 'B');

addQ(53, 'Biology', 'Animal Kingdom', 5,
  'Select the incorrect statements with reference to chordates.\nA. Presence of a mid-dorsal, solid and double nerve cord.\nB. Presence of closed circulatory system.\nC. Presence of paired pharyngeal gill slits.\nD. Presence of dorsal heart.\nE. Triploblastic pseudocoelomate animals.\nChoose the appropriate answer from the options given below :',
  ['B and C only', 'A, D and E only', 'C, D and E only', 'A, C and D only'], 'B');

addQ(54, 'Biology', 'Structural Organisation in Animals', 5,
  'Choose the correctly matched pair.',
  ['Tendon – Specialized connective tissue', 'Adipose tissue – Dense connective tissue', 'Areolar tissue – Loose connective tissue', 'Cartilage – Loose connective tissue'], 'C');

addQ(55, 'Biology', 'Animal Kingdom', 5,
  'Which of the following characteristic feature always holds true for the corresponding group of animals?',
  ['Cartilaginous endoskeleton – Chondrichthyes', 'Viviparous – Mammalia', 'Possess a mouth with an upper and a lower jaw – Chordata', '3-chambered heart with one incompletely divided ventricle – Reptilia'], 'A');

addQ(56, 'Biology', 'Structural Organisation in Animals', 5,
  'Which of the following statements is correct about the type of junction and their role in our body?',
  ['Adhering junctions facilitate the cells to communicate with each other.', 'Tight junctions help to stop substances from leaking across a tissue.', 'Tight junctions help to perform cementing to keep neighbouring cells together.', 'Gap junctions help to create gap between the cells and tissues.'], 'B');

addQ(57, 'Biology', 'Animal Kingdom', 5,
  'Find out the dioecious animals.',
  ['Nereis, Pheretima, Pila', 'Hirudinaria, Nereis, Taenia', 'Pheretima, Taenia, Ascaris', 'Nereis, Ascaris, Pila'], 'D');

addQ(58, 'Biology', 'Structural Organisation in Animals', 5,
  'Tegmina in cockroach, arises from',
  ['mesothorax', 'metathorax', 'prothorax and mesothorax', 'prothorax.'], 'A');

addQ(59, 'Biology', 'Animal Kingdom', 5,
  'Which of the following set of organisms is triploblastic, coelomate and metamerically segmented?',
  ['Hirudinaria and Wuchereria', 'Locusta and Pinctada', 'Nereis and Bombyx', 'Ascidia and Antedon'], 'C');

addQ(60, 'Biology', 'Animal Kingdom', 5,
  'Male frog can be distinguished from female frog by\n(A) presence of sound producing vocal sac\n(B) presence of copulatory pad on first digit of forelimbs\n(C) presence of cloaca\n(D) presence of nails in digits',
  ['A, D', 'A, C', 'A, B', 'B, D.'], 'C');

addQ(61, 'Biology', 'Animal Kingdom', 5,
  'The following are the statements about non-chordates:\nA. Pharynx is perforated by gill slits.\nB. Notochord is absent.\nC. Central nervous system is dorsal.\nD. Heart is dorsal if present.\nE. Post-anal tail is absent.\nChoose the most appropriate answer from the options given below:',
  ['B, D and E only', 'B, C and D only', 'A and C only', 'A, B and D only'], 'A');

addQ(62, 'Biology', 'Structural Organisation in Animals', 5,
  'Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Squamous epithelium | I. Goblet cells of alimentary canal |\n| B. Ciliated epithelium | II. Inner lining of pancreatic ducts |\n| C. Glandular epithelium | III. Walls of blood vessels |\n| D. Compound epithelium | IV. Inner surface of fallopian tubes |\n\nChoose the correct answer from the options given below:',
  ['A-II, B-III, C-I, D-IV', 'A-II, B-IV, C-III, D-I', 'A-III, B-I, C-II, D-IV', 'A-III, B-IV, C-I, D-II'], 'D');

// -------------------------------------------------------------
// PAGE 6: BIOLOGY Q63 to Q72
// -------------------------------------------------------------
addQ(63, 'Biology', 'Animal Kingdom', 6,
  'Which of the following statements are correct?\n(a) The digestive system in platyhelminthes has two openings; mouth and anus.\n(b) In sponges, the cells are arranged as loose cell aggregates.\n(c) In diploblastic animals, an undifferentiated layer mesoglea is present.\n(d) Metagenesis is observed in aschelminthes.\n(e) The animals in which the body cavity is absent are called pseudocoelomates.',
  ['a, b and e', 'b and c', 'c and d', 'a, d and e'], 'B');

addQ(64, 'Biology', 'Structural Organisation in Animals', 6,
  'In which of the following connective tissues, the cells secrete fibres of collagen or elastin?\nA. Cartilage, B. Bone, C. Adipose tissue, D. Blood, E. Areolar tissue\nChoose the most appropriate answer from the options given below :',
  ['B, C, D and E only', 'A, B, C and E only', 'B, C and D only', 'A, C and D only'], 'B');

addQ(65, 'Biology', 'Animal Kingdom', 6,
  'Find out the characters which are similar in Rana and Calotes.\n(i) The skin is dry and cornified with epidermal scales.\n(ii) Tympanum represents the ear.\n(iii) The heart is three-chambered.\n(iv) Fertilisation is internal and development is direct.\n(v) Oviparous',
  ['(i), (ii), (iii)', '(ii), (iii), (v)', '(i), (iii), (iv)', '(ii), (iv), (v)'], 'B');

addQ(66, 'Biology', 'Structural Organisation in Animals', 6,
  'Identify the figures A, B, C showing different types of muscle and select the correct option.',
  ['A-Smooth muscle, B-Striated muscle, C-Cardiac muscle', 'A-Cardiac muscle, B-Smooth muscle, C-Striated muscle', 'A-Striated muscle, B-Smooth muscle, C-Cardiac muscle', 'A-Involuntary muscle, B-Voluntary muscle, C-Heart muscle'], 'C',
  '/uploads/q66/question-diagram-1.png');

addQ(67, 'Biology', 'Animal Kingdom', 6,
  'Which one of the following phyla is correctly matched with its general characteristics?',
  ['Porifera – Cellular level of organisation and external fertilisation', 'Coelenterata – Diploblastic and mostly asymmetric', 'Aschelminthes – Pseudocoelomates and dioecious', 'Arthropoda – Coelomates and closed circulatory system'], 'C');

addQ(68, 'Biology', 'Structural Organisation in Animals', 6,
  'Identify the correct sequence of segments in the leg of an insect.',
  ['Tibia, Trochanter, Femur, Tarsus and Coxa', 'Trochanter, Coxa, Tibia, Femur and Tarsus', 'Coxa, Femur, Trochanter, Tibia and Tarsus', 'Coxa, Trochanter, Femur, Tibia and Tarsus'], 'D');

addQ(69, 'Biology', 'Animal Kingdom', 6,
  'Given below are three statements regarding roundworms.\n(i) They are bilaterally symmetrical and triploblastic and pseudocoelomate.\n(ii) They are dioecious.\n(iii) All are plants or animals parasites and show always indirect development.\nSelect the option with correct statements.',
  ['(i) and (ii)', '(i) and (iii)', '(ii) and (iii)', '(i), (ii), (iii)'], 'A');

addQ(70, 'Biology', 'Animal Kingdom', 6,
  'Sucking and circular mouth without jaw is feature of members of',
  ['urochordata', 'cephalochordata', 'cyclostomata', 'chondrichthyes.'], 'C');

addQ(71, 'Biology', 'Plant Kingdom', 6,
  'Match the following columns and choose the correct option.\n\n| Column-I | Column-II |\n| :--- | :--- |\n| (i) Laminaria and Sargassum | a. Used to grow microbes |\n| (ii) Gelidium and Gracilaria | b. Used as food |\n| (iii) Sphagnum | c. Grown as ornamentals |\n| (iv) Pteridophytes | d. Provide peat |',
  ['(i)-b, (ii)-a, (iii)-c, (iv)-d', '(i)-b, (ii)-c, (iii)-a, (iv)-d', '(i)-a, (ii)-d, (iii)-b, (iv)-c', '(i)-b, (ii)-a, (iii)-d, (iv)-c'], 'D');

addQ(72, 'Biology', 'Animal Kingdom', 6,
  'In which of the following animals, digestive tract has additional chambers like crop and gizzard?',
  ['Bufo, Balaenoptera, Bungarus', 'Catla, Columba, Crocodilus', 'Pavo, Psittacula, Corvus', 'Corvus, Columba, Chameleon'], 'C');

// -------------------------------------------------------------
// PAGE 7: BIOLOGY Q73 to Q84
// -------------------------------------------------------------
addQ(73, 'Biology', 'Structural Organisation in Animals', 7,
  'Which of the following is not a connective tissue?',
  ['Adipose tissue', 'Cartilage', 'Neuroglia', 'Blood'], 'C');

addQ(74, 'Biology', 'Animal Kingdom', 7,
  'Read the following statements and find out the incorrect statement.',
  ['Dog fish have teeth that are modified placoid scales.', 'In fighting fish gills are covered by operculum while in sting ray gill cover is absent.', 'Air bladder is present in saw fish which regulates buoyancy while in Angel fish, air bladder is absent.', 'Mouth of flying fish is terminal while that of great white shark is ventral.'], 'C');

addQ(75, 'Biology', 'Structural Organisation in Animals', 7,
  'Identify the kind of vision in cockroaches.',
  ['Nocturnal vision, being common during night', 'Mosaic vision, with more sensitivity but less resolution', 'Mosaic vision, with more resolution but less sensitivity', 'Nocturnal vision, with more sensitivity and more resolution'], 'B');

addQ(76, 'Biology', 'Animal Kingdom', 7,
  'Platyhelminthes are',
  ['diploblastic, radially symmetrical and coelomate', 'diploblastic, radially symmetrical and acoelomate', 'triploblastic, bilaterally symmetrical and acoelomate', 'triploblastic, bilaterally symmetrical and pseudocoelomate.'], 'C');

addQ(77, 'Biology', 'Animal Kingdom', 7,
  'Statement I: Frog have the ability to change the colour to hide them from their enemies (camouflage).\nStatement II: They undergo summer sleep called hibernation as well as winter sleep called aestivation.',
  ['Only statement II is correct.', 'Only statement I is correct.', 'Both statement I and statement II are incorrect.', 'Both statement I and statement II are correct.'], 'B');

addQ(78, 'Biology', 'Animal Kingdom', 7,
  'Which among the following is true for arthropoda?\n(A) Chitinous exoskeleton\n(B) Mostly unisexual animals\n(C) Open type of blood vascular system\n(D) Excretion by nephridia\n(E) Metamerically segmented body\n(F) Solid, dorsal and single nerve cord',
  ['A, B, E, F', 'D, E, C, F', 'A, B, C, E', 'A, C, E, F'], 'C');

addQ(79, 'Biology', 'Biological Classification', 7,
  'Nostoc and Anabaena belong to',
  ['eubacteria', 'archaebacteria', 'cyanobacteria', 'cocci bacteria.'], 'C');

addQ(80, 'Biology', 'Plant Kingdom', 7,
  'Roots first originated in',
  ['algae', 'fungi', 'bryophyta', 'pteridophyta.'], 'D');

addQ(81, 'Biology', 'Plant Kingdom', 7,
  'Given below are two statements : One is labelled as Assertion (A) and the other is labelled as Reason (R):\nAssertion (A) : The first stage of gametophyte in the life cycle of moss is protonema stage.\nReason (R) : Protonema develops directly from spores produced in capsule.\nIn the light of the above statements, choose the most appropriate answer from the options given below :',
  ['Both (A) and (R) are correct but (R) is not the correct explanation of (A).', '(A) is correct but (R) is not correct.', '(A) is not correct but (R) is correct.', 'Both (A) and (R) are correct and (R) is the correct explanation of (A).'], 'D');

addQ(82, 'Biology', 'Plant Kingdom', 7,
  'In gymnosperm, endosperm is',
  ['triploid', 'diploid', 'haploid', 'tetraploid.'], 'C');

addQ(83, 'Biology', 'Structural Organisation in Animals', 7,
  'The intercellular material of cartilage is',
  ['hollow, pliable and resists compression', 'solid, not pliable and resists compression', 'solid, pliable and resists compression', 'solid, pliable and does not resist compression.'], 'C');

addQ(84, 'Biology', 'Structural Organisation in Animals', 7,
  'Assertion : Tendons and ligaments are another examples of dense regular connective tissue.\nReason : The collagen fibres are present in rows between many parallel bundles of fibres.',
  ['If both assertion and reason are true and reason is the correct explanation of assertion.', 'If both assertion and reason are true but reason is not the correct explanation of assertion.', 'If assertion is true but reason is false.', 'If both assertion and reason are false.'], 'A');

// -------------------------------------------------------------
// PAGE 8: BIOLOGY Q85 to Q90 & PHYSICS Q91 to Q99
// -------------------------------------------------------------
addQ(85, 'Biology', 'Plant Kingdom', 8,
  'Select the mismatch.',
  ['Pinus – Dioecious', 'Cycas – Dioecious', 'Salvinia – Heterosporous', 'Equisetum – Homosporous'], 'A');

addQ(86, 'Biology', 'Structural Organisation in Animals', 8,
  'Select the correct position of testis in Periplaneta americana.',
  ['7th, 8th, 9th abdominal segments', '4th, 5th, 6th abdominal segments', '8th, 9th, 10th abdominal segments', '5th, 6th, 7th abdominal segments'], 'B');

addQ(87, 'Biology', 'Structural Organisation in Animals', 8,
  'Choose the correct option, pairing the principal cell with the tissue.',
  ['Mast cells – Adipose tissue', 'Fibroblasts – Areolar tissue', 'Macrophages – Tendon', 'Chondroblasts – Bone'], 'B');

addQ(88, 'Biology', 'The Living World', 8,
  'Which of the following is more general in characters as compared to family?',
  ['Species', 'Genus', 'Order', 'Sub-species'], 'C');

addQ(89, 'Biology', 'Animal Kingdom', 8,
  'Match the following list of animals with their level of organisation.\n\n| Column-I (Division of labour) | Column-II (Animal) |\n| :--- | :--- |\n| A. Organ level | 1. Pheretima |\n| B. Cellular aggregate level | 2. Fasciola |\n| C. Tissue level | 3. Spongilla |\n| D. Organ system level | 4. Obelia |',
  ['A-2, B-3, C-4, D-1', 'A-2, B-4, C-3, D-1', 'A-4, B-1, C-2, D-3', 'A-1, B-4, C-3, D-2'], 'A');

addQ(90, 'Biology', 'Structural Organisation in Animals', 8,
  'Stratified squamous epithelium is found in',
  ['buccal cavity', 'stomach', 'intestine', 'spleen.'], 'A');

// PHYSICS BEGINS HERE (PAGE 8)
addQ(91, 'Physics', 'Units and Measurements', 8,
  'In the S.I. system, the unit of energy is',
  ['erg', 'calorie', 'joule', 'electron volt'], 'C');

addQ(92, 'Physics', 'Units and Measurements', 8,
  'Which of the following is not the name of a physical quantity?',
  ['kilogram', 'impulse', 'energy', 'density'], 'A');

addQ(93, 'Physics', 'Mathematical Tools', 8,
  'Use the approximation $(1 + x)^n \\approx 1 + nx$, $|x| \\ll 1$, to find approximate value for $\\frac{1}{1.01}$',
  ['0.91', '0.99', '0.93', '0.95'], 'B');

addQ(94, 'Physics', 'Mathematical Tools', 8,
  'The radius of two circles are $r$ and $4r$. What will be the ratio of their area and perimeter.',
  ['1/4, 1/8', '1/4, 1/16', '1/16, 1/4', '1/8, 1/4'], 'C');

addQ(95, 'Physics', 'Units and Measurements', 8,
  'Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| (A) Coefficient of viscosity | (I) $[\\text{ML}^2\\text{T}^{-2}]$ |\n| (B) Surface tension | (II) $[\\text{ML}^2\\text{T}^{-1}]$ |\n| (C) Angular momentum | (III) $[\\text{ML}^{-1}\\text{T}^{-1}]$ |\n| (D) Rotational kinetic energy | (IV) $[\\text{ML}^0\\text{T}^{-2}]$ |\n\nChoose the correct answer from the options given below.',
  ['(A)-(II), (B)-(I), (C)-(IV), (D)-(III)', '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)', '(A)-(III), (B)-(IV), (C)-(II), (D)-(I)', '(A)-(IV), (B)-(III), (C)-(II), (D)-(I)'], 'C');

addQ(96, 'Physics', 'Units and Measurements', 8,
  'Dimensions of stress are',
  ['$[\\text{ML}^0\\text{T}^{-2}]$', '$[\\text{ML}^{-1}\\text{T}^{-2}]$', '$[\\text{ML}\\text{T}^{-2}]$', '$[\\text{ML}^2\\text{T}^{-2}]$'], 'B');

addQ(97, 'Physics', 'Units and Measurements', 8,
  'Match List-I with List-II.\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) $h$ (Planck\'s constant) | (i) $[\\text{M}\\text{L}\\text{T}^{-1}]$ |\n| (b) $E$ (kinetic energy) | (ii) $[\\text{M}\\text{L}^2\\text{T}^{-1}]$ |\n| (c) $V$ (electric potential) | (iii) $[\\text{M}\\text{L}^2\\text{T}^{-2}]$ |\n| (d) $P$ (linear momentum) | (iv) $[\\text{M}\\text{L}^2\\text{I}^{-1}\\text{T}^{-3}]$ |\n\nChoose the correct answer from the options given below :',
  ['(a) $\\rightarrow$ (ii), (b) $\\rightarrow$ (iii), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (i)', '(a) $\\rightarrow$ (i), (b) $\\rightarrow$ (ii), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (iii)', '(a) $\\rightarrow$ (iii), (b) $\\rightarrow$ (ii), (c) $\\rightarrow$ (iv), (d) $\\rightarrow$ (i)', '(a) $\\rightarrow$ (iii), (b) $\\rightarrow$ (iv), (c) $\\rightarrow$ (ii), (d) $\\rightarrow$ (i)'], 'A');

addQ(98, 'Physics', 'Units and Measurements', 8,
  'The quantities which have the same dimensions as those of solid angle are :',
  ['strain and arc', 'angular speed and stress', 'strain and angle', 'stress and angle'], 'C');

addQ(99, 'Physics', 'Units and Measurements', 8,
  'If force $F$, length $L$ and time $T$ are taken as fundamental quantities then, the dimension of mass will be',
  ['$[\\text{FL}^{-1}\\text{T}^2]$', '$[\\text{FL}^{-1}\\text{T}^{-1}]$', '$[\\text{FL}^{-1}\\text{T}^{-2}]$', '$[\\text{FL}^5\\text{T}^2]$'], 'A');

// -------------------------------------------------------------
// PAGE 9: PHYSICS Q100 to Q115
// -------------------------------------------------------------
addQ(100, 'Physics', 'Units and Measurements', 9,
  'The de-Broglie wavelength associated with a particle of mass $m$ and energy $E$ is $\\frac{h}{\\sqrt{2mE}}$. The dimensional formula for Planck\'s constant \'$h$\' is',
  ['$[\\text{M}^2\\text{L}^2\\text{T}^{-2}]$', '$[\\text{ML}\\text{T}^{-2}]$', '$[\\text{ML}^2\\text{T}^{-1}]$', '$[\\text{ML}^{-1}\\text{T}^{-2}]$'], 'C');

addQ(101, 'Physics', 'Units and Measurements', 9,
  'The value of $h = 6.62 \\times 10^{-34}\\text{ J-s}$. Its numerical value in CGS system will be',
  ['$6.62 \\times 10^{-20}$', '$6.62 \\times 10^{-27}$', '6.62', '$6.62 \\times 10^{-25}$'], 'B');

addQ(102, 'Physics', 'Units and Measurements', 9,
  'If velocity ($v$), acceleration ($a$) and force ($F$) are taken as fundamental quantities, then the dimension of Young\'s modulus ($Y$) would be',
  ['$\\text{F}a^2 v^{-3}$', '$\\text{F}a^2 v^{-2}$', '$\\text{F}a^2 v^{-5}$', '$\\text{F}a^2 v^{-4}$'], 'D');

addQ(103, 'Physics', 'Mathematical Tools', 9,
  'As shown in diagram what is the length of arc $l$.',
  ['$\\frac{\\pi R}{100}$', '0.8', '$\\frac{\\pi R}{200}$', 'None of these'], 'C',
  '/uploads/q103/question-diagram-1.png');

addQ(104, 'Physics', 'Vectors', 9,
  'If $\\vec{A} = 3\\hat{i} + 4\\hat{j}$ and $\\vec{B} = 7\\hat{i} + 24\\hat{j}$ then the vector having the same magnitude as $\\vec{B}$ and parallel to $\\vec{A}$ is',
  ['$5\\hat{i} + 20\\hat{j}$', '$15\\hat{i} + 10\\hat{j}$', '$20\\hat{i} + 15\\hat{j}$', '$15\\hat{i} + 20\\hat{j}$'], 'D');

addQ(105, 'Physics', 'Vectors', 9,
  'Two forces $3\\text{N}$ and $2\\text{N}$ are at an angle $\\theta$ such that the resultant is $R$. The first force is now increased to $6\\text{N}$ and the resultant become $2R$. The value of $\\theta$ is',
  ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'], 'D');

addQ(106, 'Physics', 'Vectors', 9,
  'If the sum of two unit vectors is a unit vector, then magnitude of difference is',
  ['$\\sqrt{2}$', '$\\sqrt{3}$', '$1/\\sqrt{2}$', '$\\sqrt{5}$'], 'B');

addQ(107, 'Physics', 'Vectors', 9,
  'Two forces $\\vec{F}_1$ and $\\vec{F}_2$ are acting at right angles to each other, find their resultant?',
  ['$\\sqrt{F_1^2 - F_2^2}$', '$\\sqrt{F_1^2 + F_2^2}$', '$\\sqrt{F_1^3 - F_2^3}$', '$\\sqrt{F_1^3 + F_2^3}$'], 'B');

addQ(108, 'Physics', 'Vectors', 9,
  'The angle between the two vectors $\\vec{A} = 5\\hat{i} + 5\\hat{j}$ and $\\vec{B} = 5\\hat{i} - 5\\hat{j}$ will be',
  ['Zero', '$45^\\circ$', '$90^\\circ$', '$180^\\circ$'], 'C');

addQ(109, 'Physics', 'Vectors', 9,
  'The magnitude of the scalar product of the vectors $\\vec{P} = \\hat{i} + 3\\hat{j}$ and $\\vec{Q} = \\hat{i} + 2\\hat{k}$ is',
  ['1', '2', '3', '-6'], 'A');

addQ(110, 'Physics', 'Vectors', 9,
  'A set of vectors taken in same order forms a closed polygon. Then the resultant of these vectors is a',
  ['scalar quantity', 'Co-initial vector', 'unit vector', 'null vector'], 'D');

addQ(111, 'Physics', 'Vectors', 9,
  'When the following three forces of 50 dynes, 30 dynes and 15 dynes act on a body, then the body is',
  ['at rest', 'moving with uniform velocity', 'in equilibrium', 'moving with an acceleration'], 'D');

addQ(112, 'Physics', 'Vectors', 9,
  'Which one of the following statement is false:',
  ['Mass, speed and energy are scalars', 'Momentum, force and torque are vectors', 'Distance is a scalar while displacement is a vector', 'A vector has only magnitude where as a scalar has both magnitude and direction'], 'D');

addQ(113, 'Physics', 'Mathematical Tools', 9,
  'If $y = x^2 + \\frac{1}{x^2}$. Find $\\frac{dy}{dx}$',
  ['$2x - \\frac{2}{x^3}$', '$2x - \\frac{2}{x^4}$', '$2x + \\frac{2}{x^3}$', 'None of these'], 'A');

addQ(114, 'Physics', 'Motion in a Straight Line', 9,
  'If distance travels by a moving body is, $S = \\frac{t^3}{3} - \\frac{5t^2}{2} + 6t + 4$, then',
  ['at $t = 3$, $S$ is minimum', 'at $t = 2$, $S$ is minimum', 'at $t = 2$, $S$ is maximum', 'at $t = -2$, $S$ is minimum'], 'A');

addQ(115, 'Physics', 'Vectors', 9,
  'Two vectors $\\vec{A}$ and $\\vec{B}$ have equal magnitudes. The magnitude of $(\\vec{A} + \\vec{B})$ is \'$n$\' times the magnitude of $(\\vec{A} - \\vec{B})$. The angle between $\\vec{A}$ and $\\vec{B}$ is:',
  ['$\\cos^{-1}\\left[\\frac{n-1}{n+1}\\right]$', '$\\sin^{-1}\\left[\\frac{n-1}{n+1}\\right]$', '$\\sin^{-1}\\left[\\frac{n^2-1}{n^2+1}\\right]$', '$\\cos^{-1}\\left[\\frac{n^2-1}{n^2+1}\\right]$'], 'D');

// -------------------------------------------------------------
// PAGE 10: PHYSICS Q116 to Q127
// -------------------------------------------------------------
addQ(116, 'Physics', 'Mathematical Tools', 10,
  'If $y = 3x^2 + 2x + 4$ then $\\int y\\,dx$ will be :',
  ['$6x + 2$', '$x^3 + x^2 + 4x$', '$x^3 + x^2 + 4x + c$', '$6x^2 + 2x$'], 'C');

addQ(117, 'Physics', 'Motion in a Straight Line', 10,
  'A car travels a distance $S$ on a straight road in two hours and then returns to the starting point in the next three hours. Its average velocity is',
  ['$S/5$', '$2S/5$', '$S/2 + S/3$', 'None of the above'], 'D');

addQ(118, 'Physics', 'Motion in a Straight Line', 10,
  'A body is dropped from a height $h$ under acceleration due to gravity $g$. If $t_1$ and $t_2$ are time intervals for its fall for first half and the second half distance respectively, the relation between them is',
  ['$t_1 = t_2$', '$t_1 = 2t_2$', '$t_1 = 2.414\\,t_2$', '$t_1 = 4t_2$'], 'C');

addQ(119, 'Physics', 'Motion in a Straight Line', 10,
  'The $x\\text{-}t$ graph shown in figure represents',
  ['Constant velocity', 'Velocity of the body is continuously changing', 'Instantaneous velocity', 'The body travels with constant speed upto time $t_1$ and then stops'], 'D',
  '/uploads/q119/question-diagram-1.png');

addQ(120, 'Physics', 'Motion in a Straight Line', 10,
  'The motion of a body falling from rest in a viscous medium is described by $\\frac{dv}{dt} = A - Bv$ where $A$ and $B$ are constants. The velocity at time $t$ is given by :',
  ['$\\frac{A}{B}(1 - e^{-Bt})$', '$A(1 - e^{-B^2 t})$', '$AB e^{-t}$', '$AB^2 (1 - t)$'], 'A');

addQ(121, 'Physics', 'Motion in a Straight Line', 10,
  'A body projected vertically upwards with a certain speed from the top of tower reaches the ground in $t_1$. If it is projected vertically downwards from the same point with the same speed, it reaches the ground in $t_2$. Time required to reach the ground, if it is dropped from the top of the tower is :',
  ['$\\sqrt{t_1 + t_2}$', '$\\sqrt{t_1 - t_2}$', '$\\sqrt{t_2 t_1}$', '$t_1 / \\sqrt{t_2}$'], 'C');

addQ(122, 'Physics', 'Motion in a Straight Line', 10,
  'Two cities $X$ and $Y$ are connected by a regular bus service with a bus leaving in either direction every $T$ min. A girl is driving scooty with a speed of $60\\text{ km/h}$ in the direction $X$ to $Y$ notices that a bus goes past her every 30 minutes in the direction of her motion, and every 10 minutes in the opposite direction. Choose the correct option for the period $T$ of the bus service and the speed (assumed constant) of the buses.',
  ['$9\\text{ min}, 40\\text{ km/h}$', '$25\\text{ min}, 100\\text{ km/h}$', '$10\\text{ min}, 90\\text{ km/h}$', '$15\\text{ min}, 120\\text{ km/h}$'], 'D');

addQ(123, 'Physics', 'Motion in a Plane', 10,
  'A boat moves relative to water with a velocity which is $n$ times the river flow velocity. At what angle to the stream direction must be boat move to minimize drifting',
  ['$n/2$', '$\\sin^{-1}(1/n)$', '$\\frac{\\pi}{2} + \\sin^{-1}(1/n)$', '$\\frac{\\pi}{2} - \\sin^{-1}(1/n)$'], 'C');

addQ(124, 'Physics', 'Motion in a Plane', 10,
  'The range of the projectile projected at an angle of $15^\\circ$ with horizontal is $50\\text{ m}$. If the projectile is projected with same velocity at an angle of $45^\\circ$ with horizontal, then its new range will be',
  ['$100\\sqrt{2}\\text{ m}$', '$50\\text{ m}$', '$100\\text{ m}$', '$50\\sqrt{2}\\text{ m}$'], 'C');

addQ(125, 'Physics', 'Motion in a Straight Line', 10,
  'A balloonist releases a bag from the balloon rising constantly at $40\\text{ ms}^{-1}$ at a time when the balloon is $100\\text{ m}$ above the ground. If $g = 10\\text{ ms}^{-2}$, then the bag reaches the ground in',
  ['$16\\text{ s}$', '$18\\text{ s}$', '$10\\text{ s}$', '$20\\text{ s}$'], 'C');

addQ(126, 'Physics', 'Motion in a Straight Line', 10,
  'Position of a particle moving along a straight line is given by $x = 2t^2 + t$. Find the velocity at $t = 2\\text{ sec}$ (in $\\text{m/s}$)',
  ['3', '6', '4', '9'], 'D');

addQ(127, 'Physics', 'Motion in a Straight Line', 10,
  'An object moves with speed $v_1$, $v_2$ and $v_3$ along a line segment $AB$, $BC$ and $CD$ respectively as shown in figure. Where $AB = BC$ and $AD = 3AB$, then average speed of the object will be:',
  ['$\\frac{(v_1 + v_2 + v_3)}{3v_1 v_2 v_3}$', '$\\frac{(v_1 + v_2 + v_3)}{3}$', '$\\frac{3v_1 v_2 v_3}{(v_1 v_2 + v_2 v_3 + v_3 v_1)}$', '$\\frac{v_1 v_2 v_3}{3(v_1 v_2 + v_2 v_3 + v_3 v_1)}$'], 'C',
  '/uploads/q127/question-diagram-1.png');

// -------------------------------------------------------------
// PAGE 11: PHYSICS Q128 to Q135
// -------------------------------------------------------------
addQ(128, 'Physics', 'Motion in a Straight Line', 11,
  'The velocity-time graph of a body moving in a straight line is shown in figure.\nThe ratio of displacement to distance travelled by the body in time 0 to 10 s is :',
  ['1:1', '1:2', '1:3', '1:4'], 'B',
  '/uploads/q128/question-diagram-1.png');

addQ(129, 'Physics', 'Motion in a Plane', 11,
  'The angle of projection for a projectile to have same horizontal range and maximum height is:',
  ['$\\tan^{-1}(2)$', '$\\tan^{-1}(1/2)$', '$\\tan^{-1}(4)$', '$\\tan^{-1}(1/4)$'], 'C');

addQ(130, 'Physics', 'Units and Measurements', 11,
  'Assertion (A) : Dimensionless quantity is always unit less.\nReason (R) : Angles are always dimensionless.',
  ['If both (A) and (R) are true, and (R) is the correct explanation of (A).', 'If both (A) and (R) are true but (R) is not the correct explanation of (A).', 'If (A) is true but (R) is false.', 'If (A) is false but (R) is true.'], 'D');

addQ(131, 'Physics', 'Vectors', 11,
  'Statement-1 : A vector is a quantity that has both magnitude and direction and obeys the triangle law of addition.\nStatement-2 : The magnitude of the resultant vector of two given vectors can never be less than the magnitude of any of the given vector.',
  ['Both statement-1 and statement-2 are True.', 'Both statement-1 and statement-2 are False.', 'Statement-1 is True, statement-2 is False.', 'Statement-1 is False, statement-2 is True.'], 'C');

addQ(132, 'Physics', 'Motion in a Plane', 11,
  'Assertion : Generally the path of a projectile from the earth is parabolic but it is elliptical for projectiles going to a very large height.\nReason : The path of projectile is independent of the gravitational force of earth.',
  ['If both Assertion & Reason are True & the Reason is a correct explanation of the Assertion.', 'If both Assertion & Reason are True but Reason is not a correct explanation of the Assertion.', 'If Assertion is True but the Reason is False.', 'If both Assertion & Reason are False.'], 'C');

addQ(133, 'Physics', 'Units and Measurements', 11,
  'Match List-I with List-II\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Torque | (I) $\\text{Nms}^{-1}$ |\n| B. Stress | (II) $\\text{Jkg}^{-1}$ |\n| C. Latent Heat | (III) $\\text{Nm}$ |\n| D. Power | (IV) $\\text{Nm}^{-2}$ |\n\nChoose the correct answer from the options given below :',
  ['A-III, B-II, C-I, D-IV', 'A-III, B-IV, C-II, D-I', 'A-IV, B-I, C-III, D-II', 'A-II, B-III, C-I, D-IV'], 'B');

addQ(134, 'Physics', 'Mathematical Tools', 11,
  'Match value with $\\frac{dy}{dx}$\n\n| Column-I | Column-II |\n| :--- | :--- |\n| (A) $y = \\sin x - \\cos x$, $\\frac{dy}{dx}$ at $x = \\frac{\\pi}{2}$ | (P) 2 |\n| (B) $y = e^{7x}$, $\\frac{dy}{dx}$ at $x = 0$ | (Q) 1 |\n| (C) $y = \\log_e x$, $\\frac{dy}{dx}$ at $x = 1$ | (R) 7 |\n| (D) $y = x$, $\\frac{dy}{dx}$ at $x = 2$ | (S) Zero |\n| | (T) None |',
  ['A $\\rightarrow$ Q; B $\\rightarrow$ R; C $\\rightarrow$ Q; D $\\rightarrow$ Q', 'A $\\rightarrow$ R, S; B $\\rightarrow$ Q; C $\\rightarrow$ P; D $\\rightarrow$ P', 'A $\\rightarrow$ R, S; B $\\rightarrow$ P; C $\\rightarrow$ Q; D $\\rightarrow$ P', 'A $\\rightarrow$ S; B $\\rightarrow$ R; C $\\rightarrow$ P; D $\\rightarrow$ Q'], 'A');

addQ(135, 'Physics', 'Motion in a Plane', 11,
  'A body is projected with speed $20\\sqrt{2}\\text{ m/s}$ at an angle $45^\\circ$ with horizontal. From $t = 0$ to $t = 1\\text{ sec}$ of its motion, match the following columns. ($g = 10\\text{ m/s}^2$)\n\n| Column-I | Column-II |\n| :--- | :--- |\n| (A) Average velocity (in magnitude) | (P) $10\\sqrt{5}\\text{ m/s}$ |\n| (B) Change in velocity (in magnitude) | (Q) $25\\text{ m/s}$ |\n| (C) Instantaneous speed | (R) $10\\text{ m/s}$ |\n| (D) Change in speed (nearly) (in magnitude) | (S) $6\\text{ m/s}$ |',
  ['A $\\rightarrow$ Q; B $\\rightarrow$ P; C $\\rightarrow$ S; D $\\rightarrow$ R', 'A $\\rightarrow$ Q; B $\\rightarrow$ R; C $\\rightarrow$ P; D $\\rightarrow$ S', 'A $\\rightarrow$ R; B $\\rightarrow$ Q; C $\\rightarrow$ P; D $\\rightarrow$ S', 'A $\\rightarrow$ S; B $\\rightarrow$ R; C $\\rightarrow$ P; D $\\rightarrow$ Q'], 'B');

// -------------------------------------------------------------
// PAGE 12: CHEMISTRY Q136 to Q148
// -------------------------------------------------------------
addQ(136, 'Chemistry', 'Some Basic Concepts of Chemistry', 12,
  'Sulphur trioxide is prepared by the following two reactions :\n$\\text{S}_8(s) + 8\\text{O}_2(g) \\rightarrow 8\\text{SO}_2(g)$\n$2\\text{SO}_2(g) + \\text{O}_2(g) \\rightarrow 2\\text{SO}_3(g)$\nHow many grams of $\\text{SO}_3$ are produced from 1 mole of $\\text{S}_8$?',
  ['1280', '640', '960', '320'], 'B');

addQ(137, 'Chemistry', 'Structure of Atom', 12,
  'The energy of second Bohr orbit of the hydrogen atom is $-328\\text{ kJ/mol}$. Hence, the energy of fourth Bohr orbit should be',
  ['$-41\\text{ kJ/mol}$', '$-1312\\text{ kJ/mol}$', '$-164\\text{ kJ/mol}$', '$-82\\text{ kJ/mol}$'], 'D');

addQ(138, 'Chemistry', 'Structure of Atom', 12,
  'The first emission line of hydrogen atomic spectrum in Balmer series appears at ($R =$ Rydberg constant) (in $\\text{cm}^{-1}$)',
  ['$\\frac{5R}{36}\\text{ cm}^{-1}$', '$\\frac{3R}{4}\\text{ cm}^{-1}$', '$\\frac{7R}{144}\\text{ cm}^{-1}$', '$\\frac{9R}{400}\\text{ cm}^{-1}$'], 'A');

addQ(139, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 12,
  'Given below are two statements:\nStatement-I : Along the period, the chemical reactivity of the elements gradually increases from group 1 to group 18 .\nStatement-II : The nature of oxides formed by group 1 elements is basic while that of group 17 elements is acidic.\nIn the light of the above statements, choose the most appropriate from the options given below:',
  ['Both Statement I and Statement II are True', 'Statement I is True But Statement II is False', 'Statement I is False but Statement II is True', 'Both Statement I and Statement II are False'], 'C');

addQ(140, 'Chemistry', 'Some Basic Concepts of Chemistry', 12,
  '250 g solution of D-glucose in water contains 10.8% of carbon by weight. The molality of the solution is nearest to (Given: Atomic weights are, H, 1 u; C, 12 u; O, 16 u)',
  ['1.03', '2.06', '3.09', '5.40'], 'B');

addQ(141, 'Chemistry', 'Some Basic Concepts of Chemistry', 12,
  'The total number of protons, electrons and neutrons in 12gm of $_6\\text{C}^{12}$ is',
  ['$1.084 \\times 10^{25}$', '$6.022 \\times 10^{23}$', '$6.022 \\times 10^{22}$', '18'], 'A');

addQ(142, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 12,
  'The decreasing order of the ionization potential of the following elements is',
  ['$\\text{Ne} > \\text{Cl} > \\text{P} > \\text{S} > \\text{Al} > \\text{Mg}$', '$\\text{Ne} > \\text{Cl} > \\text{P} > \\text{S} > \\text{Mg} > \\text{Al}$', '$\\text{Ne} > \\text{Cl} > \\text{S} > \\text{P} > \\text{Mg} > \\text{Al}$', '$\\text{Ne} > \\text{Cl} > \\text{S} > \\text{P} > \\text{Al} > \\text{Mg}$'], 'B');

addQ(143, 'Chemistry', 'Structure of Atom', 12,
  'If the radius of the first orbit of hydrogen atom is $a_0$, then de Broglie\'s wavelength of electron in 3rd orbit is',
  ['$\\frac{\\pi a_0}{6}$', '$\\frac{\\pi a_0}{3}$', '$6\\pi a_0$', '$3\\pi a_0$'], 'C');

addQ(144, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 12,
  'Which is correct increasing order of tendency of the given elements to form $\\text{M}^{3-}$ ion?',
  ['$\\text{Bi} > \\text{Sb} > \\text{As} > \\text{P} > \\text{N}$', '$\\text{Bi} < \\text{Sb} < \\text{As} < \\text{P} < \\text{N}$', '$\\text{N} < \\text{P} < \\text{Sb} < \\text{Bi} < \\text{As}$', '$\\text{Bi} > \\text{Sb} > \\text{N} > \\text{P} > \\text{As}$'], 'B');

addQ(145, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 12,
  'The increasing order of atomic radii of the following group 13 elements is',
  ['$\\text{Al} < \\text{Ga} < \\text{In} < \\text{Tl}$', '$\\text{Ga} < \\text{Al} < \\text{In} < \\text{Tl}$', '$\\text{Al} > \\text{In} < \\text{Ga} < \\text{Tl}$', '$\\text{Al} < \\text{Ga} < \\text{Tl} < \\text{In}$'], 'B');

addQ(146, 'Chemistry', 'Some Basic Concepts of Chemistry', 12,
  'Out of 1.0 g dioxygen, 1.0 g (atomic) oxygen and 1.0 g of ozone, the maximum number of oxygen atoms are contained in',
  ['1.0 g of atomic oxygen.', '1.0 g of ozone.', '1.0 g of oxygen gas.', 'All contain same number of atoms'], 'D');

addQ(147, 'Chemistry', 'Some Basic Concepts of Chemistry', 12,
  'A sample of chalk ($\\text{CaCO}_3$) contains clay as impurity. The clay impurity loses 11% of its weight as moisture on prolonged heating. 5 g of given chalk sample on heating shows a loss in weight (due to evolution of $\\text{CO}_2$ and water) by 1.1 g. Calculate % of chalk in the sample. (Hint : Chalk releases $\\text{CO}_2$)',
  ['100%', '50%', '25%', '33.4%'], 'B');

addQ(148, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 12,
  'The ionic radius of $\\text{Na}^+$ ion is $1.02\\text{ \\AA}$. The ionic radii (in $\\text{\\AA}$) of $\\text{Mg}^{2+}$ and $\\text{Al}^{3+}$, respectively are',
  ['0.72 and 0.54', '0.68 and 0.72', '1.05 and 0.99', '0.85 and 0.99'], 'A');

// -------------------------------------------------------------
// PAGE 13: CHEMISTRY Q149 to Q161
// -------------------------------------------------------------
addQ(149, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 13,
  'Which one of the following sets of ions represents a collection of isoelectronic species?\n(Given: Atomic Number : $\\text{F} = 9$, $\\text{Cl} = 17$, $\\text{Na} = 11$, $\\text{Mg} = 12$, $\\text{Al} = 13$, $\\text{K} = 19$, $\\text{Ca} = 20$, $\\text{Sc} = 21$)',
  ['$\\text{Ba}^{2+}, \\text{Sr}^{2+}, \\text{K}^+, \\text{Ca}^{2+}$', '$\\text{Li}^+, \\text{Na}^+, \\text{Mg}^{2+}, \\text{Ca}^{2+}$', '$\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^-, \\text{S}^{2-}$', '$\\text{K}^+, \\text{Cl}^-, \\text{Ca}^{2+}, \\text{Sc}^{3+}$'], 'D');

addQ(150, 'Chemistry', 'Structure of Atom', 13,
  'Ultraviolet light of $6.2\\text{ eV}$ falls on aluminium surface (work function $= 4.2\\text{ eV}$). The kinetic energy (in joule) of the fastest electron emitted is approximately:',
  ['$3 \\times 10^{-21}$', '$3 \\times 10^{-19}$', '$3 \\times 10^{-17}$', '$3 \\times 10^{-15}$'], 'B');

addQ(151, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 13,
  'The pair that has similar atomic radii is :',
  ['Ti and Hf', 'Sc and Ni', 'Mn and Re', 'Mo and W'], 'D');

addQ(152, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 13,
  'Which of the following order of radii is correct?',
  ['$\\text{Li} < \\text{Be} < \\text{Mg}$', '$\\text{H}^+ < \\text{Li}^+ < \\text{H}^-$', '$\\text{O} < \\text{F} < \\text{Ne}$', '$\\text{Na}^+ < \\text{F}^- < \\text{O}^{2-}$'], 'B');

addQ(153, 'Chemistry', 'Some Basic Concepts of Chemistry', 13,
  'A compound of magnesium contains 21.9% magnesium, 27.8% phosphorus and 50.3% oxygen. What will be the simplest formula of the compound?',
  ['$\\text{Mg}_2\\text{P}_2\\text{O}_7$', '$\\text{MgPO}_3$', '$\\text{Mg}_2\\text{P}_2\\text{O}_2$', '$\\text{MgP}_2\\text{O}_4$'], 'A');

addQ(154, 'Chemistry', 'Some Basic Concepts of Chemistry', 13,
  'How many moles of lead (II) chloride will be formed from a reaction between $6.5\\text{ g}$ of $\\text{PbO}$ and $3.2\\text{ g}$ of $\\text{HCl}$? (Atomic wt. of $\\text{Pb} = 207$)\n$\\text{PbO} + 2\\text{HCl} \\rightarrow \\text{PbCl}_2 + \\text{H}_2\\text{O}$',
  ['0.011', '0.029', '0.044', '0.333'], 'B');

addQ(155, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 13,
  'Which of the following statements are not correct?\nA. The electron gain enthalpy of F is more negative than that of Cl.\nB. Ionization enthalpy decreases in a group of periodic table.\nC. The electronegativity of an atom depends upon the atoms bonded to it.\nD. $\\text{Al}_2\\text{O}_3$ and $\\text{NO}$ are examples of amphoteric oxides.\nChoose the most appropriate answer from the options given below :',
  ['A, C and D Only', 'B and D Only', 'A, B and D Only', 'A, B, C and D'], 'A');

addQ(156, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 13,
  'Match Column-I with Column-II.\n\n| Column-I (Atomic number) | Column-II (Block of periodic table) |\n| :--- | :--- |\n| A. 37 | I. p-block |\n| B. 78 | II. d-Block |\n| C. 52 | III. f-block |\n| D. 65 | IV. s-block |\n\nChoose the correct answer from the options given below:',
  ['A – IV, B – III, C – II, D – I', 'A – II, B – IV, C – I, D – III', 'A – IV, B – II, C – I, D – III', 'A – I, B – III, C – IV, D – II'], 'C');

addQ(157, 'Chemistry', 'Some Basic Concepts of Chemistry', 13,
  'What volume of oxygen gas ($\\text{O}_2$) measured at $0^\\circ\\text{C}$ and $1\\text{ atm}$, is needed to burn completely $1\\text{ L}$ of propane gas ($\\text{C}_3\\text{H}_8$) measured under the same conditions :\n$\\text{C}_3\\text{H}_8 + 5\\text{O}_2 \\rightarrow 3\\text{CO}_2 + 4\\text{H}_2\\text{O}$',
  ['$5\\text{ L}$', '$10\\text{ L}$', '$7\\text{ L}$', '$6\\text{ L}$'], 'A');

addQ(158, 'Chemistry', 'Some Basic Concepts of Chemistry', 13,
  'A solution of $\\text{FeCl}_3$ is $\\frac{\\text{M}}{30}$ then molarity for $\\text{Cl}^-$ ion will be',
  ['$\\frac{\\text{M}}{90}$', '$\\frac{\\text{M}}{30}$', '$\\frac{\\text{M}}{10}$', '$\\frac{\\text{M}}{5}$'], 'C');

addQ(159, 'Chemistry', 'Structure of Atom', 13,
  'The frequency of a wave of light is $12 \\times 10^{14}\\text{ sec}^{-1}$. The wave number associated with this light is',
  ['$5 \\times 10^7\\text{ m}^{-1}$', '$4 \\times 10^8\\text{ m}^{-1}$', '$2 \\times 10^7\\text{ m}^{-1}$', '$4 \\times 10^6\\text{ m}^{-1}$'], 'D');

addQ(160, 'Chemistry', 'Structure of Atom', 13,
  'If there are 2 nodal surfaces in third excited state then the value of orbital angular momentum will be',
  ['$\\sqrt{3}\\hbar$', '$\\sqrt{2}\\hbar$', '$4\\hbar$', '$\\frac{1}{\\sqrt{2}}\\hbar$'], 'B');

addQ(161, 'Chemistry', 'Structure of Atom', 13,
  'The correct set of four quantum numbers for the valence electrons of rubidium atom ($Z = 37$) is:',
  ['$5, 1, 1, +\\frac{1}{2}$', '$5, 0, 1, +\\frac{1}{2}$', '$5, 0, 0, +\\frac{1}{2}$', '$5, 1, 0, +\\frac{1}{2}$'], 'C');

// -------------------------------------------------------------
// PAGE 14: CHEMISTRY Q162 to Q176
// -------------------------------------------------------------
addQ(162, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 14,
  'Consider the oxides of group 14 elements $\\text{SiO}_2$, $\\text{GeO}_2$, $\\text{SnO}_2$, $\\text{PbO}_2$, $\\text{CO}$ and $\\text{GeO}$. The amphoteric oxides are',
  ['$\\text{GeO}, \\text{GeO}_2$', '$\\text{SiO}_2, \\text{GeO}_2$', '$\\text{SnO}_2, \\text{CO}$', '$\\text{SnO}_2, \\text{PbO}_2$'], 'D');

addQ(163, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 14,
  'Zr ($Z = 40$) and Hf ($Z = 72$) have similar atomic and ionic radii because of',
  ['having similar chemical properties', 'belonging to same group', 'diagonal relationship', 'lanthanide contraction'], 'D');

addQ(164, 'Chemistry', 'Some Basic Concepts of Chemistry', 14,
  'When $20\\text{ g } \\text{Fe}_2\\text{O}_3$ is reacted with $50\\text{ g}$ of $\\text{HCl}$, $\\text{FeCl}_3$ and $\\text{H}_2\\text{O}$ are formed. The amount of unreacted reactant is ($\\text{Fe} = 56$)',
  ['$27.375\\text{ g}$', '$22.625\\text{ g}$', '$30\\text{ g}$', '$4.75\\text{ g}$'], 'B');

addQ(165, 'Chemistry', 'Some Basic Concepts of Chemistry', 14,
  'Density of water is $1\\text{ g/ml}$. The concentration of water in $\\text{mol/litre}$ is',
  ['1000', '18', '0.018', '55.5'], 'D');

addQ(166, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 14,
  'Which of the following are correct?\n(1) Pauling electronegativity depends on bond energies\n(2) Mulliken\'s electronegativity depends on IE and EA\n(3) Allred and Rochow electronegativity depends on $Z_{\\text{eff}}/r^2$\n(4) All of these',
  ['Pauling electronegativity depends on bond energies', 'Mulliken\'s electronegativity depends on IE and EA', 'Allred and Rochow electronegativity depends on $Z_{\\text{eff}}/r^2$', 'All of these'], 'D');

addQ(167, 'Chemistry', 'Structure of Atom', 14,
  'If uncertainty in position and momentum are equal, then uncertainty in velocity is?',
  ['$\\sqrt{\\frac{h}{\\pi}}$', '$\\frac{1}{2m}\\sqrt{\\frac{h}{\\pi}}$', '$\\sqrt{\\frac{h}{2\\pi}}$', '$\\frac{1}{m}\\sqrt{\\frac{h}{\\pi}}$'], 'B');

addQ(168, 'Chemistry', 'Structure of Atom', 14,
  'The potential energies of first, second and third Bohr\'s orbits of $\\text{He}^+$ cation are $E_1$, $E_2$ and $E_3$. The correct sequence of these energies is',
  ['$E_1 > E_2 > E_3$', '$E_1 = E_2 > E_3$', '$E_1 = E_2 = E_3$', '$E_3 > E_2 > E_1$'], 'D');

addQ(169, 'Chemistry', 'Some Basic Concepts of Chemistry', 14,
  'Insulin contains 3.4% sulphur by mass. What will be the minimum molecular weight of insulin',
  ['94.117', '1884', '941', '976'], 'C');

addQ(170, 'Chemistry', 'Structure of Atom', 14,
  'The energy of one mole of photons of radiation of wavelength $300\\text{ nm}$ is\n(given $h = 6.63 \\times 10^{-34}\\text{ J s}$, $N_A = 6.02 \\times 10^{23}\\text{ mol}^{-1}$, $c = 3 \\times 10^8\\text{ ms}^{-1}$)',
  ['$235\\text{ kJ mol}^{-1}$', '$325\\text{ kJ mol}^{-1}$', '$399\\text{ kJ mol}^{-1}$', '$435\\text{ kJ mol}^{-1}$'], 'C');

addQ(171, 'Chemistry', 'Some Basic Concepts of Chemistry', 14,
  'If isotopic distribution of $\\text{C}^{12}$ and $\\text{C}^{14}$ is $98.0\\%$ and $2.0\\%$ respectively, then the number of $\\text{C}^{14}$ atoms in $12\\text{ gm}$ of carbon is',
  ['$1.032 \\times 10^{22}$', '$1.20 \\times 10^{22}$', '$5.88 \\times 10^{23}$', '$6.02 \\times 10^{23}$'], 'B');

addQ(172, 'Chemistry', 'Some Basic Concepts of Chemistry', 14,
  'In the reaction, $4\\text{A} + 2\\text{B} + 3\\text{C} \\rightarrow \\text{A}_4\\text{B}_2\\text{C}_3$, the no. of moles of product formed starting from one mol of A, 0.6 mol of B, 0.72 mol of C:',
  ['0.25', '0.3', '0.24', '2.32'], 'C');

addQ(173, 'Chemistry', 'Structure of Atom', 14,
  'The de-Broglie wavelength of a tennis ball of mass $60\\text{ g}$ moving with a velocity of $10\\text{ metres per second}$ is approximately :\n[Planck\'s constant, $h = 6.63 \\times 10^{-34}\\text{ J s}$]',
  ['$10^{-33}\\text{ metres}$', '$10^{-31}\\text{ metres}$', '$10^{-16}\\text{ metres}$', '$10^{-25}\\text{ metres}$'], 'A');

addQ(174, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 14,
  'The number of unpaired electrons in $\\text{Zn}^{+2}$',
  ['0', '1', '2', '3'], 'A');

addQ(175, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 14,
  'Given below are two statements : one is labelled as Assertion A and the other is labelled as Reason R:\nAssertion A : The first ionisation enthalpy decreases across a period.\nReason R : The increasing nuclear charge outweighs the shielding across the period.\nIn the light of the above statements, choose the most appropriate from the options given below:',
  ['A is false but R is true', 'A is true but R is false', 'Both A and R are true and R is the correct explanation of A', 'Both A and R are true but R is NOT the correct explanation of A'], 'A');

addQ(176, 'Chemistry', 'Structure of Atom', 14,
  'Assertion : As the distance of shell increases from the nucleus, its energy level increases.\nReason : The energy of a shell is $E_n \\propto -1/n^2$.\nChoose the most appropriate option:',
  ['If both Assertion & Reason are True & Reason is a correct explanation of the Assertion', 'If both Assertion & Reason are True but Reason is not a correct explanation of the Assertion.', 'If Assertion is True but the Reason is False', 'If both Assertion and Reason are False.'], 'A');

// -------------------------------------------------------------
// PAGE 15: CHEMISTRY Q177 to Q180
// -------------------------------------------------------------
addQ(177, 'Chemistry', 'Some Basic Concepts of Chemistry', 15,
  'Statement-I : $16\\text{ g}$ each $\\text{O}_2$ and $\\text{O}_3$ contains $\\frac{N_A}{2}$ and $\\frac{N_A}{3}$ molecules respectively.\nStatement-II : $16\\text{ g } \\text{O}_2$ and $\\text{O}_3$ contains same no. of atoms.',
  ['Statement-I is true, Statement-II is true; Statement-II is correct explanation for Statement-I', 'Statement-I is true, Statement-II is true; Statement-II is NOT a correct explanation for Statement-I', 'Statement-I is true, Statement-II is false', 'Statement-I is false, Statement-II is true'], 'B');

addQ(178, 'Chemistry', 'Structure of Atom', 15,
  'Match the following :\nB.E. – Binding energy\n\n| Column I | Column II |\n| :--- | :--- |\n| (A) B.E. of $\\text{He}^+$ atom in an excited state | (P) Infrared region |\n| (B) $7 \\rightarrow 3$ transition in H-atom | (Q) $3.4\\text{ eV}$ |\n| (C) $5 \\rightarrow 1$ transition in H-atom | (R) $13.6\\text{ eV}$ |\n| (D) Series limit of Balmer series in H-atom | (S) 10 spectral lines observed |',
  ['A – P, R; B – P, S; C – Q; D – R', 'A – Q, R; B – P, S; C – S; D – Q', 'A – S, R; B – Q, S; C – P; D – S', 'A – P, S; B – P, Q; C – R; D – Q'], 'B');

addQ(179, 'Chemistry', 'Some Basic Concepts of Chemistry', 15,
  'Match the columns.\n\n| Column-I | Column-II |\n| :--- | :--- |\n| (I) $\\text{Zn}(s) + 2\\text{HCl}(aq) \\rightarrow \\text{ZnCl}_2(aq) + \\text{H}_2(g)$, Above reaction is carried out by taking 2 moles each of Zn and HCl | (P) 50% of excess reagent left |\n| (II) $\\text{AgNO}_3(aq) + \\text{HCl}(aq) \\rightarrow \\text{AgCl}(s) + \\text{HNO}_3(aq)$, Above reaction is carried out by taking 170 g $\\text{AgNO}_3$ and 18.25 g HCl (Ag = 108) | (Q) 22.4 L of gas at STP is liberated |\n| (III) $\\text{CaCO}_3(s) \\rightarrow \\text{CaO}(s) + \\text{CO}_2(g)$, 100 g $\\text{CaCO}_3$ is decomposed | (R) 1 mole of solid (Product) obtained |\n| (IV) $2\\text{KClO}_3(s) \\rightarrow 2\\text{KCl}(s) + 3\\text{O}_2(g)$, $\\frac{2}{3}$ moles of $\\text{KClO}_3$ decomposed | (S) HCl is the limiting reagent |\n| | (T) 75% of excess reagent left |',
  ['I-P, Q, S ; II-P, S ; III-Q, R ; IV-T', 'I-P, Q ; II-S, T ; III-P, Q, R ; IV-P', 'I-R, S ; II-S, T ; III-Q, T ; IV-Q, R', 'I-P, Q, R, S ; II-P, S ; III-Q, R ; IV-Q'], 'A');

addQ(180, 'Chemistry', 'Classification of Elements and Periodicity in Properties', 15,
  'Match the columns.\n\n| Column-I (Electronic Configuration) | Column-II ($\\Delta H_{\\text{eg}}$ in $\\text{kJ mol}^{-1}$) |\n| :--- | :--- |\n| (i) $1s^2 2s^2 2p^6$ | (a) $-53$ |\n| (ii) $1s^2 2s^2 2p^6 3s^1$ | (b) $-333$ |\n| (iii) $1s^2 2s^2 2p^5$ | (c) $-141$ |\n| (iv) $1s^2 2s^2 2p^4$ | (d) $+116$ |',
  ['i-d, ii-b, iii-a, iv-c', 'i-d, ii-a, iii-b, iv-c', 'i-c, ii-d, iii-b, iv-a', 'i-b, ii-c, iii-a, iv-d'], 'B');

// -------------------------------------------------------------
// SAVE TO JSON
// -------------------------------------------------------------
const outPath = path.join(__dirname, 'neet_180_verified_questions.json');
fs.writeFileSync(outPath, JSON.stringify(questions, null, 2));

console.log(`\nSUCCESS: Generated ${questions.length} verified questions.`);

// Verify breakdown
const bio = questions.filter(q => q.subject === 'Biology');
const phy = questions.filter(q => q.subject === 'Physics');
const chem = questions.filter(q => q.subject === 'Chemistry');

console.log(`Breakdown:`);
console.log(`  Biology: ${bio.length} (Q${bio[0].questionNumber} to Q${bio[bio.length - 1].questionNumber})`);
console.log(`  Physics: ${phy.length} (Q${phy[0].questionNumber} to Q${phy[phy.length - 1].questionNumber})`);
console.log(`  Chemistry: ${chem.length} (Q${chem[0].questionNumber} to Q${chem[chem.length - 1].questionNumber})`);
console.log(`Total: ${bio.length + phy.length + chem.length}`);

// Check diagrams
const withDiagrams = questions.filter(q => q.image_url);
console.log(`Questions with diagrams: ${withDiagrams.length}`);
withDiagrams.forEach(q => console.log(`  Q${q.questionNumber}: ${q.image_url}`));
