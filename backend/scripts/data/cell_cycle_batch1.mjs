/**
 * Batch 1: Cell Cycle and Cell Division (Questions 1 to 34)
 * Source: Image 1 & 2 (Pages 23, 24, 25)
 */

export const batch1Questions = [
  {
    question_text: "Which of the following is not a feature of interphase?",
    option_a: "Cells prepare for cell division",
    option_b: "Period of intense synthesis and growth",
    option_c: "Hereditary material present in form of distinct chromosomes",
    option_d: "Cells spend more than 95% of total duration in this phase",
    correct_option: "C",
    explanation: "During interphase, the genetic material is in the form of loose, indistinct chromatin fibres, not distinct condensed chromosomes. Chromosomes condense into distinct visible bodies only during M-phase (prophase onwards).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Match the following columns correctly w.r.t. cell cycle events and their functions:\n\nColumn-I:\nA. G1 phase\nB. G0 phase\nC. G2 phase\nD. S phase\n\nColumn-II:\n(i) Mitochondria and chloroplast division\n(ii) Amino acid, RNA and enzyme synthesis\n(iii) DNA replication\n(iv) Quiescent phase",
    option_a: "A(i), B(iv), C(ii), D(iii)",
    option_b: "A(i), B(i), C(iii), D(iv)",
    option_c: "A(ii), B(iv), C(i), D(iii)",
    option_d: "A(i), B(iii), C(ii), D(iv)",
    correct_option: "C",
    explanation: "G1 phase is marked by synthesis of amino acids, RNAs, and enzymes required for DNA synthesis; G0 is the inactive quiescent stage; G2 phase involves duplication of semi-autonomous organelles (mitochondria, chloroplast); S phase involves replication of nuclear DNA.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Dictyotene is:",
    option_a: "Suspended diplotene",
    option_b: "A transition phase between zygotene and pachytene",
    option_c: "Found in oocytes of some vertebrates",
    option_d: "Both (1) and (3)",
    correct_option: "D",
    explanation: "Dictyotene is a prolonged suspended diplotene stage observed in developing primary oocytes of some vertebrates including human females, where meiosis is arrested for months or years.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "A diploid cell has 68 chromosomes. How many bivalents will be formed in this cell during Meiosis-I?",
    option_a: "68",
    option_b: "34",
    option_c: "136",
    option_d: "14",
    correct_option: "B",
    explanation: "A bivalent is formed by a pair of synapsed homologous chromosomes. Therefore, number of bivalents = 2n / 2 = 68 / 2 = 34.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Meiosis-II differs from mitosis as the former:",
    option_a: "Occurs in both haploid and diploid cells",
    option_b: "Is not preceded by interphase",
    option_c: "Is reductional cell division",
    option_d: "Produces two daughter cells",
    correct_option: "B",
    explanation: "Meiosis-II is preceded by a short-lived interkinesis that lacks an S phase (no DNA replication), whereas mitosis is preceded by a full interphase (G1, S, G2).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "M phase in human lasts for _____ of the duration of cell cycle.",
    option_a: "60%",
    option_b: "75%",
    option_c: "40%",
    option_d: "<5%",
    correct_option: "D",
    explanation: "In a typical 24-hour human cell cycle, M phase lasts for about an hour, which is less than 5% (<5%) of the total cell cycle duration, while interphase accounts for more than 95%.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Match the following columns and select the correct option:\n\nColumn-I:\nA. Leptotene\nB. Zygotene\nC. Pachytene\nD. Diakinesis\n\nColumn-II:\n(i) Synapsis\n(ii) Bouquet stage\n(iii) Terminalisation of chiasmata\n(iv) Crossing over",
    option_a: "A(ii), B(i), C(iv), D(iii)",
    option_b: "A(i), B(ii), C(iii), D(iv)",
    option_c: "A(ii), B(i), C(iii), D(iv)",
    option_d: "A(iv), B(i), C(ii), D(iii)",
    correct_option: "A",
    explanation: "In leptotene, chromosomes condense and in animals often form a bouquet stage; in zygotene, synapsis of homologous chromosomes occurs; in pachytene, crossing over takes place; in diakinesis, terminalisation of chiasmata is completed.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "During S-phase of cell cycle:",
    option_a: "Replication of DNA takes place",
    option_b: "Synthesis of tubulin protein takes place",
    option_c: "Translation takes place",
    option_d: "Both (1) & (3)",
    correct_option: "D",
    explanation: "During S-phase, replication of DNA occurs in the nucleus while synthesis of histone proteins (translation) occurs simultaneously in the cytoplasm.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Which event takes place in interkinesis?",
    option_a: "DNA replication",
    option_b: "Synthesis of centrosome",
    option_c: "Histone synthesis",
    option_d: "Nucleolus synthesis",
    correct_option: "B",
    explanation: "Interkinesis is generally short lived and there is no DNA replication or histone synthesis. However, centriole duplication / centrosome synthesis takes place during interkinesis in animal cells.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "The sequence of events by which a cell duplicates its genome, synthesizes other constituents of the cell and eventually divides into two daughter cells is called:",
    option_a: "Cell division",
    option_b: "Karyokinesis",
    option_c: "Cell cycle",
    option_d: "Cytokinesis",
    correct_option: "C",
    explanation: "According to NCERT, the sequence of events by which a cell duplicates its genome, synthesises the other constituents of the cell and eventually divides into two daughter cells is termed cell cycle.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Find the incorrect statement w.r.t. cell cycle:",
    option_a: "Growth of cell occurs in all phases of a cell cycle",
    option_b: "Interphase is a phase between two successive M phases",
    option_c: "Interphase period differs from cell to cell",
    option_d: "Time period of G1 phase is constant for all the cells of a species",
    correct_option: "D",
    explanation: "The duration of G1 phase varies widely among different cell types of an organism or species (from a few hours to days or permanently in non-dividing cells in G0), hence it is not constant.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "The number of bivalents is 30 in a cell. What will be number of chromosomes seen during Anaphase-II at each pole?",
    option_a: "15",
    option_b: "30",
    option_c: "60",
    option_d: "10",
    correct_option: "B",
    explanation: "If number of bivalents is 30, diploid number 2n = 60, and haploid number n = 30. Meiosis-I separates homologous chromosomes so each daughter cell gets 30 chromosomes (with 2 chromatids each). In Anaphase-II, centromeres split and 30 chromatids (now individual chromosomes) move to each pole.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Read the following statements and choose the correct option w.r.t. interphase of cell cycle:\nA. Synthesis of histone protein.\nB. Amount of DNA becomes double.\nC. Number of chromosomes becomes double.\nD. Duplication of centriole occurs.",
    option_a: "Only A, B and C are correct",
    option_b: "Only C and D are correct",
    option_c: "Only C is incorrect",
    option_d: "All A, B, C and D are correct",
    correct_option: "C",
    explanation: "In interphase (specifically S phase), DNA content doubles (from 2C to 4C) and centrioles duplicate, but the chromosome number remains unchanged (2n). Thus, statement C is incorrect while A, B, and D are correct.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Find the correct sequence of events of cell cycle:",
    option_a: "Nucleotide synthesis -> Histone synthesis -> Tubulin synthesis -> Centromere division",
    option_b: "Nucleotide synthesis -> Histone synthesis -> Centromere division -> Tubulin synthesis",
    option_c: "Tubulin synthesis -> Nucleotide synthesis -> Histone synthesis -> Centromere division",
    option_d: "Centromere division -> Nucleotide synthesis -> Histone synthesis -> Tubulin synthesis",
    correct_option: "A",
    explanation: "Nucleotide synthesis occurs in G1 phase -> Histone synthesis occurs during S phase -> Tubulin protein synthesis occurs in G2 phase -> Centromere division occurs during Anaphase of M phase.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Match the following columns and select the correct option:\n\nColumn-I:\nA. Pairing of homologous chromosomes\nB. Recombinase mediated activity\nC. Chiasmata becomes visible\nD. Final stage of prophase-I\n\nColumn-II:\n(i) Diakinesis\n(ii) Diplotene\n(iii) Pachytene\n(iv) Zygotene",
    option_a: "A(iv), B(iii), C(ii), D(i)",
    option_b: "A(iv), B(ii), C(i), D(iii)",
    option_c: "A(ii), B(iii), C(i), D(iv)",
    option_d: "A(ii), B(iv), C(i), D(iii)",
    correct_option: "A",
    explanation: "Pairing (synapsis) occurs in zygotene; recombinase enzyme acts during pachytene (crossing over); chiasmata become visible in diplotene due to dissolution of the synaptonemal complex; diakinesis is the final stage of prophase-I.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "All of these events occur during the diplotene stage, except:",
    option_a: "Completion of crossing over",
    option_b: "Complete separation of homologous chromosomes into two cells",
    option_c: "Dissolution of synaptonemal complex",
    option_d: "Chiasmata is visible",
    correct_option: "B",
    explanation: "Complete separation of homologous chromosomes into two daughter cells occurs at the end of Meiosis-I (Anaphase-I and Telophase-I), not during the diplotene stage.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Find the odd one with respect to Metaphase I:",
    option_a: "Chromosomes move into cytoplasm after the disintegration of nuclear envelope",
    option_b: "Bivalent chromosome align themselves on the equatorial plate",
    option_c: "The centromeres of the two chromosomes are arranged in two rows at equator",
    option_d: "Nucleolus disappears",
    correct_option: "D",
    explanation: "Disappearance of the nucleolus and nuclear envelope is completed during diakinesis (late prophase-I), not during metaphase-I.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Which of the following is not the significance of mitosis?",
    option_a: "Helps in growth",
    option_b: "Helps in restoring nucleo-cytoplasmic ratio",
    option_c: "Brings out variation",
    option_d: "Helps in healing and regeneration",
    correct_option: "C",
    explanation: "Mitosis results in genetically identical daughter cells (clones). Introduction of genetic variation is the characteristic significance of meiosis due to crossing over and independent assortment.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Select the odd one w.r.t. cytokinesis in plant cell:",
    option_a: "Cell plate formation",
    option_b: "Phragmoplast formation",
    option_c: "Centripetal",
    option_d: "Centrifugal",
    correct_option: "C",
    explanation: "Plant cytokinesis is centrifugal (growing from the centre towards the lateral walls) via phragmoplast and cell plate formation. Centripetal cytokinesis (cleavage furrowing from outside inward) occurs in animal cells.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Match the given columns and select the correct option:\n\nColumn-I:\n(A) G0\n(B) G1 -> S transition\n(C) S\n(D) G2\n\nColumn-II:\n(i) Major check point\n(ii) Centriole duplication\n(iii) Cell suspends cell cycle\n(iv) Tubulin protein synthesis",
    option_a: "A(iii), B(i), C(ii), D(iv)",
    option_b: "A(iii), B(iv), C(ii), D(i)",
    option_c: "A(iv), B(iii), C(i), D(ii)",
    option_d: "A(i), B(ii), C(iv), D(ii)",
    correct_option: "A",
    explanation: "G0 is the quiescent phase where cell suspends cycle; G1->S transition is the major restriction check point; S phase involves centriole duplication; G2 phase involves tubulin protein synthesis.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "M-phase of cell cycle includes:",
    option_a: "Karyokinesis",
    option_b: "Interphase",
    option_c: "Cytokinesis",
    option_d: "Both (1) and (3)",
    correct_option: "D",
    explanation: "M-phase (mitotic phase) consists of nuclear division (karyokinesis) followed by cytoplasmic division (cytokinesis).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "The phase between two successive M phases is:",
    option_a: "G1",
    option_b: "S",
    option_c: "G2",
    option_d: "Interphase",
    correct_option: "D",
    explanation: "The interphase represents the phase between two successive M phases where cell growth and DNA replication occur.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Which one is correct with respect to mitosis?",
    option_a: "Prophase is shortest phase",
    option_b: "It occurs only in apical meristem",
    option_c: "It occurs in diploid cells only",
    option_d: "It helps in growth and repair in multicellular organisms",
    correct_option: "D",
    explanation: "Mitosis provides new cells for growth, development, and tissue repair/regeneration in multicellular organisms. (Anaphase is the shortest phase; mitosis also occurs in lateral and intercalary meristems, and in haploid cells of some plants and male honeybees).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Formation of synaptonemal complex takes place in:",
    option_a: "Leptotene",
    option_b: "Zygotene",
    option_c: "Pachytene",
    option_d: "Diakinesis",
    correct_option: "B",
    explanation: "Electron micrographs show that chromosome synapsis is accompanied by the formation of a complex structure called the synaptonemal complex during the zygotene stage of prophase-I.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Centromere of chromosomes split and chromatids separate in:",
    option_a: "Mitotic anaphase and Meiotic anaphase I",
    option_b: "Mitotic anaphase and Meiotic anaphase II",
    option_c: "Mitotic metaphase and Meiotic anaphase I",
    option_d: "Mitotic anaphase and Meiotic metaphase I",
    correct_option: "B",
    explanation: "Centromeres divide and sister chromatids separate to opposite poles in mitotic anaphase and anaphase-II of meiosis. In anaphase-I, homologous chromosome pairs separate without splitting of centromeres.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Sister chromatids separate during:",
    option_a: "Anaphase II",
    option_b: "Prophase II",
    option_c: "Metaphase II",
    option_d: "Telophase II",
    correct_option: "A",
    explanation: "During anaphase-II of meiosis, the centromere holding sister chromatids splits, allowing them to separate and move toward opposite poles.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Which is incorrect w.r.t. meiosis?",
    option_a: "Twice duplication of centrioles in animal cell",
    option_b: "Single karyokinesis",
    option_c: "Chromosome number reduces to half in daughter cells",
    option_d: "Single cycle of DNA replication",
    correct_option: "B",
    explanation: "Meiosis involves TWO sequential cycles of nuclear and cell division (karyokinesis I and II), but only a single cycle of DNA replication during S phase preceding meiosis I.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "Morphology of chromosome and karyotype are most easily studied in:",
    option_a: "Prophase",
    option_b: "Metaphase",
    option_c: "Anaphase",
    option_d: "Telophase",
    correct_option: "B",
    explanation: "At metaphase, chromosomes are shortest, thickest, maximally condensed, and aligned at the equatorial plate, making it the best stage to study chromosome morphology, size, and karyotype.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Statement A: DNA content of a cell becomes 4C from 2C in S-phase.\nStatement B: DNA replication takes place in S-phase.",
    option_a: "Both statements are true and the statement B is the correct explanation of the statement A",
    option_b: "Both statements are true but the statement B is not the correct explanation of the statement A",
    option_c: "Statement A is true but statement B is false",
    option_d: "Both statements are false",
    correct_option: "A",
    explanation: "During S phase, DNA replication occurs which doubles the amount of DNA per cell from 2C to 4C. Thus, both statements are true and Statement B is the correct explanation of Statement A.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "How many pairs of homologous chromosomes will be found in metaphase in a haploid cell having a total of 60 chromosomes?",
    option_a: "120",
    option_b: "30",
    option_c: "60",
    option_d: "0",
    correct_option: "D",
    explanation: "A haploid cell possesses only a single set of chromosomes (n = 60). Since homologous chromosomes exist in pairs only in diploid or polyploid cells, there are 0 pairs of homologous chromosomes in a haploid cell.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_text: "If karyokinesis is not followed by cytokinesis, then it gives rise to:",
    option_a: "Zygote",
    option_b: "Fertilised egg",
    option_c: "Multinucleate condition",
    option_d: "Embryo",
    correct_option: "C",
    explanation: "In some organisms, karyokinesis is not followed by cytokinesis, leading to the formation of a multinucleate condition known as a syncytium (e.g., liquid endosperm in coconut).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "If there are 20 chromosomes in G1 phase then what will be the chromosome number after S phase?",
    option_a: "20",
    option_b: "40",
    option_c: "80",
    option_d: "10",
    correct_option: "A",
    explanation: "During S-phase, DNA replicates and doubles its amount, but the number of chromosomes remains the same. If the cell had 20 chromosomes at G1, it will still have 20 chromosomes after S-phase.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "A yeast and a human cell completes cell cycle in _____ and _____ respectively.",
    option_a: "90 minutes, 1440 minutes",
    option_b: "1440 minutes, 90 minutes",
    option_c: "30 minutes, 60 minutes",
    option_d: "60 minutes, 30 minutes",
    correct_option: "A",
    explanation: "Yeast (Saccharomyces cerevisiae) can progress through the cell cycle in only about 90 minutes, whereas a typical human cell in culture divides once in approximately 24 hours (1440 minutes).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_text: "Protein required for spindle apparatus formation is synthesised during:",
    option_a: "G1 phase",
    option_b: "S phase",
    option_c: "G2 phase",
    option_d: "M phase",
    correct_option: "C",
    explanation: "During G2 phase, proteins (specifically tubulin) required for spindle apparatus and microtubule assembly are synthesised while cell growth continues.",
    marks: 4,
    difficulty: "easy"
  }
];

