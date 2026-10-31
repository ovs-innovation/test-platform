import fs from 'fs';

const diagramsMap = JSON.parse(fs.readFileSync('scripts/morphology_diagrams_map.json', 'utf8'));

export const batch3Questions = [
  {
    question_number: 53,
    question_text: "Select the incorrect statement w.r.t. leaves:",
    options: [
      "The incisions do not touch the midrib in simple leaves",
      "A bud is present in the axil of both simple and compound leaves",
      "A bud is also present in the axil of leaflets of the compound leaf",
      "The rachis represents the midrib of the leaf as in neem"
    ],
    correct_option: "C",
    solution: "A bud is present in the axil of petiole in both simple and compound leaves, but never in the axil of leaflets of a compound leaf.",
    topic: "Leaf - Types of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "Identify the type of phyllotaxy and its example:",
    options: [
      "Alternate and Hibiscus",
      "Opposite and Guava",
      "Whorled and Alstonia",
      "Whorled and Calotropis"
    ],
    correct_option: "C",
    solution: "If more than two leaves arise at a node and form a whorl, it is called whorled phyllotaxy, as in Alstonia.",
    topic: "Leaf - Phyllotaxy",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q54"]
  },
  {
    question_number: 55,
    question_text: "Which plant will lose its economic value, if its fruits are produced by induced parthenocarpy?",
    options: [
      "Grape",
      "Banana",
      "Pea",
      "Orange"
    ],
    correct_option: "C",
    solution: "Pea is cultivated and consumed for its seeds. If parthenocarpy is induced, fruits will be seedless, thereby losing their economic value.",
    topic: "Fruit - Parthenocarpic Fruit",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "Monoadelphous condition of stamens is present in",
    options: [
      "Citrus",
      "China rose",
      "Brinjal",
      "Mustard"
    ],
    correct_option: "B",
    solution: "In China rose (family Malvaceae), stamens are united into a single bundle or staminal tube (monadelphous).",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "In which type of placentation, the ovules develop on the inner wall of the ovary or on peripheral part?",
    options: [
      "Marginal",
      "Axile",
      "Parietal",
      "Free central"
    ],
    correct_option: "C",
    solution: "In parietal placentation, ovules develop on the inner wall of the ovary or on peripheral parts, as seen in mustard and Argemone.",
    topic: "Flower - Placentation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "If a fruit is formed without fertilisation of the ovary, it is called",
    options: [
      "False fruit",
      "Parthenocarpic fruit",
      "True fruit",
      "Pseudocarp"
    ],
    correct_option: "B",
    solution: "If a fruit is formed without fertilisation of the ovary, it is called a parthenocarpic fruit (e.g., banana).",
    topic: "Fruit - Parthenocarpy",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "Identify the parts labelled A, B and C in the given diagram:",
    options: [
      "Endosperm, Radicle, Plumule",
      "Endosperm, Cotyledon, Plumule",
      "Cotyledon, Radicle, Plumule",
      "Cotyledon, Plumule, Radicle"
    ],
    correct_option: "D",
    solution: "In the dicotyledonous embryo diagram: A represents the fleshy cotyledon, B represents the plumule (future shoot), and C represents the radicle (future root).",
    topic: "Seed - Structure of Dicotyledonous Seed",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q59"]
  },
  {
    question_number: 60,
    question_text: "Following floral diagram belongs to the family:",
    options: [
      "Brassicaceae",
      "Fabaceae",
      "Solanaceae",
      "Liliaceae"
    ],
    correct_option: "D",
    solution: "The given floral diagram shows trimerous symmetry, perianth in two whorls of 3+3 with epiphyllous stamens (3+3), and tricarpellary syncarpous trilocular ovary with axile placentation, which is characteristic of Liliaceae.",
    topic: "Families - Liliaceae",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q60"]
  },
  {
    question_number: 61,
    question_text: "Thorn in lemon tree is a modified",
    options: [
      "Leaf",
      "Axillary bud",
      "Flower",
      "Leaflet"
    ],
    correct_option: "B",
    solution: "In Citrus (lemon, orange), axillary buds of stems are modified into hard, woody, and pointed thorns.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "Leaf base pulvinate, vexillary aestivation of petals and non-endospermic seeds are characteristic features of",
    options: [
      "Fabaceae",
      "Solanaceae",
      "Liliaceae",
      "Brassicaceae"
    ],
    correct_option: "A",
    solution: "Family Fabaceae is characterized by leaves with pulvinate leaf base, vexillary (papilionaceous) aestivation of corolla, and non-endospermic seeds.",
    topic: "Families - Fabaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "What type of placentation is seen in family Liliaceae?",
    options: [
      "Axile",
      "Marginal",
      "Parietal",
      "Basal"
    ],
    correct_option: "A",
    solution: "In family Liliaceae, the ovary is tricarpellary, syncarpous, superior, trilocular with many ovules and axile placentation.",
    topic: "Families - Liliaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 64,
    question_text: "Phyllode is modified part to perform",
    options: [
      "Transportation of food",
      "Photosynthesis",
      "Storage of food",
      "Reproduction"
    ],
    correct_option: "B",
    solution: "A phyllode is a winged or flattened green petiole (as in Australian Acacia) that takes over the function of photosynthesis.",
    topic: "Leaf - Modifications of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 65,
    question_text: "Read the following statements:\n(A) Present in plants growing in swampy areas\n(B) Roots come out of the ground vertically upwards\n(C) Lenticels are present\n\nIdentify the type of root:",
    options: [
      "Prop root",
      "Pneumatophore",
      "Respiratory root",
      "Both (2) and (3)"
    ],
    correct_option: "D",
    solution: "In mangrove plants like Rhizophora growing in swampy areas, roots come out of the ground vertically upwards (pneumatophores or respiratory roots) with lenticels/pneumathodes to obtain oxygen for respiration.",
    topic: "Root - Modifications of Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "A single leaf arises at each node in",
    options: [
      "Guava",
      "Alstonia",
      "Sunflower",
      "Calotropis"
    ],
    correct_option: "C",
    solution: "In alternate phyllotaxy, a single leaf arises at each node in alternate manner, as seen in China rose, mustard, and sunflower.",
    topic: "Leaf - Phyllotaxy",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "Select the odd one w.r.t. modifications of leaf:",
    options: [
      "Spines in Aloe",
      "Phyllode of Acacia",
      "Phylloclade in Cactus",
      "Tendril in pea plant"
    ],
    correct_option: "C",
    solution: "Phylloclade in Cactus (Opuntia) is a modified photosynthetic stem. Spines in Aloe, phyllode of Acacia, and tendrils of pea are leaf modifications.",
    topic: "Leaf - Modifications of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 68,
    question_text: "Which of the following stem modifications mainly perform the function of photosynthesis?",
    options: [
      "Thorn",
      "Tendril",
      "Phylloclade",
      "Sucker"
    ],
    correct_option: "C",
    solution: "Phylloclades are flattened or cylindrical green succulent stems that have taken over the function of photosynthesis in arid regions, e.g., Opuntia and Euphorbia.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "Inferior ovary occurs in",
    options: [
      "Mustard flower",
      "Rose flower",
      "China rose flower",
      "Ray florets of sunflower"
    ],
    correct_option: "D",
    solution: "In epigynous flowers, the margin of the thalamus grows upwards enclosing the ovary completely and getting fused with it; the other parts arise above the ovary, so the ovary is inferior, as in ray florets of sunflower, guava, and cucumber.",
    topic: "Flower - Insertion of Floral Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 70,
    question_text: "Which of the following region of root is responsible for the growth of the root by adding new cells?",
    options: [
      "Region of maturation",
      "Region of meristematic activity",
      "Region of elongation",
      "Root cap"
    ],
    correct_option: "B",
    solution: "The cells of the region of meristematic activity are small, thin-walled, with dense protoplasm, and divide repeatedly, adding new cells to the root.",
    topic: "Root - Regions of the Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "Scutellum represents the",
    options: [
      "Cotyledon",
      "Endosperm",
      "Proteinaceous covering of endosperm",
      "Sheath enclosing the plumule"
    ],
    correct_option: "A",
    solution: "In monocotyledonous seeds (e.g., grasses, maize), the single large shield-shaped cotyledon situated towards one lateral side of the embryonal axis is called scutellum.",
    topic: "Seed - Structure of Monocotyledonous Seed",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 72,
    question_text: "When margin of petals and sepals overlap one another but not in a particular direction, the aestivation is called",
    options: [
      "Valvate",
      "Imbricate",
      "Twisted",
      "Vexillary"
    ],
    correct_option: "B",
    solution: "If the margins of sepals or petals overlap one another but not in any particular direction, as in Cassia and gulmohur, the aestivation is called imbricate.",
    topic: "Flower - Aestivation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "Select the incorrect match:",
    options: [
      "Apocarpous - Lotus",
      "Epiphyllous - Pea",
      "Epipetalous - Brinjal",
      "Syncarpous - Tomato"
    ],
    correct_option: "B",
    solution: "In Pea (Fabaceae), stamens are diadelphous and attached to the receptacle, not epiphyllous. Epiphyllous condition (stamens attached to perianth) occurs in Liliaceae (e.g., lily).",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "In basal placentation, the placenta",
    options: [
      "Is present in the axial position",
      "Develops at the base of the ovary",
      "Develops at the base of the thalamus",
      "Develops on the inner wall of ovary"
    ],
    correct_option: "B",
    solution: "In basal placentation, the placenta develops at the base of the ovary and a single ovule is attached to it, as in sunflower and marigold.",
    topic: "Flower - Placentation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 75,
    question_text: "Stamens are (9) + 1, represents",
    options: [
      "Didynamous condition",
      "Diadelphous condition",
      "Polyandrous condition",
      "Polyadelphous condition"
    ],
    correct_option: "B",
    solution: "The arrangement (9) + 1 signifies that the ten stamens are united into two bundles (diadelphous condition), which is typical of the family Fabaceae.",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 76,
    question_text: "Which of the following fruits develop from multicarpellary apocarpous gynoecium?",
    options: [
      "Simple fruit",
      "Multiple fruit",
      "Aggregate fruit",
      "Composite fruit"
    ],
    correct_option: "C",
    solution: "An aggregate fruit develops from a single flower having a multicarpellary, apocarpous gynoecium, forming an etaerio of fruitlets.",
    topic: "Fruit - Types of Fruits",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 77,
    question_text: "Read the following statements A and B and choose the correct option:\nA : Mango is a fleshy fruit.\nB : Pericarp in mango is differentiated into three distinct layers.",
    options: [
      "Both the statements A and B are incorrect",
      "Statement A is correct but B is incorrect",
      "Both the statements A and B are correct",
      "Statement A is incorrect and B is correct"
    ],
    correct_option: "C",
    solution: "Mango is a fleshy drupe where pericarp is well differentiated into an outer thin epicarp, a middle fleshy edible mesocarp, and an inner stony hard endocarp. Both statements are correct.",
    topic: "Fruit - Drupe",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 78,
    question_text: "At maturity, all of the given seeds are said to be endospermous, except",
    options: [
      "Maize",
      "Castor",
      "Groundnut",
      "Coconut"
    ],
    correct_option: "C",
    solution: "Groundnut (along with pea and gram) produces non-endospermic (exalbuminous) seeds where the endosperm is completely consumed by the developing embryo before seed maturation.",
    topic: "Seed - Types of Seeds",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "% ⚥ K(5) C1+2+(2) A(9)+1 G1 floral formula belongs to which of the following plants?",
    options: [
      "Petunia",
      "Gloriosa",
      "Aloe",
      "Sesbania"
    ],
    correct_option: "D",
    solution: "The given floral formula is characteristic of family Fabaceae. Sesbania is a member of Fabaceae (used as green manure/fodder).",
    topic: "Families - Fabaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "Select the odd statement w.r.t. parthenocarpic fruits:",
    options: [
      "Do not have seeds",
      "Are useless for fruit industry",
      "Are formed without fertilisation",
      "Economic value is lost in pomegranate by induced parthenocarpy"
    ],
    correct_option: "B",
    solution: "Parthenocarpic (seedless) fruits like bananas, grapes, and citrus are of great commercial value in the horticulture and fruit industry; hence stating they are useless is incorrect.",
    topic: "Fruit - Parthenocarpy",
    difficulty: "medium",
    question_type: "single_choice"
  }
];
