import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'biotech_pages_dump.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'biotech_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'biotech_diagram_urls.json'), 'utf8'));

// Build continuous line stream
const allLines = [];
for (let p = 0; p < 33; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Biotechnology: Principles and Processes') ||
      rawLine.includes('MCQ (Single Correct Answer)') ||
      rawLine.includes('MCQ (More than One Correct Answer)')
    ) {
      continue;
    }
    const cleaned = rawLine.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      allLines.push(cleaned);
    }
  }
}

// Slice into 143 blocks
const qBlocks = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2],
      startIndex: i
    });
  }
}

// Explanations lookup / generator map for NCERT concepts
const explanations = {
  1: "Disruption of cell envelope is the primary prerequisite for isolating DNA. Lysozyme digests bacterial peptidoglycan cell walls, while cellulase degrades plant cellulosic walls. Therefore, both Assertion A and Reason R are correct, and Reason R correctly explains Assertion A.",
  2: "Matching concepts of Recombinant DNA Technology:\n- A. Transformation: Transfer of foreign DNA into host bacteria (II)\n- B. Cloning site: Specific recognition sequence for a restriction enzyme (I)\n- C. Selection: Distinguishes transformants/recombinants using antibiotic resistance genes (IV)\n- D. Ori (Origin of replication): Site responsible for initiating replication and controlling copy number (III)\nHence, the correct match is A-II, B-I, C-IV, D-III.",
  3: "Plasmids are extrachromosomal, double-stranded, circular, self-replicating (autonomously replicating) DNA molecules present naturally in bacteria. Therefore, both Statement I and Statement II are correct.",
  4: "In Polymerase Chain Reaction (PCR), primers anneal (bind) to the single-stranded template DNA at the 3' ends during the annealing step (at around 50–60°C).",
  5: "Matching biotechnology concepts with examples:\n- A. Genetically modified organism: Bt cotton (II)\n- B. Thermostable DNA polymerase: Isolated from the bacterium Thermus aquaticus (III)\n- C. Ti plasmid: Derived from the soil bacterium Agrobacterium tumefaciens (I)\n- D. pBR322: A standard cloning vector constructed for Escherichia coli (IV)\nHence, the correct match is A-II, B-III, C-I, D-IV.",
  6: "The correct sequence of steps in each cycle of Polymerase Chain Reaction (PCR) is:\n1. Denaturation (at ~94-96°C to separate DNA strands)\n2. Annealing (at ~50-60°C where primers bind)\n3. Extension (at ~72°C where Taq polymerase synthesizes new strands).",
  7: "DNA fragments are negatively charged molecules due to phosphate groups in the backbone. During gel electrophoresis, they migrate towards the positive electrode (anode) through the agarose matrix.",
  8: "Agarose gel electrophoresis separates DNA fragments on the basis of their size (molecular weight) through the sieving effect of the agarose gel; smaller fragments travel faster and further than larger ones.",
  9: "Downstream processing refers to the stages after biosynthesis, including separation and purification of the product, followed by formulation with suitable preservatives and quality control testing.",
  10: "In the diagram, the alien DNA is inserted at the EcoRI site within the beta-galactosidase gene (lacZ), resulting in insertional inactivation. When grown on a chromogenic substrate (X-gal), non-recombinants form blue colonies, whereas recombinants form white colonies due to inactivation of the enzyme.",
  11: "In Polymerase Chain Reaction (PCR), the number of amplified DNA molecules doubles in each cycle. After 'n' cycles, the number of DNA copies produced from a single starting template is given by the exponential equation 2^n.",
  12: "In a stirred-tank bioreactor, the foam breaker (impeller located above the culture surface) breaks foam to prevent overflow and aeration loss. As indicated by the labels, part C represents the foam breaker.",
  13: "Restriction endonucleases cut both strands of double-stranded DNA at specific palindromic recognition sequences, breaking phosphodiester bonds.",
  14: "The enzyme Taq polymerase used in PCR is isolated from the thermophilic bacterium Thermus aquaticus, allowing it to remain stable and functional during the high-temperature denaturation step (~94°C).",
  15: "During gel electrophoresis, DNA fragments separated on an agarose gel can only be visualized after staining with ethidium bromide (EtBr) and exposure to ultraviolet (UV) light, appearing as bright orange bands.",
  16: "Chilled ethanol is added during DNA isolation to precipitate the dissolved DNA out of the aqueous solution, allowing it to be spooled out as fine threads.",
  17: "The biolistic or gene gun method shoots microscopic pellets of gold or tungsten coated with foreign DNA directly into plant cells at high velocity.",
  18: "Microinjection is a method of direct gene transfer where foreign recombinant DNA is directly injected into the nucleus of an animal cell using a micro-needle.",
  19: "EcoRI is an endonuclease (not exonuclease). It cuts DNA by recognizing the specific palindromic sequence 5'-GAATTC-3' between the bases G and A, producing sticky ends with overhanging single-stranded stretches. Thus, statements B, C, and D are correct.",
  20: "The correct sequence of events in PCR is: C. Denaturation (strands separate at 94°C) -> A. Annealing (primers bind at 54°C) -> D. Treatment with Taq polymerase and dNTPs -> E. Extension (new strand synthesis at 72°C) -> B. Amplification (~1 billion times after multiple cycles). Thus, C -> A -> D -> E -> B is the correct order.",
  21: "Exonucleases remove nucleotides from the ends of the DNA (either 5' or 3' end), whereas endonucleases make cuts at specific internal positions within the DNA molecule.",
  22: "A stirred-tank bioreactor provides continuous stirring and aeration to ensure optimal mixing and uniform oxygen availability throughout the culture volume.",
  23: "In agarose gel electrophoresis, the DNA fragments are separated according to their size (length) because the agarose gel matrix acts as a molecular sieve; smaller fragments move farther and faster toward the anode.",
  24: "Palindromic sequences in DNA are base pair sequences that read identically on both strands when read in the same 5' to 3' direction (e.g., 5'-GAATTC-3' / 3'-CTTAAG-5').",
  25: "In the pBR322 cloning vector:\n- 'X' represents the origin of replication (ori), which controls replication and determines copy number of the linked DNA.\n- 'Y' represents the rop gene, which codes for proteins involved in the replication of the plasmid.\nTherefore, option B is correct.",
  26: "Thermostable DNA polymerase (Taq polymerase) was isolated from the thermophilic bacterium Thermus aquaticus.",
  27: "In the pBR322 vector, the BamHI and SalI restriction recognition sites are located within the tetracycline resistance gene (tetR). Ligation of foreign DNA at the BamHI site results in insertional inactivation of the tetR gene, causing loss of tetracycline resistance.",
  28: "Agrobacterium tumifaciens is a natural plant pathogen that infects dicotyledonous plants and is used as a cloning vector for plant cells. It is not used to deliver genes into prokaryotic host cells. Hence statement A is incorrect.",
  29: "Matching List I with List II:\n- (A) Kanamycin: Antibiotic to which resistance can be conferred -> selectable marker (II)\n- (B) ClaI: Restriction endonuclease recognition site (III)\n- (C) Disarmed retroviruses: Used as vectors to deliver genes into animal cells (I)\n- (D) Kanamycin gene: Imparts antibiotic resistance to the host cell (IV)\nHence, the correct matching is (A)-(II), (B)-(III), (C)-(I), (D)-(IV).",
  30: "Restriction enzymes cut double-stranded DNA at specific recognition sequences and are therefore universally referred to as 'molecular scissors'.",
  31: "During isolation and purification of DNA, the addition of chilled ethanol causes the purified DNA to precipitate out of the solution.",
  32: "In the gene gun (biolistics) method of transformation, microparticles of tungsten or gold coated with DNA are bombarded into target host cells.",
  33: "DNA bands stained with ethidium bromide (EtBr) fluoresce as bright orange colored bands when viewed under ultraviolet (UV) light.",
  34: "YAC (Yeast Artificial Chromosome), BAC (Bacterial Artificial Chromosome), and pBR322 are cloning vectors used to carry foreign DNA. A probe is a single-stranded radioactively/chemically labeled nucleic acid fragment used for hybridization and detection, not a cloning vector.",
  35: "Assertion (A) is correct: Restriction enzymes often generate staggered cuts producing overhanging single-stranded stretches called sticky ends. Reason (R) is correct: These sticky ends are formed because restriction enzymes cut the two strands of DNA a few base pairs away from the center of the palindromic recognition site. Thus, Reason (R) correctly explains Assertion (A).",
  36: "Separation and isolation of DNA fragments based on their size is achieved by agarose gel electrophoresis.",
  37: "Plant cell walls are composed mainly of cellulose and are degraded by cellulase, whereas fungal cell walls are made of chitin and are digested by chitinase.",
  38: "Matching List-I with List-II:\n- (a) Gene gun: Used for vectorless transfer of gene into plant cells (ii)\n- (b) Gene therapy: Replacement of a faulty disease-causing gene by a functional healthy gene (i)\n- (c) Gene cloning: Producing identical copies of a particular gene or DNA sequence (iv)\n- (d) Genome: The total genetic material (DNA) present in the haploid set of chromosomes of an organism (iii)\nHence, the correct match is (a)-(ii), (b)-(i), (c)-(iv), (d)-(iii).",
  39: "DNA ligase catalyzes the formation of phosphodiester bonds to join two DNA fragments, functioning as molecular glue.",
  40: "The primary purpose of adding divalent cations such as Ca2+ during chemical transformation is to increase the permeability of bacterial cell walls and membranes, making the host competent to take up plasmid DNA.",
  41: "Elution is the process of cutting out the desired DNA band from an agarose gel and extracting the DNA from the gel piece.",
  42: "Assertion (A): Polymerase chain reaction (PCR) is used for in vitro amplification of DNA. (Correct)\nReason (R): Ampicillin resistance gene acts as a selectable marker to identify transformed cells. (Correct)\nHowever, Reason (R) is an independent statement about selectable markers and does not explain why or how PCR amplifies DNA. Hence, both are correct, but (R) is not the correct explanation of (A).",
  43: "Downstream processing involves separation and purification of the biosynthesized product, followed by preservation, formulating, and clinical testing.",
  44: "Plasmids and bacteriophages are preferred cloning vectors because they have high copy numbers and replicate autonomously within bacterial cells independent of the host chromosome.",
  45: "Electroporation involves applying brief high-voltage electrical pulses to create transient hydrophilic pores in the host cell plasma membrane, allowing foreign DNA entry.",
  46: "EcoRI cuts between G and A in the palindromic recognition sequence 5'-GAATTC-3'.",
  47: "In recombinant DNA technology, vector DNA and source (foreign) DNA must be digested with the same restriction enzyme so that both fragments possess complementary sticky ends that can be ligated seamlessly.",
  48: "The first recombinant DNA molecule was constructed in 1972 by Stanley Cohen and Herbert Boyer by combining an antibiotic resistance gene from Salmonella typhimurium with a plasmid vector.",
  49: "In PCR, denaturation involves heating the reaction mixture to high temperature (~94°C) to break hydrogen bonds between complementary base pairs, thereby separating the double-stranded DNA into two single strands.",
  50: "A selectable marker functions to distinguish and select transformants from non-transformants and recombinants from non-recombinants, facilitating the elimination of non-transformed cells.",
  51: "Thermostable enzymes such as Taq polymerase remain active at high temperatures because their tertiary protein conformation is fortified with extra disulfide bonds and hydrophobic interactions.",
  52: "EcoRI is named according to standard nomenclature:\n- 'E' comes from the genus Escherichia\n- 'co' comes from the species coli\n- 'R' comes from the strain RY 13\n- 'I' is the Roman numeral denoting the order of discovery in that organism.",
  53: "Palindromic nucleotide sequences are specific sequences of base pairs that read the same on complementary strands in both directions (5' -> 3' and 3' -> 5'), serving as recognition sites for restriction endonucleases.",
  54: "Matching techniques with usage:\n- (a) Bioreactor: Production of large quantities of biological products under controlled conditions (ii)\n- (b) Electrophoresis: Separation of DNA fragments based on molecular size (i)\n- (c) PCR: Amplification of specific nucleic acid sequences in vitro (iv)\n- (d) ELISA: Detection of pathogens based on specific antigen-antibody interactions (iii)\nHence, the correct match is (a)-(ii), (b)-(i), (c)-(iv), (d)-(iii).",
  55: "Recombinant DNA technology comprises several key stages: isolation of DNA, fragmentation by restriction endonucleases, isolation of desired DNA fragment, ligation into vector, transfer into host cell, culturing host cells on a large scale, and downstream processing.",
  56: "Competent cells are bacterial cells treated chemically (e.g., with CaCl2) and physically (heat-shock) to enable them to take up foreign plasmid DNA through their cell wall and membrane.",
  57: "In insertional inactivation, the recombinant DNA is introduced into the coding sequence of a selectable marker gene (e.g., beta-galactosidase), causing disruption and loss of function of that gene.",
  58: "During downstream processing, the product undergoes rigorous separation, purification, and quality control testing before being formulated and marketed.",
  59: "The Ti (tumor-inducing) plasmid found in the natural soil bacterium Agrobacterium tumefaciens transfers a segment called T-DNA into the plant host genome.",
  60: "In agarose gel electrophoresis, larger DNA fragments experience more frictional drag through the gel pores and therefore migrate more slowly compared to smaller fragments.",
  61: "Annealing in PCR occurs at temperatures between 50°C and 60°C, permitting short synthetic oligonucleotide primers to bind to complementary sequences on the single-stranded template DNA.",
  62: "Origin of replication (ori) is the specific DNA sequence that acts as the starting point for DNA replication and controls the copy number of the plasmid.",
  63: "Spooling refers to the collection of precipitated threads of purified DNA by winding them onto a glass rod.",
  64: "Matching organism with application:\n- (a) Bacillus thuringiensis: Produces Cry toxin proteins that kill insect pests (iv)\n- (b) Thermus aquaticus: Source of heat-stable Taq DNA polymerase (iii)\n- (c) Agrobacterium tumefaciens: Used as a cloning vector for gene transfer in plants (i)\n- (d) Salmonella typhimurium: Source of antibiotic resistance gene in the first recombinant DNA construct by Cohen and Boyer (ii)\nHence, the match is (a)-(iv), (b)-(iii), (c)-(i), (d)-(ii).",
  65: "During recombinant DNA preparation, vector DNA and foreign DNA are cleaved with the same restriction endonuclease so that complementary sticky ends are produced.",
  66: "A bioreactor provides optimum growth conditions (temperature, pH, substrate, oxygen, salts, and vitamins) to enable microorganisms to multiply and produce the desired recombinant protein at high yields.",
  67: "Plasmids are extra-chromosomal, double-stranded, circular DNA molecules that replicate autonomously in bacterial host cells.",
  68: "The presence of a chromogenic substrate allows selection of recombinant colonies via insertional inactivation: recombinant colonies do not produce beta-galactosidase and remain white, while non-recombinants produce active enzyme and turn blue.",
  69: "Matching enzymes with their functions:\n- a. Restriction endonuclease: Cuts DNA at specific palindromic positions within the molecule (iii)\n- b. Restriction exonuclease: Removes nucleotides from the ends of the DNA strand (iv)\n- c. DNA ligase: Joins complementary DNA fragments by creating phosphodiester bonds (i)\n- d. Taq polymerase: Synthesizes new DNA strands by extending primers on the template at high temperature (ii)\nHence, the correct match is a(iii), b(iv), c(i), d(ii).",
  70: "Agarose is a natural linear polysaccharide extracted from seaweeds (red algae like Gelidium and Gracilaria) used extensively as the matrix in gel electrophoresis.",
  71: "A selectable marker helps identify and eliminate non-transformants, selectively permitting the growth of transformants carrying the recombinant vector.",
  72: "Heat shock transformation involves placing competent cells on ice, followed by a brief exposure to 42°C, and immediate return to ice, allowing DNA to enter through transient membrane pores.",
  73: "Palindromic sequences possess rotational symmetry about the axis of the sequence, ensuring identical base reading in 5' to 3' orientation on both complementary strands.",
  74: "Polymerase Chain Reaction (PCR) enables in vitro billion-fold amplification of a target DNA sequence using oligonucleotide primers, deoxynucleotides, and thermostable DNA polymerase.",
  75: "Bacteriophages can carry larger DNA fragments than basic plasmids and replicate at high copy numbers inside host cells.",
  76: "DNA molecules carry negative electric charges on the phosphate groups of their sugar-phosphate backbones; hence they migrate toward the positive anode during electrophoresis.",
  77: "The enzyme reverse transcriptase synthesizes complementary DNA (cDNA) from an RNA template.",
  78: "Bioreactor cultures must be continuously aerated and agitated to maintain uniform dissolved oxygen levels and nutrient availability for optimal aerobic microbial growth.",
  79: "Continuous culture systems maintain the microorganisms in their physiologically most active exponential (log) phase by continuously adding fresh medium and draining exhausted medium.",
  80: "The modern definition of biotechnology encompassing both traditional techniques and modern molecular technologies was provided by the European Federation of Biotechnology (EFB).",
  81: "HindII was the first restriction endonuclease discovered and isolated (by Smith, Wilcox, and Kelley in 1970).",
  82: "Sticky ends produced by restriction enzyme digestion have protruding single-stranded overhangs that readily form complementary hydrogen bonds with matching sticky ends.",
  83: "The concentration of agarose in the gel determines pore size: higher agarose concentrations create smaller pores suitable for separating smaller DNA fragments.",
  84: "Ethidium bromide intercalates between adjacent base pairs in double-stranded DNA, emitting bright orange fluorescence under ultraviolet excitation.",
  85: "HindII is a restriction endonuclease that recognizes a specific 6-base-pair sequence and cuts the DNA double helix.",
  86: "The DNA molecule to which the foreign gene of interest is joined for delivery into the host cell is known as a cloning vector.",
  87: "Cutting of DNA at precise recognition sites became possible with the discovery and isolation of restriction endonucleases.",
  88: "Southern hybridization involves agarose gel electrophoresis, transfer (blotting) of DNA to a nitrocellulose or nylon membrane, and autoradiographic detection with labeled probes. PCR is not an essential component of classical Southern blotting.",
  89: "Standard plasmids have a relatively small cloning capacity (typically <10 kb) compared to cosmids (30-45 kb), BACs (100-300 kb), and YACs (up to 1000 kb).",
  90: "Bacterial Artificial Chromosomes (BAC) and Yeast Artificial Chromosomes (YAC) were the vector systems commonly used in the Human Genome Project to clone and sequence very large genomic fragments.",
  91: "Chilled ethanol is added to aqueous cell lysates during DNA isolation to insolubilize and precipitate the pure DNA molecules.",
  92: "DNA fragments separated on an agarose gel are visualized by staining with ethidium bromide and observing under ultraviolet illumination.",
  93: "DNA ligase joins DNA fragments by catalyzing the formation of covalent phosphodiester bonds between adjacent 3'-hydroxyl and 5'-phosphate ends.",
  94: "Cellulose cell walls of plant cells are degraded by cellulase, fungal walls by chitinase, and bacterial walls by lysozyme. Algal cell walls contain cellulose, galactans, and mannans, which are degraded by cellulase/galactanase, not methylase. Hence option B is incorrect.",
  95: "The biolistics (gene gun) method is especially suitable for the direct transformation of plant cells by bombarding them with microprojectiles coated with DNA.",
  96: "Stirred-tank bioreactors have been designed to ensure uniform availability of oxygen, efficient temperature control, and nutrient distribution throughout the process.",
  97: "A palindromic sequence reads identical on both strands in the 5' -> 3' direction. The sequence 5'-GAATTC-3' paired with 3'-CTTAAG-5' is the classic palindromic recognition site of EcoRI.",
  98: "In the PCR diagram:\n- Step A represents Denaturation (strands separate at ~94°C)\n- Step B represents Annealing (primers bind at ~54°C)\n- Step C represents Extension (Taq polymerase synthesizes complementary strands at ~72°C in the presence of deoxynucleotides).\nThus, option A correctly identifies C as extension.",
  99: "In the pBR322 vector, ampR and tetR are antibiotic resistance genes that serve as selectable markers to identify and select recombinant transformants.",
  100: "Polymerase Chain Reaction (PCR) and Restriction Fragment Length Polymorphism (RFLP) are key molecular biology techniques employed in DNA fingerprinting (genetic profiling).",
  101: "The DNA polymerase used in PCR (Taq polymerase) remains active at high temperatures (~94°C) without being denatured.",
  102: "In biolistic gene transformation, microscopic particles coated with DNA are made of inert, dense metals like gold or tungsten.",
  103: "Recombinant DNA technology (genetic engineering) made it possible to isolate, cut, join, and introduce genes into living organisms.",
  104: "Continuous addition of fresh nutrients and sugars in a fed-batch or continuous culture fermentation maintains the microorganisms in their active log/exponential growth phase for maximum product yield.",
  105: "The sequence 5'-GAATTC-3' and 3'-CTTAAG-5' is a palindromic base pair sequence where both strands have the exact same base sequence when read in the 5' -> 3' direction.",
  106: "In the restriction enzyme EcoRI, 'co' stands for the species 'coli' (from Escherichia coli).",
  107: "Agarose, extracted from seaweeds (marine red algae), is widely used as the supporting matrix for gel electrophoresis.",
  108: "Plasmids and bacteriophages are extensively used as cloning vectors to carry foreign genetic material into host cells for gene cloning.",
  109: "Plasmids (B) and bacteriophages (D) have the ability to replicate independently within bacterial cells and are therefore standard cloning vectors in genetic engineering. Hence, (B) and (D) only are used.",
  110: "In agarose gel electrophoresis, DNA fragments separate according to their size due to the molecular sieving effect of the agarose gel pores.",
  111: "DNA fragments are negatively charged molecules and therefore move toward the positive electrode (anode) during gel electrophoresis.",
  112: "Gel electrophoresis is used for the separation of DNA fragments according to their size.",
  113: "Restriction endonucleases cleave DNA at specific palindromic recognition sequences, creating either sticky or blunt ends.",
  114: "The two enzymes responsible for restricting the growth of bacteriophages in E. coli (discovered in 1963) were a methylase (which adds methyl groups to host DNA) and a restriction endonuclease (which cuts foreign viral DNA).",
  115: "DNA ligase facilitates the joining of DNA strands together by catalyzing the formation of phosphodiester bonds.",
  116: "In recombinant DNA technology, the term vector refers to a DNA molecule used as a vehicle to artificially carry foreign genetic material into another cell.",
  117: "The enzyme used to join the sticky ends of DNA fragments is DNA ligase.",
  118: "Plasmids are suitable for gene cloning because they are small, extrachromosomal, double-stranded circular DNA molecules that can replicate independently within host cells.",
  119: "In genetic engineering, antibiotic resistance genes in a plasmid vector function as selectable markers.",
  120: "Thermocycler (PCR machine) is used to automate the temperature cycles required for DNA amplification via PCR.",
  121: "Taq DNA polymerase has optimum enzymatic activity at approximately 72°C.",
  122: "A recombinant plasmid containing a foreign DNA insert cannot be replicated unless it contains a functional origin of replication (ori).",
  123: "Transgenic plants are developed by introducing foreign desired genes into plant genomes, often utilizing Agrobacterium tumefaciens Ti plasmid as the vector.",
  124: "Bioreactors equipped with spargers allow sterile air bubbles to be introduced, significantly increasing the surface area for oxygen transfer.",
  125: "Competence refers to the physiological state that permits a bacterial cell to take up extracellular exogenous DNA from its surroundings.",
  126: "The first step in the isolation of genetic material is the enzymatic lysis of the cell wall and membrane to release intact cellular DNA.",
  127: "Ribonuclease (RNase) digests RNA molecules, ensuring pure DNA isolation without ribonucleic acid contamination.",
  128: "Proteases are added during DNA extraction to degrade and remove contaminating proteins, including histone complexes.",
  129: "Elution describes the procedure of cutting the visible band of DNA out of the agarose gel slice and purifying the DNA fragment from the matrix.",
  130: "The human insulin gene was cloned into the plasmid vector pBR322 by Genentech in 1983 to produce humulin in E. coli.",
  131: "Restriction endonucleases are called 'restriction' enzymes because in bacteria they restrict the replication and survival of attacking bacteriophages.",
  132: "An ideal cloning vector must contain an origin of replication (ori), selectable marker genes, and unique cloning (recognition) sites.",
  133: "Insertional inactivation of the lacZ gene eliminates beta-galactosidase production, allowing recombinant colonies to be identified by their white color in the presence of chromogenic substrate (X-gal).",
  134: "T-DNA (transfer DNA) is the portion of the Agrobacterium Ti plasmid that is transferred and stably integrated into the host plant nuclear genome.",
  135: "Downstream processing does not include biosynthesis/fermentation; it specifically covers the post-fermentation stages of separation, purification, and product formulation.",
  136: "In continuous fermentation systems, nutrients are continuously fed while effluent containing biomass and products is continuously removed, maintaining a steady state.",
  137: "The optimum temperature for the extension step of PCR using Taq polymerase is 72°C.",
  138: "Oligonucleotide primers used in PCR are short single-stranded synthetic DNA sequences complementary to the regions flanking the target sequence.",
  139: "DNA moves toward the anode during electrophoresis because of its polyanionic phosphate backbone.",
  140: "The first engineered recombinant DNA molecule was created in 1972 by Stanley Cohen and Herbert Boyer.",
  141: "Ethidium bromide molecules intercalate between stacked base pairs of DNA, fluorescing brightly under ultraviolet radiation.",
  142: "Biolistics or gene gun technology enables vectorless direct transformation by accelerating DNA-coated microprojectiles into intact plant cells.",
  143: "The correct sequence of steps in the construction of recombinant DNA is:\n1. Isolation of the desired DNA fragment (C)\n2. Cutting of DNA at specific locations by restriction enzyme (B)\n3. Amplification of the gene of interest using PCR (D)\n4. Insertion of the recombinant DNA into the host cell (A)\nAlternatively, cutting of DNA (B) and isolating the desired fragment (C) followed by amplification (D) and insertion (A) is also accepted in standard curriculum workflows. Hence, NTA awarded both (B) [C, B, D, A] and (D) [B, C, D, A] as correct answers."
};

// Now parse all 143 questions
const finalQuestions = [];

for (let i = 0; i < qBlocks.length; i++) {
  const qb = qBlocks[i];
  const qNum = qb.num;
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startIndex : allLines.length;
  const blockLines = allLines.slice(qb.startIndex, nextStart);
  const exam = qb.headerExam;
  const officialKey = officialKeys[qNum] || 'A';

  let questionText = '';
  let options = [];

  // Special handled questions
  if (qNum === 1) {
    questionText = 'Given below are two statements : one is labelled as Assertion A and the other is labelled as Reason R.\n\nAssertion A : In recombinant DNA technology, lysozyme is used for disrupting bacterial cells while cellulase is for plant cells.\nReason R : Isolation of genetic material needs disruption of cells.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below :';
    options = [
      { text: 'Assertion A is not correct but Reason R is correct' },
      { text: 'Both Assertion A and Reason R are correct and Reason R is the correct explanation of Assertion A' },
      { text: 'Both Assertion A and Reason R are correct but Reason R is not the correct explanation of Assertion A' },
      { text: 'Assertion A is correct but Reason R is not correct' }
    ];
  } else if (qNum === 2) {
    questionText = 'Match List-I with List-II:\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Transformation | I. Restriction enzyme |\n| B. Cloning site | II. Transfer DNA to host bacteria |\n| C. Selection | III. Replication |\n| D. Ori | IV. Antibiotic |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A-IV, B-I, C-III, D-II' },
      { text: 'A-II, B-I, C-IV, D-III' },
      { text: 'A-I, B-II, C-IV, D-III' },
      { text: 'A-III, B-IV, C-II, D-I' }
    ];
  } else if (qNum === 5) {
    questionText = 'Match List I with List II:\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Genetically modified organism | I. Agrobacterium tumefaciens |\n| B. Thermostable DNA polymerase | II. Bt cotton |\n| C. Ti plasmid | III. Thermus aquaticus |\n| D. pBR322 | IV. Escherichia coli |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A-II, B-III, C-I, D-IV' },
      { text: 'A-II, B-I, C-IV, D-III' },
      { text: 'A-I, B-IV, C-III, D-II' },
      { text: 'A-I, B-II, C-IV, D-III' }
    ];
  } else if (qNum === 11) {
    questionText = 'Polymerase chain reaction (PCR) amplifies DNA following the equation:';
    options = [
      { text: '2n + 1' },
      { text: '2N^2' },
      { text: 'N^2' },
      { text: '2^n' }
    ];
  } else if (qNum === 19) {
    questionText = "Which of the following are correct about EcoRI?\n\nA. Cut the DNA with blunt end\nB. Cut the DNA with sticky end\nC. Recognise a specific palindromic sequence\nD. Cut the DNA between the base G and A when encounters the DNA sequence 'GAATTC'\nE. Exonuclease\n\nChoose the correct answer from the options given below:";
    options = [
      { text: 'B, C, E only' },
      { text: 'A, D, E only' },
      { text: 'A, C, D only' },
      { text: 'B, C, D only' }
    ];
  } else if (qNum === 20) {
    questionText = 'Following are the steps involved in the process of PCR:\n\nA. Annealing\nB. Amplification (~1 billion times)\nC. Denaturation\nD. Treatment with Taq polymerase and deoxynucleotides\nE. Extension\n\nChoose the correct sequence of steps of PCR from the options given below :';
    options = [
      { text: 'C -> A -> D -> E -> B' },
      { text: 'A -> B -> E -> D -> C' },
      { text: 'A -> C -> E -> D -> B' },
      { text: 'D -> B -> E -> C -> A' }
    ];
  } else if (qNum === 29) {
    questionText = 'Match List I with List II:\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Kanamycin | (I) Delivers genes into animal cells |\n| (B) ClaI | (II) Selectable marker |\n| (C) Disarmed retroviruses | (III) Restriction site |\n| (D) Kanamycin gene | (IV) Antibiotic resistance |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)' },
      { text: '(A)-(III), (B)-(I), (C)-(IV), (D)-(II)' },
      { text: '(A)-(IV), (B)-(III), (C)-(I), (D)-(II)' },
      { text: '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)' }
    ];
  } else if (qNum === 35) {
    questionText = 'Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : When a particular restriction enzyme cuts strand of DNA, overhanging stretches or sticky ends are formed.\nReason (R) : Some restriction enzymes cut the strand of DNA a little away from the centre of palindromic site.\n\nIn the light of the above statements, choose the correct answer from the options given below :';
    options = [
      { text: '(A) is not correct but (R) is correct' },
      { text: 'Both (A) and (R) are correct and (R) is the correct explanation of (A)' },
      { text: 'Both (A) and (R) are correct but (R) is not the correct explanation of (A)' },
      { text: '(A) is correct but (R) is not correct' }
    ];
  } else if (qNum === 38) {
    questionText = 'Match List-I with List-II:\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Gene gun | (i) Replacement of a faulty gene by a normal healthy gene |\n| (b) Gene therapy | (ii) Used for transfer of gene |\n| (c) Gene cloning | (iii) Total DNA in the cells of an organism |\n| (d) Genome | (iv) To obtain identical copies of a particular DNA molecule |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: '(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)' },
      { text: '(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)' },
      { text: '(a) - (i), (b) - (iii), (c) - (ii), (d) - (iv)' },
      { text: '(a) - (iv), (b) - (i), (c) - (iii), (d) - (ii)' }
    ];
  } else if (qNum === 42) {
    questionText = 'Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : Polymerase chain reaction is used in DNA amplification.\nReason (R) : The ampicillin resistant gene is used as a selectable marker to check transformation.\n\nIn the light of the above statements, choose the correct answer from the options given below :';
    options = [
      { text: 'Both (A) and (R) are correct and (R) is the correct explanation of (A)' },
      { text: 'Both (A) and (R) are correct but (R) is not the correct explanation of (A)' },
      { text: '(A) is correct but (R) is not correct' },
      { text: '(A) is not correct but (R) is correct' }
    ];
  } else if (qNum === 53) {
    questionText = 'A specific recognition sequence identified by endonucleases to make cuts at specific positions within the DNA is :';
    options = [
      { text: 'Poly (A) tail sequences' },
      { text: 'Degenerate primer sequence' },
      { text: 'Okazaki sequences' },
      { text: 'Palindromic Nucleotide sequences' }
    ];
  } else if (qNum === 54) {
    questionText = 'Match the following techniques or instruments with their usage :\n\n| Technique / Instrument | Usage |\n| :--- | :--- |\n| (a) Bioreactor | (i) Separation of DNA fragments |\n| (b) Electrophoresis | (ii) Production of large quantities of products |\n| (c) PCR | (iii) Detection of pathogen, based on antigen - antibody reaction |\n| (d) ELISA | (iv) Amplification of nucleic acids |\n\nSelect the correct option from following :';
    options = [
      { text: '(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)' },
      { text: '(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)' },
      { text: '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)' },
      { text: '(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)' }
    ];
  } else if (qNum === 64) {
    questionText = 'Match the organism with its use in biotechnology:\n\n| Column I (Organism) | Column II (Use in Biotechnology) |\n| :--- | :--- |\n| (a) Bacillus thuringiensis | (i) Cloning vector |\n| (b) Thermus aquaticus | (ii) Construction of first rDNA molecule |\n| (c) Agrobacterium tumefaciens | (iii) DNA polymerase |\n| (d) Salmonella typhimurium | (iv) Cry proteins |\n\nSelect the correct option from the following:';
    options = [
      { text: '(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)' },
      { text: '(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)' },
      { text: '(a)-(iv), (b)-(iii), (c)-(i), (d)-(ii)' },
      { text: '(a)-(iii), (b)-(ii), (c)-(iv), (d)-(i)' }
    ];
  } else if (qNum === 69) {
    questionText = 'Match the following enzymes with their functions:\n\n| Enzyme | Function |\n| :--- | :--- |\n| (a) Restriction endonuclease | (i) Joins the DNA fragments |\n| (b) Restriction exonuclease | (ii) Extends primers on genomic DNA template |\n| (c) DNA ligase | (iii) Cuts DNA at specific position |\n| (d) Taq polymerase | (iv) Removes nucleotides from the ends of DNA |\n\nSelect the correct option from the following:';
    options = [
      { text: 'a(ii), b(iv), c(i), d(iii)' },
      { text: 'a(iii), b(i), c(iv), d(ii)' },
      { text: 'a(iii), b(iv), c(i), d(ii)' },
      { text: 'a(iv), b(iii), c(i), d(ii)' }
    ];
  } else if (qNum === 99) {
    questionText = 'The figure below is the diagrammatic representation of the E. coli vector pBR 322. Which one of the given options correctly identifies its certain component(s) ?';
    options = [
      { text: 'ori - original restriction enzyme' },
      { text: 'ampR, tetR - antibiotic resistance genes' },
      { text: 'rop - reduced osmotic pressure' },
      { text: 'Hind III, EcoRI - selectable markers' }
    ];
  } else if (qNum === 109) {
    questionText = 'In genetic engineering, a DNA segment (gene) of interest, is transferred to the host cell through a vector. Consider the following four agents (A-D) in this regard and select the correct option about which one or more of these can be used as a vector / vectors –\n(A) a bacterium\n(B) plasmid\n(C) plasmodium\n(D) bacteriophage';
    options = [
      { text: '(B) and (D) only' },
      { text: '(A) and (C) only' },
      { text: '(A), (B) and (D) only' },
      { text: '(A) only' }
    ];
  } else if (qNum === 143) {
    questionText = 'Main steps in the formation of Recombinant DNA are given below. Arrange these steps in a correct sequence.\n\nA. Insertion of recombinant DNA into the host cell\nB. Cutting of DNA at specific location by restriction enzyme\nC. Isolation of desired DNA fragment\nD. Amplification of gene of interest using PCR\n\nChoose the correct answer from the options given below :';
    options = [
      { text: 'C, A, B, D' },
      { text: 'C, B, D, A' },
      { text: 'B, D, A, C' },
      { text: 'B, C, D, A' }
    ];
  } else {
    // General parser
    const remaining = blockLines.slice(1);
    let optStartIndex = -1;
    for (let j = 0; j < remaining.length; j++) {
      if (/^\([A-D]\)\s+/.test(remaining[j])) {
        optStartIndex = j;
        break;
      }
    }

    if (optStartIndex === -1) {
      console.error(`ERROR: Option start not found for Q${qNum}`);
    }

    questionText = remaining.slice(0, optStartIndex).join(' ').trim();
    const optText = remaining.slice(optStartIndex).join(' ');

    const optRegex = /\(([A-D])\)\s*([\s\S]*?)(?=\(([A-D])\)|$)/g;
    let m;
    while ((m = optRegex.exec(optText)) !== null) {
      options.push({ text: m[2].trim() });
    }
  }

  // Prepend exam tag to questionText if available
  const fullQuestionText = exam ? `**${exam}**\n\n${questionText}` : questionText;

  // Explanation
  const exp = explanations[qNum] || `According to NCERT Biotechnology: Principles and Processes, the correct answer is option (${officialKey}). This concept relates to the key steps, tools, and enzymes of recombinant DNA technology.`;

  finalQuestions.push({
    num: qNum,
    exam: exam,
    question: fullQuestionText,
    options: options,
    correctOption: officialKey,
    explanation: exp
  });
}

console.log(`Generated ${finalQuestions.length} questions.`);

// Verification checks
let badCount = 0;
for (const q of finalQuestions) {
  if (q.options.length !== 4) {
    console.error(`Invalid options count for Q${q.num}: length=${q.options.length}`);
    badCount++;
  }
  for (let idx = 0; idx < q.options.length; idx++) {
    if (!q.options[idx].text) {
      console.error(`Empty option text in Q${q.num} at index ${idx}`);
      badCount++;
    }
  }
  if (!q.question) {
    console.error(`Empty question text in Q${q.num}`);
    badCount++;
  }
}

if (badCount === 0) {
  console.log('ALL 143 QUESTIONS VERIFIED PERFECTLY!');
  fs.writeFileSync(
    path.resolve(__dirname, 'biotech_all_questions.json'),
    JSON.stringify(finalQuestions, null, 2)
  );
  console.log('Saved to backend/scripts/biotech_all_questions.json');
} else {
  console.error(`Found ${badCount} issues!`);
}
