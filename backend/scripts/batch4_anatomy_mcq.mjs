import fs from 'fs';
const diagrams = JSON.parse(fs.readFileSync(new URL('./anatomy_diagrams_map.json', import.meta.url)));

export const batch4Questions = [
  {
    question_number: 121,
    question_text: "In monocot leaf, mesophyll tissue",
    options: [
      "Is differentiated into palisade and spongy parenchyma",
      "Is not differentiated into palisade and spongy parenchyma",
      "Possesses some bulliform cells",
      "Is made up of parenchyma cells which lack chloroplasts"
    ],
    correct_answer: "Is not differentiated into palisade and spongy parenchyma",
    explanation: "In isobilateral (monocot) leaves, the mesophyll is composed of uniform chlorenchyma and is not differentiated into palisade and spongy parenchyma.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Monocot Mesophyll"
  },
  {
    question_number: 122,
    question_text: "Choose odd one w.r.t. collenchyma",
    options: [
      "Living mechanical tissue",
      "Intercellular space is absent in angular type",
      "Thickening of walls due to deposition of lignin",
      "Found in hypodermis of dicot stem"
    ],
    correct_answer: "Thickening of walls due to deposition of lignin",
    explanation: "Collenchyma is characterized by pectocellulosic wall thickenings (cellulose, hemicellulose, and pectin), without any lignin deposition. Lignified thick walls are characteristic of sclerenchyma.",
    difficulty: "easy",
    topic: "Simple Tissues - Collenchyma Wall Chemistry"
  },
  {
    question_number: 123,
    question_text: "Select incorrect statements from those given below:\n(i) Endodermis with casparian strips are found in dicot stem\n(ii) Endodermis is a part of stele\n(iii) Amphivasal vascular bundles are found in some monocots\n(iv) Bulliform cells are found in upper epidermis of isobilateral leaf",
    options: [
      "(i) and (ii)",
      "(ii) and (iii)",
      "(i), (ii) and (iii)",
      "Only (i)"
    ],
    correct_answer: "(i) and (ii)",
    explanation: "Statement (i) is incorrect because Casparian strips are found in roots, whereas in dicot stems the endodermis functions as a starch sheath. Statement (ii) is incorrect because the stele includes all tissues inside the endodermis (pericycle, vascular bundles, pith), excluding the endodermis itself. Statements (iii) and (iv) are correct.",
    difficulty: "medium",
    topic: "Comparative Plant Anatomy - Endodermis & Stele"
  },
  {
    question_number: 124,
    question_text: "Meristem is not characterised by",
    options: [
      "High surface area/volume ratio",
      "Vacuolated cytoplasm",
      "Presence of proplastids",
      "Cellulosic cell wall"
    ],
    correct_answer: "Vacuolated cytoplasm",
    explanation: "Meristematic cells are characterized by dense cytoplasm with either no vacuoles or only very small ones. Large vacuolated cytoplasm is a feature of differentiated, mature cells.",
    difficulty: "easy",
    topic: "Meristematic Tissues - Cellular Features"
  },
  {
    question_number: 125,
    question_text: "Which is not a feature of monocot stem?",
    options: [
      "Schizolysigenous water cavity",
      "Endarch xylem",
      "Undifferentiated ground tissue",
      "Bulliform cells"
    ],
    correct_answer: "Bulliform cells",
    explanation: "Bulliform cells (motor cells) are epidermal modifications found in the leaves of monocots (grasses), not in monocot stems.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot Stem Features"
  },
  {
    question_number: 126,
    question_text: "Select incorrect statement w.r.t. the anatomy of monocot stem:",
    options: [
      "Parenchymatous ground tissue is extended from hypodermis to centre",
      "Hypodermis is made of thick-walled living mechanical tissue",
      "Vascular bundles are conjoint, collateral and closed with endarch xylem",
      "Pith is absent"
    ],
    correct_answer: "Hypodermis is made of thick-walled living mechanical tissue",
    explanation: "In monocot stems, the hypodermis is sclerenchymatous (dead mechanical tissue), not living mechanical tissue (collenchyma, which occurs in dicot stems).",
    difficulty: "medium",
    topic: "Stem Anatomy - Monocot Stem Tissues"
  },
  {
    question_number: 127,
    question_text: "Plant tissue acting as air tight dam is",
    options: [
      "Epidermis",
      "Hypodermis",
      "Endodermis",
      "Pericycle"
    ],
    correct_answer: "Endodermis",
    explanation: "The endodermis in roots bears suberin-impregnated Casparian strips on radial and tangential walls, acting as a biological dam/checkpoint that prevents apoplastic water and air leakage into the stele.",
    difficulty: "medium",
    topic: "Root Anatomy - Endodermis Function"
  },
  {
    question_number: 128,
    question_text: "Conjoint, collateral and closed vascular bundles are found in",
    options: [
      "Roots of wheat",
      "Stem of sunflower",
      "Leaf of gram",
      "Stem of mango"
    ],
    correct_answer: "Leaf of gram",
    explanation: "Vascular bundles in leaves (such as the dorsiventral leaf of gram) are conjoint, collateral, and closed because cambium is absent. Roots have radial bundles, and sunflower/mango stems have open bundles.",
    difficulty: "medium",
    topic: "Leaf Anatomy - Closed Vascular Bundles"
  },
  {
    question_number: 129,
    question_text: "The conjunctive parenchyma cells are present in",
    options: [
      "Dicot stem",
      "Monocot stem",
      "Root",
      "Leaf"
    ],
    correct_answer: "Root",
    explanation: "Conjunctive tissue consists of parenchymatous cells that lie between alternating xylem and phloem strands in roots.",
    difficulty: "easy",
    topic: "Root Anatomy - Conjunctive Tissue"
  },
  {
    question_number: 130,
    question_text: "Mark the correct statements w.r.t. meristematic tissues:\nA. The meristem that occurs at the tip of roots and shoots contributes to the formation of primary plant body.\nB. The lateral meristems are responsible for producing the secondary tissues.\nC. Some cells 'left behind' from lateral meristem constitute the axillary bud.\nD. The cells which are structurally and functionally specialised and lose the ability to divide are called meristems.",
    options: [
      "A & C",
      "A & B",
      "B & C",
      "C & D"
    ],
    correct_answer: "A & B",
    explanation: "Statements A and B are correct. Statement C is incorrect because axillary buds are formed by cells left behind from the shoot apical meristem (not lateral meristem). Statement D is incorrect because cells that have lost the capacity to divide are permanent cells.",
    difficulty: "medium",
    topic: "Meristematic Tissues - Concepts"
  },
  {
    question_number: 131,
    question_text: "In parenchyma, all cells are isodiametric and",
    options: [
      "Thin-walled",
      "Thick-walled",
      "Lignified-walled",
      "Devoid of intercellular spaces"
    ],
    correct_answer: "Thin-walled",
    explanation: "Parenchyma cells are generally isodiametric and thin-walled, with cell walls made of cellulose.",
    difficulty: "easy",
    topic: "Simple Tissues - Parenchyma"
  },
  {
    question_number: 132,
    question_text: "The centrifugal xylem is the characteristics of",
    options: [
      "Exarch condition",
      "Endarch condition",
      "Mesarch condition",
      "Polyarch condition"
    ],
    correct_answer: "Endarch condition",
    explanation: "In endarch xylem (stems), protoxylem develops in the center and metaxylem differentiates outwards towards the periphery, which is centrifugal development.",
    difficulty: "medium",
    topic: "Complex Tissues - Centrifugal vs Centripetal Xylem"
  },
  {
    question_number: 133,
    question_text: "In which character an isobilateral leaf differs from the dorsiventral leaf?",
    options: [
      "Scattered vascular bundles",
      "Undifferentiated mesophyll",
      "Absence of stomata with guard cells",
      "Conjoint, collateral and closed vascular bundle"
    ],
    correct_answer: "Undifferentiated mesophyll",
    explanation: "An isobilateral (monocot) leaf has undifferentiated mesophyll, whereas a dorsiventral (dicot) leaf has mesophyll differentiated into upper palisade and lower spongy parenchyma.",
    difficulty: "easy",
    topic: "Leaf Anatomy - Dorsiventral vs Isobilateral Leaf"
  },
  {
    question_number: 134,
    question_text: "The large thin walled epidermal cells called bulliform cells are present in",
    options: [
      "Amphistomatic leaf",
      "Hypostomatic leaf",
      "Astomatic leaf",
      "Epistomatic leaf"
    ],
    correct_answer: "Amphistomatic leaf",
    explanation: "Monocot (grass) leaves are amphistomatic (stomata present on both adaxial and abaxial surfaces) and possess bulliform cells on their adaxial epidermis.",
    difficulty: "medium",
    topic: "Leaf Anatomy - Stomatal Distribution & Bulliform Cells"
  },
  {
    question_number: 135,
    question_text: "Tissue which provides mechanical strength and flexibility to young dicot stem is present in",
    options: [
      "Pith",
      "Hypodermis",
      "Endodermis",
      "Cortex"
    ],
    correct_answer: "Hypodermis",
    explanation: "The hypodermis of young dicot stems consists of collenchyma cells, which provide both mechanical tensile strength and flexibility.",
    difficulty: "easy",
    topic: "Stem Anatomy - Collenchymatous Hypodermis"
  },
  {
    question_number: 136,
    question_text: "The ground tissue system is constituted by all of these, except",
    options: [
      "Medullary rays",
      "Pericycle",
      "Mesophyll",
      "Xylem"
    ],
    correct_answer: "Xylem",
    explanation: "Xylem and phloem constitute the vascular (conducting) tissue system. All other internal plant tissues including cortex, endodermis, pericycle, pith, medullary rays, and leaf mesophyll constitute the ground tissue system.",
    difficulty: "easy",
    topic: "Tissue Systems - Classification"
  },
  {
    question_number: 137,
    question_text: "Plant tissue enriched with starch granules in dicot stem is",
    options: [
      "Present outside pericycle",
      "Collenchymatous",
      "Parenchymatous with intercellular spaces",
      "Pecto-cellulosic and thick walled"
    ],
    correct_answer: "Present outside pericycle",
    explanation: "The innermost layer of cortex in dicot stems is the endodermis (starch sheath), which is rich in starch grains and lies directly outside the pericycle.",
    difficulty: "medium",
    topic: "Stem Anatomy - Starch Sheath Position"
  },
  {
    question_number: 138,
    question_text: "Conjoint, collateral, closed vascular bundles without phloem parenchyma are found in plants which have",
    options: [
      "Differentiated ground tissue in stem",
      "Dedifferentiated pericycle structure in monocot root",
      "Sclerenchymatous hypodermis in stem",
      "Developed pith in stem"
    ],
    correct_answer: "Sclerenchymatous hypodermis in stem",
    explanation: "These features characterize monocot stems, which possess a sclerenchymatous hypodermis, closed bundles, lack of phloem parenchyma, and undifferentiated ground tissue.",
    difficulty: "medium",
    topic: "Stem Anatomy - Monocot Stem Identification"
  },
  {
    question_number: 139,
    question_text: "In a leaf, oval cells with large intercellular spaces and radially arranged columnar cells without intercellular spaces are placed respectively towards",
    options: [
      "Adaxial and abaxial epidermis",
      "Abaxial and adaxial epidermis",
      "Abaxial and lower epidermis",
      "Upper and adaxial epidermis"
    ],
    correct_answer: "Abaxial and adaxial epidermis",
    explanation: "Spongy parenchyma (oval/round cells with large intercellular spaces) is oriented towards the abaxial (lower) epidermis, while palisade parenchyma (columnar cells arranged vertically with no intercellular spaces) is oriented towards the adaxial (upper) epidermis.",
    difficulty: "medium",
    topic: "Leaf Anatomy - Palisade vs Spongy Parenchyma Orientation"
  },
  {
    question_number: 140,
    question_text: "Match the following:\nColumn I:\na. Aerenchyma\nb. Bordered pits\nc. Lateral roots\nd. Callose plug\nColumn II:\n(i) Pericycle\n(ii) Sieve tube\n(iii) Fundamental tissue\n(iv) Tracheids",
    options: [
      "a(iii), b(iv), c(i), d(ii)",
      "a(iii), b(iv), c(ii), d(i)",
      "a(i), b(iv), c(iii), d(ii)",
      "a(iv), b(i), c(iii), d(ii)"
    ],
    correct_answer: "a(iii), b(iv), c(i), d(ii)",
    explanation: "Aerenchyma is a specialized fundamental (ground) tissue (a-iii). Bordered pits are characteristic of tracheids (b-iv). Lateral roots originate from the pericycle (c-i). Callose plugs seal sieve tubes during injury or dormancy (d-ii).",
    difficulty: "medium",
    topic: "Plant Anatomy - Comprehensive Matching"
  },
  {
    question_number: 141,
    question_text: "Which of the following is not the component of secondary phloem?",
    options: [
      "Protophloem",
      "Bast fibres",
      "Companion cells",
      "Phloem parenchyma"
    ],
    correct_answer: "Protophloem",
    explanation: "Protophloem is the first-formed primary phloem developing from procambium during primary growth. Secondary phloem develops from vascular cambium during secondary growth and comprises bast fibres, companion cells, sieve tubes, and phloem parenchyma.",
    difficulty: "medium",
    topic: "Complex Tissues - Primary vs Secondary Phloem"
  },
  {
    question_number: 142,
    question_text: "Monocot root differs from dicot root in",
    options: [
      "Having differentiated ground tissue",
      "Presence of centripetal xylem",
      "Pericyclic origin of lateral roots",
      "Presence of large and well developed pith"
    ],
    correct_answer: "Presence of large and well developed pith",
    explanation: "In monocot roots, the pith is large and well developed, whereas in dicot roots the pith is small, inconspicuous, or absent.",
    difficulty: "easy",
    topic: "Root Anatomy - Monocot vs Dicot Root Pith"
  },
  {
    question_number: 143,
    question_text: "Protoxylem lies towards periphery and metaxylem lies towards the centre. Such arrangement of _____ xylem is present in _____",
    options: [
      "Secondary, root",
      "Primary, stem",
      "Secondary, stem",
      "Primary, root"
    ],
    correct_answer: "Primary, root",
    explanation: "In roots, primary xylem shows the exarch condition where protoxylem lies towards the periphery and metaxylem lies towards the centre.",
    difficulty: "easy",
    topic: "Root Anatomy - Exarch Primary Xylem"
  },
  {
    question_number: 144,
    question_text: "Internal structure of monocot stem is different from the dicot stem in the",
    options: [
      "Absence of conjoint vascular bundles",
      "Presence of collenchymatous hypodermis",
      "Presence of undifferentiated ground tissue",
      "Absence of xylem parenchyma"
    ],
    correct_answer: "Presence of undifferentiated ground tissue",
    explanation: "In monocot stems, ground tissue is undifferentiated into cortex, endodermis, pericycle, and pith, with scattered vascular bundles embedded throughout.",
    difficulty: "easy",
    topic: "Stem Anatomy - Monocot vs Dicot Stem"
  },
  {
    question_number: 145,
    question_text: "Select the incorrect statement w.r.t. monocot root:",
    options: [
      "The xylem bundles are usually more than six",
      "Pith is very large",
      "Secondary growth does not take place",
      "Endodermis possess thick walled passage cells"
    ],
    correct_answer: "Endodermis possess thick walled passage cells",
    explanation: "Passage cells in the endodermis are thin-walled, unthickened cells devoid of Casparian strips that allow water to enter the vascular cylinder.",
    difficulty: "medium",
    topic: "Root Anatomy - Passage Cells"
  },
  {
    question_number: 146,
    question_text: "Dimorphic mesophyll cells are not differentiated in the leaf of",
    options: [
      "Pea",
      "China rose",
      "Sunflower",
      "Banana"
    ],
    correct_answer: "Banana",
    explanation: "Pea, China rose, and sunflower are dicots possessing dorsiventral leaves with dimorphic mesophyll (palisade and spongy). Banana is a monocot with an isobilateral leaf having undifferentiated mesophyll.",
    difficulty: "medium",
    topic: "Leaf Anatomy - Monocot vs Dicot Leaf Mesophyll"
  },
  {
    question_number: 147,
    question_text: "Secondary permanent tissue is produced from vascular cells or tissues after",
    options: [
      "Differentiation",
      "Dedifferentiation",
      "Redifferentiation",
      "Accretion"
    ],
    correct_answer: "Redifferentiation",
    explanation: "Cells produced by secondary meristems lose the capacity to divide and mature to perform specific functions through the process of redifferentiation.",
    difficulty: "medium",
    topic: "Plant Growth & Anatomy - Redifferentiation"
  },
  {
    question_number: 148,
    question_text: "Which one of the following are elongated single-celled water conducting dead structures with bordered pits?",
    options: [
      "Tracheids",
      "Vessels",
      "Sclerenchyma fibres",
      "Sclereids"
    ],
    correct_answer: "Tracheids",
    explanation: "Tracheids are elongated, single-celled, dead water-conducting elements with tapering ends and bordered pits in their lignified cell walls.",
    difficulty: "easy",
    topic: "Complex Tissues - Tracheids"
  },
  {
    question_number: 149,
    question_text: "Cells having cellulose, hemicellulose and pectin deposits on wall and shows its presence commonly in petiole of leaf and growing green stems belong to",
    options: [
      "Sclerenchyma",
      "Collenchyma",
      "Aerenchyma",
      "Parenchyma"
    ],
    correct_answer: "Collenchyma",
    explanation: "Collenchyma cells have corner wall thickenings of cellulose, hemicellulose, and pectin, providing flexible mechanical support in young stems and leaf petioles.",
    difficulty: "easy",
    topic: "Simple Tissues - Collenchyma"
  },
  {
    question_number: 150,
    question_text: "Select the group of tissues which are formed by de-differentiation in a dicotyledonous plant:",
    options: [
      "Secondary xylem, cork cambium and root cambium",
      "Interfascicular cambium, intrafascicular cambium and cork cambium",
      "Root cambium, cork cambium and interfascicular cambium",
      "Cork cambium, vascular cambium of dicot stem and phellem"
    ],
    correct_answer: "Root cambium, cork cambium and interfascicular cambium",
    explanation: "In dicots, the complete vascular cambium of roots (root cambium), cork cambium (phellogen), and interfascicular cambium of stems develop secondary in origin through dedifferentiation of living permanent tissues.",
    difficulty: "hard",
    topic: "Secondary Growth - Dedifferentiated Meristems"
  },
  {
    question_number: 151,
    question_text: "Elongated or tube like cells with thick and lignified walls and tapering ends is",
    options: [
      "Tracheids",
      "Vessel",
      "Sieve tube",
      "Collenchyma"
    ],
    correct_answer: "Tracheids",
    explanation: "Tracheids are elongated, tube-like cells with thick lignified walls and tapering ends.",
    difficulty: "easy",
    topic: "Complex Tissues - Tracheid Morphology"
  },
  {
    question_number: 152,
    question_text: "As compared to monocot root, the dicot root has/shows",
    options: [
      "Large and well developed pith",
      "Primary growth only",
      "Sclerenchymatous pericycle",
      "Fewer xylem bundles"
    ],
    correct_answer: "Fewer xylem bundles",
    explanation: "Dicot roots typically possess 2 to 4 (diarch to tetrarch, up to hexarch) xylem bundles, which is fewer than the polyarch (>6) bundles of monocot roots.",
    difficulty: "easy",
    topic: "Root Anatomy - Dicot vs Monocot Xylem Bundles"
  },
  {
    question_number: 153,
    question_text: "Choose the odd one out w.r.t. stem hairs called trichomes:",
    options: [
      "Can be soft or stiff",
      "Usually multicellular",
      "May be secretory",
      "Always unbranched"
    ],
    correct_answer: "Always unbranched",
    explanation: "Trichomes on the shoot system may be branched or unbranched, soft or stiff, and can be secretory. Stating they are 'always unbranched' is incorrect.",
    difficulty: "easy",
    topic: "Epidermal Tissue System - Trichome Diversity"
  },
  {
    question_number: 154,
    question_text: "Which of the given figure represents internal structural details of a monocot root?",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_answer: "(2)",
    image_url: diagrams.q154_root_cross_sections,
    explanation: "Figure (2) depicts a monocot root sector showing polyarch radial vascular bundles (numerous alternating xylem and phloem strands) and a large, well-developed central pith. Figure (1) represents a dicot root with tetrarch xylem.",
    difficulty: "medium",
    topic: "Root Anatomy - Monocot Root Diagram Identification"
  },
  {
    question_number: 155,
    question_text: "The most abundant and common tissue in plants",
    options: [
      "Has non-vacuolated cytoplasm",
      "Is living and has cellulosic wall",
      "Stores ergastic substances always",
      "Cannot take part in photosynthesis"
    ],
    correct_answer: "Is living and has cellulosic wall",
    explanation: "Parenchyma is the most common and widely distributed plant tissue. It consists of living isodiametric cells with thin cellulosic cell walls and functions in storage, photosynthesis (chlorenchyma), and secretion.",
    difficulty: "easy",
    topic: "Simple Tissues - Parenchyma Features"
  }
];
