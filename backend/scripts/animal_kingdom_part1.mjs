import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let diagramUrls = {};
try {
  const jsonPath = path.resolve(__dirname, './animal_kingdom_diagram_urls.json');
  if (fs.existsSync(jsonPath)) {
    diagramUrls = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not load diagram URLs:', e.message);
}

export const PART1_QUESTIONS = [
  // Page 382: Q1 - Q10
  {
    q_num: 1,
    question_text: "Which of the following is not a fundamental feature of Phylum Chordata?",
    options: [
      "Dorsal hollow nerve cord",
      "Heart is dorsal",
      "Post anal tail is present",
      "Lateral pharyngeal gill slits"
    ],
    correct_index: 1,
    solution: "The fundamental features of Phylum Chordata are: (i) a dorsal hollow nerve cord, (ii) a notochord, (iii) paired pharyngeal gill slits, and (iv) a post-anal tail. The heart in chordates is ventral (not dorsal; non-chordates have a dorsal heart if present).",
    image_url: ""
  },
  {
    q_num: 2,
    question_text: "Retrogressive metamorphosis does not occur in",
    options: [
      "Salpa",
      "Doliolum",
      "Ascidia",
      "Branchiostoma"
    ],
    correct_index: 3,
    solution: "Retrogressive metamorphosis is characteristic of Urochordata (Tunicata) such as Ascidia, Salpa, and Doliolum, where the advanced free-swimming larva possessing a notochord and dorsal nerve cord metamorphoses into a degenerate, sessile adult. In Branchiostoma (Cephalochordata), progressive development occurs and the notochord persists throughout life.",
    image_url: ""
  },
  {
    q_num: 3,
    question_text: "Which of the following is a correct feature of sub-phylum Cephalochordata?",
    options: [
      "Notochord is present in the larval form only",
      "Open type circulatory system is present",
      "Excretion is by protonephridia with solenocytes",
      "Development is direct without any larval stage"
    ],
    correct_index: 2,
    solution: "In Cephalochordata (e.g., Branchiostoma / Amphioxus), excretory organs are protonephridia with solenocytes. Notochord extends from head to tail and persists throughout life, the circulatory system is closed (without a heart), and development is indirect with a free-swimming larva.",
    image_url: ""
  },
  {
    q_num: 4,
    question_text: "Which of the following statements is incorrect about Petromyzon?",
    options: [
      "Cartilaginous vertebral column",
      "Stomach is absent",
      "Catadromous migration",
      "Circulation is closed type"
    ],
    correct_index: 2,
    solution: "Petromyzon (Lamprey) exhibits anadromous migration (migrates from marine water into freshwater rivers to spawn), after which adult lampreys die. Ammocoete larvae return to the ocean after metamorphosis. Catadromous migration is migration from freshwater to sea (as in Anguilla).",
    image_url: ""
  },
  {
    q_num: 5,
    question_text: "Select the incorrect option about members of class Chondrichthyes.",
    options: [
      "Notochord is persistent throughout life",
      "Cartilaginous endoskeleton",
      "Presence of well-developed air bladder",
      "Teeth are modified placoid scales"
    ],
    correct_index: 2,
    solution: "In Chondrichthyes (cartilaginous fishes), air bladder is absent; due to this, they have to swim constantly to avoid sinking. Teeth are modified placoid scales backwardly directed, endoskeleton is cartilaginous, and notochord is persistent throughout life.",
    image_url: ""
  },
  {
    q_num: 6,
    question_text: "Which of the following characters of Crocodilus is similar to mammals?",
    options: [
      "Three chambered heart",
      "Absence of urinary bladder",
      "Thecodont dentition",
      "Poikilothermy"
    ],
    correct_index: 2,
    solution: "Crocodiles possess thecodont dentition (teeth embedded in sockets of jaw bones), which is also a characteristic feature of mammals. Crocodiles also uniquely possess a four-chambered heart among reptiles.",
    image_url: ""
  },
  {
    q_num: 7,
    question_text: "Which of the following is a correct matching pair?",
    options: [
      "Metatheria - Oviparous",
      "Prototheria - Vagina and uterus are absent",
      "Eutheria - Presence of rudimentary corpus callosum",
      "Prototheria - Presence of scrotum"
    ],
    correct_index: 1,
    solution: "Prototheria (monotremes like Ornithorhynchus) are primitive oviparous mammals that have a cloaca; true vagina and uterus are absent, testes are abdominal (no scrotum), and corpus callosum is absent. Metatherians are viviparous with marsupium.",
    image_url: ""
  },
  {
    q_num: 8,
    question_text: "Which of the following is not a unique characteristic of mammals?",
    options: [
      "Presence of corpus callosum",
      "Seven cervical vertebrae",
      "Muscular diaphragm and hairy skin",
      "Homeothermy"
    ],
    correct_index: 3,
    solution: "Homeothermy (warm-blooded nature / endothermy) is shared between both Aves (birds) and Mammals, so it is not unique to mammals. Corpus callosum, 7 cervical vertebrae (in most mammals), muscular diaphragm, and hairs are unique mammalian characteristics.",
    image_url: ""
  },
  {
    q_num: 9,
    question_text: "Fill in the blanks and choose the correct option:\n_____ is an additional chamber in the digestive system of Columba and secretes _____ for nourishment of young ones respectively.",
    options: [
      "Gizzard, Sebum",
      "Crop, milky fluid",
      "Caecum, milky fluid",
      "Crop, semen"
    ],
    correct_index: 1,
    solution: "Crop is an additional chamber of the alimentary canal in birds like Columba (pigeon) that stores food and secretes 'crop milk' (a nutritious milky fluid formed by desquamation of epithelial cells) to nourish nestlings.",
    image_url: ""
  },
  {
    q_num: 10,
    question_text: "Which of the following is not a flight adaptation in Aves?",
    options: [
      "Pneumatic bones",
      "Additional air sacs for supplementary respiration",
      "Streamlined body",
      "Paired ovary"
    ],
    correct_index: 3,
    solution: "In female birds, usually only the left ovary and left oviduct are functional, and the right ovary is atrophied/absent to reduce body weight for flight. Presence of paired ovaries is not a flight adaptation.",
    image_url: ""
  },

  // Page 383: Q11 - Q24
  {
    q_num: 11,
    question_text: "Which of the following features is not present in Scoliodon?",
    options: [
      "Ampulla of Lorenzini",
      "Heterocercal tail fin",
      "Mermaid's purse",
      "Swim bladder"
    ],
    correct_index: 3,
    solution: "Scoliodon (dogfish) belongs to Class Chondrichthyes. Cartilaginous fishes lack an air bladder (swim bladder); consequently, they must swim continuously to maintain buoyancy.",
    image_url: ""
  },
  {
    q_num: 12,
    question_text: "Which of the following is false for Reptilia?",
    options: [
      "Metanephric kidney",
      "12 pairs of cranial nerves",
      "Monocondylic skull",
      "Heterodont type of teeth"
    ],
    correct_index: 3,
    solution: "Reptiles generally possess homodont dentition (teeth are all similar in shape and size), not heterodont. They have a monocondylic skull, 12 pairs of cranial nerves, and metanephric kidneys.",
    image_url: ""
  },
  {
    q_num: 13,
    question_text: "Which of the following is a correct matching of animals and their characters?",
    options: [
      "Chameleon - Viviparous, homeothermic organism",
      "Salamandra - Monocondylic, viviparous organism",
      "Pteropus - Flightless, warm blooded organism",
      "Aptenodytes - Flightless bird and lay eggs on ice"
    ],
    correct_index: 3,
    solution: "Aptenodytes (Penguin) is an antarctic flightless bird adapted for swimming and lays eggs on ice. Chameleon is poikilothermic and mostly oviparous; Salamandra has a dicondylic skull; Pteropus (flying fox) is a flying mammal.",
    image_url: ""
  },
  {
    q_num: 14,
    question_text: "Which of the following set of animals belongs to the same Class?",
    options: [
      "Pristis, Torpedo, Chimaera",
      "Carcharodon, Scoliodon, Pterophyllum",
      "Chameleon, Calotes, Salamandra",
      "Apteryx, Delphinus, Pteropus"
    ],
    correct_index: 0,
    solution: "Pristis (sawfish), Torpedo (electric ray), and Chimaera (ghost shark/rat fish) all belong to Class Chondrichthyes (cartilaginous fishes). Pterophyllum is an osteichthyan, Salamandra is an amphibian, and Apteryx is an avian.",
    image_url: ""
  },
  {
    q_num: 15,
    question_text: "Which of the following group of mammals show intra-abdominal testes?",
    options: [
      "Equus, Rattus, Felis",
      "Pteropus, Camelus, Elephas",
      "Elephas, Delphinus, Ornithorhynchus",
      "Elephas, Delphinus, Macropus"
    ],
    correct_index: 2,
    solution: "Elephas (elephant), Delphinus (marine cetaceans/dolphins/whales), and Ornithorhynchus (monotremes) retain intra-abdominal testes throughout life without scrotum.",
    image_url: ""
  },
  {
    q_num: 16,
    question_text: "Snakes and lizard shed their scales as skin cast. It is",
    options: [
      "Dermis",
      "Epidermis and dermis",
      "Cornified cells",
      "Stratum germinativum"
    ],
    correct_index: 2,
    solution: "The skin cast (ecdysis) shed periodically by snakes and lizards consists of dead, heavily keratinized, cornified epidermal cells (stratum corneum).",
    image_url: ""
  },
  {
    q_num: 17,
    question_text: "Fill in the blanks and choose the correct option:\n______ arch persists and ______ portal system is vestigial in Aves.",
    options: [
      "Left systemic, Renal",
      "Left pulmonary, Hepatic",
      "Right systemic, Renal",
      "Right pulmonary, Hepatic"
    ],
    correct_index: 2,
    solution: "In birds (Aves), only the right systemic arch persists in adults (in mammals, only left persists), and the renal portal system is poorly developed / vestigial.",
    image_url: ""
  },
  {
    q_num: 18,
    question_text: "Which of the following matching is correct?\nFeature | Amphibia | Reptilia | Mammalia\n(1) RBC: Oval, nucleated | Oval, nucleated | Oval, enucleated\n(2) Mode of parity: Oviparous | Mostly Oviparous | Mostly Viviparous\n(3) Heart: 3-chambered | 3-chambered | 3-chambered\n(4) Scales: Absent | Absent | Absent",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "Mode of parity is correctly matched: Amphibians are oviparous, Reptiles are mostly oviparous, and Mammals are mostly viviparous (with prototherians being oviparous). Mammalian RBCs are circular biconcave (except camel/llama) and heart in mammals is 4-chambered.",
    image_url: ""
  },
  {
    q_num: 19,
    question_text: "Which of the following is a living fossil?",
    options: [
      "Hydrophis",
      "Archaeopteryx",
      "Sphenodon",
      "Bungarus"
    ],
    correct_index: 2,
    solution: "Sphenodon punctatus (Tuatara of New Zealand) is a living fossil of order Rhynchocephalia that has survived unchanged since the Mesozoic era.",
    image_url: ""
  },
  {
    q_num: 20,
    question_text: "Which of the following organisms shows bioluminescence?",
    options: [
      "Herdmania",
      "Pyrosoma",
      "Branchiostoma",
      "Doliolum"
    ],
    correct_index: 1,
    solution: "Pyrosoma is a colonial pelagic tunicate (Urochordata) that exhibits intense, brilliant bioluminescence in seawater.",
    image_url: ""
  },
  {
    q_num: 21,
    question_text: "Uropygial gland is absent in all of the following birds, except",
    options: [
      "Struthio",
      "Apteryx",
      "Rhea",
      "Dromaius"
    ],
    correct_index: 1,
    solution: "Most flightless running birds (ratites like Struthio, Rhea, Dromaius/Emu) lack the uropygial (preen/oil) gland, but Apteryx (Kiwi) possesses a well-developed uropygial gland.",
    image_url: ""
  },
  {
    q_num: 22,
    question_text: "Which of the following characters is found in mammals only?",
    options: [
      "Bipedal locomotion",
      "Corpus callosum in cerebral hemisphere",
      "Semicircular canal in ear",
      "Fertilization is internal"
    ],
    correct_index: 1,
    solution: "Corpus callosum (a thick band of nerve fibers connecting the two cerebral hemispheres) is an exclusive, defining feature found only in placental mammals.",
    image_url: ""
  },
  {
    q_num: 23,
    question_text: "Which of the following characteristics of mammal have no exception?",
    options: [
      "7 cervical vertebrae",
      "Presence of pinna",
      "Diaphragm is present",
      "Corpus callosum is present"
    ],
    correct_index: 2,
    solution: "A muscular diaphragm separating thoracic cavity from abdominal cavity is present in all mammals without exception. Sloths and manatees have 6-9 cervical vertebrae; monotremes and aquatic mammals lack pinnae; monotremes lack corpus callosum.",
    image_url: ""
  },
  {
    q_num: 24,
    question_text: "Which of the following are earliest known vertebrates to appear in fossil record?",
    options: [
      "Cyclostomes",
      "Urochordates",
      "Chondrichthyes",
      "Ostracoderms"
    ],
    correct_index: 3,
    solution: "Ostracoderms (extinct, jawless, armored fish-like forms of the Ordovician and Silurian periods) are the earliest known vertebrates in the fossil record.",
    image_url: ""
  },

  // Page 384: Q25 - Q36
  {
    q_num: 25,
    question_text: "Which of the following pairs of animals have non-glandular skin?",
    options: [
      "Snake and Frog",
      "Chameleon and Turtle",
      "Frog and Pigeon",
      "Crocodile and Tiger"
    ],
    correct_index: 1,
    solution: "Reptiles such as Chameleon and Turtle have dry, cornified, non-glandular skin covered with epidermal scales or scutes. Amphibians and mammals possess glandular skin.",
    image_url: ""
  },
  {
    q_num: 26,
    question_text: "Read the following characters:\nMarine, Mouth is terminal, Placoid Scales, Cartilaginous endoskeleton, Pelvic fins bear claspers, External fertilisation, Oviparous, Air bladder absent, Operculum present.\nHow many informations are not correct about Scoliodon?",
    options: [
      "Three",
      "Four",
      "Five",
      "Two"
    ],
    correct_index: 1,
    solution: "Four statements are incorrect about Scoliodon (dogfish): (1) Mouth is ventral, not terminal; (2) Fertilization is internal, not external; (3) Scoliodon is viviparous, not oviparous; (4) Operculum is absent (gill slits are separate without operculum).",
    image_url: ""
  },
  {
    q_num: 27,
    question_text: "The fundamental character of phylum Chordata is",
    options: [
      "Presence of mammary gland",
      "Presence of vertebral column and jaw",
      "Paired appendages which may be fins or limbs",
      "Paired pharyngeal gill slits"
    ],
    correct_index: 3,
    solution: "The presence of paired pharyngeal gill slits (along with notochord, dorsal hollow tubular nerve cord, and post-anal tail) is a primary fundamental diagnostic character of Phylum Chordata.",
    image_url: ""
  },
  {
    q_num: 28,
    question_text: "Identify the animal in the given diagram and select the correct description about it.",
    options: [
      "Its life starts and ends inside freshwater",
      "Cranium and vertebral column are bony",
      "Paired fins and scales are present",
      "Free living with developed stomach"
    ],
    correct_index: 0,
    solution: "The diagram depicts Petromyzon (Lamprey). Lampreys are anadromous: adults migrate from marine waters to freshwater to spawn and die there; ammocoete larvae hatch and develop in freshwater before migrating back to the sea.",
    image_url: diagramUrls[28] || ""
  },
  {
    q_num: 29,
    question_text: "All mammals without any exception are characterised by",
    options: [
      "Viviparity and biconcave red blood cells",
      "Extra-abdominal testes and a four chambered heart",
      "Heterodont teeth and 12 pairs of cranial nerves",
      "A muscular diaphragm and milk producing glands"
    ],
    correct_index: 3,
    solution: "All mammals possess mammary glands (milk producing glands) and a muscular diaphragm without any exception. Monotremes are oviparous; elephants and cetaceans have intra-abdominal testes.",
    image_url: ""
  },
  {
    q_num: 30,
    question_text: "Crocodile and penguin are similar to whale and dogfish in which of the following features?",
    options: [
      "Lay eggs and guard them till they hatch",
      "Possess bony skeleton",
      "Have gill slits at some stage of life",
      "Possess a solid single central nervous system"
    ],
    correct_index: 2,
    solution: "All four (Crocodile - reptile, Penguin - bird, Whale - mammal, Dogfish - chondrichthyes) belong to Phylum Chordata, and therefore all possess pharyngeal gill slits at some stage of their embryonic or adult life.",
    image_url: ""
  },
  {
    q_num: 31,
    question_text: "Which one of the following statements is wrong w.r.t. notochord?",
    options: [
      "It is present throughout life in Amphioxus",
      "It is present only in larval tail in Ascidia",
      "It is replaced by a vertebral column in adult frog",
      "It is absent throughout life in humans including embryonic development stage"
    ],
    correct_index: 3,
    solution: "Notochord is present in the embryonic stage of all vertebrates, including humans. In humans, it is replaced by the vertebral column during development and persists as the nucleus pulposus in intervertebral discs.",
    image_url: ""
  },
  {
    q_num: 32,
    question_text: "Which one of the following groups of animals is correctly matched with no exception?",
    options: [
      "Reptilia - Possess 3-chambered heart with one incompletely divided ventricle",
      "Chordata - Possess a mouth provided with an upper and lower jaw",
      "Chondrichthyes - Possess cartilaginous endoskeleton",
      "Mammalia - Give birth to young ones"
    ],
    correct_index: 2,
    solution: "Class Chondrichthyes possesses a cartilaginous endoskeleton with no exceptions. Reptiles include crocodiles (4-chambered heart); Chordates include agnathans (jawless); Mammals include oviparous monotremes.",
    image_url: ""
  },
  {
    q_num: 33,
    question_text: "Urinary bladder is absent in",
    options: [
      "Snakes",
      "Male frog",
      "Female frog",
      "Humans"
    ],
    correct_index: 0,
    solution: "Urinary bladder is absent in snakes and crocodiles among reptiles (and absent in most birds) as an adaptation for water conservation and body weight reduction.",
    image_url: ""
  },
  {
    q_num: 34,
    question_text: "Which is not correctly matched?",
    options: [
      "Most poisonous fish - Stone fish",
      "Prehensile tail - Hippocampus",
      "Scaleless true fish - Hagfish",
      "Flying fish - Exocoetus"
    ],
    correct_index: 2,
    solution: "Hagfish (Myxine) is a jawless cyclostome / agnathan, not a true fish (Pisces).",
    image_url: ""
  },
  {
    q_num: 35,
    question_text: "Which of the following lays eggs yet the female secretes milk?",
    options: [
      "Bat",
      "Kangaroo",
      "Platypus",
      "Opossum"
    ],
    correct_index: 2,
    solution: "Ornithorhynchus (Duck-billed Platypus) is an oviparous (egg-laying) prototherian mammal whose females possess mammary glands and secrete milk to nourish hatchlings.",
    image_url: ""
  },
  {
    q_num: 36,
    question_text: "Select the odd one w.r.t. venom they have",
    options: [
      "Naja hannah",
      "Bungarus",
      "Hydrophis",
      "Vipera russelli"
    ],
    correct_index: 3,
    solution: "Vipera russelli (Russell's viper) possesses haemotoxic (vasculotoxic) venom, whereas Naja hannah (King cobra), Bungarus (Krait), and Hydrophis (Sea snake) possess neurotoxic venom.",
    image_url: ""
  },

  // Page 385: Q37 - Q49
  {
    q_num: 37,
    question_text: "In the given diagram, characteristics of chordata are represented. Identify 1, 2, 3 and 4 respectively.",
    options: [
      "Notochord, Nerve cord, Gill slits, Post anal tail",
      "Nerve cord, Notochord, Post anal tail, Gill slits",
      "Notochord, Gill slits, Nerve cord, Post anal tail",
      "Nerve cord, Post anal tail, Gill slits, Notochord"
    ],
    correct_index: 1,
    solution: "In the standard chordate body plan diagram: 1 represents dorsal hollow nerve cord, 2 represents notochord, 3 represents post-anal tail, and 4 represents pharyngeal gill slits.",
    image_url: diagramUrls[37] || ""
  },
  {
    q_num: 38,
    question_text: "Choose the fish that is not oviparous",
    options: [
      "Rohu",
      "Chimaera",
      "Scoliodon",
      "Hippocampus"
    ],
    correct_index: 2,
    solution: "Scoliodon (Dogfish) is viviparous, giving birth to young ones directly after internal development.",
    image_url: ""
  },
  {
    q_num: 39,
    question_text: "Which of the following pairs are correctly matched?\n(A) Protochordates - Branchiostoma\n(B) Amniotes - Pteropus, Aptenodytes, Chelone\n(C) Cartilaginous fishes - Scoliodon, Trygon, Sea horse\n(D) Tunicates - Salpa, Doliolum, Ascidia",
    options: [
      "A, B, C, D",
      "A, B, D",
      "B, C, D",
      "A, B only"
    ],
    correct_index: 1,
    solution: "Pair (C) is incorrectly matched because Sea horse (Hippocampus) is a bony fish (Osteichthyes), not a cartilaginous fish. Pairs A, B, and D are all correctly matched.",
    image_url: ""
  },
  {
    q_num: 40,
    question_text: "Weberian ossicles are found in",
    options: [
      "Fishes",
      "Frog",
      "Snakes",
      "Birds"
    ],
    correct_index: 0,
    solution: "Weberian ossicles are a chain of small bones derived from modified cervical vertebrae found in ostariophysian bony fishes that connect the swim bladder to the inner ear for acoustic perception.",
    image_url: ""
  },
  {
    q_num: 41,
    question_text: "Elongated body with 6-15 pairs of gill slits, circular mouth and absence of scales and paired fins are the features of",
    options: [
      "Carcharodon",
      "Pristis",
      "Myxine",
      "Hippocampus"
    ],
    correct_index: 2,
    solution: "Myxine (Hagfish), a member of Class Cyclostomata, possesses an elongated eel-like body with 6-15 pairs of gill slits, a circular suctorial mouth without jaws, and is devoid of scales and paired fins.",
    image_url: ""
  },
  {
    q_num: 42,
    question_text: "Anadromous migration occurs in",
    options: [
      "Scoliodon",
      "Petromyzon",
      "Labeo",
      "Amphioxus"
    ],
    correct_index: 1,
    solution: "Petromyzon (Lamprey) exhibits anadromous migration, travelling from the sea into freshwater rivers to spawn.",
    image_url: ""
  },
  {
    q_num: 43,
    question_text: "Truly land vertebrates are grouped under",
    options: [
      "Vertebrata",
      "Amniota",
      "Anamniota",
      "Chordata"
    ],
    correct_index: 1,
    solution: "Truly terrestrial vertebrates are grouped under Amniota (Reptiles, Birds, and Mammals), because their embryos develop extra-embryonic membranes (amnion, chorion, allantois, yolk sac) preventing desiccation.",
    image_url: ""
  },
  {
    q_num: 44,
    question_text: "All vertebrates possess",
    options: [
      "Renal Portal system",
      "Four chambered ventral heart",
      "Dorsal hollow nerve cord",
      "Two pairs of limbs"
    ],
    correct_index: 2,
    solution: "All vertebrates, being chordates, possess a dorsal hollow tubular nerve cord running along the mid-dorsal line.",
    image_url: ""
  },
  {
    q_num: 45,
    question_text: "Which is not related to amphibians?",
    options: [
      "Procoelous centrum",
      "Cutaneous respiration",
      "Cornified skin",
      "Cloaca"
    ],
    correct_index: 2,
    solution: "Amphibians have smooth, moist, non-cornified, glandular skin that participates in cutaneous gas exchange. Cornified epidermal scales/skin are characteristic of reptiles.",
    image_url: ""
  },
  {
    q_num: 46,
    question_text: "Which of the following animals is not enclosed within a leathery tunic?",
    options: [
      "Ascidia",
      "Pyrosoma",
      "Salpa",
      "Clarias"
    ],
    correct_index: 3,
    solution: "Clarias (air-breathing catfish) is a bony fish (Osteichthyes). Ascidia, Pyrosoma, and Salpa are tunicates (Urochordata) enclosed within a protective tunic composed of tunicin.",
    image_url: ""
  },
  {
    q_num: 47,
    question_text: "Choose the incorrect match w.r.t. difference between Lamprey and Hagfish:\n(1) Lamprey: Anadromous | Hagfish: Spawning on sea floor, no migration\n(2) Lamprey: 8-pairs of cranial nerves | Hagfish: 10-pairs of cranial nerves\n(3) Lamprey: Indirect development | Hagfish: Direct development\n(4) Lamprey: Unisexual | Hagfish: Hermaphrodite",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "In cyclostomes, Lamprey has 10 pairs of cranial nerves and Hagfish has 8 pairs (or 10 pairs); statement (2) incorrectly assigns 8 pairs to Lamprey and 10 to Hagfish.",
    image_url: ""
  },
  {
    q_num: 48,
    question_text: "Choose the incorrect match",
    options: [
      "Ophisaurus - Tree lizard",
      "Hyla - Tree frog",
      "Necturus - Mud puppy",
      "Exocoetus - Marine flying fish"
    ],
    correct_index: 0,
    solution: "Ophisaurus is the Glass snake (a limbless lizard), not a tree lizard. Tree lizard is Calotes/Chameleon.",
    image_url: ""
  },
  {
    q_num: 49,
    question_text: "Choose the incorrect match:\nTeleost | Elasmobranch\n(1) Caudal fin usually homocercal | Caudal fin usually heterocercal\n(2) Fertilization is external | Fertilisation is internal\n(3) Swim bladder absent | Swim bladder present\n(4) Cycloid and ctenoid scales | Placoid scales",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Swim bladder is present in teleosts (bony fishes) to regulate buoyancy, and absent in elasmobranchs (cartilaginous fishes). Match (3) reverses this relationship.",
    image_url: ""
  },

  // Page 386: Q50 - Q55
  {
    q_num: 50,
    question_text: "Which of the following is incorrect w.r.t. birds?",
    options: [
      "Metanephric kidneys have their ureters opening into cloaca as urinary bladder is absent",
      "Heart is completely four-chambered with only left systemic arch in adults",
      "Single ear ossicle in middle ear",
      "Air sacs supplement respiration"
    ],
    correct_index: 1,
    solution: "In birds, the heart is four-chambered and only the RIGHT systemic arch persists in adults. The left systemic arch persists in mammals.",
    image_url: ""
  },
  {
    q_num: 51,
    question_text: "In which of the following, notochord is persistent throughout the life?",
    options: [
      "Ascidia",
      "Salpa",
      "Branchiostoma",
      "Ichthyophis"
    ],
    correct_index: 2,
    solution: "In Branchiostoma (Cephalochordata), the notochord extends from head to tail region and is persistent throughout life.",
    image_url: ""
  },
  {
    q_num: 52,
    question_text: "Which is not true about Cyclostomata?",
    options: [
      "Some show anadromous migration for breeding",
      "Most members are parasites",
      "All are hermaphrodite",
      "8 or 10 pairs of cranial nerves"
    ],
    correct_index: 2,
    solution: "Lampreys (Petromyzon) are unisexual (dioecious), so not all cyclostomes are hermaphroditic.",
    image_url: ""
  },
  {
    q_num: 53,
    question_text: "Choose the wrong statement about amphibians",
    options: [
      "Most of them have two pairs of limbs",
      "Body is always divisible into head, neck, trunk and tail",
      "Common cloacal chamber is present",
      "They are cold-blooded animals"
    ],
    correct_index: 1,
    solution: "The body of amphibians is divisible into head and trunk only; neck is completely absent, and tail may or may not be present (e.g. absent in frogs/toads).",
    image_url: ""
  },
  {
    q_num: 54,
    question_text: "Cold blooded animals with internal fertilization and direct development are",
    options: [
      "Neophron, Crocodilus, Naja",
      "Bungarus, Vipera, Calotes",
      "Columba, Aptenodytes, Felis",
      "Testudo, Corvus, Psittacula"
    ],
    correct_index: 1,
    solution: "Bungarus (Krait), Vipera (Viper), and Calotes (Garden lizard) are all reptiles: they are poikilothermic (cold-blooded), exhibit internal fertilization, and develop directly without a larval stage.",
    image_url: ""
  },
  {
    q_num: 55,
    question_text: "Metatherians (marsupials) are characterised by all the following features except",
    options: [
      "Pouched mammals",
      "Internal fertilization",
      "Body possesses hairs",
      "Mammary glands are with teats and are functional in both males and females"
    ],
    correct_index: 3,
    solution: "Mammary glands in metatherians (marsupials) are functional only in females, not in males.",
    image_url: ""
  }
];

