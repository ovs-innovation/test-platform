import fs from 'fs';

const diagramsMap = JSON.parse(fs.readFileSync('scripts/morphology_diagrams_map.json', 'utf8'));

export const batch1Questions = [
  {
    question_number: 1,
    question_text: "Select the incorrect statement with respect to root cap",
    options: [
      "The apex of the root is covered by a thimble like structure called root cap.",
      "It is multicellular structure formed by collenchyma cells",
      "It protects the tender apex of root by secreting slimy substance",
      "Root cap is present near to region of meristematic activity."
    ],
    correct_option: "B",
    solution: "The root cap is a multicellular structure composed of parenchymatous cells (not collenchyma cells). It covers and protects the tender apex of the root.",
    topic: "Root - Regions of the Root",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "Match the following columns and select the correct option:\n\nColumn I:\nA. Thorn\nB. Offset\nC. Sucker\nD. Stolon\n\nColumn II:\n(i) Jasmine\n(ii) Banana\n(iii) Pistia\n(iv) Citrus",
    options: [
      "A(iv), B(iii), C(ii), D(i)",
      "A(iv), B(iii), C(i), D(ii)",
      "A(iv), B(ii), C(iii), D(i)",
      "A(iv), B(i), C(ii), D(iii)"
    ],
    correct_option: "A",
    solution: "Thorn is found in Citrus (A-iv), offset is found in Pistia (B-iii), sucker is found in Banana (C-ii), and stolon is found in Jasmine (D-i).",
    topic: "Stem - Modifications of Stem",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "Stem is reduced to disc shaped and the bud is surrounded by many concentric fleshy scaly leaves. This feature is found in",
    options: [
      "Lily",
      "Ginger",
      "Colocasia",
      "Zaminkand"
    ],
    correct_option: "A",
    solution: "In a bulb (found in onion, garlic, lily), the stem is highly reduced and disc-shaped, and the terminal bud is surrounded by concentric fleshy and tunic/scaly leaf bases.",
    topic: "Stem - Underground Modifications",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "Leaves in how many of the following species have reticulate and parallel type of venation respectively?\n\n[Peepal, Mango, Pea, Banana, Aloe, Palm, China rose]",
    options: [
      "4 and 3",
      "3 and 4",
      "5 and 2",
      "2 and 5"
    ],
    correct_option: "A",
    solution: "Dicot leaves show reticulate venation: Peepal, Mango, Pea, China rose (4 species). Monocot leaves show parallel venation: Banana, Aloe, Palm (3 species). Hence, 4 and 3 respectively.",
    topic: "Leaf - Venation",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "The type of inflorescence depicted in the diagram is _____ found in _____ and flowers are arranged in _____ order",
    options: [
      "Racemose, Mustard and Acropetal",
      "Cymose, Begonia and Basipetal",
      "Corymb, Solanum and Basipetal",
      "Corymb, Bougainvillea and acropetal"
    ],
    correct_option: "B",
    solution: "In a cymose inflorescence (e.g., Begonia, Dianthus), the main axis terminates in a flower, hence growth is limited, and lateral branches develop flowers in basipetal / centrifugal order.",
    topic: "Inflorescence - Cymose",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q5"]
  },
  {
    question_number: 6,
    question_text: "When the margin of one petal or sepal overlaps the margin of the adjacent successive petal or sepal the condition is found in _____ and called _____ aestivation",
    options: [
      "Cotton, imbricate",
      "Lady's finger, valvate",
      "China rose, twisted",
      "Pea, vexillary"
    ],
    correct_option: "C",
    solution: "In twisted aestivation, one margin of the appendage overlaps that of the next one and so on, as seen in China rose, lady's finger and cotton.",
    topic: "Flower - Aestivation",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "Female reproductive part occupies the highest position in _____ types of flower and is found in _____",
    options: [
      "Perigynous, plum",
      "Epigynous, Cucurbita",
      "Hypogynous, brinjal",
      "Epigynous, rose"
    ],
    correct_option: "C",
    solution: "In hypogynous flowers, gynoecium occupies the highest position while the other floral parts are situated below it. The ovary in such flowers is superior, e.g., mustard, china rose and brinjal.",
    topic: "Flower - Insertion of Floral Leaves",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "Syncarpous condition is seen in",
    options: [
      "Tomato, Rose",
      "Mustard, Tomato",
      "Rose, Lotus",
      "Lotus, Mustard"
    ],
    correct_option: "B",
    solution: "When carpels are fused together, the condition is syncarpous, as in mustard and tomato. When carpels are free, it is apocarpous, as in lotus and rose.",
    topic: "Flower - Gynoecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "Coleoptile and coleorhiza are found in seeds of",
    options: [
      "Maize, rice and wheat",
      "Mustard, castor and wheat",
      "Wheat, oat and maize",
      "Both (1) and (3)"
    ],
    correct_option: "D",
    solution: "Coleoptile (covering the plumule) and coleorhiza (covering the radicle) are protective sheaths found in monocotyledonous seeds like maize, rice, wheat, and oat.",
    topic: "Seed - Structure of Monocotyledonous Seed",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "Which of the following characteristics are associated with Brassicaceae family?\na. Pentamerous flower\nb. Cruciform corolla\nc. Tetradynamous stamens\nd. Replum\ne. Axile placentation",
    options: [
      "a, b, c, e",
      "b, c, d",
      "a, c, d, e",
      "b, c, d, e"
    ],
    correct_option: "B",
    solution: "Brassicaceae is characterized by tetramerous flowers (not pentamerous), cruciform corolla (b), tetradynamous stamens (c), parietal placentation with a false septum called replum (d). Placentation is parietal, not axile.",
    topic: "Families - Brassicaceae",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "Tegmen is the (i) layer of seed coat and develops from (ii) of ovule. Select the correct option to fill in the blanks (i) and (ii) respectively.",
    options: [
      "Outer and funiculus",
      "Inner and chalaza",
      "Inner and inner integument",
      "Outer and outer integument"
    ],
    correct_option: "C",
    solution: "The seed coat has two layers: the outer testa (derived from outer integument) and the inner tegmen (derived from inner integument).",
    topic: "Seed - Structure of Dicotyledonous Seed",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "Oil reserve of castor seed is present in",
    options: [
      "Embryo",
      "Endosperm",
      "Cotyledon",
      "Perisperm"
    ],
    correct_option: "B",
    solution: "Castor is an endospermic (albuminous) seed in which food reserves, predominantly oil, are stored in the massive endosperm.",
    topic: "Seed - Types of Seeds",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "Lodicules are a type of _____ and found in the flower of _____",
    options: [
      "Perianth; Lily",
      "Perianth; Wheat",
      "Bract; Lily",
      "Bract; Allium"
    ],
    correct_option: "B",
    solution: "In flowers of the grass family (Poaceae), such as wheat, the perianth is represented by two small membranous scale-like structures called lodicules.",
    topic: "Flower - Perianth",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "Find the incorrect match from the following:",
    options: [
      "% ⚥ K(5) C1+2+(2) A(9)+1 G1 -> Indigofera",
      "⊕ ⚥ K(5) C(5) A5 G(2) -> Tomato",
      "% ⚥ K(5) C(5) A5 G(2) -> Belladonna",
      "⊕ ⚥ P(3+3) A3+3 G(3) -> Allium"
    ],
    correct_option: "C",
    solution: "Belladonna belongs to Solanaceae, whose flowers are actinomorphic (⊕), not zygomorphic (%). Hence, option C is incorrectly matched.",
    topic: "Description of Some Important Families",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "Find the correct match:",
    options: [
      "Stipule - swollen leaf base",
      "Cymose inflorescence - unlimited growth",
      "Perigynous flower - half inferior ovary",
      "Epiphyllous - stamens attached to petals"
    ],
    correct_option: "C",
    solution: "In perigynous flowers (plum, rose, peach), the gynoecium is situated in the centre and other parts are located on the rim of the thalamus at the same level, making the ovary half-inferior.",
    topic: "Flower - Insertion of Floral Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "The scar on the seed coat through which the developing seeds were attached to the fruit is",
    options: [
      "Testa",
      "Micropyle",
      "Tegmen",
      "Hilum"
    ],
    correct_option: "D",
    solution: "The hilum is a scar on the seed coat through which the developing seed was attached to the fruit wall via the funicle.",
    topic: "Seed - Structure of Seed",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "Which of the following structures develop from axillary buds of stems?",
    options: [
      "Stem Tendrils",
      "Thorns",
      "Phylloclade",
      "Both (1) and (2)"
    ],
    correct_option: "D",
    solution: "Axillary buds of stems may become modified into slender and spirally coiled stem tendrils (e.g., in gourds) or woody, straight, and pointed thorns (e.g., in Citrus, Bougainvillea).",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "In which of the following plants, the petioles synthesize food?",
    options: [
      "Pitcher plant",
      "Australian Acacia",
      "Onion",
      "Cactus"
    ],
    correct_option: "B",
    solution: "In Australian Acacia, leaves are small and short-lived. The petioles in these plants expand, become green, and synthesize food (phyllodes).",
    topic: "Leaf - Modifications of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "In sunflower and wheat, placentation is",
    options: [
      "Marginal",
      "Parietal",
      "Basal",
      "Axile"
    ],
    correct_option: "C",
    solution: "In basal placentation, the placenta develops at the base of the ovary and a single ovule is attached to it, as seen in sunflower and marigold, as well as wheat.",
    topic: "Flower - Placentation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "Which of the following is not a feature of Solanaceae?",
    options: [
      "Stem is branched",
      "Leaves are simple",
      "Flower is zygomorphic",
      "Fruit type is berry"
    ],
    correct_option: "C",
    solution: "Flowers of Solanaceae are actinomorphic (radially symmetrical), bisexual, pentamerous, and hypogynous. They are not zygomorphic.",
    topic: "Families - Solanaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "Find the incorrect match from the following:",
    options: [
      "Thorn - Citrus - Axillary bud",
      "Tendril - Pea - Leaf",
      "Tendril - Grapevine - Leaf",
      "Thorn - Bougainvillea - Axillary bud"
    ],
    correct_option: "C",
    solution: "Stem tendrils in grapevine are modified stem structures (developing from terminal/axillary buds), whereas in peas, tendrils are modified leaves.",
    topic: "Stem and Leaf Modifications",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "In mint and jasmine the sub-aerial slender lateral branch of stem arise from the base of the main axis is called",
    options: [
      "Runner",
      "Stolon",
      "Sucker",
      "Offset"
    ],
    correct_option: "B",
    solution: "In mint and jasmine, a slender lateral branch arises from the base of the main axis and after growing aerially for some time arches downwards to touch the ground (stolon).",
    topic: "Stem - Sub-aerial Modifications",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "Suckers are found in",
    options: [
      "Banana, Pistia and Eichhornia",
      "Chrysanthemum, Pineapple and Banana",
      "Citrus, Pistia and Eichhornia",
      "Chrysanthemum, Banana and Pistia"
    ],
    correct_option: "B",
    solution: "Suckers arise from the underground basal part of the stem, grow horizontally beneath the soil, and then emerge obliquely upward, giving rise to leafy shoots as in Chrysanthemum, Pineapple, and Banana.",
    topic: "Stem - Sub-aerial Modifications",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "Epipetalous and epiphyllous condition of stamens are seen respectively in",
    options: [
      "Brinjal ; Lily",
      "Pea ; Brinjal",
      "Lily ; Brinjal",
      "Citrus ; Brinjal"
    ],
    correct_option: "A",
    solution: "Stamens attached to petals (epipetalous) occur in brinjal (Solanaceae), while stamens attached to perianth/tepals (epiphyllous) occur in lily (Liliaceae).",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  }
];
