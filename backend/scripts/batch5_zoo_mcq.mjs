import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/structural_diagrams_map.json'));

export const batch5Questions = [
  {
    question_number: 217,
    question_text: "Which of the following represents the correct direction of passage of an impulse in a multipolar neuron?",
    options: [
      "Collaterals - Axon - Soma - Dendrite",
      "Dendrites - Soma - Axon - Terminal arborisation",
      "Dendrites - Axon - Soma - Collaterals",
      "Soma - Dendrite - Axon - Terminal arborisation"
    ],
    correct_answer: "Dendrites - Soma - Axon - Terminal arborisation",
    explanation: "Dendrites receive stimuli and transmit electrical impulses centripetally towards the cell body (soma). The axon then conducts the action potential centrifugally away from the soma to the terminal arborisation (synaptic knobs).",
    difficulty: "easy",
    topic: "Neuron Impulse Direction"
  },
  {
    question_number: 218,
    question_text: "Which type of neuroglial cells are phagocytic in nature and mesodermal in origin?",
    options: [
      "Astrocytes",
      "Microglial cells",
      "Macroglial cells",
      "Neurilemmocytes"
    ],
    correct_answer: "Microglial cells",
    explanation: "Microglial cells are specialized resident macrophages of the central nervous system derived from mesodermal monocytes. They phagocytose cellular debris and pathogens.",
    difficulty: "easy",
    topic: "Microglial Cells"
  },
  {
    question_number: 219,
    question_text: "In PNS, myelin sheath is formed by spiral wrapping of",
    options: [
      "Schwann cells",
      "Process of oligodendrocytes",
      "Microglia",
      "Astrocytes"
    ],
    correct_answer: "Schwann cells",
    explanation: "In the peripheral nervous system (PNS), the myelin sheath is produced by the concentric, spiral wrapping of the plasma membrane of Schwann cells around the axon.",
    difficulty: "easy",
    topic: "PNS Myelination"
  },
  {
    question_number: 220,
    question_text: "Which of the following statements is incorrect?",
    options: [
      "The axon terminals may form synapses with dendrite terminals, cell bodies or even axons of other neurons",
      "Nissl's bodies are absent in axon and axon hillock",
      "Nervous tissue is made of neurons and neuroglial cells",
      "The neurotransmitter is always released from dendrite part of a neuron"
    ],
    correct_answer: "The neurotransmitter is always released from dendrite part of a neuron",
    explanation: "Neurotransmitters are stored in synaptic vesicles inside the terminal axon knobs (telodendria) and released into the synaptic cleft by exocytosis upon arrival of an action potential; they are not released from dendrites.",
    difficulty: "easy",
    topic: "Synapse & Neurotransmission"
  },
  {
    question_number: 221,
    question_text: "Neurons which connect the central nervous system to the receptors are",
    options: [
      "Sensory neurons",
      "Motor neurons",
      "Interneurons",
      "Effector neurons"
    ],
    correct_answer: "Sensory neurons",
    explanation: "Sensory (afferent) neurons transmit nerve impulses from sensory receptors located in peripheral tissues towards the central nervous system (brain and spinal cord).",
    difficulty: "easy",
    topic: "Sensory vs Motor Neurons"
  },
  {
    question_number: 222,
    question_text: "Which of the following cells are involved in the formation of myelin sheath around the axon that lie in the brain?",
    options: [
      "Neurilemmocytes",
      "Oligodendrocytes",
      "Schwann cells",
      "Astrocytes"
    ],
    correct_answer: "Oligodendrocytes",
    explanation: "Oligodendrocytes are neuroglial cells of the central nervous system (brain and spinal cord) that extend cytoplasmic processes to form myelin sheaths around multiple axons.",
    difficulty: "medium",
    topic: "CNS Myelination"
  },
  {
    question_number: 223,
    question_text: "Which type of neuron dominates in the CNS?",
    options: [
      "Sensory",
      "Motor",
      "Efferent",
      "Interneurons"
    ],
    correct_answer: "Interneurons",
    explanation: "Interneurons (association or internuncial neurons) are located entirely within the CNS and account for more than 99% of all neurons in the human nervous system, integrating sensory input and motor output.",
    difficulty: "medium",
    topic: "Types of Neurons in CNS"
  },
  {
    question_number: 224,
    question_text: "The type of neuron having only two processes, an axon at one end and a dendrite at other end, found in cochlear and vestibular ganglia are",
    options: [
      "Pseudounipolar",
      "Unipolar",
      "Bipolar",
      "Multipolar"
    ],
    correct_answer: "Bipolar",
    explanation: "Bipolar neurons have two processes arising from opposite poles of the cell body (one axon and one dendrite). They are specialized sensory neurons located in the retina, olfactory epithelium, and sensory ganglia of the vestibulocochlear nerve (inner ear).",
    difficulty: "medium",
    topic: "Bipolar Neurons"
  },
  {
    question_number: 225,
    question_text: "Which of the following cells are mesodermal in origin, probably derived from the monocytes that invade the brain during foetal life?",
    options: [
      "Fibrous astrocytes",
      "Protoplasmic astrocytes",
      "Microglia cells",
      "Ependymal cells"
    ],
    correct_answer: "Microglia cells",
    explanation: "Microglial cells are of mesodermal origin, arising from embryonic myeloid precursors (monocytes) that invade the developing nervous system during fetal development.",
    difficulty: "hard",
    topic: "Origin of Microglial Cells"
  },
  {
    question_number: 226,
    question_text: "Which of the following part of the neuron is the most sensitive part or also called triggering zone of it?",
    options: [
      "Dendrite",
      "Axon hillock",
      "Terminal arborization",
      "Telodendria"
    ],
    correct_answer: "Axon hillock",
    explanation: "The axon hillock (specifically the initial segment of the axon) contains the highest concentration of voltage-gated sodium channels and has the lowest electrical threshold, acting as the trigger zone where action potentials are initiated.",
    difficulty: "medium",
    topic: "Axon Hillock & Trigger Zone"
  },
  {
    question_number: 227,
    question_text: "Neuroglia make more than ______ volume of neural tissue in our body.",
    options: [
      "10%",
      "50%",
      "25%",
      "20%"
    ],
    correct_answer: "50%",
    explanation: "According to NCERT, neuroglia make up more than one-half (50%) the total volume of neural tissue in the animal body.",
    difficulty: "easy",
    topic: "Neuroglia Volume in Neural Tissue"
  },
  {
    question_number: 228,
    question_text: "Cells responsible for repairing the damaged area of nervous tissue are",
    options: [
      "Oligodendrocytes",
      "Astrocytes",
      "Ependymal cells",
      "Microglial cells"
    ],
    correct_answer: "Astrocytes",
    explanation: "When neural tissue in the CNS is damaged, astrocytes proliferate and fill the deficit by forming a dense fibrous network of glial scar tissue (a process known as astrogliosis or sclerosis).",
    difficulty: "medium",
    topic: "Astrocyte Repair Functions"
  },
  {
    question_number: 229,
    question_text: "Nerve impulses pass between the neurons at the synapses with the help of neurotransmitters such as acetylcholine which are released by",
    options: [
      "Axon terminals only",
      "Dendrites",
      "Perikaryon",
      "Myelin sheath"
    ],
    correct_answer: "Axon terminals only",
    explanation: "Synaptic vesicles containing neurotransmitters like acetylcholine are clustered within the presynaptic axon terminals (synaptic knobs) and exocytose their contents upon Ca2+ influx.",
    difficulty: "easy",
    topic: "Synaptic Neurotransmitter Release"
  },
  {
    question_number: 230,
    question_text: "Myelin sheath is formed by the spiral wrapping of Schwann cell membranes around the axon. The sheath is absent at certain points called",
    options: [
      "Projections of Ranvier",
      "Ampulla of Lorenzini",
      "Nodes of Ranvier",
      "Ampulla of Vater"
    ],
    correct_answer: "Nodes of Ranvier",
    explanation: "Nodes of Ranvier are periodic unmyelinated gaps along the length of an axon where the axolemma is directly exposed to extracellular fluid, enabling saltatory conduction.",
    difficulty: "easy",
    topic: "Nodes of Ranvier"
  },
  {
    question_number: 231,
    question_text: "Neurilemma is the name for",
    options: [
      "Plasma membrane of axon",
      "Coating formed by myelin sheath",
      "Covering formed by Schwann cells",
      "Connective tissue covering of nerve fascicle"
    ],
    correct_answer: "Covering formed by Schwann cells",
    explanation: "Neurilemma (sheath of Schwann) is the continuous outer nucleated cytoplasmic layer of Schwann cells that encloses the myelin sheath in peripheral nerve fibres.",
    difficulty: "medium",
    topic: "Neurilemma Structure"
  },
  {
    question_number: 232,
    question_text: "Which of the following is not a correct statement for neuroglial cell?",
    options: [
      "Neuroglial cells make up more than one half the volume of neural tissue in our body",
      "It protects and supports the neurons",
      "When this cell is suitably stimulated, an electrical disturbance is generated which swiftly travels along its plasma membrane",
      "They form myelin sheath around axon"
    ],
    correct_answer: "When this cell is suitably stimulated, an electrical disturbance is generated which swiftly travels along its plasma membrane",
    explanation: "Action potential generation and electrical excitability are specific properties of neurons. Neuroglia are non-excitable supporting cells that do not generate or propagate nerve impulses.",
    difficulty: "medium",
    topic: "Neuroglia Characteristics"
  },
  {
    question_number: 233,
    question_text: "Find out the correct statement w.r.t. nervous tissue:",
    options: [
      "Nissl's granules are fragments of rough ER and are absent in dendrons and axon",
      "Neurons are of 3 types - sensory, motor and mixed",
      "Astrocytes along with blood capillaries form blood-brain barrier",
      "Nodes of Ranvier are without myelin sheath and neurilemma"
    ],
    correct_answer: "Astrocytes along with blood capillaries form blood-brain barrier",
    explanation: "Astrocytes have vascular feet that envelop brain capillary endothelia and induce tight junctions, creating the selective blood-brain barrier. Nissl's granules are present in dendrites, and neurilemma is continuous across nodes of Ranvier.",
    difficulty: "medium",
    topic: "Nervous Tissue Features"
  },
  {
    question_number: 234,
    question_text: "Choose the incorrect statement w.r.t. neural tissue:",
    options: [
      "Neural tissue exerts the greatest control over the body's responsiveness",
      "Neurons, the unit of neural system are excitable cells",
      "Neuroglia make up more than one half of the volume of neural system in our body",
      "When a neuroglial cell is suitably stimulated a chemical disturbance is generated which swiftly travels along its plasma membrane"
    ],
    correct_answer: "When a neuroglial cell is suitably stimulated a chemical disturbance is generated which swiftly travels along its plasma membrane",
    explanation: "NCERT states: 'When a neuron is suitably stimulated, an electrical disturbance is generated which swiftly travels along its plasma membrane.' Attributing this electrical event to neuroglia is incorrect.",
    difficulty: "medium",
    topic: "Neural System Responsiveness"
  },
  {
    question_number: 235,
    question_text: "Cavity of brain is lined by",
    options: [
      "Schwann cells",
      "Oligodendrocytes",
      "Ependymal cells",
      "Astrocytes"
    ],
    correct_answer: "Ependymal cells",
    explanation: "Ependymal cells are ciliated epithelial-like glial cells that line the ventricles of the brain and the central canal of the spinal cord, assisting in CSF production and circulation.",
    difficulty: "easy",
    topic: "Ependymal Cells"
  },
  {
    question_number: 236,
    question_text: "Which of the following statement is incorrect w.r.t. cockroach?",
    options: [
      "The exoskeleton of each segment consists of four plate like pieces called sclerites",
      "Labium bears tactile and gustatory sensory setae",
      "In cockroach, malpighian tubules, fat bodies, nephrocytes, cuticle and uricose glands (in some species) help in excretion",
      "Internally mesenteron is lined by cuticle and covered by a very thin and transparent peritrophic membrane"
    ],
    correct_answer: "Internally mesenteron is lined by cuticle and covered by a very thin and transparent peritrophic membrane",
    explanation: "The midgut (mesenteron) is of endodermal origin and is lined by a glandular columnar epithelium without cuticle. The foregut and hindgut are lined by ectodermal cuticle.",
    difficulty: "hard",
    topic: "Cockroach Digestive Canal Histology"
  },
  {
    question_number: 237,
    question_text: "Sperms in cockroach are bound together in a bag/spermatophore. Which gland in their body contributes to the formation of outermost layer of spermatophore?",
    options: [
      "Utriculi breviores",
      "Utriculi majores",
      "Phallic gland",
      "Ejaculatory duct"
    ],
    correct_answer: "Phallic gland",
    explanation: "The phallic (conglobate) gland secretes the outermost third layer of the spermatophore over the sperm bundle in male cockroach.",
    difficulty: "hard",
    topic: "Spermatophore Layers in Cockroach"
  },
  {
    question_number: 238,
    question_text: "Which of the following is correct w.r.t. cockroach?\na. Internally mesenteron is lined with cuticle.\nb. In abdomen eight pairs of spiracles are present.\nc. All sperms are stored in seminal vesicles and are glued together into spermatophore.\nd. Malpighian tubules are present at the junction of midgut and hindgut.\n\nChoose the correct option:",
    options: [
      "a, b and d",
      "a and b only",
      "b and d only",
      "b, c and d"
    ],
    correct_answer: "b, c and d",
    explanation: "Statement 'a' is false (mesenteron lacks cuticle). Statements 'b' (8 abdominal spiracle pairs), 'c' (seminal vesicles glue sperms into spermatophores), and 'd' (100-150 Malpighian tubules at midgut-hindgut junction) are all correct.",
    difficulty: "medium",
    topic: "Cockroach Anatomy Multiple Statements"
  },
  {
    question_number: 239,
    question_text: "Choose the incorrect statement w.r.t. the head of cockroach:",
    options: [
      "Head is triangular in shape and lies anteriorly at right angle to the longitudinal body axis",
      "Formed by fusion of six embryonic segments and shows great mobility in all directions due to flexible neck",
      "First basal podomere of antenna is smallest and is called pedicel which articulates with antennal socket",
      "On each lateral side, it bears a large and blackish compound eye"
    ],
    correct_answer: "First basal podomere of antenna is smallest and is called pedicel which articulates with antennal socket",
    explanation: "The first basal segment of the antenna that articulates with the antennal socket is called the scape (the stoutest segment). The second segment is the pedicel, followed by the multi-segmented flagellum.",
    difficulty: "hard",
    topic: "Cockroach Head & Antenna Anatomy"
  },
  {
    question_number: 240,
    question_text: "Which of the following sinus in cockroach is considered to be on the dorsal side?",
    options: [
      "Pericardial sinus",
      "Perivisceral sinus",
      "Perineural sinus",
      "Head sinus"
    ],
    correct_answer: "Pericardial sinus",
    explanation: "The haemocoel of cockroach is divided by two horizontal fibromuscular diaphragms into three sinuses: dorsal pericardial sinus (housing the heart), middle perivisceral sinus (housing alimentary canal), and ventral perineural sinus (housing ventral nerve cord).",
    difficulty: "easy",
    topic: "Sinuses of Haemocoel in Cockroach"
  },
  {
    question_number: 241,
    question_text: "On an average female cockroach produces ______ oothecae, each containing ______ eggs.",
    options: [
      "9-10, 14-16",
      "14-16, 9-10",
      "2-4, 10-12",
      "6-8, 8-10"
    ],
    correct_answer: "9-10, 14-16",
    explanation: "According to NCERT, on average, a female Periplaneta americana produces 9-10 oothecae, each containing 14-16 eggs.",
    difficulty: "easy",
    topic: "Ootheca Numbers and Egg Count"
  },
  {
    question_number: 242,
    question_text: "Tegmina arises from",
    options: [
      "Prothorax",
      "Mesothorax",
      "Metathorax",
      "Neck region between head and thorax"
    ],
    correct_answer: "Mesothorax",
    explanation: "The first pair of wings (tegmina or forewings) arises from the mesothorax. They are opaque, dark, and leathery, covering the hindwings when at rest.",
    difficulty: "easy",
    topic: "Cockroach Wings - Tegmina"
  },
  {
    question_number: 243,
    question_text: "Which of the following statements is correct with reference to cockroach's eye?",
    options: [
      "Both eyes together consist of about 2000 hexagonal ommatidia",
      "Its vision has more sensitivity but less resolution",
      "Mosaic vision is not found due to diurnal habit",
      "Compound eyes are situated at ventral region of head"
    ],
    correct_answer: "Its vision has more sensitivity but less resolution",
    explanation: "Each compound eye consists of about 2000 ommatidia (4000 total in both eyes). Cockroaches possess nocturnal mosaic vision characterized by high sensitivity in dim light but low visual acuity/resolution.",
    difficulty: "medium",
    topic: "Cockroach Vision Optics"
  },
  {
    question_number: 244,
    question_text: "Which of the following statements is incorrect w.r.t. cockroach?",
    options: [
      "Head of cockroach is hypognathous and is formed by the fusion of six segments",
      "A pair of wings which arise from mesothorax are thick and leathery",
      "Body of cockroach is covered by a thick, hard, chitinous cuticle",
      "The 9th segment of male and female cockroach bears anal styles"
    ],
    correct_answer: "The 9th segment of male and female cockroach bears anal styles",
    explanation: "Anal styles are short, unjointed paired sensory structures present on the 9th sternum of MALE cockroaches only. Females lack anal styles.",
    difficulty: "easy",
    topic: "Sexual Dimorphism in Cockroach"
  },
  {
    question_number: 245,
    question_text: "What is the function of the structure marked 'A' in the following diagram?\n(Refer to the image)",
    image_url: diagrams.zoo_q245_gonapophysis,
    options: [
      "Contains a chain of developing ova",
      "Sperms transferred by males are stored here",
      "They form the wall of ootheca",
      "They are gonapophysis and act as ovipositor"
    ],
    correct_answer: "They are gonapophysis and act as ovipositor",
    explanation: "The structure marked 'A' represents the female gonapophyses (three pairs of chitinous valves surrounding the female gonopore) which serve as an ovipositor to guide eggs into the ootheca.",
    difficulty: "hard",
    topic: "Female Cockroach Genitalia - Gonapophyses"
  },
  {
    question_number: 246,
    question_text: "Which of the following statements is not true w.r.t. Periplaneta?",
    options: [
      "The gizzard part of alimentary canal has an outer layer of thick longitudinal muscles and inner thin cuticle forming six highly chitinous plates called teeth",
      "The hindgut is broader than midgut and is differentiated into ileum, colon and rectum",
      "If the head of cockroach is cut off, it will still live for as long as one week",
      "Each Malpighian tubule is lined by glandular and ciliated cells. These are located at the junction between midgut and hindgut"
    ],
    correct_answer: "The gizzard part of alimentary canal has an outer layer of thick longitudinal muscles and inner thin cuticle forming six highly chitinous plates called teeth",
    explanation: "According to NCERT, the gizzard has an outer layer of thick CIRCULAR muscles (not longitudinal) and thick inner cuticle forming six highly chitinous teeth.",
    difficulty: "medium",
    topic: "Cockroach Anatomy Statements"
  },
  {
    question_number: 247,
    question_text: "The longest segment of the leg of cockroach is",
    options: [
      "Coxa",
      "Femur",
      "Tibia",
      "Pretarsus"
    ],
    correct_answer: "Tibia",
    explanation: "The tibia is the slender, spiny, and longest segment in each of the three pairs of walking legs of a cockroach.",
    difficulty: "easy",
    topic: "Cockroach Leg Podomeres"
  },
  {
    question_number: 248,
    question_text: "On an average female cockroach produces A number of ootheca, each containing B eggs. Wall of ootheca is made up of C secreted by D glands.",
    options: [
      "A: 9-10 | B: 14-16 | C: Scleroprotein | D: Collaterial",
      "A: 7-9 | B: 9-10 | C: Chitin | D: Collaterial",
      "A: 9-10 | B: 14-16 | C: Cellulose | D: Conglobate",
      "A: 14-16 | B: 9-10 | C: Scleroprotein | D: Phallic"
    ],
    correct_answer: "A: 9-10 | B: 14-16 | C: Scleroprotein | D: Collaterial",
    explanation: "Female cockroach produces 9-10 oothecae, each with 14-16 eggs. The dark reddish-to-blackish-brown oothecal capsule is composed of scleroprotein (tanned protein) secreted by the branched collaterial glands.",
    difficulty: "medium",
    topic: "Cockroach Reproduction - Ootheca Synthesis"
  },
  {
    question_number: 249,
    question_text: "In cockroach 10 pairs of spiracles or stigmata are present. The 5th pair will be present in",
    options: [
      "5th abdominal segment",
      "Between 5th and 6th abdominal segment",
      "Between 4th and 5th abdominal segment",
      "Between 3rd and 4th abdominal segment"
    ],
    correct_answer: "Between 3rd and 4th abdominal segment",
    explanation: "Cockroach has 10 pairs of spiracles: 2 thoracic pairs (1st between pro- and mesothorax; 2nd between meso- and metathorax) and 8 abdominal pairs (on the first 8 abdominal segments). Thus, the 5th spiracle pair overall is the 3rd abdominal pair, situated on the 3rd abdominal segment / intersegmental pleuron.",
    difficulty: "hard",
    topic: "Cockroach Spiracle Distribution"
  },
  {
    question_number: 250,
    question_text: "Which of the following acts as an excretory structure in male cockroach only but not in female cockroach?",
    options: [
      "Fat body",
      "Pericardial cells",
      "Cuticle",
      "Uricose glands"
    ],
    correct_answer: "Uricose glands",
    explanation: "Uricose glands (long peripheral blind tubules of the mushroom-shaped gland) are present exclusively in the male reproductive system of cockroaches. They accumulate uric acid and discharge it with spermatophores during copulation.",
    difficulty: "medium",
    topic: "Male-Specific Excretory Gland in Cockroach"
  },
  {
    question_number: 251,
    question_text: "The secretion of which of the following glands is involved in the formation of oothecal case of the ootheca in cockroach?",
    options: [
      "Utricular gland",
      "Spermathecae",
      "Ampulla part of spermathecae",
      "Collaterial gland"
    ],
    correct_answer: "Collaterial gland",
    explanation: "The left and right collaterial glands in female cockroaches secrete a proteinaceous and dihydroxyphenol secretion that hardens into the tough protective shell (ootheca) around fertilized eggs.",
    difficulty: "easy",
    topic: "Collaterial Gland Function"
  },
  {
    question_number: 252,
    question_text: "Mark the incorrect statement w.r.t. cockroach:",
    options: [
      "Malpighian tubules help in excretion",
      "Fat bodies do not help in excretion",
      "Nephrocytes help in excretion",
      "It has 13 chambered tubular and dorsal heart"
    ],
    correct_answer: "Fat bodies do not help in excretion",
    explanation: "Fat body contains special urate cells that synthesize, take up, and store uric acid crystals permanently (storage excretion). Therefore, saying fat bodies do not help in excretion is incorrect.",
    difficulty: "easy",
    topic: "Organs of Excretion in Cockroach"
  }
];
