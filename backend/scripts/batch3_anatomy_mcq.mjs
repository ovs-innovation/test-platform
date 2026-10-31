import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./anatomy_diagrams_map.json', import.meta.url)));

export const batch3Questions = [
  {
    question_number: 81,
    question_text: "Study the given diagram along with the statements provided and choose the correct option:\nA. The given figure represents radial vascular bundle.\nB. The xylem and phloem are situated at the same radius.",
    options: [
      "Both are incorrect",
      "Only A is correct",
      "Only A is incorrect",
      "Both are correct"
    ],
    correct_answer: "Only A is correct",
    image_url: diagrams.q81_radial_bundle,
    explanation: "Statement A is correct because the diagram shows alternating xylem and phloem arranged along separate radii, which is characteristic of radial vascular bundles found in roots. Statement B is incorrect because xylem and phloem lie on different radii, not the same radius (bundles with xylem and phloem on the same radius are conjoint).",
    difficulty: "easy",
    topic: "Vascular Bundle Types - Radial Vascular Bundles"
  },
  {
    question_number: 82,
    question_text: "Bundle sheath is present in",
    options: [
      "Dicot stem",
      "Monocot stem",
      "Dicot root",
      "Monocot root"
    ],
    correct_answer: "Monocot stem",
    explanation: "In monocot stems, each scattered vascular bundle is characteristically surrounded by a sclerenchymatous bundle sheath.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot Stem Bundle Sheath"
  },
  {
    question_number: 83,
    question_text: "Read the following statements:\nA. Collenchymatous hypodermis\nB. Endodermis with Casparian strip\nC. Presence of medullary rays\nD. Vascular bundles are non-uniform in size\nE. Scattered vascular bundle\nHow many of the above statements are correct for dicot stem?",
    options: [
      "One",
      "Two",
      "Four",
      "Three"
    ],
    correct_answer: "Two",
    explanation: "For dicot stem, statements A (collenchymatous hypodermis) and C (presence of medullary rays between vascular bundles) are correct. Endodermis with Casparian strips is found in roots (in dicot stem it is starch sheath), and scattered non-uniform bundles occur in monocot stem. Thus, 2 statements are correct.",
    difficulty: "medium",
    topic: "Stem Anatomy - Dicot Stem Features"
  },
  {
    question_number: 84,
    question_text: "Match Column A with Column B and select correct option:\nColumn A:\n(A) Companion cells\n(B) Sieve tube element\n(C) Albuminous cells\n(D) Phloem parenchyma\nColumn B:\n(i) Stores mucilage\n(ii) Gymnosperms\n(iii) Enucleated\n(iv) Maintenance of pressure gradient in sieve tube",
    options: [
      "A-(iv), B-(iii), C-(ii), D-(i)",
      "A-(i), B-(ii), C-(iii), D-(iv)",
      "A-(ii), B-(iii), C-(i), D-(iv)",
      "A-(iii), B-(ii), C-(iv), D-(i)"
    ],
    correct_answer: "A-(iv), B-(iii), C-(ii), D-(i)",
    explanation: "Companion cells maintain the pressure gradient in sieve tubes (A-iv). Mature sieve tube elements are enucleated living cells (B-iii). Albuminous cells function analogously to companion cells in gymnosperms (C-ii). Phloem parenchyma stores food resins, latex, and mucilage (D-i).",
    difficulty: "medium",
    topic: "Complex Tissues - Phloem Components & Functions"
  },
  {
    question_number: 85,
    question_text: "All are bast fibres used commercially, except",
    options: [
      "Jute",
      "Flax",
      "Cotton",
      "Hemp"
    ],
    correct_answer: "Cotton",
    explanation: "Cotton fibres are epidermal surface hairs of seeds made of cellulose, whereas jute, flax, and hemp are sclerenchymatous phloem (bast) fibres.",
    difficulty: "easy",
    topic: "Complex Tissues - Bast Fibres"
  },
  {
    question_number: 86,
    question_text: "Which of the following structures have endogenous origin?",
    options: [
      "Lateral shoot",
      "Lateral root",
      "Root hair",
      "Trichome"
    ],
    correct_answer: "Lateral root",
    explanation: "Lateral roots originate endogenously from the pericycle (internal to the endodermis). Stem branches, root hairs, and trichomes are exogenous in origin.",
    difficulty: "medium",
    topic: "Root Anatomy - Endogenous Origin of Lateral Roots"
  },
  {
    question_number: 87,
    question_text: "Meristematic cells are characterised by all, except",
    options: [
      "Presence of thick lignified cell wall",
      "High nucleocytoplasmic ratio",
      "Being small",
      "Having dense cytoplasm"
    ],
    correct_answer: "Presence of thick lignified cell wall",
    explanation: "Meristematic cells have thin primary cell walls composed of cellulose; thick lignified walls are characteristic of dead sclerenchyma, not dividing meristem.",
    difficulty: "easy",
    topic: "Meristematic Tissues - Characteristics"
  },
  {
    question_number: 88,
    question_text: "Pith in roots are made up of",
    options: [
      "Collenchymatous cells",
      "Sclerenchymatous cells",
      "Parenchymatous cells",
      "Chlorenchymatous cells"
    ],
    correct_answer: "Parenchymatous cells",
    explanation: "Pith (medulla) in roots is composed of loosely arranged parenchymatous cells with intercellular spaces.",
    difficulty: "easy",
    topic: "Root Anatomy - Pith"
  },
  {
    question_number: 89,
    question_text: "In a dicot stem, there are a few layers of radially placed parenchymatous cells in between vascular bundles, called",
    options: [
      "Medullary rays",
      "Conjunctive tissue",
      "Starch sheath",
      "Casparian strip"
    ],
    correct_answer: "Medullary rays",
    explanation: "In dicot stems, radially arranged rows of parenchymatous cells situated between the vascular bundles are called medullary rays (pith rays).",
    difficulty: "easy",
    topic: "Stem Anatomy - Medullary Rays"
  },
  {
    question_number: 90,
    question_text: "In which of the following vascular bundle is not conjoint?",
    options: [
      "Dicot leaf",
      "Monocot leaf",
      "Monocot root",
      "Monocot stem"
    ],
    correct_answer: "Monocot root",
    explanation: "In roots (including monocot roots), vascular bundles are radial with xylem and phloem on separate radii. In stems and leaves, vascular bundles are conjoint.",
    difficulty: "easy",
    topic: "Vascular Bundle Types - Conjoint vs Radial"
  },
  {
    question_number: 91,
    question_text: "Which of the following is not a characteristic feature of dicot stem?",
    options: [
      "Vascular bundles are conjoint and open",
      "Sclerenchymatous hypodermis",
      "Ring like arrangement of vascular bundles",
      "Presence of pith and medullary rays"
    ],
    correct_answer: "Sclerenchymatous hypodermis",
    explanation: "Dicot stems possess a collenchymatous hypodermis that provides mechanical strength and flexibility. A sclerenchymatous hypodermis is characteristic of monocot stems.",
    difficulty: "easy",
    topic: "Stem Anatomy - Dicot Stem Features"
  },
  {
    question_number: 92,
    question_text: "Read the given statements and choose the correct option for stomata:\ni. The outer cell wall of guard cell is thick while the inner layer is thin.\nii. Dicot leaves have stomata on both the surfaces in equal numbers.\niii. Sunken stomata is a common feature of xerophytes.\niv. Stomatal apparatus is composed of guard cells, a stomatal pore and subsidiary cells.",
    options: [
      "i and ii are incorrect",
      "All are correct",
      "i and iii are correct",
      "ii and iv are correct"
    ],
    correct_answer: "i and ii are incorrect",
    explanation: "Statement i is incorrect because the outer wall is thin and the inner wall facing the aperture is thick. Statement ii is incorrect because dicot leaves are hypostomatic with more stomata on the lower surface. Statements iii and iv are correct.",
    difficulty: "medium",
    topic: "Epidermal Tissue System - Stomatal Features"
  },
  {
    question_number: 93,
    question_text: "Choose the correct match:",
    options: [
      "Differentiated tissue - Intrafascicular cambium",
      "Dedifferentiated tissue - Cork cambium",
      "Redifferentiated tissue - Primary xylem",
      "Undifferentiated tissue - Secondary phloem"
    ],
    correct_answer: "Dedifferentiated tissue - Cork cambium",
    explanation: "Cork cambium (phellogen) arises by dedifferentiation of cortical parenchymatous cells in the extrastelar region during secondary growth.",
    difficulty: "medium",
    topic: "Developmental Anatomy - Differentiation and Dedifferentiation"
  },
  {
    question_number: 94,
    question_text: "Read the following statements (A-E):\nA. Lateral meristems occur in all plants\nB. Primary meristems are in active state of division\nC. Activity of intercalary meristem mainly adds to the girth of plant or its organ\nD. Apical meristem contributes to increase in the length of plant\nE. Some cells 'left behind' from shoot apical meristem in the axil of leaves constitute the axillary bud\nHow many of the above statements are true?",
    options: [
      "1",
      "2",
      "5",
      "3"
    ],
    correct_answer: "3",
    explanation: "Statements B, D, and E are true. Statement A is false because lateral meristems are absent in many monocots and herbaceous annuals. Statement C is false because intercalary meristem adds to the length of plant organs, not girth.",
    difficulty: "medium",
    topic: "Meristematic Tissues - Types and Growth Roles"
  },
  {
    question_number: 95,
    question_text: "Match the Column A with Column B:\nColumn A:\nA. Parenchyma\nB. Sclereids\nC. Sclerenchyma\nD. Collenchyma\nColumn B:\ni. Leaves of tea\nii. Main bulk of plant body\niii. Living mechanical tissue\niv. Dead mechanical tissue",
    options: [
      "A-i, B-ii, C-iii, D-iv",
      "A-ii, B-i, C-iv, D-iii",
      "A-ii, B-iv, C-iii, D-i",
      "A-ii, B-i, C-iii, D-iv"
    ],
    correct_answer: "A-ii, B-i, C-iv, D-iii",
    explanation: "Parenchyma forms the main bulk of the plant body (A-ii). Sclereids (astrosclereids) occur in the leaves of tea (B-i). Sclerenchyma is dead mechanical tissue (C-iv). Collenchyma is living mechanical tissue (D-iii).",
    difficulty: "medium",
    topic: "Simple Tissues - Matching Characteristics"
  },
  {
    question_number: 96,
    question_text: "Which of the following is not correctly matched with its category?",
    options: [
      "Aerenchyma - Parenchyma",
      "Chlorenchyma - Parenchyma",
      "Collenchyma - Sclereids",
      "Sclerenchyma - Fibres"
    ],
    correct_answer: "Collenchyma - Sclereids",
    explanation: "Sclereids belong to sclerenchyma, not collenchyma. Aerenchyma and chlorenchyma are specialized forms of parenchyma, and fibres belong to sclerenchyma.",
    difficulty: "easy",
    topic: "Simple Permanent Tissues - Classification"
  },
  {
    question_number: 97,
    question_text: "Identify the statements as true (T) or false (F) and select the correct option:\n(I) Cell walls become thick at corners in collenchyma\n(II) Collenchyma is absent in dicotyledonous plants\n(III) Lignin is present in the cell wall of collenchyma\n(IV) Collenchyma always forms homogenous layer",
    options: [
      "I: T, II: T, III: F, IV: F",
      "I: T, II: F, III: F, IV: T",
      "I: F, II: F, III: T, IV: F",
      "I: T, II: F, III: F, IV: F"
    ],
    correct_answer: "I: T, II: F, III: F, IV: F",
    explanation: "Statement I is True (corner thickening by cellulose, hemicellulose, and pectin). Statement II is False (collenchyma is characteristic of dicot stems, absent in monocots). Statement III is False (collenchyma cell walls are non-lignified). Statement IV is False (collenchyma occurs either as a continuous homogeneous layer or in patches).",
    difficulty: "medium",
    topic: "Simple Tissues - Collenchyma Facts"
  },
  {
    question_number: 98,
    question_text: "Read the following statements and choose the correct option:\nStatement A: Companion cells are found in angiosperms.\nStatement B: Companion cells and sieve tube cells are called sister cells.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_answer: "Both statements A and B are correct",
    explanation: "Companion cells are characteristic of angiosperms (gymnosperms have albuminous cells instead). Sieve tube elements and companion cells arise ontogenetically from the same mother cell, which is why they are called sister cells.",
    difficulty: "easy",
    topic: "Complex Tissues - Companion Cells & Sieve Tubes"
  },
  {
    question_number: 99,
    question_text: "Section of apical meristem is shown in the diagram with label (A-E). Select the correct match:\nA: Leaf primordium, B: Shoot apical meristematic zone, C: Axillary bud, D & E: Differentiating vascular tissue.",
    options: [
      "A - Root primordia",
      "B - Root apical zone",
      "C - Meristematic zone",
      "D & E - Differentiating vascular tissue"
    ],
    correct_answer: "D & E - Differentiating vascular tissue",
    explanation: "The diagram depicts the shoot apical meristem. Label A represents the leaf primordium, B is the shoot apical meristematic zone, C is the axillary bud in the leaf axil, and D and E designate differentiating vascular strands traversing into the stem.",
    image_url: diagrams.q99_apical_meristem,
    difficulty: "medium",
    topic: "Meristematic Tissues - Shoot Apical Meristem Zones"
  },
  {
    question_number: 100,
    question_text: "Xylem bundles are usually __(a)__ in __(b)__.",
    options: [
      "(a) Tetrarch, (b) Monocot root",
      "(a) Polyarch, (b) Dicot root",
      "(a) Polyarch, (b) Monocot root",
      "(a) Tetrarch, (b) Monocot stem"
    ],
    correct_answer: "(a) Polyarch, (b) Monocot root",
    explanation: "In monocot roots, the vascular bundles are usually more than six (polyarch condition), whereas dicot roots typically have 2 to 4 (diarch to tetrarch, up to hexarch) xylem bundles.",
    difficulty: "easy",
    topic: "Root Anatomy - Monocot Root Polyarch Bundles"
  },
  {
    question_number: 101,
    question_text: "Choose the incorrect combination:",
    options: [
      "Monocot root | Cambium | Secondary xylem, secondary phloem",
      "Dicot root | Radial vascular bundle | Secondary xylem, secondary phloem",
      "Monocot stem | Protoxylem | Schizolysigenous cavity",
      "Dicot stem | Conjoint vascular bundle | Collenchymatous hypodermis"
    ],
    correct_answer: "Monocot root | Cambium | Secondary xylem, secondary phloem",
    explanation: "Monocot roots do not possess cambium and do not undergo secondary growth; hence they do not produce secondary xylem and secondary phloem.",
    difficulty: "easy",
    topic: "Comparative Plant Anatomy - Cambium & Secondary Growth"
  },
  {
    question_number: 102,
    question_text: "In roots, lateral branches arise from",
    options: [
      "Epiblema",
      "Pericycle",
      "Cortex",
      "Endodermis"
    ],
    correct_answer: "Pericycle",
    explanation: "Lateral roots initiate endogenously from cells of the pericycle situated opposite the protoxylem elements.",
    difficulty: "easy",
    topic: "Root Anatomy - Pericycle Function"
  },
  {
    question_number: 103,
    question_text: "Bulliform cells are",
    options: [
      "Adaxial epidermal cell in grass",
      "Abaxial epidermal cells in grass",
      "Adaxial epidermal cells in dicots leaf",
      "Abaxial epidermal cells in monocot leaf"
    ],
    correct_answer: "Adaxial epidermal cell in grass",
    explanation: "Bulliform cells are modified, large, empty, hygroscopic cells located on the adaxial (upper) epidermis of monocot (grass) leaves.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Bulliform Cells"
  },
  {
    question_number: 104,
    question_text: "Choose the incorrect combination w.r.t. dicot stem:",
    options: [
      "Medullary rays - Parenchyma",
      "Hypodermis - Parenchyma",
      "Pericycle - Parenchyma",
      "Epidermis - Parenchyma"
    ],
    correct_answer: "Hypodermis - Parenchyma",
    explanation: "In dicot stems, the hypodermis is collenchymatous, not parenchymatous.",
    difficulty: "easy",
    topic: "Stem Anatomy - Dicot Stem Tissues"
  },
  {
    question_number: 105,
    question_text: "Angiospermic families which lack vessels include",
    options: [
      "Tetracentraceae",
      "Trochodendraceae",
      "Winteraceae",
      "All of these"
    ],
    correct_answer: "All of these",
    explanation: "Primitive vessel-less angiosperm families include Winteraceae, Tetracentraceae, and Trochodendraceae.",
    difficulty: "medium",
    topic: "Complex Tissues - Vessel-less Angiosperms"
  },
  {
    question_number: 106,
    question_text: "_____ is mostly absent in pteridophytes but present in gymnosperms.",
    options: [
      "Sieve cells",
      "Sieve tubes",
      "Secondary growth",
      "Companion cells"
    ],
    correct_answer: "Secondary growth",
    explanation: "Secondary growth is characteristic of gymnosperms but is generally absent in pteridophytes (with rare exceptions like Isoetes).",
    difficulty: "medium",
    topic: "Plant Anatomy - Secondary Growth in Plant Groups"
  },
  {
    question_number: 107,
    question_text: "The albuminous cells occur in",
    options: [
      "Grasses",
      "Mango plant",
      "Cycas",
      "Leguminous plants"
    ],
    correct_answer: "Cycas",
    explanation: "Albuminous cells (Strasburger cells) are present in the phloem of gymnosperms like Cycas and Pinus, performing functions similar to companion cells.",
    difficulty: "easy",
    topic: "Complex Tissues - Gymnosperm Phloem"
  },
  {
    question_number: 108,
    question_text: "Phloem parenchyma is",
    options: [
      "Absent in all angiosperms",
      "Absent in all dicots",
      "Present in all monocots",
      "Absent in most monocots"
    ],
    correct_answer: "Absent in most monocots",
    explanation: "Phloem parenchyma is typically absent in most monocotyledons, but present in dicotyledons.",
    difficulty: "easy",
    topic: "Complex Tissues - Phloem Parenchyma Distribution"
  },
  {
    question_number: 109,
    question_text: "The correct sequence of layers from outside to inside of a typical monocot root is",
    options: [
      "Epidermis, endodermis, cortex, vascular bundles, pericycle and pith",
      "Epidermis, endodermis, cortex, pericycle, vascular bundles and pith",
      "Epidermis, cortex, endodermis, pericycle, vascular bundles and pith",
      "Epidermis, pericycle, endodermis, cortex, vascular bundles and pith"
    ],
    correct_answer: "Epidermis, cortex, endodermis, pericycle, vascular bundles and pith",
    explanation: "From outer surface to center in roots: Epidermis (epiblema) -> Cortex -> Endodermis -> Pericycle -> Vascular bundles -> Pith.",
    difficulty: "easy",
    topic: "Root Anatomy - Layer Sequence"
  },
  {
    question_number: 110,
    question_text: "Which pair has lignin in both?",
    options: [
      "Tracheid and collenchyma",
      "Companion cells and sieve tube",
      "Sclerenchyma and tracheids",
      "Parenchyma and endodermis"
    ],
    correct_answer: "Sclerenchyma and tracheids",
    explanation: "Both sclerenchyma and tracheids possess heavily lignified secondary cell walls. Collenchyma, parenchyma, and sieve tubes have cellulosic non-lignified walls.",
    difficulty: "easy",
    topic: "Plant Cell Walls - Lignification"
  },
  {
    question_number: 111,
    question_text: "Formation of vascular cambium in dicot stem is",
    options: [
      "Only primary in nature",
      "Only secondary in nature",
      "Occurs from the very beginning",
      "Partly primary and partly secondary in origin"
    ],
    correct_answer: "Partly primary and partly secondary in origin",
    explanation: "In dicot stems, the continuous vascular cambial ring is composed of intrafascicular cambium (primary in origin) and interfascicular cambium (secondary in origin), making it partly primary and partly secondary.",
    difficulty: "medium",
    topic: "Secondary Growth - Cambial Ring Origin"
  },
  {
    question_number: 112,
    question_text: "Which of the following is an elastic, living mechanical tissue?",
    options: [
      "Parenchyma",
      "Collenchyma",
      "Sclerenchyma",
      "Meristematic tissue"
    ],
    correct_answer: "Collenchyma",
    explanation: "Collenchyma is a living mechanical tissue that provides tensile strength along with elasticity and flexibility to growing parts such as young stems and petioles.",
    difficulty: "easy",
    topic: "Simple Tissues - Collenchyma Properties"
  },
  {
    question_number: 113,
    question_text: "Select incorrect statement w.r.t. anatomical features of monocot root.",
    options: [
      "Pericycle produces lateral roots and part of vascular cambium",
      "Exodermis is present in older roots",
      "Conjunctive parenchyma does not produce cambium",
      "Well developed pith is present"
    ],
    correct_answer: "Pericycle produces lateral roots and part of vascular cambium",
    explanation: "In monocot roots, vascular cambium is never formed because secondary growth does not occur. The pericycle only gives rise to lateral roots.",
    difficulty: "medium",
    topic: "Root Anatomy - Monocot Root Lack of Cambium"
  },
  {
    question_number: 114,
    question_text: "In the life cycle of a plant, the secondary tissues are made by",
    options: [
      "Intercalary meristem and vascular cambium",
      "Apical meristem and cork cambium",
      "Cork cambium and vascular cambium",
      "Primary meristems and interfascicular cambium"
    ],
    correct_answer: "Cork cambium and vascular cambium",
    explanation: "Secondary plant tissues are produced exclusively by lateral secondary meristems: vascular cambium (producing secondary xylem and secondary phloem) and cork cambium (phellogen, producing phellem and phelloderm).",
    difficulty: "easy",
    topic: "Secondary Growth - Lateral Meristems"
  },
  {
    question_number: 115,
    question_text: "Casparian strips are present in the endodermis of",
    options: [
      "Monocot stem",
      "Dicot root",
      "Dicot stem",
      "Dicot leaf"
    ],
    correct_answer: "Dicot root",
    explanation: "Casparian strips (bands of suberin) are characteristic of the endodermis of roots (both dicot root and monocot root). In stems, endodermis cells form a starch sheath.",
    difficulty: "easy",
    topic: "Root Anatomy - Casparian Strips"
  },
  {
    question_number: 116,
    question_text: "Stem of Zea mays plant lacks",
    options: [
      "Sieve tube",
      "Phloem parenchyma",
      "Xylem tracheids",
      "Xylem vessel"
    ],
    correct_answer: "Phloem parenchyma",
    explanation: "Zea mays (maize) is a monocotyledon, and monocot stems characteristically lack phloem parenchyma.",
    difficulty: "easy",
    topic: "Complex Tissues - Monocot Phloem"
  },
  {
    question_number: 117,
    question_text: "Mark the correct one w.r.t. bundle sheath in a dicot leaf",
    options: [
      "Sclerenchymatous",
      "Collenchymatous",
      "Parenchymatous",
      "Lignified"
    ],
    correct_answer: "Parenchymatous",
    explanation: "In dicot (dorsiventral) leaves, the bundle sheath enclosing the vascular bundle consists of living, compact parenchymatous cells.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Dicot Bundle Sheath"
  },
  {
    question_number: 118,
    question_text: "Bulliform cells are associated with",
    options: [
      "Epidermis of dorsiventral leaves",
      "Adaxial epidermis of isobilateral leaves",
      "Abaxial epidermis of monocot leaves",
      "Mesophyll tissue of dicot leaves"
    ],
    correct_answer: "Adaxial epidermis of isobilateral leaves",
    explanation: "Bulliform cells occur on the adaxial (upper) surface of isobilateral (monocot grass) leaves along the veins.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Bulliform Cells Location"
  },
  {
    question_number: 119,
    question_text: "In monocotyledonous stem",
    options: [
      "Hypodermis is parenchymatous",
      "Each vascular bundle is surrounded by collenchymatous bundle sheath",
      "Peripheral vascular bundles are generally larger than centrally located ones",
      "Water containing cavities are present within the vascular bundles"
    ],
    correct_answer: "Water containing cavities are present within the vascular bundles",
    explanation: "In monocot stems, breakdown of inner protoxylem elements creates a characteristic water-containing lysigenous cavity inside each vascular bundle. Hypodermis and bundle sheath are sclerenchymatous, and peripheral bundles are smaller than central ones.",
    difficulty: "medium",
    topic: "Stem Anatomy - Monocot Stem Protoxylem Cavity"
  },
  {
    question_number: 120,
    question_text: "Primary meristem",
    options: [
      "Originates from permanent tissue",
      "Possess non-vacuolated cells",
      "Develops from secondary permanent tissue",
      "Represents primordial meristem"
    ],
    correct_answer: "Possess non-vacuolated cells",
    explanation: "Cells of primary meristems are actively dividing, with dense cytoplasm, large nuclei, and non-vacuolated (or with very small inconspicuous vacuoles) condition. They originate from embryonic meristems, not permanent tissue.",
    difficulty: "medium",
    topic: "Meristematic Tissues - Characteristics of Primary Meristem"
  }
];
