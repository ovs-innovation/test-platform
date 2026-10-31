// Batch 3: Questions 71 to 110 (Biological Classification)
const CHAPTER = 'Biological Classification';
const SUBJECT = 'Botany';
const CATEGORY = 'Botany';

export const batch3Questions = [
  {
    qNo: 71,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Euglenoids',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Photosynthetic pigments similar to those found in higher plants are seen in',
    options: [
      'Diatoms',
      'Euglenoids',
      'Dinoflagellates',
      'All of these'
    ],
    correct_index: 1,
    solution: 'Euglenoids possess photosynthetic pigments (Chlorophyll a and Chlorophyll b) identical to those present in higher plants.'
  },
  {
    qNo: 72,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Diatoms',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following statement about diatoms is incorrect?',
    options: [
      'Cell wall of diatoms is made up of two halves resembling a soap box',
      'They move with the help of flagella during entire life cycle',
      'They are good indicators of water pollution',
      'They undergo transverse binary fission'
    ],
    correct_index: 1,
    solution: 'Diatoms lack flagella in their vegetative state and float passively in water currents (planktonic); they do not move with flagella during their entire life cycle.'
  },
  {
    qNo: 73,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protistan Groups',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Match the following:\nColumn-I:\n(i) Euglena\n(ii) Gonyaulax\n(iii) Diatoms\n(iv) Slime Mould\nColumn-II:\n(a) Whirling whips\n(b) Kieselguhr\n(c) Chl a + b\n(d) Plasmodium',
    options: [
      '(i)(c), (ii)(a), (iii)(b), (iv)(d)',
      '(i)(a), (ii)(c), (iii)(b), (iv)(d)',
      '(i)(c), (ii)(b), (iii)(a), (iv)(d)',
      '(i)(b), (ii)(a), (iii)(d), (iv)(c)'
    ],
    correct_index: 0,
    solution: 'Euglena contains Chlorophyll a + b; Gonyaulax (dinoflagellate) is known as a whirling whip; Diatoms form diatomaceous earth / kieselguhr; and Slime moulds form a vegetative multinucleate mass called plasmodium.'
  },
  {
    qNo: 74,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Slime Moulds',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following is also called protistan fungi?',
    options: [
      'Diatoms',
      'Slime moulds',
      'Dinoflagellates',
      'Euglenoids'
    ],
    correct_index: 1,
    solution: 'Slime moulds are often called protistan fungi because they share characteristics with both fungi (spores with cell walls, saprophytic nutrition) and protists/animals (wall-less amoeboid vegetative phase).'
  },
  {
    qNo: 75,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Kingdom Monera',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Read the following statements:\nA. Bacterial structure is simple but they are complex in behaviour.\nB. Bacteria as a group show least metabolic diversity.\nC. Chemosynthetic autotrophic bacteria reduce organic material.',
    options: [
      'All are correct',
      'A & C are correct',
      'B & C are incorrect',
      'A & B are incorrect'
    ],
    correct_index: 2,
    solution: 'Statements B and C are incorrect. Bacteria show the most extensive metabolic diversity (not least), and chemosynthetic autotrophs oxidize various inorganic substances (nitrates, nitrites, ammonia) rather than reducing organic material.'
  },
  {
    qNo: 76,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Cyanobacteria',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following have heterocyst?',
    options: [
      'Nostoc',
      'Anabaena',
      'Both (1) and (2)',
      'Mucor'
    ],
    correct_index: 2,
    solution: 'Both Nostoc and Anabaena are filamentous cyanobacteria possessing specialized nitrogen-fixing cells called heterocysts.'
  },
  {
    qNo: 77,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Metabolic Diversity',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Most extensive metabolic diversity is found in',
    options: [
      'Plantae',
      'Protists',
      'Monerans',
      'Fungi'
    ],
    correct_index: 2,
    solution: 'Kingdom Monera (bacteria) exhibits the most extensive metabolic diversity, encompassing photosynthetic autotrophs, chemosynthetic autotrophs, saprophytes, and parasites.'
  },
  {
    qNo: 78,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viruses',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Nucleoprotein particle outside the host:\n(A) Remain infectious\n(B) Become inert\n(C) Can multiply\n(D) Called virion',
    options: [
      'A and C are correct',
      'B and D are correct',
      'A and D are correct',
      'All are correct except (C)'
    ],
    correct_index: 3,
    solution: 'An intact viral particle outside the host cell is called a virion (D). It is metabolically inert (B) yet retains infectivity (A). However, it cannot multiply outside a host cell (C is false).'
  },
  {
    qNo: 79,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dinoflagellates',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Red tide phenomenon is due to an organism which possess',
    options: [
      'Isokont condition',
      'Cellulosic wall',
      'Heterotrophic nutrition usually',
      'Fresh water form usually'
    ],
    correct_index: 1,
    solution: 'Red tides are caused by rapid multiplication of marine dinoflagellates like Gonyaulax, which have stiff cellulosic plates on their outer wall surface.'
  },
  {
    qNo: 80,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungi Toxicity',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Find the odd one w.r.t edible fungi',
    options: [
      'Morels',
      'Truffles',
      'Mushroom',
      'Amanita'
    ],
    correct_index: 3,
    solution: 'Amanita phalloides (death cap) is an extremely poisonous toadstool fungus, whereas Morels, Truffles, and common mushrooms (Agaricus) are edible.'
  },
  {
    qNo: 81,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Prions & Diseases',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following disease is not caused by proteinaceous infectious agent?',
    options: [
      'CJD',
      'Mad cow',
      'Scrapie',
      'Sleeping sickness'
    ],
    correct_index: 3,
    solution: 'Sleeping sickness is caused by the flagellated protozoan parasite Trypanosoma gambiense. CJD, Mad cow disease, and Scrapie are caused by prions (abnormally folded protein particles).'
  },
  {
    qNo: 82,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Basidiomycetes',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Basidiomycetes can be identified as fungi',
    options: [
      'With sex organs but without sexual reproduction',
      'Without sex organs but show sexual reproduction',
      'With specialized sex organs sexual reproduction occur',
      'With endogenous meiospores'
    ],
    correct_index: 1,
    solution: 'In Basidiomycetes, sex organs are completely absent, yet sexual reproduction occurs by somatogamy (fusion of two somatic/vegetative hyphae of different genotypes).'
  },
  {
    qNo: 83,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Levels of Organization',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Microscopic organisms with cellular body organisation are exclusively included under',
    options: [
      'Monera and Protista',
      'Monera and Fungi',
      'Fungi and Protista',
      'Plantae and Monera'
    ],
    correct_index: 0,
    solution: 'Unicellular microscopic organisms exhibiting cellular body organization are classified under Monera (prokaryotic unicellular) and Protista (eukaryotic unicellular).'
  },
  {
    qNo: 84,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Slime Moulds',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which statement is incorrect w.r.t. spores formed in slime mould?',
    options: [
      'Possess true wall',
      'Die in adverse conditions',
      'Dispersed by air current',
      'Extremely resistant and survive for several years'
    ],
    correct_index: 1,
    solution: 'Spores of slime moulds possess true cellulosic walls and are extremely resistant; they survive through adverse conditions for several years rather than dying.'
  },
  {
    qNo: 85,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Protozoan Diseases',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: '"Sleeping sickness" is caused by',
    options: [
      'Entamoeba',
      'Plasmodium',
      'Trypanosoma',
      'Gonyaulax'
    ],
    correct_index: 2,
    solution: 'African sleeping sickness is caused by the flagellated parasitic protozoan Trypanosoma gambiense, transmitted by the tsetse fly (Glossina).'
  },
  {
    qNo: 86,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Ascomycetes Life Cycle',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'The given events in sexual life cycle represent which group of fungi?\n♂ & ♀ sex organs -> Plasmogamy -> Dikaryophase (n + n) -> Karyogamy -> Meiosis -> Sexual spore',
    options: [
      'Agaricus, puffball, Bracket fungi',
      'Rust fungi, smut fungi, bread mould',
      'Morels, Truffles, Penicillium',
      'Puccinia, Aspergillus, Agaricus'
    ],
    correct_index: 2,
    solution: 'In Ascomycetes (such as Morels and Truffles), distinct sex organs (antheridium and ascogonium) undergo plasmogamy to form an intervening dikaryophase, followed by karyogamy and meiosis inside asci to form ascospores.'
  },
  {
    qNo: 87,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycoplasma',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Select the incorrect statement w.r.t. Mycoplasma',
    options: [
      'Smallest living cell',
      'Completely lack a cell wall',
      'Cannot survive without oxygen',
      'Pathogenic in animals and plants'
    ],
    correct_index: 2,
    solution: 'Mycoplasmas are facultative anaerobes that can survive in the absence of oxygen.'
  },
  {
    qNo: 88,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dikaryophase in Fungi',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Dikaryotic stage is present in the members of',
    options: [
      'Basidiomycetes and Zygomycetes',
      'Ascomycetes and Phycomycetes',
      'Basidiomycetes and Ascomycetes',
      'Oomycetes and Zygomycetes'
    ],
    correct_index: 2,
    solution: 'An extended intervening dikaryotic stage (n + n) occurs characteristically in Ascomycetes and Basidiomycetes.'
  },
  {
    qNo: 89,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Euglenoids',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Euglena is found mostly in',
    options: [
      'Marine water',
      'Fresh and river water',
      'Marine and fresh water',
      'Fresh and stagnant water'
    ],
    correct_index: 3,
    solution: 'Euglenoids like Euglena predominantly inhabit fresh and stagnant water bodies such as ponds, pools, and ditches.'
  },
  {
    qNo: 90,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Phytophthora',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Late blight of potato disease is caused by a fungi which possess',
    options: [
      'Coenocytic hyphae',
      'Septate condition',
      'Dolipore septum',
      'Simple septum'
    ],
    correct_index: 0,
    solution: 'Late blight of potato is caused by Phytophthora infestans (an Oomycete), which possesses aseptate, coenocytic hyphae.'
  },
  {
    qNo: 91,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Mycorrhiza in Gymnosperms',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Roots of Pinus show ______ association with ______',
    options: [
      'Ectomycorrhizal, Glomus',
      'Endomycorrhizal, Boletus',
      'Ectomycorrhizal, Boletus',
      'Endomycorrhizal, Glomus'
    ],
    correct_index: 2,
    solution: 'Pinus roots form obligate ectomycorrhizal associations with basidiomycete fungi such as Boletus or Amanita.'
  },
  {
    qNo: 92,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Parasitic Fungi',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Select the group of parasitic fungus',
    options: [
      'Albugo, Rhizopus, Yeast',
      'Yeast, Puccinia, Ustilago',
      'Albugo, Puccinia, Ustilago',
      'Puccinia, Albugo, Agaricus'
    ],
    correct_index: 2,
    solution: 'Albugo (white rust of crucifers), Puccinia (rust fungus), and Ustilago (smut fungus) are all obligate plant parasites. Yeast and Agaricus are saprophytic.'
  },
  {
    qNo: 93,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viroids',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Identify the correct statements w.r.t. infectious agent discovered by T.O. Diener:\nA. It is larger than virus.\nB. Contains free and low molecular weight RNA.\nC. Causes potato spindle tuber disease.\nD. Protein coat is present.',
    options: [
      'A and D',
      'B and C',
      'B and D',
      'A and B'
    ],
    correct_index: 1,
    solution: 'T.O. Diener discovered viroids (PSTVd), which consist of a free, low molecular weight infectious RNA lacking a protein capsid (coat) and are smaller than viruses.'
  },
  {
    qNo: 94,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Photosynthetic Bacteria',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Oxygenic photosynthesis is found in',
    options: [
      'Bacillus',
      'Chlorobium',
      'Chromatium',
      'Anabaena'
    ],
    correct_index: 3,
    solution: 'Anabaena is a cyanobacterium that performs oxygenic photosynthesis using water as an electron donor, liberating O2. Chlorobium and Chromatium perform anoxygenic photosynthesis using H2S.'
  },
  {
    qNo: 95,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Nutrition Types',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Which of the following is not correctly matched with its category?',
    options: [
      'Purple sulphur bacteria - Thiospirillum',
      'Sulphur bacteria - Thiobacillus',
      'Green non-sulphur bacteria - Rhodospirillum',
      'Iron bacteria - Leptothrix'
    ],
    correct_index: 2,
    solution: 'Rhodospirillum is a purple non-sulfur bacterium, not a green non-sulfur bacterium (Chloroflexus is green non-sulfur).'
  },
  {
    qNo: 96,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Transduction',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Transfer of genetic material in bacteria through bacteriophage is',
    options: [
      'Conjugation',
      'Transduction',
      'Transformation',
      'Competence'
    ],
    correct_index: 1,
    solution: 'Transduction is the transfer of bacterial genes from one bacterium to another mediated by a bacteriophage (virus).'
  },
  {
    qNo: 97,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Archaebacteria Types',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Heterotrophic archaebacteria is',
    options: [
      'Methanococcus',
      'Halococcus',
      'Thermoplasma',
      'Thermoproteus'
    ],
    correct_index: 2,
    solution: 'Thermoplasma is a facultative/obligate heterotrophic, wall-less thermoacidophilic archaebacterium.'
  },
  {
    qNo: 98,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Bacterial Physiology',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Identify the statements as true (T) or false (F):\n(I) Cell division in bacteria is amitotic.\n(II) Ca-DPA complex give resistant to endospore present in spore coat layer.\n(III) Ability to pick up DNA from solution is competence.\n(IV) F- cell of bacteria cannot form sex-pili.',
    options: [
      'T, T, T, T',
      'T, F, T, T',
      'F, T, T, F',
      'T, F, T, F'
    ],
    correct_index: 1,
    solution: 'Statements I, III, and IV are True. Statement II is False because calcium dipicolinate (Ca-DPA) is located in the core/cortex of the endospore rather than the spore coat.'
  },
  {
    qNo: 99,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Cyanobacteria',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Statement A: Cyanobacteria are characterised by the absence of flagellum throughout life cycle.\nStatement B: In all cyanobacteria nitrogen fixation take place.',
    options: [
      'Only Statement A is correct',
      'Both Statement A and B are correct',
      'Only Statement B is correct',
      'Both Statement A and B are incorrect'
    ],
    correct_index: 0,
    solution: 'Statement A is correct: cyanobacteria lack flagella at all stages. Statement B is incorrect: nitrogen fixation is not performed by all cyanobacteria, but only by specific genera (e.g. Nostoc, Anabaena).'
  },
  {
    qNo: 100,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Five Kingdom System Limitations',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: "In Whittaker's five kingdom classification there is no place for",
    options: [
      'Virus',
      'Viroid',
      'Prions',
      'Both (1) and (2)'
    ],
    correct_index: 3,
    solution: 'Acellular entities such as viruses, viroids, and prions find no mention or placement in Whittaker\'s five-kingdom classification.'
  },
  {
    qNo: 101,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Lichens',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'The main function of mycobiont in lichen is',
    options: [
      'To prepare food for algae',
      'Provide shelter for algae',
      'Digest algae',
      'Both (1) and (2)'
    ],
    correct_index: 1,
    solution: 'In a lichen, the fungal partner (mycobiont) provides shelter, absorbs water and minerals, while the algal partner synthesizes food.'
  },
  {
    qNo: 102,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Dinoflagellates Life Cycle',
    question_type: 'single_choice',
    difficulty: 'medium',
    marks: 4,
    question_text: 'Life cycle of Dinoflagellates involve',
    options: [
      'Zygotic Meiosis',
      'Gametic Meiosis',
      'Sporic Meiosis',
      'Both (1) and (2)'
    ],
    correct_index: 0,
    solution: 'Dinoflagellates generally possess a haplontic life cycle where the only diploid stage is the zygote, which undergoes zygotic meiosis.'
  },
  {
    qNo: 103,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Slime Moulds',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'The consumer-decomposer protist is',
    options: [
      'Slime-mould',
      'Euglena',
      'Chlamydomonas',
      'Nostoc'
    ],
    correct_index: 0,
    solution: 'Slime moulds are saprophytic protists that act as consumer-decomposers in terrestrial environments.'
  },
  {
    qNo: 104,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Euglenoids Food Storage',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Paramylum is reserve food in',
    options: [
      'Euglena',
      'Noctiluca',
      'Ceratium',
      'Gymnodinium'
    ],
    correct_index: 0,
    solution: 'Euglena stores surplus carbohydrates in the cytoplasm in the form of a unique polysaccharide called paramylum.'
  },
  {
    qNo: 105,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Viroids History',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'T.O. Diener discovered the viroid named',
    options: [
      'TMV',
      'CaMV',
      'PSTVd',
      'STMV'
    ],
    correct_index: 2,
    solution: 'T.O. Diener (1971) discovered viroids as the causative agent of Potato Spindle Tuber disease (PSTVd).'
  },
  {
    qNo: 106,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Cell Features',
    question_type: 'single_choice',
    difficulty: 'hard',
    marks: 4,
    question_text: 'Unicisternal golgi bodies is characterised in those organism whose reserve food material is stored in form of',
    options: [
      'Oil and glycogen',
      'Oil only',
      'Phosphate',
      'Paramylon'
    ],
    correct_index: 0,
    solution: 'Fungi possess single-cisternal Golgi bodies (dictyosomes) and store reserve food primarily as glycogen and oil droplets.'
  },
  {
    qNo: 107,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Sporozoans',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which protozoan lack locomotory structure?',
    options: [
      'Amoeba',
      'Trypanosoma',
      'Sporozoan',
      'Ciliates'
    ],
    correct_index: 2,
    solution: 'Sporozoans (e.g. Plasmodium) are parasitic protozoa that completely lack specialized locomotory structures.'
  },
  {
    qNo: 108,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Hyphae',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Aseptate hyphae is present in',
    options: [
      'Oomycetes',
      'Zygomycetes and Basidiomycetes',
      'Basidiomycetes',
      'Ascomycetes'
    ],
    correct_index: 0,
    solution: 'Lower fungi (Phycomycetes, including Oomycetes and Zygomycetes) have aseptate, coenocytic hyphae.'
  },
  {
    qNo: 109,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Fungal Spores',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Which of the following is not a sexual spore in fungi?',
    options: [
      'Zoospore',
      'Oospore',
      'Ascospore',
      'Basidiospore'
    ],
    correct_index: 0,
    solution: 'Zoospores are motile asexual spores; Oospores, Ascospores, and Basidiospores are sexual spores.'
  },
  {
    qNo: 110,
    chapter: CHAPTER,
    subject: SUBJECT,
    category: CATEGORY,
    topic: 'Ascospores vs Basidiospores',
    question_type: 'single_choice',
    difficulty: 'easy',
    marks: 4,
    question_text: 'Ascospores are different from basidiospores as they are',
    options: [
      'Four in number in ascus',
      'Sexual spore',
      'Endogenous in nature',
      'Asexual spore'
    ],
    correct_index: 2,
    solution: 'Ascospores are produced endogenously within sac-like asci, whereas basidiospores are produced exogenously on basidia.'
  }
];
