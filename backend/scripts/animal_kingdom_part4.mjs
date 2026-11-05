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

export const PART4_QUESTIONS = [
  // Page 397: Q166 - Q170
  {
    q_num: 166,
    question_text: "Viviparity is found in",
    options: [
      "Ichthyophis",
      "Alytes",
      "Scoliodon",
      "Xenopus"
    ],
    correct_index: 2,
    solution: "Scoliodon (Dogfish, Class Chondrichthyes) is viviparous, giving birth to live young ones after internal nourishment via a yolk-sac placenta.",
    image_url: ""
  },
  {
    q_num: 167,
    question_text: "Some features make the reptiles the first true land animals. Select the correct set of features:\n(a) Presence of internal fertilization\n(b) Presence of amnion\n(c) Presence of heterodont teeth",
    options: [
      "Only (c)",
      "Only (a)",
      "(a), (b) & (c)",
      "Only (a) & (b)"
    ],
    correct_index: 3,
    solution: "Internal fertilization (a) and an amniotic egg with amnion (b) are key terrestrial adaptations that freed reptiles from water. Most reptiles have homodont dentition (not heterodont).",
    image_url: ""
  },
  {
    q_num: 168,
    question_text: "Which of the following is referred to as a living fossil, has pineal eye and is found in New Zealand?",
    options: [
      "Ichthyophis",
      "Salamandra",
      "Sphenodon",
      "Heloderma"
    ],
    correct_index: 2,
    solution: "Sphenodon punctatus (Tuatara of New Zealand) is a living fossil of order Rhynchocephalia possessing a functional median parietal / pineal eye complete with lens and retina.",
    image_url: ""
  },
  {
    q_num: 169,
    question_text: "Prototherians show both reptilian and mammalian characteristics. Which of the following is not a reptilian characteristic of the organisms?",
    options: [
      "Lay large yolky eggs",
      "Presence of cloaca",
      "Pectoral girdle has large coracoid processes",
      "Presence of body hair"
    ],
    correct_index: 3,
    solution: "Presence of body hair and mammary glands are distinct mammalian characteristics, not reptilian characteristics.",
    image_url: ""
  },
  {
    q_num: 170,
    question_text: "Gynaecomastia is a condition in which male has functional mammary glands to feed the young ones. It is generally seen in",
    options: [
      "Ornithorhynchus",
      "Spiny anteater",
      "Both (1) & (2)",
      "Kangaroo"
    ],
    correct_index: 2,
    solution: "In monotremes (Ornithorhynchus / Platypus and Tachyglossus / Spiny anteater), mammary glands are functional in both males and females (physiological gynaecomastia).",
    image_url: ""
  },

  // Page 398: Q171 - Q180
  {
    q_num: 171,
    question_text: "Choose the incorrect statement",
    options: [
      "In frog, gills are present in larval stages",
      "Ichthyophis is a limbless amphibian",
      "Hepatic, renal and hypophyseal portal systems are present in vertebrates",
      "Fertilization is internal in all amphibians"
    ],
    correct_index: 3,
    solution: "Fertilization is external in the majority of amphibians (such as frogs and toads) taking place in water.",
    image_url: ""
  },
  {
    q_num: 172,
    question_text: "The poisonous sting of sting-ray is its modified",
    options: [
      "Pectoral fin",
      "Pelvic fin",
      "Dorsal fin",
      "Caudal fin"
    ],
    correct_index: 2,
    solution: "In Trygon (Sting ray), the venomous spine or sting on the whiplike tail is a modified spine of the dorsal fin.",
    image_url: ""
  },
  {
    q_num: 173,
    question_text: "All the features mentioned are not applicable to which of the following fish given below?\n(a) Mesonephric kidneys, ammonia as chief nitrogenous waste\n(b) External fertilization\n(c) Ability to float in water even when the body is not moving\n(d) Presence of operculum",
    options: [
      "Labeo",
      "Betta",
      "Clarias",
      "Carcharodon"
    ],
    correct_index: 3,
    solution: "Carcharodon (Great white shark, Chondrichthyes) is ureotelic, exhibits internal fertilization, lacks an operculum, and lacks an air bladder (must swim continuously to avoid sinking). The listed features describe bony fishes (Osteichthyes).",
    image_url: ""
  },
  {
    q_num: 174,
    question_text: "An animal with dicondylic skull, well developed hepatic and renal portal systems, lateral line system in larvae and three chambered heart in adults is",
    options: [
      "Chelone",
      "Rana tigrina",
      "Aptenodytes",
      "Ornithorhynchus"
    ],
    correct_index: 1,
    solution: "Rana tigrina (Indian bull frog) possesses a dicondylic skull, 3-chambered heart in adults, prominent hepatic and renal portal systems, and a lateral line system in its tadpole larva.",
    image_url: ""
  },
  {
    q_num: 175,
    question_text: "All mammals",
    options: [
      "Possess homodont teeth",
      "Possess seven cervical vertebrae",
      "Are viviparous",
      "Nourish young ones with milk"
    ],
    correct_index: 3,
    solution: "Nourishing young ones with milk produced by mammary glands is an absolute, defining feature of all mammals without exception.",
    image_url: ""
  },
  {
    q_num: 176,
    question_text: "Which of the following statements about Spongilla, leech, dolphin and penguin is correct?",
    options: [
      "Penguin is homeothermic while the remaining three are poikilothermic",
      "Leech is a fresh water form while all others are marine",
      "Spongilla has special collar cells called choanocytes not found in the remaining three",
      "All are bilaterally symmetrical"
    ],
    correct_index: 2,
    solution: "Spongilla (freshwater sponge) uniquely possesses flagellated collar cells (choanocytes) lining the spongocoel/canals, which are absent in all other animal phyla.",
    image_url: ""
  },
  {
    q_num: 177,
    question_text: "Read the following statements w.r.t. an animal:\na. Body is dorsoventrally compressed.\nb. Gill slits are ventrally placed and without operculum.\nc. Air bladder absent, so it has to swim constantly, else it will sink to the bottom.\nd. It has specific electric organ which is made up of modified lateral muscles supplied with nerves.\ne. Male has claspers attached to pelvic fin.\nThe animal can be identified as",
    options: [
      "Scoliodon",
      "Torpedo",
      "Exocoetus",
      "Betta"
    ],
    correct_index: 1,
    solution: "Torpedo (Electric ray) is a dorsoventrally flattened cartilaginous fish with ventral gill slits and powerful electric organs derived from branchial muscles.",
    image_url: ""
  },
  {
    q_num: 178,
    question_text: "Which of the following is incorrect w.r.t. the animals and its characteristic features?\n(1) Sphenodon: Living fossil and has functional pineal eye\n(2) Seymouria: Missing link between amphibia and reptilia\n(3) Pigeon: Pneumatic bones without bone marrow and feathers help in insulation of the body\n(4) Ornithorhynchus: Bill just like a duck, feathers and pygostyle",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 3,
    solution: "Ornithorhynchus (Platypus) is a mammal with hair and a duck-like leathery bill; it does not possess feathers or a pygostyle (feathers and pygostyle are avian features).",
    image_url: ""
  },
  {
    q_num: 179,
    question_text: "Choose the mismatched property of class Chondrichthyes:\n(1) Absence of air bladder - Constant swimming to avoid sinking\n(2) Backwardly directed teeth - Modified placoid scales\n(3) Modified pelvic fins in males - Internal fertilisation\n(4) Operculum in intestine - Respiratory organ / excretion",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 3,
    solution: "Operculum is a gill cover, not a structure in the intestine. The intestine of chondrichthyes contains a spiral valve (scroll valve).",
    image_url: ""
  },
  {
    q_num: 180,
    question_text: "Fully ossified endoskeleton with hollow long bones, digestive tract with additional chambers, ability to maintain constant body temperature are found in",
    options: [
      "Pterophyllum",
      "Psittacula",
      "Pteropus",
      "Testudo"
    ],
    correct_index: 1,
    solution: "Psittacula (Parrot) belongs to Class Aves, which is characterized by a fully ossified pneumatic endoskeleton with hollow long bones containing air cavities, crop and gizzard in the digestive tract, and homeothermy.",
    image_url: ""
  },

  // Page 399: Q181 - Q192
  {
    q_num: 181,
    question_text: "Which term describes the eggs of reptiles and aves?",
    options: [
      "Amniotic",
      "Anamniotic",
      "Externally fertilized",
      "Non-cleidoic"
    ],
    correct_index: 0,
    solution: "Eggs of reptiles and birds are amniotic (cleidoic eggs having extraembryonic membranes including amnion, chorion, allantois, and yolk sac).",
    image_url: ""
  },
  {
    q_num: 182,
    question_text: "Which of the following is the correct matching w.r.t the taxon, its example and its characteristics?\n(1) Aves: Columba | Oviparous, Development is direct, Dicondylic skull and twelve pairs of cranial nerves\n(2) Reptilia: Calotes | Body is covered by epidermal scales or scutes, always contains a post anal tail\n(3) Mammalia: Ornithorhynchus | They are viviparous, Dicondylic skull\n(4) Chondrichthyes: Torpedo | The skin is tough, containing minute epidermal scales",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "Calotes belongs to Reptilia, characterized by dry, cornified skin covered with epidermal scales or scutes, and a prominent post-anal tail.",
    image_url: ""
  },
  {
    q_num: 183,
    question_text: "Choose the incorrect statement",
    options: [
      "In non-chordates, nerve cord is generally ventral and solid whereas in chordates, it is hollow",
      "All platyhelminthes are parasitic in nature",
      "Birds show internal fertilization even in the absence of copulatory organs",
      "All the animals with triploblastic condition either have blind sac or tube within tube plan"
    ],
    correct_index: 1,
    solution: "Not all platyhelminthes are parasitic; planarians (Turbellaria like Dugesia) are free-living aquatic flatworms.",
    image_url: ""
  },
  {
    q_num: 184,
    question_text: "Which of the following groups of animals are oviparous and homeothermal with dicondylic skull?",
    options: [
      "Struthio, Pavo, Neophron",
      "Macropus, Pteropus, Balaenoptera",
      "Hippocampus, Catla, Clarias",
      "Ornithorhynchus, Echidna"
    ],
    correct_index: 3,
    solution: "Monotremes like Ornithorhynchus (Duck-billed Platypus) and Echidna (Spiny anteater) are mammals: they are homeothermic with a dicondylic skull, yet uniquely oviparous (lay eggs). Birds have a monocondylic skull.",
    image_url: ""
  },
  {
    q_num: 185,
    question_text: "Which of the following is the correct statement regarding the animals shown?",
    options: [
      "Animals (a) & (b) have external fertilisation",
      "Animals (c) & (d) are viviparous",
      "Animals (b) & (c) are anamniotes",
      "Animals (a) & (d) respire by gills"
    ],
    correct_index: 2,
    solution: "The animals are (a) Petromyzon, (b) Scoliodon, (c) Salamandra, and (d) Ornithorhynchus. Both fishes (Scoliodon) and amphibians (Salamandra) lack an amnion and are anamniotes.",
    image_url: diagramUrls[185] || ""
  },
  {
    q_num: 186,
    question_text: "Which of the following is a mismatch?\n(1) Amphibia: Moist skin without scales, eyes have eyelids, sexes are separate and external fertilization\n(2) Osteichthyes: 4 pair of gills, skin covered with cycloid/ctenoid scales, operculum is present\n(3) Cyclostomata: Elongated body bearing 6-15 pairs of gill slits, closed flow circulation, have paired fins\n(4) Reptilia: Body covered by dry and cornified scales, internal fertilization and direct development",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "In Class Cyclostomata, paired fins are completely absent; members have only median unpaired fins.",
    image_url: ""
  },
  {
    q_num: 187,
    question_text: "Which of the following characteristics is common for all amphibians without exception?",
    options: [
      "Scales",
      "Limbed vertebrates",
      "Pulmonary breathing at all stages of life cycle",
      "Poikilothermous anamniotes"
    ],
    correct_index: 3,
    solution: "All amphibians are poikilothermic (cold-blooded) and anamniotes (lacking amnion) without any exception.",
    image_url: ""
  },
  {
    q_num: 188,
    question_text: "Reptiles can be truly explained as",
    options: [
      "First poikilothermic tetrapods",
      "First amniotic tetrapods",
      "First pulmonary breathing tetrapods",
      "First oviparous tetrapods"
    ],
    correct_index: 1,
    solution: "Reptiles represent the first group of amniotic tetrapods, having evolved the cleidoic amniotic egg that allowed them to conquer dry land.",
    image_url: ""
  },

  // Page 400: Q189 - Q205
  {
    q_num: 189,
    question_text: "The set of mammalian characters which are present in all mammals without any exception is",
    options: [
      "7 cervical vertebrae and diaphragm",
      "Diaphragm and mammary glands",
      "External ear and 7 cervical vertebrae",
      "Diaphragm and body hairs"
    ],
    correct_index: 1,
    solution: "Muscular diaphragm and milk-producing mammary glands are present in all mammals without exception. Sloths have 6, 8, or 9 cervical vertebrae; cetaceans and sirenians have virtually no body hair or external ears.",
    image_url: ""
  },
  {
    q_num: 190,
    question_text: "Mammals that are viviparous but incubate the new borns in a pouch through the completion of development are",
    options: [
      "Monotremes",
      "Metatherians",
      "Duck billed platypus",
      "Placental mammals"
    ],
    correct_index: 1,
    solution: "Metatherians (marsupials like Kangaroo and Koala) give birth to highly immature altricial young and rear them inside an abdominal brood pouch (marsupium).",
    image_url: ""
  },
  {
    q_num: 191,
    question_text: "Which one of the following is not a characteristic of non-chordates?",
    options: [
      "Dorsal heart",
      "Presence of RBCs",
      "Bilateral symmetry",
      "Solid nerve cord"
    ],
    correct_index: 1,
    solution: "Red blood corpuscles (RBCs) containing haemoglobin are characteristic of vertebrates. Non-chordates do not possess RBCs (haemoglobin, if present, is dissolved directly in plasma as in earthworm).",
    image_url: ""
  },
  {
    q_num: 192,
    question_text: "Choose the wrong set of comparison between chordates and non-chordates:\n(1) Chordates: Notochord present | Non-chordates: Notochord absent\n(2) Chordates: CNS is dorsal, hollow and single | Non-chordates: CNS is ventral, solid and double\n(3) Chordates: Gill slits present | Non-chordates: Gill slits absent\n(4) Chordates: Heart is dorsal | Non-chordates: Heart is ventral",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 3,
    solution: "In chordates, the heart is ventral; in non-chordates, the heart is dorsal (if present). Comparison (4) reverses their positions.",
    image_url: ""
  },
  {
    q_num: 193,
    question_text: "Protochordates include",
    options: [
      "Urochordates and cephalochordates",
      "Hemichordates and urochordates",
      "Hemichordates and cephalochordates",
      "Urochordates and vertebrates"
    ],
    correct_index: 0,
    solution: "Protochordates (Acraniata) comprise subphylum Urochordata (Tunicata) and subphylum Cephalochordata.",
    image_url: ""
  },
  {
    q_num: 194,
    question_text: "In cephalochordates,",
    options: [
      "Notochord is present only in head region and persists throughout their life",
      "Notochord is present in tail region of larva only",
      "Notochord extends from tail to head and persists throughout life",
      "Notochord present only in head during embryonic life"
    ],
    correct_index: 2,
    solution: "In Cephalochordata (e.g. Branchiostoma), the notochord extends from the tip of the tail to the anterior rostrum (head) and persists throughout life.",
    image_url: ""
  },
  {
    q_num: 195,
    question_text: "Select the wrong statement w.r.t. Cyclostomata",
    options: [
      "All living members are ectoparasites",
      "Mouth is circular and suctorial without jaws",
      "Body covered by scales",
      "Circulation is of closed type"
    ],
    correct_index: 2,
    solution: "Cyclostomes have smooth slimy skin entirely devoid of scales.",
    image_url: ""
  },
  {
    q_num: 196,
    question_text: "Which one is the correct set of aquarium fishes?",
    options: [
      "Exocoetus and Hippocampus",
      "Pristis and Trygon",
      "Labeo and Exocoetus",
      "Betta and Pterophyllum"
    ],
    correct_index: 3,
    solution: "Betta (Siamese fighting fish) and Pterophyllum (Angel fish) are popular freshwater aquarium fishes.",
    image_url: ""
  },
  {
    q_num: 197,
    question_text: "Pisces and tetrapoda can put together into",
    options: [
      "Anamniotes",
      "Amniotes",
      "Gnathostomes",
      "Agnatha"
    ],
    correct_index: 2,
    solution: "Pisces (fishes with fins) and Tetrapoda (four-limbed vertebrates) are grouped under the division Gnathostomata (vertebrates bearing true jaws).",
    image_url: ""
  },
  {
    q_num: 198,
    question_text: "In amphibians, cloaca receives the opening of all, except",
    options: [
      "Digestive tract",
      "Urinary tract",
      "Reproductive tract",
      "Respiratory tract"
    ],
    correct_index: 3,
    solution: "The cloaca is a common chamber into which the alimentary canal (digestive tract), urinary ducts, and genital/reproductive ducts open. The respiratory tract does not open into the cloaca.",
    image_url: ""
  },
  {
    q_num: 199,
    question_text: "Middle ear for the first time evolved in amphibia and is characterised by",
    options: [
      "A chain of three ear ossicles bones",
      "A single ear ossicle bone called columella auris",
      "Presence of cochlea for hearing",
      "Two semicircular canals"
    ],
    correct_index: 1,
    solution: "Amphibians are the earliest tetrapods to evolve a middle ear cavity, which contains a single ear ossicle called columella auris (homologous to the mammalian stapes).",
    image_url: ""
  },
  {
    q_num: 200,
    question_text: "Seymouria is connecting link between",
    options: [
      "Fishes and amphibians",
      "Amphibian and reptiles",
      "Reptiles and birds",
      "Reptiles and mammals"
    ],
    correct_index: 1,
    solution: "Seymouria is an extinct transitional fossil exhibiting characters intermediate between advanced labyrinthodont amphibians and primitive stem reptiles (cotylosaurs).",
    image_url: ""
  },
  {
    q_num: 201,
    question_text: "Isinglass, is a gelatinous product which is used for clarification of wine and beer and is, obtained from",
    options: [
      "Skin of shark",
      "Air bladders of fishes",
      "Scales of fishes",
      "Fins of fishes"
    ],
    correct_index: 1,
    solution: "Isinglass is a high-grade gelatin/collagen substance prepared from the dried swim bladders (air bladders) of sturgeons, carps, and other bony fishes, traditionally used for clarification of wine and beer.",
    image_url: ""
  },
  {
    q_num: 202,
    question_text: "Choose primitive reptiles with a solid skull roof without temporal opening.",
    options: [
      "Crocodile",
      "Tortoise",
      "Snake",
      "Lizard"
    ],
    correct_index: 1,
    solution: "Tortoises and turtles belong to subclass Anapsida, characterized by a primitive, solid skull roof devoid of temporal vacuities/fossae.",
    image_url: ""
  },
  {
    q_num: 203,
    question_text: "A living fossil reptile with pineal or parietal eye, is",
    options: [
      "Limulus",
      "Coelacanth",
      "Tuatara",
      "Chameleon"
    ],
    correct_index: 2,
    solution: "Tuatara (Sphenodon punctatus) is an archaic living fossil reptile possessing a distinct third parietal/pineal eye on top of its head.",
    image_url: ""
  },
  {
    q_num: 204,
    question_text: "A snake has absence of",
    options: [
      "Ear",
      "External ear",
      "Internal ear",
      "Tail"
    ],
    correct_index: 1,
    solution: "Snakes lack an external ear opening and tympanum; sound vibrations from the substrate are transmitted via the lower jaw to the stapes of the internal ear.",
    image_url: ""
  },
  {
    q_num: 205,
    question_text: "Air sacs of bird's lung perform all of the following functions, except",
    options: [
      "Reduce body weight",
      "Helps in respiration",
      "Provide internal cooling",
      "Increase area for gaseous exchange"
    ],
    correct_index: 3,
    solution: "Air sacs in birds are avascular and do not participate in actual gas exchange; gaseous exchange occurs exclusively in the parabronchi/air capillaries of the lungs.",
    image_url: ""
  },

  // Page 401: Q206 - Q220
  {
    q_num: 206,
    question_text: "Unlike other birds, Kiwi has a good sense of",
    options: [
      "Vision",
      "Smell",
      "Hearing",
      "Flight"
    ],
    correct_index: 1,
    solution: "Apteryx (Kiwi) is unique among birds in having nostrils located at the tip of its long bill and a highly developed sense of smell (olfaction) to hunt earthworms in dark forest soil.",
    image_url: ""
  },
  {
    q_num: 207,
    question_text: "Eggs of birds are",
    options: [
      "Cleidoic and macrolecithal",
      "Cleidoic and mesolecithal",
      "Macrolecithal and homolecithal",
      "Non-cleidoic"
    ],
    correct_index: 0,
    solution: "Birds produce cleidoic (shelled) eggs containing an enormous reserve of yolk (macrolecithal / polylecithal) to sustain embryonic development outside water.",
    image_url: ""
  },
  {
    q_num: 208,
    question_text: "All birds, without exception",
    options: [
      "Are omnivorous",
      "Have feathers and fly",
      "Have pecten and syrinx",
      "Have cleidoic egg"
    ],
    correct_index: 3,
    solution: "All birds are oviparous laying cleidoic eggs. Flightless birds cannot fly, kiwi lacks pecten, and feeding habits vary.",
    image_url: ""
  },
  {
    q_num: 209,
    question_text: "Which of the following is a vertebrate but not a member of tetrapoda?",
    options: [
      "Petromyzon",
      "Amphioxus",
      "Pigeon",
      "Bat"
    ],
    correct_index: 0,
    solution: "Petromyzon is a jawless vertebrate (Agnatha/Cyclostomata) and does not belong to the superclass Tetrapoda. (Amphioxus is a protochordate, not a vertebrate; Pigeon and Bat are tetrapods).",
    image_url: ""
  },
  {
    q_num: 210,
    question_text: "The mammals have hair but, are absent/scanty in",
    options: [
      "Proboscidea and cetacea",
      "Cetacea and sirenia",
      "Proboscidea and sirenia",
      "All of these"
    ],
    correct_index: 3,
    solution: "Hairs are greatly reduced, scanty, or absent in Cetacea (whales and dolphins), Sirenia (manatees and dugongs), and Proboscidea (elephants).",
    image_url: ""
  },
  {
    q_num: 211,
    question_text: "One of the following is not a trait of prototherians",
    options: [
      "Egg laying",
      "Absence of teats over mammary gland",
      "Absence of corpus callosum",
      "Extra abdominal testes"
    ],
    correct_index: 3,
    solution: "In prototherians (monotremes like Platypus and Echidna), testes remain abdominal throughout life (intra-abdominal); they do not possess a scrotum or extra-abdominal testes.",
    image_url: ""
  },
  {
    q_num: 212,
    question_text: "The character which differentiates mammals from birds is",
    options: [
      "Seven cervical vertebrae",
      "Parental care",
      "One aortic arch",
      "Metanephric kidney"
    ],
    correct_index: 0,
    solution: "The presence of seven cervical vertebrae is a characteristic constant in mammals (except sloths/manatees), whereas birds have 11 to 25 flexible cervical vertebrae.",
    image_url: ""
  },
  {
    q_num: 213,
    question_text: "Renal portal system absent in",
    options: [
      "Fish and amphibia",
      "Amphibia and reptilia",
      "Reptiles and birds",
      "Mammals"
    ],
    correct_index: 3,
    solution: "The renal portal system is completely absent in mammals, where blood from the posterior body parts is drained directly by the postcaval vein.",
    image_url: ""
  },
  {
    q_num: 214,
    question_text: "All mammals without any exception are characterised by",
    options: [
      "Viviparity and biconcave RBCs",
      "Extra abdominal testes and four chambered heart",
      "Heterodont teeth and 12 pairs of cranial nerves",
      "A muscular diaphragm and milk producing glands"
    ],
    correct_index: 3,
    solution: "All mammals possess a muscular diaphragm separating thoracic from abdominal cavities and milk-producing mammary glands without exception.",
    image_url: ""
  },
  {
    q_num: 215,
    question_text: "Which one of the following pair is correctly matched?",
    options: [
      "Sphenodon - New Zealand",
      "Ostrich - New Zealand",
      "Kiwi - Australia",
      "Rhea - Australia"
    ],
    correct_index: 0,
    solution: "Sphenodon (Tuatara) is endemic to small offshore islands of New Zealand. Ostrich is native to Africa, Kiwi to New Zealand, and Rhea to South America.",
    image_url: ""
  },
  {
    q_num: 216,
    question_text: "Heart of amphibians possesses",
    options: [
      "Only left systemic arch",
      "Only right systemic arch",
      "Two systemic arches",
      "No systemic arch"
    ],
    correct_index: 2,
    solution: "Amphibians possess two (paired left and right) systemic arches arising from the truncus arteriosus and uniting posteriorly to form the dorsal aorta.",
    image_url: ""
  },
  {
    q_num: 217,
    question_text: "Animal possessing skull with solid bony roof, metanephric kidneys, monocondylic skull, cloacal respiration and 12 pairs of cranial nerves is",
    options: [
      "Sphenodon",
      "Alligator",
      "Testudo",
      "Bungarus"
    ],
    correct_index: 2,
    solution: "Testudo (Tortoise) has an anapsid skull with a solid bony roof, a monocondylic skull, 12 pairs of cranial nerves, metanephric kidneys, and vascular cloacal bursae used for cloacal respiration in water.",
    image_url: ""
  },
  {
    q_num: 218,
    question_text: "One amongst the following features of birds may not be considered as a volant adaptation that is the presence of",
    options: [
      "Pneumatic endoskeleton",
      "Air sacs",
      "Keel on sternum",
      "Nucleated RBCs"
    ],
    correct_index: 3,
    solution: "Nucleated RBCs are an ancestral vertebrate/reptilian feature and do not represent a flight/volant adaptation. Pneumatic bones, air sacs, and keeled sternum are volant adaptations.",
    image_url: ""
  },
  {
    q_num: 219,
    question_text: "A prototherian mammal called duck billed Platypus is known for showing all of the following features, except",
    options: [
      "Intra-abdominal testes",
      "Presence of poison spur that ensures sexual dimorphism",
      "Presence of scrotum in front of penis",
      "Presence of diaphragm and cloaca"
    ],
    correct_index: 2,
    solution: "In Platypus, testes remain intra-abdominal and a scrotum is completely absent. A pre-penial scrotum is characteristic of marsupials (metatherians).",
    image_url: ""
  },
  {
    q_num: 220,
    question_text: "Which of the following is a worm like, limbless amphibian with scales embedded into skin and eyes covered by an opaque skin cover?",
    options: [
      "Proteus",
      "Ichthyophis",
      "Alytes",
      "Bombina"
    ],
    correct_index: 1,
    solution: "Ichthyophis (Blindworm, Order Apoda/Gymnophiona) is a burrowing, limbless, worm-like amphibian with minute dermal scales embedded in transverse grooves of the skin and rudimentary eyes covered by skin.",
    image_url: ""
  }
];

