import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./anatomy_diagrams_map.json', import.meta.url)));

export const batch2Questions = [
  {
    question_number: 41,
    question_text: "The given figure represents transverse section of a monocot stem.\nStatement A: The given figure represents transverse section of a monocot stem.\nStatement B: The hypodermis in the given figure is collenchymatous.\nChoose the correct option:",
    options: [
      "Both A and B are incorrect",
      "A is incorrect",
      "Only B is incorrect",
      "Both are correct"
    ],
    correct_answer: "Only B is incorrect",
    image_url: diagrams.q40_monocot_stem,
    explanation: "Statement A is correct because the diagram clearly shows scattered vascular bundles and undifferentiated ground tissue characteristic of a monocot stem. Statement B is incorrect because the hypodermis of a monocot stem is sclerenchymatous, whereas collenchymatous hypodermis is found in dicot stems.",
    difficulty: "medium",
    topic: "Stem Anatomy - Monocot Stem Identification"
  },
  {
    question_number: 42,
    question_text: "Apical meristem is involved in",
    options: [
      "Primary growth",
      "Elongation",
      "Secondary growth",
      "Both (1) and (2)"
    ],
    correct_answer: "Both (1) and (2)",
    explanation: "Apical meristems occur at the tips of roots and shoots and produce primary tissues resulting in primary growth and linear elongation of organs.",
    difficulty: "easy",
    topic: "Meristematic Tissues - Apical Meristem"
  },
  {
    question_number: 43,
    question_text: "Select the correct features w.r.t. monocot leaf:\n(a) Presence of water containing cavities\n(b) Absence of differentiated mesophyll\n(c) Presence of bulliform cells\n(d) Non-uniform size of vascular bundles\n(e) Stomata equal in number on lower and upper epidermis",
    options: [
      "(a), (b), (e)",
      "(b), (c) and (d)",
      "(a) and (b)",
      "(b), (c) and (e)"
    ],
    correct_answer: "(b), (c) and (e)",
    explanation: "In isobilateral monocot leaves: mesophyll is undifferentiated into palisade and spongy parenchyma (b), bulliform cells occur on the adaxial epidermis in grasses (c), and stomata are distributed nearly equally on both surfaces (e). Water cavities are in stem bundles, and parallel venation results in nearly uniform size of bundles.",
    difficulty: "medium",
    topic: "Leaf Anatomy - Monocot (Isobilateral) Leaf"
  },
  {
    question_number: 44,
    question_text: "Which of the following statements is incorrect w.r.t. dicot stem?",
    options: [
      "Vascular bundles conjoint, endarch and open",
      "Hypodermis is collenchymatous",
      "Endodermis is absent",
      "Ring like arrangement of vascular bundles"
    ],
    correct_answer: "Endodermis is absent",
    explanation: "Endodermis is present in dicot stems as a distinct layer rich in starch grains (starch sheath).",
    difficulty: "easy",
    topic: "Stem Anatomy - Dicot Stem"
  },
  {
    question_number: 45,
    question_text: "Parenchyma",
    options: [
      "Is a complex tissue made up of different types of cells",
      "Forms the major component within various organs of plants",
      "Has thick walls made up of cellulose and pectin",
      "Intercellular spaces are always absent"
    ],
    correct_answer: "Forms the major component within various organs of plants",
    explanation: "Parenchyma forms the major component within organs. Cells are generally isodiametric with thin cellulosic walls and small intercellular spaces.",
    difficulty: "easy",
    topic: "Simple Tissues - Parenchyma"
  },
  {
    question_number: 46,
    question_text: "Find the incorrect match",
    options: [
      "Epiblema - root epidermis",
      "Endodermis - innermost layer of cortex",
      "Guard cells - green epidermal cells",
      "Trichomes - unicellular epidermal hairs in roots"
    ],
    correct_answer: "Trichomes - unicellular epidermal hairs in roots",
    explanation: "Trichomes are usually multicellular epidermal hairs present on the shoot system, whereas root hairs are unicellular elongations of epidermal cells in roots.",
    difficulty: "easy",
    topic: "Epidermal Tissue System - Trichomes vs Root Hairs"
  },
  {
    question_number: 47,
    question_text: "Pith is well developed in",
    options: [
      "Monocot root and monocot stem",
      "Dicot root and dicot stem",
      "Monocot root and dicot stem",
      "Dicot root and monocot stem"
    ],
    correct_answer: "Monocot root and dicot stem",
    explanation: "Pith is large and well-developed in monocot root and dicot stem. In dicot root, pith is small or inconspicuous, and in monocot stem, ground tissue is undifferentiated.",
    difficulty: "medium",
    topic: "Comparative Anatomy - Pith Development"
  },
  {
    question_number: 48,
    question_text: "Stele include",
    options: [
      "Endodermis, pericycle, vascular bundles and pith",
      "Pericycle, vascular bundles and pith (which may be present or absent)",
      "Vascular bundles and pith only",
      "Endodermis and pith only"
    ],
    correct_answer: "Pericycle, vascular bundles and pith (which may be present or absent)",
    explanation: "All tissues on the innerside of the endodermis, including pericycle, vascular bundles, and pith, constitute the stele.",
    difficulty: "medium",
    topic: "Tissue Systems - Stele"
  },
  {
    question_number: 49,
    question_text: "Which of the following is considered as living mechanical tissue?",
    options: [
      "Parenchyma",
      "Sclerenchyma",
      "Collenchyma",
      "Both (1) and (2)"
    ],
    correct_answer: "Collenchyma",
    explanation: "Collenchyma consists of living cells with localized corner pectocellulosic thickenings, providing mechanical support to petiole and young stems while maintaining flexibility.",
    difficulty: "easy",
    topic: "Simple Tissues - Living Mechanical Tissue"
  },
  {
    question_number: 50,
    question_text: "Find the odd one with respect to product of dedifferentiation",
    options: [
      "Interfascicular cambium",
      "Intrafascicular cambium",
      "Cork cambium",
      "Phellogen"
    ],
    correct_answer: "Intrafascicular cambium",
    explanation: "Intrafascicular cambium is a primary meristem formed during differentiation of procambium. Interfascicular cambium, cork cambium (phellogen) are secondary meristems formed by dedifferentiation.",
    difficulty: "medium",
    topic: "Developmental Anatomy - Dedifferentiation"
  },
  {
    question_number: 51,
    question_text: "Tracheids act as main water conducting element in",
    options: [
      "Pteridophytes",
      "Gymnosperms",
      "Bryophytes",
      "Both (1) and (2)"
    ],
    correct_answer: "Both (1) and (2)",
    explanation: "In pteridophytes and gymnosperms, true vessels are generally absent, making tracheids the chief water-conducting elements.",
    difficulty: "easy",
    topic: "Complex Tissues - Tracheids in Vascular Plants"
  },
  {
    question_number: 52,
    question_text: "Companion cells help in",
    options: [
      "Providing mechanical support",
      "Maintaining the pressure gradient in sieve tubes",
      "Water conduction only",
      "Conduction of food from sink to source only"
    ],
    correct_answer: "Maintaining the pressure gradient in sieve tubes",
    explanation: "Companion cells are specialized parenchymatous cells closely associated with sieve tube elements that help in maintaining the pressure gradient in sieve tubes for phloem translocation.",
    difficulty: "easy",
    topic: "Complex Tissues - Companion Cells"
  },
  {
    question_number: 53,
    question_text: "Phloem parenchyma is absent in",
    options: [
      "All dicots",
      "Few dicots and few monocots",
      "All dicots and some monocots",
      "Most of the monocots"
    ],
    correct_answer: "Most of the monocots",
    explanation: "Phloem parenchyma is absent in most monocotyledonous plants.",
    difficulty: "easy",
    topic: "Complex Tissues - Phloem Parenchyma Distribution"
  },
  {
    question_number: 54,
    question_text: "Pericycle in dicot stem",
    options: [
      "Is present below the endodermis and above phloem",
      "Plays an important role during secondary growth",
      "Is found as semi-lunar patches of sclerenchyma",
      "Both (1) & (3)"
    ],
    correct_answer: "Both (1) & (3)",
    explanation: "In dicot stems, pericycle is situated between endodermis and vascular bundles as semilunar patches of sclerenchyma (hard bast).",
    difficulty: "medium",
    topic: "Stem Anatomy - Dicot Stem Pericycle"
  },
  {
    question_number: 55,
    question_text: "Select the correct option with respect to bulliform cells:",
    options: [
      "They occur in monocots",
      "They help in the rolling of leaves during rainfall",
      "These are small, empty and colourless cells",
      "They are modified abaxial epidermal cells"
    ],
    correct_answer: "They occur in monocots",
    explanation: "Bulliform cells occur on the adaxial (upper) epidermis of monocot (grass) leaves. They are large, empty, and colourless, helping leaves curl during water stress (drought).",
    difficulty: "easy",
    topic: "Leaf Anatomy - Bulliform Cells"
  },
  {
    question_number: 56,
    question_text: "The type of vascular bundles in which xylem and phloem are arranged in different radii alternately with each other is present in",
    options: [
      "Dicot stem",
      "Monocot leaf",
      "Dicot root",
      "Monocot stem"
    ],
    correct_answer: "Dicot root",
    explanation: "Radial vascular bundles, where xylem and phloem lie on different radii in an alternating manner, are characteristic of roots (both dicot and monocot root).",
    difficulty: "easy",
    topic: "Vascular System - Radial Bundles"
  },
  {
    question_number: 57,
    question_text: "In dicot leaf the",
    options: [
      "Bulliform cells are arranged on adaxial surface",
      "Palisade tissue is present towards abaxial surface",
      "Vascular bundles are concentric",
      "Mesophyll is differentiated"
    ],
    correct_answer: "Mesophyll is differentiated",
    explanation: "In dorsiventral (dicot) leaves, the ground tissue (mesophyll) is distinctly differentiated into adaxial palisade parenchyma and abaxial spongy parenchyma.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Dicot Leaf Mesophyll"
  },
  {
    question_number: 58,
    question_text: "Main water conducting element of homoxylous plants is",
    options: [
      "Tracheae",
      "Vessel",
      "Tracheid",
      "Xylem parenchyma"
    ],
    correct_answer: "Tracheid",
    explanation: "Homoxylous woods (found in gymnosperms and vessel-less primitive angiosperms) lack vessels, and their main water-conducting elements are tracheids.",
    difficulty: "medium",
    topic: "Complex Tissues - Homoxylous Wood & Tracheids"
  },
  {
    question_number: 59,
    question_text: "Sclereids can be found in",
    options: [
      "Roots only",
      "Stems and leaves only",
      "Fruits only",
      "All parts of a flowering plant"
    ],
    correct_answer: "All parts of a flowering plant",
    explanation: "Sclereids occur widely in cortex, pith, phloem, leaves (tea), seed coats (legumes), and fruit walls/pulp across different organs of flowering plants.",
    difficulty: "easy",
    topic: "Simple Tissues - Sclereids Distribution"
  },
  {
    question_number: 60,
    question_text: "Find the odd one with respect to complex permanent tissue",
    options: [
      "Secondary xylem",
      "Secondary phloem",
      "Sclerenchyma",
      "Primary xylem"
    ],
    correct_answer: "Sclerenchyma",
    explanation: "Sclerenchyma is a simple permanent tissue composed of one type of cell. Xylem and phloem are complex permanent tissues composed of several cell types.",
    difficulty: "easy",
    topic: "Plant Tissues - Simple vs Complex"
  },
  {
    question_number: 61,
    question_text: "Find the odd one with respect to the process of dedifferentiation",
    options: [
      "Interfascicular cambium",
      "Cork cambium",
      "Intrafascicular cambium",
      "Wound cambium"
    ],
    correct_answer: "Intrafascicular cambium",
    explanation: "Intrafascicular cambium is formed by differentiation of primary procambium. Interfascicular cambium, cork cambium, and wound cambium are formed by dedifferentiation of living permanent cells.",
    difficulty: "medium",
    topic: "Developmental Anatomy - Dedifferentiation"
  },
  {
    question_number: 62,
    question_text: "Sieve cells are present in",
    options: [
      "Angiosperms",
      "Gymnosperms",
      "Pteridophytes",
      "Both (2) and (3)"
    ],
    correct_answer: "Both (2) and (3)",
    explanation: "Gymnosperms and pteridophytes possess sieve cells, while angiosperms possess sieve tubes.",
    difficulty: "easy",
    topic: "Complex Tissues - Phloem Sieve Elements"
  },
  {
    question_number: 63,
    question_text: "All are component of epidermal tissue system, except",
    options: [
      "Casparian strip",
      "Stomata",
      "Trichomes",
      "Bulliform cells"
    ],
    correct_answer: "Casparian strip",
    explanation: "Casparian strip is a suberin deposition on endodermal cells, which belongs to the ground tissue system. Stomata, trichomes, and bulliform cells belong to the epidermal tissue system.",
    difficulty: "easy",
    topic: "Tissue Systems - Epidermal vs Ground Tissue"
  },
  {
    question_number: 64,
    question_text: "How many terms from the box are related to the arrangement of vascular bundles in dicot stem?\nBox: [Conjoint, Collateral, Exarch, Open, Closed, Endarch]",
    options: [
      "6",
      "5",
      "4",
      "3"
    ],
    correct_answer: "4",
    explanation: "In dicot stems, vascular bundles are Conjoint, Collateral, Open, and Endarch (4 terms). Exarch is found in roots and Closed is found in monocots/leaves.",
    difficulty: "medium",
    topic: "Stem Anatomy - Dicot Stem Vascular Bundles"
  },
  {
    question_number: 65,
    question_text: "Select the correct match w.r.t. monocot root:",
    options: [
      "Hypodermis - Collenchymatous",
      "Endodermis - Casparian strip present",
      "Pericycle - Lateral roots + cork cambium",
      "Vascular bundle - Tetrarch"
    ],
    correct_answer: "Endodermis - Casparian strip present",
    explanation: "The endodermis of monocot roots possesses Casparian strips. Monocot roots do not form secondary meristem (cork cambium) and their vascular bundles are polyarch (>6).",
    difficulty: "medium",
    topic: "Root Anatomy - Monocot Root"
  },
  {
    question_number: 66,
    question_text: "Pith is completely absent in",
    options: [
      "Roots of monocot",
      "Roots of dicot",
      "Stem of monocot",
      "Stem of dicot"
    ],
    correct_answer: "Stem of monocot",
    explanation: "In monocot stems, vascular bundles are scattered throughout the parenchymatous ground tissue without any distinct differentiation into cortex and central pith.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot Stem Pith"
  },
  {
    question_number: 67,
    question_text: "Cells of endodermis without casparian strips involved in water movement is",
    options: [
      "Parietal cells",
      "Passage cells",
      "Xylem vessel",
      "Xylem parenchyma"
    ],
    correct_answer: "Passage cells",
    explanation: "Passage cells (transfusion cells) are unthickened endodermal cells opposite protoxylem vessels that facilitate the entry of water from cortex into xylem.",
    difficulty: "easy",
    topic: "Root Anatomy - Passage Cells"
  },
  {
    question_number: 68,
    question_text: "Which of the followings are dead cells?",
    options: [
      "Parenchyma cells",
      "Chlorenchyma cells",
      "Sieve tube cells",
      "Sclereid cells"
    ],
    correct_answer: "Sclereid cells",
    explanation: "Sclereids are sclerenchymatous cells that lose their protoplasts at maturity, having heavily lignified walls and dead lumens.",
    difficulty: "easy",
    topic: "Simple Tissues - Sclereids"
  },
  {
    question_number: 69,
    question_text: "Peripheral cytoplasm, enucleated condition, presence of large vacuole is a characteristic of",
    options: [
      "Sieve tube element",
      "Tracheid",
      "Vessel element",
      "Companion cell"
    ],
    correct_answer: "Sieve tube element",
    explanation: "A mature sieve tube element possesses a peripheral layer of cytoplasm and a large central vacuole, but lacks a nucleus (enucleated living state). Its functions are controlled by the nucleus of adjacent companion cells.",
    difficulty: "easy",
    topic: "Complex Tissues - Sieve Tube Characteristics"
  },
  {
    question_number: 70,
    question_text: "In dicot stem, pericycle help in",
    options: [
      "Conduction of minerals",
      "Formation of cork cambium",
      "Providing mechanical support",
      "Conduction of food"
    ],
    correct_answer: "Providing mechanical support",
    explanation: "In dicot stems, the pericycle contains semilunar patches of sclerenchyma (hard bast) above each vascular bundle that provide tensile strength and mechanical support.",
    difficulty: "easy",
    topic: "Stem Anatomy - Pericycle in Dicot Stem"
  },
  {
    question_number: 71,
    question_text: "Which of the following statements is incorrect w.r.t. dicot root?",
    options: [
      "Ring like arrangement of vascular bundles",
      "Presence of endodermis with casparian strips",
      "Small and inconspicuous pith",
      "Absence of hypodermis"
    ],
    correct_answer: "Ring like arrangement of vascular bundles",
    explanation: "In dicot roots, vascular bundles are radial and alternating, not arranged in a conjoint ring (ring arrangement is characteristic of dicot stems).",
    difficulty: "medium",
    topic: "Root Anatomy - Dicot Root Characteristics"
  },
  {
    question_number: 72,
    question_text: "Phloem fibres are made up of __a__ cells. They are generally absent in __b__ phloem and found in __c__ phloem.",
    options: [
      "Parenchyma, Primary, Secondary",
      "Sclerenchyma, Secondary, Primary",
      "Collenchymatous, Primary, Secondary",
      "Sclerenchyma, Primary, Secondary"
    ],
    correct_answer: "Sclerenchyma, Primary, Secondary",
    explanation: "Phloem fibres (bast fibres) are sclerenchymatous cells. They are generally absent in primary phloem and are prominently found in secondary phloem.",
    difficulty: "medium",
    topic: "Complex Tissues - Phloem Fibres"
  },
  {
    question_number: 73,
    question_text: "Ground tissue system",
    options: [
      "Is a heterogenous assemblage of tissues",
      "Is composed of simple and complex permanent tissues",
      "Forms the outermost covering of the whole plant body",
      "Both (1) and (2)"
    ],
    correct_answer: "Is a heterogenous assemblage of tissues",
    explanation: "The ground tissue system forms the bulk of the plant body and is a heterogenous assemblage of simple tissues (parenchyma, collenchyma, and sclerenchyma). It does not include complex vascular tissues.",
    difficulty: "medium",
    topic: "Tissue Systems - Ground Tissue System"
  },
  {
    question_number: 74,
    question_text: "Lateral meristems are involved in",
    options: [
      "Primary growth",
      "Secondary growth",
      "Increase in girth",
      "Both (2) & (3)"
    ],
    correct_answer: "Both (2) & (3)",
    explanation: "Lateral meristems (vascular cambium and cork cambium) are responsible for secondary growth, which increases the girth (diameter/thickness) of stems and roots.",
    difficulty: "easy",
    topic: "Meristematic Tissues - Lateral Meristem"
  },
  {
    question_number: 75,
    question_text: "Find the incorrect match",
    options: [
      "Chlorenchyma - Helps in photosynthesis",
      "Collenchyma - Mainly helps in storage",
      "Sclerenchyma - Provides mechanical strength",
      "Aerenchyma - Provides buoyancy"
    ],
    correct_answer: "Collenchyma - Mainly helps in storage",
    explanation: "Collenchyma is primarily a living mechanical tissue providing flexibility and tensile support to growing organs; storage is primarily performed by parenchyma.",
    difficulty: "easy",
    topic: "Simple Tissues - Functions"
  },
  {
    question_number: 76,
    question_text: "Find the correct option w.r.t. redifferentiation",
    options: [
      "Secondary xylem",
      "Secondary phloem",
      "Both (1) and (2)",
      "Phellogen"
    ],
    correct_answer: "Both (1) and (2)",
    explanation: "Both secondary xylem and secondary phloem are formed by redifferentiation of the secondary meristem (vascular cambium). Phellogen (cork cambium) is formed by dedifferentiation.",
    difficulty: "medium",
    topic: "Developmental Anatomy - Redifferentiation"
  },
  {
    question_number: 77,
    question_text: "Large, empty, colourless cells that occur on __A__ surface of leaves in some __B__ and help in rolling of leaves are called __C__ cells.",
    options: [
      "A - Adaxial, B - Monocots, C - Bulliform",
      "A - Abaxial, B - Dicots, C - Motor",
      "A - Adaxial, B - Dicots, C - Bulliform",
      "A - Abaxial, B - Monocots, C - Motor"
    ],
    correct_answer: "A - Adaxial, B - Monocots, C - Bulliform",
    explanation: "Bulliform cells (motor cells) are large, empty, colourless cells present on the adaxial (upper) epidermis of monocot (grass) leaves.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Bulliform Cells"
  },
  {
    question_number: 78,
    question_text: "How many feature(s) from the given box is/are related to the type of vascular bundles in monocot stem?\nBox: [Closed, Open, Endarch xylem, Radial, Conjoint]",
    options: [
      "4",
      "3",
      "2",
      "1"
    ],
    correct_answer: "3",
    explanation: "In monocot stems, vascular bundles are Conjoint, Closed, and possess Endarch xylem (3 features). Open is found in dicot stems, and Radial is found in roots.",
    difficulty: "medium",
    topic: "Stem Anatomy - Monocot Stem Vascular Features"
  },
  {
    question_number: 79,
    question_text: "Find out the true (T) or false (F) statements and choose the correct option:\nI. Tracheids are present in all vascular plants\nII. Xylem parenchyma is absent in most of the monocots\nIII. Xylem fibres are sclerenchymatous fibres\nIV. Vessel members are devoid of protoplasm and are dead",
    options: [
      "I: T, II: F, III: T, IV: T",
      "I: T, II: F, III: F, IV: T",
      "I: F, II: T, III: F, IV: T",
      "I: F, II: F, III: T, IV: T"
    ],
    correct_answer: "I: T, II: F, III: T, IV: T",
    explanation: "I is True (tracheids occur across pteridophytes, gymnosperms, and angiosperms). II is False (phloem parenchyma is absent in most monocots, but xylem parenchyma is present). III is True (xylem fibres are sclerenchymatous). IV is True (mature vessel members are dead and enucleated).",
    difficulty: "medium",
    topic: "Complex Tissues - Xylem Components"
  },
  {
    question_number: 80,
    question_text: "Which structure of epidermal tissue system performs secretion?",
    options: [
      "Trichomes",
      "Stomatal apparatus",
      "Cuticle",
      "Root hairs"
    ],
    correct_answer: "Trichomes",
    explanation: "Glandular trichomes of the epidermal tissue system can be secretory in function.",
    difficulty: "easy",
    topic: "Epidermal Tissue System - Secretory Trichomes"
  }
];
