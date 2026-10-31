import fs from 'fs';

const diagramsMap = JSON.parse(fs.readFileSync('scripts/morphology_diagrams_map.json', 'utf8'));

export const batch2Questions = [
  {
    question_number: 25,
    question_text: "Examples of leaf with opposite phyllotaxy is",
    options: [
      "Calotropis and Guava",
      "Guava and Alstonia",
      "Calotropis and Nerium",
      "Nerium and Alstonia"
    ],
    correct_option: "A",
    solution: "In opposite phyllotaxy, a pair of leaves arise at each node and lie opposite to each other, as in Calotropis and Guava.",
    topic: "Leaf - Phyllotaxy",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 26,
    question_text: "In which among the following plants palmately compound leaf is present?",
    options: [
      "Maize",
      "Brassica",
      "Neem",
      "Silkcotton"
    ],
    correct_option: "D",
    solution: "In palmately compound leaves, the leaflets are attached at a common point, i.e., at the tip of the petiole, as in silk cotton (Bombax).",
    topic: "Leaf - Types of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "Flowers with radial symmetry is seen in",
    options: [
      "Gulmohur, Canna",
      "Mustard, chilli",
      "Datura, beans",
      "Pea, chilli"
    ],
    correct_option: "B",
    solution: "When a flower can be divided into two equal radial halves in any radial plane passing through the centre, it is actinomorphic (radial symmetry), e.g., mustard, Datura, chilli.",
    topic: "Flower - Symmetry",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "How many total types of aestivations of petals will be seen in following flowers?\n\nChina rose, Cotton, Lady's finger, Cassia, Gulmohur, Pea, Bean.",
    options: [
      "4",
      "3",
      "2",
      "1"
    ],
    correct_option: "B",
    solution: "China rose, cotton, lady's finger exhibit twisted aestivation (1); Cassia and gulmohur exhibit imbricate aestivation (2); Pea and bean exhibit vexillary aestivation (3). Thus, a total of 3 types of aestivation are observed.",
    topic: "Flower - Aestivation",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "Find the incorrect match from the following w.r.t. stamens:",
    options: [
      "Sterile stamen - Staminode",
      "Variation in length of filaments - Salvia",
      "Polyadelphous stamens - Pea",
      "Stamens free - Polyandrous"
    ],
    correct_option: "C",
    solution: "In pea, stamens are diadelphous (united into two bundles: (9)+1). Polyadelphous condition (stamens united into more than two bundles) is found in Citrus.",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "Find the odd one out with respect to gynoecium:",
    options: [
      "Apocarpous",
      "Bicarpellary",
      "Bilocular",
      "Gamosepalous"
    ],
    correct_option: "D",
    solution: "Gamosepalous describes union of sepals (calyx), whereas apocarpous, bicarpellary, and bilocular are terms describing the gynoecium.",
    topic: "Flower - Morphology Terms",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "Parietal placentation is found in _____ while free central is in _____",
    options: [
      "Mustard, Marigold",
      "Mustard and Dianthus",
      "Argemone and China rose",
      "Argemone and Pea"
    ],
    correct_option: "B",
    solution: "In parietal placentation (mustard, Argemone), ovules develop on the inner wall of the ovary. In free central placentation (Dianthus, Primrose), ovules are borne on central axis and septa are absent.",
    topic: "Flower - Placentation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "Find the correct match from the following:",
    options: [
      "Siliqua - Maize",
      "True fruit - Mango",
      "Composite fruit - Strawberry",
      "Pepo - Coconut"
    ],
    correct_option: "B",
    solution: "Mango develops solely from the monocarpellary superior ovary without participation of thalamus or other floral organs, making it a true fruit (drupe).",
    topic: "Fruit - Types of Fruits",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "What is not true for the members of family Liliaceae?",
    options: [
      "Fruits are capsule or berry",
      "Ovary is superior",
      "Flower is zygomorphic",
      "Seeds are endospermous"
    ],
    correct_option: "C",
    solution: "Flowers of Liliaceae are bisexual and actinomorphic (radial symmetry), not zygomorphic.",
    topic: "Families - Liliaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "Mark the incorrect match from the following:",
    options: [
      "Micropyle - Small pore above hilum for water absorption in seed",
      "Hilum - Scar on seed coat",
      "Aleurone layer - Proteinaceous layer",
      "Scutellum - Embryonic axis"
    ],
    correct_option: "D",
    solution: "Scutellum represents the large, shield-shaped single cotyledon in monocot seeds, not the embryonic axis.",
    topic: "Seed - Structure of Monocotyledonous Seed",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "Given organisms belong to how many families?\n\n[Solanum, Datura, Allium, Colchicum, Petunia, Indigofera, Sesbania]",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_option: "C",
    solution: "The given plants belong to three families: Solanaceae (Solanum, Datura, Petunia), Liliaceae (Allium, Colchicum), and Fabaceae (Indigofera, Sesbania).",
    topic: "Families of Angiosperms",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "Ashwagandha belongs to family",
    options: [
      "Fabaceae",
      "Solanaceae",
      "Liliaceae",
      "Brassicaceae"
    ],
    correct_option: "B",
    solution: "Ashwagandha (Withania somnifera) is an important medicinal plant belonging to the family Solanaceae.",
    topic: "Families - Solanaceae",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "In opposite phyllotaxy, the number of leaves at each node is",
    options: [
      "One",
      "Four",
      "Two",
      "Three"
    ],
    correct_option: "C",
    solution: "In opposite phyllotaxy, a pair (two) of leaves arise at each node and lie opposite to each other, e.g., Calotropis and Guava.",
    topic: "Leaf - Phyllotaxy",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "Stem tendrils are seen in",
    options: [
      "Watermelon",
      "Cucumber",
      "Citrus",
      "Both (1) & (2)"
    ],
    correct_option: "D",
    solution: "Stem tendrils are slender, spirally coiled structures that develop from axillary buds in plants like gourds (cucumber, pumpkin, watermelon) and grapevines.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "Axillary buds are modified into thorns in",
    options: [
      "Citrus, Opuntia",
      "Cucumber, Pumpkin",
      "Watermelon, Euphorbia",
      "Citrus, Bougainvillea"
    ],
    correct_option: "D",
    solution: "Axillary buds of stems modify into woody, straight, and pointed thorns in Citrus and Bougainvillea to protect them from grazing animals.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "In which of the following plants, root is not modified for support?",
    options: [
      "Sugarcane, maize",
      "Sweet potato, Carrot",
      "Radish, turnip",
      "Both (2) & (3)"
    ],
    correct_option: "D",
    solution: "Sugarcane and maize possess stilt roots for mechanical support. Sweet potato (adventitious root), carrot, radish, and turnip (tap roots) are modified for food storage, not support.",
    topic: "Root - Modifications of Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "Diadelphous stamens are present in",
    options: [
      "Brinjal",
      "Hibiscus",
      "Bean",
      "Mustard"
    ],
    correct_option: "C",
    solution: "In family Fabaceae (e.g., pea, bean), stamens are diadelphous with ten stamens grouped into two bundles: (9) + 1.",
    topic: "Flower - Androecium",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "A. Root cap\nB. Meristematic tissue\nC. Maturation region\nD. Region of elongation\n\nWhich one of the following sequence of the root regions is represented in correct order?",
    options: [
      "D -> C -> B -> A",
      "A -> B -> D -> C",
      "C -> B -> D -> A",
      "A -> B -> C -> D"
    ],
    correct_option: "B",
    solution: "From apex towards the base, the sequence of regions in a root is: Root cap (A) -> Region of meristematic activity (B) -> Region of elongation (D) -> Region of maturation (C).",
    topic: "Root - Regions of the Root",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "All are edible stems, except",
    options: [
      "Potato",
      "Colocasia",
      "Sweet potato",
      "Ginger"
    ],
    correct_option: "C",
    solution: "Potato (tuber), Colocasia (corm), and Ginger (rhizome) are underground modified edible stems. Sweet potato is a modified adventitious root.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "Leaves in Mango are",
    options: [
      "Simple with parallel venation",
      "Simple with reticulate venation",
      "Compound with parallel venation",
      "Compound with reticulate venation"
    ],
    correct_option: "B",
    solution: "Mango is a dicotyledonous plant bearing simple leaves with reticulate venation.",
    topic: "Leaf - Types and Venation",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "In Australian Acacia, phyllodes are modified",
    options: [
      "Lamina",
      "Petiole",
      "Axillary bud",
      "Entire leaf"
    ],
    correct_option: "B",
    solution: "In Australian Acacia, the petiole expands, becomes green, and takes over the function of photosynthesis (phyllode) because leaves are small and short-lived.",
    topic: "Leaf - Modifications of Leaves",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "Match the columns and choose the correct option with respect to flower types and their examples:",
    options: [
      "a(i), b(ii), d(iv)",
      "b(ii), c(iii), d(iv)",
      "a(i), c(ii), d(iii)",
      "b(i), c(ii), d(iii)"
    ],
    correct_option: "C",
    solution: "Diagram (a) represents hypogynous flower (China rose, i); (b) and (c) represent perigynous flowers (Rose, ii; Peach, iv); (d) represents epigynous flower (Bittergourd, iii). Thus, a(i), c(ii), d(iii) is the correct match.",
    topic: "Flower - Insertion of Floral Leaves",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q46_table"]
  },
  {
    question_number: 47,
    question_text: "Both mustard and china rose have",
    options: [
      "Axile placentation",
      "Hypogynous flowers",
      "Racemose inflorescence",
      "Twisted aestivation of petals"
    ],
    correct_option: "B",
    solution: "Both mustard (Brassicaceae) and China rose (Malvaceae) have hypogynous flowers with superior ovary.",
    topic: "Flower - Insertion of Floral Leaves",
    difficulty: "medium",
    question_type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "Edible part of coconut is",
    options: [
      "Mesocarp",
      "Endosperm",
      "Seed",
      "Both (2) and (3)"
    ],
    correct_option: "D",
    solution: "In coconut (a drupe), the edible part is the cellular and liquid endosperm, which is an integral part of the seed. Hence, both endosperm and seed are correct.",
    topic: "Fruit - Drupe",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "Find correct match w.r.t. modification of stem:",
    options: [
      "Rhizome - Ginger",
      "Corm - Turmeric",
      "Bulb - Colocasia",
      "Bulbil - Onion"
    ],
    correct_option: "A",
    solution: "Ginger is an underground modified stem known as a rhizome. Turmeric is also a rhizome, Colocasia is a corm, and Onion is a bulb.",
    topic: "Stem - Modifications of Stem",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "What are the ploidy of A, B, C, D in given diagram of maize seed?",
    options: [
      "A - 2n, B - 3n, C - 2n, D - 2n",
      "A - 3n, B - 3n, C - 2n, D - 2n",
      "A - 3n, B - 2n, C - 2n, D - n",
      "A - 2n, B - 3n, C - 2n, D - n"
    ],
    correct_option: "B",
    solution: "In maize seed: A is endosperm (3n, triploid), B is aleurone layer (outer layer of endosperm, hence 3n), C is scutellum (embryonic cotyledon, 2n), and D is coleoptile/plumule (embryo, 2n).",
    topic: "Seed - Structure of Monocotyledonous Seed",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q50"]
  },
  {
    question_number: 51,
    question_text: "Stilt roots are found in",
    options: [
      "Sugarcane and maize",
      "Ficus and sugarcane",
      "Sweet potato and Dahlia",
      "Ficus and sweet potato"
    ],
    correct_option: "A",
    solution: "Stilt roots arise from the lower nodes of the stem to give mechanical support in plants like sugarcane and maize.",
    topic: "Root - Modifications of Root",
    difficulty: "easy",
    question_type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "Match the columns and choose the correct option:",
    options: [
      "a -> (i), b -> (ii), c -> (iii), d -> (iv)",
      "a -> (iv), b -> (iii), c -> (ii), d -> (i)",
      "a -> (ii), b -> (iv), c -> (i), d -> (iii)",
      "a -> (i), b -> (iii), c -> (iv), d -> (ii)"
    ],
    correct_option: "A",
    solution: "In column I: (a) Valvate aestivation is found in Calotropis (i); (b) Twisted aestivation is found in Hibiscus (ii); (c) Imbricate aestivation is found in Cassia (iii); (d) Vexillary aestivation is found in Pea (iv).",
    topic: "Flower - Aestivation",
    difficulty: "medium",
    question_type: "single_choice",
    image_url: diagramsMap["diagram_q52_table"]
  }
];
