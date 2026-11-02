/**
 * Batch 5: Cell Cycle and Cell Division (Questions 115 to 139)
 * Source: Image 5 top half (Pages 32 & 33)
 */

export const batch5Questions = [
  {
    question_text: "Total number of mitotic divisions required to produce 256 cells from a single cell will be:",
    option_a: "8",
    option_b: "128",
    option_c: "14",
    option_d: "255",
    correct_option: "D",
    explanation: "To produce n cells from a single cell by mitosis, the total number of divisions required is (n - 1). Therefore, to produce 256 cells: 256 - 1 = 255 mitotic divisions. (Note: 8 consecutive cycles/generations are required since 2^8 = 256, but the total number of division events is 255).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Congression is:",
    option_a: "Centripetal movement of chromosomes",
    option_b: "Arrangement of chromosomes in ball like structure",
    option_c: "Anaphasic movement of chromosomes",
    option_d: "Centrifugal movement of chromosomes",
    correct_option: "A",
    explanation: "Congression refers to the centripetal (inward) movement of chromosomes from various positions in the cytoplasm towards the equatorial plate of the spindle during prometaphase and metaphase.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "During which stage of meiotic division, the homologous chromosomes separate but sister chromatids remain associated at their centromeres?",
    option_a: "Anaphase-II",
    option_b: "Zygotene",
    option_c: "Anaphase-I",
    option_d: "Diakinesis",
    correct_option: "C",
    explanation: "During Anaphase-I of meiosis, the homologous chromosomes separate and migrate towards opposite poles, while sister chromatids remain attached to each other at their centromeres.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Find the correct match w.r.t. cell cycle:\n\nColumn-I:\na. Spireme stage\nb. Synaptonemal complex formation\nc. Interzonal spindle fibres stage\nd. Chiasmata becomes visible\n\nColumn-II:\n(i) Anaphase\n(ii) Zygotene\n(iii) Prophase\n(iv) Diakinesis\n(v) Diplotene",
    option_a: "a(iii), b(ii), c(i), d(iv)",
    option_b: "a(iii), b(ii), c(i), d(v)",
    option_c: "a(iii), b(iv), c(i), d(v)",
    option_d: "a(i), b(ii), c(iii), d(v)",
    correct_option: "B",
    explanation: "Spireme stage corresponds to early prophase (tangled ball of wool); synaptonemal complex forms in zygotene; interzonal spindle fibres appear in anaphase; chiasmata become clearly visible in diplotene.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Which of the following statement is correct for the post-mitotic phase of the cell cycle?",
    option_a: "Change in chromosome number but not in DNA amount",
    option_b: "Change in DNA amount but not in chromosome number",
    option_c: "No synthesis of nucleotides and amino acids",
    option_d: "Neither change in the chromosome number nor in amount of DNA",
    correct_option: "D",
    explanation: "The post-mitotic phase is G1 phase. During G1, the cell grows metabolically without replicating its genetic material; therefore, there is neither a change in the chromosome number (2n) nor in the amount of DNA (2C).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "If the amount of DNA in meiocyte at G1 phase is 2C then, what will be the amount of DNA in each daughter cell after meiosis-I?",
    option_a: "2C",
    option_b: "1C",
    option_c: "4C",
    option_d: "1/2 C",
    correct_option: "A",
    explanation: "At G1 phase, the meiocyte has 2C DNA. During S-phase, DNA replicates and doubles to 4C. Meiosis-I separates homologous chromosomes into two daughter cells, halving the DNA content equally from 4C to 2C per cell.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Select the correct statement about G1 phase of cell cycle:",
    option_a: "Cell is metabolically inactive",
    option_b: "Cell stops growing",
    option_c: "It is not a phase of synthesis of non-histone proteins",
    option_d: "DNA in the cell does not replicate",
    correct_option: "D",
    explanation: "During G1 phase, the cell is metabolically active and continuously grows, but DNA replication does not occur (it takes place in the succeeding S phase).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "If haploid spores have 10 chromosomes and 20 picogram DNA then what would be the chromosome number and DNA amount in spore mother cell at the end of S-phase in the life cycle of same plant?",
    option_a: "40 chromosomes and 80 pg DNA",
    option_b: "20 chromosomes and 40 pg DNA",
    option_c: "20 chromosomes and 80 pg DNA",
    option_d: "40 chromosomes and 40 pg DNA",
    correct_option: "C",
    explanation: "A haploid spore has n = 10 chromosomes and 1C = 20 pg DNA. The spore mother cell is diploid (2n = 20 chromosomes) and in G1 has 2C = 40 pg DNA. After DNA replication in S-phase, DNA doubles to 4C = 2 × 40 = 80 pg, while chromosome number remains 20.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Certain stages of cell division are represented in figures given below. Identify them correctly:\nChoose the correct option:",
    option_a: "A - Metaphase II; B - Prophase II; C - Anaphase II",
    option_b: "A - Metaphase II; B - Prophase I; C - Anaphase I",
    option_c: "A - Metaphase I; B - Prophase I; C - Anaphase I",
    option_d: "A - Metaphase I; B - Prophase II; C - Anaphase II",
    correct_option: "C",
    explanation: "Figure A shows bivalents aligned on two parallel equatorial plates (Metaphase I). Figure B shows crossing over and chiasmata formation between homologous chromosomes (Prophase I). Figure C shows separation of homologous chromosomes (with intact sister chromatids) moving towards opposite poles without centromere splitting (Anaphase I).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793615766/edvedum_botany/cell_cycle_division/q123_stages_diagram.png",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Match the following:\n\nColumn-I:\na. Interkinesis\nb. Pachytene\nc. Diplotene\nd. G2 phase\n\nColumn-II:\n(i) Cell growth\n(ii) Chiasma appear\n(iii) Centriole duplication\n(iv) Recombination nodule",
    option_a: "a(iii), b(iv), c(ii), d(i)",
    option_b: "a(i), b(i), c(iii), d(iv)",
    option_c: "a(ii), b(iii), c(iv), d(i)",
    option_d: "a(iv), b(iii), c(i), d(ii)",
    correct_option: "A",
    explanation: "In interkinesis, centrioles duplicate in animal cells; in pachytene, recombination nodules appear; in diplotene, chiasmata become visible; in G2 phase, cell growth and protein synthesis continue.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Prophase as the first stage of mitosis is marked by the:",
    option_a: "Initiation of condensation of chromosomal material",
    option_b: "Reappearance of Golgi bodies and ER",
    option_c: "Completion of condensation of chromosomes",
    option_d: "Different shape of chromosome",
    correct_option: "A",
    explanation: "Prophase, the first stage of karyokinesis of mitosis, is marked by the initiation of condensation of chromosomal material that was tangled in interphase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "In a microspore, the number of chromosomes is 10 and DNA content is 20 pg. What is the number of chromosomes and DNA content in its meiocyte at G1 stage?",
    option_a: "20, 20",
    option_b: "10, 40",
    option_c: "20, 40",
    option_d: "10, 20",
    correct_option: "C",
    explanation: "A microspore is haploid (n = 10, 1C = 20 pg). A meiocyte is diploid (2n = 20 chromosomes) and in G1 phase has twice the haploid DNA content (2C = 2 × 20 = 40 pg).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Find out the incorrect statement:",
    option_a: "Karyokinesis occurs twice in both mitosis and meiosis",
    option_b: "The nuclear membrane disappears by the end of prophase-II",
    option_c: "Exchange of chromosomal segments takes place during meiosis-I",
    option_d: "Onion root tip is useful to study mitosis",
    correct_option: "A",
    explanation: "Karyokinesis occurs only once in mitosis (a single equational division), whereas in meiosis, karyokinesis occurs twice (karyokinesis I and II).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "If the number of bivalents aligned on the equatorial plate of metaphase-I is 10. What will be the number of chromosomes in each haploid cell after meiosis II?",
    option_a: "5",
    option_b: "10",
    option_c: "15",
    option_d: "20",
    correct_option: "B",
    explanation: "Each bivalent consists of a pair of homologous chromosomes. Thus 10 bivalents correspond to a haploid number n = 10. Each haploid gamete/cell produced after meiosis II will contain n = 10 chromosomes.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Spindle fibres attach to kinetochores of chromosomes. It is the key feature of:",
    option_a: "Metaphase",
    option_b: "Anaphase",
    option_c: "Early prophase",
    option_d: "Telophase",
    correct_option: "A",
    explanation: "At metaphase, spindle fibres attach to kinetochores of chromosomes, and chromosomes are brought to lie at the equator (metaphase plate).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "During poleward movement of separated daughter chromosomes at anaphase:",
    option_a: "Their ends are toward poles and centromere toward equator",
    option_b: "Their ends are toward equator and centromere toward pole",
    option_c: "Interzonal fibres contract and pull chromosomes",
    option_d: "Sister chromatids are pulled on same pole by kinetochore fibre",
    correct_option: "B",
    explanation: "As chromosomes move toward opposite poles in anaphase, the centromere of each chromosome leads towards the pole while the chromosomal arms trail behind towards the equatorial plate.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "The stage in which cell is metabolically active but fails to divide is:",
    option_a: "G1-phase",
    option_b: "G0-phase",
    option_c: "S-phase",
    option_d: "M-phase",
    correct_option: "B",
    explanation: "Cells in the G0 (quiescent) stage remain metabolically active, but do not divide or proliferate unless stimulated.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "The preparatory phase between meiosis-I and meiosis-II is called:",
    option_a: "Intermitosis",
    option_b: "Interphase",
    option_c: "Intermeiotic interphase",
    option_d: "Interkinesis",
    correct_option: "D",
    explanation: "The short transitional stage between meiosis-I and meiosis-II is called interkinesis or intermeiotic interphase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "How many meiotic divisions are required to produce 100 seeds in a typical dicot plant?",
    option_a: "125",
    option_b: "126",
    option_c: "127",
    option_d: "128",
    correct_option: "A",
    explanation: "For 100 seeds: 100 meiotic divisions produce 100 functional female eggs, and 100 / 4 = 25 meiotic divisions produce 100 functional male pollen grains. Total meiotic divisions = 100 + 25 = 125.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Longest phase of meiosis I is:",
    option_a: "Prophase I",
    option_b: "Anaphase I",
    option_c: "Metaphase I",
    option_d: "Telophase I",
    correct_option: "A",
    explanation: "Prophase of meiosis I is typically much longer and more complex than mitotic prophase, being divided into five distinct stages: leptotene, zygotene, pachytene, diplotene, and diakinesis.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Proteins for spindle fibre formation are synthesised in:",
    option_a: "G1 phase",
    option_b: "G2 phase",
    option_c: "Late prophase",
    option_d: "Early metaphase",
    correct_option: "B",
    explanation: "During G2 phase of interphase, proteins such as tubulin required for the assembly of spindle fibres and aster rays are synthesised while cell growth continues.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "In which of the following phase of cell cycle chromosomes are represented by monad?",
    option_a: "Anaphase",
    option_b: "Anaphase-I",
    option_c: "Metaphase",
    option_d: "Metaphase-I",
    correct_option: "A",
    explanation: "During mitotic anaphase, the centromere splits, separating the two sister chromatids. Each separated chromatid is now an individual single-stranded chromosome known as a monad. (In Anaphase-I, chromosomes are dyads with two chromatids).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Diplotene stage is initiated by:",
    option_a: "Synaptonemal complex development",
    option_b: "Dissolution of synaptonemal complex",
    option_c: "Disappearance of nuclear membrane and nucleolus completely",
    option_d: "Starting of spindle formation",
    correct_option: "B",
    explanation: "The beginning of diplotene is recognized by the dissolution of the synaptonemal complex and the tendency of homologous chromosomes to separate, except at chiasmata.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Chromosomes number is reduced to half in:",
    option_a: "Homotypic division",
    option_b: "Heterotypic division",
    option_c: "Equational division",
    option_d: "Mitosis",
    correct_option: "B",
    explanation: "Meiosis I is termed heterotypic or reductional division because the homologous chromosomes separate, reducing the chromosome number from diploid (2n) to haploid (n). Meiosis II is homotypic or equational division.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Cell division proper lasts for only about one hour out of the average duration of 24 hours of cell cycle in humans, where:",
    option_a: "The interphase lasts more than 95% of the duration",
    option_b: "The M-phase lasts more than 95% of the duration",
    option_c: "The interphase lasts less than 5% of the duration",
    option_d: "The G2 phase lasts about 95% of the duration",
    correct_option: "A",
    explanation: "In human cells dividing every 24 hours, the M phase (mitosis + cytokinesis) lasts for only about 1 hour (<5%), while interphase accounts for more than 95% of the cell cycle duration.",
    marks: 4,
    difficulty: "easy"
  }
];

