// Zoology - Biomolecules: Batch AR2 (AR 19 to AR 34)
// 16 Assertion-Reason Questions

const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batchAR2 = [
  {
    question_text: "Assertion (A): Solubility of proteins is maximum at isoelectric point.\nReason (R): At isoelectric point, net charge on proteins become positive.",
    question_type: "assertion_reason",
    assertion_text: "Solubility of proteins is maximum at isoelectric point.",
    reason_text: "At isoelectric point, net charge on proteins become positive.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. At the isoelectric point (pI), the net electrical charge on a protein is zero (zwitterionic state), which minimizes electrostatic repulsion between protein molecules and reduces hydration, causing protein solubility to be at its minimum (not maximum)."
  },
  {
    question_text: "Assertion (A): Starch can hold iodine.\nReason (R): Starch forms helical secondary structure.",
    question_type: "assertion_reason",
    assertion_text: "Starch can hold iodine.",
    reason_text: "Starch forms helical secondary structure.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Starch (specifically amylose) forms secondary helical structures where the helical coil forms a hydrophobic interior that can trap molecular iodine (I2) into the interstitial spaces, producing a characteristic blue-black complex."
  },
  {
    question_text: "Assertion (A): Most abundant organic molecule on Earth is cellulose.\nReason (R): Cellulose is main component of plant cell wall.",
    question_type: "assertion_reason",
    assertion_text: "Most abundant organic molecule on Earth is cellulose.",
    reason_text: "Cellulose is main component of plant cell wall.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the complete explanation of why it is the most abundant on Earth compared to all other molecules. Cellulose is the most abundant organic polymer on Earth, and it forms the major structural constituent of plant cell walls."
  },
  {
    question_text: "Assertion (A): Nucleic acid together with polysaccharides and polypeptides comprise macromolecular fraction of living tissue.\nReason (R): Nucleic acids are found in acid-soluble fraction.",
    question_type: "assertion_reason",
    assertion_text: "Nucleic acid together with polysaccharides and polypeptides comprise macromolecular fraction of living tissue.",
    reason_text: "Nucleic acids are found in acid-soluble fraction.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. Nucleic acids, along with polysaccharides and polypeptides (proteins), are macromolecules having molecular weights above 10,000 daltons, and are found in the acid-insoluble retentate (not the acid-soluble fraction)."
  },
  {
    question_text: "Assertion (A): Lecithin is amphipathic phospholipid.\nReason (R): Lecithin has both hydrophilic polar and hydrophobic non-polar groups.",
    question_type: "assertion_reason",
    assertion_text: "Lecithin is amphipathic phospholipid.",
    reason_text: "Lecithin has both hydrophilic polar and hydrophobic non-polar groups.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion. Amphipathic molecules possess both hydrophilic (water-attracting polar head: phosphate and choline) and hydrophobic (water-repelling non-polar tails: fatty acid hydrocarbon chains) domains."
  },
  {
    question_text: "Assertion (A): CO2 dissolution in water is a physical process.\nReason (R): CO2 dissolving in water is a catalysed reaction in living systems.",
    question_type: "assertion_reason",
    assertion_text: "CO2 dissolution in water is a physical process.",
    reason_text: "CO2 dissolving in water is a catalysed reaction in living systems.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. The physical dissolution of carbon dioxide in water (CO2 + H2O <-> H2CO3) occurs spontaneously without chemical bond rearrangement in non-living systems, but inside red blood cells, this reaction is catalysed with immense speed by the enzyme carbonic anhydrase."
  },
  {
    question_text: "Assertion (A): Precursor of cholesterol is acetic acid.\nReason (R): Cholesterol consists of hydrocarbon tail, sterol nucleus and hydroxyl group.",
    question_type: "assertion_reason",
    assertion_text: "Precursor of cholesterol is acetic acid.",
    reason_text: "Cholesterol consists of hydrocarbon tail, sterol nucleus and hydroxyl group.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. Biosynthesis of cholesterol in animal cells begins from 2-carbon acetate units (acetyl-CoA). Structurally, cholesterol contains a cyclopentanoperhydrophenanthrene sterol nucleus, a hydroxyl group at C-3, and an aliphatic hydrocarbon side chain."
  },
  {
    question_text: "Assertion (A): Glucose becomes lactic acid in our smooth muscles.\nReason (R): During excessive exercise, lack of oxygen initiates anaerobic process in muscles.",
    question_type: "assertion_reason",
    assertion_text: "Glucose becomes lactic acid in our smooth muscles.",
    reason_text: "During excessive exercise, lack of oxygen initiates anaerobic process in muscles.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Assertion is false, but Reason is true. Anaerobic glycolysis converting glucose to lactic acid occurs during heavy, strenuous exercise in skeletal muscles (not smooth muscles). Under hypoxic conditions, lactic acid fermentation regenerates NAD+ to sustain ATP generation."
  },
  {
    question_text: "Assertion (A): Transition state corresponds to highest potential energy in a reaction, independent of whether reaction is exothermic and endothermic.\nReason (R): Stability is related to energy status of the molecule or the structure.",
    question_type: "assertion_reason",
    assertion_text: "Transition state corresponds to highest potential energy in a reaction, independent of whether reaction is exothermic and endothermic.",
    reason_text: "Stability is related to energy status of the molecule or the structure.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. During an enzymatic reaction, the substrate goes through a transient high-energy transition state which has the highest potential energy level. Because higher potential energy confers instability, the transition state is unstable and short-lived."
  },
  {
    question_text: "Assertion (A): Cold storages prevent the spoilage of food.\nReason (R): Low temperature preserves the enzymes in inactive state.",
    question_type: "assertion_reason",
    assertion_text: "Cold storages prevent the spoilage of food.",
    reason_text: "Low temperature preserves the enzymes in inactive state.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Low temperature preserves enzymes in a temporarily inactive state and arrests the metabolic activity of spoilage microorganisms, thereby preventing food decay in cold storage."
  },
  {
    question_text: "Assertion (A): In presence of competitive inhibitor Km increases while Vmax remains unchanged.\nReason (R): Competitive inhibitor is frequently used in control of bacterial pathogens.",
    question_type: "assertion_reason",
    assertion_text: "In presence of competitive inhibitor Km increases while Vmax remains unchanged.",
    reason_text: "Competitive inhibitor is frequently used in control of bacterial pathogens.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. A competitive inhibitor competes with substrate for the active site; increasing substrate concentration overcomes the inhibition, hence Vmax is unchanged while Km increases. Sulpha drugs act as competitive inhibitors of bacterial enzymes (e.g., competing with PABA in folic acid synthesis) to control bacterial pathogens."
  },
  {
    question_text: "Assertion (A): Cyanide binds with Cu center of Cytochrome a3 of cytochrome c oxidase and enzyme is inhibited permanently.\nReason (R): Cyanide is a non-competitive inhibitor which destroys structure and configuration of an enzyme.",
    question_type: "assertion_reason",
    assertion_text: "Cyanide binds with Cu center of Cytochrome a3 of cytochrome c oxidase and enzyme is inhibited permanently.",
    reason_text: "Cyanide is a non-competitive inhibitor which destroys structure and configuration of an enzyme.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. Cyanide binds tightly and irreversibly to the heme iron and copper centers in cytochrome a3 of cytochrome c oxidase, blocking electron transfer to O2. It inhibits enzyme activity by complexing with the prosthetic metal cofactor rather than destroying or denaturing the tertiary structure of the enzyme protein."
  },
  {
    question_text: "Assertion (A): All feedback inhibitions are competitive inhibition.\nReason (R): Km is applicable for allosteric modulation.",
    question_type: "assertion_reason",
    assertion_text: "All feedback inhibitions are competitive inhibition.",
    reason_text: "Km is applicable for allosteric modulation.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. Feedback inhibition is typically allosteric (non-competitive) where the end-product binds to a regulatory allosteric site distinct from the active site. Allosteric enzymes display sigmoidal kinetics rather than hyperbolic Michaelis-Menten kinetics, so standard Michaelis constant (Km) is not applicable."
  },
  {
    question_text: "Assertion (A): Agar-agar is obtained from red algae Gracilaria and Gelidium.\nReason (R): Peptidoglycan is composed of NAG + NAM.",
    question_type: "assertion_reason",
    assertion_text: "Agar-agar is obtained from red algae Gracilaria and Gelidium.",
    reason_text: "Peptidoglycan is composed of NAG + NAM.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but they are completely unrelated. Agar-agar is a sulphated mucopolysaccharide extracted from red algae (Rhodophyceae) like Gracilaria and Gelidium. Peptidoglycan (murein) in bacterial cell walls is composed of alternating N-acetylglucosamine (NAG) and N-acetylmuramic acid (NAM) residues cross-linked by peptide chains."
  },
  {
    question_text: "Assertion (A): Chitin is linear polymer of NAG with beta-1,4-linkage.\nReason (R): Chitin is second most abundant organic substance.",
    question_type: "assertion_reason",
    assertion_text: "Chitin is linear polymer of NAG with beta-1,4-linkage.",
    reason_text: "Chitin is second most abundant organic substance.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements, but Reason is not the explanation of Assertion. Chitin is an unbranched, structural homopolymer of N-acetylglucosamine (NAG) linked by beta-1,4-glycosidic bonds. After cellulose, chitin is the second most abundant organic macromolecule on Earth, forming fungal cell walls and arthropod exoskeletons."
  },
  {
    question_text: "Assertion (A): Glycine is simplest and tryptophan is most complex amino acid.\nReason (R): Except glycine all amino acid are laevorotatory.",
    question_type: "assertion_reason",
    assertion_text: "Glycine is simplest and tryptophan is most complex amino acid.",
    reason_text: "Except glycine all amino acid are laevorotatory.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true, but Reason is false. Glycine has only a hydrogen atom as its R-group (simplest amino acid), whereas tryptophan contains an indole ring (most complex amino acid). While all natural protein-forming amino acids (except glycine which is achiral) have the L-configuration, they can be either dextrorotatory (+) or levorotatory (-) in their optical rotation."
  }
];

