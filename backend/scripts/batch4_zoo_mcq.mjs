
import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch4Questions = [
  {
    question_number: 101,
    question_text: "In frog, the only respiratory structure active during hibernation and aestivation is",
    options: [
      "Lungs",
      "Gills",
      "Skin",
      "Buccopharyngeal cavity"
    ],
    correct_answer: "Skin",
    explanation: "During aestivation (summer sleep) and hibernation (winter sleep), gaseous exchange in frog takes place exclusively through skin (cutaneous respiration), keeping the skin moist by mucous secretion.",
    difficulty: "easy",
    topic: "Respiration in Frog"
  },
  {
    question_number: 102,
    question_text: "Common feature of earthworm and cockroach:",
    options: [
      "Hermaphroditism",
      "Ventral nerve cord",
      "Excretion by nephridia",
      "Moulting by shedding"
    ],
    correct_answer: "Ventral nerve cord",
    explanation: "Both annelids (earthworm) and arthropods (cockroach) possess a central nervous system consisting of a nerve ring and a solid, double, ventral nerve cord with segmentally arranged ganglia.",
    difficulty: "easy",
    topic: "Comparative Animal Morphology"
  },
  {
    question_number: 103,
    question_text: "Visual units that compose the compound eye in insects are called",
    options: [
      "Osphradia",
      "Ommatidia",
      "Onychophores",
      "Odontophores"
    ],
    correct_answer: "Ommatidia",
    explanation: "Each compound eye of a cockroach consists of about 2000 hexagonal visual units called ommatidia (singular: ommatidium), giving rise to mosaic vision.",
    difficulty: "easy",
    topic: "Cockroach Ommatidia"
  },
  {
    question_number: 104,
    question_text: "The gizzard of cockroach is",
    options: [
      "Followed by crop",
      "Having an outer layer of thick circular muscles with six highly chitinous teeth on inside",
      "Provided with a ring of 6-8 blind tubules called hepatic caecae",
      "Present at the junction of midgut and hindgut"
    ],
    correct_answer: "Having an outer layer of thick circular muscles with six highly chitinous teeth on inside",
    explanation: "The gizzard (proventriculus) has an outer layer of thick circular muscles and thick inner cuticle forming six highly chitinous plates or teeth used for grinding food particles.",
    difficulty: "medium",
    topic: "Alimentary Canal of Cockroach - Gizzard"
  },
  {
    question_number: 105,
    question_text: "How many of the given statements (i to v) are true for frog?\n(i) Medulla oblongata passes out through foramen magnum into spinal cord.\n(ii) Vasa efferentia open into Bidder's canal.\n(iii) Ovaries have no functional connection with kidneys.\n(iv) Excretory system consists of a pair of kidneys, a pair of ureters, and a pair of urinary bladders.\n(v) In female, large intestine, urinary bladder, ureter and oviduct open into cloaca.",
    options: [
      "Four",
      "Three",
      "Two",
      "Five"
    ],
    correct_answer: "Four",
    explanation: "Statements (i), (ii), (iii), and (v) are true (4 statements). Statement (iv) is false because frog has a single thin-walled median urinary bladder ventral to the rectum, not a pair.",
    difficulty: "hard",
    topic: "Frog Internal Anatomy"
  },
  {
    question_number: 106,
    question_text: "The correct sequence of arrangements of segments in the leg of cockroach is:",
    options: [
      "Coxa, femur, trochanter, tibia, tarsus",
      "Coxa, trochanter, femur, tibia, tarsus",
      "Tibia, trochanter, femur, tarsus, coxa",
      "Trochanter, coxa, tibia, femur, tarsus"
    ],
    correct_answer: "Coxa, trochanter, femur, tibia, tarsus",
    explanation: "From proximal base to distal tip, the five podomeres of a cockroach walking leg are: coxa (broadest), trochanter (small triangular), femur (broad and strong), tibia (longest and spiny), and tarsus (composed of 5 tarsomeres).",
    difficulty: "medium",
    topic: "Cockroach Appendages - Leg Segments"
  },
  {
    question_number: 107,
    question_text: "If corpora allata cells from a developing nymph is removed, then what will be its effect?",
    options: [
      "It remains in nymphal stage as such",
      "Transforms into adult",
      "Metamorphosis fails to take place",
      "Moulting stops"
    ],
    correct_answer: "Transforms into adult",
    explanation: "Corpora allata secretes juvenile hormone (neotenin) which maintains larval/nymphal characteristics. Removal of corpora allata removes the inhibition on adult differentiation, resulting in precocious metamorphosis into a dwarf adult.",
    difficulty: "hard",
    topic: "Cockroach Hormonal Regulation"
  },
  {
    question_number: 108,
    question_text: "In cockroach the flow of haemolymph is:",
    options: [
      "Heart -> ostia -> perivisceral sinus -> pericardial sinus -> head haemocoel -> heart",
      "Heart -> head sinus -> perineural sinus -> perivisceral sinus -> pericardial sinus -> ostia -> heart",
      "Heart -> pericardial sinus -> head haemocoel -> perivisceral sinus -> ostia -> heart",
      "Heart -> head haemocoel -> perivisceral sinus -> ostia -> pericardial sinus -> heart"
    ],
    correct_answer: "Heart -> head sinus -> perineural sinus -> perivisceral sinus -> pericardial sinus -> ostia -> heart",
    explanation: "Heart pumps haemolymph anteriorly via anterior aorta into the head sinus; haemolymph flows backward through perineural and perivisceral sinuses into the pericardial sinus, and re-enters the heart chambers through ostia during diastole.",
    difficulty: "hard",
    topic: "Circulatory System of Cockroach"
  },
  {
    question_number: 109,
    question_text: "Select the figure which is masticatory in function:\n(Refer to the image)",
    image_url: diagrams.zoo_q109_mouthparts,
    options: [
      "A",
      "B",
      "C",
      "D"
    ],
    correct_answer: "B",
    explanation: "Figure B represents the paired mandibles of cockroach, which possess sharp cutting and grinding teeth (dentes) at their inner margins used to crush and masticate solid food particles.",
    difficulty: "easy",
    topic: "Cockroach Mouthparts - Mandibles"
  },
  {
    question_number: 110,
    question_text: "All of the following statements about Periplaneta americana are correct but one is wrong. Which one is wrong?",
    options: [
      "It has mosaic vision with more sensitivity but less resolution",
      "It shows paurometabolous development",
      "It has a dorsal nerve cord",
      "Sclerites are joined to each other by a thin and flexible arthrodial membrane"
    ],
    correct_answer: "It has a dorsal nerve cord",
    explanation: "Cockroach is an invertebrate (Arthropoda) and possesses a ventral, solid, and double nerve cord. Dorsal hollow nerve cords are exclusive to chordates.",
    difficulty: "easy",
    topic: "Characteristics of Cockroach"
  },
  {
    question_number: 111,
    question_text: "Identify the statements as True (T) and False (F) and choose the correct option:\n(A) Vision of cockroach has more sensitivity and less resolution.\n(B) Spermatheca of cockroach is present in 2nd segment.\n(C) Gonapophyses are part of female cockroach only.\n(D) Fertilization in cockroach takes place in external genitalia (genital chamber).\n(E) On an average female cockroach produces 9-10 oothecae, each containing 14-16 eggs.",
    options: [
      "A-T, B-F, C-F, D-T, E-T",
      "A-T, B-T, C-F, D-T, E-F",
      "A-F, B-F, C-T, D-T, E-T",
      "A-T, B-F, C-T, D-F, E-T"
    ],
    correct_answer: "A-T, B-F, C-F, D-T, E-T",
    explanation: "(A) True: mosaic vision has high sensitivity, low resolution. (B) False: spermatheca is in the 6th abdominal segment. (C) False: male also has gonapophyses (phallomeres). (D) True: ova are fertilized by stored sperm inside the genital chamber. (E) True: 9-10 oothecae, each with 14-16 eggs.",
    difficulty: "hard",
    topic: "Cockroach Biology True/False"
  },
  {
    question_number: 112,
    question_text: "Read the following:\n(A) Spiracle\n(B) Tergo-sternal muscle\n(C) Tracheoles\n(D) Pharynx\n(E) Gonapophyses\n\nHow many are related to respiration of cockroach?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_answer: "Three",
    explanation: "Spiracles (10 pairs of respiratory openings), tracheoles (fine branching respiratory tubules), and tergo-sternal muscles (whose contraction and relaxation cause expiration and inspiration by altering abdominal volume) are directly related to respiration (3 structures).",
    difficulty: "medium",
    topic: "Respiratory Structures in Cockroach"
  },
  {
    question_number: 113,
    question_text: "Which of the following is incorrect w.r.t. frog?",
    options: [
      "Bidder's canal is present in kidney",
      "Larva excrete ammonia through kidney",
      "Adult frog has mesonephric kidney",
      "Adult frog show positive pressure breathing"
    ],
    correct_answer: "Larva excrete ammonia through kidney",
    explanation: "Tadpole larva of frog is ammonotelic, but it excretes ammonia primarily through the skin and gills into water by simple diffusion, rather than by functional kidneys.",
    difficulty: "hard",
    topic: "Frog Excretory System & Development"
  },
  {
    question_number: 114,
    question_text: "In cockroach the type of heart is",
    options: [
      "Myogenic",
      "Neurogenic",
      "Non-pulsatile",
      "Paired circular ring like structure"
    ],
    correct_answer: "Neurogenic",
    explanation: "The heartbeat in cockroach and other arthropods is neurogenic, initiated and regulated by nerve impulses originating from the cardiac nerve ganglion on the heart wall.",
    difficulty: "easy",
    topic: "Heart of Cockroach"
  },
  {
    question_number: 115,
    question_text: "Choose the correct statement regarding frog:",
    options: [
      "Upper eyelid is almost immovable",
      "Renal portal system is present but hepatic portal system is absent",
      "Truncus arteriosus arises from the dorsal side of ventricle",
      "RBC are nucleated, oval and biconcave"
    ],
    correct_answer: "Upper eyelid is almost immovable",
    explanation: "In frog, the upper eyelid is virtually immovable, while the lower eyelid is movable and extends into a transparent nictitating membrane. Both renal portal and hepatic portal systems are present; truncus arteriosus arises from ventral ventricle; RBCs are oval, nucleated, and biconvex.",
    difficulty: "medium",
    topic: "Frog Organ Systems"
  },
  {
    question_number: 116,
    question_text: "Which of the following pair is incorrect w.r.t. cockroach?",
    options: [
      "Anal cercus — Sensitive to vibrations",
      "Alary muscles — Circulation of haemolymph",
      "Spiracles — Analogous to nostril",
      "Corpora allata — Secretes ecdysone"
    ],
    correct_answer: "Corpora allata — Secretes ecdysone",
    explanation: "Corpora allata secretes juvenile hormone (neotenin). Ecdysone (moulting hormone) is secreted by the prothoracic gland.",
    difficulty: "medium",
    topic: "Cockroach Structures and Secretions"
  },
  {
    question_number: 117,
    question_text: "Which of the following is absent in male frog?",
    options: [
      "Vocal sacs",
      "Corpus luteum",
      "Nuptial pad",
      "Mesonephric kidney"
    ],
    correct_answer: "Corpus luteum",
    explanation: "Corpus luteum is a temporary endocrine structure formed in the mammalian ovary after ovulation; it is completely absent in amphibians like frogs. Male frogs have vocal sacs, copulatory pads on first digit, and mesonephric kidneys.",
    difficulty: "easy",
    topic: "Sexual Dimorphism in Frog"
  },
  {
    question_number: 118,
    question_text: "Which of the following is incorrect?",
    options: [
      "Calciferous glands are present in earthworm",
      "Bidder's canal is present in kidney of frog",
      "Malpighian tubules are present between midgut and hindgut in cockroach",
      "Anal cercus is unjointed in cockroach"
    ],
    correct_answer: "Anal cercus is unjointed in cockroach",
    explanation: "Anal cerci are paired, jointed (15-segmented) filamentous sensory appendages present on the 10th abdominal tergum of both male and female cockroaches. Anal styles (found in males only) are unjointed.",
    difficulty: "easy",
    topic: "Cockroach Appendages & General Invertebrates"
  },
  {
    question_number: 119,
    question_text: "How many statement(s) is/are correct w.r.t. cockroach?\nI. Female cockroach on an average produces 9-10 oothecae.\nII. Each ootheca contains 14-16 eggs.\nIII. Gizzard is the largest part of foregut where food is stored.\nIV. Thirteen funnel-like chambers are found in heart.\nV. Three pairs of legs are found in abdominal region.",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_answer: "Three",
    explanation: "Statements I, II, and IV are correct (3 statements). Statement III is incorrect because the crop (not gizzard) is the sac-like organ used for storing food. Statement V is incorrect because the three pairs of walking legs arise from the thoracic region (pro, meso, meta), not abdomen.",
    difficulty: "medium",
    topic: "Cockroach Comprehensive Review"
  },
  {
    question_number: 120,
    question_text: "Which of the following is incorrect match w.r.t. cockroach?\nStructure | Function",
    options: [
      "Male phallomeres — 3 in number",
      "Utriculi breviores — Nutrition of sperm",
      "Conglobate glands — Secretion of ootheca",
      "Ejaculatory duct — Secretion of middle layer of spermatophore"
    ],
    correct_answer: "Conglobate glands — Secretion of ootheca",
    explanation: "Conglobate gland (phallic gland) is a club-shaped accessory gland in the male reproductive system that secretes the outer layer of the spermatophore. Ootheca is secreted by collaterial glands in the female reproductive system.",
    difficulty: "hard",
    topic: "Cockroach Male Reproductive Glands"
  },
  {
    question_number: 121,
    question_text: "What is correct about anal style pair in cockroach?",
    options: [
      "Found in male cockroach only",
      "Attached to the 10th tergum",
      "These are segmented while anal cerci are unsegmented",
      "Chemosensitive in nature"
    ],
    correct_answer: "Found in male cockroach only",
    explanation: "Anal styles are a pair of short, unjointed thread-like processes present on the 9th abdominal sternum in male cockroaches only, absent in females. Anal cerci are present in both sexes on the 10th tergum.",
    difficulty: "easy",
    topic: "Anal Styles vs Anal Cerci"
  },
  {
    question_number: 122,
    question_text: "Which is correct for the wings of cockroach?",
    options: [
      "Tegmina are transparent, light and leathery",
      "Mesothoracic wings are light and membranous",
      "Elytra are metathoracic wings",
      "Prothorax wings are absent in cockroach"
    ],
    correct_answer: "Prothorax wings are absent in cockroach",
    explanation: "In insects/cockroach, wings arise only from the second and third thoracic segments (mesothorax and metathorax). The prothorax bears legs but lacks wings.",
    difficulty: "easy",
    topic: "Wings of Cockroach"
  },
  {
    question_number: 123,
    question_text: "Find the correct pair:",
    options: [
      "Labrum — upper lip and Labium — lower lip",
      "Labrum — lower lip and Labium — upper lip",
      "Maxillae and hypopharynx — paired mouth parts",
      "Mandibles and hypopharynx — unpaired mouth parts"
    ],
    correct_answer: "Labrum — upper lip and Labium — lower lip",
    explanation: "In cockroach mouthparts: labrum is the upper lip, labium is the lower lip, mandibles and maxillae are paired appendages, and hypopharynx is the unpaired median tongue-like structure.",
    difficulty: "easy",
    topic: "Mouthparts of Cockroach"
  },
  {
    question_number: 124,
    question_text: "Choose the correct information about the cockroach:",
    options: [
      "Second to last nymphal stage has false wings while adult cockroach has wings",
      "Metamorphosis of cockroach involves 12 moultings",
      "Tibia is the longest segment in the leg",
      "Development is hemimetabolous type"
    ],
    correct_answer: "Tibia is the longest segment in the leg",
    explanation: "In cockroach legs, the tibia is the longest and spiniest podomere. Cockroach undergoes 13 moultings, development is paurometabolous, and wing pads (not false wings) appear in the next to last nymphal stage.",
    difficulty: "medium",
    topic: "Cockroach Anatomy Details"
  },
  {
    question_number: 125,
    question_text: "Match the Column A and select the correct option with respect to cockroach:\nColumn A:\n1. Ootheca\n2. Spermatheca\n3. Outer wall of spermatophore\n4. Inner wall of spermatophore\n\nColumn B:\nA. Phallic gland\nB. Mushroom gland\nC. Collaterial gland\nD. Collects sperms",
    options: [
      "1-C, 2-A, 3-D, 4-B",
      "1-C, 2-D, 3-A, 4-B",
      "1-B, 2-A, 3-C, 4-D",
      "1-A, 2-C, 3-B, 4-D"
    ],
    correct_answer: "1-C, 2-D, 3-A, 4-B",
    explanation: "Ootheca is secreted by female collaterial glands (1-C); spermatheca stores sperm received during copulation (2-D); outer layer of spermatophore is secreted by phallic/conglobate gland (3-A); inner layer is formed by secretions of the mushroom gland / utriculi (4-B).",
    difficulty: "hard",
    topic: "Spermatophore and Ootheca Formation"
  },
  {
    question_number: 126,
    question_text: "Which of the following glands of cockroach helps in excretion?",
    options: [
      "Collaterial gland",
      "Phallic gland",
      "Uricose gland",
      "Conglobate gland"
    ],
    correct_answer: "Uricose gland",
    explanation: "Uricose glands (long blind tubules located at the periphery of the mushroom gland in male cockroach) store uric acid and discharge it over spermatophores during copulation, playing an excretory role.",
    difficulty: "medium",
    topic: "Uricose Gland Excretion"
  },
  {
    question_number: 127,
    question_text: "The development of Periplaneta americana is",
    options: [
      "Hemimetabolous",
      "Ametabolous",
      "Holometabolous",
      "Paurometabolous"
    ],
    correct_answer: "Paurometabolous",
    explanation: "The development of Periplaneta americana is paurometabolous (gradual metamorphosis through nymphal instars that resemble the adult in general body form except for wings and developed gonads).",
    difficulty: "easy",
    topic: "Metamorphosis in Periplaneta"
  },
  {
    question_number: 128,
    question_text: "Which structure of cockroach has sensory receptors that help in monitoring the environment?",
    options: [
      "Ocellus",
      "Antennae",
      "Wings",
      "Hepatic caecae"
    ],
    correct_answer: "Antennae",
    explanation: "According to NCERT, antennae have sensory tactile and olfactory receptors that monitor the environment as the cockroach walks.",
    difficulty: "easy",
    topic: "Sensory Receptors in Cockroach"
  },
  {
    question_number: 129,
    question_text: "Which one of the following statements is incorrect w.r.t. heart of frog?",
    options: [
      "It has three chambers, two atria and one ventricle",
      "It is covered by a membrane called pericardium",
      "It receives blood through vena cava which open in sinus venosus joining left atrium",
      "The ventricle opens into a sac-like conus arteriosus on the ventral side of heart"
    ],
    correct_answer: "It receives blood through vena cava which open in sinus venosus joining left atrium",
    explanation: "The sinus venosus is a triangular chamber that receives deoxygenated blood from the major veins (vena cavae) and opens into the RIGHT atrium, not the left atrium.",
    difficulty: "medium",
    topic: "Circulatory System of Frog"
  },
  {
    question_number: 130,
    question_text: "How many statement(s) is/are correct about frog?\nI. Sound producing vocal sacs are found in male.\nII. In male, copulatory pads are found on the first digit of the fore limbs.\nIII. Tongue of frog is bifid.\n\nSelect the correct option:",
    options: [
      "One",
      "Two",
      "Three",
      "Zero"
    ],
    correct_answer: "Three",
    explanation: "All three statements are correct: male frogs have vocal sacs and copulatory (nuptial) pads on the first digit of forelimbs; the muscular tongue of frog is bilobed (bifid) and attached at the anterior margin.",
    difficulty: "easy",
    topic: "Frog Morphology & Dimorphism"
  },
  {
    question_number: 131,
    question_text: "How many statement(s) is/are correct about cockroach?\nI. Female cockroach on an average produces 9-10 oothecae.\nII. Each ootheca contains 14-16 eggs.\nIII. Gizzard consists of six chitinous teeth.\nIV. Thirteen segments are found in heart.\nV. Three pairs of legs are found in abdominal region.",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_answer: "Four",
    explanation: "Statements I, II, III, and IV are correct (4 statements). Statement V is incorrect because the three pairs of walking legs are situated on the thorax, not the abdomen.",
    difficulty: "medium",
    topic: "Cockroach Anatomy Overview"
  },
  {
    question_number: 132,
    question_text: "Which of the following is wrong match in cockroach?\nStructure | Function",
    options: [
      "Utriculi majores — Secretion of inner layer of spermatophore",
      "Utriculi breviores — Nutrition of sperm",
      "Conglobate glands — Secretion of ootheca",
      "Ejaculatory duct — Secretion of middle layer of spermatophore"
    ],
    correct_answer: "Conglobate glands — Secretion of ootheca",
    explanation: "Conglobate gland is a male accessory reproductive gland that produces the outermost layer of the spermatophore. Ootheca is secreted by the female collaterial glands.",
    difficulty: "medium",
    topic: "Cockroach Reproductive System Matches"
  }
];
