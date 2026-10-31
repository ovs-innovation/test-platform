// Batch 1: Questions 1 to 35 (Biological Classification)
const CHAPTER = 'Biological Classification';
const SUBJECT = 'Botany';
const CATEGORY = 'Botany';

export const batch1Questions = [
  {
    qNo: 1,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viruses',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Choose the odd one with respect to RNA virus',
    options: [
      'TMV',
      'Cauliflower mosaic virus',
      'Influenza virus',
      'Reo virus'
    ],
    correct_index: 1,
    solution: 'Cauliflower mosaic virus contains double-stranded DNA (dsDNA) as its genetic material, whereas TMV and Influenza virus contain ssRNA, and Reo virus contains dsRNA.'
  },
  {
    qNo: 2,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Five Kingdom Classification',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'In five-kingdom classification, Chlamydomonas and Chlorella have been placed in',
    options: [
      'Protista',
      'Algae',
      'Plantae',
      'Monera'
    ],
    correct_index: 0,
    solution: 'In R.H. Whittaker\'s five-kingdom classification system, all unicellular eukaryotic organisms including Chlamydomonas and Chlorella are grouped together under Kingdom Protista.'
  },
  {
    qNo: 3,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Fungi',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Coenocytic mycelium occurs in members of',
    options: [
      'Ascomycetes',
      'Oomycetes and Basidiomycetes',
      'Phycomycetes',
      'Deuteromycetes and Zygomycetes'
    ],
    correct_index: 2,
    solution: 'Members of Phycomycetes possess aseptate, multinucleate (coenocytic) mycelium, whereas Ascomycetes, Basidiomycetes, and Deuteromycetes have septate and branched mycelium.'
  },
  {
    qNo: 4,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Monera',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Azotobacter and Beijerinckia are the examples of',
    options: [
      'Pathogenic bacteria',
      'Decomposers',
      'Symbiotic N2 fixer',
      'Non-symbiotic N2 fixer'
    ],
    correct_index: 3,
    solution: 'Azotobacter and Beijerinckia are free-living (non-symbiotic) aerobic nitrogen-fixing soil bacteria.'
  },
  {
    qNo: 5,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Archaebacteria',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'A few organisms are known to grow and multiply at temperature as high as 80°C and pH as low as 2. They are',
    options: [
      'Halophiles',
      'Thermoacidophiles',
      'Methanogens',
      'Hot spring blue green algae'
    ],
    correct_index: 1,
    solution: 'Thermoacidophiles are archaebacteria that thrive in extremely acidic (pH ~ 2) and high-temperature (~80°C) environments such as hot sulfur springs.'
  },
  {
    qNo: 6,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Cyanobacteria',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Cyanobacteria or blue green algae can adaptively change their body colour according to different wavelengths of available light. This is called',
    options: [
      "Gaidukov's phenomenon",
      'Complementary chromatic adaptation',
      'Both (1) and (2) are correct',
      'Chromatography'
    ],
    correct_index: 2,
    solution: "The adaptive change in pigment composition and body color of cyanobacteria in response to the wavelength of available light is known as complementary chromatic adaptation or Gaidukov's phenomenon."
  },
  {
    qNo: 7,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Monera',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Select the odd one out with respect to the kingdom Monera',
    options: [
      'Amoeba',
      'Escherichia',
      'Clostridium',
      'Klebsiella'
    ],
    correct_index: 0,
    solution: 'Amoeba is a unicellular eukaryotic organism placed in Kingdom Protista, whereas Escherichia, Clostridium, and Klebsiella are prokaryotes placed in Kingdom Monera.'
  },
  {
    qNo: 8,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Protista',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Kingdom Protista contains',
    options: [
      'E. coli',
      'Chlorella',
      'Amoeba',
      'Both (2) and (3)'
    ],
    correct_index: 3,
    solution: 'In Whittaker\'s classification, both Chlorella (unicellular alga) and Amoeba (protozoan) are placed in Kingdom Protista, while E. coli is a moneran.'
  },
  {
    qNo: 9,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Monera',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Read the following statements:\n(A) The site of respiration in bacteria is mesosome.\n(B) The DNA of Escherichia coli is double stranded and linear.\n(C) Photosynthetic bacteria have pigments in chromatophore.\n(D) Archaebacteria are oldest living beings.\nHow many of the above statements are correct?',
    options: [
      'Three',
      'Four',
      'Two',
      'One'
    ],
    correct_index: 0,
    solution: 'Statements A, C, and D are correct (three statements). Statement B is incorrect because bacterial DNA (including E. coli) is double-stranded and circular, not linear.'
  },
  {
    qNo: 10,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Diseases',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Tetanus is caused by',
    options: [
      'Pseudomonas',
      'Clostridium tetani',
      'Cyanobacteria',
      'Bacillus'
    ],
    correct_index: 1,
    solution: 'Tetanus is an acute infectious bacterial disease caused by the anaerobic spore-forming bacterium Clostridium tetani.'
  },
  {
    qNo: 11,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Protista',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Select the correct statement',
    options: [
      'Cholera, typhoid, tetanus are well known diseases caused by viruses',
      'Dinoflagellates, Euglenoids and slime moulds are placed under kingdom Monera',
      'Members of kingdom protista are primarily aquatic',
      'Dinoflagellates are the chief producers in the oceans'
    ],
    correct_index: 2,
    solution: 'Members of Kingdom Protista are primarily aquatic. Cholera, typhoid, and tetanus are bacterial diseases; dinoflagellates and euglenoids belong to Protista; and diatoms (chrysophytes) are the chief producers in the oceans.'
  },
  {
    qNo: 12,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Protista',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Select the incorrect match',
    options: [
      'Photosynthetic protists - Diatoms',
      'Consumer-decomposer protists - Slime moulds',
      'Chlorophyll a and b - Euglena',
      'Entamoeba - Sleeping sickness'
    ],
    correct_index: 3,
    solution: 'Entamoeba histolytica causes amoebiasis / amoebic dysentery. Sleeping sickness is caused by the flagellated protozoan Trypanosoma gambiense.'
  },
  {
    qNo: 13,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Fungi',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following pair belongs to class basidiomycetes?',
    options: [
      'Agaricus and Ascobolus',
      'Penicillium and Ascobolus',
      'Rhizopus and mushrooms',
      'Agaricus and Puccinia'
    ],
    correct_index: 3,
    solution: 'Agaricus (mushroom) and Puccinia (rust fungus) both belong to class Basidiomycetes. Ascobolus and Penicillium belong to Ascomycetes, while Rhizopus belongs to Phycomycetes.'
  },
  {
    qNo: 14,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Lichens',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'There exists a close association between the alga and the fungus within a lichen. The fungus',
    options: [
      'Provides protection, anchorage and absorption of water and minerals for the alga',
      'Provides food to the alga',
      'Fixes the atmospheric nitrogen for the alga',
      'Releases oxygen for the alga'
    ],
    correct_index: 0,
    solution: 'In a lichen, the fungal component (mycobiont) provides protection, shelter, and absorbs water and mineral nutrients for the photosynthetic partner (phycobiont).'
  },
  {
    qNo: 15,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viruses',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Most of the viruses are/have',
    options: [
      'Enveloped nucleo-protein structure',
      'Nucleo-protein structure',
      'Infectious protein particles',
      'Double stranded DNA as well as ds-RNA'
    ],
    correct_index: 1,
    solution: 'Viruses are obligate intracellular non-cellular entities with a nucleo-protein structure consisting of a genetic material (either DNA or RNA) enclosed inside a protein coat (capsid).'
  },
  {
    qNo: 16,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Prions',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Mark the odd one (with respect to prions)',
    options: [
      'CJD disease',
      'Mad cow disease',
      'Potato leaf roll',
      'Scrapie disease'
    ],
    correct_index: 2,
    solution: 'Potato leaf roll is a plant disease caused by a virus (Potato leaf roll virus). Creutzfeldt-Jakob disease (CJD), Bovine spongiform encephalopathy (Mad cow disease), and Scrapie in sheep are caused by prions.'
  },
  {
    qNo: 17,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycorrhiza',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Choose the incorrect statement with respect to mycorrhiza',
    options: [
      'It is a mutual association of a fungus with the roots of higher plants',
      'Mycorrhizal roots have root cap and root hairs',
      'Depending on the location of the fungus and association pattern, mycorrhiza are of two types ectomycorrhiza and endomycorrhiza',
      'VAM is related with endomycorrhiza'
    ],
    correct_index: 1,
    solution: 'Roots associated with mycorrhizal fungi typically lack root hairs and a well-developed root cap, because the fungal hyphae perform the function of absorption.'
  },
  {
    qNo: 18,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Monera',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Read the statements carefully and find the correct option w.r.t. monerans:\n(A) Membrane bound organelles absent\n(B) Respiratory enzymes are only associated with cytoplasm\n(C) Some bacteria are autotrophic but majority are heterotrophic\n(D) Cell wall always lacks NAM and NAG',
    options: [
      'Both A and B are correct',
      'A and C are correct',
      'B and C are correct',
      'C and D are correct'
    ],
    correct_index: 1,
    solution: 'Statements A and C are correct. Statement B is incorrect because respiratory enzymes are associated with the plasma membrane and mesosomes. Statement D is incorrect because eubacteria possess peptidoglycan with NAM and NAG.'
  },
  {
    qNo: 19,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Eubacteria vs Archaebacteria',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Find out the number of eubacteria from the box given below:\n[Nostoc, Rhizobium, Thermoplasma, Streptomyces, Bacillus, Methanococcus, Trichodesmium, Mycoplasma, Halobacterium, Pseudomonas]',
    options: [
      '7',
      '6',
      '5',
      '4'
    ],
    correct_index: 0,
    solution: 'There are 7 eubacteria: Nostoc, Rhizobium, Streptomyces, Bacillus, Trichodesmium, Mycoplasma, and Pseudomonas. Thermoplasma, Methanococcus, and Halobacterium are Archaebacteria.'
  },
  {
    qNo: 20,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Cell Structure',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which one is not concerned with mesosome?',
    options: [
      'Contain respiratory enzymes',
      'Help in replication of replicated DNA',
      'Help in septa/cell wall formation',
      'Contain photosynthetic enzymes'
    ],
    correct_index: 3,
    solution: 'Photosynthetic enzymes in photosynthetic prokaryotes are located in membranous extensions called chromatophores / thylakoids, not in mesosomes.'
  },
  {
    qNo: 21,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Reproduction',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Endospores are actually the means of ______ and not ______',
    options: [
      'Reproduction, Perennation',
      'Reproduction, Penetration',
      'Perennation, Reproduction',
      'Penetration, Reproduction'
    ],
    correct_index: 2,
    solution: 'Bacterial endospores are highly resistant structures formed to survive unfavorable environmental conditions (perennation). Because one bacterium forms only one endospore which germinates into one bacterium, it is not a means of multiplication/reproduction.'
  },
  {
    qNo: 22,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viruses',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following feature show living nature of virus?',
    options: [
      'Viruses are inert outside their host cell',
      'Viruses can be killed by autoclaving',
      'Viruses bear genetic material',
      'Both (2) and (3)'
    ],
    correct_index: 3,
    solution: 'Viruses possess genetic material (DNA or RNA) and are inactivated/killed by autoclaving (heat denaturation of proteins), demonstrating their biological/living characteristics.'
  },
  {
    qNo: 23,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Classification History',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Unicellular eukaryotic organisms were first kept in separate kingdom ______ under ______ classification system',
    options: [
      "Plantae, Linnaeus's",
      "Protista, Haeckel's",
      "Protista, Copeland's",
      "Monera, Copeland's"
    ],
    correct_index: 1,
    solution: 'Ernst Haeckel (1866) proposed the three-kingdom classification system (Plantae, Animalia, Protista) and created Kingdom Protista for unicellular organisms.'
  },
  {
    qNo: 24,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Fungi',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Dikaryotic condition is represented by',
    options: [
      'Agaricus',
      'Ascobolus',
      'Both (1) and (2)',
      'Mucor'
    ],
    correct_index: 2,
    solution: 'A prominent dikaryophase (n + n condition) occurs in Ascomycetes (such as Ascobolus) and Basidiomycetes (such as Agaricus). Mucor belongs to Phycomycetes where plasmogamy is immediately followed by karyogamy.'
  },
  {
    qNo: 25,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Deuteromycetes',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Names of different fungi are given below:\n[Aspergillus, Albugo, Rhizopus, Puccinia, Alternaria, Claviceps, Colletotrichum]\nHow many of the following do/does not have sexual stage?',
    options: [
      '3',
      '4',
      '1',
      '2'
    ],
    correct_index: 3,
    solution: 'Only 2 fungi lack sexual stages: Alternaria and Colletotrichum, which are members of Deuteromycetes (fungi imperfecti). Aspergillus, Albugo, Rhizopus, Puccinia, and Claviceps have known sexual reproduction.'
  },
  {
    qNo: 26,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dinoflagellates',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following is a dinoflagellate?',
    options: [
      'Gonyaulax',
      'E. coli',
      'Mycoplasma',
      'Euglena'
    ],
    correct_index: 0,
    solution: 'Gonyaulax is a red dinoflagellate responsible for red tides. E. coli and Mycoplasma are monerans, and Euglena is a euglenoid.'
  },
  {
    qNo: 27,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Fungi',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Find the incorrect match',
    options: [
      'Ascospore - Sexual spore',
      'Morels - Edible members of Basidiomycetes',
      'Rhizopus - Bread mould',
      'Neurospora - Used in experimental genetics'
    ],
    correct_index: 1,
    solution: 'Morels (Morchella) and truffles are delicious edible fungi belonging to class Ascomycetes, not Basidiomycetes.'
  },
  {
    qNo: 28,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Spores',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following spores are produced exogenously?',
    options: [
      'Conidia',
      'Ascospore',
      'Basidiospores',
      'Both (1) and (3)'
    ],
    correct_index: 3,
    solution: 'Conidia (asexual spores in Ascomycetes) and Basidiospores (sexual spores in Basidiomycetes) are produced exogenously on conidiophores and basidia, respectively. Ascospores are produced endogenously inside an ascus.'
  },
  {
    qNo: 29,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protistan Groups',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Match the following columns and select the correct option:\nColumn-I:\n(i) Euglenoids\n(ii) Gonyaulax\n(iii) Chrysophytes\n(iv) Slime moulds\nColumn-II:\n(a) Red tide\n(b) Saprophytes\n(c) Stagnant fresh water\n(d) Golden algae',
    options: [
      '(i)(b), (ii)(a), (iii)(d), (iv)(c)',
      '(i)(c), (ii)(a), (iii)(d), (iv)(b)',
      '(i)(c), (ii)(d), (iii)(a), (iv)(b)',
      '(i)(b), (ii)(c), (iii)(a), (iv)(d)'
    ],
    correct_index: 1,
    solution: 'Euglenoids are found in stagnant fresh water; Gonyaulax causes red tide; Chrysophytes include diatoms and golden algae (desmids); Slime moulds are saprophytic protists.'
  },
  {
    qNo: 30,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Chrysophytes',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following statements is incorrect about diatoms?',
    options: [
      'Diatoms are chief producers in the ocean',
      'They have two flagella one longitudinal and other transverse',
      'They have silica embedded cell wall',
      'They are found in fresh water as well as marine environment'
    ],
    correct_index: 1,
    solution: 'Having two flagella, one longitudinal and one transverse in a furrow between wall plates, is a characteristic feature of dinoflagellates, not diatoms. Vegetative diatoms lack flagella.'
  },
  {
    qNo: 31,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protozoans',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Locomotory structures are absent in which of the following protozoans?',
    options: [
      'Paramecium',
      'Plasmodium',
      'Entamoeba',
      'Trypanosoma'
    ],
    correct_index: 1,
    solution: 'Plasmodium belongs to Sporozoa, a group of parasitic protozoans that completely lack locomotory organelles like pseudopodia, cilia, or flagella.'
  },
  {
    qNo: 32,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dinoflagellates',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Bioluminescent members are',
    options: [
      'Some fresh water diatoms',
      'All marine dinoflagellates',
      'Some marine dinoflagellates',
      'All marine protists'
    ],
    correct_index: 2,
    solution: 'Certain marine dinoflagellates such as Noctiluca scintillans exhibit bioluminescence, emitting light when agitated.'
  },
  {
    qNo: 33,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protozoans',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which protozoan has an infectious spore like stage in their life cycle?',
    options: [
      'Sporozoans',
      'Ciliated Protozoan',
      'Flagellated Protozoan',
      'Amoeboid Protozoan'
    ],
    correct_index: 0,
    solution: 'Sporozoans (e.g. Plasmodium) are characterized by having an infectious spore-like stage (sporozoite) in their life cycle.'
  },
  {
    qNo: 34,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycorrhiza',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following statements is incorrect about mycorrhiza?',
    options: [
      'It is the symbiotic association of a fungus with roots of gymnosperms only',
      'It lacks root hairs but possess root cap',
      'Fungus forms Hartig net in the intercellular spaces of the cortex',
      'Fungal partner is commonly a member of Ascomycetes'
    ],
    correct_index: 0,
    solution: 'Mycorrhiza is found associated with roots of both angiosperms and gymnosperms (e.g., Pinus, orchids, forest trees), not gymnosperms only.'
  },
  {
    qNo: 35,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Lichens',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Lichens indicators of air pollution, mainly of',
    options: [
      'NO2 pollution',
      'SO2 pollution',
      'CO pollution',
      'Mercury pollution'
    ],
    correct_index: 1,
    solution: 'Lichens are extremely sensitive to sulfur dioxide (SO2) pollution and do not grow in areas polluted with SO2, making them excellent pollution bio-indicators.'
  }
];
