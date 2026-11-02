/**
 * Batch 2: Cell Cycle and Cell Division (Questions 35 to 58)
 * Source: Image 3 (Pages 26 & 27)
 */

export const batch2Questions = [
  {
    question_text: "If ovum has 20 pg of DNA, then what would be the DNA content in its meiocyte at G2 phase?",
    option_a: "120 pg",
    option_b: "20 pg",
    option_c: "40 pg",
    option_d: "80 pg",
    correct_option: "D",
    explanation: "An ovum is a haploid gamete with DNA content 1C = 20 pg. The meiocyte is a diploid cell (2n). At G1 phase, the meiocyte has 2C = 40 pg of DNA. During S-phase, DNA replicates and doubles to 4C. Therefore, at G2 phase, the DNA content is 4C = 2 × 40 = 80 pg.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Which of the following events is seen at the end of prophase of mitosis?",
    option_a: "Condensation of chromatin material",
    option_b: "Endoplasmic reticulum is present",
    option_c: "Nuclear envelope is present",
    option_d: "Golgi complex is present",
    correct_option: "A",
    explanation: "At the end of prophase, chromatin condensation is completed into distinct compact mitotic chromosomes. The nucleolus, nuclear envelope, endoplasmic reticulum, and Golgi complex disintegrate and are no longer seen under the microscope.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Arrange the following events of cell cycle in their sequential order:\na. Duplication of centrioles\nb. Synthesis of tubulin proteins\nc. Synthesis of ATP\nd. Separation of duplicated components",
    option_a: "a -> b -> c -> d",
    option_b: "c -> a -> b -> d",
    option_c: "b -> c -> d -> a",
    option_d: "d -> c -> a -> b",
    correct_option: "B",
    explanation: "Sequential order of events: Synthesis of ATP occurs right from G1 phase (c) -> Duplication of centrioles occurs in S phase (a) -> Synthesis of tubulin proteins occurs in G2 phase (b) -> Separation of duplicated chromosomes/components occurs during anaphase of M phase (d). Thus, the correct sequence is c -> a -> b -> d.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "DNA content becomes double but ploidy of cell and chromosome number remain unaffected in phase of cell cycle in which:",
    option_a: "Histone protein is formed",
    option_b: "Most of the cell organelles are duplicated",
    option_c: "Tubulin protein is formed",
    option_d: "Mitochondria is duplicated",
    correct_option: "A",
    explanation: "DNA replication (doubling DNA from 2C to 4C without changing chromosome number 2n) occurs during S phase. Concurrently, histone proteins are synthesised in the cytoplasm during S phase to package the newly replicated DNA.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Meiosis takes place in:",
    option_a: "All diploid cells",
    option_b: "All diploid and haploid cells",
    option_c: "Only specialised diploid cells",
    option_d: "Specialised diploid and haploid cells",
    correct_option: "C",
    explanation: "Meiosis occurs exclusively in specialised diploid germ cells (meiocytes) such as microspore/megaspore mother cells in plants and primary spermatocytes/oocytes in animals during gamete or spore formation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Maturation promoting factor (MPF) is made up of:",
    option_a: "Mitotic cyclin",
    option_b: "cdc 2 kinase",
    option_c: "G2 cyclin",
    option_d: "Both (1) and (2)",
    correct_option: "D",
    explanation: "Maturation promoting factor (MPF) is a heterodimeric protein complex composed of mitotic cyclin (cyclin B) and a cyclin-dependent kinase (cdc2 / Cdk1).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Microtubules of the spindle fibres attach to the kinetochore during:",
    option_a: "Prophase",
    option_b: "Metaphase",
    option_c: "Anaphase",
    option_d: "Telophase",
    correct_option: "B",
    explanation: "At metaphase, spindle fibres from both centrosomes/poles attach to the disc-shaped kinetochores on opposite sides of the centromere of each chromosome.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Phases of mitosis which are opposite to each other are:",
    option_a: "Anaphase and Telophase",
    option_b: "Telophase and Prophase",
    option_c: "Metaphase and Anaphase",
    option_d: "Prophase and Metaphase",
    correct_option: "B",
    explanation: "Telophase is often referred to as reverse prophase because all events of prophase are undone: condensed chromosomes decondense into loose chromatin, and the nuclear envelope, nucleolus, ER, and Golgi complex reappear.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Enzyme recombinase is involved during:",
    option_a: "Mitotic prophase",
    option_b: "Prophase-I",
    option_c: "Prophase-II",
    option_d: "Metaphase",
    correct_option: "B",
    explanation: "Recombinase is the enzyme complex that mediates crossing over and genetic recombination between non-sister chromatids of homologous chromosomes during the pachytene stage of Prophase-I.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Select the correct statements w.r.t. G0 phase of cell cycle:\n(A) Represents a phase where cells remain metabolically active but do not proliferate.\n(B) Is permanent for nerve cell.\n(C) Is non-dividing phase called quiescent stage.",
    option_a: "Only A",
    option_b: "Only B",
    option_c: "Only B and C",
    option_d: "All A, B and C",
    correct_option: "D",
    explanation: "All statements are correct. In G0 (quiescent stage), cells suspend division and do not proliferate unless called on to do so, while remaining metabolically active. Neurons permanently enter G0 and do not divide in adults.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Read the statements carefully:\nStatement A: Mitotic cell division is only seen in diploid cells.\nStatement B: Meiosis I is reductional cell division.\nChoose the correct option:",
    option_a: "Only statement A is correct",
    option_b: "Only statement B is correct",
    option_c: "Both statements are correct",
    option_d: "Both statements are incorrect",
    correct_option: "B",
    explanation: "Statement A is incorrect because mitosis is also seen in haploid cells (e.g., haploid plant gametophytes, male honeybees/drones). Statement B is correct because homologous chromosomes separate during meiosis-I reducing chromosome number from 2n to n.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Read the following statements (A-E):\nA. DNA replication occurs in this phase.\nB. Chromosomes are thickest and shortest during this stage.\nC. Congression of chromosomes occur during this stage.\nD. Best stage to study the shape of chromosomes.\nE. Centromere splits during this phase.\nHow many of the above statements are true w.r.t. anaphase of mitosis?",
    option_a: "One",
    option_b: "Two",
    option_c: "Four",
    option_d: "Three",
    correct_option: "B",
    explanation: "Only two statements (D and E) are true for anaphase. In anaphase, centromeres split and sister chromatids separate, and their movement towards poles reveals their characteristic shapes (V, L, J, I) based on centromere position. Statements A (S phase), B (metaphase), and C (metaphase) do not apply to anaphase.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Synapsis during meiosis is required for:",
    option_a: "Formation of cell plate",
    option_b: "Crossing over",
    option_c: "Cytoplasmic cleavage",
    option_d: "Movement of chromosomes towards poles",
    correct_option: "B",
    explanation: "Synapsis (pairing of homologous chromosomes during zygotene) aligns corresponding gene loci, which is an essential prerequisite for crossing over and genetic exchange between non-sister chromatids in pachytene.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "If egg of an organism has 40 pg of DNA in its nucleus, how much DNA would a diploid cell of the same organism have in G1 phase of meiosis?",
    option_a: "20 pg",
    option_b: "160 pg",
    option_c: "80 pg",
    option_d: "40 pg",
    correct_option: "C",
    explanation: "An egg cell is haploid with DNA content 1C = 40 pg. A somatic or pre-meiotic diploid cell at G1 phase has twice the haploid DNA content, i.e., 2C = 2 × 40 = 80 pg.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Duplication of semi-autonomous cell organelles occur during:",
    option_a: "G1",
    option_b: "G2",
    option_c: "Prophase-I",
    option_d: "S phase",
    correct_option: "B",
    explanation: "Duplication of semi-autonomous organelles possessing their own DNA (mitochondria and chloroplasts) occurs mainly during the G2 phase of interphase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Choose the correct combination of events takes place in the given stage:",
    option_a: "Pachytene - Chiasmata formation - Congression of chromosomes",
    option_b: "Zygotene - Crossing over takes place - Reduction of chromosome number",
    option_c: "Pachytene - Crossing over takes place - Recombination of genetic material",
    option_d: "Diakinesis - Bivalents formation - Synapsis occurs",
    correct_option: "C",
    explanation: "During pachytene, crossing over takes place between non-sister chromatids of homologous chromosomes, leading to recombination of genetic material mediated by recombinase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "What will be the ratio of cytokinesis during mitosis and meiosis?",
    option_a: "1 : 1",
    option_b: "3 : 1",
    option_c: "1 : 3",
    option_d: "1 : 2",
    correct_option: "D",
    explanation: "Mitosis involves a single mitotic division and one cytokinesis (producing 2 daughter cells). Meiosis consists of two successive nuclear and cytoplasmic divisions (cytokinesis I and II, producing 4 daughter cells). Hence, the ratio of cytokinesis events is 1 : 2.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Identify the statements as true (T) or false (F):\nI. Cytokinesis in animal cell is achieved by the formation of a cell plate.\nII. Cytokinesis in animal cell is centripetal.\nIII. Phragmoplast is formed by golgi complex.\nIV. Division of cytoplasm occurs by formation of furrow in animal cell.",
    option_a: "I-T, II-F, III-F, IV-F",
    option_b: "I-T, II-F, III-F, IV-T",
    option_c: "I-F, II-T, III-T, IV-T",
    option_d: "I-F, II-T, III-F, IV-F",
    correct_option: "C",
    explanation: "Statement I is False (cell plate occurs in plant cells); Statement II is True (animal cleavage furrow progresses centripetally); Statement III is True (phragmoplast is formed by Golgi vesicles and ER); Statement IV is True (animal cytokinesis occurs via cleavage furrow). Thus, F, T, T, T.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Given below is a schematic break-up of the phases of cell cycle:\nChoose the correct matching w.r.t. cell cycle:",
    option_a: "A - Histone protein formation",
    option_b: "B - DNA content and number of chromosomes become double",
    option_c: "C - Tubulin protein formation",
    option_d: "D - Involves only division of nucleus",
    correct_option: "C",
    explanation: "In the graph showing DNA content across time, Region A represents G1 phase (2C), Region B represents S phase (DNA increases from 2C to 4C), Region C represents G2 phase (steady at 4C), and Region D represents M phase. During G2 phase (C), synthesis of tubulin proteins occurs for spindle fibre formation. Therefore, matching C with tubulin protein formation is correct.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793615766/edvedum_botany/cell_cycle_division/q53_dna_content_curve.png",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "All of the following events occur in Prophase-I, except:",
    option_a: "Terminalisation of chiasmata",
    option_b: "Crossing over",
    option_c: "Dissolution of synaptonemal complex",
    option_d: "Disjunction of homologous pair of chromosomes at opposite poles",
    correct_option: "D",
    explanation: "Disjunction (segregation) of homologous chromosome pairs towards opposite poles takes place during Anaphase-I, not during Prophase-I.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "A cell has 4 picogram of DNA at G1 phase. What will be the amount of DNA, if the cell enters the quiescent phase?",
    option_a: "8 picogram",
    option_b: "16 picogram",
    option_c: "2 picogram",
    option_d: "4 picogram",
    correct_option: "D",
    explanation: "Cells that enter the quiescent G0 stage exit from G1 phase without initiating DNA replication. Thus, their DNA content remains identical to that of G1 phase, i.e., 4 picograms.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "___a___ ensures the production of ___b___ phase in the life cycle of sexually reproducing organisms whereas fertilization restores the ___c___ phase.",
    option_a: "a - Mitosis, b - Diploid, c - Haploid",
    option_b: "a - Meiosis, b - Haploid, c - Diploid",
    option_c: "a - Mitosis, b - Haploid, c - Diploid",
    option_d: "a - Meiosis, b - Diploid, c - Haploid",
    correct_option: "B",
    explanation: "Meiosis ensures the production of haploid phase in the life cycle of sexually reproducing organisms (by forming haploid gametes), whereas fertilization restores the diploid phase by fusion of gametes.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Select the incorrect match:",
    option_a: "Maturation promoting factor - G2 to M transition",
    option_b: "Chromosomes appear like a ball of wool - Metaphase",
    option_c: "Thickest and shortest chromosome - Metaphase",
    option_d: "Movement of chromosomes towards the equator - Congression",
    correct_option: "B",
    explanation: "Chromosomes appear tangled like a ball of wool (spireme stage) during early Prophase, not Metaphase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Reduction in the number of chromosomes occur during:",
    option_a: "Metaphase-I",
    option_b: "Anaphase-I",
    option_c: "Metaphase-II",
    option_d: "Anaphase-II",
    correct_option: "B",
    explanation: "During Anaphase-I, the homologous chromosome pairs separate to opposite poles (disjunction), halving the number of chromosomes in the resulting daughter nuclei.",
    marks: 4,
    difficulty: "easy"
  }
];

