import fs from 'fs';

const diagramsMap = JSON.parse(fs.readFileSync('scripts/morphology_diagrams_map.json', 'utf8'));

export const batch4Questions = [
  {
    question_number: 81,
    question_text: "Racemose inflorescence differs from cymose inflorescence as in the former",
    options: [
      "Limited growth of peduncle occurs",
      "Flowers are arranged in acropetal order",
      "Flowers are borne at the tip of main axis",
      "Both (1) and (3)"
    ],
    correct_option: "B",
    solution: "In racemose inflorescence, the main axis continues to grow indefinitely and flowers are borne laterally in acropetal succession (older flowers at the base, younger flowers towards the apex).",
    topic: "Inflorescence - Racemose",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "Mark the correct option w.r.t. Fabaceae family:",
    options: [
      "Trimerous flowers",
      "Legume fruit",
      "Monadelphous androecium",
      "Cruciform corolla"
    ],
    correct_option: "B",
    solution: "Fruit in family Fabaceae is typically a legume (pod), developing from a monocarpellary superior ovary.",
    topic: "Families - Fabaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 83,
    question_text: "In guava, the phyllotaxy is",
    options: [
      "Alternate",
      "Spiral",
      "Opposite",
      "Whorled"
    ],
    correct_option: "C",
    solution: "In guava (Psidium guajava) and Calotropis, a pair of leaves arise at each node and lie opposite to each other (opposite phyllotaxy).",
    topic: "Leaf - Phyllotaxy",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 84,
    question_text: "In which type of placentation, ovules develop on the central axis and septa are absent in the ovary",
    options: [
      "Basal",
      "Axile",
      "Marginal",
      "Free central"
    ],
    correct_option: "D",
    solution: "In free central placentation, ovules are borne on a central column or axis and septa are absent, as seen in Dianthus and Primrose.",
    topic: "Flower - Placentation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "Polyadelphous condition is present in",
    options: [
      "Citrus",
      "Pea",
      "China rose",
      "Bean"
    ],
    correct_option: "A",
    solution: "When stamens are united into more than two bundles or clusters, it is called polyadelphous condition, as seen in Citrus.",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "Select the odd one out w.r.t. stem modification:",
    options: [
      "Phylloclade",
      "Thorn",
      "Tuber",
      "Rachis"
    ],
    correct_option: "D",
    solution: "Phylloclade (Opuntia), Thorn (Citrus), and Tuber (Potato) are modified stems. Rachis represents the common axis of a pinnately compound leaf, hence a leaf part.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 87,
    question_text: "Which of the following is not a character of pneumatophores?",
    options: [
      "Negatively geotropic roots",
      "Gaseous exchange through pneumathodes",
      "Present in mangrove plants",
      "Short lived primary roots"
    ],
    correct_option: "D",
    solution: "Short-lived primary roots are a feature of monocotyledonous fibrous root systems, not of pneumatophores (respiratory roots of mangroves).",
    topic: "Root - Modifications of Root",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "Edible part of mango is A and this fruit is a B. Select the correct option to fill in the blanks A and B:",
    options: [
      "A - Mesocarp, B - Drupe",
      "A - Pericarp, B - Drupe",
      "A - Mesocarp, B - Berry",
      "A - Epicarp, B - Drupe"
    ],
    correct_option: "A",
    solution: "Mango is a drupe developing from a monocarpellary superior ovary. The middle fleshy, sweet, and edible layer is the mesocarp.",
    topic: "Fruit - Drupe",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "Find the correct match:",
    options: [
      "Bulb - Lily",
      "Rhizome - Amorphophallus",
      "Tuber - Banana",
      "Offset - Pineapple"
    ],
    correct_option: "A",
    solution: "Lily produces an underground bulb with fleshy scale leaves. Amorphophallus produces a corm, Banana propagates via suckers/rhizome, and Pineapple produces suckers.",
    topic: "Stem - Modifications of Stem",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 90,
    question_text: "Which of the following plants does not have placentation shown in the given diagram?",
    options: [
      "Chilli",
      "Onion",
      "Marigold",
      "Tulip"
    ],
    correct_option: "C",
    solution: "The diagram depicts axile placentation, which is present in Solanaceae (Chilli) and Liliaceae (Onion, Tulip). Marigold belongs to family Asteraceae and possesses basal placentation.",
    topic: "Flower - Placentation",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q119"]
  },
  {
    question_number: 91,
    question_text: "The region of root responsible for repeated cell division is",
    options: [
      "Region of maturation",
      "Region of elongation",
      "Region of meristematic activity",
      "Root cap"
    ],
    correct_option: "C",
    solution: "The cells of the apical meristematic zone are very small, thin-walled, with dense protoplasm, and actively divide repeatedly.",
    topic: "Root - Regions of the Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "Find correct statement w.r.t. stilt root:",
    options: [
      "Primary tap root modified to store food",
      "Found in swampy areas only",
      "Arises from lower nodes of stem to support main axis",
      "It is reproductive root"
    ],
    correct_option: "C",
    solution: "Stilt roots are supporting roots that arise from the lower nodes of the stem and penetrate obliquely into the soil, as seen in maize and sugarcane.",
    topic: "Root - Modifications of Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "Read the following statements and choose the option which is true w.r.t. fibrous root system:\nA. Found in both monocot and dicot plants\nB. Develop from base of the stem\nC. Is adventitious root\nD. It is primary root and long lived",
    options: [
      "A and B are correct",
      "A and D are incorrect",
      "B and D are correct",
      "B and C are incorrect"
    ],
    correct_option: "B",
    solution: "In monocots, the primary root is short-lived (not long-lived) and replaced by roots arising from the base of the stem (fibrous roots). They are characteristic of monocots, not dicots. Thus, A and D are incorrect.",
    topic: "Root - Root Systems",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "Select the odd one family w.r.t. reticulate venation of leaves:",
    options: [
      "Fabaceae",
      "Solanaceae",
      "Liliaceae",
      "Brassicaceae"
    ],
    correct_option: "C",
    solution: "Liliaceae is a monocot family showing parallel venation in its leaves, whereas Fabaceae, Solanaceae, and Brassicaceae are dicot families showing reticulate venation.",
    topic: "Leaf - Venation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "Choose incorrect match:",
    options: [
      "Stem tendril - Grapevine",
      "Tap root - Citrus",
      "Flattened phylloclade - Acacia",
      "Offset - Eichhornia"
    ],
    correct_option: "C",
    solution: "Acacia has a phyllode (modified petiole), while a flattened phylloclade is found in Opuntia.",
    topic: "Stem and Leaf Modifications",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 96,
    question_text: "In silk cotton trees",
    options: [
      "Leaflets are present on rachis",
      "Incision of lamina is absent",
      "Leaflets are attached at tip of petiole",
      "Bud is present in the axil of leaflets"
    ],
    correct_option: "C",
    solution: "Silk cotton (Bombax) has palmately compound leaves where the leaflets are attached to a common point at the tip of the petiole.",
    topic: "Leaf - Types of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 97,
    question_text: "Choose correct option w.r.t. given below inflorescence:",
    options: [
      "Main axis terminates in a flower",
      "Acropetal arrangement of flowers",
      "Unlimited growth of main axis",
      "Exemplified by mustard plant"
    ],
    correct_option: "A",
    solution: "The diagram illustrates a cymose inflorescence where the main axis terminates in a flower, thereby checking further terminal growth.",
    topic: "Inflorescence - Cymose",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q292"]
  },
  {
    question_number: 98,
    question_text: "Choose the incorrect match:",
    options: [
      "⊕ - Mustard",
      "C1+2+(2) - Pea",
      "P(3+3) - Lily",
      "C(5) - Lupin"
    ],
    correct_option: "D",
    solution: "Lupin belongs to family Fabaceae which has papilionaceous polypetalous corolla C1+2+(2), not gamopetalous C(5).",
    topic: "Families - Floral Characters",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 99,
    question_text: "Which one of the following is a correct statement?",
    options: [
      "In cymose type of inflorescence, the main axis continues to grow",
      "Ovary is half inferior in the flowers of cucumber",
      "In castor, the endosperm is not present in mature seeds",
      "The nucellus remains persistent in the seeds of black pepper"
    ],
    correct_option: "D",
    solution: "In some seeds such as black pepper and beet, remnants of nucellus are persistent; this residual, persistent nucellus is called perisperm.",
    topic: "Seed - Perisperm",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 100,
    question_text: "Consider the following statements and select appropriate option:\na. The region of maturation is distal to the elongation region.\nb. The leaflets are attached at a common point in silk cotton.\nc. China rose has axile type of placentation.\nd. The ploidy level of coleoptile is 3n.\ne. C1+2+(2) condition shows vexillary aestivation with equal sized petals.",
    options: [
      "b, c & e are correct",
      "a, b, c & e are correct",
      "a, d & e are incorrect",
      "a, c & d are incorrect"
    ],
    correct_option: "C",
    solution: "Statement a is incorrect (maturation region is proximal to elongation region); d is incorrect (coleoptile is embryonic shoot sheath, 2n); e is incorrect (vexillary petals are unequal: standard, wings, keels). Thus, a, d & e are incorrect.",
    topic: "Morphology of Flowering Plants - General Review",
    difficulty: "hard",
    question_type: "single_choice"
  },
  {
    question_number: 101,
    question_text: "Which of the following pairs is wrongly matched:\na. Alstonia - Whorled phyllotaxy\nb. Monstera - Tap roots\nc. Euphorbia - Cylindrical phylloclade\nd. Citrus - Spines",
    options: [
      "a & c",
      "b & d",
      "a & d",
      "b & c"
    ],
    correct_option: "B",
    solution: "Monstera has adventitious roots arising from stem nodes (not tap roots). Citrus bears stem thorns modified from axillary buds (spines are modified leaves). Thus, b & d are wrongly matched.",
    topic: "Morphology of Flowering Plants - Modifications",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 102,
    question_text: "Consider the given floral diagrams labelled a, b and c and select the correct option w.r.t. families to which these floral diagrams belong:",
    options: [
      "Families which show a and c have valvate aestivation for calyx and corolla in respective floral diagram",
      "Families which show a and b have epipetalous stamens",
      "Families which show b and c have valvate aestivation in petals",
      "Families which show a, b and c have axile placentation"
    ],
    correct_option: "C",
    solution: "In the diagrams: (a) is Fabaceae (vexillary corolla, marginal placentation), (b) is Solanaceae (valvate corolla, axile placentation), and (c) is Brassicaceae (valvate corolla, parietal placentation). Both Solanaceae and Brassicaceae exhibit valvate aestivation of petals.",
    topic: "Families - Floral Diagrams",
    difficulty: "hard",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q297"]
  },
  {
    question_number: 103,
    question_text: "Choose odd one out w.r.t. modified axillary bud:",
    options: [
      "Thorn",
      "Tendril",
      "Bulbil",
      "Spine"
    ],
    correct_option: "D",
    solution: "Thorns (Citrus), stem tendrils (gourds), and bulbils (Agave) develop from modified axillary buds. Spines (Opuntia, Aloe) are modified leaves or leaf parts.",
    topic: "Stem and Leaf Modifications",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 104,
    question_text: "Persistent fibrous root system arise from",
    options: [
      "Radicle",
      "Base of stem",
      "Leaf",
      "Stem internode"
    ],
    correct_option: "B",
    solution: "In monocots, the primary root is short-lived and replaced by a large number of fibrous roots that develop from the base of the stem.",
    topic: "Root - Root Systems",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 105,
    question_text: "Pneumatophores are helpful in",
    options: [
      "Transpiration",
      "Assimilation of food",
      "Guttation",
      "Getting oxygen"
    ],
    correct_option: "D",
    solution: "In plants growing in swampy/saline areas like Rhizophora, pneumatophores grow vertically upward out of waterlogged anoxic soil to obtain oxygen for root respiration.",
    topic: "Root - Modifications of Root",
    difficulty: "easy",
    question_type: "single_choice"
  }
];
