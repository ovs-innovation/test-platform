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

export const PART3_QUESTIONS = [
  // Page 391: Q111
  {
    q_num: 111,
    question_text: "Which of the following statement is incorrect w.r.t. amphibians?",
    options: [
      "Skull of amphibians is dicondylic",
      "Larva of amphibians is ammonotelic and respires with the help of gills",
      "Members of Apoda are limbless and scales are completely absent",
      "The middle ear of amphibians has a single ear ossicle called columella auris"
    ],
    correct_index: 2,
    solution: "Members of order Apoda / Gymnophiona (e.g. Ichthyophis) are limbless amphibians that possess minute, concealed calcified dermal scales embedded inside the pockets of the skin. Therefore, scales are not completely absent.",
    image_url: ""
  },

  // Page 392: Q112 - Q121
  {
    q_num: 112,
    question_text: "The largest terrestrial mammal with thick skin, scanty hair and abdominal testes belongs to order",
    options: [
      "Cetacea",
      "Proboscidea",
      "Sirenia",
      "Primates"
    ],
    correct_index: 1,
    solution: "The elephant (Elephas) is the largest living terrestrial mammal, characterized by pachyderm thick skin, scanty hair, a prehensile proboscis (trunk), and permanently intra-abdominal testes, belonging to Order Proboscidea.",
    image_url: ""
  },
  {
    q_num: 113,
    question_text: "Choose the odd one.",
    options: [
      "Cat fish - Chordata",
      "Cuttle fish - Mollusca",
      "Jelly fish - Cnidaria",
      "Cray fish - Pisces"
    ],
    correct_index: 3,
    solution: "Cray fish (Astacus) is a crustacean arthropod, not a member of Class Pisces. Catfish is a true bony fish (Chordata), Cuttlefish (Sepia) is a mollusc, and Jellyfish (Aurelia) is a cnidarian.",
    image_url: ""
  },
  {
    q_num: 114,
    question_text: "Preen glands are associated with which part of the body of birds?",
    options: [
      "Beak",
      "Eyes",
      "Tail",
      "Neck"
    ],
    correct_index: 2,
    solution: "The preen gland (uropygial gland / oil gland) is a cutaneous sebaceous gland situated at the dorsal base of the tail (uropygium) in birds, producing an oily secretion used for dressing and water-proofing feathers.",
    image_url: ""
  },
  {
    q_num: 115,
    question_text: "Which of the following statement is not related with the illustrated animal?",
    options: [
      "It does not have external ear openings",
      "It shed its scales as skin cast",
      "Tympanum represents external ear. It is used to catch the vibrations from air",
      "It is cobra. Fertilization is internal"
    ],
    correct_index: 2,
    solution: "The animal shown is Naja (Cobra). Snakes lack an external ear opening as well as a tympanum; vibrations are conducted from the ground through the lower jaw and quadrate-columella complex to the inner ear.",
    image_url: diagramUrls[115] || ""
  },
  {
    q_num: 116,
    question_text: "Four chambered heart, homoiothermous, monocondylic skull, internal fertilisation are features associated with",
    options: [
      "Salamander (Amphibia)",
      "Calotes (Reptilia)",
      "Psittacula (Aves)",
      "Canis (Mammalia)"
    ],
    correct_index: 2,
    solution: "Psittacula (Parrot) belongs to Class Aves, which is characterized by a four-chambered heart, warm-bloodedness (homeothermy), a monocondylic skull (single occipital condyle), and internal fertilization. Mammals like Canis have a dicondylic skull.",
    image_url: ""
  },
  {
    q_num: 117,
    question_text: "Exocoetus (Flying fish) is an excellent food fish and can glide with the help of wing like structure, which is a modification of",
    options: [
      "Dorsal fin",
      "Pectoral fin",
      "Caudal fin",
      "Scales"
    ],
    correct_index: 1,
    solution: "In Exocoetus (Flying fish), the pectoral fins are enormously enlarged and wing-like, enabling the fish to leap out of water and glide in air over long distances.",
    image_url: ""
  },
  {
    q_num: 118,
    question_text: "Which of the following is the correct identification of the organism and its characteristics?",
    options: [
      "Calotes (Garden lizard) - Camouflaging, prehensile tail, viviparous",
      "Scoliodon (Dog fish) - Placoid scales, operculum absent, viviparous",
      "Pteropus (Bat) - Dicondylic skull; the wings of bats are made up of patagium, it belongs to order Chiroptera, echolocate the insects",
      "Ornithorhynchus - Monotreme; Hair, mammary glands, viviparous"
    ],
    correct_index: 2,
    solution: "Pteropus (Bat) is correctly identified: as a mammal, it has a dicondylic skull; its wings are formed by a leathery patagium extending between fingers and body; it belongs to Order Chiroptera and uses echolocation to navigate. (In 1, Chameleon has prehensile tail, not Calotes; in 4, Ornithorhynchus is oviparous).",
    image_url: diagramUrls[118] || ""
  },
  {
    q_num: 119,
    question_text: "Open type of blood circulation is found in all except",
    options: [
      "Cockroach",
      "Leech",
      "Herdmania",
      "Nereis"
    ],
    correct_index: 3,
    solution: "Nereis is an annelid (polychaete) with a well-developed closed circulatory system. Cockroach (arthropod), Leech (haemocoelic channels), and Herdmania (urochordate) possess open circulatory systems.",
    image_url: ""
  },
  {
    q_num: 120,
    question_text: "Select the incorrect match w.r.t larval stage",
    options: [
      "Tornaria - Acorn worm",
      "Doliolaria - Feather star",
      "Ammocoete larva - Hag fish",
      "Ascidian tadpole larva - Sea squirt"
    ],
    correct_index: 2,
    solution: "Ammocoete larva is the developmental larval stage of Petromyzon (Lamprey), not Hagfish (Myxine). Hagfish undergoes direct development without a larval stage.",
    image_url: ""
  },
  {
    q_num: 121,
    question_text: "Select the incorrect match",
    options: [
      "Exocoetus - marine - flying fish",
      "Betta - aquarium - fighting fish",
      "Pterophyllum - fresh water - stone fish",
      "Gambusia - fresh water - larvivorous fish"
    ],
    correct_index: 2,
    solution: "Pterophyllum is Angel fish (an ornamental freshwater aquarium fish). Stone fish is Synanceia, the most venomous known fish.",
    image_url: ""
  },

  // Page 393: Q122 - Q132
  {
    q_num: 122,
    question_text: "Choose the incorrect statement w.r.t Petromyzon",
    options: [
      "Sanguivorous and carnivorous ectoparasite",
      "During spawning both the sexes ascend to rivers and they do not feed",
      "Ammocoete larva after metamorphosis return to the ocean",
      "Paired fins are present"
    ],
    correct_index: 3,
    solution: "In Class Cyclostomata (including Petromyzon), paired fins are completely absent; only median unpaired fins (dorsal and caudal) are present.",
    image_url: ""
  },
  {
    q_num: 123,
    question_text: "All of the following features are associated with birds of class Aves, except",
    options: [
      "Skin without glands, the only cutaneous gland present is uropygial gland at tail base",
      "Both clavicles and a single inter clavicle are fused to form a V-shaped bone called Furcula or wish bone",
      "Oesophagus is dilated into crop for quick feeding and storage",
      "Air sacs are connected to the lungs, supplement respiration by increasing surface area as they have a rich blood supply"
    ],
    correct_index: 3,
    solution: "Avian air sacs are thin-walled, poorly vascularized / non-vascular bladder-like extensions of the lungs that act as bellows to pump air continuously across the respiratory parabronchi, but they do not themselves possess a rich capillary bed for gas exchange.",
    image_url: ""
  },
  {
    q_num: 124,
    question_text: "Abdominal testes is found in",
    options: [
      "Prototherians",
      "Cetacea",
      "Proboscidea",
      "All of these"
    ],
    correct_index: 3,
    solution: "Testes remain permanently intra-abdominal (testicondy) in Prototheria (monotremes like Platypus), Cetacea (whales and dolphins), and Proboscidea (elephants).",
    image_url: ""
  },
  {
    q_num: 125,
    question_text: "Choose the characteristic feature of Amphibians without any exception",
    options: [
      "They are without scales",
      "Gills are present in larval stage only",
      "Both hepatic and renal portal systems are well developed",
      "Two pairs of limbs are present"
    ],
    correct_index: 2,
    solution: "All amphibians possess well-developed hepatic and renal portal systems without exception. Scales are present in Apoda (Ichthyophis); perennibranchiate urodeles (Necturus, Proteus) retain gills in adults; Apoda lacks limbs.",
    image_url: ""
  },
  {
    q_num: 126,
    question_text: "Which of the following is a cartilaginous fish?",
    options: [
      "Pterophyllum",
      "Clarias",
      "Gambusia",
      "Carcharodon"
    ],
    correct_index: 3,
    solution: "Carcharodon (Great white shark) belongs to Class Chondrichthyes (cartilaginous fishes). Pterophyllum, Clarias, and Gambusia are bony fishes (Osteichthyes).",
    image_url: ""
  },
  {
    q_num: 127,
    question_text: "Which of the following poikilotherm vertebrate has dicondylic skull?",
    options: [
      "Hyla",
      "Testudo",
      "Anabas",
      "Draco"
    ],
    correct_index: 0,
    solution: "Hyla (Tree frog) is an amphibian, which is poikilothermic (cold-blooded) and has a dicondylic skull. Testudo and Draco are reptiles (monocondylic skull); Anabas is a fish.",
    image_url: ""
  },
  {
    q_num: 128,
    question_text: "Reptiles were the first vertebrates to completely master the challenge of living on dry land. Which of the following is the most important feature that allows reptiles to live in a wide variety of terrestrial habitats?",
    options: [
      "Amniotic eggs",
      "Dry skin",
      "Thoracic breathing",
      "Leathery shell"
    ],
    correct_index: 0,
    solution: "The evolution of the cleidoic amniotic egg (enclosed within a protective shell with extraembryonic membranes amnion, chorion, allantois, and yolk sac) freed reptiles from needing water for reproduction, enabling complete terrestrial adaptation.",
    image_url: ""
  },
  {
    q_num: 129,
    question_text: "Select the incorrect match between organism, phylum and characteristics:\n(1) Asterias | Echinodermata | Larva with bilateral symmetry, Enterocoelomate\n(2) Neophron | Aves | Pneumatic bones, Heterodont teeth\n(3) Obelia | Cnidaria | Metagenesis, Diploblastic\n(4) Pheretima | Annelida | Monoecious with external fertilization, Eucoelomate",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "Neophron (Vulture) is a bird (Class Aves). Birds are completely toothless; their jaws are modified into a keratinized beak without any teeth.",
    image_url: ""
  },
  {
    q_num: 130,
    question_text: "The remarkable success of the bony fishes has resulted from a series of significant adaptations that have enabled them to dominate life in the water. These include all the following, except",
    options: [
      "Swim bladder",
      "Lateral line system",
      "Gill cover",
      "Ampulla of Lorenzini"
    ],
    correct_index: 3,
    solution: "Ampullae of Lorenzini are specialized electroreceptors and thermoreceptors found exclusively in cartilaginous fishes (Chondrichthyes like sharks and rays), not in bony fishes.",
    image_url: ""
  },
  {
    q_num: 131,
    question_text: "A chordate animal having flame cells as excretory structures is",
    options: [
      "Planaria",
      "Amphioxus",
      "Herdmania",
      "Prawns"
    ],
    correct_index: 1,
    solution: "Amphioxus (Branchiostoma), a cephalochordate, uniquely possesses protonephridia with solenocytes (flame cells) for excretion and osmoregulation. (Planaria also has flame cells, but is a non-chordate platyhelminth).",
    image_url: ""
  },
  {
    q_num: 132,
    question_text: "Which of the following is not a character of class Chondrichthyes?",
    options: [
      "The skin is tough, containing minute placoid scales",
      "Air bladder is absent",
      "Fertilization is usually external. They are mostly oviparous and development is direct",
      "They lack the capacity to regulate the body temperature"
    ],
    correct_index: 2,
    solution: "In Class Chondrichthyes, fertilization is INTERNAL (males possess pelvic claspers for sperm transfer), and many members are viviparous.",
    image_url: ""
  },

  // Page 394: Q133 - Q142
  {
    q_num: 133,
    question_text: "Which of the following is the correct matching of an organism, its class and their characteristics?\n(1) Ornithorhynchus: Mammalia | Viviparous, presence of diaphragm, ear pinna\n(2) Chameleon: Reptilia | Prehensile tail, Camouflaging, Autotomy of tail\n(3) Gambusia: Osteichthyes | Larvivorous fish, Viviparous, used for mosquito control\n(4) Scoliodon: Chondrichthyes | Placoid scales, Oviparous, internal fertilization",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Gambusia (Mosquito fish) is a freshwater bony fish (Osteichthyes) that is viviparous and feeds voraciously on mosquito larvae, used for biological control of mosquitoes.",
    image_url: ""
  },
  {
    q_num: 134,
    question_text: "Which of the following can be taken as the unique character of mammals only and is present in all mammals without exception?\n(a) Internal fertilization\n(b) Four chambered heart\n(c) Viviparous\n(d) Direct development\n(e) Presence of Pinna\n(f) Homoiothermy\n(g) Mammary glands",
    options: [
      "(b), (c) and (e)",
      "(a), (b), (f) and (g)",
      "(a), (d), (e) and (g)",
      "Only (g)"
    ],
    correct_index: 3,
    solution: "Presence of milk-producing mammary glands (g) is unique to mammals and found in all mammals without exception. Characters (a, b, d, f) are shared with birds/reptiles; (c) and (e) have exceptions in prototherians and aquatic mammals.",
    image_url: ""
  },
  {
    q_num: 135,
    question_text: "Petromyzon or sea lamprey can be easily differentiated from the Myxine or the hagfish. One of the following is not applicable to the former. Select the correct option.",
    options: [
      "Ventral mouth is present",
      "8 pairs of cranial nerves",
      "Ammocoete larva present",
      "Buccal funnel present"
    ],
    correct_index: 1,
    solution: "Petromyzon (Lamprey) possesses 10 pairs of cranial nerves, whereas Myxine (Hagfish) possesses 8 pairs of cranial nerves. Thus, '8 pairs of cranial nerves' is not applicable to Petromyzon.",
    image_url: ""
  },
  {
    q_num: 136,
    question_text: "The type of migration involving fishes moving from sea water to fresh water is",
    options: [
      "Catadromous",
      "Anadromous",
      "Seasonal",
      "Behavioural"
    ],
    correct_index: 1,
    solution: "Anadromous migration is the migration of marine fishes into freshwater rivers to spawn (e.g. Petromyzon, Hilsa, Salmon).",
    image_url: ""
  },
  {
    q_num: 137,
    question_text: "Which of the following is not applicable to birds?",
    options: [
      "Epidermal scales modified into feathers",
      "Pneumatic bones",
      "Right side ovary and oviduct well developed",
      "Uterus is absent"
    ],
    correct_index: 2,
    solution: "In birds, the right ovary and right oviduct are atrophied/vestigial to reduce body weight for aerial locomotion; only the left ovary and oviduct are functional.",
    image_url: ""
  },
  {
    q_num: 138,
    question_text: "Choose the incorrect match w.r.t. fishes\n(1) Aquarium - Betta (Fighting fish)\n(2) Fresh water - Clarias (Magur)\n(3) Marine - Hippopotamus\n(4) Lung fish - Neoceratodus",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Hippopotamus is a semi-aquatic placental mammal (Order Artiodactyla), not a marine fish. (Hippocampus is the sea horse).",
    image_url: ""
  },
  {
    q_num: 139,
    question_text: "Match the following and choose the correct option:\nColumn-I:\na. Naja naja\nb. Alytes\nc. Viper\nd. Rana tigrina\nColumn-II:\n(i) Mid wife toad\n(ii) Indian bull frog\n(iii) Nest building\n(iv) Haemotoxic venom",
    options: [
      "a(iii), b(i), c(iv), d(ii)",
      "a(i), b(iii), c(iv), d(ii)",
      "a(iii), b(i), c(ii), d(iv)",
      "a(iv), b(i), c(iii), d(ii)"
    ],
    correct_index: 0,
    solution: "Naja naja (Cobra) builds nests for laying eggs (a-iii); Alytes is the midwife toad (b-i); Viper has haemotoxic venom (c-iv); Rana tigrina is the Indian bull frog (d-ii).",
    image_url: ""
  },
  {
    q_num: 140,
    question_text: "A gland supports the birds in preening of the feathers. Such gland is located",
    options: [
      "In skin of birds - (Skin contains large number of oil glands which helps in preening)",
      "Under the scales which are present on hind limbs",
      "At the base of the tail",
      "Around the base of beak and secretes continuously"
    ],
    correct_index: 2,
    solution: "The preen gland (uropygial gland) is located on the dorsal surface of the uropygium at the base of the tail, whose oily secretion is spread over plumage during preening.",
    image_url: ""
  },
  {
    q_num: 141,
    question_text: "Select the incorrect statement",
    options: [
      "Bioluminescence is well-marked in ctenophores",
      "In fresh water fishes, gills have respiratory as well as excretory functions",
      "Post-anal part is present in all non-chordates",
      "In Pristis, skin is tough, containing minute placoid scales"
    ],
    correct_index: 2,
    solution: "A post-anal tail is a hallmark characteristic of Phylum Chordata and is completely absent in non-chordates (in non-chordates, the anus is located at the terminal posterior end).",
    image_url: ""
  },
  {
    q_num: 142,
    question_text: "Which of the following is correct match about class and their examples?\n(1) Cyclostomata: Petromyzon, Myxine, Branchiostoma\n(2) Chondrichthyes: Carcharodon, Trygon, Pristis\n(3) Osteichthyes: Exocoetus, Pterophyllum, Neophron\n(4) Aves: Pteropus, Psittacula, Delphinus",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "Carcharodon (great white shark), Trygon (sting ray), and Pristis (saw fish) all belong to Class Chondrichthyes.",
    image_url: ""
  },

  // Page 395: Q143 - Q147
  {
    q_num: 143,
    question_text: "Read the following four statements A, B, C and D and select the right option having both statements correct:\nA. In Urochordata, notochord is present only in larval tail, while in Cephalochordata, it extends from head to tail and is persistent throughout their life.\nB. In birds respiration is by lungs that contain air sacs to supplement respiration. Air sacs are vascular.\nC. All vertebrates are chordates but all chordates are not vertebrates.\nD. In amphibians the body is divided into head, neck and trunk. Eyes lack eyelids.",
    options: [
      "B & D",
      "A & B",
      "A & C",
      "C & D"
    ],
    correct_index: 2,
    solution: "Statements A and C are correct. Statement B is false because air sacs are non-vascular; Statement D is false because amphibians lack a neck and have eyelids.",
    image_url: ""
  },
  {
    q_num: 144,
    question_text: "Which of the following characteristic of class Mammalia is without any exceptions?",
    options: [
      "They are viviparous",
      "Presence of external ears or pinnae",
      "The testes are situated outside the abdominal cavity with scrotum",
      "Presence of diaphragm and mammary glands"
    ],
    correct_index: 3,
    solution: "Presence of a muscular diaphragm and milk-producing mammary glands is universal to all mammals without exception.",
    image_url: ""
  },
  {
    q_num: 145,
    question_text: "Identify the organisms given below and mark the correct statement regarding them.",
    options: [
      "A - Water vascular system for locomotion",
      "B - Show retrogressive metamorphosis",
      "C - Notochord present only in tail of adult",
      "B - Migrate from sea to fresh water for spawning"
    ],
    correct_index: 0,
    solution: "Organism A is Asterias (Starfish, Echinodermata), which utilizes a specialized water vascular (ambulacral) system for locomotion and food capture.",
    image_url: diagramUrls[145] || ""
  },
  {
    q_num: 146,
    question_text: "Match the column I and column II. Column II below consists of brief description of organisms in column I:\nColumn I:\na. [Ornithorhynchus]\nb. [Chameleon]\nc. [Pteropus]\nd. [Petromyzon]\nColumn II:\n(i) Belongs to Chiroptera and is homeotherm\n(ii) A parasitic vertebrate which attaches to and sucks blood from fishes\n(iii) Prehensile tail and can show camouflaging\n(iv) Oviparous mammal, present in Australia and Tasmania",
    options: [
      "a(iv), b(iv), c(i), d(ii)",
      "a(iii), b(iv), c(ii), d(i)",
      "a(iv), b(iii), c(i), d(ii)",
      "a(iii), b(iv), c(i), d(ii)"
    ],
    correct_index: 2,
    solution: "a. Ornithorhynchus -> (iv) Oviparous mammal; b. Chameleon -> (iii) Prehensile tail and camouflaging; c. Pteropus -> (i) Chiroptera and homeotherm; d. Petromyzon -> (ii) Ectoparasitic vertebrate sucking blood from fishes.",
    image_url: diagramUrls[146] || ""
  },
  {
    q_num: 147,
    question_text: "Which of the following statements in column II is not matching with the item given in column I?\n(1) Aves: Birds have reptilian ancestry. Hind legs have scales and they lay large yolky calcareous eggs like reptiles.\n(2) Insects: Blood of insects is called haemolymph and it helps in transportation of gases.\n(3) Insects: Body is divided into head, thorax and abdomen. The skin is without scales or have chitinous exoskeleton.\n(4) Fishes: In cartilaginous fishes, the skin is tough, containing placoid scales. Teeth are modified placoid scales which are backwardly directed.",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "In insects, haemolymph does not contain respiratory pigments and plays no significant role in the transport of respiratory gases; oxygen and carbon dioxide are transported directly to tissues via the tracheal system.",
    image_url: ""
  },

  // Page 396: Q148 - Q158
  {
    q_num: 148,
    question_text: "Which of the following is not a distinguishing character of members of class Chondrichthyes?",
    options: [
      "Sexes are separate. They have internal fertilisation and many of them are viviparous",
      "They have to swim constantly to avoid sinking",
      "They have four pairs of gills covered by operculum on each side",
      "The skin is tough, containing minute placoid scales"
    ],
    correct_index: 2,
    solution: "Members of Chondrichthyes possess 5-7 pairs of gill slits without an operculum (except chimaeras). Having 4 pairs of gills covered by an operculum on each side is a feature of Osteichthyes (bony fishes).",
    image_url: ""
  },
  {
    q_num: 149,
    question_text: "Which of the following is not a poisonous snake?",
    options: [
      "Naja naja (Cobra)",
      "Bungarus (Krait)",
      "Vipera (Viper)",
      "Python"
    ],
    correct_index: 3,
    solution: "Python is a non-venomous constrictor snake belonging to family Pythonidae.",
    image_url: ""
  },
  {
    q_num: 150,
    question_text: "It is generally held that one of the following was a decisive event in the conquest of land by vertebrates, that is",
    options: [
      "Respiration by lungs",
      "Presence of hair and scales",
      "Development of egg with the provision of amnion",
      "Presence of diaphragm"
    ],
    correct_index: 2,
    solution: "The evolution of the cleidoic egg with the protective fluid-filled amnion and extraembryonic membranes was the decisive breakthrough allowing reproduction completely away from water.",
    image_url: ""
  },
  {
    q_num: 151,
    question_text: "Even though gills are the most efficient of all respiratory organs, they were not maintained in the terrestrial organisms for which of the following reasons?\nA. In gills, fine membranous lamellae lack structural strength; they must be supported by water to avoid collapsing.\nB. Air is more buoyant than water, leads to collapsing of gills.\nC. Water diffuses into air through the process of evaporation; gills would have provided an enormous surface for water loss.",
    options: [
      "C only",
      "A, B & C",
      "A & C",
      "A only"
    ],
    correct_index: 2,
    solution: "Statements A and C are the correct physiological reasons: delicate gill filaments collapse and adhere to each other in air due to surface tension, and their enormous surface area would cause lethal evaporative desiccation in terrestrial environments.",
    image_url: ""
  },
  {
    q_num: 152,
    question_text: "Which of the following is common trait amongst reptiles, fishes and amphibians?",
    options: [
      "Ventral nerve cord",
      "Oviparous",
      "Scales",
      "Shelled eggs"
    ],
    correct_index: 1,
    solution: "Fishes, amphibians, and reptiles are all typically oviparous (egg-laying anamniotes/amniotes). Nerve cord in chordates is dorsal; amphibians lack scales; fishes and amphibians lack shelled eggs.",
    image_url: ""
  },
  {
    q_num: 153,
    question_text: "Which of the following is not a characteristic of monotreme animal?",
    options: [
      "Oviparous",
      "Presence of cloaca",
      "Presence of ear pinna",
      "Testes are intra-abdominal"
    ],
    correct_index: 2,
    solution: "Monotremes (e.g. Ornithorhynchus, Tachyglossus) lack external ear pinnae.",
    image_url: ""
  },
  {
    q_num: 154,
    question_text: "Which of the following is incorrect match?\n(1) Alytes: An amphibian which carries its young on its back\n(2) Centipedes: One pair of legs in each abdominal segment\n(3) Monotremes: They are oviparous and development is direct\n(4) Bivalvia: Sedentary filter feeders",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 0,
    solution: "Alytes is the Midwife toad; the male wraps the egg strings around its hind limbs/thighs to protect them. The amphibian that carries eggs/young in dorsal pouches on its back is the Surinam toad (Pipa americana).",
    image_url: ""
  },
  {
    q_num: 155,
    question_text: "Which of the following is both living fossil and connecting link?\nA. Limulus\nB. Sphenodon\nC. Neopilina\nD. Latimeria",
    options: [
      "A only",
      "A & B",
      "C & D",
      "B, C & D"
    ],
    correct_index: 2,
    solution: "Neopilina is a living fossil connecting Annelida and Mollusca; Latimeria (coelacanth lobe-finned fish) is a living fossil connecting fishes to amphibians. (Limulus and Sphenodon are living fossils, but not connecting links between major groups).",
    image_url: ""
  },
  {
    q_num: 156,
    question_text: "Amphibians never succeeded in becoming fully terrestrial because amphibian eggs must be laid in water to avoid drying out. Why?",
    options: [
      "This is because amphibians are anamniotes",
      "Amphibians are amniotes",
      "Amphibians lack allantois",
      "Amphibians lack yolk sac membrane"
    ],
    correct_index: 0,
    solution: "Amphibians are anamniotes: their eggs lack the protective embryonic amnion and waterproof calcareous/leathery shell, so they dry out rapidly unless deposited in water or moist surroundings.",
    image_url: ""
  },
  {
    q_num: 157,
    question_text: "Which of the following is a characteristic of chordates but it is not found in other animals?",
    options: [
      "A notochord",
      "Jointed appendages",
      "An exoskeleton",
      "Nerve cord"
    ],
    correct_index: 0,
    solution: "A notochord is a primary, definitive chordate feature never found in any non-chordate phylum.",
    image_url: ""
  },
  {
    q_num: 158,
    question_text: "Which of the following animals is with single occipital condyle, twelve pairs of cranial nerves and is poikilothermous?",
    options: [
      "Ichthyophis (Limbless amphibia)",
      "Hippocampus (Sea horse)",
      "Calotes (Garden lizard)",
      "Columba (Pigeon)"
    ],
    correct_index: 2,
    solution: "Calotes (Garden lizard) is a reptile: it has a monocondylic skull, 12 pairs of cranial nerves, and is poikilothermic (cold-blooded). Columba is homeothermic; Ichthyophis has 10 cranial nerve pairs and dicondylic skull.",
    image_url: ""
  },

  // Page 397: Q159 - Q165
  {
    q_num: 159,
    question_text: "An organism is marine and migrates for spawning into rivers. After spawning, it stops feeding and die. Its characteristic ammocoete larvae after metamorphosis migrate to ocean. Select the correct option which represent this organism:",
    options: [
      "Myxine",
      "Cyclostomes",
      "Petromyzon",
      "Agnatha"
    ],
    correct_index: 2,
    solution: "Petromyzon (Sea lamprey) is an anadromous marine cyclostome that migrates to freshwater rivers to spawn, dies after spawning, and its ammocoete larva develops and returns to the sea.",
    image_url: ""
  },
  {
    q_num: 160,
    question_text: "Which of the following is not a character of non-chordates?",
    options: [
      "Central nervous system, which is ventral, solid and double",
      "Heart is dorsal",
      "A post anal metamerically segmented tail is present",
      "Notochord is absent"
    ],
    correct_index: 2,
    solution: "A post-anal tail is present in chordates and is absent in non-chordates (in non-chordates, the anus opens at the posterior tip of the body).",
    image_url: ""
  },
  {
    q_num: 161,
    question_text: "Which of the following is not a correct set of class and its three examples?",
    options: [
      "Amphibia - Ichthyophis, Hyla, Rana",
      "Osteichthyes - Exocoetus, Clarias, Hippocampus",
      "Reptilia - Chelone, Bungarus, Calotes",
      "Aves - Psittacula, Aptenodytes, Pteropus"
    ],
    correct_index: 3,
    solution: "Pteropus (Flying fox / Bat) is a mammal (Class Mammalia), not a bird (Class Aves).",
    image_url: ""
  },
  {
    q_num: 162,
    question_text: "Which of the following is non-vertebrate chordate? They are the closest relatives of vertebrates:\nA. Tunicates\nB. Branchiostoma\nC. Amphioxus\nD. Cyclostomes",
    options: [
      "B only",
      "B & C only",
      "B, C & D",
      "A, B & C"
    ],
    correct_index: 3,
    solution: "Protochordates (non-vertebrate chordates) comprise Urochordata (Tunicates) and Cephalochordata (Branchiostoma / Amphioxus). Cyclostomes are true craniate vertebrates (Agnatha).",
    image_url: ""
  },
  {
    q_num: 163,
    question_text: "Animals with notochord are called chordates and notochord is",
    options: [
      "Mesodermally derived hollow tubular structure",
      "Ectodermally derived hollow tubular structure",
      "Mesodermally derived and ventrally placed solid rod like structure",
      "Mesodermally derived and dorsally placed solid rod like structure"
    ],
    correct_index: 3,
    solution: "The notochord is a mesodermally derived, dorsally situated, flexible solid rod-like skeletal structure lying between the digestive tube and the nerve cord.",
    image_url: ""
  },
  {
    q_num: 164,
    question_text: "Which of the following features of hemichordates are unlike chordates?\n(a) Open circulatory system\n(b) Dorsal heart\n(c) Dorsal tubular nerve cord\n(d) Absence of tail",
    options: [
      "(a), (b) and (d)",
      "(a), (b) and (c)",
      "(b), (c) and (d)",
      "(a), (b), (c) and (d)"
    ],
    correct_index: 0,
    solution: "Hemichordates have an open circulatory system, a dorsal heart (chordates have a ventral heart), and lack a post-anal tail (absence of tail), which distinguish them from chordates.",
    image_url: ""
  },
  {
    q_num: 165,
    question_text: "Placoid scales, ventral mouth, heterocercal caudal fin and internal fertilization are the characteristics of",
    options: [
      "Scoliodon",
      "Anguilla",
      "Gambusia",
      "Exocoetus"
    ],
    correct_index: 0,
    solution: "Scoliodon (Dogfish, Chondrichthyes) is characterized by placoid scales, ventral mouth, heterocercal tail, and internal fertilization.",
    image_url: ""
  }
];

