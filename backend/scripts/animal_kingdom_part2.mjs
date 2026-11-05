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

export const PART2_QUESTIONS = [
  // Page 386: Q56 - Q60
  {
    q_num: 56,
    question_text: "Which of the following has open circulatory system?",
    options: [
      "Trygon",
      "Hyla",
      "Amphioxus",
      "Doliolum"
    ],
    correct_index: 3,
    solution: "Doliolum belongs to subphylum Urochordata (Tunicata), which possesses an open circulatory system with a simple tubular heart. Vertebrates (Trygon, Hyla) and Cephalochordates (Amphioxus) have closed circulatory systems.",
    image_url: ""
  },
  {
    q_num: 57,
    question_text: "Read the following statements A-E with respect to vertebrates:\nA. Notochord is embryonic, solid sheathed rod-like structure in embryo.\nB. Notochord is replaced by a cartilaginous or bony vertebral column in adults.\nC. Nerve cord is dorsally placed and hollow.\nD. Pharyngeal gill slits are found in embryonic stage.\nE. Nerve cord gives rise to CNS and mesodermal in origin.\nHow many of the above statements are true?",
    options: [
      "5",
      "3",
      "4",
      "2"
    ],
    correct_index: 2,
    solution: "Four statements (A, B, C, D) are true. Statement E is false because the nerve cord and central nervous system are ectodermal in embryonic origin, not mesodermal.",
    image_url: ""
  },
  {
    q_num: 58,
    question_text: "Fill in the blanks and choose the correct option:\nAscidia is enclosed within a leathery test or A, formed by B like material termed as C.",
    options: [
      "A- Rostrum, B- Cellulose, C- Tunic",
      "A- Tunicin, B- Protein, C- Tunic",
      "A- Tunic, B- Cellulose, C- Tunicin",
      "A- Rostrum, B- Protein, C- Tunic"
    ],
    correct_index: 2,
    solution: "Adult Ascidia (Urochordata) is enveloped by a protective leathery test or tunic (A), composed of a cellulose-like polysaccharide (B) known as tunicin (C).",
    image_url: ""
  },
  {
    q_num: 59,
    question_text: "Read the following statements and choose the correct option:\nStatement A: Placoid scales are dermal in origin.\nStatement B: Intestine of shark has scroll valve.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_index: 2,
    solution: "Both statements are correct. Placoid scales in cartilaginous fishes are dermal denticles of mesodermal/dermal origin, and the intestine of sharks possesses an internal spiral fold (scroll valve / spiral valve) to increase the absorptive surface area.",
    image_url: ""
  },
  {
    q_num: 60,
    question_text: "In which of the following, the genus name, its two characteristics and its class are not correctly matched?\n(1) Hippocampus: Four pairs of gills, Air bladder present | Osteichthyes\n(2) Bufo: Dicondylic skull, has only internal ear | Amphibia\n(3) Naja: Metanephric kidney, Neck with a hood and spectacle mark | Reptilia\n(4) Struthio: Syrinx absent, Pygostyle absent | Aves",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 1,
    solution: "Bufo (Amphibia) possesses a middle ear (represented by a tympanum and single ossicle columella auris) in addition to an internal ear; it does not have 'only internal ear'.",
    image_url: ""
  },

  // Page 387: Q61 - Q69
  {
    q_num: 61,
    question_text: "Identify the statements as true (T) or false (F) and choose the correct option:\nI. Birds may be called \"Glorified reptiles\".\nII. Pecten is found in Kiwi.\nIII. Air sacs are connected to lungs to supplement respiration.\nIV. Syrinx is present below trachea and it produces sound.",
    options: [
      "T, F, T, T",
      "F, T, T, F",
      "T, F, F, T",
      "F, T, F, T"
    ],
    correct_index: 0,
    solution: "T.H. Huxley referred to birds as 'glorified reptiles' (I is True). Pecten is absent in the nocturnal kiwi (II is False). Air sacs connect to lungs for unidirectional supplementary airflow (III is True). The voice box in birds is syrinx located at the base of the trachea (IV is True).",
    image_url: ""
  },
  {
    q_num: 62,
    question_text: "Match the columns and choose the correct option:\nColumn-A:\n(i) Jacobson's organ\n(ii) Spermatophore\n(iii) Lateral line\nColumn-B:\nA. Picked up by the female with cloacal lips as in Fire Salamander\nB. Present in the roof of buccal cavity\nC. Capsule around sperm\nD. Vomeronasal organ\nE. Olfactory function\nF. Contains neuromast organ",
    options: [
      "(i)-BEF, (ii)-A, (iii)-CD",
      "(i)-BDE, (ii)-C, (iii)-AF",
      "(i)-BDE, (ii)-AC, (iii)-F",
      "(i)-BAC, (ii)-DE, (iii)-F"
    ],
    correct_index: 2,
    solution: "Jacobson's organ (vomeronasal organ) is present in the roof of the buccal cavity and has olfactory function (B, D, E). Spermatophore is a sperm capsule picked up by the female's cloacal lips in salamanders (A, C). Lateral line system contains neuromast organs (F).",
    image_url: ""
  },
  {
    q_num: 63,
    question_text: "Which of the following is not correctly matched?",
    options: [
      "Columella auris - Single ear ossicle",
      "Prehensile tail - Hippocampus",
      "Flying fish - Brood pouch in male",
      "Clasper - Pelvic fins of male shark"
    ],
    correct_index: 2,
    solution: "A brood pouch in the male is found in Hippocampus (Sea horse), not in Exocoetus (Flying fish).",
    image_url: ""
  },
  {
    q_num: 64,
    question_text: "Identify the odd characteristic feature regarding Dogfish",
    options: [
      "Ampulla of Lorenzini helps to detect pressure fluctuation",
      "Heterocercal tail",
      "5-7 pairs of gill slits",
      "Homodont teeth"
    ],
    correct_index: 0,
    solution: "Ampullae of Lorenzini in dogfish (Scoliodon) act as thermoreceptors and electroreceptors (detecting electrical fields and temperature gradients), not pressure fluctuations (pressure is detected by neuromast organs of the lateral line).",
    image_url: ""
  },
  {
    q_num: 65,
    question_text: "Read the following statements and choose the correct option:\nStatement A - Corpora quadrigemina is found in midbrain of most mammals.\nStatement B - All mammals are viviparous with no exception.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are incorrect",
      "Both statements A and B are correct"
    ],
    correct_index: 0,
    solution: "Statement A is correct (mammalian midbrain uniquely has four optic/auditory lobes forming corpora quadrigemina). Statement B is incorrect because prototherians (e.g. Ornithorhynchus, Echidna) are oviparous (egg-laying) mammals.",
    image_url: ""
  },
  {
    q_num: 66,
    question_text: "Fill in the blanks:\nHeart of birds is A chambered and only B aortic arch persists in adults. RBCs are C.\nSelect the correct option:\n(1) 4, Left, Circular and nucleated\n(2) 3, Right, Circular and nucleated\n(3) 4, Right, Oval and nucleated\n(4) 4, Left, Oval and non-nucleated",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Birds possess a 4-chambered heart (A), only the right systemic/aortic arch persists in adults (B), and their red blood cells are oval, biconvex, and nucleated (C).",
    image_url: ""
  },
  {
    q_num: 67,
    question_text: "Arrange the given as per classification of Chordata:\nA. Tetrapoda\nB. Craniata\nC. Reptilia\nD. Gnathostomata",
    options: [
      "C -> D -> B -> A",
      "B -> D -> C -> A",
      "B -> D -> A -> C",
      "D -> B -> A -> C"
    ],
    correct_index: 2,
    solution: "Hierarchical classification of chordates: Chordata -> Craniata (B) -> Gnathostomata (D) -> Tetrapoda (A) -> Reptilia (C), so B -> D -> A -> C.",
    image_url: ""
  },
  {
    q_num: 68,
    question_text: "Identify the figures given below and select similar characters among these animals.",
    options: [
      "Male shows parental care",
      "Anamniotes and poikilothermous",
      "Oviparous animals with direct development",
      "Have corpus callosum"
    ],
    correct_index: 1,
    solution: "The figures show (a) Salamandra (Amphibia) and (b) Hippocampus (Osteichthyes/Pisces). Both fishes and amphibians are anamniotes (lacking amnion) and poikilothermous (cold-blooded).",
    image_url: diagramUrls[68] || ""
  },
  {
    q_num: 69,
    question_text: "Neuromast organs act as",
    options: [
      "Thermoreceptors",
      "Chemoreceptors",
      "Rheoreceptors",
      "Statoreceptors"
    ],
    correct_index: 2,
    solution: "Neuromast organs of the lateral line system in aquatic anamniotes (fishes and larval amphibians) function as rheoreceptors to detect water currents, waves, and pressure variations.",
    image_url: ""
  },

  // Page 388: Q70 - Q79
  {
    q_num: 70,
    question_text: "Which of the following animals possesses all these characters?\n(a) Marine animal with streamlined body\n(b) Teeth are modified placoid scales\n(c) Mouth is on ventral side and digestive tract opens into cloaca\n(d) Dorsal fin is modified into sting",
    options: [
      "Torpedo",
      "Trygon",
      "Pristis",
      "Scoliodon"
    ],
    correct_index: 1,
    solution: "Trygon (Sting ray) is a marine chondrichthyan possessing placoid scales, ventral mouth, cloaca, and a serrated venomous tail/spine modified from the dorsal fin.",
    image_url: ""
  },
  {
    q_num: 71,
    question_text: "How many of the following cannot be applied to most Amphibia?\nPoikilothermous, Moist skin, Metanephric kidney, 10-cranial nerves, Indirect development",
    options: [
      "3",
      "2",
      "1",
      "0"
    ],
    correct_index: 2,
    solution: "Only 1 feature (Metanephric kidney) cannot be applied to Amphibia, because amphibians possess mesonephric kidneys. The remaining four features (poikilothermous, moist glandular skin, 10 pairs of cranial nerves, and indirect development) apply to amphibians.",
    image_url: ""
  },
  {
    q_num: 72,
    question_text: "Consider the given features w.r.t. Chondrichthyes:\n(a) Mouth is located dorsally.\n(b) Placoid scales present.\n(c) Heart is three chambered.\n(d) Heterocercal tail.\nHow many of the above features is/are correct?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_index: 1,
    solution: "Two features are correct: (b) placoid scales present and (d) heterocercal caudal fin. Mouth is ventrally located (not dorsal) and heart is 2-chambered (venous heart, not 3-chambered).",
    image_url: ""
  },
  {
    q_num: 73,
    question_text: "Mermaid's purse in some cartilaginous species is concerned with",
    options: [
      "Temperature detection",
      "Development of embryo",
      "Digestion of food",
      "Copulation"
    ],
    correct_index: 1,
    solution: "Mermaid's purse is the tough, horny protective egg case or capsule laid by oviparous sharks, skates, and chimaeras within which the embryo develops.",
    image_url: ""
  },
  {
    q_num: 74,
    question_text: "Consider the following characters:\n(a) Four pairs of gills which are covered by an operculum on each side.\n(b) Skin is tough, containing placoid scales.\n(c) Air bladder is present which regulates buoyancy.\n(d) Body is streamlined.\n(e) Has hepatic and renal portal systems.\nHow many of the given characters are common for cartilaginous and bony fishes?",
    options: [
      "Two",
      "Three",
      "Four",
      "Five"
    ],
    correct_index: 0,
    solution: "Two characters (d and e) are shared by both cartilaginous and bony fishes: streamlined body and presence of hepatic and renal portal systems. Characters a and c are specific to bony fishes, while b is specific to cartilaginous fishes.",
    image_url: ""
  },
  {
    q_num: 75,
    question_text: "Which is not the point of similarity between adult echinoderms and chordates",
    options: [
      "Enterocoelom",
      "Deuterostomic development",
      "Radial symmetry",
      "Mesodermal endoskeleton"
    ],
    correct_index: 2,
    solution: "Adult echinoderms exhibit pentamerous radial symmetry, whereas chordates exhibit bilateral symmetry. Both are deuterostomes, enterocoelic coelomates, and possess mesodermal endoskeletons.",
    image_url: ""
  },
  {
    q_num: 76,
    question_text: "Consider the given statements w.r.t. members of class Cyclostomata:\n(a) Ectoparasites on some fishes.\n(b) Elongated body bearing 6-15 pairs of gills slits.\n(c) Body is devoid of scales and paired fins.\n(d) Circulation is of closed type.\nHow many of the above statements is/are correct?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_index: 3,
    solution: "All four statements (a, b, c, d) are correct characteristic features of Class Cyclostomata.",
    image_url: ""
  },
  {
    q_num: 77,
    question_text: "Aerial adaptation in birds include all the following features except",
    options: [
      "Streamlined body",
      "Absence of urinary bladder",
      "Presence of crop and gizzard",
      "Bones filled with air instead of bone marrow"
    ],
    correct_index: 2,
    solution: "Presence of crop and gizzard is an adaptation of the digestive tract for grain feeding and maceration, not a flight/aerial adaptation. Streamlined body, absence of urinary bladder, and pneumatic bones are primary flight adaptations.",
    image_url: ""
  },
  {
    q_num: 78,
    question_text: "How many of the following is/are true w.r.t. Ascidia?\nLeathery tunic, open circulation, retrogressive metamorphosis in larva, notochord persistent",
    options: [
      "1",
      "4",
      "3",
      "2"
    ],
    correct_index: 2,
    solution: "Three features are true: leathery tunic present, open circulation, and retrogressive metamorphosis in larva. 'Notochord persistent' is false because the notochord is present only in the larval tail and lost in the adult.",
    image_url: ""
  },
  {
    q_num: 79,
    question_text: "Which of the following characters is not common among the animals given below?",
    options: [
      "Presence of feathers",
      "Body is bilaterally symmetrical",
      "Respiration is supplemented by air sacs",
      "Presence of oil glands and keel"
    ],
    correct_index: 3,
    solution: "The animals are (a) Struthio (Ostrich, a flightless ratite) and (b) Pavo (Peacock, a carinoid flying bird). Ostrich lacks a keeled sternum and lacks uropygial (oil/preen) glands, whereas Peacock possesses both.",
    image_url: diagramUrls[79] || ""
  },

  // Page 389: Q80 - Q90
  {
    q_num: 80,
    question_text: "Which of the following is the connecting link between reptiles and mammals?",
    options: [
      "Seymouria",
      "Archaeopteryx",
      "Lepidosiren",
      "Ornithorhynchus"
    ],
    correct_index: 3,
    solution: "Ornithorhynchus (Duck-billed Platypus) is a monotreme mammal that serves as a living connecting link between Reptilia and Mammalia, possessing reptilian traits (oviparity, cloaca, ectothermic tendencies) and mammalian traits (hair, mammary glands).",
    image_url: ""
  },
  {
    q_num: 81,
    question_text: "Which of the following characters is common between reptiles and birds?",
    options: [
      "Pleurodont teeth",
      "Cleidoic egg",
      "Homeothermy",
      "Dry non glandular skin covered with epidermal scales/scutes"
    ],
    correct_index: 1,
    solution: "Both reptiles and birds produce cleidoic (shelled) eggs with albumin, yolk, and extraembryonic membranes adapted for terrestrial reproduction.",
    image_url: ""
  },
  {
    q_num: 82,
    question_text: "In the given chart, pick out the correct match of the animal, its two characters and its class:\n(1) Bufo: Dicondylic skull, internal fertilisation | Amphibia\n(2) Chameleon: Camouflage, moist, scaly skin | Reptilia\n(3) Struthio: No Keel, no preen gland | Aves\n(4) Balaenoptera: Hairless skin, oviparous | Mammalia",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Struthio (Ostrich) belongs to Aves and is characterized by a flat sternum without a keel and absence of the preen (uropygial) gland.",
    image_url: ""
  },
  {
    q_num: 83,
    question_text: "Match the organs in Column I with their functions in Column II and choose the correct option:\nColumn I:\n(a) Jacobson's organ\n(b) Ampulla of Lorenzini\n(c) Swim bladder\n(d) Cochlea\nColumn II:\n(i) Auditory receptor\n(ii) Thermoreceptor\n(iii) Olfaction\n(iv) Buoyancy",
    options: [
      "(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)",
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)",
      "(a)-(i), (b)-(iii), (c)-(iv), (d)-(ii)"
    ],
    correct_index: 0,
    solution: "Jacobson's organ -> Olfaction (iii); Ampulla of Lorenzini -> Thermoreceptor / electroreceptor (ii); Swim bladder -> Buoyancy (iv); Cochlea -> Auditory receptor (i).",
    image_url: ""
  },
  {
    q_num: 84,
    question_text: "Select the odd one",
    options: [
      "Branchiostoma - Heart absent",
      "Chimaera - Gills covered by operculum",
      "Ichthyophis - Pentadactyle limbs present",
      "Sphenodon - Living fossil of reptiles"
    ],
    correct_index: 2,
    solution: "Ichthyophis is a caecilian (Apoda, Amphibia) that is completely limbless (limbs and girdles are absent).",
    image_url: ""
  },
  {
    q_num: 85,
    question_text: "The electric organs in (i) are actually (ii)",
    options: [
      "(i) Torpedo, (ii) Modified muscles",
      "(i) Pristis, (ii) Modified teeth",
      "(i) Torpedo, (ii) Modified scales",
      "(i) Pristis, (ii) Modified muscles"
    ],
    correct_index: 0,
    solution: "In Torpedo (Electric ray), electric organs are modified masses of striated branchial muscle fibers capable of generating high-voltage electric shocks.",
    image_url: ""
  },
  {
    q_num: 86,
    question_text: "Identify the given statements (A-D) as True (T) or False (F):\nA. All reptiles have 3-chambered heart except Crocodiles and their allies.\nB. Pecten is absent in Kiwi.\nC. Gills are retained in some adult amphibians like Necturus.\nD. Scroll valve is present in intestine of Scoliodon.\nChoose the correct option:",
    options: [
      "T, T, F, F",
      "T, T, F, T",
      "T, F, T, T",
      "T, T, T, T"
    ],
    correct_index: 3,
    solution: "All four statements are true: crocodiles have 4-chambered hearts while other reptiles have 3; Kiwi lacks pecten; perennibranchiate urodeles like Necturus retain external gills; Scoliodon intestine has a spiral scroll valve.",
    image_url: ""
  },
  {
    q_num: 87,
    question_text: "Select the incorrect match:\nExample | Type of fertilisation | Type of development\n(1) Hyla: External, Indirect\n(2) Bufo: External, Indirect\n(3) Naja: External, Direct\n(4) Hemidactylus: Internal, Direct",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 2,
    solution: "Naja (Cobra) is a reptile; fertilization is internal (not external), followed by direct development.",
    image_url: ""
  },
  {
    q_num: 88,
    question_text: "The animal that shed their scales as skin cast is",
    options: [
      "Naja",
      "Rana",
      "Pristis",
      "Clarias"
    ],
    correct_index: 0,
    solution: "Naja (Cobra) and other snakes and lizards shed their dead cornified epidermal scales as a skin cast (ecdysis).",
    image_url: ""
  },
  {
    q_num: 89,
    question_text: "Among the given statements, select the incorrect ones:\n(a) Cloaca is present in both amphibians and reptiles.\n(b) Ichthyophis is a limbless amphibian.\n(c) All reptiles have three-chambered heart.\n(d) Reptiles show internal fertilisation for the first time in animals.",
    options: [
      "(a) and (b)",
      "(b) and (c)",
      "(c) and (d)",
      "(a) and (d)"
    ],
    correct_index: 2,
    solution: "Statements (c) and (d) are incorrect. Crocodiles possess a completely four-chambered heart, and internal fertilization evolved prior to reptiles (e.g. in Chondrichthyes/sharks).",
    image_url: ""
  },
  {
    q_num: 90,
    question_text: "Which of the following lizard shows camouflaging and has prehensile tail?",
    options: [
      "Hemidactylus",
      "Calotes",
      "Heloderma",
      "Chameleon"
    ],
    correct_index: 3,
    solution: "Chameleon (Tree lizard) is well known for physiological color change (camouflage) and possesses a prehensile tail used for grasping branches.",
    image_url: ""
  },

  // Page 390: Q91 - Q100
  {
    q_num: 91,
    question_text: "Which statements are correct about Cyclostomata?\n(a) Devoid of scales and paired fins.\n(b) Circular mouth with jaw.\n(c) Cranium and vertebral column are cartilaginous.\n(d) Circulation is of open type.",
    options: [
      "a, c",
      "a, b, c, d",
      "Only c",
      "a, c, d"
    ],
    correct_index: 0,
    solution: "Cyclostomes have an elongated body devoid of scales and paired fins (a) and possess a cartilaginous cranium and vertebral column (c). Their circular mouth is jawless (b is false) and circulation is closed (d is false).",
    image_url: ""
  },
  {
    q_num: 92,
    question_text: "Which one of the following sets of animals belong to a single class?",
    options: [
      "Chelone, Chameleon, Calotes",
      "Sea pen, Sea fan, Sea hare",
      "Neophron, Aptenodytes, Macropus",
      "Cuttle fish, Devil fish, Silver fish"
    ],
    correct_index: 0,
    solution: "Chelone (Turtle), Chameleon (Tree lizard), and Calotes (Garden lizard) all belong to Class Reptilia.",
    image_url: ""
  },
  {
    q_num: 93,
    question_text: "How many of the following features (A-C) are flight adaptations in birds?\n(A) Pneumatic bones.\n(B) Forelimbs modified into wings.\n(C) Presence of well-developed sternum with keel bone.",
    options: [
      "A and B only",
      "A only",
      "A, B and C",
      "C only"
    ],
    correct_index: 2,
    solution: "All three (A, B, and C) are key morphological adaptations for flight in birds: pneumatic bones reduce weight, wings provide lift and thrust, and the keeled sternum anchors flight muscles.",
    image_url: ""
  },
  {
    q_num: 94,
    question_text: "Select the characteristic features of cartilaginous fishes:\n(A) Presence of placoid scales\n(B) Presence of heterocercal tail\n(C) Absence of cloaca\n(D) Presence of swim bladder\n(E) Absence of scroll valve\nChoose the correct option:",
    options: [
      "3",
      "4",
      "1",
      "2"
    ],
    correct_index: 3,
    solution: "Only two features (A: presence of placoid scales and B: presence of heterocercal tail) are characteristics of cartilaginous fishes. Cartilaginous fishes have a cloaca, lack a swim bladder, and possess a scroll valve.",
    image_url: ""
  },
  {
    q_num: 95,
    question_text: "Petromyzon is a _____ and shows _____ migration for reproduction.",
    options: [
      "Cephalochordate ; Catadromous",
      "Protochordate ; Catadromous",
      "Cyclostome ; Anadromous",
      "Gnathostome ; Anadromous"
    ],
    correct_index: 2,
    solution: "Petromyzon is a jawless vertebrate belonging to Cyclostomata, and shows anadromous migration (spawning in freshwater rivers).",
    image_url: ""
  },
  {
    q_num: 96,
    question_text: "Select the incorrect match :",
    options: [
      "Reptilia - Dry, cornified skin and fertilisation is internal",
      "Osteichthyes - Four pairs of gills are covered with an operculum",
      "Cyclostomata - Lack jaws, body is covered with scales, paired fins are present",
      "Aves - Monocondylic skull and long bones are pneumatic"
    ],
    correct_index: 2,
    solution: "Cyclostomata are jawless vertebrates devoid of scales and lacking paired fins.",
    image_url: ""
  },
  {
    q_num: 97,
    question_text: "Select the correct option related to chondrichthyes:\na. Internal fertilization\nb. Placoid scale\nc. Marine\nd. Scroll valve in intestine",
    options: [
      "Only a, b, c are correct",
      "Only b is correct",
      "Only d is correct",
      "a, b, c and d are correct"
    ],
    correct_index: 3,
    solution: "All four statements (a, b, c, d) are true for Chondrichthyes.",
    image_url: ""
  },
  {
    q_num: 98,
    question_text: "From the section of a chordate shown below select the correct match of the labelling (1-4)",
    options: [
      "1 - Give rise to vertebral column in vertebrates",
      "2 - Endodermal in origin",
      "3 - It is present for balancing",
      "4 - Present in aquatic adult forms only"
    ],
    correct_index: 2,
    solution: "Label 3 represents the post-anal tail, which provides balancing and propulsion during locomotion in aquatic chordates. Label 1 (nerve cord) gives rise to the CNS; label 2 (notochord) is mesodermal in origin; label 4 (pharyngeal gill slits) occurs embryonically in all chordates.",
    image_url: diagramUrls[98] || ""
  },
  {
    q_num: 99,
    question_text: "Which of the following is an anamniote having glandular skin?",
    options: [
      "Naja",
      "Ichthyophis",
      "Pavo",
      "Rattus"
    ],
    correct_index: 1,
    solution: "Ichthyophis is an amphibian (Apoda/Gymnophiona) and therefore is an anamniote (lacks amnion) possessing glandular skin.",
    image_url: ""
  },
  {
    q_num: 100,
    question_text: "Which of the following is least likely to be exclusive character of mammals?",
    options: [
      "Presence of corpus callosum",
      "Presence of 7 cervical vertebra",
      "Presence of mammary gland",
      "Presence of 12 pairs cranial nerves"
    ],
    correct_index: 3,
    solution: "Presence of 12 pairs of cranial nerves is shared by all amniotes (Reptilia, Aves, and Mammalia), so it is not exclusive to mammals.",
    image_url: ""
  },

  // Page 391: Q101 - Q110
  {
    q_num: 101,
    question_text: "In which of the following, the genus name, its two characteristics and its class are not correctly matched?\n(1) Labeo: 4 pairs of gills, Operculum present | Osteichthyes\n(2) Naja: Amniota, Metanephric kidney | Reptilia\n(3) Struthio: Syrinx absent, Pygostyle absent | Aves\n(4) Rana: Monocondylic skull, Tympanum absent | Amphibia",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_index: 3,
    solution: "Rana (Amphibia) possesses a dicondylic skull (with two occipital condyles) and a distinct tympanum representing the ear.",
    image_url: ""
  },
  {
    q_num: 102,
    question_text: "Identify the odd characteristic feature regarding Scoliodon.",
    options: [
      "Ampulla of Lorenzini detects temperature fluctuation",
      "Heterocercal tail",
      "Homodont teeth",
      "Oviparous animal"
    ],
    correct_index: 3,
    solution: "Scoliodon (Dogfish) is viviparous, not oviparous.",
    image_url: ""
  },
  {
    q_num: 103,
    question_text: "Which of the following belong to class Osteichthyes?\n(a) Exocoetus\n(b) Carcharodon\n(c) Chimaera\n(d) Torpedo\n(e) Clarias\n(f) Hippocampus",
    options: [
      "(a), (c), (e), (f)",
      "(c), (d), (f)",
      "(a), (e), (f)",
      "(a), (b), (c), (e)"
    ],
    correct_index: 2,
    solution: "Exocoetus (flying fish), Clarias (magur), and Hippocampus (sea horse) belong to class Osteichthyes (bony fishes). Carcharodon, Chimaera, and Torpedo belong to Chondrichthyes.",
    image_url: ""
  },
  {
    q_num: 104,
    question_text: "Which of the following is incorrect w.r.t. the given figure?",
    options: [
      "Absence of uterus and scrotum",
      "Connecting link between Reptilia and Mammalia",
      "Presence of Pinna",
      "Mammary gland is devoid of nipples"
    ],
    correct_index: 2,
    solution: "The animal shown is Ornithorhynchus (Duck-billed Platypus), an egg-laying prototherian mammal. External ear (pinna) is absent in prototherians.",
    image_url: diagramUrls[104] || ""
  },
  {
    q_num: 105,
    question_text: "Select the incorrect statement regarding notochord.",
    options: [
      "Notochord is restricted to larval tail in tunicates",
      "Notochord is replaced by cartilaginous vertebral column in Torpedo",
      "Notochord is replaced by bony vertebral column in Ichthyophis",
      "Notochord develops ventral to gut"
    ],
    correct_index: 3,
    solution: "The notochord develops dorsal to the alimentary canal (gut) and ventral to the nerve cord.",
    image_url: ""
  },
  {
    q_num: 106,
    question_text: "Dicondylic skull is the characteristic of",
    options: [
      "Amphibia and Osteichthyes",
      "Amphibia and Mammalia",
      "Reptiles and Aves",
      "Amphibia, Aves and Mammalia"
    ],
    correct_index: 1,
    solution: "Dicondylic skull (skull articulating with the first vertebra via two occipital condyles) is characteristic of Amphibia and Mammalia. Reptiles and birds have a monocondylic skull.",
    image_url: ""
  },
  {
    q_num: 107,
    question_text: "Which one of the following is the correct match?",
    options: [
      "Lamprey - Paired and unpaired fins present",
      "Trygon - Has electric organ",
      "Chimaera - Connecting link between cartilagenous and bony fish",
      "Hippocampus - Air bladder is absent"
    ],
    correct_index: 2,
    solution: "Chimaera (Rat fish / Rabbit fish / King of herrings) has an operculum covering its gill slits like bony fishes but cartilaginous skeleton like elasmobranchs, serving as a connecting link between cartilaginous and bony fishes.",
    image_url: ""
  },
  {
    q_num: 108,
    question_text: "How many of the following characters belong to Aves?\nCrop, Gizzard, Pneumatic bone, Dicondylic skull, Diaphragm, Green gland, Mesonephric kidney, Right aortic arch",
    options: [
      "Two",
      "Three",
      "Four",
      "Five"
    ],
    correct_index: 2,
    solution: "Four characters belong to Aves: Crop, Gizzard, Pneumatic bone, and Right aortic arch. The skull is monocondylic, diaphragm is absent, green glands are in crustacea, and adult kidneys are metanephric.",
    image_url: ""
  },
  {
    q_num: 109,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "Urochordates are also known as tunicates",
      "In urochordates, excretion occurs by neural gland",
      "In cephalochordates, notochord persists throughout life",
      "In cephalochordates, excretion occurs by proboscis gland"
    ],
    correct_index: 3,
    solution: "In cephalochordates, excretion occurs via protonephridia with solenocytes. Proboscis gland is the excretory organ of Hemichordata (e.g. Balanoglossus).",
    image_url: ""
  },
  {
    q_num: 110,
    question_text: "Animal having two chambered venous heart, amphicoelous vertebrae and mesodermal scales belongs to",
    options: [
      "Amphibia",
      "Pisces",
      "Reptiles",
      "Aves"
    ],
    correct_index: 1,
    solution: "Class Pisces (fishes) is characterized by a two-chambered venous heart (one auricle and one ventricle pumping deoxygenated blood), amphicoelous (biconcave) vertebrae, and dermal/mesodermal scales.",
    image_url: ""
  }
];

