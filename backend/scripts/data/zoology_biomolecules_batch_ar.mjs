const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batchAR = [
  {
    question_text: "Assertion (A): In a competitive inhibition, inhibitor binds reversibly to the same site, that the substrate would normally occupy.\nReason (R): Cyanide kills an animal by inhibiting cytochrome oxidase by non-competitive inhibition.",
    question_type: "assertion_reason",
    assertion_text: "In a competitive inhibition, inhibitor binds reversibly to the same site, that the substrate would normally occupy.",
    reason_text: "Cyanide kills an animal by inhibiting cytochrome oxidase by non-competitive inhibition.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements. In competitive inhibition, the inhibitor closely resembles the substrate in molecular structure and competes for the active site of the enzyme. Cyanide is a classic non-competitive (irreversible) inhibitor of cytochrome c oxidase in the mitochondrial electron transport chain. However, Reason is not the explanation of Assertion."
  },
  {
    question_text: "Assertion (A): The bonds attaching second and third phosphates of higher nucleotides are high energy bonds.\nReason (R): Second and third phosphates of higher nucleotides are attached against forces of repulsion between similarly charged phosphate radicals.",
    question_type: "assertion_reason",
    assertion_text: "The bonds attaching second and third phosphates of higher nucleotides are high energy bonds.",
    reason_text: "Second and third phosphates of higher nucleotides are attached against forces of repulsion between similarly charged phosphate radicals.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true, and Reason is the correct explanation. Phosphoanhydride bonds connecting the terminal phosphate groups in ATP/ADP are termed high-energy bonds because significant energy is required to link negatively charged phosphate radicals together against electrostatic repulsion; their hydrolysis releases ~30.5 kJ/mol of energy."
  },
  {
    question_text: "Assertion (A): Co-factors play a crucial role in the catalytic activity of the enzyme.\nReason (R): Catalytic activity is lost when the co-factor is removed from the enzyme.",
    question_type: "assertion_reason",
    assertion_text: "Co-factors play a crucial role in the catalytic activity of the enzyme.",
    reason_text: "Catalytic activity is lost when the co-factor is removed from the enzyme.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason correctly explains the Assertion. Co-factors are non-protein chemical compounds required for the biological activity of holoenzymes. When the co-factor is removed from a conjugated enzyme, the remaining protein part (apoenzyme) completely loses its catalytic power, proving the crucial role of co-factors."
  },
  {
    question_text: "Assertion (A): Phosphofructokinase is activated by ADP and inhibited by ATP.\nReason (R): This enzyme is allosteric and the type of modulator attached brings change in its active site. When a lot of ATP is synthesised it will act as an inhibitor.",
    question_type: "assertion_reason",
    assertion_text: "Phosphofructokinase is activated by ADP and inhibited by ATP.",
    reason_text: "This enzyme is allosteric and the type of modulator attached brings change in its active site. When a lot of ATP is synthesised it will act as an inhibitor.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason correctly explains Assertion. Phosphofructokinase (PFK-1) is the key pacemaker/allosteric enzyme of glycolysis. High concentrations of ATP act as an allosteric inhibitor (feedback inhibition), binding to regulatory sites and lowering the enzyme's affinity for its substrate, whereas ADP/AMP relieves this inhibition and activates PFK."
  },
  {
    question_text: "Assertion (A): Starch gives blue colour with Iodine.\nReason (R): Starch forms a helical structure which can hold the I2 molecules in the helical portions.",
    question_type: "assertion_reason",
    assertion_text: "Starch gives blue colour with Iodine.",
    reason_text: "Starch forms a helical structure which can hold the I2 molecules in the helical portions.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason is the correct explanation. Starch forms secondary helical structures (amylose). The iodine molecules (I2 / I3-) fit inside the hydrophobic core of these helices, forming a polyiodide inclusion complex that absorbs visible light and produces a characteristic blue-black colour."
  },
  {
    question_text: "Assertion (A): The pitch of B-DNA is 34 Å.\nReason (R): The rise per base pair in B-DNA is 3.4 nm.",
    question_type: "assertion_reason",
    assertion_text: "The pitch of B-DNA is 34 Å.",
    reason_text: "The rise per base pair in B-DNA is 3.4 nm.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true statement but Reason is false. In the Watson-Crick B-DNA double helix model, the pitch (one complete turn) is 34 Å (3.4 nm) and contains 10 base pairs. Therefore, the distance (rise) between adjacent base pairs is 3.4 Å (0.34 nm), NOT 3.4 nm."
  },
  {
    question_text: "Assertion (A): Prosthetic groups are non-protein organic factors which are firmly attached to the apoenzymes.\nReason (R): FMN and FAD are coenzymes loosely attached to the apoenzyme.",
    question_type: "assertion_reason",
    assertion_text: "Prosthetic groups are non-protein organic factors which are firmly attached to the apoenzymes.",
    reason_text: "FMN and FAD are coenzymes loosely attached to the apoenzyme.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true statement but Reason is false. Prosthetic groups are organic compounds that are tightly/firmly bound to the apoenzyme (e.g. haem in catalase/peroxidase). FMN and FAD are flavin nucleotides that act as tightly bound prosthetic groups in flavoproteins, not loosely associated coenzymes (like NAD/NADP)."
  },
  {
    question_text: "Assertion (A): All the elements present in a sample of earth's crust are also present in a sample of living tissue.\nReason (R): Non-living matter is organised to form living tissue.",
    question_type: "assertion_reason",
    assertion_text: "All the elements present in a sample of earth's crust are also present in a sample of living tissue.",
    reason_text: "Non-living matter is organised to form living tissue.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements according to NCERT. When chemical analysis is performed on living tissue and earth's crust, all elemental components are present in both, although relative abundances differ (carbon and hydrogen are much more abundant in living matter). However, Reason does not provide the mechanistic explanation for chemical analysis findings."
  },
  {
    question_text: "Assertion (A): α-amino acids are substituted methanes.\nReason (R): Methane is substituted by four groups occupying the four valency positions.",
    question_type: "assertion_reason",
    assertion_text: "α-amino acids are substituted methanes.",
    reason_text: "Methane is substituted by four groups occupying the four valency positions.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason is the correct explanation. Amino acids are termed substituted methanes because the central α-carbon corresponds to the carbon of methane, where the four valencies are satisfied by four substituent groups: hydrogen (-H), carboxyl group (-COOH), amino group (-NH2), and a variable R group."
  },
  {
    question_text: "Assertion (A): In solutions of different pH, the structure of amino acids remains same.\nReason (R): Amino acids are non-ionizable in nature.",
    question_type: "assertion_reason",
    assertion_text: "In solutions of different pH, the structure of amino acids remains same.",
    reason_text: "Amino acids are non-ionizable in nature.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. Amino acids contain both ionizable amino (-NH2) and carboxyl (-COOH) groups. Depending on the pH of the solution, the ionization state changes (cationic at low pH, zwitterionic at isoelectric point, and anionic at high pH), so their structural formula changes with pH."
  },
  {
    question_text: "Assertion (A): Lipids have both glycogen and fatty acids.\nReason (R): The fatty acids are esterified with glycogen in lipids.",
    question_type: "assertion_reason",
    assertion_text: "Lipids have both glycogen and fatty acids.",
    reason_text: "The fatty acids are esterified with glycogen in lipids.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. Lipids consist of fatty acids esterified with glycerol (trihydroxy propane), NOT glycogen. Glycogen is a branched storage polysaccharide of glucose found in animal liver and muscle."
  },
  {
    question_text: "Assertion (A): The neural tissues have lipids like lecithin.\nReason (R): Some lipids have phosphorous and a phosphorylated organic compound in them.",
    question_type: "assertion_reason",
    assertion_text: "The neural tissues have lipids like lecithin.",
    reason_text: "Some lipids have phosphorous and a phosphorylated organic compound in them.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements. Neural tissues have complex lipids including phospholipids like lecithin, sphingomyelins, and glycolipids. Phospholipids contain a phosphate group and a phosphorylated organic nitrogenous base (choline in lecithin). However, Reason describes general chemical structure and does not explain why neural tissues specifically concentrate these lipids."
  },
  {
    question_text: "Assertion (A): Dietary proteins are the source of essential amino acids.\nReason (R): Essential amino acids are those which our body can make.",
    question_type: "assertion_reason",
    assertion_text: "Dietary proteins are the source of essential amino acids.",
    reason_text: "Essential amino acids are those which our body can make.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Assertion is true statement but Reason is false. Essential amino acids cannot be synthesized by human cells and must be supplied through dietary protein intake. Non-essential amino acids are those that the body can synthesize de novo."
  },
  {
    question_text: "Assertion (A): Ions are least abundant chemical in living organisms.\nReason (R): Ions form only 1% of the total cellular mass.",
    question_type: "assertion_reason",
    assertion_text: "Ions are least abundant chemical in living organisms.",
    reason_text: "Ions form only 1% of the total cellular mass.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason is the correct explanation. According to NCERT average cellular composition, ions constitute only 1% of total cellular mass (compared to water 70-90%, proteins 10-15%, nucleic acids 5-7%, carbohydrates 3%, lipids 2%), making ions the least abundant component."
  },
  {
    question_text: "Assertion (A): A protein can be either heteropolymer or a homopolymer.\nReason (R): Proteins are linear chains of amino acids linked by glycosidic bonds.",
    question_type: "assertion_reason",
    assertion_text: "A protein can be either heteropolymer or a homopolymer.",
    reason_text: "Proteins are linear chains of amino acids linked by glycosidic bonds.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. Proteins are always heteropolymers containing diverse sequences of 20 different amino acids; there is no homopolymer protein. Furthermore, amino acids in proteins are linked by peptide (-CO-NH-) bonds, not glycosidic bonds (which link monosaccharides in carbohydrates)."
  },
  {
    question_text: "Assertion (A): Cellulose is a secondary metabolite.\nReason (R): Cellulose is a polymer of glucose.",
    question_type: "assertion_reason",
    assertion_text: "Cellulose is a secondary metabolite.",
    reason_text: "Cellulose is a polymer of glucose.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements. According to NCERT Table 9.3, polymeric substances like rubber, gums, and cellulose are classified as secondary metabolites. Cellulose is indeed an unbranched homopolymer of β-D-glucose linked by β(1→4) glycosidic bonds. However, being a glucose polymer is not the reason it is categorized as a secondary metabolite."
  },
  {
    question_text: "Assertion (A): Erythrose and ribulose have free ketone group so called as ketoses.\nReason (R): All disaccharides are reducing sugars.",
    question_type: "assertion_reason",
    assertion_text: "Erythrose and ribulose have free ketone group so called as ketoses.",
    reason_text: "All disaccharides are reducing sugars.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Both Assertion and Reason are false statements. Erythrose is an aldotetrose containing an aldehyde (-CHO) group, not a ketone; ribulose is a ketopentose. Furthermore, not all disaccharides are reducing; sucrose and trehalose are non-reducing sugars because their anomeric carbons are involved in the glycosidic bond."
  },
  {
    question_text: "Assertion (A): Inulin is used to determine the glomerular filtration rate.\nReason (R): Inulin is not metabolised in humans and is readily filtered through kidney.",
    question_type: "assertion_reason",
    assertion_text: "Inulin is used to determine the glomerular filtration rate.",
    reason_text: "Inulin is not metabolised in humans and is readily filtered through kidney.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Both Assertion and Reason are true and Reason is the correct explanation. Inulin (a homopolymer of fructose) is freely filtered at the glomerulus, neither reabsorbed nor secreted by renal tubules, and not metabolized by human tissues. Consequently, its renal clearance rate exactly equals the glomerular filtration rate (GFR)."
  }
];
