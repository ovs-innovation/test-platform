import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./anatomy_diagrams_map.json', import.meta.url)));

export const batch5Questions = [
  {
    question_number: 156,
    question_text: "Secondary meristems are found in",
    options: [
      "All angiosperms",
      "Gymnosperms and all monocots",
      "Dicots and gymnosperms",
      "All spermatophytes"
    ],
    correct_answer: "Dicots and gymnosperms",
    explanation: "Secondary meristems (such as vascular cambium and cork cambium) are characteristic of gymnosperms and dicotyledonous angiosperms, which undergo secondary growth in thickness. Monocots typically lack secondary meristems.",
    difficulty: "easy",
    topic: "Secondary Growth - Occurrence"
  },
  {
    question_number: 157,
    question_text: "Monocot stems do not have",
    options: [
      "Protophloem",
      "Phloem parenchyma",
      "Companion cell in phloem",
      "Sieve tube and metaphloem"
    ],
    correct_answer: "Phloem parenchyma",
    explanation: "Phloem parenchyma is characteristically absent in monocotyledons, including monocot stems.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot Phloem"
  },
  {
    question_number: 158,
    question_text: "Which of these is responsible for lateral translocation in plants?",
    options: [
      "Medullary rays",
      "Vessels",
      "Companion cells",
      "Xylem parenchyma"
    ],
    correct_answer: "Medullary rays",
    explanation: "Medullary rays (ray parenchyma) conduct water, mineral salts, and organic food radially (laterally) across the stem axis.",
    difficulty: "easy",
    topic: "Stem Anatomy - Radial Translocation by Medullary Rays"
  },
  {
    question_number: 159,
    question_text: "Choose the correct option w.r.t. sclereids:",
    options: [
      "Physiologically active",
      "Pits are present",
      "Derived from meristems directly",
      "Little amount of protoplasm is present"
    ],
    correct_answer: "Pits are present",
    explanation: "Sclereids have extremely thick, highly lignified walls traversed by prominent simple or branched pits (pit canals). They are dead cells devoid of protoplasm at maturity.",
    difficulty: "medium",
    topic: "Simple Tissues - Sclereid Morphology"
  },
  {
    question_number: 160,
    question_text: "Bast fibres are characterized by",
    options: [
      "Absence of protoplast at maturity",
      "Supporting young stem and leaf petiole",
      "Lignocellulosic thickenings on secondary wall",
      "Common presence of intercellular spaces"
    ],
    correct_answer: "Absence of protoplast at maturity",
    explanation: "Bast fibres (phloem fibres) are elongated, unbranched, dead sclerenchymatous cells lacking protoplasts at maturity.",
    difficulty: "easy",
    topic: "Complex Tissues - Bast Fibres"
  },
  {
    question_number: 161,
    question_text: "Select the incorrect statement w.r.t. bast fibres:\n(a) Generally absent in primary phloem\n(b) Elongated, branched with blunt ends\n(c) Parenchymatous in nature\n(d) Becomes dead at maturity",
    options: [
      "a & d",
      "b & d",
      "b & c",
      "a & b"
    ],
    correct_answer: "b & c",
    explanation: "Bast fibres are sclerenchymatous (not parenchymatous) and are elongated, needle-like, and unbranched with tapering pointed ends (not branched with blunt ends). Thus statements (b) and (c) are incorrect.",
    difficulty: "medium",
    topic: "Complex Tissues - Phloem Fibres Characteristics"
  },
  {
    question_number: 162,
    question_text: "Monocot root is anatomically similar to the dicot root in",
    options: [
      "Possessing radial vascular bundles with exarch xylem",
      "Presence of well developed central pith",
      "Having diarch to hexarch vascular bundles",
      "Absence of passage cells"
    ],
    correct_answer: "Possessing radial vascular bundles with exarch xylem",
    explanation: "Both monocot and dicot roots share the fundamental organization of radial vascular bundles with exarch xylem development (protoxylem towards periphery, metaxylem towards centre).",
    difficulty: "medium",
    topic: "Root Anatomy - Dicot vs Monocot Root Similarities"
  },
  {
    question_number: 163,
    question_text: "In which of the following tissue the cells are thickened at the corners due to a deposition of cellulose, hemicellulose and pectin?",
    options: [
      "Parenchyma",
      "Collenchyma",
      "Sclerenchyma",
      "Prosenchyma"
    ],
    correct_answer: "Collenchyma",
    explanation: "Collenchyma consists of living cells with localized corner wall thickenings of cellulose, hemicellulose, and pectin.",
    difficulty: "easy",
    topic: "Simple Tissues - Collenchyma Thickening"
  },
  {
    question_number: 164,
    question_text: "Mark the incorrect option w.r.t. internal structure of monocot stem:",
    options: [
      "Absence of pith",
      "Parenchymatous hypodermis",
      "Endodermis is absent",
      "Scattered vascular bundles"
    ],
    correct_answer: "Parenchymatous hypodermis",
    explanation: "The hypodermis of a monocot stem is sclerenchymatous, providing rigid mechanical protection. Collenchymatous hypodermis occurs in dicot stems.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot Stem Tissues"
  },
  {
    question_number: 165,
    question_text: "In the given sector of a dicot root, mark the structures labeled a, b, c and d:",
    options: [
      "Metaxylem, protoxylem, cortex, trichome",
      "Endodermis, cortex, protoxylem, root hair",
      "Endodermis, cortex, metaxylem, root hair",
      "Pericycle, cortex, metaxylem, trichome"
    ],
    correct_answer: "Endodermis, cortex, metaxylem, root hair",
    image_url: diagrams.q165_dicot_root_sector,
    explanation: "In the cross-section of the dicot root: 'd' represents unicellular root hairs extending from epiblema; 'b' is the multi-layered parenchymatous cortex; 'a' designates the innermost cortex boundary, the endodermis; and 'c' indicates the large central metaxylem vessel in the exarch vascular bundle.",
    difficulty: "hard",
    topic: "Root Anatomy - Dicot Root Anatomy Diagram"
  },
  {
    question_number: 166,
    question_text: "Which of the following character is concerned with the meristematic cells?",
    options: [
      "Few ribosomes",
      "Small nucleus and dense cytoplasm",
      "High metabolic activity",
      "Loosely arranged cells"
    ],
    correct_answer: "High metabolic activity",
    explanation: "Meristematic cells are characterized by very high metabolic and respiratory activity, abundant ribosomes, dense cytoplasm, a large conspicuous nucleus, and compact arrangement without intercellular spaces.",
    difficulty: "medium",
    topic: "Meristematic Tissues - Cellular Properties"
  },
  {
    question_number: 167,
    question_text: "Sieve tube elements are long, tube-like structures, arranged longitudinally and are associated with the companion cells. A mature sieve element",
    options: [
      "Has a small vacuole",
      "Lacks nucleus and cytoplasm",
      "Possesses a large vacuole and small nucleus",
      "Possesses a peripheral cytoplasm"
    ],
    correct_answer: "Possesses a peripheral cytoplasm",
    explanation: "A mature sieve tube element possesses a peripheral layer of cytoplasm and a large central vacuole, but lacks a nucleus (it is living but enucleated).",
    difficulty: "easy",
    topic: "Complex Tissues - Sieve Element Organization"
  },
  {
    question_number: 168,
    question_text: "Which of the following statements is concerned with the anatomy of dicot root?",
    options: [
      "Presence of small or inconspicuous medulla",
      "Absence of parenchymatous pericycle",
      "Absence of suberin at the tangential as well as radial walls of endodermal cells",
      "Presence of sclerenchymatous conjunctive tissue"
    ],
    correct_answer: "Presence of small or inconspicuous medulla",
    explanation: "In dicot roots, the central medulla (pith) is small or completely inconspicuous, whereas monocot roots possess a large and well-developed pith.",
    difficulty: "medium",
    topic: "Root Anatomy - Dicot Root Medulla"
  },
  {
    question_number: 169,
    question_text: "The part of grass consumed by a grazing animal can be regenerated by the activity of",
    options: [
      "Lateral primary meristem",
      "Lateral secondary meristem",
      "Intercalary meristem",
      "Apical meristem"
    ],
    correct_answer: "Intercalary meristem",
    explanation: "Intercalary meristem occurs between mature permanent tissues at internode bases in grasses and rapidly regenerates leaf parts removed by grazing herbivores.",
    difficulty: "easy",
    topic: "Meristematic Tissues - Intercalary Meristem"
  },
  {
    question_number: 170,
    question_text: "Stem of barley differs from stem of sunflower in presence of",
    options: [
      "Conjoint, collateral bundles",
      "Endarch, eustelic bundles",
      "Scattered, closed bundles",
      "Well differentiated ground tissue"
    ],
    correct_answer: "Scattered, closed bundles",
    explanation: "Barley (Hordeum vulgare) is a monocot exhibiting scattered, closed vascular bundles in undifferentiated ground tissue (atactostele). Sunflower is a dicot with open vascular bundles arranged in a ring (eustele).",
    difficulty: "medium",
    topic: "Comparative Anatomy - Monocot vs Dicot Stem"
  },
  {
    question_number: 171,
    question_text: "Mark the correct statement (w.r.t. lateral meristem):",
    options: [
      "Secondary meristem producing primary permanent tissues",
      "Intercalary meristem producing secondary permanent tissues",
      "Cylindrical meristem producing the secondary tissues",
      "Promeristem producing secondary permanent tissues"
    ],
    correct_answer: "Cylindrical meristem producing the secondary tissues",
    explanation: "Lateral meristems are cylindrical meristems situated along the lateral axis of stems and roots that divide periclinally to produce secondary permanent tissues.",
    difficulty: "medium",
    topic: "Meristematic Tissues - Cylindrical Lateral Meristems"
  },
  {
    question_number: 172,
    question_text: "Match the column I with column II and select the correct option:\nColumn I:\na. Xylem parenchyma\nb. Sclereids\nc. Phloem parenchyma\nd. Vessel\nColumn II:\n(i) Absent in most of the monocots\n(ii) Long cylindrical tube-like structure\n(iii) Food and tannins\n(iv) Fruit walls of nuts",
    options: [
      "a(i), b(ii), c(iii), d(iv)",
      "a(ii), b(iv), c(iii), d(i)",
      "a(iii), b(iv), c(i), d(ii)",
      "a(iii), b(i), c(ii), d(iv)"
    ],
    correct_answer: "a(iii), b(iv), c(i), d(ii)",
    explanation: "Xylem parenchyma stores food and tannins (a-iii). Sclereids occur in the hard fruit walls of nuts (b-iv). Phloem parenchyma is absent in most monocots (c-i). Vessel is a long cylindrical syncytial tube-like structure with perforated plates (d-ii).",
    difficulty: "medium",
    topic: "Complex & Simple Tissues - Matching"
  },
  {
    question_number: 173,
    question_text: "Which of the following is correct statement for intercalary meristems?",
    options: [
      "They lie at tip of root apex",
      "They are at base of stem always",
      "They add to the length of plant or its organs",
      "They are present along the lateral sides of roots and shoots"
    ],
    correct_answer: "They add to the length of plant or its organs",
    explanation: "Intercalary meristems are primary meristems intercalated between mature tissues that actively add to the linear length/elongation of plant organs.",
    difficulty: "easy",
    topic: "Meristems - Intercalary Meristem Role"
  },
  {
    question_number: 174,
    question_text: "Vascular bundles of leaf are similar to",
    options: [
      "Vascular bundles of monocot stem",
      "Vascular bundles of dicot stem",
      "Vascular bundles of monocot root",
      "Vascular bundles of dicot root"
    ],
    correct_answer: "Vascular bundles of monocot stem",
    explanation: "Both leaves and monocot stems have conjoint, collateral, and closed vascular bundles lacking a cambium.",
    difficulty: "medium",
    topic: "Vascular Bundle Types - Leaf vs Monocot Stem"
  },
  {
    question_number: 175,
    question_text: "Select the odd one out w.r.t. tissues:",
    options: [
      "A group of cells having a common origin",
      "They usually perform a common function",
      "Complex tissues are made of more than one type of cells",
      "They are not capable of division"
    ],
    correct_answer: "They are not capable of division",
    explanation: "Plant tissues include meristematic tissues, which possess actively dividing cells. Stating that tissues are 'not capable of division' is therefore false.",
    difficulty: "easy",
    topic: "Plant Tissues - Definition & Capabilities"
  },
  {
    question_number: 176,
    question_text: "Which of the following component of phloem is mainly responsible for storage of food material and other substances like resins, latex and mucilage?",
    options: [
      "Sieve tube",
      "Companion cell",
      "Bast fibres",
      "Phloem parenchyma"
    ],
    correct_answer: "Phloem parenchyma",
    explanation: "Phloem parenchyma consists of living elongated cells with dense cytoplasm and stores starch, fats, resins, latex, and mucilage.",
    difficulty: "easy",
    topic: "Complex Tissues - Phloem Parenchyma Function"
  },
  {
    question_number: 177,
    question_text: "Which one of the following statements is incorrect?",
    options: [
      "Xylem fibres have obliterated central lumens",
      "Phloem parenchyma is absent in monocot stem",
      "The first formed secondary phloem consists of protophloem",
      "Adaxially arranged mesophyll cells are elongated and vertically or parallelly placed to each other in dicots"
    ],
    correct_answer: "The first formed secondary phloem consists of protophloem",
    explanation: "Protophloem is the first-formed primary phloem differentiated from procambium. Secondary phloem is formed later during secondary growth by vascular cambium.",
    difficulty: "medium",
    topic: "Complex Tissues - Phloem Terminology"
  },
  {
    question_number: 178,
    question_text: "Identify the mismatched pair from the given histology table:\n(1) Sclerenchyma fibre - Thick walled elongated and pointed cells present in hypodermis of dicot stem\n(2) Parenchyma - Forms the major component within plant organs\n(3) Sclereid - Commonly found in pulp of fruits like guava, pear and sapota\n(4) Collenchyma - Provide mechanical support to growing parts of plant",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_answer: "(1)",
    image_url: diagrams.q178_tissue_types,
    explanation: "Pair (1) is mismatched because the hypodermis of a dicot stem is composed of collenchyma, not sclerenchyma fibres. Sclerenchyma fibres in dicot stems are present in the pericycle, while sclerenchymatous hypodermis is found in monocot stems.",
    difficulty: "medium",
    topic: "Simple Tissues - Histological Identification"
  },
  {
    question_number: 179,
    question_text: "When protoxylem lies towards the centre (pith) and the metaxylem lies towards the periphery of the organ, the primary xylem is called",
    options: [
      "Endarch; present in stem",
      "Endarch; present in roots",
      "Exarch; present in stem",
      "Exarch; present in roots"
    ],
    correct_answer: "Endarch; present in stem",
    explanation: "When protoxylem lies towards the centre (pith) and metaxylem towards the periphery, it is termed endarch xylem, which is characteristic of stems.",
    difficulty: "easy",
    topic: "Complex Tissues - Endarch vs Exarch Xylem"
  },
  {
    question_number: 180,
    question_text: "Mark the incorrect statement w.r.t. guard cells of stomata:",
    options: [
      "In grasses these are dumb-bell shaped",
      "They possess chloroplasts",
      "Regulate opening and closing of stomata",
      "Outer walls are thick and inner walls are thin in dicots"
    ],
    correct_answer: "Outer walls are thick and inner walls are thin in dicots",
    explanation: "In dicots, the outer walls of kidney-shaped guard cells (away from the stomatal pore) are thin and elastic, while the inner walls (facing the stomatal pore) are highly thickened.",
    difficulty: "easy",
    topic: "Epidermal Tissue System - Guard Cell Wall Anatomy"
  },
  {
    question_number: 181,
    question_text: "In grasses, certain adaxial epidermal cells along the veins modify themselves into large, empty and colourless cells, known as",
    options: [
      "Mesophyll",
      "Bundle sheath cells",
      "Bulliform cells",
      "Casparian strips"
    ],
    correct_answer: "Bulliform cells",
    explanation: "Large, empty, colourless, hygroscopic cells on the adaxial surface of grass leaves are bulliform cells (motor cells).",
    difficulty: "easy",
    topic: "Leaf Anatomy - Bulliform Cells"
  },
  {
    question_number: 182,
    question_text: "Which of the following are formed by dedifferentiation?\na. Secondary xylem\nb. Cork cambium\nc. Intrafascicular cambium\nd. Interfascicular cambium\ne. Intercalary meristem",
    options: [
      "b & d",
      "a & c",
      "d & e",
      "c & d"
    ],
    correct_answer: "b & d",
    explanation: "Cork cambium (phellogen) and interfascicular cambium develop from living permanent parenchymatous cells by dedifferentiation. Secondary xylem is formed by redifferentiation; intrafascicular and intercalary meristems are primary in origin.",
    difficulty: "medium",
    topic: "Plant Growth & Anatomy - Dedifferentiated Meristems"
  },
  {
    question_number: 183,
    question_text: "Well developed pith is present in",
    options: [
      "Dicot stem, monocot root",
      "Monocot stem, dicot root",
      "Dicot root, dicot stem",
      "Monocot root, monocot stem"
    ],
    correct_answer: "Dicot stem, monocot root",
    explanation: "A large, conspicuous, well-developed pith is present in dicot stems and monocot roots. Pith is small/inconspicuous in dicot roots, and absent/undifferentiated in monocot stems.",
    difficulty: "easy",
    topic: "Comparative Anatomy - Pith Development"
  },
  {
    question_number: 184,
    question_text: "The permanent tissue that forms the major component within the organs",
    options: [
      "Provides mechanical support to the growing parts of plant",
      "Is thin-walled and performs the functions like photosynthesis, storage and secretion",
      "Is made up of four different kinds of elements",
      "Is usually dead without protoplast and has thick lignified cell wall"
    ],
    correct_answer: "Is thin-walled and performs the functions like photosynthesis, storage and secretion",
    explanation: "Parenchyma forms the major component within organs. Its cells are living, thin-walled with cellulose, and perform photosynthesis, storage, and secretion.",
    difficulty: "easy",
    topic: "Simple Tissues - Parenchyma"
  },
  {
    question_number: 185,
    question_text: "In leaves, the ground tissue consists of thin-walled chloroplast containing cells, called",
    options: [
      "Trichomes",
      "Conjunctive parenchyma",
      "Cortex",
      "Mesophyll"
    ],
    correct_answer: "Mesophyll",
    explanation: "In leaves, the entire ground tissue system between the upper and lower epidermis is made of chloroplast-containing cells and is termed the mesophyll.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Mesophyll"
  },
  {
    question_number: 186,
    question_text: "Which among the following cannot be a feature of given diagram of a tracheary element?",
    options: [
      "It is a long cylindrical tube like structure",
      "Having lignified walls",
      "Having large central cavity",
      "Having protoplasm"
    ],
    correct_answer: "Having protoplasm",
    explanation: "The diagram depicts a tracheary xylem element (vessel member/tracheid). At maturity, xylem conducting elements are dead and completely devoid of living protoplasm.",
    image_url: diagrams.q186_tracheid,
    difficulty: "easy",
    topic: "Complex Tissues - Tracheary Element Structure"
  }
];
