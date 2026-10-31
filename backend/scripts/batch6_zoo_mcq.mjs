import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch6Questions = [
  {
    question_number: 253,
    question_text: "Choose the statement that is incorrect for Central nervous system of cockroach.",
    options: [
      "In the head region, the brain is represented by supra-oesophageal ganglia which supply nerves to antennae and compound eyes.",
      "If the head of the cockroach is cut off, it will die immediately as the head holds a large part of the nervous system.",
      "The sub-oesophageal ganglion supplies nerves to labium, maxilla and mandibles.",
      "Double ventral nerve cord of cockroach contains three thoracic and six abdominal ganglia."
    ],
    correct_answer: "If the head of the cockroach is cut off, it will die immediately as the head holds a large part of the nervous system.",
    explanation: "If the head of a cockroach is cut off, it will still live for as long as one week because the head holds only a bit of the nervous system while the greater part is situated along the ventral (belly) part of its body.",
    difficulty: "medium",
    topic: "Nervous System of Cockroach"
  },
  {
    question_number: 254,
    question_text: "Periplaneta is a common household pest. Anatomical study shows that all of the following are correct w.r.t. its structure and functions except one. Select the incorrect one.",
    options: [
      "Ommatidia — Completely covered by iris and retinular pigmented sheath and form apposition image",
      "Corpora allata — Secretes 'juvenile hormone' that regulates growth and metamorphosis",
      "Tergosternal muscles — When they contract, air is expired out",
      "Mushroom gland — Secretes highly viscous fluid that forms oothecal case in females"
    ],
    correct_answer: "Mushroom gland — Secretes highly viscous fluid that forms oothecal case in females",
    explanation: "Mushroom gland (utricular gland) is an accessory reproductive gland present in male cockroach (segments 6-7), not in females. The oothecal case in females is secreted by the collaterial glands.",
    difficulty: "hard",
    topic: "Anatomy of Periplaneta"
  },
  {
    question_number: 255,
    question_text: "Following are four statements A to D. Choose the option which includes a set of correct statements.\nA. In Periplaneta, males bear a pair of short, thread-like anal styles which are absent in females.\nB. In both sexes of Periplaneta, the 10th segment bears a pair of jointed filamentous structures called anal cerci.\nC. In cockroach, mesothoracic wings (forewings) are transparent, membranous and are used in flight.\nD. In female cockroach, there is a pair of mushroom glands.",
    options: [
      "A and C",
      "B and C",
      "A and B",
      "C and D"
    ],
    correct_answer: "A and B",
    explanation: "Statements A and B are correct. Statement C is incorrect because forewings (tegmina) are opaque, dark, leathery and protective; hindwings are membranous and used in flight. Statement D is incorrect because mushroom gland is found in male cockroaches.",
    difficulty: "medium",
    topic: "Morphology and Anatomy of Periplaneta"
  },
  {
    question_number: 256,
    question_text: "The part of cockroach's eye which is comparable to the retina of vertebrate's eye is",
    options: [
      "Rhabdome",
      "Crystalline cone",
      "Corneal facet",
      "Pigmented sheath"
    ],
    correct_answer: "Rhabdome",
    explanation: "In each ommatidium of cockroach's compound eye, the rhabdome is a central photoreceptive rod-like structure formed by retinular cells, functionally analogous to the photoreceptor layer (retina) of the vertebrate eye.",
    difficulty: "medium",
    topic: "Sense Organs of Cockroach"
  },
  {
    question_number: 257,
    question_text: "The following diagram shows blood vascular system of cockroach with certain labelled parts a, b and c. Which of the following statements is/are incorrect regarding this system?\n\nA. The blood vascular system of cockroach is of open type with well developed blood vessels which open into empty space (haemocoel).\nB. The haemolymph is composed of colourless plasma and haemocytes.\nC. The labelled part 'a' represents anterior aorta emerging from first chamber of heart of cockroach.\nD. The labelled part 'b' are 12 in number.\nE. The labelled part 'c' represents chambers of heart bearing ostia on either side.",
    options: [
      "E only",
      "B and C",
      "A and D",
      "A and C"
    ],
    correct_answer: "A and D",
    explanation: "Statement A is incorrect because blood vessels are poorly developed in cockroach (open circulatory system). Statement D is incorrect because labelled part 'b' represents alary muscles which are 12 pairs (24 muscles), not 12 in number. Statements B, C, and E are correct.",
    image_url: diagrams.zoo_q257_circulatory,
    difficulty: "hard",
    topic: "Circulatory System of Cockroach"
  },
  {
    question_number: 271,
    question_text: "Which of the following modes of nitrogenous excretion is exhibited by cockroach?",
    options: [
      "Ammonotelic only",
      "Ureotelic only",
      "Uricotelic only",
      "Both ammonotelic and uricotelic"
    ],
    correct_answer: "Uricotelic only",
    explanation: "Cockroach is strictly uricotelic; nitrogenous wastes are extracted by Malpighian tubules from the haemolymph and converted into uric acid, which is excreted with the faeces.",
    difficulty: "easy",
    topic: "Excretion in Cockroach"
  },
  {
    question_number: 272,
    question_text: "Following is the diagram of mouth parts of cockroach. Select the correct parts that are used for biting and chewing/masticating food particles.",
    options: [
      "A and D",
      "B and C",
      "C and E",
      "D and E"
    ],
    correct_answer: "B and C",
    explanation: "In cockroach mouthparts, mandibles (represented by B and C) possess sharp incising and grinding teeth-like chitinous denticles used for crushing and masticating food particles.",
    image_url: diagrams.zoo_q272_mouthparts,
    difficulty: "medium",
    topic: "Mouthparts of Cockroach"
  },
  {
    question_number: 273,
    question_text: "In cockroach, which wings are transparent, membranous and are used in flight?",
    options: [
      "Forewings",
      "Tegmina",
      "Elytra",
      "Hindwings"
    ],
    correct_answer: "Hindwings",
    explanation: "The hindwings (metathoracic wings) are thin, transparent, membranous and are used in flight. Forewings (mesothoracic, tegmina or elytra) are dark, opaque, leathery and cover the hindwings at rest.",
    difficulty: "easy",
    topic: "Wings of Cockroach"
  },
  {
    question_number: 274,
    question_text: "Mark the correct statement w.r.t. circulation of blood in cockroach:",
    options: [
      "Haemolymph enters heart through anterior aorta",
      "All the spiracles are always open in cockroach",
      "Haemolymph enters heart through ostia and is pumped from posterior to anterior direction",
      "Haemolymph has major role in transportation of oxygen"
    ],
    correct_answer: "Haemolymph enters heart through ostia and is pumped from posterior to anterior direction",
    explanation: "Haemolymph from the pericardial sinus enters the 13 chambers of the heart through ostia provided with valves, and waves of contraction propel the blood forward (posterior to anterior direction) into the anterior aorta.",
    difficulty: "medium",
    topic: "Circulatory System of Cockroach"
  },
  {
    question_number: 275,
    question_text: "Which of the following structures is/are common in both male and female cockroaches?",
    options: [
      "Anal cerci and anal styles",
      "Anal styles and elytra",
      "Anal cerci and elytra",
      "Anal styles and mushroom glands"
    ],
    correct_answer: "Anal cerci and elytra",
    explanation: "Both male and female cockroaches possess a pair of jointed filamentous anal cerci on the 10th abdominal segment and elytra (mesothoracic forewings). Anal styles and mushroom glands are present exclusively in males.",
    difficulty: "easy",
    topic: "Sexual Dimorphism in Cockroach"
  },
  {
    question_number: 276,
    question_text: "The given diagram illustrates the female reproductive system of Periplaneta americana. Select the correct option w.r.t. labelling A and B and functions performed by them.",
    options: [
      "A - Conglobate gland: Covering of sperms, B - Spermatheca: Storage of sperms",
      "A - Phallomere: Covering around egg, B - Titillator: Opens spermatophore",
      "A - Vestibule: Fertilized egg chamber, B - Spermatophore: Storage of sperms",
      "A - Collaterial gland: Forms wall of ootheca, B - Spermatheca: Storage of sperms"
    ],
    correct_answer: "A - Collaterial gland: Forms wall of ootheca, B - Spermatheca: Storage of sperms",
    explanation: "Label A represents the branched collaterial glands that secrete the hard shell of the ootheca. Label B represents the asymmetrical pair of spermathecae that store spermatozoa received from the male during copulation.",
    image_url: diagrams.zoo_q276_repro,
    difficulty: "medium",
    topic: "Female Reproductive System of Cockroach"
  }
];
