const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const animalBatchAR = [
  {
    question_text: "Assertion (A): In Asterias, soft dermal branchiae are present in between the spines.\nReason (R): Dermal branchiae act as respiratory and excretory organs.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. In Asterias (starfish), soft, delicate, contractile dermal branchiae (skin gills or papulae) project between the spines on the aboral surface to serve for respiration and excretion by diffusion.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Trichuris or the whip worm causes anaemia.\nReason (R): Trichuris lives in the caecum, appendix and colon and sucks the blood of the host.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Trichuris trichiura (whipworm) burrows its slender anterior end into the mucosa of the caecum and colon, feeding on blood and mucosal secretions, leading to microcytic hypochromic anaemia.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): The parasitic tape worm lacks an alimentary canal.\nReason (R): Manubrium is present at the distal end to help in intake of food.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. Tapeworms (Taenia) lack an alimentary canal completely and absorb nutrients through their body surface. A manubrium is a hanging tube bearing the mouth found in cnidarian medusae, not tapeworms.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): The pearl may be considered as an \"inside out\" shell.\nReason (R): The normal outer material of the shell is secreted first and forms the nucleus of the pearl.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. A pearl is formed when a foreign irritant enters between the mantle and shell. The mantle secretes concentric layers of mother-of-pearl (nacre) around this foreign nucleus, whereas the shell is formed with the periostracum on the outside.",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Honey bees can lay two types of eggs fertilised and unfertilised.\nReason (R): Queen bee can regulate the opening of spermatheca.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. The queen bee regulates the valve of her spermatheca to either fertilize an egg (producing diploid females: workers or queens) or allow it to pass unfertilized (developing parthenogenetically into haploid drones).",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Wuchereria bancrofti causes a slowly developing chronic inflammation of the organs in which they live for many years.\nReason (R): The pathogens are transmitted to a healthy person through the bite by the female mosquito vectors.",
    options: AR_OPTIONS,
    correct_index: 1,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the correct explanation of the Assertion. Chronic inflammation in lymphatic vessels is caused by the physical blockage and immune reaction against adult worms, not by the mode of transmission via female Culex mosquitoes.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Echinoderms have secondary radial symmetry.\nReason (R): Larva undergoes torsion.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. Adult echinoderms exhibit secondary radial symmetry derived from bilaterally symmetrical larvae through metamorphosis. Torsion is a 180° twisting of the visceral mass unique to gastropod molluscs, not echinoderms.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Adult gastropods are asymmetrical but larva has bilateral symmetry.\nReason (R): Visceral mass shows torsion.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. During the larval stage of gastropods (veliger), 180° counter-clockwise torsion of the visceral mass and mantle cavity occurs, which makes the adult asymmetrical.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Dragonflies are hemimetabolous insects.\nReason (R): Naiads are aquatic.",
    options: AR_OPTIONS,
    correct_index: 1,
    explanation: "Both Assertion and Reason are true, but Reason does not explain the Assertion. Dragonflies are hemimetabolous because their metamorphosis is incomplete (lacking a pupal stage between nymph/naiad and adult), not simply because the naiads live in water.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Peripatus is a connecting link between annelida and arthropoda.\nReason (R): It has nephridia and trachea.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Peripatus (phylum Onychophora) possesses annelid-like segmented nephridia, unjointed legs, and a muscular body wall, along with arthropod-like tracheal respiration, claws, and a haemocoel.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Metamorphosis in cockroach is paurometabolous type.\nReason (R): Life cycle includes nymph as an intermediate stage.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Metamorphosis in cockroaches is termed paurometabolous because development is gradual through a succession of nymphal instars that look very much like the adults.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Obelia shows metagenesis.\nReason (R): Polyp and medusa alternate in the life cycle of Obelia.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Obelia exhibits metagenesis (alternation of generations), where polyps produce medusae asexually and medusae produce polyps sexually.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Tapeworm has pseudosegmented body.\nReason (R): Alimentary canal is absent in tapeworm.",
    options: AR_OPTIONS,
    correct_index: 1,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation. Taenia has pseudometameric segmentation because proglottids proliferate from the neck. Absence of an alimentary canal is a separate parasitic adaptation.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Pila has asymmetrical body.\nReason (R): Veliger larva shows torsion.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. In Pila (Gastropoda), the bilaterally symmetrical veliger larva undergoes 180° torsion during development, producing an asymmetrical adult organism.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Insects are first flying animals.\nReason (R): Insects have three pairs of legs which arise from thorax.",
    options: AR_OPTIONS,
    correct_index: 1,
    explanation: "Both Assertion and Reason are true, but Reason is not the correct explanation. Insects were the first animals to evolve active flight, but having three pairs of legs (hexapody) does not explain flight; wings are thoracic cuticular outgrowths.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Limulus is a living fossil.\nReason (R): It is a connecting link between Annelids and Arthropods.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. Limulus (king crab) is a living fossil that has remained structurally unchanged since the Palaeozoic era. Peripatus is the connecting link between Annelida and Arthropoda, not Limulus.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In sponges interstitial cells are the totipotent cells.\nReason (R): In coelenterates, the archaeocytes will lead to the formation of different type of amoebocytes and other cells of the body wall.",
    options: AR_OPTIONS,
    correct_index: 3,
    explanation: "Both Assertion and Reason are false statements. In sponges, the totipotent cells are archaeocytes (not interstitial cells). In coelenterates, the totipotent cells are interstitial cells (not archaeocytes). The terms are interchanged.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Power of locomotion is poor in Ascaris.\nReason (R): Body wall of Ascaris has cuticle but lacks circular muscles.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. The body wall of Ascaris contains only longitudinal muscle fibres and completely lacks circular muscles, which restricts its movement to simple dorsoventral wriggling and bending.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In many gastropods, the anus and the mantle cavity are placed anteriorly above the head.\nReason (R): During embryonic development, in many gastropods one side of visceral mass grows faster than other side. This uneven growth rotates the visceral organ upto 90° in many gastropods.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. Torsion in gastropods involves an active 180° rotation (not 90°) of the visceral mass and mantle cavity, bringing the anus and mantle cavity to the anterior position directly over the head.",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Arthropoda are the most successful of all the known animal groups and it is the largest known animal phylum.\nReason (R): Arthropoda exhibit the greatest adaptive radiation and have adapted to diverse habitats.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Arthropods constitute over two-thirds of all named animal species because of their chitinous exoskeleton, jointed appendages, and unparalleled adaptive radiation into air, land, and water.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Flatworms are mostly endoparasites found in animals including human beings.\nReason (R): Flatworms are acoelomate animals with organ level of organisation.",
    options: AR_OPTIONS,
    correct_index: 1,
    explanation: "Both Assertion and Reason are true statements, but Reason does not explain the Assertion. The endoparasitic lifestyle of flukes and tapeworms is an ecological adaptation, not an outcome of being acoelomate or possessing organ level of organisation.",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Water vascular system of echinoderms helps in locomotion, capture and transport of food.\nReason (R): Adult echinoderms are bilaterally symmetrical.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. According to NCERT, the water vascular system aids in locomotion, capture and transport of food, and respiration. Adult echinoderms are radially (pentamerously) symmetrical, while their larvae are bilaterally symmetrical.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In arthropods circulatory system is of open type.\nReason (R): Blood is pumped by the heart and flows freely within the body cavity.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. In arthropods, an open circulatory system exists because blood pumped by the heart enters open tissue spaces and sinuses (haemocoel) rather than being confined to capillaries.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Annelids have the capability to locomote whether they are terrestrial or aquatic.\nReason (R): Annelids body wall is muscular and hence possesses muscles which bring motion in the body.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Annelids possess both circular and longitudinal muscles in their body wall that contract against the hydrostatic coelomic fluid, enabling locomotion in soil (earthworms) or swimming in water (leeches, Nereis).",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Roundworms are diploblastic animals.\nReason (R): Roundworms are pseudocoelomate animals.",
    options: AR_OPTIONS,
    correct_index: 3,
    explanation: "Assertion is false, but Reason is true (Option 4). Roundworms (Aschelminthes) are triploblastic (having ectoderm, mesoderm, and endoderm), not diploblastic. They are pseudocoelomates.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In most arthropods excretion takes place through Malpighian tubules.\nReason (R): Fertilisation is usually external in arthropods.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. In terrestrial arthropods (insects, myriapods, arachnids), excretion occurs via Malpighian tubules. Fertilisation in arthropods is usually internal (not external).",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Tapeworm, roundworm and pinworm are endoparasites of human intestine.\nReason (R): Improperly cooked food is the source of all intestinal infections.",
    options: AR_OPTIONS,
    correct_index: 2,
    explanation: "Assertion is true, but Reason is false. While Taenia, Ascaris, and Enterobius inhabit the human intestine, not all intestinal infections originate from improperly cooked food (e.g., pinworm eggs are transmitted through contaminated hands/bedding/inhalation, and hookworm enters through bare skin).",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Coelenterates have tissue level of organisation.\nReason (R): In Coelenterates, the cells performing same function are arranged into groups.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. In coelenterates (cnidarians), cells specialized for particular functions form coordinated cell layers/tissues (epidermis and gastrodermis), representing tissue level of organisation.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Sponges like Sycon and Spongilla belong to Porifera.\nReason (R): They are pore bearer animals with water canal system.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Sycon and Spongilla belong to phylum Porifera because their body wall is perforated by numerous ostia (pore-bearers) that lead into a diagnostic water canal system.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Flatworms are triploblastic animals.\nReason (R): Body structures of flatworms are derived from three embryonic germ layers ectoderm, mesoderm and endoderm.",
    options: AR_OPTIONS,
    correct_index: 0,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Triploblastic animals are by definition those whose tissues and organs develop from three embryonic germ layers: ectoderm, mesoderm, and endoderm.",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    question_type: "assertion_reason"
  }
];

