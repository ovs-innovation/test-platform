// Batch 8: Botany - Biological Classification Assertion - Reason Questions (16 questions)
const arOptions = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batch8Questions = [
  {
    question_type: "assertion_reason",
    assertion_text: "Nucleoprotein entity which is able to utilize the synthetic machinery of a living organism is obligate parasite.",
    reason_text: "It is inert outside the host cell.",
    question_text: "Assertion (A): Nucleoprotein entity which is able to utilize the synthetic machinery of a living organism is obligate parasite.\nReason (R): It is inert outside the host cell.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Viruses",
    solution: "Viruses are non-cellular nucleoprotein entities. They are obligate intracellular parasites because outside a living host cell they are inert crystalline structures with no synthetic or metabolic machinery of their own."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Viroids are the smallest self replicating particles.",
    reason_text: "They are infectious ss-RNA particles.",
    question_text: "Assertion (A): Viroids are the smallest self replicating particles.\nReason (R): They are infectious ss-RNA particles.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Viroids",
    solution: "Viroids, discovered by T.O. Diener, are the smallest known self-replicating infectious agents. They consist of a free, low molecular weight single-stranded circular RNA without any protein coat."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Heterocysts are thick walled nitrogen fixing structures in BGA.",
    reason_text: "These have chlorophyll 'a'.",
    question_text: "Assertion (A): Heterocysts are thick walled nitrogen fixing structures in BGA.\nReason (R): These have chlorophyll 'a'.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Cyanobacteria & Heterocysts",
    solution: "Heterocysts are thick-walled specialized cells in cyanobacteria (e.g. Nostoc, Anabaena) that fix atmospheric nitrogen. They lack functional photosystem II (and thus oxygen evolution) to maintain strictly anaerobic conditions for the enzyme nitrogenase. Therefore, the reason is false."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Five kingdom system is a phylogenetic system.",
    reason_text: "Monerans are common ancestor of all kingdoms and includes nutritionally one type of organisms.",
    question_text: "Assertion (A): Five kingdom system is a phylogenetic system.\nReason (R): Monerans are common ancestor of all kingdoms and includes nutritionally one type of organisms.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Five Kingdom Classification",
    solution: "R.H. Whittaker's five-kingdom classification is phylogenetic as it reflects evolutionary relationships. However, the reason is false because bacteria (Monera) show the most extensive metabolic/nutritional diversity (photoautotrophs, chemoautotrophs, saprophytes, parasites), not just one type."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Woese found that the six kingdoms naturally cluster into three main domains.",
    reason_text: "Progenote is believed to be originated from these domains.",
    question_text: "Assertion (A): Woese found that the six kingdoms naturally cluster into three main domains.\nReason (R): Progenote is believed to be originated from these domains.",
    options: arOptions,
    correct_index: 2,
    difficulty: "hard",
    topic: "Three Domains of Life",
    solution: "Carl Woese divided all life into three domains (Archaea, Bacteria, Eukarya) based on 16S rRNA gene sequencing. The progenote is the hypothetical primitive ancestor from which these three domains evolved (the domains originated from the progenote, not vice versa)."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "VAM are endotrophic mycorrhiza.",
    reason_text: "They help in phosphate absorption from soil.",
    question_text: "Assertion (A): VAM are endotrophic mycorrhiza.\nReason (R): They help in phosphate absorption from soil.",
    options: arOptions,
    correct_index: 1,
    difficulty: "medium",
    topic: "Mycorrhiza",
    solution: "Both statements are correct. Vesicular-Arbuscular Mycorrhizae (VAM) are endomycorrhizae because hyphae penetrate cortical cells. They greatly enhance phosphorus uptake from the soil. However, phosphate absorption does not explain why they are classified as endotrophic (penetration of host tissue does)."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Plasmid and bacterial chromosome are similar in their double stranded circular nature.",
    reason_text: "Plasmid is an extra chromosomal circular DNA found in all organisms.",
    question_text: "Assertion (A): Plasmid and bacterial chromosome are similar in their double stranded circular nature.\nReason (R): Plasmid is an extra chromosomal circular DNA found in all organisms.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Bacterial Genetics",
    solution: "Assertion is true as both plasmids and the bacterial main chromosome consist of double-stranded circular DNA. Reason is false because plasmids are extrachromosomal elements found primarily in prokaryotes and some lower eukaryotes (like yeast), not in all organisms."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Mycelium is septate and coenocytic in members of oomycetes.",
    reason_text: "Mycelial cells show karyokinesis without failure of septa formation.",
    question_text: "Assertion (A): Mycelium is septate and coenocytic in members of oomycetes.\nReason (R): Mycelial cells show karyokinesis without failure of septa formation.",
    options: arOptions,
    correct_index: 3,
    difficulty: "medium",
    topic: "Phycomycetes",
    solution: "Both statements are false. In Oomycetes (Phycomycetes), mycelium is aseptate and coenocytic (not septate). Coenocytic condition arises because repeated nuclear division (karyokinesis) is not followed by cytokinesis / septa formation."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Fungi are widespread in distribution.",
    reason_text: "They have evolved various nutrition methods from autotrophic to heterotrophic.",
    question_text: "Assertion (A): Fungi are widespread in distribution.\nReason (R): They have evolved various nutrition methods from autotrophic to heterotrophic.",
    options: arOptions,
    correct_index: 2,
    difficulty: "easy",
    topic: "Kingdom Fungi",
    solution: "Fungi are cosmopolitan in distribution, occurring in air, water, soil, and on plants and animals. However, fungi completely lack chlorophyll and are strictly heterotrophic (saprophytes, parasites, or symbionts); they never show autotrophic nutrition. Thus, Reason is false."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Association of mycobiont and phycobiont is sometimes considered as controlled parasitism.",
    reason_text: "Fungi performs all required activities of life except photosynthesis.",
    question_text: "Assertion (A): Association of mycobiont and phycobiont is sometimes considered as controlled parasitism.\nReason (R): Fungi performs all required activities of life except photosynthesis.",
    options: arOptions,
    correct_index: 1,
    difficulty: "medium",
    topic: "Lichens",
    solution: "In lichens, the association is sometimes called helotism or controlled parasitism because the fungus predominates and controls the alga, absorbing nutrients synthesized by the photosynthetic alga while providing shelter and moisture. Both statements are true."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Viruses are called obligate intracellular parasites.",
    reason_text: "Viruses are inert outside host cell.",
    question_text: "Assertion (A): Viruses are called obligate intracellular parasites.\nReason (R): Viruses are inert outside host cell.",
    options: arOptions,
    correct_index: 0,
    difficulty: "easy",
    topic: "Viruses",
    solution: "Viruses lack cellular machinery and can only replicate and express genetic material within a susceptible host cell. Because they are completely inert particles outside the host, they are called obligate intracellular parasites."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Some fungi may have different names for asexual and sexual stages.",
    reason_text: "Sexual reproduction is not known to occur in members of class deuteromycetes.",
    question_text: "Assertion (A): Some fungi may have different names for asexual and sexual stages.\nReason (R): Sexual reproduction is not known to occur in members of class deuteromycetes.",
    options: arOptions,
    correct_index: 1,
    difficulty: "medium",
    topic: "Deuteromycetes",
    solution: "Both statements are true. In Deuteromycetes (fungi imperfecti), only the asexual or vegetative phases are known. When sexual stages of these fungi were discovered, they were given the perfect stage name and classified under Ascomycetes or Basidiomycetes."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Slime moulds are also called as imperfect fungi.",
    reason_text: "They are spore producing protistans without cell wall.",
    question_text: "Assertion (A): Slime moulds are also called as imperfect fungi.\nReason (R): They are spore producing protistans without cell wall.",
    options: arOptions,
    correct_index: 3,
    difficulty: "medium",
    topic: "Slime Moulds",
    solution: "Both statements are false. Deuteromycetes (not slime moulds) are known as fungi imperfecti. Although vegetative plasmodium of slime moulds lacks cell wall, their spores possess true, extremely resistant cellulosic walls."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Mycoplasma are smallest living cells known and can survive without O2.",
    reason_text: "Mycoplasma can be pathogenic in both animals and plants.",
    question_text: "Assertion (A): Mycoplasma are smallest living cells known and can survive without O2.\nReason (R): Mycoplasma can be pathogenic in both animals and plants.",
    options: arOptions,
    correct_index: 1,
    difficulty: "easy",
    topic: "Mycoplasma",
    solution: "Both statements are factual statements from NCERT. Mycoplasma are the smallest living cells (0.3 µm) and can survive without oxygen (facultative anaerobes). Many mycoplasma are pathogenic in plants and animals. However, pathogenicity is not the reason for their small size or anaerobic survival."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Protista forms a link with Monera.",
    reason_text: "They share some common features.",
    question_text: "Assertion (A): Protista forms a link with Monera.\nReason (R): They share some common features.",
    options: arOptions,
    correct_index: 0,
    difficulty: "medium",
    topic: "Kingdom Protista",
    solution: "Protista contains unicellular eukaryotic organisms and represents an evolutionary transition linking primitive prokaryotes (Monera) with multicellular eukaryotes (Plantae, Fungi, Animalia) through shared cellular and biochemical features."
  },
  {
    question_type: "assertion_reason",
    assertion_text: "Both diatoms and desmids constitute the division Chrysophyta.",
    reason_text: "These groups have common photosynthetic pigments i.e., Chlorophyll 'a' and 'b'.",
    question_text: "Assertion (A): Both diatoms and desmids constitute the division Chrysophyta.\nReason (R): These groups have common photosynthetic pigments i.e., Chlorophyll 'a' and 'b'.",
    options: arOptions,
    correct_index: 2,
    difficulty: "medium",
    topic: "Chrysophytes",
    solution: "Assertion is true as Chrysophytes include both diatoms (golden-brown algae) and desmids (golden algae). Reason is false because chrysophytes contain chlorophyll a and c along with fucoxanthin, but lack chlorophyll b."
  }
];
