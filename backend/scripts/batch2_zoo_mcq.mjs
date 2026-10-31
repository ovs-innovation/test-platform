import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch2Questions = [
  {
    question_number: 31,
    question_text: "Choose the correct option w.r.t. types of bones and their locations:",
    options: [
      "Replacing bone : Skull bones",
      "Dermal bone : Vertebrae",
      "Sesamoid bone : Patella",
      "Endochondral bone : Clavicle"
    ],
    correct_answer: "Sesamoid bone : Patella",
    explanation: "A sesamoid bone is a bone embedded within a tendon. The patella (kneecap) is the largest sesamoid bone in the human body, formed by ossification of the tendon of the quadriceps femoris muscle.",
    difficulty: "medium",
    topic: "Bone Types & Classification"
  },
  {
    question_number: 32,
    question_text: "Choose the correct option w.r.t. types of tissues and their function:",
    options: [
      "Tendon : Connects bone with bone",
      "Ligament : Connects bone with muscle",
      "Areolar : Connects skin with muscle",
      "Brown fat : Substitute of food"
    ],
    correct_answer: "Areolar : Connects skin with muscle",
    explanation: "Areolar connective tissue serves as a support framework for epithelium and connects skin to the underlying muscles (subcutaneous tissue). Tendons attach skeletal muscles to bones, and ligaments attach one bone to another.",
    difficulty: "easy",
    topic: "Connective Tissue Functions"
  },
  {
    question_number: 33,
    question_text: "Choose the incorrect statement with respect to adipose tissue:",
    options: [
      "Brown fat is found in newborn babies and hibernating mammals",
      "Cells of brown fat are multilocular",
      "Brown fat has larger capacity for generating heat as compared to white fat",
      "White fat has cytochrome pigment"
    ],
    correct_answer: "White fat has cytochrome pigment",
    explanation: "Brown fat is richly vascularized and contains abundant mitochondria packed with iron-containing cytochrome oxidase enzymes that give it a brown appearance and mediate non-shivering thermogenesis. White fat lacks this cytochrome concentration.",
    difficulty: "medium",
    topic: "Adipose Tissue - Brown vs White Fat"
  },
  {
    question_number: 34,
    question_text: "Choose the correct option w.r.t. the figure given below:\n(Refer to the image)",
    image_url: diagrams.zoo_q34_areolar,
    options: [
      "a-Macrophage, b-Fibroblast, c-Collagen fibres, d-Mast cells",
      "a-Adipocytes, b-Mast cells, c-Collagen fibres, d-Macrophage",
      "a-Macrophage, b-Fibroblast, c-Collagen fibres, d-Plasma cells",
      "a-Plasma cells, b-Fibroblast, c-Collagen fibres, d-Mast cells"
    ],
    correct_answer: "a-Macrophage, b-Fibroblast, c-Collagen fibres, d-Mast cells",
    explanation: "According to NCERT Figure 7.4 (Areolar tissue): 'a' is a large amoeboid macrophage (phagocytic), 'b' is a fibroblast (spindle-shaped, producing fibres), 'c' represents thick collagen fibre bundles, and 'd' is a mast cell (secreting histamine, heparin, serotonin).",
    difficulty: "easy",
    topic: "Areolar Connective Tissue Diagram"
  },
  {
    question_number: 35,
    question_text: "Choose the correct match w.r.t. cartilages and their locations:",
    options: [
      "Hyaline cartilage - Pinna",
      "White fibrocartilage - Intervertebral disc",
      "Yellow fibrocartilage - Nasal septum",
      "Calcified cartilage - Tracheal rings"
    ],
    correct_answer: "White fibrocartilage - Intervertebral disc",
    explanation: "White fibrocartilage is the strongest cartilage containing thick bundles of collagen fibres, found in intervertebral discs and the pubic symphysis. Pinna and epiglottis contain elastic cartilage, whereas nasal septum and tracheal rings contain hyaline cartilage.",
    difficulty: "medium",
    topic: "Types of Cartilage"
  },
  {
    question_number: 36,
    question_text: "Tendons and ligaments are examples of",
    options: [
      "Dense regular connective tissue",
      "Dense irregular connective tissue",
      "Loose connective tissue",
      "Specialised connective tissue"
    ],
    correct_answer: "Dense regular connective tissue",
    explanation: "In dense regular connective tissues, the collagen fibres are present in rows between many parallel bundles of fibres. Tendons and ligaments are classic examples of dense regular connective tissue.",
    difficulty: "easy",
    topic: "Dense Regular Connective Tissue"
  },
  {
    question_number: 37,
    question_text: "A central longitudinal canal within the lamellae of compact bone containing blood vessels and nerves is called as",
    options: [
      "Volkmann canal",
      "Neural canal",
      "Canaliculi",
      "Haversian canal"
    ],
    correct_answer: "Haversian canal",
    explanation: "A Haversian canal (central canal) runs longitudinally through the centre of each osteon (Haversian system) in mammalian compact bone and contains blood vessels, lymphatics, and nerves.",
    difficulty: "easy",
    topic: "Bone Histology - Haversian System"
  },
  {
    question_number: 38,
    question_text: "Read the following statements and choose the correct option:\nI. Osteocytes are non-nucleated cells that develop from osteoprogenitor cells.\nII. Osteocytes differentiate from osteoblasts which have migrated and surrounded by bone matrix that they themselves produce.\nIII. Osteoclasts are responsible for bone resorption or phagocytosis.\nIV. Chondrocytes occur singly or in groups of two, three or four in the lacunae.",
    options: [
      "Only I & II are correct",
      "Only II & III are correct",
      "Only II, III & IV are correct",
      "Only I & IV are correct"
    ],
    correct_answer: "Only II, III & IV are correct",
    explanation: "Statement I is incorrect because osteocytes are nucleated cells trapped in lacunae. Statements II, III, and IV are correct: osteoblasts differentiate into osteocytes when trapped by bone matrix; osteoclasts resorb bone; chondrocytes lie in lacunae as cell nests.",
    difficulty: "hard",
    topic: "Bone & Cartilage Cells"
  },
  {
    question_number: 39,
    question_text: "Identify A, B, C, D respectively from the given diagram:\n(Refer to the image)",
    image_url: diagrams.zoo_q39_bone,
    options: [
      "A-Haversian canal, B-Lamellae, C-Lacuna, D-Osteocyte",
      "A-Haversian canal, B-Lamellae, C-Lacuna, D-Osteoblast",
      "A-Volkmann's canal, B-Canaliculi, C-Lamellae, D-Osteocyte",
      "A-Volkmann's canal, B-Lamellae, C-Canaliculi, D-Osteocyte"
    ],
    correct_answer: "A-Haversian canal, B-Lamellae, C-Lacuna, D-Osteocyte",
    explanation: "In the cross-section of a mammalian compact bone osteon: 'A' is the central Haversian canal, 'B' represents the concentric lamellae of bone matrix, 'C' is a fluid-filled cavity called lacuna, and 'D' is the mature bone cell (osteocyte) within the lacuna.",
    difficulty: "medium",
    topic: "Mammalian Bone Architecture"
  },
  {
    question_number: 40,
    question_text: "Describe the multi-unit smooth muscles from the following:",
    options: [
      "Uterus and blood vessels",
      "Arrector pili of skin",
      "Intestine",
      "Urinary bladder"
    ],
    correct_answer: "Arrector pili of skin",
    explanation: "Multi-unit smooth muscles consist of distinct, independently functioning muscle fibres each innervated by a motor neuron terminal (e.g., arrector pili muscles of hairs, ciliary muscles and iris of eye, walls of large arteries). Hollow visceral organs (uterus, intestine, bladder) have single-unit (visceral) smooth muscle.",
    difficulty: "hard",
    topic: "Types of Smooth Muscle"
  },
  {
    question_number: 41,
    question_text: "Choose the correct option regarding adipose tissue:\nI. It is a modified loose connective tissue composed of adipocytes.\nII. Its main role is to insulate the body and forms a cushion around visceral organs.\nIII. Unilocular adipocytes are found in white fat.",
    options: [
      "I, II & III are correct",
      "Only I & II are correct",
      "Only I & III are correct",
      "Only II & III are correct"
    ],
    correct_answer: "I, II & III are correct",
    explanation: "All three statements are correct: adipose tissue is loose connective tissue specialized for lipid storage; it acts as a thermal insulator and shock absorber around kidneys and eyeballs; white fat cells have a single large lipid droplet (unilocular).",
    difficulty: "medium",
    topic: "Adipose Tissue Features"
  },
  {
    question_number: 42,
    question_text: "Identify the correct statement regarding skeletal muscle:",
    options: [
      "Individual myofibrils of skeletal muscle contain numerous myofilaments",
      "The arrangement of thick and thin filaments gives the myofibril an alternate dark and light banded appearance",
      "In a resting muscle, Z-lines of sarcomere move towards H-zone",
      "Both (1) and (2)"
    ],
    correct_answer: "Both (1) and (2)",
    explanation: "Myofibrils consist of thick (myosin) and thin (actin) myofilaments arranged in an orderly parallel manner, producing the characteristic cross-striated alternate dark (A) and light (I) bands.",
    difficulty: "medium",
    topic: "Skeletal Muscle Ultrastructure"
  },
  {
    question_number: 43,
    question_text: "Which is incorrect w.r.t. smooth muscle fibre?",
    options: [
      "Uninucleate",
      "Spindle-shaped, tapered at both ends",
      "Have attachment with bones",
      "Involuntary in nature"
    ],
    correct_answer: "Have attachment with bones",
    explanation: "Smooth muscle fibres are fusiform (tapered at both ends), unstriated, uninucleate, and involuntary. They line the walls of hollow internal organs (like gut and blood vessels); they do not attach to skeleton/bones.",
    difficulty: "easy",
    topic: "Smooth Muscle Characteristics"
  },
  {
    question_number: 44,
    question_text: "Largest amount of extracellular matrix is present in",
    options: [
      "Areolar tissue",
      "Voluntary muscles",
      "Lining of urinary bladder",
      "Adipose tissue"
    ],
    correct_answer: "Areolar tissue",
    explanation: "Areolar tissue has loose, widely separated fibres and abundant semi-fluid ground substance (extracellular matrix) filling spaces between organs.",
    difficulty: "medium",
    topic: "Loose Connective Tissue Matrix"
  },
  {
    question_number: 45,
    question_text: "Which of the following is not a cartilage bone?",
    options: [
      "Humerus",
      "Femur",
      "Clavicle",
      "Vertebra"
    ],
    correct_answer: "Clavicle",
    explanation: "Cartilage bones (endochondral bones) ossify within pre-existing hyaline cartilage (e.g. humerus, femur, vertebrae). The clavicle (collar bone) and skull vault bones are investing/membranous bones formed by intramembranous ossification in mesenchymal sheets.",
    difficulty: "hard",
    topic: "Endochondral vs Membranous Ossification"
  },
  {
    question_number: 46,
    question_text: "Which of the following is not true for cardiac fibres?",
    options: [
      "One stimulus is enough for multipolar fibres",
      "Involuntary nature of heart only",
      "Fusion of cell membranes forms intercalated disc",
      "Has tight junction and prevents cell passing"
    ],
    correct_answer: "Has tight junction and prevents cell passing",
    explanation: "Intercalated discs of cardiac muscle contain gap junctions that allow electrical signals and ions to pass rapidly from cell to cell (functioning as a functional syncytium), not tight junctions that block passage.",
    difficulty: "medium",
    topic: "Cardiac Muscle & Intercalated Discs"
  },
  {
    question_number: 47,
    question_text: "Select the membranous bone:",
    options: [
      "Clavicle",
      "Rib",
      "Vertebra",
      "Patella"
    ],
    correct_answer: "Clavicle",
    explanation: "Membranous bones (dermal bones) are formed by intramembranous ossification directly in embryonic mesenchymal tissue without a cartilaginous precursor. The human clavicle is a membranous bone (partially endochondral at tips).",
    difficulty: "medium",
    topic: "Membranous Bones"
  },
  {
    question_number: 48,
    question_text: "Choose the correct statement regarding Haversian system:",
    options: [
      "Centre of Haversian system has transverse channels called Haversian canal",
      "Haversian canals are connected through transverse channels called Volkmann's canal",
      "Haversian canal is present in spongy bone",
      "Haversian canal carries blood vessels and nerve fibres"
    ],
    correct_answer: "Haversian canals are connected through transverse channels called Volkmann's canal",
    explanation: "Haversian canals run longitudinal along the bone length and are interconnected with each other and with the periosteum via transverse/oblique channels called Volkmann's canals (perforating canals).",
    difficulty: "medium",
    topic: "Haversian & Volkmann Canals"
  },
  {
    question_number: 49,
    question_text: "Find the incorrect match:",
    options: [
      "Patella — Sesamoid bone",
      "Cranial bone — Investing / membrane bone",
      "Humerus — Replacing bone",
      "Tarsal bone — Sesamoid bone"
    ],
    correct_answer: "Tarsal bone — Sesamoid bone",
    explanation: "Tarsal bones are short cartilage (replacing/endochondral) bones. Sesamoid bones in humans are the patella (in quadriceps tendon) and pisiform bone of the carpus (in flexor carpi ulnaris tendon).",
    difficulty: "medium",
    topic: "Classification of Bones"
  },
  {
    question_number: 50,
    question_text: "Select the incorrect statement regarding muscular tissue:",
    options: [
      "Several bundles of skeletal muscle fibres are enclosed in a dense connective tissue covering called epimysium",
      "Skeletal muscle fibres are multinucleated",
      "Skeletal muscle fibres are branched",
      "Nuclei are peripheral in cylindrical shaped skeletal muscle fibres"
    ],
    correct_answer: "Skeletal muscle fibres are branched",
    explanation: "Skeletal muscle fibres are unbranched, cylindrical syncytia with peripheral nuclei. Cardiac muscle fibres are the ones that are branched with central nuclei.",
    difficulty: "easy",
    topic: "Muscle Tissue Comparative Features"
  },
  {
    question_number: 51,
    question_text: "How many of the following are avascular?\na. Epithelium\nb. Muscle\nc. Cartilage\nd. Bone\n\nSelect the correct option:",
    options: [
      "Four",
      "Three",
      "Two",
      "One"
    ],
    correct_answer: "Two",
    explanation: "Epithelium (a) and Cartilage (c) are both completely avascular tissues lacking direct capillary blood supply. In contrast, muscle and bone are richly vascularized. Thus, exactly two tissues are avascular.",
    difficulty: "medium",
    topic: "Vascularity of Primary Tissues"
  },
  {
    question_number: 52,
    question_text: "Choose the incorrectly matched pair:",
    options: [
      "Single unit smooth muscle - Urinary bladder",
      "Intercalated disc - Cardiac muscle",
      "Storage of energy - Adipose tissue",
      "Tight junction - Cardiac muscles"
    ],
    correct_answer: "Tight junction - Cardiac muscles",
    explanation: "Cardiac muscle cells are joined together by intercalated discs with gap junctions (communicating junctions) and adhering junctions (desmosomes), not tight junctions.",
    difficulty: "easy",
    topic: "Cardiac Junctions"
  },
  {
    question_number: 53,
    question_text: "Which of the following is not correctly matched?",
    options: [
      "Brown fat — Store house of food",
      "Chondrocytes — Present in the matrix of cartilage",
      "Decalcified bone — Has lost calcium salts",
      "Perichondrium — Fibrous sheath of cartilage"
    ],
    correct_answer: "Brown fat — Store house of food",
    explanation: "White fat functions as the storehouse of excess energy (triglycerides). Brown fat is rich in mitochondria and is specialized for non-shivering thermogenesis (heat production) rather than food storage.",
    difficulty: "medium",
    topic: "Connective Tissue Matching"
  },
  {
    question_number: 54,
    question_text: "Identify the statements as True (T) or False (F) and choose the correct option:\nI. Cartilage always contains abundant fibres.\nII. Fibrous cartilage is found in the intervertebral disc.\nIII. Eustachian tube has elastic cartilage.\nIV. Single-unit smooth muscle fibres are joined by gap junctions.",
    options: [
      "I-F, II-T, III-T, IV-T",
      "I-T, II-T, III-F, IV-T",
      "I-F, II-F, III-T, IV-T",
      "I-T, II-F, III-T, IV-F"
    ],
    correct_answer: "I-F, II-T, III-T, IV-T",
    explanation: "Hyaline cartilage has a clear, glassy matrix with very fine sub-microscopic collagen fibrils (not abundant prominent fibres, so I is false). White fibrous cartilage forms intervertebral discs (II is true). Eustachian tube has elastic cartilage (III is true). Unitary smooth muscle cells are electrically coupled by gap junctions (IV is true).",
    difficulty: "hard",
    topic: "Cartilage and Smooth Muscle Physiology"
  },
  {
    question_number: 55,
    question_text: "Match the columns and choose the correct option:\nColumn A:\n(i) Plasma cell\n(ii) Mast cell\n(iii) Fibroblasts\n\nColumn B:\nA. Produce fibres\nB. Modified B-lymphocytes\nC. Produce histamine\nD. Secrete matrix\nE. Produce antibodies",
    options: [
      "(i)-B,E; (ii)-C; (iii)-A,D",
      "(i)-C,E; (ii)-A; (iii)-B,D",
      "(i)-B; (ii)-C,D; (iii)-A,E",
      "(i)-E; (ii)-C; (iii)-A,B"
    ],
    correct_answer: "(i)-B,E; (ii)-C; (iii)-A,D",
    explanation: "Plasma cells are differentiated B-lymphocytes that synthesize antibodies (i-B,E); mast cells secrete histamine, serotonin, and heparin (ii-C); fibroblasts secrete collagen/elastic fibres and amorphous ground substance matrix (iii-A,D).",
    difficulty: "medium",
    topic: "Connective Tissue Cells"
  },
  {
    question_number: 56,
    question_text: "Which of the following statements is incorrect w.r.t. bones?",
    options: [
      "Hard, non-pliable ground substance rich in calcium salts and collagen fibres",
      "Matrix occurs in concentric lamellae",
      "Osteocytes found in spaces called lacunae",
      "Haversian canals present in both compact and spongy bones"
    ],
    correct_answer: "Haversian canals present in both compact and spongy bones",
    explanation: "Haversian systems (osteons with Haversian canals) are characteristic structural units of mammalian COMPACT bone. Spongy (cancellous) bone consists of an open lattice of trabeculae and lacks Haversian systems.",
    difficulty: "medium",
    topic: "Compact vs Spongy Bone"
  },
  {
    question_number: 57,
    question_text: "Which cartilage is present at the end of long bones?",
    options: [
      "Calcified cartilage",
      "Hyaline cartilage",
      "Elastic cartilage",
      "Fibrous cartilage"
    ],
    correct_answer: "Hyaline cartilage",
    explanation: "Articular cartilage covering the articulating surfaces of long bones (epiphyses) at synovial joints is hyaline cartilage, providing a smooth, low-friction surface.",
    difficulty: "easy",
    topic: "Articular Hyaline Cartilage"
  },
  {
    question_number: 58,
    question_text: "Lamellae are:",
    options: [
      "Spaces present in matrix of cartilage",
      "Spaces present in vascular tissue",
      "Ring shaped layers of matrix in bone",
      "Concentric rings of cartilage"
    ],
    correct_answer: "Ring shaped layers of matrix in bone",
    explanation: "Lamellae are thin, concentric cylindrical layers/rings of calcified bone matrix surrounding the Haversian canal in compact bone.",
    difficulty: "easy",
    topic: "Bone Lamellae"
  },
  {
    question_number: 59,
    question_text: "Which of the following tissues connect bones with bones?",
    options: [
      "Periosteum - Dense irregular connective tissue",
      "Tendon - Dense regular connective tissue",
      "Ligament - Dense regular connective tissue",
      "Ligament - Dense irregular connective tissue"
    ],
    correct_answer: "Ligament - Dense regular connective tissue",
    explanation: "Ligaments attach bone to another bone and are composed of dense regular connective tissue with parallel bundles of collagen fibres and some elastic fibres.",
    difficulty: "easy",
    topic: "Ligament Anatomy"
  },
  {
    question_number: 60,
    question_text: "Match the following columns and choose the correct option:\nColumn A:\nA. Hyaline cartilage\nB. Calcified cartilage\nC. Elastic cartilage\nD. White fibrocartilage\n\nColumn B:\n(i) Intervertebral disc\n(ii) Epiglottis\n(iii) Tracheal rings\n(iv) Eustachian tube\n(v) Nasal septum\n(vi) Supra-scapula of frog",
    options: [
      "A-(iii),(v); B-(vi); C-(ii),(iv); D-(i)",
      "A-(ii),(iv); B-(vi); C-(iii),(v); D-(i)",
      "A-(i); B-(vi); C-(ii); D-(iii)",
      "A-(vi); B-(iii); C-(iv); D-(i)"
    ],
    correct_answer: "A-(iii),(v); B-(vi); C-(ii),(iv); D-(i)",
    explanation: "Hyaline cartilage is in tracheal rings and nasal septum (A-iii,v); calcified cartilage is in suprascapula of frog (B-vi); elastic cartilage is in epiglottis and Eustachian tube (C-ii,iv); white fibrocartilage forms intervertebral discs (D-i).",
    difficulty: "hard",
    topic: "Cartilage Types in Vertebrates"
  },
  {
    question_number: 61,
    question_text: "Select the incorrect match:",
    options: [
      "Fibroblast — Matrix and fibres",
      "Mast cell — Histamine, heparin, serotonin",
      "Adipocytes — Lipid storage",
      "Osteocyte — Matrix of cartilage"
    ],
    correct_answer: "Osteocyte — Matrix of cartilage",
    explanation: "Osteocytes are bone cells situated in lacunae of bone matrix. Cells present in the matrix of cartilage are called chondrocytes.",
    difficulty: "easy",
    topic: "Cell Types of Connective Tissues"
  },
  {
    question_number: 62,
    question_text: "Identify the statements as True (T) or False (F) and choose the correct option:\nI. Cartilage is avascular and shows unidirectional growth.\nII. Matrix of bone is made up of inorganic salts only.\nIII. In decalcified bone, bone marrow is destroyed.\nIV. Haversian canals are surrounded by concentric rings of lamellae.",
    options: [
      "I-T, II-F, III-F, IV-T",
      "I-T, II-T, III-F, IV-T",
      "I-F, II-F, III-T, IV-T",
      "I-F, II-T, III-F, IV-F"
    ],
    correct_answer: "I-T, II-F, III-F, IV-T",
    explanation: "Cartilage is avascular (I is true); bone matrix contains both organic collagen protein (30-40%) and inorganic mineral salts (60-70%) (II is false); decalcification removes minerals using dilute acid without destroying bone marrow/organic framework (III is false); concentric lamellae surround Haversian canals (IV is true).",
    difficulty: "hard",
    topic: "Bone & Cartilage True/False"
  },
  {
    question_number: 63,
    question_text: "Which of the following is correctly matched w.r.t. a, b, c?\n(Refer to the image)",
    image_url: diagrams.zoo_q63_connective,
    options: [
      "a & b — Dense regular connective tissue",
      "b — Present in skin",
      "c — Fat storing tissue",
      "Both (2) and (3)"
    ],
    correct_answer: "Both (2) and (3)",
    explanation: "In the diagrams: 'a' represents dense regular connective tissue (tendon/ligament), 'b' represents dense irregular connective tissue present in the dermis of skin, and 'c' represents adipose tissue (fat storage).",
    difficulty: "medium",
    topic: "Dense & Loose Connective Tissue Diagrams"
  },
  {
    question_number: 64,
    question_text: "Select the incorrect statement:",
    options: [
      "Eosinophil plays an important role in allergic response",
      "RBC shows aerobic metabolism to produce energy",
      "Diapedesis is an important step in inflammation",
      "Flow of lymph is unidirectional"
    ],
    correct_answer: "RBC shows aerobic metabolism to produce energy",
    explanation: "Mature mammalian erythrocytes lack mitochondria and nuclei; consequently, they cannot carry out the Krebs cycle or oxidative phosphorylation and derive their ATP strictly through anaerobic glycolysis.",
    difficulty: "medium",
    topic: "Blood Cells & Metabolism"
  },
  {
    question_number: 65,
    question_text: "Epiphysis and diaphysis of bone are made of:",
    options: [
      "Spongy and compact bone respectively",
      "Compact and compact bone respectively",
      "Compact and trabecular bone respectively",
      "Trabecular and spongy bone respectively"
    ],
    correct_answer: "Spongy and compact bone respectively",
    explanation: "The expanded ends of a long bone (epiphyses) consist of spongy (cancellous) bone containing red bone marrow, while the elongated central shaft (diaphysis) is composed of dense compact bone surrounding the medullary cavity.",
    difficulty: "easy",
    topic: "Long Bone Anatomy"
  }
];
