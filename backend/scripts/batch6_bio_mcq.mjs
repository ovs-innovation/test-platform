// Batch 6: Questions 191 to 227 (Biological Classification)
const CHAPTER = 'Biological Classification';
const SUBJECT = 'Botany';
const CATEGORY = 'Botany';

export const batch6Questions = [
  {
    qNo: 191,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Biological Statements Evaluation',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'State given statements as True (T) or False (F) and select the correct option:\nA. Copeland gave four kingdom system of classification.\nB. Slime moulds under unfavourable conditions form plasmodium.\nC. Deuteromycetes reproduce only by asexual spores called conidia.\nD. Viruses that infect plants have generally single stranded RNA.',
    options: [
      'T, T, T, T',
      'T, F, T, T',
      'F, T, T, F',
      'T, F, T, F'
    ],
    correct_index: 1,
    solution: 'Statement B is False because slime moulds aggregate to form an amoeboid plasmodium under favourable conditions; during unfavourable conditions, the plasmodium differentiates into spore-bearing fruiting bodies. Statements A, C, and D are True.'
  },
  {
    qNo: 192,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Hyphae',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'The coenocytic mycelium is',
    options: [
      'Uninucleate, septate',
      'Uninucleate, aseptate',
      'Multinucleate, septate',
      'Multinucleate, aseptate'
    ],
    correct_index: 3,
    solution: 'A coenocytic mycelium is a continuous, multinucleate tube without cross-walls (multinucleate and aseptate), characteristic of Phycomycetes.'
  },
  {
    qNo: 193,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Smut Fungi',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Smut fungi are known as',
    options: [
      'Puccinia',
      'Ustilago',
      'Agaricus',
      'Mucor'
    ],
    correct_index: 1,
    solution: 'Ustilago species are known as smut fungi because they produce sooty black teliospores. Puccinia causes rust.'
  },
  {
    qNo: 194,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Placement',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which is not a moneran?',
    options: [
      'Mycoplasma',
      'Slime mould',
      'Archaebacteria',
      'Eubacteria'
    ],
    correct_index: 1,
    solution: 'Slime moulds are eukaryotic organisms placed in Kingdom Protista, whereas Mycoplasma, Archaebacteria, and Eubacteria are prokaryotes belonging to Kingdom Monera.'
  },
  {
    qNo: 195,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Genetics',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following process will not introduce new genes into bacteria?',
    options: [
      'Conjugation',
      'Transduction',
      'Transformation',
      'Binary fission'
    ],
    correct_index: 3,
    solution: 'Binary fission is an asexual division that produces two genetically identical daughter cells (clones) without introducing new genetic combinations.'
  },
  {
    qNo: 196,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Recombination Mechanisms',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Physical contact between two bacteria is not necessary in which of the following processes for recombination?',
    options: [
      'Conjugation',
      'Transduction',
      'Transformation',
      'Both (2) and (3)'
    ],
    correct_index: 3,
    solution: 'Physical cell-to-cell contact is required only in conjugation. Transduction is mediated by a bacteriophage virus, and transformation involves uptake of naked DNA from the surrounding medium.'
  },
  {
    qNo: 197,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'TMV Architecture',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'TMV is characterised with',
    options: [
      '3:1 ratio of nucleotides : capsomere',
      'Naked genetic material',
      'ds-RNA as genetic material',
      'Thick envelope'
    ],
    correct_index: 0,
    solution: 'Tobacco Mosaic Virus (TMV) has a single-stranded RNA of ~6400 nucleotides enveloped by 2130 identical capsomeres, yielding a nucleotide to capsomere ratio of approximately 3:1.'
  },
  {
    qNo: 198,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycoplasma Biology',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which is wrong about Mycoplasma?',
    options: [
      'They are called PPLO',
      'Pleomorphic in nature',
      'Sensitive to penicillin',
      'Facultative anaerobes'
    ],
    correct_index: 2,
    solution: 'Mycoplasmas lack a cell wall (peptidoglycan) and are therefore completely insensitive (resistant) to penicillin, which acts by inhibiting cell wall peptidoglycan cross-linking.'
  },
  {
    qNo: 199,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Cyanobacteria Capabilities',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Cyanobacteria are the self-dependent organisms and they are able to carry out',
    options: [
      'Anoxygenic photosynthesis',
      'Nitrogen fixation',
      'Sexual reproduction',
      'Both (1) and (2)'
    ],
    correct_index: 1,
    solution: 'Cyanobacteria carry out oxygenic photosynthesis (using H2O and evolving O2) and fix atmospheric nitrogen in specialized cells called heterocysts.'
  },
  {
    qNo: 200,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Ascomycetes Characters',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following does not apply to Ascomycetes?',
    options: [
      'Mycelium is coenocytic and aseptate',
      'Commonly known as sac fungi',
      'Asexual spores called conidia are produced exogenously',
      'Sexually spores called ascospores are produced endogenously'
    ],
    correct_index: 0,
    solution: 'Ascomycetes have branched and septate mycelium; coenocytic and aseptate mycelium is characteristic of Phycomycetes.'
  },
  {
    qNo: 201,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viral Organization',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Read the following statements:\n(A) Usually virus contains both DNA and RNA.\n(B) Virus can have both capsid and envelope.\n(C) Viruses that infect animals can have single stranded RNA.\n(D) Bacteriophages usually have ds-DNA.\nHow many statements are correct?',
    options: [
      'One',
      'Two',
      'Three',
      'Four'
    ],
    correct_index: 2,
    solution: 'Three statements (B, C, D) are correct. Statement A is false because no virus contains both DNA and RNA simultaneously.'
  },
  {
    qNo: 202,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Chromatophores',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Chromatophores are present in',
    options: [
      'All prokaryotes',
      'Few prokaryotes',
      'All eukaryotes',
      'Few eukaryotes'
    ],
    correct_index: 1,
    solution: 'Chromatophores are internal membrane pigment-bearing structures found only in photosynthetic prokaryotes (such as cyanobacteria and purple sulfur bacteria).'
  },
  {
    qNo: 203,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Heterocyst Biochemistry',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Heterocyst in blue-green algae',
    options: [
      'Lacks photosystem-I',
      'Are specialised cells for photosynthesis',
      'Contains nitrogenase',
      'Performs nitrogen fixation in aerobic condition'
    ],
    correct_index: 2,
    solution: 'Heterocysts are specialized for nitrogen fixation and contain the enzyme nitrogenase. They lack PS II to avoid oxygen evolution, protecting nitrogenase from irreversible inactivation.'
  },
  {
    qNo: 204,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Photosynthetic Protists Pigments',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'All holophytic protistans are similar in the presence of',
    options: [
      'Flagella in vegetative stage',
      'Chlorophyll-a',
      'beta-carotene',
      'Cell wall'
    ],
    correct_index: 1,
    solution: 'Chlorophyll a is the universal primary photosynthetic pigment present in all photosynthetic (holophytic) organisms, including all photosynthetic protists.'
  },
  {
    qNo: 205,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Three Kingdom Classification',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'According to three kingdom classification, the eukaryotic members are present in',
    options: [
      'Protista only',
      'Fungi and plantae',
      'Animalia and monera',
      'All three kingdoms'
    ],
    correct_index: 3,
    solution: 'Ernst Haeckel\'s three-kingdom system comprised Plantae, Animalia, and Protista; all three of these kingdoms contain eukaryotic organisms.'
  },
  {
    qNo: 206,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Cytoplasm',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Cytoplasm of the eubacterial cell',
    options: [
      'Is granular due to presence of 80 S ribosomes',
      'Lacks sap vacuoles',
      'Shows streaming movements',
      'Always lacks gas vacuoles'
    ],
    correct_index: 1,
    solution: 'Bacterial cytoplasm lacks true sap vacuoles bounded by a tonoplast, lacks cytoplasmic streaming (cyclosis), and contains 70S (not 80S) ribosomes.'
  },
  {
    qNo: 207,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Chrysophytes Habitat',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Members of the chrysophytes',
    options: [
      'Are macroscopic planktons',
      'Are present in fresh water as well as in marine water',
      'Have stiff cellulose plates on the outer surface',
      'Cause PSP in human beings'
    ],
    correct_index: 1,
    solution: 'Chrysophytes (diatoms and golden algae/desmids) are found in fresh water as well as in marine environments.'
  },
  {
    qNo: 208,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Euglena Reproduction',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Mark the odd one (w.r.t. Euglena)',
    options: [
      'Bears long tinsel type flagellum',
      'Shows dual mode of nutrition',
      'Sexual reproduction involves zygotic meiosis',
      'Paraflagellar body is a photosensitive structure'
    ],
    correct_index: 2,
    solution: 'Euglena reproduces asexually by longitudinal binary fission; sexual reproduction and zygotic meiosis have not been confirmed in Euglena.'
  },
  {
    qNo: 209,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Slime Moulds Biology',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following feature is not concerned with slime moulds?',
    options: [
      'They can reproduce by sexual reproduction',
      'They are unicellular eukaryotes',
      'Spores have cellulosic wall',
      'They form fruiting bodies during favourable conditions'
    ],
    correct_index: 3,
    solution: 'Slime moulds differentiate and form fruiting bodies bearing spores at their tips during unfavourable conditions, not favourable conditions.'
  },
  {
    qNo: 210,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Classes Comparison',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'In which of the following options all listed fungi belong to the same class?',
    options: [
      'Puff balls, mushroom, toadstools',
      'Mushroom, Penicillium, Aspergillus',
      'Morels, truffles, pink mould, Mucor',
      'Ergot fungi, Baker\'s yeast, dung mould'
    ],
    correct_index: 0,
    solution: 'Puffballs (Lycoperdon), mushrooms (Agaricus), and toadstools (Amanita) all belong to the class Basidiomycetes.'
  },
  {
    qNo: 211,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protistan Matches',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following is incorrectly matched?',
    options: [
      'PSP - Dinoflagellates',
      'Chief producers in ocean - Diatoms',
      'Multicellular protists - Slime moulds',
      'Diplanetism - Saprolegnia'
    ],
    correct_index: 2,
    solution: 'Protists are defined as unicellular eukaryotic organisms; slime moulds are unicellular or acellular coenocytic masses, not multicellular tissue-grade organisms.'
  },
  {
    qNo: 212,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Chemosynthetic Autotrophs',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Chemosynthetic autotrophic bacteria',
    options: [
      'Play a great role in recycling nutrients',
      'Oxidises various organic substances',
      'Release O2 due to involvement of oxygen evolving complex (OEC)',
      'Are most abundant in nature'
    ],
    correct_index: 0,
    solution: 'Chemosynthetic autotrophs oxidize inorganic substances (nitrates, nitrites, ammonia) and play a vital role in recycling nutrients like nitrogen, phosphorus, iron, and sulfur.'
  },
  {
    qNo: 213,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Edible Fruiting Bodies',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Fruiting bodies may be edible for which of the fungi?',
    options: [
      'Zygomycetes, oomycetes',
      'Basidiomycetes only',
      'Ascomycetes, basidiomycetes',
      'Phycomycetes, basidiomycetes'
    ],
    correct_index: 2,
    solution: 'Edible fruiting bodies are produced by members of Ascomycetes (ascocarps of Morels and Truffles) and Basidiomycetes (basidiocarps of mushrooms and puffballs).'
  },
  {
    qNo: 214,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacteria vs Cyanobacteria',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Bacteria differs from BGA in',
    options: [
      'Being prokaryotic in nature',
      'Performing oxygenic photosynthesis',
      'Having peptidoglycan in cell wall',
      'Presence of flagella in some forms'
    ],
    correct_index: 3,
    solution: 'Many true bacteria possess flagella for motility, whereas blue-green algae (cyanobacteria) completely lack flagellated cells at all stages of their life cycle.'
  },
  {
    qNo: 215,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dinoflagellates vs Diatoms',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'All given features are characteristics of dinoflagellates, except',
    options: [
      'Pectocellulosic plates covering the body',
      'Presence of chlorophyll a and c as photosynthetic pigments',
      'Bioluminescent nature of certain members',
      'Their frustules can be used as bacterial filters'
    ],
    correct_index: 3,
    solution: 'Frustules embedded with silica that form kieselguhr used for filtration are characteristic of diatoms, not dinoflagellates.'
  },
  {
    qNo: 216,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Archaebacteria Adaptations',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Archaebacteria can survive in extremes of conditions due to',
    options: [
      'Presence of introns in DNA',
      'Branched chain lipid with phytanyl side group in cell membrane',
      'Presence of more than one type of RNA polymerase',
      'Absence of muramic acid in cell wall'
    ],
    correct_index: 1,
    solution: 'Archaebacteria have branched phytanyl ether-linked lipids in their plasma membranes which form monolayers and provide resistance to extreme temperature, pH, and salinity.'
  },
  {
    qNo: 217,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Sexduction in Bacteria',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Sexduction phenomenon occurs due to conjugation between',
    options: [
      'F+ x F-',
      'F- x F-',
      'F\' x F-',
      'Hfr x F-'
    ],
    correct_index: 2,
    solution: 'Sexduction (F-duction) occurs when an F\' donor cell (carrying an F plasmid with incorporated bacterial host genes) conjugates with an F- recipient cell.'
  },
  {
    qNo: 218,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Flagella Anatomy',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Gram positive bacteria have',
    options: [
      'Only proximal set of rings as L and P',
      'Both proximal and distal set of rings',
      'Proximal set with S and M rings present in plasma membrane',
      'Two rings present in LPS layer of cell wall'
    ],
    correct_index: 2,
    solution: 'Gram-positive bacteria have only the inner/proximal pair of flagellar basal body rings (S and M rings embedded in the plasma membrane), lacking the outer L and P rings.'
  },
  {
    qNo: 219,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Cell Envelope',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Cell envelope in bacteria consists of',
    options: [
      'Plasma membrane only',
      'Plasma membrane and mesosome',
      'Glycocalyx only',
      'Glycocalyx, cell wall and plasma membrane'
    ],
    correct_index: 3,
    solution: 'The bacterial cell envelope consists of a tightly bound three-layered structure: outermost glycocalyx (capsule/slime layer), followed by the cell wall, and innermost plasma membrane.'
  },
  {
    qNo: 220,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Nutrition Modes',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Find odd one w.r.t mode of nutrition in bacteria',
    options: [
      'Purple sulphur bacteria',
      'Sulphur bacteria',
      'Green sulphur bacteria',
      'Purple non-sulphur bacteria'
    ],
    correct_index: 1,
    solution: 'Colorless sulfur bacteria (e.g. Thiobacillus) are chemosynthetic autotrophs, whereas purple sulfur, green sulfur, and purple non-sulfur bacteria are photosynthetic.'
  },
  {
    qNo: 221,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Nitrifying Bacteria',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which one of the following groups of bacteria obtain energy by oxidizing nitrite into nitrate?',
    options: [
      'Nitrosomonas and Penicillium',
      'Nitrosococcus and Nitrocystis',
      'Nitrocystis and Nitrobacter',
      'Nitrobacter and Nitrosomonas'
    ],
    correct_index: 2,
    solution: 'Nitrobacter and Nitrocystis are nitrifying chemoautotrophs that oxidize nitrite (NO2-) into nitrate (NO3-).'
  },
  {
    qNo: 222,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Hfr Strain',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'When the plasmid integrates with bacterial chromosome, it is called as',
    options: [
      'F+',
      'Super female',
      'Hfr strain',
      'Cryptic plasmid'
    ],
    correct_index: 2,
    solution: 'When the F (fertility) factor plasmid integrates into the bacterial chromosome, the cell becomes an Hfr (High Frequency of Recombination) donor.'
  },
  {
    qNo: 223,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Economic Importance of Bacteria',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Match the following column and select the correct option w.r.t. role of bacteria:\nColumn I:\n(a) Curd production\n(b) Curing of tobacco leaves\n(c) Petroleum pollution control\n(d) Riboflavin production\nColumn II:\n(i) Pseudomonas putida\n(ii) Clostridium butylicum\n(iii) Bacillus megatherium\n(iv) Lactobacillus',
    options: [
      'a(iv), b(iii), c(i), d(ii)',
      'a(iv), b(ii), c(i), d(iii)',
      'a(iii), b(iv), c(i), d(ii)',
      'a(ii), b(iii), c(iv), d(i)'
    ],
    correct_index: 0,
    solution: 'Curd: Lactobacillus (a-iv); Tobacco curing: Bacillus megatherium (b-iii); Oil spill cleaning: Pseudomonas putida (c-i); Riboflavin production: Clostridium butylicum (d-ii).'
  },
  {
    qNo: 224,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Cyanobacteria Nutrition',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Monerans showing oxygenic photosynthesis',
    options: [
      'Are photolithotrophs',
      'Have nonpeptidoglycan nature of cell wall',
      'Have photoorganotrophic mode of nutrition',
      'Are Gram positive bacteria'
    ],
    correct_index: 0,
    solution: 'Cyanobacteria are photolithotrophic autotrophs that use light as energy source and inorganic water (H2O) as an electron donor, releasing O2.'
  },
  {
    qNo: 225,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Methanogens Features',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Obligate anaerobic monerans with pseudomurein in their cell wall',
    options: [
      'Have ss-DNA without histone',
      'Show photoautotrophic nutrition',
      'Show presence of introns',
      'Have only unbranched chain of lipids in cell membrane'
    ],
    correct_index: 2,
    solution: 'Methanogens are obligate anaerobic archaebacteria whose cell walls contain pseudomurein; their genome features eukaryotic-like characteristics including presence of introns in tRNA genes and histone-like proteins.'
  },
  {
    qNo: 226,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycoplasma Morphology',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Unicellular, smallest, free living prokaryotes which are also said to be "Bacteria with their coats off", show which of the following features?',
    options: [
      'Colonies give fried egg like appearance in culture medium',
      'Cell wall has peptidoglycan',
      'Pleomorphic nature with sculptured cell wall',
      'Reproduce by binary fission only'
    ],
    correct_index: 0,
    solution: 'Mycoplasmas ("bacteria with their coats off" due to absence of cell walls) form colonies on agar with a characteristic "fried-egg" appearance.'
  },
  {
    qNo: 227,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Nutritional Diversity',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Organisms showing great diversity in the mode of nutrition are included in',
    options: [
      'Animalia',
      'Monera',
      'Fungi',
      'Plantae'
    ],
    correct_index: 1,
    solution: 'Compared to many other organisms, which are mostly either photosynthetic or holozoic/absorptive, bacteria (Kingdom Monera) as a group show the most extensive metabolic diversity.'
  }
];
