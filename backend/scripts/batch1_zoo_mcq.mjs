import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch1Questions = [
  {
    question_number: 1,
    question_text: "Cuboidal epithelium is not found in",
    options: [
      "Duct of glands",
      "Thyroid follicle",
      "Germinal epithelium of ovary",
      "Fallopian tube"
    ],
    correct_answer: "Fallopian tube",
    explanation: "Fallopian tubes (oviducts) and bronchioles are lined by ciliated columnar epithelium to move ova or mucus in a specific direction. Ducts of glands, thyroid follicles, and germinal epithelium of ovary are lined by simple cuboidal epithelium.",
    difficulty: "easy",
    topic: "Epithelial Tissue - Simple Cuboidal"
  },
  {
    question_number: 2,
    question_text: "Choose the incorrect match:\nEpithelium | Function\n(1) Columnar epithelium : Absorption, secretion\n(2) Cuboidal epithelium : Secretion, reabsorption\n(3) Squamous epithelium : Filtration, exchange of gases\n(4) Transitional epithelium : Absorption and secretion",
    options: [
      "Columnar epithelium : Absorption, secretion",
      "Cuboidal epithelium : Secretion, reabsorption",
      "Squamous epithelium : Filtration, exchange of gases",
      "Transitional epithelium : Absorption and secretion"
    ],
    correct_answer: "Transitional epithelium : Absorption and secretion",
    explanation: "Transitional epithelium (urothelium) lines the renal pelvis, ureters, and urinary bladder. Its main function is to enable stretching (distensibility) without tearing, preventing fluid leakage. It does not perform absorption or secretion.",
    difficulty: "medium",
    topic: "Epithelial Tissue Functions"
  },
  {
    question_number: 3,
    question_text: "Which type of cell junction helps neighbouring cells to communicate with one another, by connecting their cytoplasm?",
    options: [
      "Desmosome",
      "Gap junction",
      "Tight junction",
      "Adhering junction"
    ],
    correct_answer: "Gap junction",
    explanation: "Gap junctions facilitate the cells to communicate with each other by connecting the cytoplasm of adjoining cells, for rapid transfer of ions, small molecules, and sometimes big molecules.",
    difficulty: "easy",
    topic: "Cell Junctions"
  },
  {
    question_number: 4,
    question_text: "Choose the correct option with respect to the location of this tissue:\n(Refer to the image)",
    image_url: diagrams.zoo_q4_tissue,
    options: [
      "In ducts of glands",
      "In tubular part of nephron",
      "In the inner surface of hollow structures like bronchioles and fallopian tubes",
      "In the walls of blood vessels and air sacs of lungs"
    ],
    correct_answer: "In the inner surface of hollow structures like bronchioles and fallopian tubes",
    explanation: "The given diagram shows ciliated columnar epithelium. If columnar cells bear cilia on their free surface they are called ciliated epithelium, mainly present in the inner surface of hollow organs like bronchioles and fallopian tubes.",
    difficulty: "medium",
    topic: "Ciliated Epithelium"
  },
  {
    question_number: 5,
    question_text: "Gap junctions are not found in",
    options: [
      "Cardiac muscle",
      "Single-unit smooth muscle",
      "Epithelial tissue",
      "Differentiated skeletal muscle"
    ],
    correct_answer: "Differentiated skeletal muscle",
    explanation: "Differentiated skeletal muscle fibres are structurally separate, multinucleated syncytia insulated by endomysium and individually innervated by motor neurons; they do not possess gap junctions.",
    difficulty: "medium",
    topic: "Cell Junctions & Muscle Tissues"
  },
  {
    question_number: 6,
    question_text: "Select the options that correctly represents stratified epithelium:\n(A) Covers dry surface of skin : Keratinised\n(B) Covers moist surface of buccal cavity : Non-keratinised\n(C) Considerably distensible : Transitional",
    options: [
      "A and C only",
      "A and B only",
      "B and C only",
      "A, B and C"
    ],
    correct_answer: "A, B and C",
    explanation: "All three statements correctly represent types of compound/stratified epithelium: dry skin surface has keratinised stratified squamous; moist surfaces like buccal cavity and pharynx have non-keratinised stratified squamous; urinary bladder has transitional epithelium (distensible).",
    difficulty: "medium",
    topic: "Compound Epithelium"
  },
  {
    question_number: 7,
    question_text: "Oesophagus, buccal cavity and pharynx are lined by which type of tissue?",
    options: [
      "Ciliated columnar epithelium",
      "Columnar epithelium",
      "Simple cuboidal epithelium",
      "Non-keratinized stratified squamous epithelium"
    ],
    correct_answer: "Non-keratinized stratified squamous epithelium",
    explanation: "The moist lining of the buccal cavity, pharynx, and oesophagus provides protection against mechanical and chemical abrasion and is composed of non-keratinised stratified squamous epithelium.",
    difficulty: "easy",
    topic: "Compound Epithelium Locations"
  },
  {
    question_number: 8,
    question_text: "Match the columns and choose the correct option:\nColumn A:\n(a) Simple cuboidal epithelium\n(b) Simple squamous epithelium\n(c) Ciliated columnar epithelium\n(d) Compound epithelium\n(e) Brush bordered cuboidal epithelium\n\nColumn B:\n(i) Wall of a blood vessel\n(ii) PCT\n(iii) Germinal epithelium\n(iv) Oviduct\n(v) Moist surface of buccal cavity",
    options: [
      "(a)-(iii), (b)-(i), (c)-(iv), (d)-(v), (e)-(ii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(v), (e)-(iii)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(v), (e)-(ii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii), (e)-(v)"
    ],
    correct_answer: "(a)-(iii), (b)-(i), (c)-(iv), (d)-(v), (e)-(ii)",
    explanation: "Simple cuboidal lines germinal epithelium of ovary (a-iii); simple squamous lines walls of blood vessels (endothelium) (b-i); ciliated columnar lines oviduct/fallopian tube (c-iv); compound epithelium lines moist surface of buccal cavity (d-v); brush bordered cuboidal epithelium lines PCT of nephron (e-ii).",
    difficulty: "medium",
    topic: "Types of Epithelial Tissues"
  },
  {
    question_number: 9,
    question_text: "Match the following columns and choose the correct option:\nColumn I:\n(a) Holocrine gland\n(b) Apocrine gland\n(c) Merocrine gland\n(d) Endocrine gland\n\nColumn II:\n(i) Thyroid gland\n(ii) Salivary gland\n(iii) Tear gland\n(iv) Mammary gland\n(v) Sebaceous gland",
    options: [
      "(a)-(iii), (b)-(iv), (c)-(v), (d)-(i)",
      "(a)-(v), (b)-(iv), (c)-(ii), (d)-(i)",
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(v)",
      "(a)-(v), (b)-(ii), (c)-(iii), (d)-(i)"
    ],
    correct_answer: "(a)-(v), (b)-(iv), (c)-(ii), (d)-(i)",
    explanation: "Holocrine gland sheds entire cells with secretory product (sebaceous gland: a-v); apocrine gland sheds apical portion of cells (mammary gland: b-iv); merocrine gland secretes via exocytosis without cellular loss (salivary/sweat gland: c-ii); endocrine gland is ductless (thyroid gland: d-i).",
    difficulty: "medium",
    topic: "Glandular Epithelium"
  },
  {
    question_number: 10,
    question_text: "Choose the correct option with reference to the characteristics of the given tissues I and II:\n(Refer to the image)",
    image_url: diagrams.zoo_q10_glands,
    options: [
      "I - Cuboidal epithelium, present in ovary\nII - Unicellular gland, secretes enzyme",
      "I - Columnar epithelium, helps in absorption of food\nII - Multicellular gland, secretes sweat, salivary etc.",
      "I - Unicellular gland, secretes mucus\nII - Multicellular gland, secretes sweat, enzyme etc.",
      "I - Compound epithelium which is stratified\nII - Simple epithelium which is ciliated"
    ],
    correct_answer: "I - Columnar epithelium, helps in absorption of food\nII - Multicellular gland, secretes sweat, salivary etc.",
    explanation: "Diagram I shows tall simple columnar epithelial cells involved in absorption and secretion of food in the intestine. Diagram II shows an invaginated multicellular exocrine gland (consisting of clusters of secretory cells).",
    difficulty: "medium",
    topic: "Glands & Epithelium"
  },
  {
    question_number: 11,
    question_text: "Identify the incorrect match:\nType of epithelium | Location\n(1) Simple cuboidal : Duct of glands, Thyroid follicles\n(2) Non-ciliated pseudostratified : Trachea, Large bronchi\n(3) Transitional : Renal pelvis, Urinary bladder\n(4) Stratified non-keratinized : Pharynx, Oesophagus",
    options: [
      "Simple cuboidal : Duct of glands, Thyroid follicles",
      "Non-ciliated pseudostratified : Trachea, Large bronchi",
      "Transitional : Renal pelvis, Urinary bladder",
      "Stratified non-keratinized : Pharynx, Oesophagus"
    ],
    correct_answer: "Non-ciliated pseudostratified : Trachea, Large bronchi",
    explanation: "Trachea and large bronchi are lined by CILIATED pseudostratified columnar epithelium (respiratory epithelium), not non-ciliated. Non-ciliated pseudostratified epithelium is found in parts of the male urethra and epididymis.",
    difficulty: "medium",
    topic: "Pseudostratified Epithelium"
  },
  {
    question_number: 12,
    question_text: "Match the columns and choose the correct option:\nColumn I:\n(A) Zonula occludens\n(B) Interdigitations\n(C) Zonula adherens\n(D) Hemidesmosomes\n\nColumn II:\n(i) Join epithelial cells to basal lamina\n(ii) Intercellular fluid/sub-membrane adhesive materials present between adjacent cells\n(iii) Found in the apical parts of the adjacent epithelial cells\n(iv) Inter-fitting, finger-like projections which increase area of contact between cells",
    options: [
      "(A)-(iii), (B)-(iv), (C)-(ii), (D)-(i)",
      "(A)-(ii), (B)-(i), (C)-(iii), (D)-(iv)",
      "(A)-(i), (B)-(ii), (C)-(iii), (D)-(iv)",
      "(A)-(iv), (B)-(iii), (C)-(i), (D)-(ii)"
    ],
    correct_answer: "(A)-(iii), (B)-(iv), (C)-(ii), (D)-(i)",
    explanation: "Zonula occludens (tight junctions) form an apical seal preventing leakage (A-iii); interdigitations are finger-like projections increasing surface area of adhesion (B-iv); zonula adherens contains adhesive plaques cementing adjacent cells (C-ii); hemidesmosomes anchor the basal surface of epithelial cells to basal lamina (D-i).",
    difficulty: "hard",
    topic: "Specialised Cell Junctions"
  },
  {
    question_number: 13,
    question_text: "Select the structure that contains simple cuboidal epithelium with microvilli:",
    options: [
      "Tunica media",
      "Mammary gland",
      "Proximal convoluted tubule (PCT)",
      "Gustatory epithelium"
    ],
    correct_answer: "Proximal convoluted tubule (PCT)",
    explanation: "The epithelium of proximal convoluted tubule (PCT) of nephron in the kidney has simple cuboidal epithelium with microvilli (brush border) to drastically increase surface area for reabsorption.",
    difficulty: "easy",
    topic: "Brush Border Epithelium"
  },
  {
    question_number: 14,
    question_text: "Match the following and choose the correct option:\nType of gland | Example\n(i) Simple branched tubular\n(ii) Compound alveolar\n(iii) Compound tubulo-alveolar\n(iv) Simple tubular\n\nExample:\n(a) Crypts of Lieberkuhn\n(b) Gastric gland\n(c) Cowper's gland\n(d) Sub-maxillary salivary gland",
    options: [
      "(i)-(d), (ii)-(c), (iii)-(a), (iv)-(b)",
      "(i)-(b), (ii)-(c), (iii)-(d), (iv)-(a)",
      "(i)-(c), (ii)-(a), (iii)-(d), (iv)-(b)",
      "(i)-(b), (ii)-(d), (iii)-(c), (iv)-(a)"
    ],
    correct_answer: "(i)-(b), (ii)-(c), (iii)-(d), (iv)-(a)",
    explanation: "Crypts of Lieberkuhn are simple tubular glands (iv-a); gastric glands are simple branched tubular glands (i-b); Cowper's (bulbourethral) gland is compound alveolar/tubuloalveolar (ii-c); sub-maxillary salivary gland is compound tubulo-alveolar (iii-d).",
    difficulty: "hard",
    topic: "Structural Types of Exocrine Glands"
  },
  {
    question_number: 15,
    question_text: "Which of the following cell junctions performs cementing to keep neighbouring cells together and serve anchoring function?",
    options: [
      "Tight junction",
      "Desmosome",
      "Gap junction",
      "Hemidesmosome"
    ],
    correct_answer: "Desmosome",
    explanation: "Adhering junctions (macula adherens / desmosomes) perform cementing to keep neighbouring cells together, providing mechanical stability and anchoring across cells.",
    difficulty: "easy",
    topic: "Adhering Junctions"
  },
  {
    question_number: 16,
    question_text: "Read the following statements (A-F):\nA. Basal lamina is composed of mucopolysaccharide and glycoproteins.\nB. Reticular lamina is composed of collagen or reticular fibres.\nC. Epithelial tissue is derived only from endoderm and mesoderm.\nD. Mucous producing cells are called goblet cells.\nE. Epithelium has abundant intercellular matrix.\nF. Epithelium is richly supplied with blood vessels.\n\nHow many of the above statements are true?",
    options: [
      "Two",
      "Four",
      "Three",
      "Five"
    ],
    correct_answer: "Three",
    explanation: "Statements A, B, and D are true (3 statements). Statement C is false because epithelium is derived from all three germ layers (ectoderm, mesoderm, and endoderm). Statement E is false because epithelium has little intercellular matrix. Statement F is false because epithelium is avascular.",
    difficulty: "medium",
    topic: "Basement Membrane & Epithelium Properties"
  },
  {
    question_number: 17,
    question_text: "Fill in the blanks with suitable option:\n\"A glands secrete substances by B. The suitable example is C.\"",
    options: [
      "A: Apocrine | B: Exocytosis | C: Goblet cells",
      "A: Merocrine | B: Exocytosis | C: Sweat gland",
      "A: Holocrine | B: Exocytosis | C: Salivary gland",
      "A: Merocrine | B: Simple diffusion | C: Sweat gland"
    ],
    correct_answer: "A: Merocrine | B: Exocytosis | C: Sweat gland",
    explanation: "Merocrine glands discharge their secretions via exocytosis without any breakdown or injury to the secretory cells (e.g., eccrine sweat glands, pancreas, and salivary glands).",
    difficulty: "medium",
    topic: "Modes of Secretion in Glands"
  },
  {
    question_number: 18,
    question_text: "Read the following statements and choose the correct option:\nStatement A: Areolar tissue is the most widely distributed tissue in the body.\nStatement B: Endomysium is found around bundle of muscle fibres.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_answer: "Only statement A is correct",
    explanation: "Statement A is correct: areolar connective tissue is the most widely distributed connective tissue in the animal body. Statement B is incorrect: perimysium surrounds bundles of muscle fibres (fascicles); endomysium surrounds individual muscle fibres.",
    difficulty: "medium",
    topic: "Connective Tissue & Muscle Coverings"
  },
  {
    question_number: 19,
    question_text: "Read the following statements (A-E):\nA. Epithelial tissue lies on a non-cellular basement membrane.\nB. Exchange of gases occurs through simple squamous epithelium.\nC. Pavement epithelium is simple cuboidal.\nD. PCT has brush bordered cuboidal cells.\nE. Brush bordered cells have cilia at free surface.\n\nHow many of the above statements are true?",
    options: [
      "Two",
      "Three",
      "Four",
      "Five"
    ],
    correct_answer: "Three",
    explanation: "Statements A, B, and D are true (3 statements). Statement C is false because pavement epithelium is simple squamous epithelium. Statement E is false because brush bordered cells possess microvilli, not cilia.",
    difficulty: "medium",
    topic: "Epithelial Features & Modifications"
  },
  {
    question_number: 20,
    question_text: "Match the columns and choose the correct option:\nColumn I:\n(i) Simple squamous epithelium\n(ii) Simple cuboidal epithelium\n(iii) Simple ciliated epithelium\n\nColumn II:\nA. Fallopian tubes\nB. Tubular parts of nephron\nC. Endothelium",
    options: [
      "(i)-C, (ii)-B, (iii)-A",
      "(i)-B, (ii)-C, (iii)-A",
      "(i)-B, (ii)-A, (iii)-C",
      "(i)-C, (ii)-A, (iii)-B"
    ],
    correct_answer: "(i)-C, (ii)-B, (iii)-A",
    explanation: "Simple squamous epithelium lines blood vessel endothelium (i-C); simple cuboidal lines tubular parts of nephrons (ii-B); simple ciliated epithelium lines fallopian tubes (iii-A).",
    difficulty: "easy",
    topic: "Simple Epithelia Match"
  },
  {
    question_number: 21,
    question_text: "Pseudostratified columnar ciliated epithelium is a feature of",
    options: [
      "Trachea",
      "Fallopian tube",
      "Central canal of spinal cord",
      "Ventricles of brain"
    ],
    correct_answer: "Trachea",
    explanation: "Pseudostratified columnar ciliated epithelium lines the respiratory tract including the trachea and bronchi, where it traps dust particles and moves mucus upwards.",
    difficulty: "easy",
    topic: "Pseudostratified Ciliated Epithelium"
  },
  {
    question_number: 22,
    question_text: "Fill in the blanks and choose the correct option:\n\"Function of A is to move particles in a specific direction over the epithelium. They are present in the inner surface of hollow organs like B.\"",
    options: [
      "A: Microvilli | B: PCT",
      "A: Cilia | B: Bronchioles",
      "A: Microvilli | B: Stomach",
      "A: Stereocilia | B: Intestine"
    ],
    correct_answer: "A: Cilia | B: Bronchioles",
    explanation: "According to NCERT, the function of cilia is to move particles or mucus in a specific direction over the epithelium. They are mainly present in the inner surface of hollow organs like bronchioles and fallopian tubes.",
    difficulty: "easy",
    topic: "Ciliated Epithelium Function"
  },
  {
    question_number: 23,
    question_text: "Epithelial tissue with flat cells appearing like packed tiles occurs in",
    options: [
      "Inner lining of stomach",
      "Lining of coelomic cavity",
      "Inner lining of intestine",
      "Inner lining of fallopian tube"
    ],
    correct_answer: "Lining of coelomic cavity",
    explanation: "Simple squamous epithelium consists of a single thin layer of flattened cells with irregular boundaries that fit closely together like tiles in a floor (pavement epithelium), lining coelomic cavity (peritoneum/mesothelium), alveoli, and blood vessels.",
    difficulty: "medium",
    topic: "Squamous Epithelium"
  },
  {
    question_number: 24,
    question_text: "Which of the mammalian tissue is associated with filtration and diffusion?",
    options: [
      "Simple squamous",
      "Simple columnar",
      "Stratified columnar",
      "Stratified squamous"
    ],
    correct_answer: "Simple squamous",
    explanation: "Simple squamous epithelium forms a very thin diffusion boundary and filtration membrane, as found in the air sacs of lungs (alveoli) and Bowman's capsules of nephrons.",
    difficulty: "easy",
    topic: "Diffusion Boundary"
  },
  {
    question_number: 25,
    question_text: "Pavement epithelium lines the",
    options: [
      "Coelom, Bowman's capsule, Endothelium",
      "Stomach, Trachea, Alveoli",
      "Intestine, Thyroid follicle",
      "Gonads, Skin, Thyroid follicle"
    ],
    correct_answer: "Coelom, Bowman's capsule, Endothelium",
    explanation: "Pavement epithelium (simple squamous epithelium) lines body cavities (coelom/mesothelium), Bowman's capsule of kidney, and the lining of blood vessels (endothelium).",
    difficulty: "medium",
    topic: "Pavement Epithelium"
  },
  {
    question_number: 26,
    question_text: "Match the columns and choose the correct option:\nColumn I:\nA. Brush border epithelium\nB. Compound epithelium\nC. Simple cuboidal epithelium\nD. Simple squamous epithelium\n\nColumn II:\n(i) Moist surface of buccal cavity\n(ii) Proximal convoluted tubule\n(iii) Wall of blood vessels\n(iv) Germinal epithelium",
    options: [
      "A-(ii), B-(i), C-(iv), D-(iii)",
      "A-(i), B-(ii), C-(iii), D-(iv)",
      "A-(iv), B-(i), C-(ii), D-(iii)",
      "A-(ii), B-(iv), C-(i), D-(iii)"
    ],
    correct_answer: "A-(ii), B-(i), C-(iv), D-(iii)",
    explanation: "Brush border cuboidal lines PCT (A-ii); compound epithelium lines buccal cavity (B-i); simple cuboidal lines germinal epithelium of ovary/testis (C-iv); simple squamous lines walls of blood vessels (D-iii).",
    difficulty: "easy",
    topic: "Epithelium Types Matching"
  },
  {
    question_number: 27,
    question_text: "Which of the following is not a feature of epithelial tissue?",
    options: [
      "Cells are compactly packed with little intercellular matrix",
      "Simple epithelium functions as a lining for body cavities",
      "Ciliated epithelium is mainly present in the inner surface of hollow organs like fallopian tubes",
      "It is a highly vascular tissue"
    ],
    correct_answer: "It is a highly vascular tissue",
    explanation: "Epithelial tissue is avascular (lacks blood vessels). It receives nutrients and oxygen by diffusion from capillaries in the underlying vascular connective tissue across the basement membrane.",
    difficulty: "easy",
    topic: "General Features of Epithelial Tissue"
  },
  {
    question_number: 28,
    question_text: "Match the cell junctions with their respective functions and select the correct option:\nColumn I:\na. Tight junctions\nb. Adhering junctions\nc. Gap junctions\nd. Hemidesmosomes\n\nColumn II:\n(i) Join epithelial cells to basement membrane\n(ii) Perform cementing to keep neighbouring cells together\n(iii) Stop substances from leaking across a tissue\n(iv) Facilitate the cells to communicate with each other by connecting their cytoplasm",
    options: [
      "a(iii), b(ii), c(iv), d(i)",
      "a(ii), b(i), c(iv), d(iii)",
      "a(i), b(ii), c(iii), d(iv)",
      "a(iv), b(iii), c(ii), d(i)"
    ],
    correct_answer: "a(iii), b(ii), c(iv), d(i)",
    explanation: "Tight junctions stop leaking (a-iii); adhering junctions cement neighbours (b-ii); gap junctions facilitate cytoplasmic communication (c-iv); hemidesmosomes anchor cells to the basement membrane (d-i).",
    difficulty: "medium",
    topic: "Cell Junction Types"
  },
  {
    question_number: 29,
    question_text: "Some statements are given about the type of tissue shown below:\n(Refer to the image)\n(a) This tissue has a limited role in secretion and absorption.\n(b) It is mainly involved in formation of diffusion boundary.\n(c) Present in the lining of blood vessels.\n(d) Only lowermost cell layer is in contact with basement membrane.\n\nHow many of the statements are incorrect?",
    image_url: diagrams.zoo_q29_stratified,
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_answer: "Two",
    explanation: "The image depicts compound (stratified) epithelium. Statements (b) and (c) are incorrect because simple squamous epithelium forms the diffusion boundary and lines blood vessels. Compound epithelium has limited role in secretion/absorption (a is correct) and only the basal layer rests on basement membrane (d is correct). Thus, 2 statements are incorrect.",
    difficulty: "hard",
    topic: "Compound Epithelium Identification"
  },
  {
    question_number: 30,
    question_text: "Simple squamous epithelium is present in which of the following?\n(A) Bowman's capsule\n(B) Coelomic epithelium\n(C) Air sacs of lungs\n(D) Lining of buccal cavity\n(E) Distal convoluted tubule\n\nSelect the correct option:",
    options: [
      "A, B, D",
      "A, B, C",
      "B, D, E",
      "A, B, C, E"
    ],
    correct_answer: "A, B, C",
    explanation: "Bowman's capsule (parietal layer), coelomic epithelium (mesothelium), and air sacs of lungs (alveoli) are lined by simple squamous epithelium. Buccal cavity is lined by stratified squamous epithelium and DCT is lined by simple cuboidal epithelium.",
    difficulty: "easy",
    topic: "Simple Squamous Locations"
  }
];
