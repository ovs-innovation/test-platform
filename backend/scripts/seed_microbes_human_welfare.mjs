import { query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

const SECTION_A_QUESTIONS = [
  {
    original_number: 1,
    question_type: 'single_choice',
    question_text: 'How many are associated with secondary treatment in STP from the given box?\n\n[ Primary sludge, Aeration tank, Flocs, Sequential filtration, UV ray treatment, Reverse osmosis, Anaerobic sludge digesters, Decrease in BOD, Chlorination ]',
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '6' },
      { key: 'C', text: '4' },
      { key: 'D', text: '2' },
    ],
    correct_index: 2,
    solution: 'Aeration tank, flocs, anaerobic sludge digesters, and decrease in BOD are associated with secondary (biological) treatment of sewage in an STP.',
  },
  {
    original_number: 2,
    question_type: 'single_choice',
    question_text: 'Read the statements and choose the correct option accordingly.\nStatement A : Dried spores of Bacillus thuringiensis (Bt) is used as bioinsecticide.\nStatement B : Bt can be introduced to control butterfly caterpillars.',
    options: [
      { key: 'A', text: 'Both statements are correct' },
      { key: 'B', text: 'Both statements are incorrect' },
      { key: 'C', text: 'Only A is correct' },
      { key: 'D', text: 'Only B is correct' },
    ],
    correct_index: 0,
    solution: 'Dried spores of Bacillus thuringiensis are mixed with water and sprayed onto plants to control butterfly caterpillars and other insect pests.',
  },
  {
    original_number: 3,
    question_type: 'single_choice',
    question_text: 'Toddy is fermented sap of',
    options: [
      { key: 'A', text: 'Yeast' },
      { key: 'B', text: 'Caryota urens' },
      { key: 'C', text: 'Bacteria' },
      { key: 'D', text: 'Sugarcane' },
    ],
    correct_index: 1,
    solution: 'Toddy is a traditional fermented beverage made from the sap of palm trees such as Caryota urens (fishtail palm).',
  },
  {
    original_number: 4,
    question_type: 'single_choice',
    question_text: 'Which one is not a tool used for IPM (Integrated Pest Management)?',
    options: [
      { key: 'A', text: 'Summer ploughing' },
      { key: 'B', text: 'Late planting' },
      { key: 'C', text: 'Excess use of pesticides' },
      { key: 'D', text: 'Quarantine measures' },
    ],
    correct_index: 2,
    solution: 'Excess use of chemical pesticides destroys natural predators and harms ecosystems, which is contrary to the core principles of Integrated Pest Management (IPM).',
  },
  {
    original_number: 5,
    question_type: 'single_choice',
    question_text: 'Which one is incorrect statement with respect to discovery of penicillin?',
    options: [
      { key: 'A', text: 'Fleming found the growth of mould inhibited the growth of Staphylococci in culture plate' },
      { key: 'B', text: 'Fleming found that the chemical was produced by the mould Penicillium notatum and named it Penicillin' },
      { key: 'C', text: 'Penicillin acts on cell wall of plant cells' },
      { key: 'D', text: 'Fleming, Chain and Florey were awarded Nobel prize for this discovery' },
    ],
    correct_index: 2,
    solution: 'Penicillin specifically inhibits the cross-linking of bacterial peptidoglycan cell walls, and has no action on plant cell walls.',
  },
  {
    original_number: 6,
    question_type: 'single_choice',
    question_text: 'Bottled juices are clarified by the use of',
    options: [
      { key: 'A', text: 'Pectinases' },
      { key: 'B', text: 'Proteases' },
      { key: 'C', text: 'Lipase' },
      { key: 'D', text: 'Both (1) and (2)' },
    ],
    correct_index: 3,
    solution: 'Commercial bottled fruit juices are clarified using pectinases and proteases to break down pectin and proteinaceous hazes.',
  },
  {
    original_number: 7,
    question_type: 'single_choice',
    question_text: 'In which stage of sewage treatment pathogens and pesticides can be removed?',
    options: [
      { key: 'A', text: 'Primary treatment' },
      { key: 'B', text: 'Secondary treatment' },
      { key: 'C', text: 'Biological treatment' },
      { key: 'D', text: 'Tertiary treatment' },
    ],
    correct_index: 3,
    solution: 'Tertiary sewage treatment is a physicochemical process (e.g. chlorination, ozonation, UV treatment, reverse osmosis) that removes dissolved chemicals, pesticides, and residual pathogens.',
  },
  {
    original_number: 8,
    question_type: 'single_choice',
    question_text: 'Cyanobacteria help farmers by',
    options: [
      { key: 'A', text: 'Reducing alkalinity of soil' },
      { key: 'B', text: 'Ammonification' },
      { key: 'C', text: 'Reducing acidity of soil' },
      { key: 'D', text: 'By denitrification' },
    ],
    correct_index: 0,
    solution: 'By fixing atmospheric nitrogen and adding organic acids and biomass, cyanobacteria help reclaim "usar" or alkaline soils by reducing alkalinity.',
  },
  {
    original_number: 9,
    question_type: 'single_choice',
    question_text: 'Select odd one w.r.t. source of antibiotics.',
    options: [
      { key: 'A', text: 'Bacteria' },
      { key: 'B', text: 'Fungi' },
      { key: 'C', text: 'Actinomycetes' },
      { key: 'D', text: 'Protozoans' },
    ],
    correct_index: 3,
    solution: 'Antibiotics are secondary metabolites produced by bacteria, fungi, and actinomycetes. Protozoans are not commercial sources of antibiotics.',
  },
  {
    original_number: 10,
    question_type: 'single_choice',
    question_text: 'Microbe used for the production of pectinase is',
    options: [
      { key: 'A', text: 'Aspergillus niger' },
      { key: 'B', text: 'Rhizopus' },
      { key: 'C', text: 'Bacillus species' },
      { key: 'D', text: 'Acetobacter' },
    ],
    correct_index: 0,
    solution: 'Aspergillus niger is an industrial fungal strain widely used for producing pectinase and citric acid.',
  },
  {
    original_number: 11,
    question_type: 'single_choice',
    question_text: 'Treatment of waste water is done by',
    options: [
      { key: 'A', text: 'Chemoautotrophic microbes already present in sewage' },
      { key: 'B', text: 'Heterotrophic microbes inoculated in sewage from outside only' },
      { key: 'C', text: 'Heterotrophic microbes naturally present in sewage' },
      { key: 'D', text: 'Photoautotrophic microbes present in sewage' },
    ],
    correct_index: 2,
    solution: 'NCERT Biology confirms that sewage wastewater treatment relies on heterotrophic microbes naturally present in the sewage.',
  },
  {
    original_number: 12,
    question_type: 'single_choice',
    question_text: 'Which of the following is odd w.r.t. free living nitrogen fixing bacteria?',
    options: [
      { key: 'A', text: 'Rhizobium' },
      { key: 'B', text: 'Clostridium' },
      { key: 'C', text: 'Rhodospirillum' },
      { key: 'D', text: 'Azotobacter' },
    ],
    correct_index: 0,
    solution: 'Rhizobium is a symbiotic nitrogen fixer in leguminous root nodules, while Clostridium, Rhodospirillum, and Azotobacter can fix nitrogen in free-living state.',
  },
  {
    original_number: 13,
    question_type: 'single_choice',
    question_text: 'The first antibiotic penicillin was discovered by',
    options: [
      { key: 'A', text: 'Chain and Florey' },
      { key: 'B', text: 'Waksman' },
      { key: 'C', text: 'Albert' },
      { key: 'D', text: 'Alexander Fleming' },
    ],
    correct_index: 3,
    solution: 'Penicillin was discovered serendipitously by Alexander Fleming in 1928.',
  },
  {
    original_number: 14,
    question_type: 'single_choice',
    question_text: 'Besides paddy fields, cyanobacteria are also found inside vegetative part of',
    options: [
      { key: 'A', text: 'Equisetum' },
      { key: 'B', text: 'Cycas' },
      { key: 'C', text: 'Psilotum' },
      { key: 'D', text: 'Pinus' },
    ],
    correct_index: 1,
    solution: 'Coralloid roots of Cycas contain endophytic symbiotic cyanobacteria (Anabaena cycadae / Nostoc) that fix nitrogen.',
  },
  {
    original_number: 15,
    question_type: 'single_choice',
    question_text: 'Which of the following microbe is used for ripening of swiss cheese?',
    options: [
      { key: 'A', text: 'Penicillium roqueforti' },
      { key: 'B', text: 'Penicillium camemberti' },
      { key: 'C', text: 'Propionibacterium sharmanii' },
      { key: 'D', text: 'Streptomyces griseus' },
    ],
    correct_index: 2,
    solution: 'Propionibacterium sharmanii produces large amounts of CO2, creating the characteristic large holes in Swiss cheese.',
  },
  {
    original_number: 16,
    question_type: 'single_choice',
    question_text: 'Mark the odd one w.r.t. Nucleopolyhedrovirus (NPV).',
    options: [
      { key: 'A', text: 'Broad spectrum herbicidal application' },
      { key: 'B', text: 'Species-specific' },
      { key: 'C', text: 'Used as biocontrol agent' },
      { key: 'D', text: 'Nucleoprotein particles' },
    ],
    correct_index: 0,
    solution: 'Nucleopolyhedroviruses (Baculoviruses) are narrow-spectrum species-specific insecticidal biocontrol agents; they do not have broad-spectrum herbicidal activity.',
  },
  {
    original_number: 17,
    question_type: 'single_choice',
    question_text: 'Alcoholic beverage with maximum alcohol content is',
    options: [
      { key: 'A', text: 'Beer' },
      { key: 'B', text: 'Brandy' },
      { key: 'C', text: 'Whisky' },
      { key: 'D', text: 'Gin' },
    ],
    correct_index: 1,
    solution: 'Brandy, obtained from distillation of wine, contains around 40-50% or higher alcohol by volume, higher than beer, whisky, or gin.',
  },
  {
    original_number: 18,
    question_type: 'single_choice',
    question_text: 'Mark incorrect match.',
    options: [
      { key: 'A', text: 'Dragonfly – Biocontrol agent' },
      { key: 'B', text: 'Anaerobic sludge digestor – Biogas production' },
      { key: 'C', text: 'Oscillatoria – Increases alkalinity of soil' },
      { key: 'D', text: 'Mycorrhiza – Biofertilizer' },
    ],
    correct_index: 2,
    solution: 'Oscillatoria is a cyanobacterium that enriches soil organic matter and nitrogen, reducing alkalinity rather than increasing it.',
  },
  {
    original_number: 19,
    question_type: 'single_choice',
    question_text: 'Read the following statements:\n(a) Curd is more nutritious than milk\n(b) Cheese is a partially degraded concentrate of milk fat and casein protein\n(c) Swelling of dough during bread making is called leavening\n(d) Wine and beer are produced without distillation\nHow many statements are correct?',
    options: [
      { key: 'A', text: 'Two' },
      { key: 'B', text: 'Four' },
      { key: 'C', text: 'Three' },
      { key: 'D', text: 'One' },
    ],
    correct_index: 1,
    solution: 'All four statements (a, b, c, d) are accurate according to NCERT Class 12 Biology.',
  },
  {
    original_number: 43,
    question_type: 'single_choice',
    question_text: 'Which of the following is incorrectly matched?\n\n(1) VAM - Phosphate absorption\n(2) Tertiary sewage treatment - Physico-chemical process\n(3) Ozone gas - Primary treatment\n(4) Rotenone - Natural insecticide',
    options: [
      { key: 'A', text: 'VAM - Phosphate absorption' },
      { key: 'B', text: 'Tertiary sewage treatment - Physico-chemical process' },
      { key: 'C', text: 'Ozone gas - Primary treatment' },
      { key: 'D', text: 'Rotenone - Natural insecticide' },
    ],
    correct_index: 2,
    solution: 'Ozone gas is utilized in tertiary treatment for disinfection, whereas primary treatment consists strictly of physical filtration and sedimentation.',
  },
  {
    original_number: 44,
    question_type: 'single_choice',
    question_text: 'Major component of biogas is',
    options: [
      { key: 'A', text: 'H2' },
      { key: 'B', text: 'H2S' },
      { key: 'C', text: 'CO2' },
      { key: 'D', text: 'CH4' },
    ],
    correct_index: 3,
    solution: 'Methane (CH4) forms 50-70% of biogas and is its chief combustible component.',
  },
  {
    original_number: 45,
    question_type: 'single_choice',
    question_text: 'Observe the given diagram of a typical biogas plant and name the labelled parts A, B and C.',
    image_url: '/uploads/botany/microbes_q45_biogas.png',
    options: [
      { key: 'A', text: 'A – Aerobic digester, B – Gas, C – Dung water' },
      { key: 'B', text: 'A – Biogas plant, B – Gas, C – Aerobic digester' },
      { key: 'C', text: 'A – Anaerobic digester, B – Gas holder, C – Dung water' },
      { key: 'D', text: 'A – Gobar gas plant, B – Anaerobic digester, C – Dung water' },
    ],
    correct_index: 2,
    solution: 'In NCERT Fig. 10.8: A is the cylindrical anaerobic digester tank, B is the floating gas holder that rises as gas is produced, and C is the inlet pit containing slurry of dung and water.',
  },
  {
    original_number: 46,
    question_type: 'single_choice',
    question_text: 'Which of the following material takes the longest time for biodegradation?',
    options: [
      { key: 'A', text: 'Cotton' },
      { key: 'B', text: 'Paper' },
      { key: 'C', text: 'Bone' },
      { key: 'D', text: 'Jute' },
    ],
    correct_index: 2,
    solution: 'Bones contain tough mineralized hydroxyapatite and collagen ossein matrix, persisting for decades to centuries before decomposing.',
  },
  {
    original_number: 47,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is not concerned with antibiotics?',
    options: [
      { key: 'A', text: 'They are "prolife" in context of human beings' },
      { key: 'B', text: 'Have ability to kill or retard the growth of microbes' },
      { key: 'C', text: 'Work by acting on different metabolic pathways' },
      { key: 'D', text: 'First antibiotic was obtained from a member of Actinomycetes' },
    ],
    correct_index: 3,
    solution: 'The first antibiotic, penicillin, was isolated from the fungus Penicillium notatum, not an Actinomycete.',
  },
  {
    original_number: 48,
    question_type: 'single_choice',
    question_text: 'Choose the correct sequence of microbes involved in biogas production.',
    options: [
      { key: 'A', text: 'Fermentative microbes, decomposers, methanogens' },
      { key: 'B', text: 'Decomposers, methanogens, putrefying microbes' },
      { key: 'C', text: 'Putrefying microbes, methanogens, saprophytic microbes' },
      { key: 'D', text: 'Decomposers, fermentative microbes, methanogens' },
    ],
    correct_index: 3,
    solution: 'Anaerobic digestion proceeds from decomposers (hydrolysis) -> fermentative microbes (acidogenesis) -> methanogens (methanogenesis).',
  },
  {
    original_number: 49,
    question_type: 'single_choice',
    question_text: 'In the STPs, biological process of microbial degradation of organic matter involves',
    options: [
      { key: 'A', text: 'Utilisation of activated sludge as inoculum produced in the physical process' },
      { key: 'B', text: 'Only anaerobic breakdown of organic matter' },
      { key: 'C', text: 'Masses of unicellular fungi entangled with filamentous bacterial forms represent flocs' },
      { key: 'D', text: 'Reduction in dissolved oxygen after the microbial activity' },
    ],
    correct_index: 3,
    solution: 'Rapid aerobic microbial decomposition utilizes dissolved oxygen, lowering DO until the organic load and BOD are stabilized.',
  },
  {
    original_number: 50,
    question_type: 'single_choice',
    question_text: 'Baculoviruses does not show',
    options: [
      { key: 'A', text: 'Host specificity' },
      { key: 'B', text: 'Narrow spectrum applications' },
      { key: 'C', text: 'Effects on non-target pathogens' },
      { key: 'D', text: 'Utility in IPM programme' },
    ],
    correct_index: 2,
    solution: 'Baculoviruses (genus Nucleopolyhedrovirus) are species-specific narrow spectrum agents that have no adverse effects on non-target organisms or plants.',
  },
  {
    original_number: 51,
    question_type: 'single_choice',
    question_text: 'Enzyme which has the fibrinolytic effect preventing blood clots from growing is',
    options: [
      { key: 'A', text: 'Protease' },
      { key: 'B', text: 'Amylase' },
      { key: 'C', text: 'Lipase' },
      { key: 'D', text: 'Streptokinase' },
    ],
    correct_index: 3,
    solution: 'Streptokinase is a clot-buster enzyme that activates plasminogen to dissolve intravascular fibrin clots.',
  },
  {
    original_number: 52,
    question_type: 'single_choice',
    question_text: 'Statins are produced by a _______ and have been commercialised as _______',
    options: [
      { key: 'A', text: 'Bacteria, blood-cholesterol lowering agent' },
      { key: 'B', text: 'Trichoderma, immunosuppressive agent' },
      { key: 'C', text: 'Yeast, blood-cholesterol lowering agent' },
      { key: 'D', text: 'Bacteria, clot buster' },
    ],
    correct_index: 2,
    solution: 'Statins are produced by the yeast Monascus purpureus and act as blood-cholesterol lowering agents.',
  },
  {
    original_number: 53,
    question_type: 'single_choice',
    question_text: 'The fermentative activity of fungus Trichoderma polysporum yields which of the following substance?',
    options: [
      { key: 'A', text: 'Statin' },
      { key: 'B', text: 'Cyclosporin - A' },
      { key: 'C', text: 'Gluconic acid' },
      { key: 'D', text: 'Soya sauce' },
    ],
    correct_index: 1,
    solution: 'Cyclosporin-A is produced by Trichoderma polysporum and used as an immunosuppressant in organ transplant recipients.',
  },
  {
    original_number: 54,
    question_type: 'single_choice',
    question_text: 'Large holed Swiss cheese is ripened with the help of CO2 producing bacterium called',
    options: [
      { key: 'A', text: 'Saccharomyces cerevisiae' },
      { key: 'B', text: 'Leuconostoc cremoris' },
      { key: 'C', text: 'Streptococcus cremoris' },
      { key: 'D', text: 'Propionibacterium sharmanii' },
    ],
    correct_index: 3,
    solution: 'Propionibacterium sharmanii produces large quantities of carbon dioxide gas during the ripening of Swiss cheese.',
  },
  {
    original_number: 55,
    question_type: 'single_choice',
    question_text: 'Yoghurt is produced by curdling of milk with the help of',
    options: [
      { key: 'A', text: 'Streptococcus thermophilus and Lactobacillus bulgaricus' },
      { key: 'B', text: 'Streptococcus lactis and Streptococcus cremoris' },
      { key: 'C', text: 'Lactobacillus acidophilus and Fusarium oxysporum' },
      { key: 'D', text: 'Spirulina and Saccharomyces cerevisiae' },
    ],
    correct_index: 0,
    solution: 'Yoghurt is prepared using a symbiotic starter culture of Streptococcus thermophilus and Lactobacillus bulgaricus.',
  },
  {
    original_number: 56,
    question_type: 'single_choice',
    question_text: 'Roquefort cheese is ripened by a member of',
    options: [
      { key: 'A', text: 'Basidiomycetes' },
      { key: 'B', text: 'Deuteromycetes' },
      { key: 'C', text: 'Ascomycetes' },
      { key: 'D', text: 'Phycomycetes' },
    ],
    correct_index: 2,
    solution: 'Roquefort cheese is ripened by Penicillium roqueforti, an ascomycetous fungus.',
  },
  {
    original_number: 57,
    question_type: 'single_choice',
    question_text: 'Find odd one out w.r.t. bioinsecticides.',
    options: [
      { key: 'A', text: 'Bacillus thuringiensis' },
      { key: 'B', text: 'Rotenone is obtained from roots of Trichoderma' },
      { key: 'C', text: 'Species specific nucleopolyhedrovirus' },
      { key: 'D', text: 'Azadirachtin from neem' },
    ],
    correct_index: 1,
    solution: 'Rotenone is a natural bioinsecticide derived from roots of Derris and Lonchocarpus plants, not the fungus Trichoderma.',
  },
  {
    original_number: 58,
    question_type: 'single_choice',
    question_text: 'Match Column I with Column II and choose the correct option:\n\nColumn I:\na. Statins\nb. Swiss cheese\nc. Cyclosporin A\nd. Citric acid\n\nColumn II:\n(i) Propionibacterium\n(ii) Aspergillus\n(iii) Monascus\n(iv) Trichoderma',
    options: [
      { key: 'A', text: 'a(ii), b(i), c(iii), d(iv)' },
      { key: 'B', text: 'a(iv), b(iii), c(i), d(ii)' },
      { key: 'C', text: 'a(iii), b(i), c(iv), d(ii)' },
      { key: 'D', text: 'a(i), b(iii), c(iv), d(ii)' },
    ],
    correct_index: 2,
    solution: 'Statins -> Monascus; Swiss cheese -> Propionibacterium; Cyclosporin A -> Trichoderma; Citric acid -> Aspergillus.',
  },
  {
    original_number: 59,
    question_type: 'single_choice',
    question_text: 'Biological activities are carried out in which of the following stages in sewage treatment plant?',
    options: [
      { key: 'A', text: 'Primary treatment' },
      { key: 'B', text: 'Secondary treatment' },
      { key: 'C', text: 'Tertiary treatment' },
      { key: 'D', text: 'Chemical treatment' },
    ],
    correct_index: 1,
    solution: 'Secondary treatment in STPs is the biological stage where aerobic and anaerobic microbes digest organic waste.',
  },
  {
    original_number: 60,
    question_type: 'single_choice',
    question_text: 'Baculoviruses are pathogens that attack',
    options: [
      { key: 'A', text: 'Birds and mammals' },
      { key: 'B', text: 'Fishes and reptiles' },
      { key: 'C', text: 'Insects and other arthropods' },
      { key: 'D', text: 'Pathogenic fungi' },
    ],
    correct_index: 2,
    solution: 'Baculoviruses specifically infect insects and other arthropods.',
  },
  {
    original_number: 61,
    question_type: 'single_choice',
    question_text: 'Which of the following is used in the preparation of curd?',
    options: [
      { key: 'A', text: 'Propionibacterium sharmanii' },
      { key: 'B', text: 'Lactobacillus acidophilus' },
      { key: 'C', text: 'Penicillium roqueforti' },
      { key: 'D', text: 'Penicillium camemberti' },
    ],
    correct_index: 1,
    solution: 'Lactobacillus acidophilus (LAB) ferments lactose into lactic acid to produce curd.',
  },
  {
    original_number: 62,
    question_type: 'single_choice',
    question_text: 'Which of the following is used in detergents to remove proteinaceous spots?',
    options: [
      { key: 'A', text: 'Citric acid' },
      { key: 'B', text: 'Gluconic acid' },
      { key: 'C', text: 'Proteases' },
      { key: 'D', text: 'Amylases' },
    ],
    correct_index: 2,
    solution: 'Proteases hydrolyze protein molecules, facilitating the removal of blood and food stains in laundry detergents.',
  },
  {
    original_number: 63,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is correct?',
    options: [
      { key: 'A', text: 'Alcoholic fermentation by yeast and conversion of alcohol to acetic acid both are aerobic processes' },
      { key: 'B', text: 'Alcoholic fermentation is aerobic and conversion of alcohol to acetic acid is anaerobic one' },
      { key: 'C', text: 'Alcoholic fermentation by yeast and conversion of acetic acid to methane by methanogens both are anaerobic processes' },
      { key: 'D', text: 'Alcoholic fermentation by yeast and conversion of acetic acid to methane both are aerobic processes' },
    ],
    correct_index: 2,
    solution: 'Both alcoholic fermentation by yeast and methane synthesis by methanogens occur in the absence of oxygen (anaerobic).',
  },
  {
    original_number: 64,
    question_type: 'single_choice',
    question_text: 'Which of the following is correct for mycorrhiza?',
    options: [
      { key: 'A', text: 'Absorbs nitrogen and water only' },
      { key: 'B', text: 'Helps in nitrogen fixation and hence, regarded as fertilizer' },
      { key: 'C', text: 'Absorb and store N, P, K and Ca' },
      { key: 'D', text: 'Restricted to gymnospermous plants only' },
    ],
    correct_index: 2,
    solution: 'Mycorrhizal fungi absorb and store essential mineral nutrients such as N, P, K, and Ca, passing them on to the plant partner.',
  },
  {
    original_number: 65,
    question_type: 'single_choice',
    question_text: 'The bioactive molecule produced by the yeast Monascus purpureus have been commercialised as',
    options: [
      { key: 'A', text: 'Immunosuppressive agent' },
      { key: 'B', text: 'Blood-cholesterol lowering agent' },
      { key: 'C', text: 'Clot buster' },
      { key: 'D', text: 'Agents to increase immunity' },
    ],
    correct_index: 1,
    solution: 'Monascus purpureus produces statins, which competitively inhibit HMG-CoA reductase and lower blood cholesterol.',
  },
  {
    original_number: 66,
    question_type: 'single_choice',
    question_text: 'Who was/were awarded Nobel prize in 1945 for the discovery of penicillin and establishing its potential effectiveness?',
    options: [
      { key: 'A', text: 'Alexander Fleming' },
      { key: 'B', text: 'Ernest chain and Howard Florey' },
      { key: 'C', text: 'Fleming, Chain and Florey' },
      { key: 'D', text: 'Howard Florey' },
    ],
    correct_index: 2,
    solution: 'Alexander Fleming, Ernst Boris Chain, and Sir Howard Walter Florey jointly received the Nobel Prize in Physiology or Medicine in 1945.',
  },
  {
    original_number: 67,
    question_type: 'single_choice',
    question_text: 'Nutritional quality of curd is better than milk due to presence of excess amount of',
    options: [
      { key: 'A', text: 'Vitamin C' },
      { key: 'B', text: 'Vitamin B6' },
      { key: 'C', text: 'Vitamin B12' },
      { key: 'D', text: 'Calcium' },
    ],
    correct_index: 2,
    solution: 'Lactic acid bacteria synthesize and enrich curd with Vitamin B12.',
  },
  {
    original_number: 68,
    question_type: 'single_choice',
    question_text: 'The technology of biogas production in India was',
    options: [
      { key: 'A', text: 'Imported from Japan' },
      { key: 'B', text: 'Imported from Denmark' },
      { key: 'C', text: 'Imported from USA' },
      { key: 'D', text: 'Developed in India due to efforts of IARI and KVIC' },
    ],
    correct_index: 3,
    solution: 'Biogas technology in India was developed through pioneering research by IARI and KVIC.',
  },
  {
    original_number: 69,
    question_type: 'single_choice',
    question_text: 'Most efficient nitrogen fixer in rice field is _______',
    options: [
      { key: 'A', text: 'Aulosira' },
      { key: 'B', text: 'Cylindrospermum' },
      { key: 'C', text: 'Nostoc' },
      { key: 'D', text: 'Microcystis' },
    ],
    correct_index: 0,
    solution: 'Aulosira fertilissima is regarded as the most active and dominant nitrogen-fixing blue-green alga in Indian paddy fields.',
  },
  {
    original_number: 70,
    question_type: 'single_choice',
    question_text: 'The enzyme which is not involved in leavening process, is',
    options: [
      { key: 'A', text: 'Zymase' },
      { key: 'B', text: 'Rennin' },
      { key: 'C', text: 'Amylase' },
      { key: 'D', text: 'Maltase' },
    ],
    correct_index: 1,
    solution: 'Rennin (chymosin) is a milk-clotting enzyme used in cheese making; it plays no role in bread leavening.',
  },
  {
    original_number: 71,
    question_type: 'single_choice',
    question_text: 'To make soft and porous bread, a small quantity of yeast powder is added to wheat flour and the same is kneaded. What is the correct event for it?',
    options: [
      { key: 'A', text: 'Amylase converts starch into maltose sugar' },
      { key: 'B', text: 'It is due to fermentation of glucose into pyruvate' },
      { key: 'C', text: 'It is due to production and accumulation of ethyl alcohol' },
      { key: 'D', text: 'It is due to evaporation of ethyl alcohol and CO2 gas' },
    ],
    correct_index: 3,
    solution: 'The spongy, porous texture of baked bread is created as carbon dioxide expands and ethyl alcohol evaporates during baking.',
  },
  {
    original_number: 72,
    question_type: 'single_choice',
    question_text: 'In STPs, primary sludge is produced when sewage is',
    options: [
      { key: 'A', text: 'Passed through filtration and sedimentation' },
      { key: 'B', text: 'Anaerobically digested' },
      { key: 'C', text: 'Treated with aerobic heterotrophic microbes in the aeration tank' },
      { key: 'D', text: 'Chlorinated and treated with UV rays' },
    ],
    correct_index: 0,
    solution: 'Primary sludge comprises settled solids from the physical filtration and sedimentation stage of sewage treatment.',
  },
  {
    original_number: 73,
    question_type: 'single_choice',
    question_text: 'Swelling of dough during bread making is due to the activities of enzymes',
    options: [
      { key: 'A', text: 'Zymase, protease and amylase' },
      { key: 'B', text: 'Amylase, pectinase and maltase' },
      { key: 'C', text: 'Protease, pectinase and zymase' },
      { key: 'D', text: 'Zymase, amylase and maltase' },
    ],
    correct_index: 3,
    solution: 'Amylase and maltase break down starch into glucose, which zymase ferments into ethanol and carbon dioxide.',
  },
  {
    original_number: 74,
    question_type: 'single_choice',
    question_text: 'Microbial degradation of organic matter in STP takes place during',
    options: [
      { key: 'A', text: 'Primary treatment' },
      { key: 'B', text: 'Secondary treatment' },
      { key: 'C', text: 'Tertiary treatment' },
      { key: 'D', text: 'Reverse osmosis' },
    ],
    correct_index: 1,
    solution: 'Secondary treatment is the biological stage where aerobic microbial flocs degrade organic matter.',
  },
  {
    original_number: 75,
    question_type: 'single_choice',
    question_text: 'Biogas',
    options: [
      { key: 'A', text: 'Production involves utilisation of obligate anaerobes only' },
      { key: 'B', text: 'Is methane rich fuel having CO2 and H2 traces' },
      { key: 'C', text: 'Generation involves use of fermentative microbes during solubilisation' },
      { key: 'D', text: 'Has calorific value of 4429 kcal/m³' },
    ],
    correct_index: 1,
    solution: 'Biogas is primarily methane (50-70%) along with CO2 (30-40%) and traces of H2, N2, and H2S.',
  },
  {
    original_number: 76,
    question_type: 'single_choice',
    question_text: 'Eleven membered cyclic oligopeptides obtained from fungus Trichoderma polysporum and used as immunosuppressive agent is',
    options: [
      { key: 'A', text: 'Statin' },
      { key: 'B', text: 'Streptokinase' },
      { key: 'C', text: 'Cyclosporin A' },
      { key: 'D', text: 'Proteases' },
    ],
    correct_index: 2,
    solution: 'Cyclosporin-A is an 11-residue cyclic peptide produced by Trichoderma polysporum.',
  },
  {
    original_number: 77,
    question_type: 'single_choice',
    question_text: 'Find the incorrect statement(s).\na. Flocs are masses of anaerobic bacteria associated with fungal filaments\nb. BOD gets reduced significantly when the secondary treatment is done using aerobic microbes\nc. Activated sludge can be sedimented only after anaerobic digestion of sewage\nd. Mixture of gases is released during aerobic digestion of sewage',
    options: [
      { key: 'A', text: 'a, b, c & d' },
      { key: 'B', text: 'Only c' },
      { key: 'C', text: "All, except b" },
      { key: 'D', text: 'a, b & d' },
    ],
    correct_index: 2,
    solution: 'Statements a, c, and d are false. Statement b is correct, making "All, except b" incorrect.',
  },
  {
    original_number: 78,
    question_type: 'single_choice',
    question_text: 'The effective biocontrol agent of several plant pathogens is',
    options: [
      { key: 'A', text: 'Bacillus thuringiensis' },
      { key: 'B', text: 'Ladybird beetle' },
      { key: 'C', text: 'Trichoderma' },
      { key: 'D', text: 'Baculovirus' },
    ],
    correct_index: 2,
    solution: 'NCERT highlights Trichoderma species as free-living root fungi that serve as effective biocontrol agents of several fungal plant pathogens.',
  },
  {
    original_number: 79,
    question_type: 'single_choice',
    question_text: 'Select the correct match.\n\nColumn-I:\na. Gluconic acid\nb. Cyclosporin A\nc. Statins\nd. Streptomycin\n\nColumn-II:\n(i) Streptomyces griseus\n(ii) Monascus purpureus\n(iii) Trichoderma polysporum\n(iv) Penicillium species',
    options: [
      { key: 'A', text: 'a(iv), b(iii), c(ii), d(i)' },
      { key: 'B', text: 'a(i), b(iii), c(ii), d(iv)' },
      { key: 'C', text: 'a(iii), b(iv), c(ii), d(i)' },
      { key: 'D', text: 'a(ii), b(i), c(iv), d(iii)' },
    ],
    correct_index: 0,
    solution: 'Gluconic acid -> Penicillium; Cyclosporin A -> Trichoderma; Statins -> Monascus; Streptomycin -> Streptomyces griseus.',
  },
  {
    original_number: 80,
    question_type: 'single_choice',
    question_text: 'Select the incorrect match.',
    options: [
      { key: 'A', text: 'Monascus – Statins' },
      { key: 'B', text: 'Trichoderma – Thurioside' },
      { key: 'C', text: 'Aspergillus – Citric acid' },
      { key: 'D', text: 'Propionibacterium – Swiss cheese' },
    ],
    correct_index: 1,
    solution: 'Thurioside (Bt toxin) is produced by Bacillus thuringiensis, not Trichoderma.',
  },
  {
    original_number: 81,
    question_type: 'single_choice',
    question_text: 'The anaerobic bacteria that can fix atmospheric nitrogen while free living in the soil are',
    options: [
      { key: 'A', text: 'Frankia' },
      { key: 'B', text: 'Anabaena azollae' },
      { key: 'C', text: 'Rhizobium' },
      { key: 'D', text: 'Clostridium' },
    ],
    correct_index: 3,
    solution: 'Clostridium is an anaerobic free-living nitrogen-fixing bacterium in the soil.',
  },
  {
    original_number: 82,
    question_type: 'single_choice',
    question_text: 'During sewage treatment, a small part of the activated sludge is pumped back into the aeration tank to',
    options: [
      { key: 'A', text: 'Serve as inoculum' },
      { key: 'B', text: 'Serve as nutrient medium' },
      { key: 'C', text: 'Produce biogas' },
      { key: 'D', text: 'Produce CO' },
    ],
    correct_index: 0,
    solution: 'A small portion of activated sludge is recycled back to the aeration tank to act as an inoculum of active microbial flocs.',
  },
  {
    original_number: 83,
    question_type: 'single_choice',
    question_text: 'Which of the following organisms is not used in organic farming?',
    options: [
      { key: 'A', text: 'E. coli' },
      { key: 'B', text: 'Anabaena' },
      { key: 'C', text: 'Oscillatoria' },
      { key: 'D', text: 'Nostoc' },
    ],
    correct_index: 0,
    solution: 'Escherichia coli is an intestinal bacterium not used as a biofertilizer in organic farming.',
  },
  {
    original_number: 84,
    question_type: 'single_choice',
    question_text: 'Bioactive molecule used as immunosuppressant in organ transplant patients is',
    options: [
      { key: 'A', text: 'Cyclosporin-A' },
      { key: 'B', text: 'Statins' },
      { key: 'C', text: 'Streptokinase' },
      { key: 'D', text: 'TPA' },
    ],
    correct_index: 0,
    solution: 'Cyclosporin-A is widely used to prevent graft rejection in organ transplant recipients.',
  },
  {
    original_number: 85,
    question_type: 'single_choice',
    question_text: 'Effective biocontrol agent of fungal origin against several plant pathogens is',
    options: [
      { key: 'A', text: 'Bacillus thuringiensis' },
      { key: 'B', text: 'Trichoderma' },
      { key: 'C', text: 'Baculovirus' },
      { key: 'D', text: 'Streptomyces' },
    ],
    correct_index: 1,
    solution: 'Trichoderma is a fungal biocontrol agent widely applied to protect plant roots against pathogenic fungi.',
  },
  {
    original_number: 86,
    question_type: 'single_choice',
    question_text: '"Flocs", developed during secondary treatment of sewage refers to',
    options: [
      { key: 'A', text: 'Masses of obligate anaerobic bacteria associated with fungal filaments' },
      { key: 'B', text: 'Masses of bacteria developing in anaerobic sludge digesters' },
      { key: 'C', text: 'Mesh formed by groups of methanogenic bacteria' },
      { key: 'D', text: 'Mesh of fungal filaments when associated with masses of aerobic bacteria' },
    ],
    correct_index: 3,
    solution: 'Flocs are mesh-like aggregates of aerobic bacteria entangled with fungal filaments in aeration tanks.',
  },
  {
    original_number: 87,
    question_type: 'single_choice',
    question_text: 'Which of the following organism is common in root ecosystems and acts as an effective biocontrol agent of several plant pathogens?',
    options: [
      { key: 'A', text: 'Nucleopolyhedrovirus' },
      { key: 'B', text: 'Ladybird beetle' },
      { key: 'C', text: 'Cactoblastis' },
      { key: 'D', text: 'Trichoderma' },
    ],
    correct_index: 3,
    solution: 'Trichoderma species are common free-living fungi in rhizosphere ecosystems that suppress soil-borne fungal pathogens.',
  },
  {
    original_number: 88,
    question_type: 'single_choice',
    question_text: 'Read the following four statements (a-d) and find out the incorrect ones w.r.t. lactic acid bacteria.\na. In our stomach, they play beneficial role by checking disease causing microbes.\nb. LAB produce acids that coagulate and completely digest the milk proteins.\nc. Improve the nutritional quality by increasing the amount of vitamins especially riboflavin.\nd. Require suitable temperature for their multiplication.',
    options: [
      { key: 'A', text: 'a & b' },
      { key: 'B', text: 'a & c' },
      { key: 'C', text: 'b & c' },
      { key: 'D', text: 'b & d' },
    ],
    correct_index: 2,
    solution: 'Statements b (partially digest milk proteins, not completely) and c (increases Vitamin B12, not riboflavin) are incorrect.',
  },
  {
    original_number: 89,
    question_type: 'single_choice',
    question_text: 'Different varieties of cheese are known by their characteristic texture, flavour and taste. These specificity are due to the',
    options: [
      { key: 'A', text: 'Flavouring agent used' },
      { key: 'B', text: 'Microbes used' },
      { key: 'C', text: 'Inherent quality' },
      { key: 'D', text: 'Minerals present in milk' },
    ],
    correct_index: 1,
    solution: 'NCERT emphasizes that the distinct texture, flavor, and taste of cheeses come specifically from the specific microbe species used during ripening.',
  },
  {
    original_number: 90,
    question_type: 'single_choice',
    question_text: 'Find the odd one out with respect to distillation of fermented broth.',
    options: [
      { key: 'A', text: 'Rum' },
      { key: 'B', text: 'Brandy' },
      { key: 'C', text: 'Wine' },
      { key: 'D', text: 'Whisky' },
    ],
    correct_index: 2,
    solution: 'Wine and beer are produced without distillation, while whisky, brandy, and rum require distillation of the fermented mash.',
  },
  {
    original_number: 91,
    question_type: 'single_choice',
    question_text: 'Alexander Fleming accidently discovered antibiotic penicillin from a mould, but he was working on',
    options: [
      { key: 'A', text: 'Streptococci' },
      { key: 'B', text: 'Streptobacilli' },
      { key: 'C', text: 'Staphylobacilli' },
      { key: 'D', text: 'Staphylococci' },
    ],
    correct_index: 3,
    solution: 'Fleming was investigating the growth of Staphylococci bacteria on Petri dishes when he observed fungal inhibition by Penicillium.',
  },
  {
    original_number: 92,
    question_type: 'single_choice',
    question_text: 'Which of the following option gives the correct matching of microbe, product and use?\n\n(1) Saccharomyces – Methanol – Beverage production\n(2) Streptococcus – Streptokinase – Blood-cholesterol lowering agent\n(3) Monascus – Statins – Clot buster\n(4) Trichoderma – Cyclosporin A – Organ transplantation',
    options: [
      { key: 'A', text: 'Saccharomyces – Methanol – Beverage production' },
      { key: 'B', text: 'Streptococcus – Streptokinase – Blood-cholesterol lowering agent' },
      { key: 'C', text: 'Monascus – Statins – Clot buster' },
      { key: 'D', text: 'Trichoderma – Cyclosporin A – Organ transplantation' },
    ],
    correct_index: 3,
    solution: 'Trichoderma polysporum yields Cyclosporin A, used to prevent graft rejection in organ transplant patients.',
  },
  {
    original_number: 93,
    question_type: 'single_choice',
    question_text: 'Consider the following statements (a-d) each with one or two blanks:\na. All solids that settle during primary treatment of sewage forms ___(i)___ and supernatant forms the ___(ii)___.\nb. Secondary treatment of sewage is also known as ___(iii)___ treatment.\nc. A small part of the activated sludge is pumped back into the aeration tank to serve as the ___(iv)___.\nd. The sewage water is treated till ___(v)___ is reduced.\nWhich of the following option gives the correct fill ups for the respective blank numbers from (i) to (v)?',
    options: [
      { key: 'A', text: '(i) Primary sludge (iii) Flocs (v) DO' },
      { key: 'B', text: '(ii) Effluent (iii) Biological (iv) Inoculum (v) BOD' },
      { key: 'C', text: '(i) Primary sludge (ii) Flocs (iv) Inoculum (v) DO' },
      { key: 'D', text: '(i) Effluent (ii) Primary sludge (iii) Flocs (v) BOD' },
    ],
    correct_index: 1,
    solution: '(i) is Primary sludge, (ii) is Effluent, (iii) is Biological, (iv) is Inoculum, and (v) is BOD.',
  },
  {
    original_number: 94,
    question_type: 'single_choice',
    question_text: 'Find out which one of the following statements is not correct with respect to biogas plant?',
    options: [
      { key: 'A', text: 'It has a floating cover which keeps on rising as gas is produced' },
      { key: 'B', text: 'It consists of a 10-15 feet deep tank in which bio-wastes are collected and a slurry of dung is fed' },
      { key: 'C', text: 'Main gases produced are methane, isobutane and propane' },
      { key: 'D', text: 'Spent slurry may be used as fertiliser' },
    ],
    correct_index: 2,
    solution: 'Biogas primarily consists of methane (CH4) and carbon dioxide (CO2); propane and isobutane are constituents of LPG, not biogas.',
  },
  {
    original_number: 95,
    question_type: 'single_choice',
    question_text: 'Which one of the following pair is wrongly matched?\n\n(1) Ladybird – Aphids\n(2) Dragonflies – Mosquitoes\n(3) Trichoderma – Insect pests and weeds\n(4) Baculoviruses – Insects and other arthropods',
    options: [
      { key: 'A', text: 'Ladybird – Aphids' },
      { key: 'B', text: 'Dragonflies – Mosquitoes' },
      { key: 'C', text: 'Trichoderma – Insect pests and weeds' },
      { key: 'D', text: 'Baculoviruses – Insects and other arthropods' },
    ],
    correct_index: 2,
    solution: 'Trichoderma is a biocontrol fungus active against fungal root-borne plant diseases, not insect pests and weeds.',
  },
  {
    original_number: 96,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is incorrect about bio-fertilisers?',
    options: [
      { key: 'A', text: 'Bacteria, fungi and cyanobacteria are major sources' },
      { key: 'B', text: 'These are ecofriendly' },
      { key: 'C', text: 'Micro-organisms involved can be symbiotic or free living' },
      { key: 'D', text: 'They cannot be photosynthetic' },
    ],
    correct_index: 3,
    solution: 'Cyanobacteria (such as Nostoc, Anabaena, and Aulosira) are photosynthetic organisms that function as biofertilizers.',
  },
  {
    original_number: 97,
    question_type: 'single_choice',
    question_text: 'Find the odd one out with respect to mycorrhiza.',
    options: [
      { key: 'A', text: 'Many members of genus Glomus form mycorrhiza' },
      { key: 'B', text: 'Fungal partner absorbs all the nutrients from soil except phosphorus' },
      { key: 'C', text: 'Provide protection against root-borne pathogens' },
      { key: 'D', text: 'Provide tolerance to salinity and drought' },
    ],
    correct_index: 1,
    solution: 'The mycorrhizal fungus absorbs phosphorus from soil and passes it to the host plant.',
  },
  {
    original_number: 98,
    question_type: 'single_choice',
    question_text: 'Mark the mis-matched pair.\n\n(1) Aspergillus niger – Citric acid\n(2) Nucleopolyhedrovirus – Narrow spectrum weedicide\n(3) Blue green algae – Important biofertilizer in paddy fields\n(4) Glomus – Mycorrhiza',
    options: [
      { key: 'A', text: 'Aspergillus niger – Citric acid' },
      { key: 'B', text: 'Nucleopolyhedrovirus – Narrow spectrum weedicide' },
      { key: 'C', text: 'Blue green algae – Important biofertilizer in paddy fields' },
      { key: 'D', text: 'Glomus – Mycorrhiza' },
    ],
    correct_index: 1,
    solution: 'Nucleopolyhedrovirus (NPV) is a narrow spectrum insecticide targeting arthropods, not a weedicide.',
  },
  {
    original_number: 99,
    question_type: 'single_choice',
    question_text: 'Masses of bacteria associated with fungal filaments to form mesh like structures in aeration tank of STPs is called',
    options: [
      { key: 'A', text: "Flocs" },
      { key: 'B', text: 'Primary sludge' },
      { key: 'C', text: 'Sewage' },
      { key: 'D', text: 'Biofertiliser' },
    ],
    correct_index: 0,
    solution: 'These mesh-like microbial assemblages in the aeration tank are termed flocs.',
  },
  {
    original_number: 100,
    question_type: 'single_choice',
    question_text: 'Proteases used in detergents and clearing of juices are obtained from',
    options: [
      { key: 'A', text: 'Monascus purpureus' },
      { key: 'B', text: 'Mortierella renispora' },
      { key: 'C', text: 'Streptococcus' },
      { key: 'D', text: 'Trichoderma sp.' },
    ],
    correct_index: 1,
    solution: 'Mortierella renispora is an industrial fungal source of proteases.',
  },
  {
    original_number: 101,
    question_type: 'single_choice',
    question_text: 'Select the incorrect statement w.r.t. streptokinase enzyme activity.',
    options: [
      { key: 'A', text: 'Shows fibrinolytic effect' },
      { key: 'B', text: 'Used as a blood clot buster' },
      { key: 'C', text: 'Produced by Streptococci' },
      { key: 'D', text: 'Used as an immunosuppressive agent' },
    ],
    correct_index: 3,
    solution: 'Streptokinase functions as a thrombolytic clot-buster, not an immunosuppressive agent.',
  },
  {
    original_number: 102,
    question_type: 'single_choice',
    question_text: 'During waste water treatment process in STPs',
    options: [
      { key: 'A', text: 'Floating debris is removed by sedimentation' },
      { key: 'B', text: 'Primary effluent is passed directly to secondary settling tank for treatment' },
      { key: 'C', text: 'A major part of sedimented flocs or activated sludge is send to anaerobic sludge digester' },
      { key: 'D', text: 'Secondary treatment is carried out in aeration tank by anaerobic heterotrophic bacteria and fungi' },
    ],
    correct_index: 2,
    solution: 'A major part of the activated sludge is directed to anaerobic sludge digesters for final digestion and biogas production.',
  },
  {
    original_number: 103,
    question_type: 'single_choice',
    question_text: 'Baculoviruses are pathogens that',
    options: [
      { key: 'A', text: 'Attack insect and arthropods' },
      { key: 'B', text: 'Placed in genus Nucleopolyhedrovirus' },
      { key: 'C', text: 'Shows specific insecticidal application' },
      { key: 'D', text: 'All (1), (2) and (3) are correct' },
    ],
    correct_index: 3,
    solution: 'All the given statements correctly describe the characteristics and taxonomic placement of Baculoviruses.',
  },
  {
    original_number: 104,
    question_type: 'single_choice',
    question_text: 'Which of the following pair of alcoholic drinks is produced by distillation of the fermented broth?',
    options: [
      { key: 'A', text: 'Wine and Rum' },
      { key: 'B', text: 'Beer and Wine' },
      { key: 'C', text: 'Wine and Brandy' },
      { key: 'D', text: 'Brandy and Whisky' },
    ],
    correct_index: 3,
    solution: 'Both brandy and whisky are distilled spirits, whereas beer and wine are non-distilled.',
  },
  {
    original_number: 105,
    question_type: 'single_choice',
    question_text: '____A____ produced by the ____B____ and modified by genetic engineering is used as "clot buster" for removing clots from the blood vessels of patients who have undergone myocardial infarction leading to heart attack.\nSelect the correct option for A and B.',
    options: [
      { key: 'A', text: '(A) Cyclosporin A, (B) Streptococcus' },
      { key: 'B', text: '(A) Immunosuppressive agent, (B) Trichoderma polysporum' },
      { key: 'C', text: '(A) Streptokinase, (B) Streptococcus' },
      { key: 'D', text: '(A) Streptokinase, (B) Trichoderma polysporum' },
    ],
    correct_index: 2,
    solution: 'Streptokinase (A) produced by Streptococcus (B) is modified genetically for use as a clot buster.',
  },
  {
    original_number: 106,
    question_type: 'single_choice',
    question_text: 'Which of the following significantly reduces the biochemical oxygen demand of the effluent in STPs?',
    options: [
      { key: 'A', text: 'Masses of algae associated with fungal filaments' },
      { key: 'B', text: 'Masses of bacteria associated with algal filaments' },
      { key: 'C', text: 'Masses of bacteria associated with fungal filaments' },
      { key: 'D', text: 'Masses of algae associated with viruses' },
    ],
    correct_index: 2,
    solution: 'Flocs (masses of bacteria associated with fungal filaments) rapidly consume organic pollutants, drastically lowering BOD.',
  },
  {
    original_number: 107,
    question_type: 'single_choice',
    question_text: 'Bacillus thuringiensis',
    options: [
      { key: 'A', text: 'Controls aphids and Ladybird beetle' },
      { key: 'B', text: 'Are available in sachets as syrups' },
      { key: 'C', text: 'Serves as an important biofertiliser in paddy fields' },
      { key: 'D', text: 'Releases toxin in the gut of insect larvae and the larvae get killed' },
    ],
    correct_index: 3,
    solution: 'Bt delta-endotoxin becomes activated in the alkaline midgut of susceptible larvae, creating epithelial pores and causing death.',
  },
  {
    original_number: 108,
    question_type: 'single_choice',
    question_text: 'Which of the following organisms can fix atmospheric nitrogen while free living in the soil?',
    options: [
      { key: 'A', text: 'Rhizobium' },
      { key: 'B', text: 'Frankia' },
      { key: 'C', text: 'Glomus' },
      { key: 'D', text: 'Azospirillum' },
    ],
    correct_index: 3,
    solution: 'Azospirillum and Azotobacter are free-living soil bacteria capable of fixing nitrogen.',
  },
  {
    original_number: 109,
    question_type: 'single_choice',
    question_text: 'Which of the following statements is incorrect?',
    options: [
      { key: 'A', text: 'The greater the BOD of waste water, more is its polluting potential' },
      { key: 'B', text: 'Baculoviruses are pathogens that attack several insects and plants' },
      { key: 'C', text: 'Trichoderma species are effective biocontrol agents of several plant pathogens' },
      { key: 'D', text: 'Nicotine is a bioinsecticide' },
    ],
    correct_index: 1,
    solution: 'Baculoviruses have strict host ranges restricted to insects and arthropods, and have zero infectivity toward plants.',
  },
  {
    original_number: 110,
    question_type: 'single_choice',
    question_text: 'Biogas is a mixture of gases produced from the microbial activity and it consists of all, except',
    options: [
      { key: 'A', text: 'Methane and CO2' },
      { key: 'B', text: 'Hydrogen and nitrogen' },
      { key: 'C', text: 'Sulphur dioxide and carbon monoxide' },
      { key: 'D', text: 'Hydrogen sulphide and nitrogen' },
    ],
    correct_index: 2,
    solution: 'Biogas is composed of CH4, CO2, H2S, and H2; sulphur dioxide (SO2) and carbon monoxide (CO) are not produced.',
  },
  {
    original_number: 111,
    question_type: 'single_choice',
    question_text: 'Wine and beer are produced',
    options: [
      { key: 'A', text: 'By distillation only' },
      { key: 'B', text: 'By fermentation and distillation' },
      { key: 'C', text: 'By fermentation but without distillation' },
      { key: 'D', text: 'Without fermentation and distillation' },
    ],
    correct_index: 2,
    solution: 'Beer and wine are brewed via yeast fermentation without distillation.',
  },
  {
    original_number: 112,
    question_type: 'single_choice',
    question_text: 'Which of the following is one of the most significant discoveries of the twentieth century that greatly contributed towards the welfare of human society?',
    options: [
      { key: 'A', text: 'Biogas' },
      { key: 'B', text: 'Curd' },
      { key: 'C', text: 'Antibiotics' },
      { key: 'D', text: 'Citric acid' },
    ],
    correct_index: 2,
    solution: 'NCERT text: "Antibiotics produced by microbes are regarded as one of the most significant discoveries of the twentieth century."',
  },
  {
    original_number: 113,
    question_type: 'single_choice',
    question_text: 'Fill in the blanks with appropriate words:\nA. ________ are the masses of bacteria associated with fungal filaments to form mesh-like structures.\nB. ________ is used as a "clot buster".\nC. Baculoviruses are excellent candidates for ________ insecticidal application.\nD. ________ are organisms that enrich the nutrient quality of the soil.',
    options: [
      { key: 'A', text: 'A - Flocs, D - Biofertilisers' },
      { key: 'B', text: 'B - Cyclosporin-A, C - Broad spectrum' },
      { key: 'C', text: 'A - Primary sludge, C - Narrow spectrum' },
      { key: 'D', text: 'B - Streptokinase, D - Biopesticides' },
    ],
    correct_index: 0,
    solution: 'A is Flocs, B is Streptokinase, C is Narrow spectrum, and D is Biofertilisers.',
  },
  {
    original_number: 114,
    question_type: 'single_choice',
    question_text: 'In a STP, microbial flocs are formed in',
    options: [
      { key: 'A', text: 'Anaerobic sludge digester' },
      { key: 'B', text: 'Primary treatment' },
      { key: 'C', text: 'Aeration tank' },
      { key: 'D', text: 'Physicochemical treatment' },
    ],
    correct_index: 2,
    solution: 'Continuous aeration and mechanical agitation in aeration tanks stimulate the growth of microbial flocs.',
  },
  {
    original_number: 115,
    question_type: 'single_choice',
    question_text: 'Use of some microbes as biofertiliser to enhance crop productivity is called',
    options: [
      { key: 'A', text: 'Organic farming' },
      { key: 'B', text: 'Marine farming' },
      { key: 'C', text: 'Micro farming' },
      { key: 'D', text: 'Compost farming' },
    ],
    correct_index: 0,
    solution: 'The practice of utilizing biological inputs like biofertilizers and biocontrol agents in agriculture is known as organic farming.',
  },
  {
    original_number: 116,
    question_type: 'single_choice',
    question_text: 'Dough used for making dosa and bread are fermented respectively by',
    options: [
      { key: 'A', text: 'Bacteria and Fungi' },
      { key: 'B', text: 'Fungi and Bacteria' },
      { key: 'C', text: 'Eukaryotic and Prokaryotic organism' },
      { key: 'D', text: 'Yeast and Moneran' },
    ],
    correct_index: 0,
    solution: 'Dosa dough is fermented by lactic acid bacteria (prokaryotes/bacteria) and bread dough by brewer\'s yeast (fungi/eukaryote).',
  },
  {
    original_number: 117,
    question_type: 'single_choice',
    question_text: 'Three water samples were collected: Drinking water, untreated sewage water and secondary effluent. The samples were labelled A, B, and C but laboratory attendant did not note the source of sample. The BOD values of the samples recorded is 20 mg/L, 2 mg/L and 400 mg/L respectively. Using this data select the correct source of water for the labels A, B and C.',
    options: [
      { key: 'A', text: 'A – Secondary effluent, B – Drinking water, C – Untreated sewage' },
      { key: 'B', text: 'A – Untreated sewage, B – Drinking water, C – Secondary effluent' },
      { key: 'C', text: 'A – Drinking water, B – Secondary effluent, C – Untreated sewage' },
      { key: 'D', text: 'A – Untreated sewage, B – Secondary effluent, C – Drinking water' },
    ],
    correct_index: 0,
    solution: 'Drinking water has the lowest BOD (2 mg/L), secondary effluent has intermediate BOD (20 mg/L), and raw untreated sewage has the highest BOD (400 mg/L).',
  },
  {
    original_number: 118,
    question_type: 'single_choice',
    question_text: 'Sewage treatment process includes all of these features/activities, except',
    options: [
      { key: 'A', text: 'A small part of the activated sludge is pumped back into the aeration tank to serve as inoculum' },
      { key: 'B', text: 'Activated sludge cannot be used in anaerobic digestion process' },
      { key: 'C', text: 'Anaerobic bacteria digest bacteria in sludge digesters' },
      { key: 'D', text: 'Transfer of primary effluent in aeration tanks' },
    ],
    correct_index: 1,
    solution: 'Activated sludge is indeed pumped into anaerobic sludge digesters where anaerobic bacteria digest flocs and produce biogas.',
  },
  {
    original_number: 119,
    question_type: 'single_choice',
    question_text: 'Toddy is made by fermenting sap from',
    options: [
      { key: 'A', text: 'Coconut' },
      { key: 'B', text: 'Agave' },
      { key: 'C', text: 'Palm' },
      { key: 'D', text: 'Aloe vera' },
    ],
    correct_index: 2,
    solution: 'Toddy is a traditional South Indian drink produced by fermenting sap collected from palms.',
  },
];

const SECTION_B_QUESTIONS = [
  {
    original_number: 'B1',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Wine and beer are produced through process of distillation.\nReason (R): Nutrient medium utilized for wine is yeast.',
    assertion_text: 'Wine and beer are produced through process of distillation.',
    reason_text: 'Nutrient medium utilized for wine is yeast.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Wine and beer are produced without distillation, and yeast is the fermenting organism, not the nutrient medium (which is fruit juice/malt).',
  },
  {
    original_number: 'B2',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): After 24 hours toddy remains palatable.\nReason (R): Toddy does not undergo fermentation.',
    assertion_text: 'After 24 hours toddy remains palatable.',
    reason_text: 'Toddy does not undergo fermentation.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Toddy is fermented sap, and after 24 hours it turns unpalatable due to souring by acetic acid bacteria.',
  },
  {
    original_number: 'B3',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): BOD is a measure of the organic matter present in the water.\nReason (R): Greater the BOD of waste water, less is its polluting potential.',
    assertion_text: 'BOD is a measure of the organic matter present in the water.',
    reason_text: 'Greater the BOD of waste water, less is its polluting potential.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true (BOD reflects organic load). Reason is false because a greater BOD indicates higher polluting potential.',
  },
  {
    original_number: 'B4',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Baculoviruses as biocontrol agents have negative impact on plants, mammals and target insects.\nReason (R): These are effective against several plant pathogens.',
    assertion_text: 'Baculoviruses as biocontrol agents have negative impact on plants, mammals and target insects.',
    reason_text: 'These are effective against several plant pathogens.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Baculoviruses have zero negative impact on plants, mammals, or birds, and they target insect pests rather than plant pathogens.',
  },
  {
    original_number: 'B5',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Lactic acid bacteria (LAB) produces lactic acid that coagulates and digest all the milk proteins.\nReason (R): These bacteria ensure that they multiply by releasing all the energy contained in the milk.',
    assertion_text: 'Lactic acid bacteria (LAB) produces lactic acid that coagulates and digest all the milk proteins.',
    reason_text: 'These bacteria ensure that they multiply by releasing all the energy contained in the milk.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. LAB coagulates and only partially digests milk proteins.',
  },
  {
    original_number: 'B6',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The nutritional quality of milk is enhanced when it is converted into curd.\nReason (R): One such improvement is the increase in the quantity of vitamin B12.',
    assertion_text: 'The nutritional quality of milk is enhanced when it is converted into curd.',
    reason_text: 'One such improvement is the increase in the quantity of vitamin B12.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both statements are true and Reason accurately explains how curd\'s nutritional value is upgraded (via vitamin B12 synthesis).',
  },
  {
    original_number: 'B7',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Microbes are used in the fermentation of fish, soyabean and bamboo shoots to make foods that have larger self life.\nReason (R): Fermentation using such microbes actually decreases the nutritional quality of these foods.',
    assertion_text: 'Microbes are used in the fermentation of fish, soyabean and bamboo shoots to make foods that have larger self life.',
    reason_text: 'Fermentation using such microbes actually decreases the nutritional quality of these foods.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true (traditional Asian fermented foods). Reason is false because microbial fermentation increases nutritional quality and bioavailability.',
  },
  {
    original_number: 'B8',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): An organ transplant patient is administered regular dose of cyclosporin-A.\nReason (R): Cyclosporin-A is an immunosuppressive agent.',
    assertion_text: 'An organ transplant patient is administered regular dose of cyclosporin-A.',
    reason_text: 'Cyclosporin-A is an immunosuppressive agent.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both are true and Reason provides the exact medical rationale for administering Cyclosporin-A.',
  },
  {
    original_number: 'B9',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Microbes have been used in the production of different varieties of cheese.\nReason (R): Different types of microbes are known to bring characteristic texture, flavour and taste.',
    assertion_text: 'Microbes have been used in the production of different varieties of cheese.',
    reason_text: 'Different types of microbes are known to bring characteristic texture, flavour and taste.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both are true and Reason correctly explains why diverse microbes are inoculated to yield specific cheese varieties.',
  },
  {
    original_number: 'B10',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): A large number of aerobic heterotrophic microbes grow in the aeration tanks during primary treatment of sewage water.\nReason (R): These aerobic microbes significantly increase the biochemical oxygen demand (BOD) so that they can be discharged directly into rivers and streams.',
    assertion_text: 'A large number of aerobic heterotrophic microbes grow in the aeration tanks during primary treatment of sewage water.',
    reason_text: 'These aerobic microbes significantly increase the biochemical oxygen demand (BOD) so that they can be discharged directly into rivers and streams.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Aeration tanks are used in secondary (not primary) treatment, and microbial growth decreases (not increases) BOD.',
  },
  {
    original_number: 'B11',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The sediment accumulated in the secondary treatment is called activated sludge.\nReason (R): It is used as an inoculum during the secondary treatment in STP.',
    assertion_text: 'The sediment accumulated in the secondary treatment is called activated sludge.',
    reason_text: 'It is used as an inoculum during the secondary treatment in STP.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 1,
    solution: 'Both are true statements, but Reason does not explain the naming of activated sludge (it is named for its active living microbial biomass).',
  },
  {
    original_number: 'B12',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): BOD of the sewage water gets significantly reduced during secondary treatment.\nReason (R): Vigorous aeration in the tanks helps in the reduction of BOD.',
    assertion_text: 'BOD of the sewage water gets significantly reduced during secondary treatment.',
    reason_text: 'Vigorous aeration in the tanks helps in the reduction of BOD.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both are true and aeration supports aerobic flocs that consume organic matter, explaining the drop in BOD.',
  },
  {
    original_number: 'B13',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Streptokinase is produced by genetically modified streptococcus.\nReason (R): Naturally occurred Streptococcus doesn\'t produce streptokinase.',
    assertion_text: 'Streptokinase is produced by genetically modified streptococcus.',
    reason_text: 'Naturally occurred Streptococcus doesn\'t produce streptokinase.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true (modified to be safe for human infusion). Reason is false because Streptococcus naturally synthesizes streptokinase.',
  },
  {
    original_number: 'B14',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Monascus purpureus is useful in the commercial production of blood lowering cholesterol agents.\nReason (R): These agents act by competitively inhibiting the enzyme responsible for synthesis of cholesterol.',
    assertion_text: 'Monascus purpureus is useful in the commercial production of blood lowering cholesterol agents.',
    reason_text: 'These agents act by competitively inhibiting the enzyme responsible for synthesis of cholesterol.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both are true and Reason accurately explains statin\'s competitive inhibition mechanism on HMG-CoA reductase.',
  },
  {
    original_number: 'B15',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): An organic farmer believes that biodiversity furthers health.\nReason (R): He has a holistic approach in understanding the intricate complexities between various flora and fauna.',
    assertion_text: 'An organic farmer believes that biodiversity furthers health.',
    reason_text: 'He has a holistic approach in understanding the intricate complexities between various flora and fauna.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both statements are true and Reason explains the core ecological philosophy of organic farming.',
  },
  {
    original_number: 'B16',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The key belief of an organic farmer is that sometimes even pests are not completely eradicated.\nReason (R): He has a very conventional farming approach towards it.',
    assertion_text: 'The key belief of an organic farmer is that sometimes even pests are not completely eradicated.',
    reason_text: 'He has a very conventional farming approach towards it.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true (maintaining beneficial natural predator balances). Reason is false as this opposes conventional chemical farming.',
  },
  {
    original_number: 'B17',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The beetle ladybird with red and black markings are useful in getting rid of mosquitoes.\nReason (R): These beetles are used in the biocontrol of mosquito larvae as they feed on them.',
    assertion_text: 'The beetle ladybird with red and black markings are useful in getting rid of mosquitoes.',
    reason_text: 'These beetles are used in the biocontrol of mosquito larvae as they feed on them.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Ladybirds prey on aphids; dragonflies are used to control mosquitoes.',
  },
  {
    original_number: 'B18',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The sachets containing spores of Bacillus thuringiensis are sprayed onto vulnerable plants such as brassicas and fruit trees.\nReason (R): These spores are later eaten by dragonflies in which they release toxins in their gut leaving perforations and thereby killing them.',
    assertion_text: 'The sachets containing spores of Bacillus thuringiensis are sprayed onto vulnerable plants such as brassicas and fruit trees.',
    reason_text: 'These spores are later eaten by dragonflies in which they release toxins in their gut leaving perforations and thereby killing them.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true. Reason is false because the spores target insect larvae (such as butterfly caterpillars), not dragonflies.',
  },
  {
    original_number: 'B19',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Trichoderma is a fungus that causes excessive infestation of the plant root system.\nReason (R): These are most common type of pathogen found in the roots of several plants.',
    assertion_text: 'Trichoderma is a fungus that causes excessive infestation of the plant root system.',
    reason_text: 'These are most common type of pathogen found in the roots of several plants.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 3,
    solution: 'Both are false. Trichoderma is a beneficial symbiont in the root ecosystem that protects against pathogens.',
  },
  {
    original_number: 'B20',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Majority of baculoviruses such as the genes NPV are used as biocontrol agents against many different pathogens like insects and other arthropods.\nReason (R): These are having broad spectrum insecticidal applications that help to get rid of many pathogens at a time.',
    assertion_text: 'Majority of baculoviruses such as the genes NPV are used as biocontrol agents against many different pathogens like insects and other arthropods.',
    reason_text: 'These are having broad spectrum insecticidal applications that help to get rid of many pathogens at a time.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true. Reason is false because baculoviruses possess narrow-spectrum, species-specific insecticidal properties.',
  },
  {
    original_number: 'B21',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Integrated pest management (IPM) programme, helps in the treatment of ecologically sensitive areas.\nReason (R): It helps in the restoration and conservation of species that may be very critical in the well being of that ecosystem.',
    assertion_text: 'Integrated pest management (IPM) programme, helps in the treatment of ecologically sensitive areas.',
    reason_text: 'It helps in the restoration and conservation of species that may be very critical in the well being of that ecosystem.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both statements are true and Reason provides the ecological justification for utilizing IPM in sensitive habitats.',
  },
  {
    original_number: 'B22',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Methanogenesis is an obligate anaerobic process.\nReason (R): In this process apart from CH4 even CO2 and H2S are released.',
    assertion_text: 'Methanogenesis is an obligate anaerobic process.',
    reason_text: 'In this process apart from CH4 even CO2 and H2S are released.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 1,
    solution: 'Both statements are true, but the gas composition released does not explain why methanogenesis requires obligate anaerobic conditions.',
  },
  {
    original_number: 'B23',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): A large part of activated sludges is pumped into anaerobic sludge digester.\nReason (R): These bacteria grow on the flocs to produce a mixture of gases such as methane, hydrogen sulphide and carbon dioxide.',
    assertion_text: 'A large part of activated sludges is pumped into anaerobic sludge digester.',
    reason_text: 'These bacteria grow on the flocs to produce a mixture of gases such as methane, hydrogen sulphide and carbon dioxide.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both statements are true and Reason explains that anaerobic digestion of microbial flocs generates biogas (CH4, H2S, and CO2).',
  },
  {
    original_number: 'B24',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Trichoderma can be used as both industrial microbe as well as a biocontrol agent.\nReason (R): Some species carries out both the functions.',
    assertion_text: 'Trichoderma can be used as both industrial microbe as well as a biocontrol agent.',
    reason_text: 'Some species carries out both the functions.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 1,
    solution: 'Both are true statements (Trichoderma polysporum yields cyclosporin A industrially, while other species serve as biocontrol agents).',
  },
  {
    original_number: 'B25',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Penicillin was extensively used to treat American soldiers in world war-II.\nReason (R): In Greek "Anti" is against & "bios" means life so literally antibiotics mean against life.',
    assertion_text: 'Penicillin was extensively used to treat American soldiers in world war-II.',
    reason_text: 'In Greek "Anti" is against & "bios" means life so literally antibiotics mean against life.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 1,
    solution: 'Both are true facts, but the etymology of the word antibiotic is not the reason it was deployed in WWII wound management.',
  },
  {
    original_number: 'B26',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Lactic acid bacteria play an important role in checking the diseases of the stomach.\nReason (R): Antibiotics are one of the most significant discoveries of 19th century.',
    assertion_text: 'Lactic acid bacteria play an important role in checking the diseases of the stomach.',
    reason_text: 'Antibiotics are one of the most significant discoveries of 19th century.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true. Reason is false because antibiotics were discovered in the 20th century (1928 onwards).',
  },
  {
    original_number: 'B27',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Malting of cereals is done before fermenting them with yeast.\nReason (R): Fermenting microbes rely on anaerobic pathway of respiration.',
    assertion_text: 'Malting of cereals is done before fermenting them with yeast.',
    reason_text: 'Fermenting microbes rely on anaerobic pathway of respiration.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 1,
    solution: 'Both statements are true. Malting activates amylases to hydrolyze starch into fermentable sugars, but Reason does not explain the necessity of malting.',
  },
  {
    original_number: 'B28',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): The yeast species of Baker\'s yeast and Brewer\'s yeast is the same.\nReason (R): Both of them represent the same species called Saccharomyces cerevisiae.',
    assertion_text: 'The yeast species of Baker\'s yeast and Brewer\'s yeast is the same.',
    reason_text: 'Both of them represent the same species called Saccharomyces cerevisiae.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 0,
    solution: 'Both statements are true and Reason provides the exact taxonomic identity proving they are the same species.',
  },
  {
    original_number: 'B29',
    question_type: 'assertion_reason',
    question_text: 'In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\nAssertion (A): Cyanobacteria are very helpful in organic farming.\nReason (R): They can be useful as both biofertilizers and biocontrol agents.',
    assertion_text: 'Cyanobacteria are very helpful in organic farming.',
    reason_text: 'They can be useful as both biofertilizers and biocontrol agents.',
    options: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A)' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is not the correct explanation of (A)' },
      { key: 'C', text: '(A) is true but (R) is false' },
      { key: 'D', text: 'Both (A) and (R) are false' },
    ],
    correct_index: 2,
    solution: 'Assertion is true (cyanobacteria fix N2 and enrich soil). Reason is false because cyanobacteria are not biocontrol agents.',
  },
];

async function seed() {
  console.log('--- 1. Ensuring Subject Botany and Chapter Microbes in Human Welfare exist ---');
  let subjectRes = await query(`SELECT id FROM subjects WHERE LOWER(name) = 'botany' LIMIT 1`);
  let subjectId;
  if (subjectRes.rows.length === 0) {
    const insSub = await query(`INSERT INTO subjects (name) VALUES ('Botany') RETURNING id`);
    subjectId = insSub.rows[0].id;
  } else {
    subjectId = subjectRes.rows[0].id;
  }
  console.log(`Botany subject_id: ${subjectId}`);

  let chapterRes = await query(`
    SELECT id FROM chapters 
    WHERE subject_id = $1 AND LOWER(name) = 'microbes in human welfare' 
    LIMIT 1
  `, [subjectId]);

  let chapterId;
  if (chapterRes.rows.length === 0) {
    const insCh = await query(`
      INSERT INTO chapters (subject_id, name, position) 
      VALUES ($1, 'Microbes in Human Welfare', 0) 
      RETURNING id
    `, [subjectId]);
    chapterId = insCh.rows[0].id;
    console.log(`Created new chapter 'Microbes in Human Welfare', chapter_id: ${chapterId}`);
  } else {
    chapterId = chapterRes.rows[0].id;
    console.log(`Existing chapter_id: ${chapterId}`);
  }

  console.log('\n--- 2. Fetching existing question texts in question_bank for deduplication ---');
  const existingQB = await query(`
    SELECT id, LOWER(TRIM(REGEXP_REPLACE(question_text, '\\s+', ' ', 'g'))) as norm_text,
           LOWER(TRIM(COALESCE(assertion_text, ''))) as a_text,
           LOWER(TRIM(COALESCE(reason_text, ''))) as r_text
    FROM question_bank
  `);
  
  const existingSet = new Set();
  for (const r of existingQB.rows) {
    if (r.a_text && r.r_text) {
      existingSet.add(`AR:${r.a_text}||${r.r_text}`);
    } else {
      existingSet.add(`SC:${r.norm_text}`);
    }
  }
  console.log(`Loaded ${existingQB.rows.length} existing question bank records for duplicate checking.`);

  const allToInsert = [...SECTION_A_QUESTIONS, ...SECTION_B_QUESTIONS];
  let insertedCount = 0;
  let skippedCount = 0;

  for (const q of allToInsert) {
    const key = (q.assertion_text && q.reason_text)
      ? `AR:${q.assertion_text.toLowerCase().replace(/\s+/g, ' ').trim()}||${q.reason_text.toLowerCase().replace(/\s+/g, ' ').trim()}`
      : `SC:${q.question_text.toLowerCase().replace(/\s+/g, ' ').trim()}`;

    if (existingSet.has(key)) {
      console.log(`[SKIP DUPLICATE] Q${q.original_number}: ${q.question_text.slice(0, 50)}...`);
      skippedCount++;
      continue;
    }

    const correctIndex = Number(q.correct_index ?? 0);
    const correctIndices = [correctIndex];
    const optionsJson = JSON.stringify(q.options);
    const correctIndicesJson = JSON.stringify(correctIndices);
    const imageUrl = q.image_url || '';

    await query(`
      INSERT INTO question_bank (
        category, question_type, question_text, options, correct_index, correct_indices,
        marks, solution, subject_id, chapter_id, difficulty, image_url, solution_image_url,
        chapter, topic, subject, assertion_text, reason_text
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
    `, [
      'Botany',
      q.question_type || 'single_choice',
      q.question_text,
      optionsJson,
      correctIndex,
      correctIndicesJson,
      4,
      q.solution || '',
      subjectId,
      chapterId,
      'medium',
      imageUrl,
      '',
      'Microbes in Human Welfare',
      'Microbes in Human Welfare',
      'Botany',
      q.assertion_text || null,
      q.reason_text || null,
    ]);

    existingSet.add(key);
    insertedCount++;
  }

  console.log(`\n=== Finished Seeding ===`);
  console.log(`Successfully Inserted: ${insertedCount}`);
  console.log(`Skipped Duplicates: ${skippedCount}`);

  // Invalidate caches
  await delCache('cache:qb:*').catch(() => {});
  console.log('Invalidated question bank caches.');

  // Verify total count in chapter
  const totalInChapter = await query(`
    SELECT count(*)::int as count 
    FROM question_bank 
    WHERE (category = 'Botany' OR subject = 'Botany') 
      AND (chapter = 'Microbes in Human Welfare' OR chapter_id = $1)
  `, [chapterId]);
  console.log(`Verified total questions in Botany -> 'Microbes in Human Welfare': ${totalInChapter.rows[0].count}`);

  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
