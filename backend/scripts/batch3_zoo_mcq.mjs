import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch3Questions = [
  {
    question_number: 66,
    question_text: "Which of the following is not correctly matched?",
    options: [
      "Tendons — Dense regular connective tissue",
      "Endothelium of blood vessels — Cuboidal epithelium",
      "Fallopian tubes — Ciliated epithelium",
      "Fusiform shaped cells — Smooth muscle fibres"
    ],
    correct_answer: "Endothelium of blood vessels — Cuboidal epithelium",
    explanation: "Endothelium (inner lining of blood vessels and lymph vessels) is made up of simple squamous epithelium, which provides a smooth surface minimizing friction for fluid flow. It is not cuboidal.",
    difficulty: "easy",
    topic: "Tissue Matchings"
  },
  {
    question_number: 67,
    question_text: "Choose the correct statement:",
    options: [
      "Cardiac muscle fibres are branched, multinucleated and without calcium binding protein in cytoplasm",
      "Voluntary muscle fibres are unbranched and uninucleated",
      "Involuntary muscle fibres are unbranched, smooth and are multinucleated",
      "I-band of sarcomere basically has actin filaments"
    ],
    correct_answer: "I-band of sarcomere basically has actin filaments",
    explanation: "The I-band (isotropic band) consists purely of thin actin filaments bisected by the Z-line. Cardiac muscles are uninucleated; voluntary skeletal fibres are multinucleated; smooth muscle fibres are uninucleated.",
    difficulty: "medium",
    topic: "Muscle Striation & Sarcomere"
  },
  {
    question_number: 68,
    question_text: "Smooth muscle fibres are:\n(A) Involuntary\n(B) Unstriated\n(C) Having uninucleated cells tapered at both ends\n(D) Unbranched\n\nSelect the correct option:",
    options: [
      "A, B & C",
      "A, C & D",
      "B, C & D",
      "A, B, C & D"
    ],
    correct_answer: "A, B, C & D",
    explanation: "Smooth muscle fibres are fusiform (spindle-shaped, tapering at both ends), uninucleate, unbranched, and lack transverse striations. They are under involuntary control of the autonomic nervous system.",
    difficulty: "easy",
    topic: "Smooth Muscle Features"
  },
  {
    question_number: 69,
    question_text: "Which of the following is not true for voluntary muscle fibres?",
    options: [
      "Nuclei are peripheral, cells are syncytial and spindle shaped",
      "Has sarcomere as a unit of contraction",
      "Has well developed T-tubules",
      "Present in upper wall of oesophagus close to pharynx"
    ],
    correct_answer: "Nuclei are peripheral, cells are syncytial and spindle shaped",
    explanation: "Skeletal (voluntary) muscle fibres are cylindrical in shape, not spindle shaped. Spindle-shaped (fusiform) cells are smooth muscle fibres.",
    difficulty: "medium",
    topic: "Skeletal Muscle Fibres"
  },
  {
    question_number: 70,
    question_text: "Which of the following groups of organs have single-unit smooth muscle?",
    options: [
      "Stomach, intestine, urinary bladder",
      "Lungs, urinogenital tract, larger blood vessel",
      "Arrectores pilorum of hair, blood vessel",
      "Ciliary muscles of eye, iris"
    ],
    correct_answer: "Stomach, intestine, urinary bladder",
    explanation: "Single-unit (visceral) smooth muscle fibres occur in sheets lining hollow visceral organs like the stomach, intestine, bile duct, ureters, and urinary bladder, contracting rhythmically as a single unit via gap junctions.",
    difficulty: "medium",
    topic: "Single Unit Smooth Muscles"
  },
  {
    question_number: 71,
    question_text: "Which of the following statements is correct regarding the given diagram?\n(Refer to the image)",
    image_url: diagrams.zoo_q71_muscle,
    options: [
      "Muscle fibres are unbranched",
      "Muscle fibres are multinucleated and joined to each other by intercalated discs",
      "Cells are joined by gap junctions (intercalated disc)",
      "All cells are functionally multi-unit in nature"
    ],
    correct_answer: "Cells are joined by gap junctions (intercalated disc)",
    explanation: "The diagram depicts cardiac muscle tissue. Communication junctions (intercalated discs with gap junctions) at some fusion points allow the cells to contract as a unit, i.e., when one cell receives a signal, its neighbours are stimulated to contract.",
    difficulty: "medium",
    topic: "Cardiac Muscle Structure"
  },
  {
    question_number: 72,
    question_text: "Select the incorrect match w.r.t. the figure given below:\n(Refer to the image)",
    image_url: diagrams.zoo_q72_muscle,
    options: [
      "A - Striations due to dark and light bands",
      "B - Uninucleated muscle fibre",
      "C - Intercalated disc with tight junctions",
      "D - Branched muscle fibre"
    ],
    correct_answer: "B - Uninucleated muscle fibre",
    explanation: "Skeletal muscle fibres are syncytial (multinucleated), having many peripherally located nuclei beneath the sarcolemma. Label B pointing to a multinucleated state as 'uninucleated' is incorrect.",
    difficulty: "medium",
    topic: "Skeletal Muscle Striations"
  },
  {
    question_number: 73,
    question_text: "Match the following columns and choose the correct option:\n(Refer to the image)\nColumn I:\na. Skeletal muscle\nb. Smooth muscle\nc. Cardiac muscle\n\nColumn II:\n(i) Intercalated discs are present, involuntary in nature, striated\n(ii) Involuntary, unstriated\n(iii) Voluntary, striated, multinucleated",
    image_url: diagrams.zoo_q73_muscles,
    options: [
      "a-(iii), b-(ii), c-(i)",
      "a-(ii), b-(iii), c-(i)",
      "a-(i), b-(ii), c-(iii)",
      "a-(iii), b-(i), c-(ii)"
    ],
    correct_answer: "a-(iii), b-(ii), c-(i)",
    explanation: "Skeletal muscle is voluntary, striated, and multinucleated (a-iii); smooth muscle is involuntary and unstriated (b-ii); cardiac muscle is striated, involuntary, with intercalated discs (c-i).",
    difficulty: "easy",
    topic: "Three Muscle Types Comparison"
  },
  {
    question_number: 74,
    question_text: "Consider the following terms:\nA. Multinucleated\nB. Intercalated disc\nC. Autorhythmicity\nD. Voluntary\nE. Branched muscle fibre\n\nSelect the correct option which represents terms applicable for cardiac muscles:",
    options: [
      "B, C and E",
      "B, C and D",
      "A, B and C",
      "A, C and E"
    ],
    correct_answer: "B, C and E",
    explanation: "Cardiac muscle cells are branched (E), possess intercalated discs (B), exhibit autorhythmicity/myogenic contraction (C), are uninucleated (not multinucleated), and are involuntary (not voluntary).",
    difficulty: "medium",
    topic: "Cardiac Muscle Properties"
  },
  {
    question_number: 75,
    question_text: "Which of the following is a correct match?",
    options: [
      "Arrector pili — Single-unit smooth muscle",
      "Urinary bladder — Single-unit smooth muscle",
      "Pericardium — Skeletal muscle",
      "Biceps of upper arm — Multi-unit smooth muscle"
    ],
    correct_answer: "Urinary bladder — Single-unit smooth muscle",
    explanation: "The detrusor muscle in the wall of the urinary bladder is made of single-unit (visceral) smooth muscle cells joined by gap junctions. Arrector pili are multi-unit smooth muscle; biceps is voluntary skeletal muscle.",
    difficulty: "medium",
    topic: "Visceral Smooth Muscle"
  },
  {
    question_number: 76,
    question_text: "Select the incorrect pairing:",
    options: [
      "Heart wall — Functional syncytium",
      "Biceps of upper arm — Single unit smooth muscle",
      "Body wall — Striated muscles",
      "Iris — Smooth muscles"
    ],
    correct_answer: "Biceps of upper arm — Single unit smooth muscle",
    explanation: "Biceps is a skeletal voluntary muscle attached to bones of the upper limb; it is striated and multinucleated, not smooth muscle.",
    difficulty: "easy",
    topic: "Muscle Locations & Types"
  },
  {
    question_number: 77,
    question_text: "Read the statements (A & B) and choose the correct option:\nStatement A: In cardiac muscles, when one cell receives a signal to contract, its neighbouring cells are also stimulated to contract.\nStatement B: This is due to the presence of intercalated discs.",
    options: [
      "Only statement A is correct",
      "Only statement B is correct",
      "Both statements A and B are correct",
      "Both statements A and B are incorrect"
    ],
    correct_answer: "Both statements A and B are correct",
    explanation: "Intercalated discs contain communicating gap junctions that allow electrical depolarization waves to pass rapidly between myocytes, causing synchronous contraction (acting as a functional syncytium).",
    difficulty: "easy",
    topic: "Cardiac Intercalated Disc Mechanism"
  },
  {
    question_number: 78,
    question_text: "Read the following features of cardiac muscle:\n(A) Have dark and light bands.\n(B) The myocytes are uninucleated.\n(C) Intercalated discs are present.\n\nHow many of the above is/are correct?",
    options: [
      "One",
      "Two",
      "Three",
      "Zero"
    ],
    correct_answer: "Three",
    explanation: "All three features are correct for cardiac muscles: they are striated with dark and light bands, each myocyte typically contains a single central nucleus, and adjacent cells are united by intercalated discs.",
    difficulty: "easy",
    topic: "Features of Cardiac Muscle"
  },
  {
    question_number: 79,
    question_text: "Match the following and choose the correct answer:\nI. Skeletal muscles\nII. Smooth muscles\nIII. Cardiac muscles\n\nDescriptions:\n(A) Spindle shaped, unbranched, unstriated, involuntary\n(B) Multinucleated, cylindrical, striated, voluntary\n(C) Uninucleated, branched, striated, intercalated discs",
    options: [
      "I-B, II-A, III-C",
      "I-A, II-B, III-C",
      "I-C, II-A, III-B",
      "I-B, II-C, III-A"
    ],
    correct_answer: "I-B, II-A, III-C",
    explanation: "Skeletal muscles are multinucleated, cylindrical, and striated (I-B); smooth muscles are spindle-shaped, unbranched, and unstriated (II-A); cardiac muscles are branched, uninucleated, striated with intercalated discs (III-C).",
    difficulty: "easy",
    topic: "Comprehensive Muscle Comparison"
  },
  {
    question_number: 80,
    question_text: "Blood-brain barrier is maintained by",
    options: [
      "Astrocytes",
      "Oligodendrocytes",
      "Microglial cells",
      "Ependymal cells"
    ],
    correct_answer: "Astrocytes",
    explanation: "Astrocytes have numerous perivascular end-feet (pedicels) that encircle brain capillaries and induce endothelial cells to form tight junctions, establishing and maintaining the blood-brain barrier (BBB).",
    difficulty: "medium",
    topic: "Neuroglia - Astrocytes & Blood-Brain Barrier"
  },
  {
    question_number: 81,
    question_text: "Glial cell which is mesodermal in origin is",
    options: [
      "Astrocyte",
      "Microglial cell",
      "Schwann cell",
      "Oligodendrocyte"
    ],
    correct_answer: "Microglial cell",
    explanation: "Microglia are specialized resident macrophages of the central nervous system derived from hematopoietic mesodermal progenitor cells. Astrocytes, oligodendrocytes, and ependymal cells are ectodermal in origin.",
    difficulty: "hard",
    topic: "Embryonic Origin of Neuroglial Cells"
  },
  {
    question_number: 82,
    question_text: "Match the columns and choose the correct option:\nColumn I:\n(i) Astrocyte\n(ii) Microglia\n(iii) Oligodendrocyte\n(iv) Ependymal cell\n\nColumn II:\n(a) Acts as phagocyte\n(b) Forms myelin sheath in CNS\n(c) Helps in circulation of cerebrospinal fluid\n(d) Forms blood brain barrier",
    options: [
      "(i)-(d), (ii)-(a), (iii)-(b), (iv)-(c)",
      "(i)-(a), (ii)-(d), (iii)-(b), (iv)-(c)",
      "(i)-(d), (ii)-(c), (iii)-(b), (iv)-(a)",
      "(i)-(b), (ii)-(a), (iii)-(d), (iv)-(c)"
    ],
    correct_answer: "(i)-(d), (ii)-(a), (iii)-(b), (iv)-(c)",
    explanation: "Astrocytes form the blood-brain barrier (i-d); microglia act as phagocytes (ii-a); oligodendrocytes myelinate axons in the CNS (iii-b); ependymal cells have cilia helping circulate CSF in brain ventricles (iv-c).",
    difficulty: "medium",
    topic: "Neuroglia Functions"
  },
  {
    question_number: 83,
    question_text: "In a transverse section of myelinated nerve, the sequence of structures from inside to outside is:",
    options: [
      "Axon -> myelin sheath -> endoneurium -> perineurium -> epineurium",
      "Axon -> endoneurium -> perineurium -> myelin sheath -> epineurium",
      "Epineurium -> perineurium -> endoneurium -> myelin sheath -> axon",
      "Axon -> perineurium -> myelin sheath -> endoneurium"
    ],
    correct_answer: "Axon -> myelin sheath -> endoneurium -> perineurium -> epineurium",
    explanation: "From inner core to outer surface: the axon is covered by the myelin sheath, wrapped in delicate endoneurium; bundles of fibres are enclosed by perineurium; and the outermost fibrous coat of the whole nerve trunk is the epineurium.",
    difficulty: "hard",
    topic: "Connective Tissue Coverings of a Nerve"
  },
  {
    question_number: 84,
    question_text: "Find the incorrect match:",
    options: [
      "Astrocyte — Blood-brain barrier",
      "Oligodendrocyte — Secretes myelin sheath in CNS",
      "Neurons — Mesodermal in origin",
      "Microglial cells — Mesodermal neuroglial cells"
    ],
    correct_answer: "Neurons — Mesodermal in origin",
    explanation: "Neurons and the vast majority of neuroglial cells are ectodermal in origin, derived from the neural tube and neural crest. Only microglial cells are of mesodermal origin.",
    difficulty: "medium",
    topic: "Nervous Tissue Embryology"
  },
  {
    question_number: 85,
    question_text: "Unipolar neurons with only axon and no dendrites are present in",
    options: [
      "Early embryos",
      "Dorsal root ganglia of spinal nerves",
      "Brain",
      "Retina"
    ],
    correct_answer: "Early embryos",
    explanation: "According to NCERT, unipolar neurons (cell body with only one axon) are usually found in the embryonic stage. Bipolar neurons are in the retina of eye, and multipolar neurons are in the cerebral cortex.",
    difficulty: "easy",
    topic: "Structural Types of Neurons"
  },
  {
    question_number: 86,
    question_text: "Which part of a neuron possesses lipid deposition?",
    options: [
      "Cyton",
      "Ensheathed Axon",
      "Dendron",
      "Nodes of Ranvier"
    ],
    correct_answer: "Ensheathed Axon",
    explanation: "The myelin sheath surrounding the axon is rich in lipids (cholesterol, cerebrosides, and sphingomyelins) produced by Schwann cells (PNS) or oligodendrocytes (CNS), acting as an electrical insulator.",
    difficulty: "medium",
    topic: "Myelin Sheath Composition"
  },
  {
    question_number: 87,
    question_text: "Nissl's granules are present in X and their function is to Y. Identify X & Y and select the correct option:",
    options: [
      "X: Axon of neuron | Y: Help in nutrition",
      "X: Cyton of neuron | Y: Help in protein synthesis",
      "X: Dendrites of neuron | Y: Help in lipid synthesis",
      "X: Axon of neuron | Y: Help in impulse transmission"
    ],
    correct_answer: "X: Cyton of neuron | Y: Help in protein synthesis",
    explanation: "Nissl's granules are angular granules present in the cyton (soma) and dendrites (absent in axon hillock and axon). Ultrastructurally, they are masses of rough endoplasmic reticulum with free ribosomes actively engaged in protein synthesis.",
    difficulty: "easy",
    topic: "Nissl's Granules"
  },
  {
    question_number: 88,
    question_text: "Read the following statements and choose the correct option:\nStatement A: Microglial cells of nervous tissue are mesodermal in origin.\nStatement B: Oligodendrocytes form myelin sheath around axons of PNS and Schwann cells form myelin sheath around axons of CNS.",
    options: [
      "Only statement A is true",
      "Only statement B is true",
      "Both statements A & B are true",
      "Both statements A & B are false"
    ],
    correct_answer: "Only statement A is true",
    explanation: "Statement A is true (microglia are mesodermal). Statement B is false because Schwann cells form myelin sheath in the PNS, whereas oligodendrocytes form myelin sheath in the CNS.",
    difficulty: "medium",
    topic: "Myelinating Cells in CNS and PNS"
  },
  {
    question_number: 89,
    question_text: "Select the correct match:\nTypes of Glial cell | Origin | Function",
    options: [
      "Astrocytes | Mesodermal | Myelination",
      "Oligodendrocytes | Ectodermal | Repair of damaged neurons",
      "Ependymal cells | Ectodermal | Forms blood brain barrier",
      "Microglial cells | Mesodermal | Phagocytosis"
    ],
    correct_answer: "Microglial cells | Mesodermal | Phagocytosis",
    explanation: "Microglial cells are of mesodermal origin and act as scavengers/phagocytes that engulf cellular debris and microbes in the central nervous system.",
    difficulty: "medium",
    topic: "Neuroglia Classification"
  },
  {
    question_number: 90,
    question_text: "Which of the following is not common to nervous system and muscular system?",
    options: [
      "Excitability",
      "Conductivity",
      "Extensibility",
      "Voltage gated ion channels present in cell membranes"
    ],
    correct_answer: "Extensibility",
    explanation: "Both nervous and muscular tissues exhibit excitability, conductivity, and have voltage-gated ion channels. However, extensibility (the ability to be stretched beyond resting length) and contractility are specific physiological properties of muscular tissue, not nervous tissue.",
    difficulty: "medium",
    topic: "Properties of Excitable Tissues"
  },
  {
    question_number: 91,
    question_text: "Which of the following is incorrect for cockroach?",
    options: [
      "Head is formed by six embryonic segments",
      "Abdomen consists of 10 segments in embryonic stage",
      "Head is hypognathous",
      "Elytra is not used for flying purpose"
    ],
    correct_answer: "Abdomen consists of 10 segments in embryonic stage",
    explanation: "In embryonic cockroach, the abdomen consists of 11 segments. In adult cockroach, it consists of 10 segments. Head is formed by fusion of 6 embryonic segments and is hypognathous. Forewings (tegmina/elytra) are protective and opaque, not used in flight.",
    difficulty: "hard",
    topic: "Morphology of Cockroach - Segmentation"
  },
  {
    question_number: 92,
    question_text: "Read the following sentences w.r.t. cockroach:\n(i) During course of blood circulation, blood from head sinus enters into perivisceral sinus.\n(ii) There are 20 spiracles.\n(iii) Alary muscles help in respiration.\n(iv) Nephrocytes are excretory in function.\n\nChoose the correct answer by selecting 'T' for correct sentence and 'F' for incorrect sentence:",
    options: [
      "(i)-T, (ii)-T, (iii)-F, (iv)-T",
      "(i)-T, (ii)-F, (iii)-T, (iv)-F",
      "(i)-F, (ii)-T, (iii)-T, (iv)-T",
      "(i)-F, (ii)-F, (iii)-T, (iv)-F"
    ],
    correct_answer: "(i)-T, (ii)-T, (iii)-F, (iv)-T",
    explanation: "(i) True: blood flows from perineural to perivisceral sinus. (ii) True: 10 pairs = 20 spiracles on lateral body surface. (iii) False: 12 pairs of alary muscles help in circulation of hemolymph through heart chambers, not respiration. (iv) True: nephrocytes help in excretion.",
    difficulty: "hard",
    topic: "Cockroach Anatomy & Physiology"
  },
  {
    question_number: 93,
    question_text: "Which of the following is true for mosaic vision of cockroach?",
    options: [
      "Less sensitivity but more resolution",
      "More sensitivity but less resolution",
      "Less sensitivity and less resolution",
      "More sensitivity and high resolution"
    ],
    correct_answer: "More sensitivity but less resolution",
    explanation: "According to NCERT, with the help of several ommatidia, a cockroach can receive several images of an object. This kind of vision is known as mosaic vision with more sensitivity but less resolution, being common during night (hence called nocturnal vision).",
    difficulty: "easy",
    topic: "Compound Eyes & Mosaic Vision in Cockroach"
  },
  {
    question_number: 94,
    question_text: "All of the following are the excretory structures in cockroach except:",
    options: [
      "Uricose gland",
      "Nephrocyte",
      "Titillator",
      "Fat body"
    ],
    correct_answer: "Titillator",
    explanation: "Malpighian tubules, fat body, nephrocytes, and uricose glands (in male mushroom glands) assist in excretion. The titillator is a hook-like chitinous process of male external genitalia (left phallomere), with no excretory role.",
    difficulty: "medium",
    topic: "Excretory System of Cockroach"
  },
  {
    question_number: 95,
    question_text: "Given diagram shows the female reproductive system and structures are labelled as A, B, C and D. Choose the correct name of labelled structures and their function from the given options:\n(Refer to the image)",
    image_url: diagrams.zoo_q95_cockroach_repro,
    options: [
      "A: Spermatheca — Receive and store sperm during copulation",
      "B: Ovariole — Produces ootheca",
      "C: Vestibule — Stores ootheca",
      "D: Collaterial gland — Ova are stored"
    ],
    correct_answer: "A: Spermatheca — Receive and store sperm during copulation",
    explanation: "In NCERT Figure 7.18 (Female reproductive system of cockroach): 'A' is the spermatheca (in 6th segment), which receives and stores spermatophores/sperm during copulation. Collaterial glands ('D') secrete the hard proteinaceous wall of ootheca.",
    difficulty: "medium",
    topic: "Female Reproductive System of Cockroach"
  },
  {
    question_number: 96,
    question_text: "Select the correct statement about cockroach:",
    options: [
      "Corpora allata secretes gonadotropic hormone in nymphal stage",
      "Hormone of prothoracic gland stimulates ecdysis",
      "Metamorphosis is ametabolous type",
      "Nymph requires 10 moultings to reach adult form"
    ],
    correct_answer: "Hormone of prothoracic gland stimulates ecdysis",
    explanation: "The prothoracic glands secrete ecdysone (moulting hormone) which triggers ecdysis/moulting. Metamorphosis is paurometabolous (gradual), and the nymph undergoes 13 moultings (not 10).",
    difficulty: "hard",
    topic: "Endocrine Control of Metamorphosis in Cockroach"
  },
  {
    question_number: 97,
    question_text: "Zooflagellates are common in the gut fauna in wood-eating termites and wood roaches: A and B respectively. Which of the following option correctly fills up the blanks?",
    options: [
      "A - Trichonympha, B - Trichomonas",
      "A - Lophomonas, B - Trichomonas",
      "A - Trichonympha, B - Lophomonas",
      "A - Trichonympha, B - Noctiluca"
    ],
    correct_answer: "A - Trichonympha, B - Lophomonas",
    explanation: "Symbiotic cellulolytic zooflagellates Trichonympha campanula inhabit termites, while Lophomonas blattarum inhabits the gut of wood roaches and cockroaches, breaking down cellulose into digestible sugars.",
    difficulty: "hard",
    topic: "Symbionts of Cockroach Gut"
  },
  {
    question_number: 98,
    question_text: "Anal cerci of cockroach bear:",
    options: [
      "Johnston's organs",
      "Sound and vibration receptors",
      "Neuromast organs",
      "Ampullae of Lorenzini"
    ],
    correct_answer: "Sound and vibration receptors",
    explanation: "Anal cerci (paired segmented structures on the 10th abdominal tergum in both sexes) are tactile and thigmo-receptors, sensitive to ground and air vibrations and low-frequency sound waves.",
    difficulty: "easy",
    topic: "Sense Organs of Cockroach"
  },
  {
    question_number: 99,
    question_text: "Female cockroach has:",
    options: [
      "Seminal vesicles",
      "Mushroom glands",
      "Collaterial glands",
      "Conglobate gland"
    ],
    correct_answer: "Collaterial glands",
    explanation: "A pair of branched collaterial glands are present behind the ovaries in female cockroaches and open into the genital chamber to secrete the oothecal case. Mushroom gland, conglobate gland, and seminal vesicles are male structures.",
    difficulty: "easy",
    topic: "Reproductive Structures in Cockroach"
  },
  {
    question_number: 100,
    question_text: "Which of the following is incorrect for frog?",
    options: [
      "Heart is supported by sinus venosus and truncus arteriosus",
      "Has two pairs of lymph hearts",
      "Lower jaw is without teeth",
      "Has freely movable upper eyelid"
    ],
    correct_answer: "Has freely movable upper eyelid",
    explanation: "In frog, the upper eyelid is immovable. The lower eyelid is folded into a transparent third eyelid called the nictitating membrane that protects the eye while in water.",
    difficulty: "medium",
    topic: "Morphology & Anatomy of Frog"
  }
];
